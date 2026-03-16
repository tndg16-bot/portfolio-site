import { Metadata } from 'next';
import CoursesContent from './CoursesContent';

export const metadata: Metadata = {
  title: 'オンラインコース - 自分だけの人生を設計する',
  description: '自分のペースで学べるオンラインプログラム。自己決定力を高め、他者の期待から解放される力を身につけます。',
  openGraph: {
    title: 'オンラインコース | 本山 貴裕',
    description: '自分のペースで学べるオンラインプログラム。自己決定力を高め、他者の期待から解放される力を身につけます。',
    url: 'https://takahiro-motoyama.vercel.app/courses',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'オンラインコース | 本山 貴裕',
    description: '自分のペースで学べるオンラインプログラム。自己決定力を高め、他者の期待から解放される力を身につけます。',
  },
  alternates: {
    canonical: 'https://takahiro-motoyama.vercel.app/courses',
  },
};

export default function CoursesPage() {
  return <CoursesContent />;
}
