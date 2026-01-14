"use client";

import { motion } from 'framer-motion';
import { CheckCircle2, Target, Lightbulb, Award, TrendingUp, ArrowLeft, Quote } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import { CaseStudy } from '@/types/case-studies';

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetailClient({ caseStudy }: CaseStudyDetailClientProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Link */}
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-teal-400 transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              <span>すべての事例に戻る</span>
            </Link>

            {/* Category & Client */}
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 border border-teal-500/20 text-teal-400">
                {caseStudy.category}
              </span>
              <span className="text-zinc-500">{caseStudy.client.industry}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-zinc-400 mb-6">{caseStudy.subtitle}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Quick Info Panel */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-6 grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            <div>
              <p className="text-sm text-zinc-500 mb-1">クライアント</p>
              <p className="text-white font-medium">{caseStudy.client.name}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-1">業界</p>
              <p className="text-white font-medium">{caseStudy.client.industry}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-1">実施日</p>
              <p className="text-white font-medium">{caseStudy.date}</p>
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        {caseStudy.stats && caseStudy.stats.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card rounded-xl p-6 text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-2 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                      <TrendingUp className="text-teal-400" size={24} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-teal-400 font-medium text-sm mb-1">{stat.key}</p>
                  <p className="text-zinc-500 text-xs">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Summary */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-8"
          >
            <h2 className="text-xl font-bold text-white mb-4">概要</h2>
            <p className="text-zinc-300 text-lg leading-relaxed">{caseStudy.summary}</p>
          </motion.div>
        </section>

        {/* Challenge */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <Target className="text-amber-400" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">課題</h2>
            </div>
            <div className="pl-14">
              <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-line">{caseStudy.challenge}</p>
            </div>
          </motion.div>
        </section>

        {/* Solution */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                <Lightbulb className="text-teal-400" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">解決策</h2>
            </div>
            <div className="pl-14">
              <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-line">{caseStudy.solution}</p>
            </div>
          </motion.div>
        </section>

        {/* Results */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <Award className="text-emerald-400" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">成果</h2>
            </div>
            <div className="pl-14 space-y-3">
              {caseStudy.results.map((result, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="text-emerald-400 shrink-0 mt-1" size={20} />
                  <p className="text-zinc-300 text-lg">{result}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <section className="max-w-4xl mx-auto px-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl p-8 relative overflow-hidden"
            >
              <Quote className="absolute top-4 right-4 text-white/5" size={64} />
              <div className="relative z-10">
                <blockquote className="text-zinc-200 text-lg md:text-xl italic leading-relaxed mb-6">
                  {caseStudy.testimonial.quote}
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {caseStudy.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold">{caseStudy.testimonial.author}</p>
                    <p className="text-zinc-500 text-sm">{caseStudy.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-8 md:p-12 text-center border border-teal-500/20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              あなたの課題も解決できます
            </h2>
            <p className="text-zinc-300 mb-8">
              同じような悩みをお持ちでしたら、ぜひご相談ください。<br />
              あなたに合った解決策を一緒に見つけましょう。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/sessions"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-full font-bold transition-all"
              >
                セッションを予約する
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 glass-card hover:bg-white/5 text-white px-8 py-4 rounded-full font-bold transition-all border border-white/10"
              >
                他の事例を見る
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Back Link */}
        <section className="max-w-4xl mx-auto px-4 py-12 text-center">
          <Link href="/case-studies" className="text-zinc-400 hover:text-teal-400 transition-colors text-sm">
            ← 事例一覧へ戻る
          </Link>
        </section>
      </main>
    </>
  );
}
