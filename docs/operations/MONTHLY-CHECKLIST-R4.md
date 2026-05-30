# 月次運用チェックリスト r4

月次ハーネスが自動で Slack に Digest を投稿します（毎月 1 日 08:00 JST）。
本山さんは Slack 投稿に :+1: / :-1: / :pencil2: でリアクションするのみ。

## ハーネス自動取得項目

- **GA4**: PV / UU / 主要 CV 件数 / 流入元 TOP5
- **Resend**: 送信数 / 失敗 / バウンス率
- **Sentry**: 新規 issue 数（error / warn）
- **Vercel**: 帯域 / 関数実行回数 / 残予算
- **note / Threads**: 投稿数 / フォロワー増減

## 手動チェック（月初 10 分）

- [ ] 実績数値の更新（/works / Top）
- [ ] サービスページの料金・期間確認
- [ ] テストimonia の許諾取得状況
- [ ] ドメイン Auto-Renew 確認

## 四半期チェック
- [ ] SEO キーワード見直し
- [ ] Lighthouse 監査
- [ ] 法務文書（特商法・プラポリ・利用規約）の最新性

## ハーネス実装
- `/home/tndg1/.harness/portfolio_monthly/portfolio_monthly_digest.py`
- systemd-timer: `OnCalendar=*-*-01 08:00:00 Asia/Tokyo`
- LLM: DeepSeek (deepseek-chat) — Claude API 不使用
- Slack: `SLACK_OPS_WEBHOOK_URL` → `#portfolio-site-2026`
