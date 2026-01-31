'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Languages } from 'lucide-react';
import type { Locale } from '@/i18n/config';

const locales = [
  { code: 'ja' as Locale, name: '日本語', flag: '🇯🇵' },
  { code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: Locale) => {
    // Remove current locale from pathname and add new locale
    const segments = pathname.split('/').filter(Boolean);

    // Check if first segment is a locale
    if (locales.some(l => l.code === segments[0])) {
      segments.shift();
    }

    const newPath = segments.length > 0 ? segments.join('/') : '';
    router.push(`/${newLocale}${newPath ? `/${newPath}` : ''}`);
    setIsOpen(false);
  };

  const currentLocale = locales.find(l => l.code === locale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors text-sm"
        aria-label="Switch language"
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLocale?.flag} {currentLocale?.name}</span>
        <span className="sm:hidden">{currentLocale?.flag}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 py-1 z-20">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-700 transition-colors ${
                  loc.code === locale ? 'bg-zinc-700 text-teal-400' : 'text-zinc-300'
                }`}
              >
                <span>{loc.flag}</span>
                <span>{loc.name}</span>
                {loc.code === locale && <span className="ml-auto">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
