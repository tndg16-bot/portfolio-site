# wagashi.dev r4 実装

## 概要

本山貴裕（個人事業・AI 研修コンサル）のポートフォリオサイト r4。

- **GOAL**: 2026-07-13 までに自社サイト本番運用開始
- **規定書**: `Obsidian Vault/4_システム/portfolio-site/SITE_SPEC.md` r4
- **実装計画**: 同 `WORK_PLAN.md` r4
- **デザインシステム**: 同 `DESIGN_SYSTEM_SPEC.md` r4
- **Year1 コスト**: ¥21,580（wagashi.dev + kata-works.com + レゾナンス VO + AI 自作）

## 技術スタック

- Next.js 16.1.6 + React 19 + TypeScript
- Tailwind v4（CSS Variables + 雪月花スケール）
- Resend / Cloudflare Turnstile / Vercel KV / Sentry
- GA4 Consent Mode v2 / @vercel/og / @vercel/analytics

## r4 で導入された主要機能

### Frontend
- 12 ルート（Top/About/Services/Services/[slug]/Works/Works/[slug]/Notes/FAQ/Contact/Legal × 3）
- middleware: 旧 URL 301 → /about?section=X（query 方式）
- /notes RSS フォールバック UI（Vercel KV stale cache 30 日）
- Cookie 同意（Consent Mode v2 4 項目）
- 落款印「山」+ 和文様 SVG（青海波/麻の葉/卍崩し/亀甲）

### Backend
- /api/r4/contact: Turnstile 検証 + Resend 自動リトライ + Slack/Sentry alert
- /api/r4/og: OGP 動的生成（藍と金デザイン）
- Sentry 環境別 sampling + PII マスキング

### デザインシステム
- カラー 10 色（Primary 5 + Secondary r4 5）
- タイポ 4 ファミリ（Noto Serif JP / Noto Sans JP / Fraunces / Inter Tight）
- 8px baseline + 雪月花スケール（8/16/24/40/64/96/144/200/280）
- box-shadow 一切なし・影でなく余白と線で奥行き

## ディレクトリ構造（r4 新規分）

```
src/
├ app/r4/             # r4 ページ（既存 src/app/* と共存）
│ ├ page.tsx          # Top
│ ├ about/
│ ├ services/, services/[slug]/
│ ├ works/, works/[slug]/
│ ├ notes/
│ ├ faq/
│ ├ contact/
│ └ legal/{tokushoho,privacy,terms}/
├ app/api/r4/         # r4 API
│ ├ contact/route.ts
│ └ og/route.tsx
├ components/r4/
│ ├ analytics/        # GoogleAnalyticsR4, CookieConsentR4
│ ├ wagashi/          # Seigaiha, Asanoha, ManjiBadge, Kikko, RakkanYama
│ ├ schema/           # Person, Service, Faq, CaseStudy, Breadcrumb
│ ├ notes/            # NotesList, NotesFallback
│ ├ sections/         # HeroR4, RecentNotes, RelatedNotes
│ ├ nav/              # HeaderR4, FooterR4
│ └ about/            # ScrollToSection
├ lib/r4/
│ ├ consent.ts
│ ├ events.ts
│ ├ slack.ts
│ ├ auto-reply.ts
│ ├ resend-client.ts
│ ├ notes-{fetcher,types}.ts
│ └ metadata.ts
└ data/r4/
  ├ services.ts (Tier 1-4 + 個人 3)
  ├ works.ts (3 ケース + パンハウス開示)
  ├ faq.ts (20問)
  ├ testimonials.ts (placeholder 3件)
  ├ timeline.ts
  ├ navigation.ts
  ├ about-content.ts
  └ site.ts

docs/operations/
├ HANDOFF-R4.md
├ PUBLISH-CHECKLIST-R4.md
└ MONTHLY-CHECKLIST-R4.md

middleware.r4.ts
tailwind.config.r4.ts
sentry.{client,server,edge}.r4.config.ts
.env.example.r4
```

## アクティベーション

r4 を本番に切替えるには：

1. `mv tailwind.config.ts tailwind.config.legacy.ts && mv tailwind.config.r4.ts tailwind.config.ts`
2. `mv middleware.ts middleware.legacy.ts && mv middleware.r4.ts middleware.ts`
3. `mv sentry.{client,server,edge}.config.ts → .legacy.config.ts && mv .r4.config.ts → .config.ts`
4. `src/app/page.tsx` を `src/app/r4/page.tsx` の内容に置換（or `src/app/r4/*` を `src/app/*` にマージ）
5. `src/app/layout.tsx` を r4 版（CookieConsentR4 + GoogleAnalyticsR4）に
6. `src/app/globals.css` に `globals.r4.css` の内容追記
7. `.env.example.r4` の項目を Vercel Dashboard に投入
8. `npm install`（既存依存で十分・追加不要）
9. `npm run build` → エラーなければ commit & push

## 本山さん向け

詳細は `docs/operations/HANDOFF-R4.md` を参照。
