/**
 * rewrite-archive-article.mjs
 *
 * アーカイブ記事を1つ選び、次の記事番号で content/blog/ に移動する。
 * daily-blog-post.yml から呼び出される。
 *
 * リライトは事前にClaude Code等で手動実施する想定。
 * このスクリプトは「移動 + frontmatter更新」のみ行う。
 *
 * Usage: node scripts/rewrite-archive-article.mjs
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'content/blog');
const archiveDir = path.join(blogDir, '_archive');
const rewrittenPath = path.join(archiveDir, '.rewritten.json');

// --- 次の記事番号を取得 ---
function getNextArticleNumber() {
  const files = fs.readdirSync(blogDir).filter(f => /^\d+.*\.md$/.test(f));
  const numbers = files.map(f => parseInt(f.match(/^(\d+)/)[1]));
  return Math.max(...numbers, 0) + 1;
}

// --- リライト済みリスト管理 ---
function getRewrittenList() {
  if (fs.existsSync(rewrittenPath)) {
    return JSON.parse(fs.readFileSync(rewrittenPath, 'utf8'));
  }
  return { rewritten: [] };
}

function markAsRewritten(archiveFile, newFile) {
  const data = getRewrittenList();
  data.rewritten.push({
    original: archiveFile,
    newFile,
    date: new Date().toISOString().split('T')[0],
  });
  fs.writeFileSync(rewrittenPath, JSON.stringify(data, null, 2));
}

// --- アーカイブから候補を選ぶ ---
function pickArchiveArticle() {
  const rewritten = getRewrittenList();
  const rewrittenFiles = new Set(rewritten.rewritten.map(r => r.original));

  const candidates = fs.readdirSync(archiveDir)
    .filter(f => f.endsWith('.md') && !rewrittenFiles.has(f))
    .map(f => {
      const fullPath = path.join(archiveDir, f);
      const content = fs.readFileSync(fullPath, 'utf8');
      const { data, content: body } = matter(content);
      const size = Buffer.byteLength(body, 'utf8');
      return { file: f, data, body, size, fullPath };
    })
    // サイズ大（コンテンツ多い）順
    .sort((a, b) => b.size - a.size);

  if (candidates.length === 0) {
    console.log('No more archive articles available.');
    process.exit(0);
  }

  return candidates[0];
}

// --- メイン処理 ---
const article = pickArchiveArticle();
const nextNum = getNextArticleNumber();
const slug = article.data.slug || article.file.replace(/^\d+-/, '').replace(/\.md$/, '');
const newFileName = `${String(nextNum).padStart(3, '0')}-${slug}.md`;
const newFilePath = path.join(blogDir, newFileName);
const today = new Date().toISOString().split('T')[0];

// frontmatter更新
const updatedData = {
  ...article.data,
  published: true,
  date: today,
};
// slug がなければ追加
if (!updatedData.slug) {
  updatedData.slug = slug;
}

const newContent = matter.stringify(article.body, updatedData);
fs.writeFileSync(newFilePath, newContent);

// アーカイブから削除
fs.unlinkSync(article.fullPath);

// 追跡リスト更新
markAsRewritten(article.file, newFileName);

console.log(`Selected: ${article.file} (${article.size} bytes)`);
console.log(`Written: ${newFileName}`);
console.log(`Date: ${today}`);
