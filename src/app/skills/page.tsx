import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SkillsContent from './SkillsContent';

export const metadata: Metadata = {
  title: 'スキル・経歴',
  description: '本山貴裕の技術スタック、キャリア経歴、実績指標。金融・HR・AI領域で12年の実務経験。',
};

export default function SkillsPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center overflow-x-hidden pt-20 text-japan-charcoal">
      <Header />
      <SkillsContent />
      <Footer />
    </main>
  );
}
