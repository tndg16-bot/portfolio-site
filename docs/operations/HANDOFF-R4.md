# 本山さん向け 運用ハンドオフドキュメント r4

> このドキュメント1枚で「自社サイトを本山さん1人で運用できる状態」を担保する。

## 1. サイト全体像（10秒で把握）

- **公開URL**: https://wagashi.dev（メイン）／ https://kata-works.com（法人窓口・wagashi.dev/business に 301）
- **リポジトリ**: https://github.com/tndg16-bot/portfolio-site（r4-implementation ブランチ）
- **ホスティング**: Vercel（main ブランチ自動デプロイ）
- **規定書**: `Obsidian Vault/4_システム/portfolio-site/SITE_SPEC.md` r4
- **管理プロジェクト**: `Obsidian Vault/2_事業・案件/AI支援サービス/ポートフォリオサイト_自社化_2026/`
- **Slack**: `#portfolio-site-2026`（日次/月次 Digest）

## 2. r4 で導入された主な実装

- **ドメインペア**：wagashi.dev（メイン）+ kata-works.com（法人窓口）
- **サービス Tier 4階層化**：法人 4 Tier + 個人 3 本
- **Wagashi デザインシステム**：藍と金 + 新規5色（淡墨/銀朱/利休鼠/生成上/藍墨）+ 落款印「山」+ 和文様 SVG（青海波/麻の葉/卍崩し/亀甲）
- **Cookie 同意 + GA4 Consent Mode v2**（4項目 + wait_for_update=500）
- **Resend 自動リトライ**（5/15/45秒 backoff + Slack/Sentry alert）
- **/notes RSS フォールバック**（Vercel KV stale cache 30日 + 30秒 retry timer）
- **middleware 301**：旧 URL → /about?section=X（query 方式）
- **法務 r4**：消契法第8/10条 / 民法 548-4 / 反社条項 / 個情法漏えい通知 / 外国第三者 / PCI DSS

## 3. 運用作業 TOP5

1. **サービス料金変更**：`src/data/r4/services.ts` を編集 → PR → main → 自動デプロイ
2. **works ケース追加**：`src/data/r4/works.ts` に追記（パンハウス開示文は固定）
3. **note 記事公開**：/notes は RSS で 10 分自動更新（Vercel KV 経由）
4. **問い合わせ対応**：Resend Dashboard + Slack `#portfolio-site-2026` で確認
5. **アクセス分析**：Vercel Analytics + GA4 + 月次ハーネス Digest

## 4. 環境変数（Vercel Dashboard で投入・P0 後）

| Key | 用途 | 取得先 |
|---|---|---|
| `RESEND_API_KEY` | メール送信 | Resend Dashboard |
| `RESEND_FROM_EMAIL` | 送信元 | `hello@kata-works.com` |
| `RESEND_NOTIFY_TO` | 通知先 | `t.ndg16@gmail.com` |
| `NEXT_PUBLIC_GA4_ID` | GA4 計測 | GA4 プロパティ |
| `NEXT_PUBLIC_SENTRY_DSN` | エラー監視 | Sentry プロジェクト |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | CAPTCHA | Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | CAPTCHA | 同上 |
| `SLACK_OPS_WEBHOOK_URL` | 問い合わせ通知 | Slack Webhook |
| `NEXT_PUBLIC_TIMEREX_URL` | 無料相談 | TimeRex 新設後 |
| `NEXT_PUBLIC_LINE_URL` | LINE 公式 | LINE 公式アカウント |
| `KV_REST_API_URL` `KV_REST_API_TOKEN` | note キャッシュ | Vercel KV |
| `NEXT_PUBLIC_NOTE_USER` `NEXT_PUBLIC_NOTE_RSS` | note URL | note プロフィール |

## 5. プレースホルダ差替え（本山さん作業）

| 場所 | 内容 |
|---|---|
| `src/app/r4/legal/tokushoho/page.tsx` 〒XXX-XXXX | レゾナンス契約後の住所 |
| `src/app/r4/legal/tokushoho/page.tsx` 050-XXXX-XXXX | レゾナンス電話 or 050 番号 |
| `public/images/motoyama-hero.webp` | プロフィール写真（自撮り or AI 生成） |
| `public/favicons/*` | ファビコン（ロゴ完成後） |
| `src/data/r4/testimonials.ts` status: placeholder | 許諾取得後 confirmed に + 本文差替え |

## 6. トラブル発生時

- **サイトダウン**：Vercel Deployments で前バージョンを Promote to Production
- **問い合わせ未着**：Resend Dashboard Logs + Vercel 環境変数確認
- **ドメイン失効**：Cloudflare Auto-Renew + 残高常時¥3,000以上
- **Lighthouse 低下**：T-604 対応マッピング参照

## 7. 連携サービス図

```
GitHub → Vercel autodeploy → wagashi.dev (Cloudflare DNS+SSL)
                                ├ GA4 (同意時のみ)
                                ├ Vercel Analytics (cookie-less)
                                ├ Sentry (PII masked)
                                ├ Resend (retry+alert)
                                ├ Vercel KV (notes cache)
                                └ Turnstile (form CAPTCHA)

kata-works.com → Cloudflare Email Routing → Gmail
```

最終更新：2026-05-30 r4 実装完了時
