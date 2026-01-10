# プロジェクト構造

このドキュメントでは、ポートフォリオサイトのディレクトリ構成とファイルの役割について説明します。

## 📁 ディレクトリ構造

```
portfolio/
├── src/                          # ソースコード
│   ├── app/                      # Next.js App Router
│   │   ├── about/                # Aboutページ
│   │   │   ├── page.tsx
│   │   │   └── metadata.ts
│   │   ├── contact/              # お問い合わせページ
│   │   │   ├── page.tsx
│   │   │   └── metadata.ts
│   │   ├── faq/                  # FAQページ
│   │   │   └── page.tsx
│   │   ├── philosophy/           # 哲学ページ
│   │   │   ├── page.tsx
│   │   │   └── metadata.ts
│   │   ├── sessions/             # セッションページ
│   │   │   ├── page.tsx
│   │   │   └── metadata.ts
│   │   ├── useful-info/          # お役立ち情報ページ
│   │   │   └── page.tsx
│   │   ├── layout.tsx            # ルートレイアウト
│   │   ├── page.tsx              # ホームページ
│   │   ├── metadata-home.ts      # ホームページのメタデータ
│   │   ├── globals.css           # グローバルスタイル
│   │   ├── sitemap.ts            # サイトマップ生成
│   │   └── favicon.ico           # ファビコン
│   ├── components/               # 再利用可能なReactコンポーネント
│   │   ├── BookingForm.tsx       # 予約フォーム
│   │   ├── Dashboard.tsx         # ダッシュボード
│   │   ├── Header.tsx            # ヘッダーコンポーネント
│   │   ├── LiquidCursor.tsx      # カスタムカーソル
│   │   ├── LoadingSpinner.tsx    # ローディングスピナー
│   │   ├── ParallaxBackground.tsx # パララックス背景
│   │   ├── ProjectModal.tsx      # プロジェクトモーダル
│   │   ├── SectionBackground.tsx # セクション背景
│   │   ├── SkipLink.tsx          # スキップリンク(アクセシビリティ)
│   │   └── StructuredData.tsx    # 構造化データコンポーネント
│   └── lib/                      # ユーティリティとヘルパー関数
│       └── structured-data.ts    # 構造化データ生成ロジック
├── content/                      # コンテンツファイル
│   ├── blog/                     # ブログ記事(Markdown)
│   │   ├── 001-knowhow-dependency.md
│   │   ├── 002-ai-thinking-partner.md
│   │   └── 003-three-questions.md
│   └── articles/                 # 技術記事・一般記事
├── docs/                         # ドキュメント
│   ├── guides/                   # ガイド・チュートリアル
│   └── reference/                # リファレンス資料
├── public/                       # 静的ファイル
├── .next/                        # Next.jsビルド出力(自動生成)
├── node_modules/                 # 依存関係(自動生成)
├── .env.local                    # 環境変数(ローカル)
├── .env.example                  # 環境変数のサンプル
├── .gitignore                    # Git除外設定
├── eslint.config.mjs             # ESLint設定
├── next.config.ts                # Next.js設定
├── package.json                  # プロジェクト依存関係
├── postcss.config.mjs            # PostCSS設定
├── tsconfig.json                 # TypeScript設定
├── README.md                     # プロジェクト概要
├── PROJECT_STRUCTURE.md          # このファイル
├── PROJECT_OVERVIEW.md           # プロジェクトビジョン
├── CONTRIBUTING.md               # コントリビューションガイド
└── REPOSITORY_GUIDE.md           # リポジトリ関係性ガイド
```

## 📝 ディレクトリの役割

### `src/app/`
Next.js 16のApp Routerを使用したページとルーティング。各ページディレクトリには以下が含まれます:
- `page.tsx`: ページコンポーネント
- `metadata.ts`: SEO用のメタデータ定義

### `src/components/`
再利用可能なReactコンポーネント。UI要素、フォーム、アニメーションなどを含みます。

### `src/lib/`
ビジネスロジック、ユーティリティ関数、ヘルパー関数。

### `content/`
Markdownベースのコンテンツ:
- `blog/`: ブログ記事
- `articles/`: 技術記事や一般記事

### `docs/`
プロジェクトドキュメント:
- `guides/`: 使い方ガイド、チュートリアル
- `reference/`: APIリファレンス、技術仕様

### `public/`
画像、フォント、その他の静的アセット。

## 🎨 命名規則

### ファイル命名
- **Reactコンポーネント**: PascalCase (例: `BookingForm.tsx`)
- **ユーティリティ**: kebab-case (例: `structured-data.ts`)
- **ページ**: Next.jsの規約に従う (`page.tsx`, `layout.tsx`)
- **設定ファイル**: 小文字 + ドット (例: `next.config.ts`)

### コンポーネント命名
- **コンポーネント名**: PascalCase
- **関数名**: camelCase
- **定数**: UPPER_SNAKE_CASE

## 🔄 追加・変更時のガイドライン

### 新しいページを追加する場合
1. `src/app/` 内に新しいディレクトリを作成
2. `page.tsx` と `metadata.ts` を作成
3. 必要に応じて `layout.tsx` を追加

### 新しいコンポーネントを追加する場合
1. `src/components/` に新しいファイルを作成
2. コンポーネントをエクスポート
3. 必要に応じて型定義を含める

### 新しいコンテンツを追加する場合
1. ブログ記事: `content/blog/` に Markdown ファイルを追加
2. 技術記事: `content/articles/` に Markdown ファイルを追加
3. ファイル名は連番 + 説明的な名前 (例: `004-new-article.md`)

### ドキュメントを追加する場合
1. ガイド: `docs/guides/` に Markdown ファイルを追加
2. リファレンス: `docs/reference/` に Markdown ファイルを追加
