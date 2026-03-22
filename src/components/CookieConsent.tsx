'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  function updateGAConsent(granted: boolean) {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: granted ? 'granted' : 'denied',
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
      });
    }
  }

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    } else {
      // Already consented — update GA consent state
      updateGAConsent(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    updateGAConsent(true);
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie同意バナー"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border-default bg-surface backdrop-blur-xl px-4 py-4 shadow-lg sm:px-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-text-primary">
          当サイトでは、サービス向上のためにCookieを使用しています。詳しくは
          <Link
            href="/privacy"
            className="ml-1 underline underline-offset-2 hover:text-text-strong"
          >
            プライバシーポリシー
          </Link>
          をご覧ください。
        </p>
        <button
          onClick={handleAccept}
          className="shrink-0 rounded-md bg-japan-indigo px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-japan-indigo/90 focus:outline-none focus:ring-2 focus:ring-japan-indigo focus:ring-offset-2"
        >
          同意する
        </button>
      </div>
    </div>
  );
}
