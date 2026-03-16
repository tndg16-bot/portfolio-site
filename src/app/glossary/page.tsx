import { Metadata } from 'next';
import GlossaryContent from './GlossaryContent';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '用語集',
  description: 'コーチング・セッションで使われる用語の解説。自己決定、判断軸、価値観、AI活用など、サービスに関連する言葉をわかりやすく説明します。',
  keywords: ['用語集', 'コーチング用語', '自己決定', '判断軸', '価値観', 'AI活用', 'プロンプト'],
  openGraph: {
    title: '用語集 | 本山貴裕',
    description: 'コーチング・セッションで使われる用語の解説。自己決定、判断軸、価値観、AI活用など、サービスに関連する言葉をわかりやすく説明します。',
    url: 'https://takahiro-motoyama.vercel.app/glossary',
    images: [{ url: '/images/ogp-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '用語集 | 本山貴裕',
    description: 'コーチング・セッションで使われる用語の解説。自己決定、判断軸、価値観、AI活用など、サービスに関連する言葉をわかりやすく説明します。',
  },
  alternates: {
    canonical: 'https://takahiro-motoyama.vercel.app/glossary',
  },
};

export default function GlossaryPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'ホーム', url: 'https://takahiro-motoyama.vercel.app' },
        { name: '用語集', url: 'https://takahiro-motoyama.vercel.app/glossary' },
      ]} />
      <GlossaryContent />
    </>
  );
}
