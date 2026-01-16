'use client';

import { getCaseStudyBySlug } from '@/data/case-studies';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, User, Briefcase, Target, Zap, TrendingUp, Quote } from 'lucide-react';
import BookingForm from '@/components/BookingForm'; // Reuse booking form or link to sessions

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const study = getCaseStudyBySlug(slug);

    if (!study) {
        notFound();
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-16">
                {/* Article Header */}
                <article className="max-w-4xl mx-auto px-4">
                    <Link href="/case-studies" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> 事例一覧に戻る
                    </Link>

                    <header className="mb-16">
                        <div className="flex items-center gap-3 text-sm text-teal-400 mb-4">
                            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 font-medium">
                                {study.client.industry}
                            </span>
                            <span className="text-zinc-500">{study.date}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {study.title}
                        </h1>
                        <p className="text-xl text-zinc-300 leading-relaxed font-light">
                            {study.subtitle}
                        </p>
                    </header>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {study.stats && study.stats.map((stat, i) => (
                            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 text-center">
                                <div className="text-zinc-400 text-sm mb-1">{stat.key}</div>
                                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-teal-400 text-xs">{stat.description}</div>
                            </div>
                        ))}
                    </div>

                    {/* Challenge (Before) */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Target className="text-red-400" />
                            課題と背景
                        </h2>
                        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed bg-zinc-900/30 p-8 rounded-2xl border border-white/5">
                            {study.challenge}
                        </div>
                    </section>

                    {/* Solution (Process) */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Zap className="text-yellow-400" />
                            実施したアプローチ
                        </h2>
                        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed whitespace-pre-line">
                            {study.solution}
                        </div>
                    </section>

                    {/* Results (After) */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <TrendingUp className="text-teal-400" />
                            得られた成果
                        </h2>
                        <div className="bg-gradient-to-br from-teal-500/10 to-purple-500/10 p-8 rounded-2xl border border-teal-500/20">
                            <ul className="space-y-4">
                                {study.results.map((result, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white font-medium">
                                        <span className="w-6 h-6 rounded-full bg-teal-500 text-black flex items-center justify-center text-sm font-bold shrink-0">✓</span>
                                        {result}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Testimonial */}
                    {study.testimonial && (
                        <section className="mb-20">
                            <blockquote className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative">
                                <User className="absolute top-8 left-8 text-zinc-700 w-12 h-12" />
                                <p className="text-xl md:text-2xl italic text-zinc-200 mb-6 relative z-10 leading-relaxed">
                                    "{study.testimonial.quote}"
                                </p>
                                <footer className="text-right">
                                    <cite className="not-italic block font-bold text-white">{study.testimonial.author}</cite>
                                    <span className="text-sm text-zinc-400">{study.testimonial.role}</span>
                                </footer>
                            </blockquote>
                        </section>
                    )}

                    {/* CTA */}
                    <section className="text-center py-12 border-t border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            あなたも同じような変化を起こしませんか？
                        </h2>
                        <Link
                            href="/sessions"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 text-black px-8 py-4 rounded-full font-bold hover:brightness-110 transition-all transform hover:scale-105"
                        >
                            セッションの詳細を見る
                            <ArrowRight size={20} />
                        </Link>
                    </section>
                </article>
            </main>
        </>
    );
}
