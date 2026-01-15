# Portfolio Site

本山貴裕のポートフォリオサイトのリポジトリです。

## 🚀 概要

このプロジェクトは、Next.js 16とReact 19を使用して構築されたモダンなポートフォリオサイトです。
プロジェクト、セッション情報、哲学、お問い合わせフォームなどを含む個人ブランディングサイトとして機能します。

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 16.1.1
- **UI**: React 19.2.3
- **スタイリング**: Tailwind CSS v4
- **アニメーション**: Framer Motion
- **アイコン**: Lucide React
- **言語**: TypeScript

## 📦 セットアップ

### 前提条件

- Node.js 20以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバーの起動
npm start

# Lintの実行
npm run lint
```

開発サーバーは [http://localhost:3000](http://localhost:3000) で起動します。


## 🌟 特徴

- **ブログシステム**: Markdownベースの記事管理、読了時間計算、タグ・カテゴリ検索
- **コメント機能**: Giscusを使用したGitHub Discussionsベースのコメントシステム
- **SEO最適化**: Next.js App Routerによる高速なページ遷移とメタデータ管理
- **レスポンシブデザイン**: モバイルファーストで構築されたTailwind CSSデザイン
- **デプロイ**: Vercelへの自動デプロイ（`main`ブランチ連動）

## 📚 ドキュメント

プロジェクトの詳細情報は `docs/` ディレクトリに集約されています。

- **[プロジェクト構造](./PROJECT_STRUCTURE.md)**: ディレクトリ構成とファイルの役割
- **[環境構築ガイド](./ENV_SETUP_GUIDE.md)**: ローカル開発環境のセットアップ手順
- **[プロジェクト概要](./PROJECT_OVERVIEW.md)**: ビジョン、アーキテクチャ、ロードマップ
- **[ブログ執筆ガイドライン](./docs/guides/BLOG_GUIDELINES.md)**: 記事の書き方、Frontmatterのルール

## 📄 ブログ投稿ルール

ブログ記事を作成する際は、必ず[ブログ執筆ガイドライン](./docs/guides/BLOG_GUIDELINES.md)に従ってください。
特に以下の点に注意してください：

1. **Frontmatter**: `slug`, `date`, `title` などの必須フィールドを含めること。
2. **日付ルール**: 未来の日付の記事は自動的に非公開（予約投稿扱い）となります。
3. **カテゴリ・タグ**: 原則として**日本語**を使用してください。

## 🤝 コントリビューション

コントリビューションガイドラインについては、[CONTRIBUTING.md](./CONTRIBUTING.md)を参照してください。

## 📧 お問い合わせ

ウェブサイトの[お問い合わせページ](https://takahiro-motoyama.vercel.app/contact)からご連絡ください。

