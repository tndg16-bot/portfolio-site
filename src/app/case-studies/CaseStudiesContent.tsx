'use client';

import { motion } from 'framer-motion';
import { getCaseStudies } from '@/data/case-studies';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function CaseStudiesContent() {
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
                        className="text-4xl md:text-5xl font-bold bg-japan-indigo text-white mb-6"
                    >
                        Case Studies
                        <span className="block text-xl md:text-2xl text-japan-indigo mt-2 font-normal">
                            変化の物語
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-text-secondary max-w-2xl mx-auto leading-relaxed"
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
                            className="glass-card hover:bg-zinc-900/80 transition-all group rounded-2xl overflow-hidden border border-white/5 hover:border-japan-indigo/30 flex flex-col"
                        >
                            <Link href={`/case-studies/${study.slug}`} className="flex-1 flex flex-col p-6 md:p-8">
                                {/* Header */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 text-xs text-japan-indigo mb-2">
                                        <span className="px-2 py-1 rounded-full bg-japan-indigo/15 border border-japan-indigo/25">
                                            {study.client.industry}
                                        </span>
                                        {study.category && (
                                            <span className="text-text-muted uppercase tracking-wider">{study.category}</span>
                                        )}
                                    </div>
                                    <h2 className="text-xl font-bold bg-japan-indigo text-white group-hover:text-japan-indigo transition-colors mb-2 line-clamp-3">
                                        {study.title}
                                    </h2>
                                </div>

                                {/* Summary */}
                                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
                                    {study.summary}
                                </p>

                                {/* Stats Preview */}
                                <div className="border-t border-white/10 pt-4 mt-auto">
                                    {study.stats && study.stats.length > 0 && (
                                        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                                            <TrendingUp size={16} className="text-japan-indigo" />
                                            <span className="font-semibold bg-japan-indigo text-white">{study.stats[0].key}: {study.stats[0].value}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex items-center text-japan-indigo text-sm font-medium group-hover:translate-x-1 transition-transform">
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
