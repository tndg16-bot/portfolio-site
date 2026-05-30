/**
 * r4 Resend with exponential backoff + Slack/Sentry alert
 * Source: T-106_contact_form_spec_draft.md r4
 */
import { Resend } from 'resend';
import * as Sentry from '@sentry/nextjs';
import { notifySlack } from './slack';

const BACKOFF_MS = [5_000, 15_000, 45_000] as const;

export interface SendArgs {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  meta?: Record<string, unknown>;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendWithRetry(args: SendArgs): Promise<{ id: string }> {
  const resend = getResendClient();
  if (!resend) throw new Error('RESEND_API_KEY not set');

  let lastErr: unknown;
  for (let attempt = 0; attempt < BACKOFF_MS.length + 1; attempt++) {
    try {
      const { data, error } = await resend.emails.send({
        from: args.from,
        to: args.to,
        subject: args.subject,
        html: args.html,
        replyTo: args.replyTo,
      });
      if (error) throw error;
      if (!data?.id) throw new Error('Resend returned no id');
      if (attempt > 0) {
        await notifySlack({
          level: 'info',
          title: `Resend recovered after ${attempt} retries`,
          context: { id: data.id, ...args.meta },
        });
      }
      return { id: data.id };
    } catch (err) {
      lastErr = err;
      Sentry.captureException(err, {
        tags: { component: 'resend', attempt: String(attempt) },
        extra: { subject: args.subject, ...args.meta },
      });
      if (attempt < BACKOFF_MS.length) {
        await sleep(BACKOFF_MS[attempt]);
      }
    }
  }
  await notifySlack({
    level: 'error',
    title: 'Resend send FAILED after 3 retries',
    context: { error: String(lastErr), subject: args.subject, ...args.meta },
  });
  throw lastErr;
}
