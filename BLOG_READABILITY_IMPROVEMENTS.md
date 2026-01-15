# ブログ記事の読みやすさ改善プラン

## 概要

ブログ記事の読みやすさを向上させるための包括的な改善プランです。タイポグラフィ、画像処理、タグシステムなどの改善を含みます。

## 改善項目

### 1. タイポグラフィの改善 (高優先度)

**問題点:**
- 日本語に最適化されたフォントサイズと行間が使用されていない
- 見出しの階層が視覚的に区別しにくい
- 段落間のスペースが不足している

**改善内容:**
- 本文フォントサイズ: 16-18px (推奨: 17px)
- 行間: 1.85-2.0 (日本語はより広い行間が必要)
- 見出し階層の強化:
  - H1: 32-48px (700-900 weight)
  - H2: 24-32px (600-800 weight)
  - H3: 20-24px (600-700 weight)
- 段落間のスペース: フォントサイズの2倍以上 (WCAG基準)
- 最大幅: 65ch (~700px) で最適な読みやすさを確保

**関連ファイル:**
- `src/app/blog/[slug]/page.tsx` (prose classes)
- `tailwind.config.ts`

### 2. 読了時間の表示 (中優先度)

**改善内容:**
- `src/lib/posts.ts` に読了時間計算ロジックを追加
- 各記事のメタ情報に表示
- 計算式: 日本語400文字/分、英語200単語/分

**関連ファイル:**
- `src/lib/posts.ts`
- `src/app/blog/[slug]/page.tsx`

### 3. Markdown内の画像処理改善 (高優先度)

**問題点:**
- 現在は `ArticleImage` コンポーネントしか使用できない
- Markdown内の `![]()` 構文が対応されていない

**改善内容:**
- `remark` プラグインを使用してMarkdown内の画像を `next/image` に変換
- `remark-rehype` + `rehype-raw` で画像処理
- 自動的な最適化とレスポンシブ対応

**関連ファイル:**
- `src/lib/posts.ts` (remark pipeline)
- `src/components/ArticleImage.tsx` (既存コンポーネントの活用)

### 4. 画像キャプション対応 (中優先度)

**改善内容:**
- Markdownで `![alt](src "caption")` 構文をサポート
- カスタムremarkプラグインでキャプションを抽出
- `<figure><img><figcaption>` 構造で出力

**関連ファイル:**
- `src/lib/posts.ts`

### 5. タグのクリック可能化・検索機能 (中優先度)

**改善内容:**
- 各タグをクリック可能にして、タグでフィルタリングした記事一覧を表示
- `/blog/tag/[tag]` ルートの作成
- タグページで関連記事を一覧表示

**関連ファイル:**
- `src/app/blog/page.tsx`
- `src/app/blog/tag/[tag]/page.tsx` (新規作成)
- `src/app/blog/[slug]/page.tsx` (タグリンク追加)

### 6. 著者バイオセクションの追加 (低優先度)

**改善内容:**
- 記事の下部に著者のプロフィールを表示
- アバター画像、名前、簡単な紹介文を含む

**関連ファイル:**
- `src/components/AuthorBio.tsx` (新規作成)
- `src/app/blog/[slug]/page.tsx`

### 7. 目次の改善 (中優先度)

**改善内容:**
- スクロール時の目次の固定位置表示
- モバイルでの折りたたみUIの改善
- アクティブセクションの視覚的な強調向上

**関連ファイル:**
- `src/components/TableOfContents.tsx`

### 8. 見出し階層の視覚的強化 (高優先度)

**改善内容:**
- H2見出しの下に境界線を追加
- 各見出しレベルで異なるスタイルを使用
- H2: 太い境界線 + アイコン
- H3: 薄い境界線
- アンカーリンクの表示

**関連ファイル:**
- `src/app/blog/[slug]/page.tsx` (prose classes)

## 実装順序

1. **フェーズ1: 基礎的な読みやすさの改善**
   - タイポグラフィの改善
   - 見出し階層の強化
   - 読了時間の表示

2. **フェーズ2: 画像機能の強化**
   - Markdown内の画像処理
   - 画像キャプション対応

3. **フェーズ3: 機能追加**
   - タグのクリック可能化
   - 目次の改善
   - 著者バイオセクション

4. **フェーズ4: テストと検証**
   - すべての変更のテスト
   - ブラウザでの動作確認

## 参考資料

- [Modern Web Typography Techniques 2025](https://www.frontendtools.tech/blog/modern-web-typography-techniques-2025-readability-guide)
- [WCAG 2.2 Text Spacing Requirements](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
- [Japanese Web Typography Best Practices](https://www.aqworks.com/blog/perfect-japanese-typography)
- [Next.js Image Optimization](https://nextjs.org/docs/api-reference/next/image)

## 成功の定義

- [ ] 日本語の読みやすさが向上している
- [ ] 画像がMarkdown内で適切に表示される
- [ ] タグで記事をフィルタリングできる
- [ ] モバイルとデスクトップの両方で快適に読める
- [ ] アクセシビリティ基準 (WCAG AA) を満たしている
