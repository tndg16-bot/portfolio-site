'use client';
/**
 * r4 Cookie 同意バナー (hydration safe / Consent Mode v2 4項目)
 */
import { useEffect, useState } from 'react';
import { readConsent, writeConsent } from '@/lib/r4/consent';

export function CookieConsentR4() {
  const [consent, setConsent] = useState<'granted' | 'denied' | 'unknown'>('unknown');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsent(readConsent());
  }, []);

  if (!mounted) return null;
  if (consent !== 'unknown') return null;

  function handleAccept() {
    writeConsent('granted');
    setConsent('granted');
  }
  function handleReject() {
    writeConsent('denied');
    setConsent('denied');
  }

  return (
    <div
      role="region"
      aria-label="Cookie 同意"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-wagashi-gold/40 bg-wagashi-kinari/95 px-4 py-4 shadow-sm backdrop-blur"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 md:flex-row md:items-center">
        <p className="flex-1 text-sm text-wagashi-tanboku">
          このサイトはアクセス解析に Cookie を使います。詳しくは{' '}
          <a href="/legal/privacy" className="underline underline-offset-2">
            プライバシーポリシー
          </a>{' '}
          へ。
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-sm bg-wagashi-indigo px-5 py-2 text-sm text-white transition-colors duration-wagashi-hover hover:bg-wagashi-aizumi"
          >
            了解しました
          </button>
          <button
            type="button"
            onClick={handleReject}
            className="rounded-sm border border-wagashi-tanboku px-5 py-2 text-sm text-wagashi-tanboku transition-colors duration-wagashi-hover hover:bg-wagashi-cream"
          >
            拒否する
          </button>
        </div>
      </div>
    </div>
  );
}
