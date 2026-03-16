import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'content/blog');
const files = fs.readdirSync(blogDir)
  .filter(f => f.endsWith('.md') && !f.startsWith('_'))
  .sort();

const rows = [['number','filename','title','category','tags','slug','date','published','size_bytes','line_count','has_mermaid','mermaid_types','mermaid_count']];

for (const file of files) {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);
  const stats = fs.statSync(filePath);
  const lines = content.split('\n').length;
  const num = file.match(/^(\d+)/)?.[1] || '';

  // Mermaid analysis
  const mermaidCount = (content.match(/\u0060\u0060\u0060mermaid/g) || []).length;
  const mermaidBlocks = [];
  if (mermaidCount > 0) {
    let pos = 0;
    for (let i = 0; i < mermaidCount; i++) {
      const start = content.indexOf('\u0060\u0060\u0060mermaid', pos);
      if (start === -1) break;
      const blockStart = start + 10; // after "```mermaid\n"
      const end = content.indexOf('\u0060\u0060\u0060', blockStart);
      if (end === -1) break;
      mermaidBlocks.push(content.substring(start, end));
      pos = end + 3;
    }
  }
  const hasMermaid = mermaidBlocks.length > 0;
  const mermaidTypes = [...new Set(mermaidBlocks.map(b => {
    const firstLine = b.split('\n')[1]?.trim() || '';
    return firstLine.split(/[\s{(]/)[0];
  }))].join(';');

  rows.push([
    num,
    file,
    (data.title || '').replace(/,/g, '|'),
    data.category || '',
    (data.tags || []).join(';'),
    data.slug || '',
    data.date || '',
    data.published !== false ? 'true' : 'false',
    stats.size,
    lines,
    hasMermaid,
    mermaidTypes,
    mermaidCount
  ]);
}

const csv = rows.map(r => r.join(',')).join('\n');
fs.writeFileSync('.claude/blog-articles-metadata.csv', csv);
console.log(`Generated CSV with ${rows.length - 1} articles`);

// Summary stats
const articles = rows.slice(1);
const sizes = articles.map(r => parseInt(r[8]));
const avgSize = Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length);
const withMermaid = articles.filter(r => r[10] === true || r[10] === 'true').length;
const categories = {};
articles.forEach(r => { categories[r[3]] = (categories[r[3]] || 0) + 1; });

console.log(`\nSummary:`);
console.log(`Average size: ${avgSize} bytes`);
console.log(`With Mermaid: ${withMermaid}/${articles.length}`);
console.log(`Categories:`, JSON.stringify(categories, null, 2));
console.log(`\nSize distribution:`);
console.log(`  < 2500B: ${sizes.filter(s => s < 2500).length}`);
console.log(`  2500-5000B: ${sizes.filter(s => s >= 2500 && s < 5000).length}`);
console.log(`  5000-8000B: ${sizes.filter(s => s >= 5000 && s < 8000).length}`);
console.log(`  8000B+: ${sizes.filter(s => s >= 8000).length}`);
