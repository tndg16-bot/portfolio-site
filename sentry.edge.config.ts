/**
 * Sentry Edge Configuration
 *
 * This file configures the Sentry SDK for edge runtime error monitoring.
 * Required environment variables:
 * - SENTRY_DSN: The DSN for your Sentry project
 */

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
