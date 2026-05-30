/**
 * r4 GA4 イベント tracker
 * Source: T-404_ga4_event_design_draft.md r4
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type GAParams = Record<string, string | number | boolean>;

function track(eventName: string, params: GAParams) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
}

export const Analytics = {
  viewService: (slug: string, audience: 'b2b' | 'b2c') =>
    track('view_service', { service_slug: slug, service_audience: audience }),
  ctaClickFreebooking: (
    sourcePage: string,
    position: 'hero' | 'footer' | 'inline'
  ) =>
    track('cta_click_freebooking', {
      source_page: sourcePage,
      cta_position: position,
    }),
  ctaClickLine: (sourcePage: string, position: 'hero' | 'footer' | 'inline') =>
    track('cta_click_line', {
      source_page: sourcePage,
      cta_position: position,
    }),
  formSubmit: (
    sourcePage: string,
    inquiryType: 'business' | 'individual' | 'general'
  ) =>
    track('form_submit', {
      source_page: sourcePage,
      inquiry_type: inquiryType,
    }),
  noteClickOut: (noteSlug: string, sourceSection: string) =>
    track('note_click_out', {
      note_slug: noteSlug,
      source_section: sourceSection,
    }),
  viewWorks: (slug: string, industry: string) =>
    track('view_works', { work_slug: slug, industry }),
};
