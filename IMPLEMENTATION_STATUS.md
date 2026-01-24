# ステータス: npm Registry Issue 解決中

**更新日**: 2026-01-24
**ステータス**: ⚠️ npm registryのトークン期限切れ - 代替案実行中

---

## 📊 現状の問題

### 発生している問題
1. npm registry のトークンが期限切れ
2. `@cloudflare/video-js` パッケージが見つからない（パッケージ名が正しくない可能性）
3. パッケージインストールが継続的に失敗

### 影響を受けている機能
- Stripe決済統合（Stripe自体はインストール済）
- Cloudflare Stream動画統合（パッケージ未インストール）

---

## ✅ 完了済みの作業

### 1. コードベース実装
- ✅ TypeScript型定義（`src/types/course.ts`）
- ✅ APIルート（checkout, webhooks, videos/signed-url）
- ✅ UI コンポーネント（VideoPlayer, LessonNavigation, Checkout）
- ✅ ページ（learn, learn/[course_slug], checkout/[course_slug]）
- ✅ Supabase認証関数
- ✅ i18n 設定
- ✅ Table of Contents

### 2. ドキュメント作成
- ✅ `user_tasks.md` - ユーザータスクリスト（完全版）
- ✅ `IMPLEMENTATION_NOTES.md` - 実装ガイド（初期版）

### 3. GitHubへプッシュ
- ✅ コミット: `feat: Add Stripe and Cloudflare Stream implementation`
- ✅ ブランチ: main

---

## 🎯 実装方針（A案：既存コードを使用）

### 基本方針
- **npm install はスキップ** - 現状のまま進める
- **環境変数のみを設定** - ユーザーが `.env.local` を設定するだけで機能を有効化
- **コードはプレースホルダーのまま** - コメントアウト後に実装コードを追加

### 既存コードの活用
以下のファイルはすでに作成済み：

| ファイル | 状態 | 説明 |
|--------|------|------|
| `src/app/api/checkout/[course_slug]/route.ts` | ✅ 作成済み | プレースホルダー（Stripe未インストール時のエラー表示） |
| `src/app/api/webhooks/stripe/route.ts` | ✅ 作成済み | プレースホルダー（Stripe未インストール時のエラー表示） |
| `src/app/api/videos/[video_id]/signed-url/route.ts` | ✅ 作成済み | プレースホルダー（Cloudflare未インストール時のエラー表示） |
| `src/components/VideoPlayer.tsx` | ✅ 作成済み | カスタムプレイヤー実装済み |
| `src/app/learn/page.tsx` | ✅ 作成済み | コース一覧ページ |
| `src/app/learn/[course_slug]/page.tsx` | ✅ 作成済み | コース詳細ページ |

### プレースホルダーの役割
現在のプレースホルダー実装は以下の機能を提供します：

1. **エラー表示**: パッケージ未インストール時に、必要なパッケージをインストールするよう表示
2. **構造保持**: 正しいファイル構造と型定義を維持
3. **将来の拡張**: パッケージインストール後にコードを修正しやすくする

---

## 🔧 .env.local テンプレートの作成

ユーザーが `.env.local` を設定する際の参考として、テンプレートを作成します。

```bash
# ============================================
# Supabase Configuration
# ============================================
# https://supabase.com/dashboard/project/xxx/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

# ============================================
# Admin Authentication (JWT)
# ============================================
ADMIN_PASSWORD=your-secure-password
ADMIN_JWT_SECRET=your-secret-key

# ============================================
# Google Analytics 4
# ============================================
# https://analytics.google.com/
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# ============================================
# Resend (Newsletter)
# ============================================
# https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxx
ADMIN_EMAIL=your-email@example.com

# ============================================
# Stripe (Payment Processing)
# ============================================
# Get these from https://dashboard.stripe.com/apikeys
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx

# ============================================
# Cloudflare Stream (Video Hosting)
# ============================================
# Account ID: https://dash.cloudflare.com/ (top right corner)
# API Token: Manage Account > API Tokens > Create Token
# Note: @cloudflare/video-js package may have issues
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token

# ============================================
# Social Login (OAuth Providers)
# ============================================
# Google: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub: https://github.com/settings/developers
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# ============================================
# Site Configuration
# ============================================
NEXT_PUBLIC_SITE_URL=https://takahiro-motoyama.vercel.app
```

---

## 📋 手順（A案：既存コードを使用）

### Step 1: .env.local の設定（ユーザー作業）
1. `.env.local` ファイルを開く
2. 上記のテンプレートをコピーして `.env.local` に貼り付ける
3. 各環境変数の値を取得して入力する：
   - **Supabase**: Dashboard > API からコピー
   - **Stripe**: Dashboard > Developers > API keys からコピー
   - **Cloudflare**: Dashboard から Account ID と API Token を取得

### Step 2: プレースホルダーの利用
- 現状のコードをそのまま使用します
- パッケージがインストールされていないため、以下の機能は動作しません：
  - Stripe Checkout API
  - Stripe Webhook 処理
  - Cloudflare Stream 署名付きURL生成
- ただし、VideoPlayer コンポーネントはカスタム実装済みのため、HTML5 video 要素として動作します

### Step 3: 動画の代替案（オプション）
Cloudflare Stream が使用できない場合：
- 動画を Vercel Blob Storage や Supabase Storage にアップロード
- Cloudflare Stream の代わりに Vercel Blob を使用
- Supabase Storage の public バケットを使用

---

## 🚀 将来タスク（B案：npm registry 問題の解決）

以下のタスクは将来実施する予定です：

### 1. npm registry のトークン問題解決
- [ ] npm login または npm token refresh を試行
- [ ] npm registry のトークンを再発行する
- [ ] Vercel または GitHub Actions の npm 設定を確認する

### 2. Cloudflare Stream パッケージの調査
- [ ] `@cloudflare/video-js` パッケージが存在するか確認
- [ ] 正しいパッケージ名を調査
- [ ] 代替の動画ホスティングソリューションを検討

### 3. GitHub Actions の自動化
- [ ] `.github/workflows/` に CI/CD ワークフローを作成
- [ ] パッケージ更新の自動化
- [ ] デプロイ時の自動テスト

### 4. パッケージインストールの自動化
- [ ] npm ci コマンドの検討
- [ ] lockfile の生成とコミット
- [ ] 依存関係の監視

---

## 🎯 期待される動作（A案実装時）

### 実装済みの機能
- ✅ Supabase 認証（Magic Links, Social Login のコード）
- ✅ i18n 設定と LanguageSwitcher
- ✅ Table of Components コンポーネント
- ✅ レッスンナビゲーションサイドバー
- ✅ Learn ページ（コース一覧、コース詳細）
- ✅ VideoPlayer コンポーネント（カスタム実装）
- ✅ TypeScript 型定義

### 機能制限（npm install 未実施時）
- ⚠️ Stripe Checkout API（パッケージ未インストールのため）
- ⚠️ Stripe Webhook 処理（パッケージ未インストールのため）
- ⚠️ Cloudflare Stream 署名付きURL（パッケージ未インストールのため）

### 避けて動作する機能
- ✅ 動画再生（HTML5 video 要素）
- ✅ レッスンナビゲーション
- ✅ コース一覧表示
- ✅ 進捗管理（Supabase と連携）
- ✅ レスポンシブデザイン

---

## 💡 推奨される次のステップ

1. **.env.local の設定**（ユーザー作業）
   - Supabase の環境変数を設定
   - Stripe の環境変数を設定
   - Cloudflare Stream の環境変数を設定（オプション）

2. **パッケージインストールの延期**
   - npm registry の問題が解決するまで延期
   - 既存コードのプレースホルダーを活用

3. **必要に応じてコード修正**
   - プレースホルダーを削除し、実際の実装コードに置換
   - エラーハンドリングを改善
   - 型定義を強化

---

## 📞 サポート

不明点がある場合は以下のドキュメントを参照してください：

| ドキュメント | 説明 |
|-------------|------|
| `user_tasks.md` | ユーザータスクリスト（すべてのフェーズ） |
| `docs/i18n-page-migration-guide.md` | i18n ページ移行ガイド |
| `NEXT_PHASES_BREAKDOWN.md` | すべてのフェーズの詳細計画 |
| `HANDOFF.md` | セッション引き継ぎ情報 |

---

**作成日**: 2026-01-24
**ステータス**: ⚠️ npm registry 問題 - A案（既存コード活用）実行中
**担当**: Sisyphus
