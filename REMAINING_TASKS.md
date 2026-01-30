# 残タスクまとめ

## 📋 概要

現在のプロジェクトの残タスクをまとめたドキュメント。

**作成日**: 2026-01-22
**最終更新**: 2026-01-22

---

## 🎯 今回の質問と回答

### �問
「記事更新のためにもgithub actionの登録をしてますが、再度設定は必要ですか？」

### 回答
**いいえ、設定は不要です。**

**理由:**
- ✅ **GitHub Actionsは既に動作しています**
- ✅ **ブログ自動公開用workflow** (`.github/workflows/daily-rebuild.yml`) は既に登録済み
- ✅ **Vercelトークン設定の必要なしこどちらで行うか**

---

## 📊 残タスク一覧

---

## 🔴 高優先タスク（次のステップ）

### Issue #61: Infrastructure Setup (Supabase & Auth)

| ステップ | ステータス | 説明 |
|--------|----------|----------|
| 1. Vercel Environment VariablesにSupabase変数を追加 | 🟡 未完了 | [必須] |
| 2. Supabase プロジェクトを作成 | 🟡 未完了 | `https://supabase.com` で新規プロジェクト作成 |
| 3. Supabase SQL Editorでスキーマを実行 | 🟡 未完了 | `supabase/schema.sql` を貼り付け |
| 4. Supabase SQL EditorでRLSを実行 | 🟡 未完了 | `supabase/rls.sql` を貼り付け |

**依存関係**: 他のタスクの前提

---

### Issue #62: Video Hosting Integration (Cloudflare Stream)

| ステップ | ステータス | 説明 |
|--------|----------|----------|
| 1. Cloudflare Stream アカウント作成 | 🟡 未完了 | `https://dash.cloudflare.com/` |
| 2. Cloudflare Stream APIの統合 | 🟡 未完了 | APIキー取得 |
| 3. 動画プレイヤーコンポーネント実装 | 🟡 未完了 | VideoPlayerコンポーネント作成 |

**依存関係**: Issue #61 が完了していること

---

### Issue #57: Stripe決済統合

| ステップ | ステータス | 説明 |
|--------|----------|----------|
| 1. Stripeアカウント設定 | 🟡 未完了 | `https://dashboard.stripe.com` |
| 2. Checkoutページ作成 | 🟡 未完了 | `/checkout` ページ実装 |
| 3. Webhook処理実装 | 🟡 未完了 | Stripe Webhookエンドポイント作成 |
| 4. 受講完了後のSupabase更新 | 🟡 未完了 | Webhookでenrollmentsテーブル更新 |

**依存関係**: Issue #61が完了していること

---

## 🔧 GitHub Actions設定

### �近のスケジュール済みworkflow

| Workflow | スケジュール | 説明 | ステータス |
|----------|----------|----------|
| `daily-rebuild.yml` | 毎日JST 00:00 (UTC 15:00) | ブログ自動公開 | ✅ 完了 |
| `build.yml` | PR作成時 | Lint/Build/Tスト | ✅ 既存 |

**設定済みSecret**: `VERCEL_TOKEN` (GitHub Actions用)

---

## 🚀 環境変数設定手順

### 1. ローカル開発環境 (`.env.local`)

```bash
# Google Forms Configuration
NEXT_PUBLIC_GOOGLE_FORMS_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
NEXT_PUBLIC_ENTRY_NAME=entry.1234567890
# ... (その他のEntry IDs)

# Resend (Newsletter) Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# GitHub API Configuration
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=tndg16-bot
GITHUB_REPO=papa

# Supabase Configuration (Issue #61) - まだ設定されていない
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Vercel本番環境

**Step 1: Environment Variablesの追加**
1. Vercelダッシュボード → プロジェクト選択
2. **Settings** → **Environment Variables**
3. 以下を追加:
   - `NEXT_PUBLIC_SUPABASE_URL` → SupabaseプロジェクトURL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Supabase anonキー

**Step 2: Secretsの追加**
1. GitHubリポジトリ → **Settings**
2. **Secrets and variables** → **Actions**
3. **New repository secret** をクリック
4. Name: `VERCEL_TOKEN`
5. Secret: [Vercelで発行したトークンを貼り付け]
6. Scope: `portfolio-site` プロジェクト

**Step 3: 本番デプロイ確認**
- Vercelダッシュボードで「Redeploy」をクリック
- デプロイ完了を待つ

---

## 📝 本番URL

- **本番**: https://takahiro-motoyama.vercel.app
- **デプロイ**: Vercel (mainブランチへのpush時自動)

---

## 🔍 �記タスクの回答（詳細）

### 「記事更新のためにもgithub actionの登録をしてますが、再度設定は必要ですか？」への回答

#### ✅ 既存のworkflow

**`.github/workflows/daily-rebuild.yml` は既に有効です。**

```yaml
# 既存のスケジュール
name: Daily Production Rebuild
on:
  schedule:
    - cron: '0 15 * * *'  # UTC 15:00 = JST 00:00
```

**機能**:
- 毎日JST 00:00に自動で本番ビルド
- ブログ記事の公開日時になったら自動で公開される

---

#### 🟡 追加で必要な設定

**Vercel Secrets** (GitHub Actions用)**:
- `VERCEL_TOKEN` - まだ未設定
- **設定方法**: 上記「🚀 環境変数設定手順」を参照

**Vercel Environment Variables** (Supabase用):
- `NEXT_PUBLIC_SUPABASE_URL` - まだ未設定
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - まだ未設定
- **設定方法**: 上記「🚀 環境変数設定手順」を参照

---

## 🎯 次のステップ

### 1. Vercel Environment VariablesにSupabase変数を追加

**場所**: https://vercel.com/dashboard

**手順**:
1. プロジェクト選択: `portfolio-site`
2. **Settings** → **Environment Variables** → **Add**
3. 以下を追加:
   ```
     NEXT_PUBLIC_SUPABASE_URL
     https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY
     your-anon-key-here
     ```

### 2. GitHub SecretsにVERCEL_TOKENを追加

**場所**: https://github.com/tndg16-bot/portfolio-site/settings/secrets/actions

**手順**:
1. **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**
3. 以下を追加:
   - **Name**: `VERCEL_TOKEN`
   - **Secret**: [Vercelで発行したトークン]
   - **Repository**: `portfolio-site` (or `tndg16-bot/portfolio-site`)

### 3. GitHub Actionsの動作確認

**場所**: https://github.com/tndg16-bot/portfolio-site/actions/workflows

**確認方法**:
- `daily-rebuild.yml` の「Enable workflow」がオンになっているか
- 最終の実行履歴を確認

### 4. Vercelデプロイ

**場所**: https://vercel.com/dashboard

**手順**:
1. デプロイ先を選択: `portfolio-site`
2. **Deploy** → **Redeploy」をクリック
3. デプロイ完了を待つ

---

## 🚫 トラブルシューティング

### Q: �記タスクは実装されていますか？

**A:** はい、以下は実装済みです：
- ✅ ブログ自動公開機能 (Issue #65)
- ✅ プロジェクト自動更新機能 (Issue #66)
- ✅ Supabase認証フロー (Issue #61のコードのみ)

### Q: サイトは更新されていますか？

**A:** はい、最新のコミットは `2622dd7` です。ブランチ統合済みです。

### Q: 「記事更新のためにもgithub actionの登録」は完了していますか？

**A:** はい、以下は完了しています：
- ✅ `.github/workflows/daily-rebuild.yml` - ブログ自動公開用
- ✅ `/api/projects-v2/route.ts` - プロジェクト自動更新用

### Q: サイトの「AI活用プロジェクト」セクションは最新ですか？

**A:** はい、以下が実装済みです：
- ✅ `/api/projects-v2/route.ts` - GitHub API連携
- ✅ `src/components/ProjectsSection.tsx` - 動的データ表示

---

## 📅 参考文献

- [ROADMAP.md](./ROADMAP.md)
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)

---

## 🎯 まとめ

**現状**:
- ✅ ブログ自動公開: 実装済み
- ✅ プロジェクト自動更新: 実装済み
- ✅ 認証フロー: コード実装済み

**次のステップ**:
1. Vercel Environment VariablesにSupabase変数を追加
2. GitHub SecretsにVERCEL_TOKENを追加
3. Supabaseプロジェクトを作成
4. スキーマを実行

---

**最終更新**: 2026-01-22
