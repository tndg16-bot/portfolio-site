import { Metadata } from 'next';
import PhilosophyContent from './PhilosophyContent';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Philosophy',
  description: '「ノウハウ依存」から「人生の自己決定」へ。Life Self-Determination Protocolの哲学と理念。',
  keywords: ['人生哲学', '自己決定', '聖域', 'AI活用', '静寂'],
  openGraph: {
    title: 'Philosophy | 本山 貴裕',
    description: '「ノウハウ依存」から「人生の自己決定」へ。Life Self-Determination Protocolの哲学と理念。',
    url: 'https://takahiro-motoyama.vercel.app/philosophy',
    images: [{ url: '/images/ogp-philosophy.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Philosophy | 本山 貴裕',
    description: '「ノウハウ依存」から「人生の自己決定」へ。Life Self-Determination Protocolの哲学と理念。',
  },
  alternates: {
    canonical: 'https://takahiro-motoyama.vercel.app/philosophy',
  },
};

export default function PhilosophyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'ホーム', url: 'https://takahiro-motoyama.vercel.app' },
        { name: 'Philosophy', url: 'https://takahiro-motoyama.vercel.app/philosophy' },
      ]} />
      <PhilosophyContent />
    </>
  );
}
