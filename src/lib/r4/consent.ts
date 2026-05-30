/**
 * r4 Cookie 同意状態管理
 * Source: T-104_cookie_banner_spec_draft.md r4
 */
export type ConsentState = 'granted' | 'denied' | 'unknown';
export const CONSENT_KEY = 'pf_consent_v1';
export const CONSENT_EVENT = 'pf:consent-changed';

export function readConsent(): ConsentState {
  if (typeof window === 'undefined') return 'unknown';
  const v = localStorage.getItem(CONSENT_KEY);
  if (v === 'granted' || v === 'denied') return v;
  return 'unknown';
}

export function writeConsent(v: 'granted' | 'denied') {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_KEY, v);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
}
