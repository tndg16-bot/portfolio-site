# Resend APIキー設定ガイド

## 📋 概要

このガイドでは、ニュースレター機能（`/api/subscribe`）を使用するために、Resend APIキーを設定する手順を説明します。

---

## 🔧 手順

### Step 1: Resendアカウント作成

1. Resendにアクセス: https://resend.com
2. 「Sign Up」をクリック
3. 必要情報を入力してアカウント作成

### Step 2: APIキー作成

1. ダッシュボードにログイン
2. 左メニューから「API Keys」を選択
3. 「Create API Key」をクリック
4. 以下を入力:
   - Name: `portfolio-newsletter` (または任意の名前）
   - Permissions: `Send emails`, `Read emails`
5. 「Create」をクリック
6. 表示されるAPIキーをコピー

⚠️ **重要**: APIキーは一度しか表示されません。安全な場所に保存してください。

### Step 3: ドメイン認証

1. 左メニューから「Domains」を選択
2. 「Add Domain」をクリック
3. 以下のいずれかを入力:
   - カスタムドメイン: `newsletter.takahiro-motoyama.vercel.app` (推奨)
   - Resendドメイン: `@resend.dev` (無料枠のみの場合）
4. DNS設定画面が表示されるので、以下のDNSレコードを追加:

#### カスタムドメインの場合
```
Type: TXT
Name: @
Value: resend.verification_key

Type: CNAME
Name: newsletter
Value: resend.verification_domain
```

5. DNS設定が完了したら、「Verify Domain」をクリック
6. ドメインが認証されるまで待機（数分〜数時間）

### Step 4: 環境変数の設定

#### ローカル開発環境 (`.env.local`)

`.env.local` ファイルに以下を追加:

```bash
# Resend API Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=your-email@example.com
```

- `RESEND_API_KEY`: Step 2で作成したAPIキー
- `ADMIN_EMAIL`: 管理者用メールアドレス（新規登録の通知を受け取るメールアドレス）

#### Vercel本番環境

1. Vercelダッシュボードにログイン
2. プロジェクト `portfolio-site` を選択
3. 「Settings」→「Environment Variables」をクリック
4. 以下を追加:
   - Name: `RESEND_API_KEY`
   - Value: [Step 2で作成したAPIキー]
   - Environment: `Production`, `Preview`, `Development` (すべて選択)
5. 「Add」をクリック
6. 同様に `ADMIN_EMAIL` を追加

---

## 🧪 テスト

### ローカル開発環境でテスト

1. 開発サーバーを起動:
   ```bash
   npm run dev
   ```

2. ニュースレター登録フォームを開く:
   - http://localhost:3000/blog
   - または記事ページ

3. テストメールアドレスを入力して「登録する」をクリック

4. Resendダッシュボードの「Logs」で送信ログを確認

---

## 📝 API使用例

### ウェルカムメールの送信

`/api/subscribe` エンドポイントは、以下の2つのメールを送信します:

1. **購読者向けウェルカムメール**
   - From: `newsletter@takahiro-motoyama.vercel.app`
   - To: [登録したメールアドレス]
   - Subject: `【本山貴大】ニュースレターへのご登録ありがとうございます`

2. **管理者向け通知メール**
   - From: `newsletter@takahiro-motoyama.vercel.app`
   - To: [ADMIN_EMAIL]
   - Subject: `【通知】新規ニュースレター登録`

---

## 🔍 トラブルシューティング

### Q: メールが届きません

**A**: 以下を確認してください:

1. Resendダッシュボードの「Logs」でエラーを確認
2. ドメイン認証が完了しているか確認
3. APIキーが正しく設定されているか確認
4. `.env.local` ファイルが更新されているか確認（開発サーバーを再起動）

### Q: DNS認証が完了しません

**A**: 以下を確認してください:

1. DNSレコードが正しく設定されているか確認
2. DNSの伝播に時間がかかる場合があります（数分〜数時間）
3. `dig` コマンドでDNSレコードを確認:

```bash
dig TXT @8.8.8.8 your-domain.com
```

### Q: APIキーが無効です

**A**: 以下を確認してください:

1. APIキーがコピーされているか確認
2. APIキーのPermissionsが正しく設定されているか確認
3. APIキーが削除されていないか確認

---

## 📚 参考リンク

- Resend公式ドキュメント: https://resend.com/docs
- Resend APIリファレンス: https://resend.com/docs/api-reference
- DNS設定ガイド: https://resend.com/docs/domains

---

## 💡 追加設定

### 配信停止リンクの実装（将来対応）

Resendの配信停止機能を使用して、ユーザーが簡単に配信停止できるようにする方法:

```typescript
// 配信停止リンクの例
const unsubscribeLink = `https://takahiro-motoyama.vercel.app/unsubscribe?email=${encodeURIComponent(email)}`;
```

---

*作成日: 2026-01-29*
*最終更新: 2026-01-29*
