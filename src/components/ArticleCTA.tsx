"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ArticleCTA() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 pt-8 border-t border-zinc-800"
        >
            <div className="glass-panel rounded-2xl p-8 md:p-10 border border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-zinc-900/50 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="text-teal-400" size={20} />
                        <span className="text-teal-400 font-medium text-sm">
                            無料セッション受付中
                        </span>
                    </div>

                    {/* Main content */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                        モヤモヤを60分で整理しませんか？
                    </h3>

                    <p className="text-zinc-300 mb-6 leading-relaxed max-w-xl">
                        記事を読んで「何か変えたい」と思ったなら、それが第一歩です。
                        <br className="hidden md:block" />
                        初回モニターは<span className="text-teal-400 font-semibold">無料</span>で、
                        あなたの価値観と判断軸をA4一枚に整理してお渡しします。
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-4 mb-8 text-sm text-zinc-400">
                        <span className="flex items-center gap-1.5">
                            <MessageCircle size={14} className="text-teal-400" />
                            オンライン60分
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg
                                className="w-3.5 h-3.5 text-teal-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            初回モニター無料
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg
                                className="w-3.5 h-3.5 text-teal-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            成果物お渡し
                        </span>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="/sessions"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-full font-bold hover:brightness-110 transition-all group shadow-lg shadow-teal-500/20"
                    >
                        セッション詳細を見る
                        <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </Link>
                </div>
            </div>
        </motion.section>
    );
}
