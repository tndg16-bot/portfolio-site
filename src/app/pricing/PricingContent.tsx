'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, User, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const individualPlans = [
  {
    name: '無料診断',
    price: '0円',
    duration: '60分',
    description: '現状の課題整理とAI活用の方向性を一緒に見つけます。',
    features: ['課題の整理', 'AI導入の優先順位提案', 'ロードマップ作成'],
    cta: '予約する',
    href: '/contact',
    highlight: true,
  },
  {
    name: 'AI導入ワークショップ',
    price: '10,000円〜',
    duration: '2時間',
    description: 'ハンズオンでAIツールを実際に業務に使えるようになります。',
    features: ['テーマ別ハンズオン', 'プロンプトテンプレート集', '1週間チャットサポート'],
    cta: '詳細を見る',
    href: '/services',
    highlight: false,
  },
  {
    name: '3ヶ月コンパスプログラム',
    price: '要相談',
    duration: '3ヶ月（週1回）',
    description: '週1の1on1で副業・キャリアの道筋を一緒に作ります。',
    features: ['週1回の1on1セッション', '随時チャットサポート', 'AI活用サポート'],
    cta: '相談する',
    href: '/contact',
    highlight: false,
  },
];

const corporatePlans = [
  {
    name: '業務自動化コンサルティング',
    price: '50,000円/月',
    duration: '3ヶ月〜',
    description: '業務フロー分析から自動化設計・実装まで伴走します。',
    features: ['週1回MTG', '随時チャットサポート', '実装まで対応', 'KPIモニタリング'],
    cta: '相談する',
    href: '/contact',
    highlight: true,
  },
  {
    name: 'AI活用継続サポート',
    price: '10,000円/月',
    duration: '月額（解約自由）',
    description: '導入後のAI活用を継続サポートします。',
    features: ['月2回のオンライン相談', 'チャットサポート', 'ツール更新対応'],
    cta: '詳細を見る',
    href: '/services',
    highlight: false,
  },
  {
    name: 'カスタムAI開発',
    price: 'お問い合わせ',
    duration: '要件による',
    description: '社内GPT・チャットボット・自動化システムを構築します。',
    features: ['要件定義から実装まで', '社内GPT構築', 'API連携開発', '運用マニュアル付き'],
    cta: '相談する',
    href: '/contact',
    highlight: false,
  },
];

function PricingCard({ plan, index }: { plan: typeof individualPlans[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
      className={`bg-surface rounded-2xl p-6 border flex flex-col ${
        plan.highlight ? 'border-japan-indigo/30 ring-1 ring-japan-indigo/10' : 'border-border-default'
      }`}
    >
      {plan.highlight && (
        <span className="text-xs bg-japan-indigo text-white px-3 py-1 rounded-full font-bold self-start mb-4">
          おすすめ
        </span>
      )}
      <h3 className="text-lg font-bold text-text-primary mb-1">{plan.name}</h3>
      <div className="mb-3">
        <span className="text-2xl font-bold text-text-primary">{plan.price}</span>
        <span className="text-text-muted text-sm ml-2">/ {plan.duration}</span>
      </div>
      <p className="text-text-secondary text-sm mb-5">{plan.description}</p>

      <ul className="space-y-2 mb-6 flex-grow">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-text-primary">
            <CheckCircle className="h-4 w-4 text-japan-indigo shrink-0 mt-0.5" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={plan.href}
        className={`flex items-center justify-center gap-2 min-h-[48px] rounded-full font-bold text-sm transition-colors duration-200 ${
          plan.highlight
            ? 'bg-[#0f3a52] text-white hover:bg-[#0a2d42]'
            : 'border-2 border-border-default text-text-primary hover:bg-surface-section'
        }`}
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}

export default function PricingContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="w-full py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ textWrap: 'balance' }}
          >
            料金の目安
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-lg"
          >
            まずは無料診断からお気軽にどうぞ。ご状況に合わせてプランをご提案します。
          </motion.p>
        </div>
      </section>

      {/* Individual */}
      <section className="w-full py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 bg-japan-indigo rounded-xl flex items-center justify-center">
              <User className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-text-strong">個人の方へ</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {individualPlans.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate */}
      <section className="w-full py-16 bg-surface-section px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 bg-japan-gold rounded-xl flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-text-strong">法人の方へ</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {corporatePlans.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="w-full py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-text-secondary text-sm mb-8">
            ※ 料金は目安です。ご要望に応じてカスタマイズ可能です。<br />
            ※ すべて税込表示です。<br />
            ※ お支払い方法：銀行振込・クレジットカード対応
          </p>
          <Link
            href="/contact"
            className="bg-[#0f3a52] text-white px-8 py-4 min-h-[56px] rounded-full text-lg font-bold shadow-lg hover:bg-[#0a2d42] hover:shadow-xl hover:scale-105 transition-[transform,box-shadow,background-color] duration-200 inline-flex items-center gap-2 group"
          >
            無料相談を予約する
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
