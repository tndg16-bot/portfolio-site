# ポートフォリオサイト機能改善実装計画 (Functional Improvements Implementation)

作成日: 2026-02-15
担当: Subagent (portfolio-renewal)
GitHub Issue: #210 (tndg16-bot/portfolio-site)

---

## 1. 実装ロードマップ (Implementation Roadmap)

### Phase 1: モニタリング設定 (緊急)
**期間**: 1週間 (2026-02-15 〜 2026-02-22)

| タスク | 優先度 | 状態 |
|--------|--------|------|
| Google Analytics 4 設定 | 高 | 📋 Todo |
| Vercel Analytics 有効化 | 高 | 📋 Todo |
| Sentry 導入 | 高 | 📋 Todo |
| モニタリング動作確認 | 高 | 📋 Todo |

### Phase 2: 機能改善 (中優先度)
**期間**: 2週間 (2026-02-23 〜 2026-03-08)

| タスク | 優先度 | 状態 |
|--------|--------|------|
| パフォーマンス監査 | 中 | 📋 Todo |
| Lighthouse スコア改善 | 中 | 📋 Todo |
| バグ修正 | 中 | 📋 Todo |

---

## 2. Google Analytics 4 実装 (GA4 Implementation)

### 2.1 ステップ1: GA4 プロパティの作成

#### 手順
1. [Google Analytics](https://analytics.google.com/) にアクセス
2. 「測定を開始」をクリック
3. アカウントの設定:
   - **アカウント名**: 本山貴大 Portfolio
   - **アカウントのデータ共有設定**: 全てのチェックボックスをオン
4. プロパティの作成:
   - **プロパティ名**: 本山貴大 ポートフォリオサイト
   - **レポートのタイムゾーン**: 日本
   - **通貨**: 日本円 (JPY)
5. ビジネス情報の入力:
   - **業種**: テクノロジー / 教育関連
   - **ビジネスの規模**: 小規模
   - **利用目的の選択**: ユーザーエンゲージメントの測定
6. 「作成」をクリック

### 2.2 ステップ2: データストリームの作成

#### 手順
1. 「ウェブ」プラットフォームを選択
2. ウェブサイトの詳細:
   - **ウェブサイトのURL**: https://takahiro-motoyama.vercel.app
   - **ストリーム名**: 本山貴大 ポートフォリオサイト - メイン
3. 「ストリームを作成」をクリック
4. 測定IDを確認 (形式: `G-XXXXXXXXXX`)
   - 例: `G-ABC123DEF4`

### 2.3 ステップ3: 環境変数の設定

#### `.env.local` の編集
```bash
# Local Environment Variables
# Copy this file and update with your actual values

# GitHub API Configuration for Project Progress Dashboard
GITHUB_TOKEN=<your-github-token>

# Google Analytics 4 Measurement ID
# Get your Measurement ID from https://analytics.google.com/
# Format: G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**注意**: `G-XXXXXXXXXX` を実際の測定IDに置き換えてください。

### 2.4 ステップ4: コンポーネントの確認

既に `src/components/GoogleAnalytics.tsx` が実装されています。

```tsx
/**
 * Google Analytics 4 Component
 *
 * Initialize GA4 tracking with environment variable
 */

'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// ... (既存のコード)
```

### 2.5 ステップ5: デプロイ

#### コマンド
```bash
cd C:\Users\chatg\.openclaw\workspace\portfolio-site

# コミット
git add .env.local
git commit -m "Add Google Analytics 4 Measurement ID"
git push origin main
```

### 2.6 ステップ6: 動作確認

#### 確認手順
1. Vercel でデプロイが完了するのを待つ
2. https://takahiro-motoyama.vercel.app にアクセス
3. Google Analytics に戻り、「リアルタイム」をクリック
4. 過去30分以内にアクティブユーザーが表示されることを確認

#### トラブルシューティング
- **ユーザーが表示されない場合**:
  - `.env.local` が `.gitignore` に含まれているか確認
  - Vercel 環境変数が設定されているか確認
  - ブラウザの開発者ツールでエラーがないか確認

---

## 3. Vercel Analytics 実装

### 3.1 ステップ1: Vercel Dashboard で Analytics を有効化

#### 手順
1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. `portfolio-site` プロジェクトを選択
3. 「Analytics」タブをクリック
4. 「Enable Analytics」をクリック

### 3.2 ステップ2: パッケージのインストール

#### コマンド
```bash
cd C:\Users\chatg\.openclaw\workspace\portfolio-site

npm install @vercel/analytics
```

### 3.3 ステップ3: コンポーネントの追加

#### `src/app/layout.tsx` の編集
```tsx
import { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { LiquidCursor } from "@/components/LiquidCursor";
import { SectionBackground } from "@/components/SectionBackground";
import { PersonJsonLd, OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from '@vercel/analytics/react';  // ← 追加

// ... 既存のコード ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.variable} ${notoJP.variable} font-sans antialiased japan-bg overflow-x-hidden`}>
        <GoogleAnalytics />
        <PersonJsonLd />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <SectionBackground />
        <LiquidCursor />
        {children}
        <Analytics />  {/* ← 追加 */}
      </body>
    </html>
  );
}
```

### 3.4 ステップ4: デプロイ

#### コマンド
```bash
git add src/app/layout.tsx package.json package-lock.json
git commit -m "Add Vercel Analytics"
git push origin main
```

### 3.5 ステップ5: 動作確認

#### 確認手順
1. Vercel でデプロイが完了するのを待つ
2. サイトにアクセスし、複数ページを閲覧
3. Vercel Dashboard の「Analytics」タブでデータが表示されることを確認

---

## 4. Sentry 導入 (Error Monitoring)

### 4.1 ステップ1: Sentry アカウント作成

#### 手順
1. [Sentry](https://sentry.io/signup/) にアクセス
2. アカウントを作成:
   - **Email**: 使用するメールアドレス
   - **Password**: パスワード
   - **Organization name**: 本山貴大 Portfolio
3. プロジェクトの作成:
   - **Platform**: Next.js
   - **Name**: portfolio-site
   - **Alerts**: On

### 4.2 ステップ2: パッケージのインストール

#### コマンド
```bash
cd C:\Users\chatg\.openclaw\workspace\portfolio-site

npm install @sentry/nextjs
```

### 4.3 ステップ3: Sentry 初期化ウィザードの実行

#### コマンド
```bash
npx @sentry/wizard@latest -i nextjs
```

#### ウィザードの回答
1. **Do you already have a Sentry account?**: `Yes`
2. **Where is your Sentry workspace hosted?**: `SaaS` (Sentry Cloud)
3. **Authentication token**: (Sentry Dashboard からトークンを入力)
4. **Project**: `portfolio-site` を選択
5. **Do you want to use performance monitoring?**: `Yes`
6. **Do you want to use Session Replay?**: `Yes`

### 4.4 ステップ4: 環境変数の設定

#### `.env.local` の編集
```bash
# Local Environment Variables
# Copy this file and update with your actual values

# GitHub API Configuration for Project Progress Dashboard
GITHUB_TOKEN=<your-github-token>

# Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry Configuration
SENTRY_DSN=https://xxxxxxx@o1234.ingest.sentry.io/123456
SENTRY_AUTH_TOKEN=sntrys_xxxxxxx
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxxx@o1234.ingest.sentry.io/123456
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
```

**注意**:
- `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `NEXT_PUBLIC_SENTRY_DSN` は Sentry Dashboard から取得した値に置き換えてください

### 4.5 ステップ5: Sentry コンフィグの確認

ウィザードにより、以下のファイルが自動生成されます:

- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- `sentry.properties`
- `next.config.ts` に Sentry プラグインが追加

### 4.6 ステップ6: デプロイ

#### コマンド
```bash
git add .env.local sentry.*.* tsconfig.json next.config.ts
git commit -m "Add Sentry for error monitoring and performance tracking"
git push origin main
```

### 4.7 ステップ7: 動作確認

#### 確認手順
1. Vercel でデプロイが完了するのを待つ
2. サイトにアクセス
3. 意図的にエラーを発生させてみる (例: `/error` ページを作成)
4. Sentry Dashboard でエラーがキャプチャされていることを確認

#### テスト用エラーページの作成 (オプション)
```tsx
// src/app/error-test/page.tsx
export default function ErrorTestPage() {
  throw new Error('This is a test error for Sentry');

  return <div>This should not render</div>;
}
```

### 4.8 ステップ8: 通知設定

#### アラートの設定
1. Sentry Dashboard でプロジェクトを選択
2. 「Settings」 > 「Alerts」
3. 新しいアラートを作成:
   - **Name**: Production Errors
   - **Condition**: When an issue is first seen
   - **Frequency**: Every 5 minutes

---

## 5. パフォーマンス監査 (Performance Audit)

### 5.1 Lighthouse スコアの確認

#### コマンド
```bash
# Lighthouse CI をインストール
npm install -g @lhci/cli

# Lighthouse を実行
lighthouse https://takahiro-motoyama.vercel.app --view
```

#### 目標スコア
| カテゴリ | 目標 | 現状 |
|---------|------|------|
| Performance | 90+ | 要確認 |
| Accessibility | 95+ | 要確認 |
| Best Practices | 95+ | 要確認 |
| SEO | 95+ | 要確認 |

### 5.2 パフォーマンス改善の候補

#### 改善項目
1. **画像の最適化**
   - ⚠️ すべての画像が Next.js Image コンポーネントを使用しているか確認
   - ⚠️ 適切なサイズとフォーマット (AVIF/WebP) を使用

2. **フォントの最適化**
   - ✅ Inter, Noto Sans JP を使用
   - ⚠️ `font-display: swap` が設定されているか確認

3. **JavaScriptの最適化**
   - ✅ `optimizePackageImports` が設定されている
   - ⚠️ 不要な JavaScript の削除

4. **CSSの最適化**
   - ⚠️ 未使用の CSS の削除

5. **コード分割**
   - ⚠️ 動的インポートの活用

---

## 6. バグ修正 (Bug Fixes)

### 6.1 既知の問題の確認

#### 既存のバグ報告
- [ ] GitHub Issues を確認
- [ ] GitHub Discussions を確認
- [ ] Sentry でキャプチャされたエラーを確認

### 6.2 バグ修正の手順

#### プロセス
1. **問題の特定**: エラーログ、ユーザーフィードバックから特定
2. **再現**: 問題を再現できる手順を確認
3. **修正**: 問題を修正
4. **テスト**: 修正内容をテスト
5. **デプロイ**: 本番環境にデプロイ
6. **検証**: 修正が有効であることを確認

---

## 7. 実装チェックリスト (Implementation Checklist)

### Phase 1: モニタリング設定
- [ ] Google Analytics 4 プロパティ作成
- [ ] 測定IDの取得
- [ ] `.env.local` に `NEXT_PUBLIC_GA_MEASUREMENT_ID` を追加
- [ ] デプロイ
- [ ] GA4 でリアルタイムアクセスを確認

- [ ] Vercel Analytics 有効化
- [ ] `@vercel/analytics` パッケージインストール
- [ ] `<Analytics />` コンポーネント追加
- [ ] デプロイ
- [ ] Vercel Dashboard でデータを確認

- [ ] Sentry アカウント作成
- [ ] `@sentry/nextjs` パッケージインストール
- [ ] Sentry ウィザード実行
- [ ] `.env.local` に Sentry 設定を追加
- [ ] デプロイ
- [ ] Sentry でエラーキャプチャを確認

### Phase 2: 機能改善
- [ ] Lighthouse スコア確認
- [ ] パフォーマンス監査
- [ ] 改善項目の特定
- [ ] 改善実装
- [ ] バグ修正
- [ ] 最終テスト

---

## 8. まとめ (Summary)

この実装計画に従って、以下のモニタリングシステムを導入します。

### 優先順位
1. **Google Analytics 4** (1日)
2. **Vercel Analytics** (1日)
3. **Sentry** (2〜3日)
4. **パフォーマンス監査** (1日)
5. **バグ修正** (残り)

### 期待される成果
- ✅ サイトのパフォーマンスを定量的に把握
- ✅ エラーを早期発見・対応
- ✅ データに基づいた運用改善
- ✅ ユーザー体験の向上

---

**作成日**: 2026-02-15
**更新予定**: 各フェーズ完了後に進捗を更新
