import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: '料金の目安',
  description: '本山貴裕のサービス料金一覧。個人向けコーチング・法人向けAI導入コンサルティング・カスタム開発の料金目安。',
};

export default function PricingPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center overflow-x-hidden pt-20 text-japan-charcoal">
      <Header />
      <PricingContent />
      <Footer />
    </main>
  );
}
