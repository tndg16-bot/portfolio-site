const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, 'content', 'blog');
const today = new Date('2026-01-16'); // 修正対象: 今日の日付
today.setHours(0, 0, 0, 0);

// すべての記事ファイルを取得
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).sort();

console.log('='.repeat(100));
console.log('現在の公開状態一覧:');
console.log('='.repeat(100));

const posts = files.map(file => {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);

  const postDate = new Date(data.date);
  const isPublished = data.published !== false && postDate <= today;

  return {
    file,
    title: data.title,
    date: data.date,
    published: data.published,
    isPublished,
    postDate: postDate.toISOString().split('T')[0]
  };
});

// ファイル名順（連番順）に表示
posts.forEach(post => {
  console.log(`${post.postDate} ${post.file.padEnd(35)} ${post.isPublished ? '✅ 公開' : '❌ 非公開'}`);
});

// 1月1日から毎日1記事ずつ公開になるように修正
console.log('\n' + '='.repeat(100));
console.log('修正計画: 1月1日から毎日1記事ずつ公開');
console.log('='.repeat(100));

const startDate = new Date('2026-01-01');
const updates = [];

posts.forEach((post, index) => {
  const targetDate = new Date(startDate);
  targetDate.setDate(targetDate.getDate() + index);

  const targetDateStr = targetDate.toISOString().split('T')[0];
  const currentDateStr = post.postDate;

  if (currentDateStr !== targetDateStr) {
    updates.push({
      file: post.file,
      title: post.title,
      currentDate: currentDateStr,
      targetDate: targetDateStr
    });
  }
});

console.log(`\n更新が必要な記事数: ${updates.length}`);

updates.forEach(u => {
  console.log(`${u.currentDate} -> ${u.targetDate}: ${u.file} (${u.title})`);
});

// 実際に更新
if (updates.length > 0) {
  console.log('\n' + '='.repeat(100));
  console.log('更新を実行します...');
  console.log('='.repeat(100));

  updates.forEach(u => {
    const filePath = path.join(postsDir, u.file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);

    data.date = u.targetDate;
    data.published = true;

    const newContent = matter.stringify(body, data);
    fs.writeFileSync(filePath, newContent, 'utf8');

    console.log(`✅ ${u.file}: ${u.currentDate} -> ${u.targetDate}`);
  });

  console.log('\n更新完了！');
} else {
  console.log('\n✅ 日付は正しく設定されています。');
}
