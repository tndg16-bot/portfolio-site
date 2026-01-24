/**
 * Google Analytics 4 Component
 *
 * Initialize GA4 tracking with environment variable
 */

'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface GAViewEvent {
  page_path: string;
  page_title: string;
  page_location: string;
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [pathname]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: window.document.title,
            page_location: window.location.href,
            send_page_view: false,
          });
        `}
      </Script>
    </>
  );
}

/**
 * Track custom events
 */
export function trackEvent({ action, category, label, value }: GAEvent): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}

/**
 * Track page views (for client-side navigation)
 */
export function trackPageView({ page_path, page_title, page_location }: GAViewEvent): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path,
      page_title,
      page_location,
    });
  }
}
