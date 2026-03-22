'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ImpactCounters from '@/components/skills/ImpactCounters';
import SkillBars from '@/components/skills/SkillBars';
import TechStackCloud from '@/components/skills/TechStackCloud';
import CareerTimeline from '@/components/skills/CareerTimeline';

export default function SkillsContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="w-full py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ textWrap: 'balance' }}
          >
            スキル・経歴
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            金融・人材・AI領域で12年。戦略と実装の両方ができる技術スタックと経歴。
          </motion.p>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="w-full py-16 bg-surface-section px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-text-strong text-center mb-10"
          >
            実績指標
          </motion.h2>
          <ImpactCounters />
        </div>
      </section>

      {/* Skill Bars + Tech Cloud (side by side on desktop) */}
      <section className="w-full py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-text-strong text-center mb-12"
          >
            技術スタック
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-6">プロフィシェンシー</h3>
              <SkillBars />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-6">テクノロジーマップ</h3>
              <TechStackCloud />
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="w-full py-24 bg-surface-section px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-text-strong text-center mb-12"
          >
            キャリア
          </motion.h2>
          <CareerTimeline />
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 bg-japan-indigo px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              このスキルを、あなたのプロジェクトに。
            </h2>
            <p className="text-white/80 text-lg mb-8">
              まずは30分の無料相談で、課題をお聞かせください。
            </p>
            <Link
              href="/contact"
              className="bg-white text-japan-indigo px-8 py-4 min-h-[56px] rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-[transform,box-shadow] duration-200 inline-flex items-center gap-2 group"
            >
              無料相談を予約する
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
