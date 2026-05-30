'use client';
/**
 * r4 GA4 with Consent Mode v2 (4 params + wait_for_update=500)
 * - Mount BEFORE GA4 script in layout
 * - First PV fires only when consent flips to granted
 */
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { readConsent, CONSENT_EVENT } from '@/lib/r4/consent';

export function GoogleAnalyticsR4() {
  const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
  const [consent, setConsent] = useState<'granted' | 'denied' | 'unknown'>('unknown');
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;
    // Initialize dataLayer + default consent = denied (BEFORE GA loads)
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    }
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = gtag;
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });
    gtag('js', new Date());
    gtag('config', GA_ID, { send_page_view: false });
    setConsent(readConsent());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setConsent(detail);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, [GA_ID]);

  useEffect(() => {
    if (!GA_ID) return;
    if (consent !== 'granted') return;
    if (typeof window === 'undefined' || !window.gtag) return;
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
    window.gtag('event', 'page_view', {
      page_path: pathname + (search?.toString() ? `?${search}` : ''),
      page_location: typeof window !== 'undefined' ? window.location.href : '',
    });
  }, [consent, pathname, search, GA_ID]);

  if (!GA_ID) return null;
  return (
    <Script
      id="ga4-r4"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
    />
  );
}
