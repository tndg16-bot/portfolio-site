/**
 * r4 Slack ops webhook alert (never throws)
 * Source: T-108_slack_webhook_notification_draft.md r4
 */
type Level = 'info' | 'warn' | 'error';

const EMOJI: Record<Level, string> = {
  info: ':white_check_mark:',
  warn: ':warning:',
  error: ':rotating_light:',
};

export async function notifySlack(payload: {
  level: Level;
  title: string;
  context?: Record<string, unknown>;
}): Promise<void> {
  const url = process.env.SLACK_OPS_WEBHOOK_URL;
  if (!url) return;
  const body = {
    text: `${EMOJI[payload.level]} *${payload.title}*\n\`\`\`${JSON.stringify(
      payload.context ?? {},
      null,
      2
    )}\`\`\``,
  };
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    /* never let alert path throw */
  }
}
