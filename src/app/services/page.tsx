import { Metadata } from 'next';
import ServicesContent from './ServicesContent';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'サービス紹介',
  description: 'パーソナルコーチングからビジネスコンサルティングまで。あなたの人生の羅針盤を再構築し、自己決定の力を取り戻すサービス。',
  openGraph: {
    title: 'サービス紹介 | 本山 貴裕',
    description: 'パーソナルコーチングからビジネスコンサルティングまで。あなたの人生の羅針盤を再構築し、自己決定の力を取り戻すサービス。',
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'ホーム', url: 'https://takahiro-motoyama.vercel.app' },
        { name: 'サービス', url: 'https://takahiro-motoyama.vercel.app/services' },
      ]} />
      <FAQPageJsonLd faqs={[
        { question: '初めての方でも大丈夫ですか？', answer: 'はい。初めての方でも安心してご参加いただけます。まずは無料相談からお試しいただけます。' },
        { question: 'オンラインでのセッションは可能ですか？', answer: 'はい。すべてのセッションはZoomを使用したオンラインで行っております。場所を選ばず、ご自宅から安心して参加いただけます。' },
        { question: '法人での利用も可能ですか？', answer: 'はい。企業向けの意思決定ワークショップも承っております。詳細はお問い合わせください。' },
      ]} />
      <ServicesContent />
    </>
  );
}