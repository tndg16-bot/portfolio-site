'use client';

import { motion } from 'framer-motion';
import { getCaseStudies } from '@/data/case-studies';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowRight, User, TrendingUp } from 'lucide-react';

export default function CaseStudiesPage() {
    const caseStudies = getCaseStudies();

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-16 px-4">
                {/* Hero */}
                <section className="max-w-6xl mx-auto mb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Case Studies
                        <span className="block text-xl md:text-2xl text-teal-400 mt-2 font-normal">
                            変化の物語
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        コーチングとコンサルティングを通じて、クライアントが直面した課題と、それをどう乗り越えたかの記録です。
                    </motion.p>
                </section>

                {/* Case Studies Grid */}
                <section className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card hover:bg-zinc-900/80 transition-all group rounded-2xl overflow-hidden border border-white/5 hover:border-teal-500/30 flex flex-col"
                        >
                            <Link href={`/case-studies/${study.slug}`} className="flex-1 flex flex-col p-6 md:p-8">
                                {/* Header */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 text-xs text-teal-400 mb-2">
                                        <span className="px-2 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
                                            {study.client.industry}
                                        </span>
                                        {study.category && (
                                            <span className="text-zinc-500 uppercase tracking-wider">{study.category}</span>
                                        )}
                                    </div>
                                    <h2 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors mb-2 line-clamp-3">
                                        {study.title}
                                    </h2>
                                </div>

                                {/* Summary */}
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
                                    {study.summary}
                                </p>

                                {/* Stats Preview */}
                                <div className="border-t border-white/10 pt-4 mt-auto">
                                    {study.stats && study.stats.length > 0 && (
                                        <div className="flex items-center gap-2 text-sm text-zinc-300 mb-2">
                                            <TrendingUp size={16} className="text-teal-400" />
                                            <span className="font-semibold text-white">{study.stats[0].key}: {study.stats[0].value}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex items-center text-teal-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                    詳細を見る <ArrowRight size={16} className="ml-1" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </section>
            </main>
        </>
    );
}
