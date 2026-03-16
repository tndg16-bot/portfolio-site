import { Metadata } from 'next';
import AboutContent from './AboutContent';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About - 自己紹介',
  description: '判断軸を取り戻して、自分で決められる人を増やしたい。金融・人材・AI領域での経験を活かし、パーソナルコーチングを提供。',
  keywords: ['コーチング理念', '経歴', '自己決定', 'コーチング実績'],
  openGraph: {
    title: 'About - 自己紹介 | 本山 貴裕',
    description: '判断軸を取り戻して、自分で決められる人を増やしたい。金融・人材・AI領域での経験を活かし、パーソナルコーチングを提供。',
    url: 'https://takahiro-motoyama.vercel.app/about',
    images: [{ url: '/images/ogp-about.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - 自己紹介 | 本山 貴裕',
    description: '判断軸を取り戻して、自分で決められる人を増やしたい。金融・人材・AI領域での経験を活かし、パーソナルコーチングを提供。',
  },
  alternates: {
    canonical: 'https://takahiro-motoyama.vercel.app/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'ホーム', url: 'https://takahiro-motoyama.vercel.app' },
        { name: 'About', url: 'https://takahiro-motoyama.vercel.app/about' },
      ]} />
      <AboutContent />
    </>
  );
}