import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md')).sort();

const today = new Date('2026-03-17');
today.setHours(0, 0, 0, 0);

const articles = [];

for (const file of files) {
  const fullPath = path.join(blogDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const { data, content: body } = matter(content);

  // Count Japanese characters and English words for reading time
  const japaneseChars = (body.match(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g) || []).length;
  const englishWords = body.replace(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '').split(/\s+/).filter(w => w.length > 0).length;
  const readingTime = Math.max(1, Math.ceil(japaneseChars / 400 + englishWords / 200));

  // Count Mermaid diagrams
  const mermaidCount = (body.match(/```mermaid/g) || []).length;
  const mermaidTypes = [...body.matchAll(/```mermaid\s*\n\s*(\w+)/g)].map(m => m[1]);

  // Count internal links
  const internalLinks = (body.match(/\]\(\//g) || []).length;

  // Character count (body only)
  const charCount = body.replace(/\s/g, '').length;
  const fileSize = fs.statSync(fullPath).size;

  const postDate = new Date(data.date);
  postDate.setHours(0, 0, 0, 0);
  const isVisible = data.published !== false && postDate <= today;

  articles.push({
    file: file,
    number: parseInt(file.match(/^(\d+)/)?.[1] || '0'),
    slug: data.slug || file.replace(/\.md$/, ''),
    title: data.title,
    description: data.description || '',
    category: data.category || '',
    tags: data.tags || [],
    date: data.date,
    published: data.published !== false,
    isVisible,
    series: data.series || null,
    seriesOrder: data.seriesOrder || null,
    relatedArticles: data.relatedArticles || [],
    readingTime,
    charCount,
    fileSize,
    mermaidCount,
    mermaidTypes: [...new Set(mermaidTypes)],
    internalLinks,
  });
}

// Summary stats
const visible = articles.filter(a => a.isVisible);
const future = articles.filter(a => a.published && !a.isVisible);
const categories = {};
articles.forEach(a => { categories[a.category] = (categories[a.category] || 0) + 1; });

const summary = {
  total: articles.length,
  visibleToday: visible.length,
  futureScheduled: future.length,
  avgReadingTime: Math.round(articles.reduce((s, a) => s + a.readingTime, 0) / articles.length),
  avgCharCount: Math.round(articles.reduce((s, a) => s + a.charCount, 0) / articles.length),
  avgFileSize: Math.round(articles.reduce((s, a) => s + a.fileSize, 0) / articles.length),
  totalMermaid: articles.reduce((s, a) => s + a.mermaidCount, 0),
  articlesWithMermaid: articles.filter(a => a.mermaidCount > 0).length,
  articlesWithInternalLinks: articles.filter(a => a.internalLinks > 0).length,
  seriesCount: [...new Set(articles.filter(a => a.series).map(a => a.series))].length,
  categories,
};

const db = { summary, articles };

// Output
const outPath = path.join(process.cwd(), 'scripts/articles-db.json');
fs.writeFileSync(outPath, JSON.stringify(db, null, 2));
console.log(`Exported ${articles.length} articles to ${outPath}`);
console.log('\n=== Summary ===');
console.log(JSON.stringify(summary, null, 2));

// Also print table
console.log('\n=== Articles ===');
console.log('No. | Visible | Category | Reading | Mermaid | Links | Title');
console.log('----|---------|----------|---------|---------|-------|------');
for (const a of articles) {
  console.log(
    `${String(a.number).padStart(3)} | ${a.isVisible ? '✅' : '⏳'}      | ${a.category.padEnd(12).slice(0,12)} | ${String(a.readingTime).padStart(3)}min  | ${String(a.mermaidCount).padStart(2)}図    | ${String(a.internalLinks).padStart(2)}本   | ${a.title.slice(0, 40)}`
  );
}
