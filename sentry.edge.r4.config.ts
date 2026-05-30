import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.VERCEL_ENV === 'production' ? 0.1 : 0.05,
  environment: process.env.VERCEL_ENV || 'development',
  enabled: process.env.NODE_ENV === 'production',
});
