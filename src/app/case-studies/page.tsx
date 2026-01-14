"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { getCaseStudies, getFeaturedCaseStudies } from "@/data/case-studies";

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();
  const featuredCaseStudies = getFeaturedCaseStudies();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'career':
        return <Target className="text-teal-400" size={20} />;
      case 'business':
        return <TrendingUp className="text-blue-400" size={20} />;
      case 'personal':
        return <Users className="text-purple-400" size={20} />;
      default:
        return <Target className="text-teal-400" size={20} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'career':
        return 'bg-teal-500/10 border-teal-500/20 text-teal-400';
      case 'business':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      case 'personal':
        return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
      default:
        return 'bg-teal-500/10 border-teal-500/20 text-teal-400';
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 mb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-block rounded-full bg-teal-500/10 px-4 py-1 text-sm font-medium text-teal-400 border border-teal-500/20">
                Case Studies
              </span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6">
              成功事例
            </motion.h1>
            <motion.p variants={itemVariants} className="text-zinc-300 text-lg max-w-2xl mx-auto">
              クライアントの課題解決と成長を支援した実例をご紹介します。
              数値で示される成果と、変革のプロセスをご覧ください。
            </motion.p>
          </motion.div>
        </section>

        {/* Featured Case Studies */}
        {featuredCaseStudies.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 mb-20">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <span className="w-8 h-1 bg-teal-500 rounded-full"></span>
              注目の事例
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredCaseStudies.map((cs, index) => (
                <motion.div
                  key={cs.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/case-studies/${cs.slug}`}>
                    <article className="glass-panel rounded-2xl p-8 border border-white/5 hover:border-teal-500/30 transition-all duration-300 group h-full">
                      {/* Category & Client */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(cs.category)}`}>
                          {cs.category}
                        </span>
                        <span className="text-zinc-500 text-sm">{cs.client.industry}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                        {cs.title}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4">{cs.subtitle}</p>

                      {/* Summary */}
                      <p className="text-zinc-300 mb-6 line-clamp-3">{cs.summary}</p>

                      {/* Stats */}
                      {cs.stats && cs.stats.length > 0 && (
                        <div className="flex gap-6 mb-6">
                          {cs.stats.slice(0, 2).map((stat, idx) => (
                            <div key={idx}>
                              <p className="text-2xl font-bold text-teal-400">{stat.value}</p>
                              <p className="text-xs text-zinc-500">{stat.key}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cs.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-teal-400 font-medium text-sm group-hover:gap-3 transition-all">
                        <span>詳細を見る</span>
                        <ArrowRight size={16} />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* All Case Studies */}
        <section className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <span className="w-8 h-1 bg-teal-500 rounded-full"></span>
            すべての事例
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, index) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/case-studies/${cs.slug}`}>
                  <article className="glass-card rounded-xl p-6 border border-white/5 hover:border-teal-500/30 transition-all duration-300 group h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3">
                      {getCategoryIcon(cs.category)}
                      <span className="text-zinc-500 text-sm">{cs.client.name}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors line-clamp-2">
                      {cs.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-grow">{cs.summary}</p>

                    {/* Stats */}
                    {cs.stats && cs.stats.length > 0 && (
                      <div className="flex gap-4 mb-4 pt-4 border-t border-white/5">
                        {cs.stats.slice(0, 2).map((stat, idx) => (
                          <div key={idx}>
                            <p className="text-lg font-bold text-white">{stat.value}</p>
                            <p className="text-xs text-zinc-500">{stat.key}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-teal-400 text-sm group-hover:gap-3 transition-all">
                      <span>詳細を見る</span>
                      <ArrowRight size={14} />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto px-4 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-8 md:p-12 text-center border border-teal-500/20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              あなたも変革の一歩を
            </h2>
            <p className="text-zinc-300 mb-8">
              これらの成功事例のように、あなたの課題も解決できます。<br />
              まずは無料相談でお話しください。
            </p>
            <Link
              href="/sessions"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-full font-bold transition-all"
            >
              セッションを予約する
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </section>

        {/* Back Link */}
        <section className="max-w-6xl mx-auto px-4 py-12 text-center">
          <Link href="/" className="text-zinc-400 hover:text-teal-400 transition-colors text-sm">
            ← トップページへ戻る
          </Link>
        </section>
      </main>
    </>
  );
}
