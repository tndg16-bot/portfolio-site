/**
 * r4 サイト全体メタ情報
 */
export const SITE_R4 = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://wagashi.dev',
  businessUrl: process.env.NEXT_PUBLIC_BUSINESS_URL || 'https://kata-works.com',
  name: '本山貴裕 | AI研修・推進支援',
  shortName: 'wagashi.dev',
  description:
    '営業の現場でAIを毎日使いこなす、手を動かすコンサルタント。法人向けAI研修・推進支援、個人向けAI活用伴走を提供。',
  author: '本山貴裕',
  locale: 'ja_JP',
  defaultOgImage: '/og-default.png',
  email: {
    business: 'hello@kata-works.com',
    general: 'contact@wagashi.dev',
  },
  timerex: process.env.NEXT_PUBLIC_TIMEREX_URL || 'https://timerex.net/s/motoyama-takahiro/PLACEHOLDER_SLOT',
  lineUrl: process.env.NEXT_PUBLIC_LINE_URL || 'https://lin.ee/PLACEHOLDER_LINEID',
  noteUser: process.env.NEXT_PUBLIC_NOTE_USER || 'tndg',
  noteRss: process.env.NEXT_PUBLIC_NOTE_RSS || 'https://note.com/tndg/rss',
  sns: {
    note: 'https://note.com/tndg',
    threads: 'https://www.threads.net/@tndg16',
    x: 'https://x.com/tndg16',
    linkedin: 'https://www.linkedin.com/in/takahiro-motoyama',
    github: 'https://github.com/tndg16-bot',
  },
};
