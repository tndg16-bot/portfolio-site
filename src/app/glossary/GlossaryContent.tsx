'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { BookOpen, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';

interface GlossaryTerm {
    term: string;
    definition: string;
}

const glossaryTerms: GlossaryTerm[] = [
    {
        term: '自己決定',
        definition: '外部の正解に頼らず、自分の価値観・判断軸に基づいて選択・行動すること',
    },
    {
        term: '判断軸',
        definition: '意思決定の際に拠り所となる、自分自身の基準や価値観のこと',
    },
    {
        term: '価値観',
        definition: '何を大切にし、何を優先するかという個人の根本的な信念体系',
    },
    {
        term: '羅針盤プログラム',
        definition: '3ヶ月間の個人コーチングプログラム。価値観の言語化→目標設定→行動計画→実践を通じて、自己決定力を養う',
    },
    {
        term: 'AI活用',
        definition: 'ChatGPT、Claude等のAIツールを「思考の拡張」として使いこなし、仕事や副業に活かすこと',
    },
    {
        term: 'プロンプト',
        definition: 'AIに対する指示文。目的に応じた適切なプロンプト設計が、AI活用の鍵となる',
    },
    {
        term: 'セッション',
        definition: '60〜90分のオンライン1on1対話。問いかけを通じて内面を整理し、次のアクションを明確にする',
    },
    {
        term: 'コーチング',
        definition: '答えを教えるのではなく、問いかけを通じて相手の中にある答えを引き出す対話手法',
    },
    {
        term: 'ワークショップ',
        definition: 'チーム向けの意思決定フレームワーク研修。組織の意思決定プロセスを改善する',
    },
    {
        term: 'ワークシート',
        definition: 'セッション前後に使用する自己分析・振り返り用のフレームワーク',
    },
    {
        term: 'モヤモヤ整理',
        definition: '漠然とした不安や迷いを言語化し、構造的に整理するプロセス。セッションの核となるステップ',
    },
];

export default function GlossaryContent() {
    const [searchQuery, setSearchQuery] = useState('');

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const filteredTerms = glossaryTerms.filter(
        (item) =>
            item.term.includes(searchQuery) ||
            item.definition.includes(searchQuery)
    );

    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-20">
                <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '用語集' }]} />

                {/* Hero Section */}
                <section className="relative w-full py-24 px-4">
                    <div className="absolute inset-0 bg-japan-cream" />
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-japan-indigo/15 border border-japan-indigo/20 mb-8"
                        >
                            <BookOpen className="w-4 h-4 text-japan-indigo" />
                            <span className="text-sm text-zinc-800">Glossary</span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            <span className="text-japan-indigo">用語集</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-zinc-800 max-w-2xl mx-auto leading-relaxed"
                        >
                            コーチング・セッションで使われる言葉を、
                            <br />
                            わかりやすく解説します。
                        </motion.p>
                    </motion.div>
                </section>

                {/* Search */}
                <section className="w-full max-w-4xl px-4 -mt-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-japan-indigo/50" />
                        <input
                            type="text"
                            placeholder="用語を検索..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/60 border border-japan-indigo/10 text-japan-charcoal placeholder:text-zinc-400 focus:outline-none focus:border-japan-indigo/30 focus:ring-2 focus:ring-japan-indigo/10 transition-all"
                        />
                    </motion.div>
                </section>

                {/* Terms List */}
                <section className="w-full max-w-4xl px-4 py-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="space-y-4"
                    >
                        {filteredTerms.length > 0 ? (
                            filteredTerms.map((item) => (
                                <motion.div
                                    key={item.term}
                                    variants={itemVariants}
                                    className="p-6 rounded-xl bg-white/60 border border-japan-indigo/10 hover:border-japan-indigo/30 transition-colors"
                                >
                                    <h3 className="text-lg font-bold text-japan-indigo mb-2">
                                        {item.term}
                                    </h3>
                                    <p className="text-japan-charcoal leading-relaxed">
                                        {item.definition}
                                    </p>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                variants={itemVariants}
                                className="p-8 rounded-xl bg-white/60 border border-japan-indigo/10 text-center"
                            >
                                <p className="text-zinc-500">
                                    「{searchQuery}」に一致する用語が見つかりませんでした。
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </section>

                {/* CTA */}
                <section className="w-full max-w-4xl px-4 py-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="relative overflow-hidden rounded-3xl bg-japan-indigo/5 border border-japan-indigo/10 p-12 text-center"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl font-bold text-japan-indigo mb-4"
                        >
                            用語を知ったら、次は体験してみませんか？
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-zinc-800 mb-8"
                        >
                            60分のセッションで、あなたの判断軸を言語化します。
                        </motion.p>
                        <motion.div variants={itemVariants}>
                            <Link
                                href="/sessions"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-japan-indigo font-bold text-lg hover:opacity-90 transition-opacity"
                            >
                                セッション詳細はこちら
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Footer */}
                <footer className="w-full py-12 border-t border-japan-indigo/5 bg-japan-indigo/5">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex gap-6 text-zinc-700 text-sm">
                                <Link href="/" className="hover:text-japan-indigo transition-colors">Home</Link>
                                <Link href="/about" className="hover:text-japan-indigo transition-colors">About</Link>
                                <Link href="/sessions" className="hover:text-japan-indigo transition-colors">Sessions</Link>
                                <Link href="/contact" className="hover:text-japan-indigo transition-colors">Contact</Link>
                            </div>
                            <p className="text-zinc-700 text-sm">
                                &copy; 2026 Takahiro Motoyama. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
