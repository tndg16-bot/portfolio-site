# i18n Implementation Plan (Task 4-5)

## Current State
- ✅ Translation files exist at `messages/ja.json` and `messages/en.json`
- ✅ Translation structure is well-organized by sections (common, home, about, philosophy, etc.)
- ❌ i18n library not installed
- ❌ Translation infrastructure not integrated into the app
- ❌ No language switcher component

## Recommended Implementation Strategy

### Option 1: Use next-intl (Recommended)

**Installation:**
```bash
npm install next-intl
```

**Configuration Steps:**

1. Create `src/i18n/request.ts`:
```typescript
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getRequestCookies } from 'next/headers';

const locales = ['ja', 'en'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});
```

2. Create `src/i18n/config.ts`:
```typescript
export const locales = ['ja', 'en'];
export const defaultLocale = 'ja';
export type Locale = (typeof locales)[number];
```

3. Update `next.config.ts`:
```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // ... existing config
};

export default withNextIntl(nextConfig);
```

4. Update `src/app/[locale]/layout.tsx`:
```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return ['ja', 'en'].map((locale) => ({ locale }));
}

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
```

5. Create language switcher component `src/components/LanguageSwitcher.tsx`:
```typescript
'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
  };

  return (
    <div>
      <button onClick={() => switchLocale('ja')}>日本語</button>
      <button onClick={() => switchLocale('en')}>English</button>
    </div>
  );
}
```

6. Update components to use translations:
```typescript
import { useTranslations } from 'next-intl';

export function Component() {
  const t = useTranslations('home.hero');
  return <h1>{t('title')}</h1>;
}
```

### Migration Strategy

**Phase 1: Setup (1-2 hours)**
- Install and configure next-intl
- Create i18n config files
- Update routing structure to include [locale] param

**Phase 2: Core Pages (2-3 hours)**
- Update home page
- Update about page
- Update philosophy page
- Update sessions page
- Update contact page

**Phase 3: Components (1-2 hours)**
- Update Header component
- Update Footer (if exists)
- Update navigation items

**Phase 4: Blog Content (3-4 hours)**
- Update blog listing page
- Update blog detail page
- Decide on multi-language blog content strategy

**Phase 5: Testing (1 hour)**
- Test language switching
- Verify all translations are loaded
- Check SEO tags for each language

## Alternative Option: Custom i18n Implementation

If next-intl doesn't meet requirements, create a custom solution:

1. Use React Context for locale management
2. Create a `useTranslation` hook
3. Implement language switching with URL params
4. Load translation files dynamically

**Pros:** More control over implementation
**Cons:** More development time, potential maintenance burden

## Considerations

### Content Strategy
1. **Full translation**: All content available in both languages (recommended)
2. **Hybrid**: Core pages translated, blog posts remain in Japanese
3. **Language-specific content**: Different content per language

### SEO Implications
- Need hreflang tags for each locale
- Separate sitemaps per locale
- Language-specific metadata

### Performance Impact
- Additional bundle size for translation files
- Potential for lazy loading of translations by locale
- Client-side locale switching vs. server-side

## Estimated Effort
- **Total time**: 8-12 hours
- **Priority**: Low
- **Complexity**: Medium
- **Risk**: Low (translation files already prepared)

## Next Steps
1. Choose implementation approach (next-intl recommended)
2. Set up infrastructure
3. Migrate pages incrementally
4. Test thoroughly before production deployment
5. Monitor analytics for language usage

---

*Status: Plan created, implementation pending*
*Priority: Low*
*Estimated time: 8-12 hours*
