import { Metadata } from 'next';
import AboutContent from './AboutContent';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About - 自己紹介',
  description: '判断軸を取り戻して、自分で決められる人を増やしたい。金融・人材・AI領域での経験を活かし、パーソナルコーチングを提供。',
  openGraph: {
    title: 'About - 自己紹介 | 本山 貴裕',
    description: '判断軸を取り戻して、自分で決められる人を増やしたい。金融・人材・AI領域での経験を活かし、パーソナルコーチングを提供。',
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