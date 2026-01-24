# i18n ページ移行ガイド

**目的**: 既存のページを [locale] ルーティング構造に移行し、多言語対応を完成させる

---

## ✅ 完了済み

### 基礎設定
- [x] next-intl インストール
- [x] `src/i18n/request.ts` 作成
- [x] `src/i18n/config.ts` 作成
- [x] `next.config.ts` に next-intl プラグイン追加
- [x] 翻訳ファイル (`messages/ja.json`, `messages/en.json`) 作成済み
- [x] `src/components/LanguageSwitcher.tsx` 作成
- [x] `src/components/Header.tsx` に LanguageSwitcher 統合

---

## 📋 残タスク

### 1. [locale] ルーティング構造への移行

#### 手順:

1. **ディレクトリ構造の変更**

現在の構造:
```
src/app/
├── page.tsx
├── about/
│   └── page.tsx
├── philosophy/
│   └── page.tsx
├── sessions/
│   └── page.tsx
├── contact/
│   └── page.tsx
├── blog/
│   └── [slug]/
│       └── page.tsx
└── layout.tsx
```

新しい構造:
```
src/app/
├── [locale]/
│   ├── layout.tsx  (新しい)
│   ├── page.tsx  (home を移動)
│   ├── about/
│   │   └── page.tsx
│   ├── philosophy/
│   │   └── page.tsx
│   ├── sessions/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── blog/
│       └── [slug]/
│           └── page.tsx
├── middleware.ts  (新しい)
└── layout.tsx  (更新)
```

2. **`src/app/[locale]/layout.tsx` の作成**

```tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ja' }, { locale: 'en' }];
}
```

3. **`src/app/middleware.ts` の作成**

```tsx
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // または 'always'
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/', '/(ja|en)/:path*', '/api/:path*', '/_next/:path*']
};
```

4. **`src/app/layout.tsx` の更新**

```tsx
import { redirect } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n/config';

export default function RootLayout() {
  // Redirect to locale-prefixed path if no locale in URL
  redirect(`/${defaultLocale}`);
}

export const dynamic = 'force-static';
```

---

### 2. 各ページの翻訳化

#### home ページ (`src/app/[locale]/page.tsx`)

```tsx
import { useTranslations } from 'next-intl';
// ... 他の imports

export default function Home() {
  const t = useTranslations('home');

  return (
    <h1>{t('hero.title')}</h1>
    <p>{t('hero.subtitle')}</p>
    {/* その他の翻訳を適用 */}
  );
}
```

#### about ページ (`src/app/[locale]/about/page.tsx`)

```tsx
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <h1>{t('title')}</h1>
    <p>{t('description')}</p>
    {/* services 配列も翻訳ファイルに移動 */}
  );
}
```

#### philosophy ページ (`src/app/[locale]/philosophy/page.tsx`)

```tsx
import { useTranslations } from 'next-intl';

export default function PhilosophyPage() {
  const t = useTranslations('philosophy');

  return (
    <h1>{t('title')}</h1>
    {/* principles も翻訳ファイルに移動 */}
  );
}
```

#### sessions ページ (`src/app/[locale]/sessions/page.tsx`)

```tsx
import { useTranslations } from 'next-intl';

export default function SessionsPage() {
  const t = useTranslations('sessions');

  return (
    <h1>{t('title')}</h1>
    {/* targetAudience, booking も翻訳ファイルに移動 */}
  );
}
```

#### contact ページ (`src/app/[locale]/contact/page.tsx`)

```tsx
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <h1>{t('title')}</h1>
    {/* methods も翻訳ファイルに移動 */}
  );
}
```

---

### 3. Header コンポーネントの更新

現在の `src/components/Header.tsx` は LanguageSwitcher を持っていますが、リンクを更新する必要があります:

```tsx
import { Link } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/philosophy`, label: t('philosophy') },
    { href: `/${locale}/sessions`, label: t('sessions') },
    { href: `/${locale}/blog`, label: 'Blog' },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <nav>
      {navItems.map((item) => (
        <Link href={item.href}>{item.label}</Link>
      ))}
    </nav>
  );
}
```

---

### 4. Footer の翻訳化

各ページに含まれる Footer を翻訳ファイルに追加:

```json
// messages/ja.json, messages/en.json
{
  "footer": {
    "copyright": "© 2026 Takahiro Motoyama. Designed for Self-Determination.",
    "rights": "All rights reserved."
  }
}
```

---

## 🧪 テストチェックリスト

移行完了後、以下を確認してください:

### 機能確認
- [ ] 言語スイッチャーが表示される
- [ ] 日本語と英語で正しく切り替わる
- [ ] URL が `/ja/...` と `/en/...` で正しくルーティングされる
- [ ] ページ遷移時に言語が維持される
- [ ] `/` にアクセスするとデフォルト言語（ja）にリダイレクトされる

### ページ確認
- [ ] Home ページ: 全てのテキストが翻訳されている
- [ ] About ページ: 全てのテキストが翻訳されている
- [ ] Philosophy ページ: 全てのテキストが翻訳されている
- [ ] Sessions ページ: 全てのテキストが翻訳されている
- [ ] Contact ページ: 全てのテキストが翻訳されている

### SEO 確認
- [ ] 各言語で `<html lang="">` が正しく設定されている
- [ ] hreflang タグが追加されている
- [ ] メタデータが言語ごとに正しく設定されている

### ビルド確認
- [ ] `npm run build` が成功する
- [ ] 全てのページが正常に生成される
- [ ] ビルド時間が許容範囲内である

---

## 💡 注意点

### 既存のリンクの更新

すべての `href` をロケールプレフィックス付きに更新する必要があります:

```tsx
// 修正前
<Link href="/about">About</Link>

// 修正後
<Link href={`/${locale}/about`}>{t('about')}</Link>
```

### クライアントコンポーネントの制約

`useTranslations()` はクライアントコンポーネントでしか使用できません。サーバーコンポーネントで翻訳が必要な場合は:

```tsx
import { getTranslations } from 'next-intl/server';

export default async function ServerComponent() {
  const t = await getTranslations('common');
  return <h1>{t('home')}</h1>;
}
```

---

## 🔗 関連リソース

- [next-intl Documentation](https://next-intl-docs.vercel.app)
- [Routing Documentation](https://next-intl-docs.vercel.app/docs/routing)
- [Messages Documentation](https://next-intl-docs.vercel.app/docs/messages)

---

## ⚙️ 設定オプション

### localePrefix オプション

`middleware.ts` で `localePrefix` を設定できます:

```tsx
// 'as-needed' - デフォルト言語（ja）では /ja/ を省略
localePrefix: 'as-needed'

// 'always' - 全ての言語でプレフィックス必須
localePrefix: 'always'
```

### 推奨設定

```tsx
localePrefix: 'as-needed'  // 日本語: /, 英語: /en/
```

これにより:
- `/` → 日本語（デフォルト）
- `/en/` → 英語
- `/ja/` → 明示的に日本語

---

**作成日**: 2026-01-24
**ステータス**: 基礎設定完了、ページ移行待ち
**見積もり工数**: 4-6時間（ページ移行 + テスト）
