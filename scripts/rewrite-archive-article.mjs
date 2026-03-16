/**
 * rewrite-archive-article.mjs
 *
 * アーカイブ記事を1つ選び、Claude APIでリライトして新記事として追加する。
 * daily-blog-post.yml から呼び出される。
 *
 * Usage: node scripts/rewrite-archive-article.mjs
 *
 * Required env:
 *   ANTHROPIC_API_KEY - Claude APIキー
 *
 * Output:
 *   - 新記事を content/blog/ に追加
 *   - _archive/.rewritten.json を更新
 *   - stdout に新ファイル名を出力
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'content/blog');
const archiveDir = path.join(blogDir, '_archive');
const rewrittenPath = path.join(archiveDir, '.rewritten.json');

// --- 1. 次の記事番号を取得 ---
function getNextArticleNumber() {
  const files = fs.readdirSync(blogDir).filter(f => /^\d+.*\.md$/.test(f));
  const numbers = files.map(f => parseInt(f.match(/^(\d+)/)[1]));
  return Math.max(...numbers, 0) + 1;
}

// --- 2. リライト済みリスト管理 ---
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

// --- 3. アーカイブから候補を選ぶ ---
function pickArchiveArticle() {
  const rewritten = getRewrittenList();
  const rewrittenFiles = new Set(rewritten.rewritten.map(r => r.original));

  const archiveFiles = fs.readdirSync(archiveDir)
    .filter(f => f.endsWith('.md') && !rewrittenFiles.has(f))
    .sort();

  if (archiveFiles.length === 0) {
    console.log('No more archive articles to rewrite.');
    process.exit(0);
  }

  // スコアリング: ファイルサイズが大きい（コンテンツが多い）ものを優先
  const scored = archiveFiles.map(f => {
    const fullPath = path.join(archiveDir, f);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data, content: body } = matter(content);
    const size = Buffer.byteLength(body, 'utf8');

    // published:false（マージ先のセカンダリ記事）はスキップ
    if (data.published === false) return null;

    return { file: f, data, body, size };
  }).filter(Boolean);

  if (scored.length === 0) {
    // published:false以外がない場合、published:falseの記事も含める
    const allCandidates = archiveFiles.map(f => {
      const fullPath = path.join(archiveDir, f);
      const content = fs.readFileSync(fullPath, 'utf8');
      const { data, content: body } = matter(content);
      const size = Buffer.byteLength(body, 'utf8');
      return { file: f, data, body, size };
    });

    if (allCandidates.length === 0) {
      console.log('No more archive articles to rewrite.');
      process.exit(0);
    }

    // サイズ順で最大のものを選択
    allCandidates.sort((a, b) => b.size - a.size);
    return allCandidates[0];
  }

  // サイズ順で最大のものを選択（コンテンツが多い＝リライト素材として良い）
  scored.sort((a, b) => b.size - a.size);
  return scored[0];
}

// --- 4. 既存の高品質記事を参考例として取得 ---
function getReferenceArticle() {
  // 001が最高品質の参考記事
  const refPath = path.join(blogDir, '001-ai-solo-camp.md');
  if (fs.existsSync(refPath)) {
    return fs.readFileSync(refPath, 'utf8');
  }
  return null;
}

// --- 5. Claude APIでリライト ---
async function rewriteWithClaude(archiveArticle, referenceArticle) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set');
    process.exit(1);
  }

  const systemPrompt = `あなたは日本語ブログ記事のプロフェッショナルライターです。
以下の品質基準に従って、アーカイブされた記事を最高品質にリライトしてください。

## 品質基準
- **ストーリーテリング**: 冒頭で具体的な人物のシーンから始める（「はじめに」禁止）。名前・年齢・職業を含む具体的なケーススタディ
- **文字数**: 3,000〜5,000文字。密度の高い長文
- **Mermaid図**: 2〜3個、異なるタイプを使う（journey, timeline, mindmap, quadrantChart, flowchart, sequenceDiagram等）。graph型は最大1個
- **構成**: 危機の瞬間→転機→解決→変容のアーク
- **ケーススタディ**: 2個以上。仮名・対話・数字・before/after含む
- **内部リンク**: 記事末尾に関連記事2-3へのリンク（relatedArticlesフィールドで指定）
- **CTA**: 記事テーマ固有のセッション誘導（定型文禁止）

## Mermaidテーマ設定（全図に必須）
\`\`\`
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#165E83', 'primaryTextColor': '#F0E8D6', 'lineColor': '#E6B422', 'secondaryColor': '#F0E8D6', 'tertiaryColor': '#27221F'}}}%%
\`\`\`

## 出力形式
frontmatterとmarkdown本文をそのまま出力してください。frontmatterには以下を含めること:
- title, description, date（今日の日付）, category, tags, published: true, slug（元記事のslugを維持）
- relatedArticles: 関連する既存記事のslugを2-3個

\`\`\`yaml
---
title: "記事タイトル"
description: "100文字程度の要約"
date: "YYYY-MM-DD"
category: "カテゴリ名"
tags:
  - "タグ1"
  - "タグ2"
published: true
slug: "original-slug"
relatedArticles:
  - "related-slug-1"
  - "related-slug-2"
---
\`\`\``;

  const userPrompt = `以下のアーカイブ記事をリライトしてください。元の記事のテーマとslugは維持しつつ、品質を大幅に向上させてください。

## アーカイブ記事（リライト対象）
${archiveArticle.body}

## 元記事のメタデータ
- タイトル: ${archiveArticle.data.title}
- カテゴリ: ${archiveArticle.data.category}
- slug: ${archiveArticle.data.slug || archiveArticle.file.replace(/^\d+-/, '').replace(/\.md$/, '')}
- タグ: ${(archiveArticle.data.tags || []).join(', ')}

## 参考: 高品質記事の例（このレベルを目指す）
${referenceArticle ? referenceArticle.slice(0, 3000) : '（参考記事なし）'}

今日の日付: ${new Date().toISOString().split('T')[0]}

リライトした記事全文（frontmatter含む）を出力してください。`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Claude API error: ${response.status} ${error}`);
    process.exit(1);
  }

  const result = await response.json();
  const text = result.content[0].text;

  // frontmatter + body を抽出（```yaml や ``` で囲まれている場合に対応）
  let articleContent = text;

  // もし全体が ```markdown で囲まれていたら除去
  articleContent = articleContent.replace(/^```(?:markdown|md)?\n/, '').replace(/\n```$/, '');

  // frontmatterが --- で始まることを確認
  if (!articleContent.startsWith('---')) {
    // --- を探して先頭部分を除去
    const frontmatterStart = articleContent.indexOf('---');
    if (frontmatterStart >= 0) {
      articleContent = articleContent.slice(frontmatterStart);
    }
  }

  return articleContent;
}

// --- 6. メイン処理 ---
async function main() {
  console.log('=== Archive Article Rewriter ===');

  // アーカイブから記事を選択
  const article = pickArchiveArticle();
  console.log(`Selected: ${article.file} (${article.size} bytes)`);
  console.log(`Title: ${article.data.title}`);
  console.log(`Category: ${article.data.category}`);

  // 参考記事を取得
  const reference = getReferenceArticle();

  // Claude APIでリライト
  console.log('Rewriting with Claude API...');
  const rewrittenContent = await rewriteWithClaude(article, reference);

  // 新しい記事番号とファイル名
  const nextNum = getNextArticleNumber();
  const slug = article.data.slug || article.file.replace(/^\d+-/, '').replace(/\.md$/, '');
  const newFileName = `${String(nextNum).padStart(3, '0')}-${slug}.md`;
  const newFilePath = path.join(blogDir, newFileName);

  // 書き込み
  fs.writeFileSync(newFilePath, rewrittenContent);
  console.log(`Written: ${newFileName}`);

  // リライト済みリストを更新
  markAsRewritten(article.file, newFileName);
  console.log(`Marked as rewritten: ${article.file} -> ${newFileName}`);

  // stdout に新ファイル名を出力（GitHub Actions用）
  console.log(`::set-output name=new_file::${newFileName}`);
  console.log(`NEW_FILE=${newFileName}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
