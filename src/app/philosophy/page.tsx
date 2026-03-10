import { Metadata } from 'next';
import PhilosophyContent from './PhilosophyContent';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Philosophy',
  description: '「ノウハウ依存」から「人生の自己決定」へ。Life Self-Determination Protocolの哲学と理念。',
  openGraph: {
    title: 'Philosophy | 本山 貴裕',
    description: '「ノウハウ依存」から「人生の自己決定」へ。Life Self-Determination Protocolの哲学と理念。',
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
