# プロジェクト全体像

## 📋 概要

本山貴裕のポートフォリオサイト開発プロジェクト。

**目的**: AIを活用した自己啓発・副業支援のエキスパートとしてのオンラインプレゼンスを確立し、サービス提供・コンテンツ発信を通じて信頼を構築する。

---

## 📊 全体進捗

```
全フェーズ合計: 78% (21.5/27.5 フェーズ)

Phase 1: 基盤整備        ✅ 100%
Phase 2: コンテンツ充実     ✅ 100%
Phase 3: コンテンツ拡充       ✅ 90%
Phase 4: 専門性確立と収益化   🟡 85%
Phase 5: プラットフォーム化とコミュニティ形成 🟡 60%
```

---

## 🏗️ 技術スタック

| 技術 | 用途 | バージョン |
|------|------|---------|
| **Next.js** | フレームワーク | 16.1.1 |
| **React** | UIライブラリ | 19.2.3 |
| **TypeScript** | 型システム | - |
| **Tailwind CSS** | スタイリング | v4 |
| **Framer Motion** | アニメーション | - |
| **Supabase** | バックエンド・認証 | 設定中 |
| **Vercel** | ホスティング | - |

---

## 📄 主要ページ構成

| ページ | URL | 説明 |
|--------|-----|------|
| ホーム | `/` | ファーストインプレッション、主要CTA |
| About | `/about` | 経歴、スキル、パーソナリティ |
| セッション | `/sessions` | サービス詳細と予約 |
| 哲学 | `/philosophy` | 価値観、アプローチ |
| FAQ | `/faq` | よくある質問 |
| お役立ち情報 | `/useful-info` | 無料コンテンツ、リソース |
| お問い合わせ | `/contact` | 連絡フォーム |
| ブログ一覧 | `/blog` | 全記事一覧、検索 |
| 記事詳細 | `/blog/[slug]` | 個別記事ページ |
| タグ検索 | `/blog/tag/[tag]` | タグによる記事フィルタリング |
| コースカタログ | `/courses` | オンラインコース一覧 |
| コース詳細 | `/courses/[slug]` | コース販売ページ |
| ログイン | `/auth/login` | 認証ページ |
| 認証コールバック | `/auth/callback` | 認証完了処理 |

---

## 🎨 デザイン

### カラーパレット
- **Indigo** (`#1B365D`) - メインテキスト、ヘッダー、ボタン
- **Cream** (`#F5F1E8`) - 背景色、カード背景
- **Vermilion** (`#D9381E`) - CTAボタン、強調
- **Charcoal** (`#2D2D2D`) - 本文テキスト
- **Gold** (`#C5A059`) - アクセント、強調

### 背景・パターン
- 和紙質感 - 主要背景（ノイズテクスチャ）
- 青海波 - ヒーローセクション、フィロソフィーセクション
- 麻の葉 - CTAセクション、カード装飾

---

## 📝 成果

### Phase 1: 基盤整備 ✅ 100%
- Next.js 16 + React 19 プロジェクト構築
- 6ページ実装
- レスポンシブデザイン
- SEO最適化

### Phase 2: コンテンツ充実 ✅ 100%
- 100本のブログ記事作成
- Markdownベースのブログシステム
- 読了時間計算、タグ・カテゴリ検索
- Giscusコメントシステム統合
- OGP設定、SNSシェア対応

### Phase 3: コンテンツ拡充とエンゲージメント向上 ✅ 90%
- Mermaid図解全記事追加
- ニュースレター機能
- コメントシステム検証完了
- ブログ自動公開システム（毎日JST 00:00自動ビルド）
- プロジェクト自動更新（GitHub API連携）

### Phase 4: 専門性の確立と収益化 🟡 85%
- コース販売ページ・カタログ実装
- ケーススタディ・テスティモニアルページ
- 2つのコース（Life Design Basic, AI Productivity Master）詳細設計
- Supabase調査完了、設計完了

### Phase 5: プラットフォーム化とコミュニティ形成 🟡 60%
- コース販売プラットフォームの設計完了
- メンバーシップ、フォーラム、イベント機能設計完了
- コースUI実装完了
- 日本風デザイン適用
- 認証フロー実装（Magic Links）
- データベーススキーマ定義
- Row Level Security (RLS) ポリシー定義

---

## 🔗 デプロイ

- **本番URL**: https://takahiro-motoyama.vercel.app
- **ホスティング**: Vercel
- **自動デプロイ**: GitHub mainブランチへのマージで自動デプロイ
- **環境変数**: `.env.local`（ローカル）、Vercel Environment Variables（本番）

---

## 📂 プロジェクト構造

```
portfolio/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (pages)    # ページコンポーネント
│   │   ├── api/        # APIルート
│   │   ├── auth/       # 認証関連ページ
│   │   └── courses/    # コース関連ページ
│   ├── components/       # 再利用コンポーネント
│   ├── data/             # データファイル
│   └── lib/              # ユーティリティ関数
├── content/
│   └── blog/             # ブログ記事（Markdown）
├── supabase/           # Supabase関連（スキーマ、RLS）
├── .github/
│   └── workflows/       # GitHub Actions
└── public/              # 静的アセット
```

---

## 🚀 GitHub Actions

| ワークフロー | 説明 | スケジュール |
|-----------|------|-----------|
| `daily-rebuild.yml` | ブログ自動公開・本番ビルド | 毎日JST 00:00 |

---

## 📊 統計情報

- 総タスク数: 27
- 完了タスク: 22
- 未完了タスク: 5

---

## 🎯 高優先タスク（次のステップ）

| 優先度 | タスク | 依存関係 | GitHub Issue |
|--------|------|----------|-------------|
| 🔴 高 | Supabase + Auth インフラ設定 | なし | #61 |
| 🔴 高 | Cloudflare Stream 動画ホスティング | #61 | #62 |
| 🟡 中 | Stripe決済統合 | #61 | #57 |
| 🟡 中 | 学習ダッシュボード実装 | #62 | - |

---

## 🔗 関連リソース

- [ROADMAP.md](./ROADMAP.md) - 詳細なロードマップ
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - プロジェクト概要
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - プロジェクト構造
- [CONTRIBUTING.md](./CONTRIBUTING.md) - 開発ガイド
- [GitHub Issues](https://github.com/tndg16-bot/portfolio-site/issues) - タスク管理
- [GitHub Repository](https://github.com/tndg16-bot/portfolio-site) - ソースコード

---

## 📝 開発フロー

1. Issue作成 - 新機能・修正はGitHub Issue先行
2. ブランチ作成 - `feature/[機能名]` 形式
3. 開発 - ローカル開発サーバーでの実装
4. PR作成 - レビュー依頼
5. マージ - 承認後mainにマージ
6. 自動デプロイ - Vercelで自動デプロイ

---

## 🔒 環境変数

### ローカル開発 (`.env.local`)
```bash
# Google Forms
NEXT_PUBLIC_GOOGLE_FORMS_URL=https://...
NEXT_PUBLIC_ENTRY_NAME=entry.1234567890
NEXT_PUBLIC_ENTRY_EMAIL=entry.1234567891
# ... (他のEntry IDs)

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=your-email@example.com

# GitHub
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=tndg16-bot
GITHUB_REPO=papa

# Supabase (Issue #61)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 本番環境 (Vercel Environment Variables)
- すべての `NEXT_PUBLIC_*` 変数を追加
- `RESEND_API_KEY`, `ADMIN_EMAIL` を追加
- `GITHUB_TOKEN` を追加
- `VERCEL_TOKEN` をGitHub Actions Secretに追加（GitHub Actions用）

---

## 📈 KPI

| 指標 | 現在の値 | 目標 |
|------|---------|------|
| ページ読み込み速度 | < 3秒 | < 2秒 |
| アクセシビリティスコア | 90+ | 95+ |
| SEOスコア | 90+ | 95+ |
| パフォーマンススコア | 80+ | 90+ |

---

## 🎓 プロジェクト履歴

- 2024年1月: プロジェクト開始
- 2024年Q1-Q2: Phase 1-2 完了
- 2025年Q2-Q3: Phase 3 基本機能完了
- 2026年1月: Phase 4 コース販売完了、Phase 5 コースUI完了、認証フロー実装、データベーススキーマ定義

---

## 🚧 次のステップ

1. **Supabase プロジェクト作成** (Issue #61)
   - https://supabase.com で新規プロジェクト作成
   - `supabase/schema.sql` をSQL Editorで実行
   - `supabase/rls.sql` をSQL Editorで実行
   - 環境変数設定

2. **Cloudflare Stream 連携** (Issue #62)
   - Cloudflare Streamアカウント作成
   - 動画アップロード機能実装
   - 署名付きURL生成

3. **Stripe決済統合** (Issue #57)
   - Stripeアカウント設定
   - Checkoutページ作成
   - Webhook処理実装

---

**最終更新**: 2026-01-22
