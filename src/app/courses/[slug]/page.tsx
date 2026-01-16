'use client';

import { getCourseBySlug } from '@/data/courses';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, PlayCircle, Lock } from 'lucide-react';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function CourseDetailPage({ params }: Props) {
    const { slug } = await params;
    const course = getCourseBySlug(slug);

    if (!course) {
        notFound();
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-16">
                {/* Header */}
                <div className="max-w-4xl mx-auto px-4 mb-12">
                    <Link href="/courses" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> コース一覧に戻る
                    </Link>
                    <span className="block text-teal-400 font-bold tracking-wider mb-4 uppercase text-sm">Online Course</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {course.title}
                    </h1>
                    <p className="text-xl text-zinc-300 leading-relaxed font-light">
                        {course.subtitle}
                    </p>
                </div>

                {/* Content & Sidebar Layout */}
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="md:col-span-2">
                        {/* Description */}
                        <section className="mb-12 glass-panel p-8 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-6">コースについて</h2>
                            <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                                {course.description}
                            </p>
                        </section>

                        {/* Curriculum */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">カリキュラム</h2>
                            <div className="space-y-4">
                                {course.modules.map((module, i) => (
                                    <div key={module.id} className="glass-panel border border-white/5 rounded-xl overflow-hidden">
                                        <div className="bg-zinc-900/50 p-4 border-b border-white/5 font-bold text-white flex justify-between items-center">
                                            <span>{module.title}</span>
                                            <span className="text-xs text-zinc-500">{module.lessons.length} Lessons</span>
                                        </div>
                                        <div>
                                            {module.lessons.map((lesson) => (
                                                <div key={lesson.id} className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                                    {lesson.isFree ? (
                                                        <PlayCircle size={18} className="text-teal-400 shrink-0" />
                                                    ) : (
                                                        <Lock size={18} className="text-zinc-600 shrink-0" />
                                                    )}
                                                    <div className="flex-1">
                                                        <div className="text-zinc-200 text-sm font-medium">{lesson.title}</div>
                                                        <div className="text-xs text-zinc-500">{lesson.duration} min</div>
                                                    </div>
                                                    {lesson.isFree && (
                                                        <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded">Preview</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar (CTA) */}
                    <div className="relative">
                        <div className="sticky top-28 glass-panel p-6 rounded-2xl border border-teal-500/20 text-center">
                            <div className="text-3xl font-bold text-white mb-2">
                                ¥{course.price.toLocaleString()}
                            </div>
                            <div className="text-zinc-400 text-sm mb-6">（税込）</div>

                            <Link
                                href={`/learn/${course.slug}`} // Mock: Direct link to dashboard
                                className="block w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-4 rounded-xl mb-4 transition-all"
                            >
                                受講を開始する
                            </Link>
                            <p className="text-xs text-zinc-500 mb-6">
                                ※ これはモックアップです。実際の決済は発生しません。
                            </p>

                            <ul className="text-left space-y-3 border-t border-white/10 pt-6">
                                {course.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                                        <CheckCircle2 size={16} className="text-teal-500 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
