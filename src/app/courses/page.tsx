'use client';

import { motion } from 'framer-motion';
import { getCourses } from '@/data/courses';
import Header from '@/components/Header';
import Link from 'next/link';
import { Clock, BookOpen, ArrowRight, CheckCircle2, Users } from 'lucide-react';

export default function CoursesPage() {
    const courses = getCourses();

    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-20 text-japan-charcoal">
                {/* Hero Section */}
                <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center px-4 pattern-seigaiha opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-japan-cream via-transparent to-japan-cream pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 w-full max-w-4xl text-center px-4"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full bg-japan-indigo/10 px-4 py-2 text-sm font-medium text-japan-indigo border border-japan-indigo/20 mb-8">
                            <BookOpen size={16} />
                            <span>Life Self-Determination Academy</span>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-japan-indigo"
                        >
                            オンラインコース
                            <span className="block text-xl md:text-3xl font-normal mt-4 text-japan-charcoal/80">
                                自分だけの人生を設計する
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-japan-charcoal mb-12"
                        >
                            他者の期待や「正解」の押し付けから解放され、<br />
                            深い静寂の中で研ぎ澄まされる直感に従い行動する力を身につけます。
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto"
                        >
                            <div className="flex items-center gap-3 text-sm text-japan-charcoal/70">
                                <Users size={18} className="text-japan-indigo" />
                                <span>累計受講者数: 500+</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-japan-charcoal/70">
                                <Clock size={18} className="text-japan-indigo" />
                                <span>無期限アクセス</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Course Grid */}
                <section className="w-full max-w-7xl mx-auto px-4 py-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-japan-indigo mb-4">
                            公開中のコース
                        </h2>
                        <p className="text-japan-charcoal/70 max-w-xl mx-auto">
                            自分のペースで学べる、人生を変化させるオンラインプログラム
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {courses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <Link
                                    href={`/courses/${course.slug}`}
                                    className="block h-full"
                                >
                                    <div className="washi-card rounded-3xl overflow-hidden h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                        {/* Thumbnail */}
                                        <div className="relative h-56 bg-gradient-to-br from-japan-indigo/20 to-japan-indigo/5 overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-5xl font-bold text-japan-indigo/30 mb-2">
                                                        {course.id === 'c1' ? '🧭' : course.id === 'c2' ? '🤖' : '📚'}
                                                    </div>
                                                    <h3 className="text-xl md:text-2xl font-bold text-japan-indigo">
                                                        {course.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Level Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-japan-indigo border border-japan-indigo/20 shadow-sm">
                                                    {course.levelLabel}
                                                </span>
                                            </div>

                                            {/* Duration Badge */}
                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-japan-vermilion text-white border border-japan-vermilion/20 shadow-sm">
                                                    {Math.floor(course.totalDuration / 60)}時間{course.totalDuration % 60 > 0 ? `${course.totalDuration % 60}分` : ''}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 md:p-8">
                                            <p className="text-sm text-japan-charcoal/80 mb-6 line-clamp-3 leading-relaxed">
                                                {course.description}
                                            </p>

                                            {/* Features */}
                                            <div className="space-y-2 mb-6">
                                                {course.features.slice(0, 4).map((feature, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-sm text-japan-charcoal">
                                                        <CheckCircle2 size={14} className="text-japan-indigo mt-1 shrink-0" />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                                {course.features.length > 4 && (
                                                    <div className="text-xs text-japan-charcoal/60 mt-2">
                                                        他{course.features.length - 4}項目の機能...
                                                    </div>
                                                )}
                                            </div>

                                            {/* Price & CTA */}
                                            <div className="flex items-center justify-between border-t border-japan-indigo/10 pt-4 mt-6">
                                                <div>
                                                    <div className="text-3xl font-bold text-japan-indigo">
                                                        ¥{course.price.toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-japan-charcoal/60 mt-1">
                                                        （税込）
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-japan-indigo font-bold text-sm group-hover:gap-3 transition-all">
                                                    詳細を見る
                                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full max-w-4xl mx-auto px-4 py-24 text-center pattern-asanoha opacity-30">
                    <div className="washi-card rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-japan-indigo mb-4">
                            コースに興味がありましたか？
                        </h2>
                        <p className="text-japan-charcoal/80 mb-8 max-w-xl mx-auto">
                            受講対象やコース内容について疑問がある方は、
                            まずは気軽にお問い合わせください。
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 bg-japan-indigo hover:bg-japan-indigo/90 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-lg"
                        >
                            お問い合わせフォームへ
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
