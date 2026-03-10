import { Metadata } from 'next';
import FAQContent from './FAQContent';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'よくある質問',
  description: 'セッションの形式、料金、プライバシーなど、よくあるご質問にお答えします。',
  openGraph: {
    title: 'よくある質問 | 本山 貴裕',
    description: 'セッションの形式、料金、プライバシーなど、よくあるご質問にお答えします。',
  },
};

export default function FAQPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'ホーム', url: 'https://takahiro-motoyama.vercel.app' },
        { name: 'よくある質問', url: 'https://takahiro-motoyama.vercel.app/faq' },
      ]} />
      <FAQPageJsonLd faqs={[
        { question: 'セッションはどのような形式で行われますか？', answer: 'オンライン（Zoom）で60〜90分の1on1対話形式です。事前に簡単なフォームで現状をお伺いし、当日は質問を通じて内面を整理します。' },
        { question: 'コーチング経験がなくても大丈夫ですか？', answer: 'はい。むしろ「初めての方」が多いです。構えず、お話しいただくだけで大丈夫です。' },
        { question: '秘密は守られますか？', answer: 'はい。お話しいただいた内容は一切外部に漏らしません。安心して本音で話してください。' },
        { question: '1回で効果はありますか？', answer: '1回でも「思考の整理」効果を実感される方が多いです。継続は任意です。' },
        { question: '無料モニターでやっている理由は何ですか？', answer: '将来的に「意思決定できる人を増やす」活動をしていきたいからです。そのために、今は悩みの構造を多角的に理解し、セッションの質を磨いています。' },
        { question: 'キャンセルや日程変更はできますか？', answer: 'はい。セッション24時間前までであれば、日程変更を承っています。' },
        { question: '法人での研修やワークショップは実施していますか？', answer: 'はい、企業向けの研修やワークショップも承っています。詳細はメールにてお問い合わせください。' },
        { question: 'オンラインでのセッションは可能ですか？', answer: 'はい、すべてのセッションはZoomを使用したオンラインで行われております。' },
        { question: 'AI活用については教えてもらえますか？', answer: 'はい。あなたのニーズに合わせて、実践的なAI活用方法やツールについてもアドバイスします。' },
      ]} />
      <FAQContent />
    </>
  );
}
