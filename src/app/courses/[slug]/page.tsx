'use client';

import { getCourseBySlug } from '@/data/courses';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, PlayCircle, Lock, Clock, BookOpen, Users, Star, Target } from 'lucide-react';

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
            <main className="flex min-h-screen flex-col pt-20 text-japan-charcoal">
                {/* Header */}
                <div className="w-full bg-japan-indigo/5 pattern-seigaiha opacity-30 py-8 md:py-12">
                    <div className="max-w-4xl mx-auto px-4">
                        <Link href="/courses" className="inline-flex items-center text-japan-charcoal/70 hover:text-japan-indigo mb-4 transition-colors">
                            <ArrowLeft size={16} className="mr-2" /> コース一覧に戻る
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="flex-1">
                                <span className="block text-xs font-bold uppercase tracking-wider text-japan-indigo/70 mb-2">
                                    Online Course
                                </span>
                                <h1 className="text-3xl md:text-4xl font-bold text-japan-indigo leading-tight mb-3">
                                    {course.title}
                                </h1>
                                <p className="text-lg text-japan-charcoal/90 leading-relaxed">
                                    {course.subtitle}
                                </p>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-japan-charcoal/70">
                                <div className="flex items-center gap-2">
                                    <BookOpen size={18} className="text-japan-indigo" />
                                    <span>{course.modules.length} Modules</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-japan-indigo" />
                                    <span>{Math.floor(course.totalDuration / 60)}時間{course.totalDuration % 60 > 0 ? `${course.totalDuration % 60}分` : ''}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Details & Curriculum */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Course Overview */}
                        <section className="washi-card rounded-3xl p-6 md:p-8 border border-japan-indigo/10">
                            <h2 className="text-xl md:text-2xl font-bold text-japan-indigo mb-6 flex items-center gap-2">
                                <Target size={24} className="text-japan-vermilion" />
                                コース概要
                            </h2>
                            <p className="text-japan-charcoal leading-relaxed mb-8 whitespace-pre-line">
                                {course.description}
                            </p>

                            {/* Target Audience */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-japan-indigo mb-4 flex items-center gap-2">
                                    <Users size={20} className="text-japan-indigo" />
                                    受講対象
                                </h3>
                                <ul className="space-y-2">
                                    {course.targetAudience.map((audience, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-japan-charcoal">
                                            <CheckCircle2 size={14} className="text-japan-vermilion mt-1 shrink-0" />
                                            <span>{audience}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Learning Goals */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-japan-indigo mb-4 flex items-center gap-2">
                                    <Star size={20} className="text-japan-indigo" />
                                    学習目標
                                </h3>
                                <ul className="space-y-2">
                                    {course.learningGoals.map((goal, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-japan-charcoal">
                                            <CheckCircle2 size={14} className="text-japan-indigo mt-1 shrink-0" />
                                            <span>{goal}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Expected Outcomes */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-japan-indigo mb-4">
                                    期待できる結果
                                </h3>
                                <ul className="space-y-2">
                                    {course.expectedOutcomes.map((outcome, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-japan-charcoal">
                                            <CheckCircle2 size={14} className="text-japan-gold mt-1 shrink-0" />
                                            <span>{outcome}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Instructor */}
                            <div className="border-t border-japan-indigo/10 pt-6">
                                <h3 className="text-lg font-bold text-japan-indigo mb-4">
                                    講師紹介
                                </h3>
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-japan-indigo/20 flex items-center justify-center text-2xl text-japan-indigo/50">
                                        👨‍💼
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-base font-bold text-japan-indigo mb-1">
                                            {course.instructor.name}
                                        </div>
                                        <div className="text-sm text-japan-charcoal/70 mb-2">
                                            {course.instructor.title}
                                        </div>
                                        <p className="text-sm text-japan-charcoal leading-relaxed">
                                            {course.instructor.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Curriculum */}
                        <section className="washi-card rounded-3xl p-6 md:p-8 border border-japan-indigo/10">
                            <h2 className="text-xl md:text-2xl font-bold text-japan-indigo mb-6 flex items-center gap-2">
                                <BookOpen size={24} className="text-japan-indigo" />
                                カリキュラム
                            </h2>
                            <div className="space-y-6">
                                {course.modules.map((module, i) => (
                                    <div key={module.id} className="border border-japan-indigo/10 rounded-2xl overflow-hidden">
                                        <div className="bg-japan-indigo/5 p-4 border-b border-japan-indigo/10 flex justify-between items-center">
                                            <span className="font-bold text-japan-indigo text-sm md:text-base">
                                                {module.title}
                                            </span>
                                            <span className="text-xs text-japan-charcoal/60">
                                                {module.lessons.length} Lessons
                                            </span>
                                        </div>
                                        <div>
                                            {module.lessons.map((lesson) => (
                                                <div key={lesson.id} className="p-4 flex items-start gap-3 hover:bg-japan-indigo/5 transition-colors border-b border-japan-indigo/5 last:border-0">
                                                    {lesson.isFree ? (
                                                        <PlayCircle size={18} className="text-japan-vermilion shrink-0 mt-1" />
                                                    ) : (
                                                        <Lock size={18} className="text-japan-charcoal/50 shrink-0 mt-1" />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm md:text-base text-japan-charcoal font-medium mb-1">
                                                            {lesson.title}
                                                        </div>
                                                        <div className="flex items-center gap-3 text-xs text-japan-charcoal/60">
                                                            <span className="flex items-center gap-1">
                                                                <Clock size={12} />
                                                                {lesson.duration}分
                                                            </span>
                                                            {lesson.isFree && (
                                                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-japan-vermilion text-white">
                                                                    Preview
                                                                </span>
                                                            )}
                                                        </div>
                                                        {lesson.description && (
                                                            <p className="text-xs text-japan-charcoal/70 mt-1">
                                                                {lesson.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FAQ */}
                        <section className="washi-card rounded-3xl p-6 md:p-8 border border-japan-indigo/10">
                            <h2 className="text-xl md:text-2xl font-bold text-japan-indigo mb-6">
                                よくある質問
                            </h2>
                            <div className="space-y-6">
                                {course.faqs.map((faq, i) => (
                                    <div key={i} className="border-b border-japan-indigo/10 last:border-0 pb-4 last:pb-0">
                                        <h3 className="text-base font-bold text-japan-indigo mb-3">
                                            {faq.question}
                                        </h3>
                                        <p className="text-sm text-japan-charcoal leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sticky CTA */}
                    <div className="md:col-span-1 relative">
                        <div className="sticky top-28 space-y-4">
                            {/* Price Card */}
                            <div className="washi-card rounded-3xl p-6 border border-japan-indigo/20 text-center pattern-asanoha opacity-20">
                                <div className="mb-4">
                                    <span className="text-xs font-bold text-japan-charcoal/60 uppercase tracking-wider">
                                        Course Price
                                    </span>
                                </div>
                                <div className="text-4xl md:text-5xl font-bold text-japan-indigo mb-2">
                                    ¥{course.price.toLocaleString()}
                                </div>
                                <div className="text-sm text-japan-charcoal/60 mb-6">
                                    （税込）
                                </div>

                                <Link
                                    href="#"
                                    className="block w-full bg-japan-indigo hover:bg-japan-indigo/90 text-white font-bold py-4 rounded-xl mb-4 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                >
                                    今すぐ購入する
                                    <ArrowRight size={20} />
                                </Link>
                                <p className="text-xs text-japan-charcoal/60 mb-6">
                                    ※ 購入後にSupabaseアカウント連携が必要です。
                                    <br />
                                    詳細は購入フローをご覧ください。
                                </p>

                                <ul className="text-left space-y-3 border-t border-japan-indigo/10 pt-4">
                                    {course.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-japan-charcoal">
                                            <CheckCircle2 size={16} className="text-japan-indigo shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Requirements Card */}
                            <div className="washi-card rounded-3xl p-6 border border-japan-indigo/10">
                                <h3 className="text-base font-bold text-japan-indigo mb-4 flex items-center gap-2">
                                    <Target size={18} className="text-japan-indigo" />
                                    必要なもの
                                </h3>
                                <ul className="space-y-2 text-sm text-japan-charcoal">
                                    {course.requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-japan-indigo">•</span>
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
