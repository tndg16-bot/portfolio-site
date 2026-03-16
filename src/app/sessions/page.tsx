import { Metadata } from 'next';
import SessionsContent from './SessionsContent';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'セッション',
  description: '自分の人生を自分で決める力を取り戻す。1on1の対話セッションで、あなたの判断軸を研ぎ澄まします。',
  keywords: ['セッション予約', 'モヤモヤ整理', 'コーチング', '人生設計', 'AI活用'],
  openGraph: {
    title: 'セッション | 本山 貴裕',
    description: '自分の人生を自分で決める力を取り戻す。1on1の対話セッションで、あなたの判断軸を研ぎ澄まします。',
    url: 'https://takahiro-motoyama.vercel.app/sessions',
    images: [{ url: '/images/ogp-sessions.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'セッション | 本山 貴裕',
    description: '自分の人生を自分で決める力を取り戻す。1on1の対話セッションで、あなたの判断軸を研ぎ澄まします。',
  },
  alternates: {
    canonical: 'https://takahiro-motoyama.vercel.app/sessions',
  },
};

export default function SessionsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'ホーム', url: 'https://takahiro-motoyama.vercel.app' },
        { name: 'セッション', url: 'https://takahiro-motoyama.vercel.app/sessions' },
      ]} />
      <SessionsContent />
    </>
  );
}
