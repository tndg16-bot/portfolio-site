import { Metadata } from 'next';
import ContactContent from './ContactContent';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: '無料相談の予約、メール、LINEでのお問い合わせ。あなたの変化への第一歩をお待ちしています。',
  keywords: ['お問い合わせ', 'セッション予約', '無料相談', '連絡先'],
  openGraph: {
    title: 'お問い合わせ | 本山 貴裕',
    description: '無料相談の予約、メール、LINEでのお問い合わせ。あなたの変化への第一歩をお待ちしています。',
    url: 'https://takahiro-motoyama.vercel.app/contact',
    images: [{ url: '/images/ogp-contact.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'お問い合わせ | 本山 貴裕',
    description: '無料相談の予約、メール、LINEでのお問い合わせ。あなたの変化への第一歩をお待ちしています。',
  },
  alternates: {
    canonical: 'https://takahiro-motoyama.vercel.app/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'ホーム', url: 'https://takahiro-motoyama.vercel.app' },
        { name: 'お問い合わせ', url: 'https://takahiro-motoyama.vercel.app/contact' },
      ]} />
      <ContactContent />
    </>
  );
}