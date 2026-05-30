import { NextResponse, type NextRequest } from 'next/server';
import { sendWithRetry } from '@/lib/r4/resend-client';
import { buildAutoReplyHtml } from '@/lib/r4/auto-reply';
import { notifySlack } from '@/lib/r4/slack';
import { SITE_R4 } from '@/data/r4/site';

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  inquiry_type: 'business' | 'individual' | 'general';
  body: string;
  turnstileToken: string;
}

export async function POST(req: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }
  if (!payload.name || !payload.email || !payload.body || !payload.turnstileToken) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
  }

  // Turnstile 検証
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    try {
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: payload.turnstileToken,
        }),
      });
      if (verify.status !== 200) {
        return NextResponse.json({ error: 'captcha_service_down' }, { status: 502 });
      }
      const data = (await verify.json()) as { success: boolean };
      if (!data.success) {
        return NextResponse.json({ error: 'captcha_failed' }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: 'captcha_service_error' }, { status: 502 });
    }
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? SITE_R4.email.business;
  const toEmail = process.env.RESEND_NOTIFY_TO ?? 't.ndg16@gmail.com';

  try {
    // 1) 本山宛通知
    await sendWithRetry({
      from: fromEmail,
      to: toEmail,
      subject: `[${SITE_R4.shortName}] ${payload.inquiry_type}: ${payload.name}様より`,
      replyTo: payload.email,
      html: `
        <h2>新規お問い合わせ</h2>
        <p><strong>お名前</strong>: ${escape(payload.name)}</p>
        <p><strong>メール</strong>: ${escape(payload.email)}</p>
        <p><strong>会社</strong>: ${escape(payload.company ?? '-')}</p>
        <p><strong>種別</strong>: ${escape(payload.inquiry_type)}</p>
        <hr/>
        <pre>${escape(payload.body)}</pre>
      `,
      meta: { ip: req.headers.get('x-forwarded-for') ?? 'n/a' },
    });
    // 2) 自動返信
    await sendWithRetry({
      from: fromEmail,
      to: payload.email,
      subject: `お問い合わせありがとうございます | 本山貴裕`,
      html: buildAutoReplyHtml({ name: payload.name, body: payload.body }),
      meta: { kind: 'auto-reply' },
    });
    // 3) Slack notify (best effort)
    await notifySlack({
      level: 'info',
      title: '📩 wagashi.dev 新規お問い合わせ',
      context: {
        name: payload.name,
        email: payload.email,
        company: payload.company ?? '-',
        type: payload.inquiry_type,
        body_preview: payload.body.slice(0, 200),
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'send_failed', detail: String(err) }, { status: 502 });
  }
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
