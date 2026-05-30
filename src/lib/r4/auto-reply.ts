/**
 * r4 自動返信メールテンプレ
 * Source: T-107_auto_reply_email_draft.md r4
 */
import { SITE_R4 } from '@/data/r4/site';

export function buildAutoReplyHtml({
  name,
  body,
}: {
  name: string;
  body: string;
}): string {
  const safeName = escapeHtml(name);
  const safeBody = escapeHtml(body);
  return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="utf-8" /></head>
<body style="font-family:'Hiragino Sans',sans-serif;line-height:1.7;color:#27221F;max-width:600px;margin:0 auto;background:#F0E8D6;padding:24px;">
  <h2 style="color:#165E83;">お問い合わせありがとうございます</h2>
  <p>${safeName} 様</p>
  <p>${SITE_R4.shortName} へのお問い合わせありがとうございます。<br/>本山貴裕です。</p>
  <p>内容を確認の上、<strong>24時間以内</strong>を目安に返信いたします。<br/>お急ぎの場合は LINE 公式アカウントもご利用ください。</p>
  <hr style="border:0;border-top:1px solid #E6B422;margin:24px 0;"/>
  <h3 style="color:#165E83;">お問い合わせ内容</h3>
  <pre style="background:#F8F3E6;padding:16px;border-radius:4px;white-space:pre-wrap;">${safeBody}</pre>
  <hr style="border:0;border-top:1px solid #E6B422;margin:24px 0;"/>
  <h3 style="color:#165E83;">待ち時間に読める3本</h3>
  <ul>
    <li><a href="${SITE_R4.url}/services" style="color:#165E83;">サービス一覧</a></li>
    <li><a href="${SITE_R4.url}/works" style="color:#165E83;">実績紹介</a></li>
    <li><a href="${SITE_R4.url}/notes" style="color:#165E83;">直近のnote記事</a></li>
  </ul>
  <p style="margin-top:32px;color:#5B5651;font-size:12px;">
    本山貴裕（個人事業 / AI 活用支援）<br/>
    ${SITE_R4.url}<br/>
    ${SITE_R4.email.business}<br/>
    ※本メールは自動送信です。返信は ${SITE_R4.email.business} 宛にお願いします。
  </p>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
