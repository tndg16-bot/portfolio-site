# ユーザータスクリスト（完全版）

**更新日**: 2026-01-24
**ブランチ**: `feature/supabase-courses-i18n-blog-toc`

---

## 📊 プロジェクト全体概観

### 現在のフェーズ進捗

| Phase | 名称 | 進捗 | 状態 | GitHub Issue |
|-------|------|------|-------------|
| Phase 1 | 基盤整備 | 100% | ✅ 完了 | - |
| Phase 2 | コンテンツ充実 | 100% | ✅ 完了 | PR #67 マージ済み |
| Phase 3 | コンテンツ拡充とエンゲージメント | 95% | ✅ 基本完了 | #37, #69, #73, #75 |
| Phase 4 | 専門性の確立と収益化 | 90% | 🟡 決済未完了 | #57, #72 |
| Phase 5 | プラットフォーム化とコミュニティ形成 | 70% | 🟡 インフラ未完了 | #61, #62, #68, #71, #76 |

### AIによる実装完了（本セッション）

#### ✅ #61 Supabase Setup
- データベーススキーマ作成（courses, modules, lessons, enrollments, user_progress）
- Social Login関数実装（Google, GitHub）
- OAuthコールバックルート実装
- **状態**: コードベース実装完了 → **ユーザー作業: Supabaseプロジェクト作成と設定**

#### ✅ #69 i18n Implementation（基盤）
- next-intl設定完了
- LanguageSwitcherコンポーネント実装
- Header統合完了
- **状態**: 基盤設定完了 → **ユーザー作業: ページ多言語化（別ガイド参照）**

#### ✅ #70 Blog Readability Enhancement
- Table of Contentsコンポーネント実装
- BlogページへのTOC統合
- **状態**: 完了

#### ✅ TypeScript エラー修正（2026-01-24）
- Stripe webhook route: `headers()` async呼び出し修正、`NextResponse` import追加
- Checkout page: 型エラー修正（Course型完全準拠）
- VideoPlayer component: props interface更新（videoId, lessonId, onProgressUpdate, onComplete）
- Learn pages: Supabase query修正、cn utility import追加
- Learn slug page: VideoPlayer props修正
- **検証**: `npx tsc --noEmit` 完了（0エラー）
- **状態**: ✅ すべてのTypeScriptエラー解消 → **次回セッションでStripe実装アクティベーション可能**

---

## 🔴 高優先タスク（ユーザー作業が必要）

### タスク1: Supabase プロジェクト作成と設定

**優先度**: 🔴 極高
**見積もり**: 15-30分
**関連Issue**: #61

#### 手順:

**ステップ1: Supabase プロジェクト作成**
1. [ ] https://supabase.com にアクセス
2. [ ] `New Project` をクリック
3. [ ] 以下の情報を入力:
   - Organization: 既存の組織を選択 or 新規作成
   - Project Name: `portfolio-site-courses`（任意）
   - Database Password: 強力なパスワードを設定（安全に保管）
   - Region: 東京（ap-northeast-1）を推奨
4. [ ] `Create new project` をクリック
5. [ ] プロジェクトの作成完了を待つ（約2分）

**ステップ2: 環境変数を `.env.local` に追加**
1. [ ] Supabase Dashboard > Project Settings > API に移動
2. [ ] 以下の情報を `.env.local` に追加:

```bash
# ============================================
# Supabase
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

**ステップ3: データベーススキーマの適用**
1. [ ] Supabase Dashboard > SQL Editor に移動
2. [ ] `New Query` をクリック
3. [ ] 以下のSQLファイルを実行（順番通り）:
   - `supabase/migrations/001_newsletter_system.sql`
   - `supabase/migrations/002_courses_system.sql`
4. [ ] 実行成功を確認（緑色のチェックマーク）

**確認事項**:
- [ ] ローカル開発環境で環境変数が読み込まれている
- [ ] SQL Editor で全てのテーブルが作成されている

---

### タスク2: Social Login プロバイダーの有効化

**優先度**: 🔴 極高
**見積もり**: 30-45分
**関連Issue**: #61
**前提**: タスク1完了

#### 手順:

**ステップ1: Google Sign In**
1. [ ] Supabase Dashboard > Authentication > Providers に移動
2. [ ] Google プロバイダーを探して `Enable` をクリック
3. [ ] Google Cloud Console で Client ID/Secret を取得:
   - https://supabase.com/docs/guides/auth/social-login/auth-google に従って設定
4. [ ] Redirect URI: `https://[PROJECT_ID].supabase.co/auth/v1/callback` を設定

**ステップ2: GitHub Sign In**
1. [ ] GitHub プロバイダーを探して `Enable` をクリック
2. [ ] GitHub Developer Settings で OAuth App を作成:
   - Settings > Developer settings > OAuth Apps
   - New OAuth App をクリック
3. [ ] 以下の情報を入力:
   - Application name: `Portfolio Site`（任意）
   - Homepage URL: `https://takahiro-motoyama.vercel.app`
   - Authorization callback URL: `https://[PROJECT_ID].supabase.co/auth/v1/callback`
4. [ ] Client ID と Client Secret をメモし、Supabaseに入力

**ステップ3: 環境変数に追加**
```bash
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

**確認事項**:
- [ ] Supabase Dashboard で Google と GitHub が有効になっている
- [ ] ログインページで Google/GitHub ボタンが表示される
- [ ] テストログインが成功する

---

### タスク3: Giscus コメント設定

**優先度**: 🟡 中
**見積もり**: 15-30分
**関連Issue**: 機能追加済み

#### 手順:

**ステップ1: Giscus設定**
1. [ ] https://giscus.app にアクセス
2. [ ] 以下の情報を入力:
   - Repository: `tndg16-bot/portfolio-site`
   - Page ↔️ Discussions mapping: `pathname`
   - Discussion category: `Announcements`（または適切なカテゴリ）
   - Theme: `dark`（またはサイトのテーマに合わせて調整）
3. [ ] Enable giscus ボタンをクリック

**ステップ2: ID の更新**
1. [ ] 生成された `data-repo`、`data-repo-id`、`data-category-id` を確認
2. [ ] `src/components/GiscusComments.tsx` を編集し、ID を更新

**確認事項**:
- [ ] ブログ記事の下部にコメントセクションが表示される
- [ ] コメントが GitHub Discussions に保存される

---

### タスク4: 環境変数の完全設定

**優先度**: 🔴 極高
**見積もり**: 10分

#### `.env.local` の完全な環境変数リスト:

```bash
# ============================================
# Supabase
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

# ============================================
# Admin (既存 - 確認)
# ============================================
ADMIN_PASSWORD=your-secure-password
ADMIN_JWT_SECRET=your-secret-key

# ============================================
# Google Analytics 4 (既存 - 確認)
# ============================================
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# ============================================
# Resend (ニュースレター - 既存 - 確認)
# ============================================
RESEND_API_KEY=re_xxxxxxxxxxxxxx
ADMIN_EMAIL=your-email@example.com

# ============================================
# Social Login (Google OAuth)
# ============================================
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# ============================================
# Social Login (GitHub OAuth)
# ============================================
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# ============================================
# Vercel / Site Configuration
# ============================================
NEXT_PUBLIC_SITE_URL=https://takahiro-motoyama.vercel.app
```

**手順**:
- [ ] `.env.local` を開く
- [ ] 上記の全ての変数を追加/更新
- [ ] 各変数の値を正しく入力
- [ ] `.env.local` は `.gitignore` に含まれていることを確認

**確認事項**:
- [ ] `npm run dev` で起動時にエラーが出ない

---

## 🟡 中優先タスク（次のフェーズ）

### タスク5: Stripe 決済統合 (#57)

**優先度**: 🟡 中
**見積もり**: 2-3時間
**前提**: #61 Supabase Setup 完了
**状態**: 🟢 コード実装完了、TypeScriptエラー解消済み → **ユーザー作業のみ**

**実装済み**:
- ✅ Stripe Checkout API route (`src/app/api/checkout/[course_slug]/route.ts`)
- ✅ Stripe Webhook handler (`src/app/api/webhooks/stripe/route.ts`)
- ✅ Checkout UI page (`src/app/checkout/[course_slug]/page.tsx`)
- ✅ VideoPlayer component（progress tracking対応）
- ✅ Learning dashboard pages
- ✅ 全TypeScriptエラー解消

#### 手順:

**ステップ1: Stripe アカウント作成**
1. [ ] https://dashboard.stripe.com にアクセス
2. [ ] アカウントを作成 or ログイン
3. [ ] テストモードであることを確認

**ステップ2: Product と Price の作成**
1. [ ] Products > Add product をクリック
2. [ ] 最初のコースの情報を入力
3. [ ] `Save product` をクリック
4. [ ] Product ID と Price ID をメモ

**ステップ3: Webhook の設定**
1. [ ] Developers > Webhooks > Add endpoint をクリック
2. [ ] Endpoint URL: `https://takahiro-motoyama.vercel.app/api/webhooks/stripe`
3. [ ] `checkout.session.completed` イベントを選択
4. [ ] Signing secret をメモ

**ステップ4: 環境変数を追加**
```bash
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx
```

**確認事項**:
- [ ] チェックアウトページが正常に表示される
- [ ] テスト決済が成功する

---

### タスク6: Cloudflare Stream 統合 (#62)

**優先度**: 🟡 中
**見積もり**: 2-3時間
**前提**: #61 Supabase Setup 完了、#57 Stripe 統合完了
**状態**: 🟡 npmレジストリ問題あり → **代替案: Vercel Blob Storage**

**問題点**:
- npm registry token expired（@cloudflare/video-jsインストール不可）
- `pnpm`コマンド未インストール

**代替案（推奨）: Vercel Blob Storage**
- ✅ ドキュメント作成済み（`VERCEL_BLOB_IMPLEMENTATION.md`）
- ✅ npmパッケージ不要
- ✅ 環境変数設定後すぐ実装可能
- 📋 次回セッションでの実装準備完了

#### 手順:

**ステップ1: Cloudflare アカウント作成**
1. [ ] https://dash.cloudflare.com にアクセス
2. [ ] アカウントを作成 or ログイン

**ステップ2: Stream プロジェクト作成**
1. [ ] 左メニュー > Stream > Videos に移動
2. [ ] `Add videos` をクリック

**ステップ3: API Key の取得**
1. [ ] Manage Account > API Tokens に移動
2. [ ] `Create Token` をクリック
3. [ ] 以下の権限を設定:
   - Account: Stream Videos (Edit)
4. [ ] Token をメモ

**ステップ4: 環境変数を追加**
```bash
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
```

**確認事項**:
- [ ] 動画が正常に再生される

---

## 🟢 低優先タスク（改善）

### タスク7: 多言語対応のページ実装

**優先度**: 🟢 低
**見積もり**: 4-6時間
**関連Issue**: #69
**前提**: 基盤設定完了（本セッションで完了）

#### 手順:

1. [ ] `docs/i18n-page-migration-guide.md` を確認
2. [ ] `[locale]`ルーティング構造への移行を実行
3. [ ] 各ページを `useTranslations()` で翻訳化
4. [ ] 言語切り替えテストを実行

---

## 📝 テストチェックリスト

### Supabase & 認証
- [ ] Magic Links でログインできる
- [ ] Google でサインインできる
- [ ] GitHub でサインインできる
- [ ] セッションが正しく管理されている

### Blog
- [ ] ブログ記事が正常に表示される
- [ ] 目次（TOC）が表示され、クリックでスクロールする
- [ ] 目次が現在のセクションをハイライトする
- [ ] コメントが機能する
- [ ] シェアボタンが動作する

### Multi-language
- [ ] 言語スイッチャーが表示される
- [ ] 日本語と英語で切り替わる
- [ ] URL が `/ja/` と `/en/` で正しくルーティングされる

### Newsletter
- [ ] ニュースレター購読フォームが動作する
- [ ] 管理画面で購読者が表示される

---

## 🔗 関連リソース

### ドキュメント
- `docs/i18n-page-migration-guide.md` - i18n ページ移行ガイド
- `HANDOFF.md` - セッション引き継ぎ情報
- `NEXT_PHASES_BREAKDOWN.md` - 全フェーズの詳細計画

### 外部サービス
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Cloudflare Stream Documentation](https://developers.cloudflare.com/stream)
- [Giscus Documentation](https://giscus.app)
- [next-intl Documentation](https://next-intl-docs.vercel.app)

---

## 💡 実行推奨順序

### ユーザー作業（本日〜数日以内）
1. **Supabase プロジェクト作成** (15-30分) 🔴 極高
2. **Social Login プロバイダーの有効化** (30-45分) 🔴 極高
3. **環境変数の完全設定** (10分) 🔴 極高
   - Supabase
   - Stripe（テストモード）
   - Vercel Blob Token

### AI実装タスク（次回セッション）

**優先度1: Vercel Blob Storage実装**（推奨）
- Cloudflareのnpm問題を回避
- ドキュメント完備済み
- 見積もり: 2-3時間

**優先度2: Stripe実装のアクティベーション**
- プレースホルダーコードを有効化（コメント解除）
- 環境変数設定後に実施可能
- 見積もり: 1-2時間

**優先度3: i18nページ移行**
- 既存ページを`[locale]`構造に移行
- 見積もり: 4-6時間

### 短期実行（1-2時間後）
4. **Giscus コメント設定** (15-30分) 🟡 中

### 中期実行（数日〜1週間後）
5. **Stripe 決済統合** (2-3時間) 🟡 中 → **コード実装済み、ユーザー作業のみ**
6. **Vercel Blob Storage** (2-3時間) 🟡 中 → **代替案**

### 長期実装（改善フェーズ）
7. **多言語対応のページ実装** (4-6時間) 🟢 低
8. **Learning Dashboard 実装** (#68) 🟢 低

---

## 📞 サポート

不明点がある場合は、以下のドキュメントを参照してください:
- `docs/i18n-page-migration-guide.md`
- `HANDOFF.md`
- `NEXT_PHASES_BREAKDOWN.md`

---

**最終更新**: 2026-01-24 (TypeScriptエラー修正完了)
**AI担当**: Sisyphus
**次回セッション**: Vercel Blob Storage実装 OR Stripeアクティベーション OR i18nページ移行
