/**
 * r4 グローバルナビゲーション
 */
export const navItemsR4 = [
  { href: '/about', label: 'About', slug: 'about' },
  { href: '/services', label: 'Services', slug: 'services' },
  { href: '/works', label: 'Works', slug: 'works' },
  { href: '/notes', label: 'Notes', slug: 'notes' },
];

export const footerNavR4 = {
  services: [
    { href: '/services?audience=business', label: '法人向けサービス' },
    { href: '/services?audience=individual', label: '個人向けサービス' },
    { href: '/services/ai-poc-codrive', label: 'AI推進並走 PoC' },
  ],
  contents: [
    { href: '/about', label: 'About' },
    { href: '/works', label: '実績' },
    { href: '/notes', label: 'note 記事' },
    { href: '/faq', label: 'FAQ' },
  ],
  contact: [
    { href: '/contact', label: '無料相談予約' },
    { href: '#line', label: 'LINE 公式' },
    { href: 'mailto:hello@kata-works.com', label: 'メール' },
  ],
  legal: [
    { href: '/legal/tokushoho', label: '特定商取引法に基づく表記' },
    { href: '/legal/privacy', label: 'プライバシーポリシー' },
    { href: '/legal/terms', label: '利用規約' },
  ],
};
