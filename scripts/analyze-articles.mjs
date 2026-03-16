import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md')).sort();

const surviving = [];
const archive = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const { data } = matter(content);
  const num = file.match(/^(\d+)/)?.[1] || '';
  const size = fs.statSync(path.join(blogDir, file)).size;

  if (data.published === false) {
    archive.push({ num, file, slug: data.slug, reason: 'published:false' });
  } else {
    surviving.push({ num, file, slug: data.slug, title: data.title, category: data.category, size });
  }
}

console.log('=== SURVIVING ARTICLES ===');
console.log('Count:', surviving.length);
surviving.forEach((a, i) => console.log((i+1).toString().padStart(3) + ': ' + a.file + ' (' + Math.round(a.size/1024) + 'KB) [' + a.category + ']'));

console.log('\n=== ARCHIVE (published:false) ===');
console.log('Count:', archive.length);
archive.forEach(a => console.log('  ' + a.file + ' -> ' + a.reason));

// Rewritten articles (Phase 1-3 touched)
const rewritten = new Set(['001','002','003','004','005','006','007','008','009','010','011','012','013','015','016','017','018','020','021','022','023','024','025','026','027','029','030','031','033','035','037','039','040','043','045','047','050','053','059','063','066','069','071','072','077','078','084','087','090','097','098','102','104','116','117','120','122','124','126','139','145','151','154','155','159','185','207','214','216','219','221','223','243','268','270','271','272','274','276','277','278','300','301','321','322','323','324','325','326','327','328','329','330','331','332','333','334','335','336','337','338','339','340','341','342','343','344','345']);

console.log('\n=== NON-REWRITTEN SURVIVING ===');
const nonRewritten = surviving.filter(a => !rewritten.has(a.num));
console.log('Count:', nonRewritten.length);
nonRewritten.forEach(a => console.log('  ' + a.num + ': ' + a.file + ' (' + Math.round(a.size/1024) + 'KB) [' + a.category + ']'));

// Category breakdown of surviving
const catCount = {};
surviving.forEach(a => { catCount[a.category] = (catCount[a.category] || 0) + 1; });
console.log('\n=== SURVIVING BY CATEGORY ===');
Object.entries(catCount).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log('  ' + cat + ': ' + count);
});
