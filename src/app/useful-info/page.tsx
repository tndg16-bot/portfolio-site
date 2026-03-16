import { Metadata } from 'next';
import UsefulInfoContent from './UsefulInfoContent';

export const metadata: Metadata = {
  title: 'お役立ち情報',
  description: 'コーチング・AI活用・自己成長に役立つリソースやワークシートをまとめています。セッションをより活用するための情報集。',
  openGraph: {
    title: 'お役立ち情報 | 本山 貴裕',
    description: 'コーチング・AI活用・自己成長に役立つリソースやワークシートをまとめています。',
    url: 'https://takahiro-motoyama.vercel.app/useful-info',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'お役立ち情報 | 本山 貴裕',
    description: 'コーチング・AI活用・自己成長に役立つリソースやワークシートをまとめています。',
  },
  alternates: {
    canonical: 'https://takahiro-motoyama.vercel.app/useful-info',
  },
};

export default function UsefulInfoPage() {
  return <UsefulInfoContent />;
}
