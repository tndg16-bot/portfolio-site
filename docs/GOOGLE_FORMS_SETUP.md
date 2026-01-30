# Google Forms 設定手順

**作成日**: 2026-01-25
**関連Issue**: #79

---

## 概要

Portfolio Siteの予約フォーム（BookingForm）をGoogle Formsと連携するための設定手順です。

---

## 手順

### 1. Google Formsの作成

1. [Google Forms](https://forms.google.com)にアクセス
2. 新しいフォームを作成
3. フォームタイトル: 「セッション予約リクエスト」
4. 以下の質問を追加（必須/任意を指定）

#### 質問一覧

| 質問番号 | 質問タイトル | タイプ | 必須 | 変数名 |
|---------|-------------|------|------|--------|
| 1 | お名前 | 記述式 | 必須 | name |
| 2 | メールアドレス | 記述式 | 必須 | email |
| 3 | 現在のお仕事・活動 | 段落 | 必須 | occupation |
| 4 | セッションで解決したいこと | 段落 | 必須 | goal |
| 5 | なぜこのセッションに興味を持ちましたか？ | 段落 | 任意 | motivation |
| 6 | 希望日時（第1希望） | 日付と時刻 | 必須 | preferredDate1 |
| 7 | 希望日時（第2希望） | 日付と時刻 | 任意 | preferredDate2 |
| 8 | その他ご質問・メッセージ | 段落 | 任意 | message |

5. フォームの送信設定を確認
   - 「回答」タブ → 「回答先」 → スプレッドシートを作成（推奨）
6. フォームのプレビューを保存

---

### 2. Action URLとEntry IDの取得

#### 手順

1. フォームのプレビューを開く（右上の目アイコン）
2. Chrome DevToolsを開く（F12または右クリック → 検証）
3. **Network**タブを開く
4. フォームを記述テストで送信（ダミーデータでOK）
5. Networkタブで`formResponse`を検索
6. `formResponse`リクエストをクリックし、**Headers**タブを確認
7. **Request URL**をコピー（これがAction URL）

#### Request URLの例

```
https://docs.google.com/forms/d/e/1FAIpQLSdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/formResponse
```

#### Entry IDの取得

1. 同じ`formResponse`リクエストで、**Payload**タブを確認
2. 各フィールドのentry IDを確認

#### Payloadの例

```javascript
{
  "entry.1234567890": "山田 太郎",           // name
  "entry.1234567891": "example@email.com",  // email
  "entry.1234567892": "フリーランスエンジニア", // occupation
  "entry.1234567893": "副業で独立したい",    // goal
  "entry.1234567894": "ブログで知りました",  // motivation
  "entry.1234567895_day": "2025-01-26",    // preferredDate1 (date)
  "entry.1234567895_hour": "13",           // preferredDate1 (hour)
  "entry.1234567896_day": "2025-01-27",    // preferredDate2 (date)
  "entry.1234567896_hour": "14",           // preferredDate2 (hour)
  "entry.1234567897": "特になし"            // message
}
```

#### Entry ID対応表

| 変数名 | Entry ID |
|--------|----------|
| NEXT_PUBLIC_ENTRY_NAME | entry.1234567890 |
| NEXT_PUBLIC_ENTRY_EMAIL | entry.1234567891 |
| NEXT_PUBLIC_ENTRY_OCCUPATION | entry.1234567892 |
| NEXT_PUBLIC_ENTRY_GOAL | entry.1234567893 |
| NEXT_PUBLIC_ENTRY_MOTIVATION | entry.1234567894 |
| NEXT_PUBLIC_ENTRY_DATE1 | entry.1234567895 |
| NEXT_PUBLIC_ENTRY_DATE2 | entry.1234567896 |
| NEXT_PUBLIC_ENTRY_MESSAGE | entry.1234567897 |

---

### 3. .env.localへの設定

`papa/Apps/Main/portfolio/.env.local`に以下を設定

```env
# Google Forms Configuration
NEXT_PUBLIC_GOOGLE_FORMS_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse

# Entry IDs for Booking Form fields
NEXT_PUBLIC_ENTRY_NAME=entry.1234567890
NEXT_PUBLIC_ENTRY_EMAIL=entry.1234567891
NEXT_PUBLIC_ENTRY_OCCUPATION=entry.1234567892
NEXT_PUBLIC_ENTRY_GOAL=entry.1234567893
NEXT_PUBLIC_ENTRY_MOTIVATION=entry.1234567894
NEXT_PUBLIC_ENTRY_DATE1=entry.1234567895
NEXT_PUBLIC_ENTRY_DATE2=entry.1234567896
NEXT_PUBLIC_ENTRY_MESSAGE=entry.1234567897
```

---

### 4. テスト

1. `.env.local`を設定後、開発サーバーを再起動
2. `/sessions#booking`ページにアクセス
3. フォームをテスト送信
4. Googleスプレッドシートにデータが反映されているか確認

---

## 注意点

- Google FormsのAction URLとEntry IDは、フォームを編集するたびに変わる可能性があります
- フォームを編集した場合は、再度Entry IDを確認してください
- `.env.local`はGitにコミットしないでください（`.gitignore`に含まれています）
- 本番環境で使用する場合は、Vercelの環境変数にも設定してください

---

## 参考リンク

- [Google Forms](https://forms.google.com)
- [BookingForm.tsx](../../papa/Apps/Main/portfolio/src/components/BookingForm.tsx)
- [Issue #79](https://github.com/tndg16-bot/portfolio-site/issues/79)
