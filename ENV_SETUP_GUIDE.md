# 環境変数設定ガイド

このガイドは、portfolio-siteの機能を有効化するために必要な環境変数の設定方法を説明します。

---

## 目次

1. [Google Forms連携設定（Issue #28）](#1-google-forms連携設定)
2. [GitHub API連携設定（Issue #29）](#2-github-api連携設定)
3. [Resend API設定（Issue #27）](#3-resend-api設定)
4. [Vercelへの環境変数設定](#4-vercelへの環境変数設定)

---

## 1. Google Forms連携設定

### ステップ1: Google Formsの作成

1. [Google Forms](https://forms.google.com/)にアクセス
2. 新しいフォームを作成し、以下の質問を追加：

| 項目 | タイプ | 必須 |
|------|--------|------|
| お名前 | 短文 | はい |
| メールアドレス | 短文 | はい |
| 現在のお仕事・活動 | 段落 | はい |
| セッションで解決したいこと | 段落 | はい |
| なぜこのセッションに興味を持ちましたか？ | 段落 | いいえ |
| 希望日時（第1希望） | 日付/時刻 | はい |
| 希望日時（第2希望） | 日付/時刻 | いいえ |
| その他ご質問・メッセージ | 段落 | いいえ |

3. フォームのプレビューを開く
4. ブラウザの開発者ツール（F12）を開く
5. 入力フィールドのname属性を確認（`entry.xxxxxxxx`）

### ステップ2: Entry IDsの取得

**方法1: Get pre-filled linkを使用（推奨）**

1. フォーム右上の「3点リーダー」→「プレビュー用リンクを取得」をクリック
2. URL例: `https://docs.google.com/forms/d/e/1FAIpQL.../viewform?usp=pp_url&entry.1234567890=名前&entry.1234567891=email@example.com`
3. URLからentry IDを抽出:
   - `entry.1234567890` → 名前のentry ID
   - `entry.1234567891` → メールアドレスのentry ID

**方法2: 開発者ツールを使用**

1. フォームのプレビューを開く
2. 各入力フィールドを右クリック→「検証」
3. `<input>`または`<textarea>`要素の`name`属性を確認
4. `name="entry.1234567890"` → entry ID: `entry.1234567890`

### ステップ3: .env.localの設定

プロジェクトのルートディレクトリ（`Apps/portfolio`）に`.env.local`ファイルを作成:

```bash
# Google Forms Configuration
NEXT_PUBLIC_GOOGLE_FORMS_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse

# Entry IDs（上記の手順で取得したものに置き換え）
NEXT_PUBLIC_ENTRY_NAME=entry.1234567890
NEXT_PUBLIC_ENTRY_EMAIL=entry.1234567891
NEXT_PUBLIC_ENTRY_OCCUPATION=entry.1234567892
NEXT_PUBLIC_ENTRY_GOAL=entry.1234567893
NEXT_PUBLIC_ENTRY_MOTIVATION=entry.1234567894
NEXT_PUBLIC_ENTRY_DATE1=entry.1234567895
NEXT_PUBLIC_ENTRY_DATE2=entry.1234567896
NEXT_PUBLIC_ENTRY_MESSAGE=entry.1234567897
```

### ステップ4: テスト

1. 開発サーバーを再起動: `npm run dev`
2. お問い合わせフォームに移動: `http://localhost:3000/contact`
3. テスト送信を実行
4. Google Formsのスプレッドシートで確認

---

## 2. GitHub API連携設定

### ステップ1: GitHub PATの発行

1. GitHubにログイン
2. 右上のアバター→Settings → Developer settings → Personal access tokens → Tokens (classic)
3. 「Generate new token (classic)」をクリック
4. 以下の設定:
   - **Note**: `portfolio-site-api`
   - **Expiration**: `No expiration` または `90 days`
   - **Select scopes**:
     - ✅ `public_repo` - パブリックリポジトリの読み取り
     - ✅ `read:org` - 組織の読み取り（必要な場合）

5. 「Generate token」をクリック
6. **重要**: トークンをコピー（再表示されません）

### ステップ2: .env.localの設定

`.env.local`に以下を追加:

```bash
# GitHub API Configuration
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=tndg16-bot
GITHUB_REPO=papa
```

### ステップ3: テスト

1. 開発サーバーを再起動
2. Dashboardページに移動: `http://localhost:3000/dashboard`
3. プロジェクトリストとアクティビティが表示されることを確認

---

## 3. Resend API設定

### ステップ1: Resendアカウント作成

1. [Resend](https://resend.com/)にサインアップ
2. API Keysページに移動: https://resend.com/api-keys
3. 「Create API Key」をクリック
4. **Name**: `portfolio-site`
5. 「Create」をクリック
6. API Keyをコピー

### ステップ2: .env.localの設定

`.env.local`に以下を追加:

```bash
# Resend (Newsletter) Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Admin email for notifications (optional)
ADMIN_EMAIL=your-email@example.com
```

### ステップ3: ドメイン検証（必要な場合）

1. Resendダッシュボードでドメインを追加
2. DNSレコードを設定
3. ドメイン検証完了を待つ

---

## 4. Vercelへの環境変数設定

本番環境で機能を有効化するには、Vercelに環境変数を設定します。

### ステップ1: Vercelプロジェクトに移動

1. [Vercelダッシュボード](https://vercel.com/dashboard)にアクセス
2. `portfolio-site`プロジェクトを選択
3. Settingsタブ → Environment Variables

### ステップ2: 環境変数を追加

以下の変数を追加:

| 変数名 | 値 | Environment |
|--------|------|-------------|
| `NEXT_PUBLIC_GOOGLE_FORMS_URL` | `https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse` | Production, Preview, Development |
| `NEXT_PUBLIC_ENTRY_NAME` | `entry.1234567890` | Production, Preview, Development |
| `NEXT_PUBLIC_ENTRY_EMAIL` | `entry.1234567891` | Production, Preview, Development |
| `NEXT_PUBLIC_ENTRY_OCCUPATION` | `entry.1234567892` | Production, Preview, Development |
| `NEXT_PUBLIC_ENTRY_GOAL` | `entry.1234567893` | Production, Preview, Development |
| `NEXT_PUBLIC_ENTRY_MOTIVATION` | `entry.1234567894` | Production, Preview, Development |
| `NEXT_PUBLIC_ENTRY_DATE1` | `entry.1234567895` | Production, Preview, Development |
| `NEXT_PUBLIC_ENTRY_DATE2` | `entry.1234567896` | Production, Preview, Development |
| `NEXT_PUBLIC_ENTRY_MESSAGE` | `entry.1234567897` | Production, Preview, Development |
| `GITHUB_TOKEN` | `ghp_xxxxxx...` | Production, Preview |
| `GITHUB_OWNER` | `tndg16-bot` | Production, Preview, Development |
| `GITHUB_REPO` | `papa` | Production, Preview, Development |
| `RESEND_API_KEY` | `re_xxxxxx...` | Production, Preview |
| `ADMIN_EMAIL` | `your-email@example.com` | Production, Preview |

### ステップ3: 再デプロイ

環境変数を追加後:
1. 「Redeploy」ボタンをクリック
2. デプロイ完了を待つ
3. 本番サイトで機能確認

---

## セキュリティに関する重要事項

### ⚠️ 絶対にコミットしないファイル

- `.env.local` - ローカル開発用
- `.env.production` - 本番環境用
- `.env` - 共通用

これらは`.gitignore`に含まれています。

### ✅ 安全な管理方法

- **ローカル開発**: `.env.local`のみ使用
- **本番環境**: VercelのEnvironment Variablesで管理
- **共有**: `.env.example`を参照（パブリックでも安全）

---

## トラブルシューティング

### Google Forms連携が動作しない

1. **URLが正しいか確認**
   - URL末尾が`/formResponse`であること

2. **Entry IDsが正しいか確認**
   - 開発者ツールで`name`属性を再確認

3. **CORSエラー**
   - Google FormsはCORSを許可しないため、`mode: 'no-cors'`で送信
   - 成功かどうかはレスポンスタイプで判断（`opaque`）

### GitHub APIが動作しない

1. **PATのスコープ確認**
   - `public_repo`が含まれているか確認

2. **レート制限確認**
   - 認証なし: 毎時60リクエスト
   - 認証あり: 毎時5000リクエスト

3. **キャッシュ問題**
   - APIは5分キャッシュ（`revalidate: 300`）
   - 変更が反映されない場合は5分待つ

### Resend APIが動作しない

1. **ドメイン検証確認**
   - DNSレコードが正しく設定されているか

2. **API Keyの有効期限**
   - 有効期限が切れていないか確認

---

## 次のステップ

すべての環境変数を設定後:

1. ✅ Google Forms連携のテスト送信
2. ✅ DashboardでGitHubデータが表示されるか確認
3. ✅ 本番環境にデプロイして動作確認

---

**関連Issue**:
- Issue #28: お問い合わせフォームのGoogle Forms連携完了
- Issue #29: GitHub API連携の強化
- Issue #27: Resend APIキーの設定
