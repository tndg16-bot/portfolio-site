import { Metadata } from 'next';
import SessionsContent from './SessionsContent';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'セッション',
  description: '自分の人生を自分で決める力を取り戻す。1on1の対話セッションで、あなたの判断軸を研ぎ澄まします。',
  openGraph: {
    title: 'セッション | 本山 貴裕',
    description: '自分の人生を自分で決める力を取り戻す。1on1の対話セッションで、あなたの判断軸を研ぎ澄まします。',
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
