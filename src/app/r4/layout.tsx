import { GoogleAnalyticsR4 } from '@/components/r4/analytics/GoogleAnalyticsR4';
import { CookieConsentR4 } from '@/components/r4/analytics/CookieConsentR4';

export default function R4Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CookieConsentR4 />
      <GoogleAnalyticsR4 />
      {children}
    </>
  );
}
