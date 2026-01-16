'use client';

import { motion } from 'framer-motion';
import { getCourses } from '@/data/courses';
import Header from '@/components/Header';
import Link from 'next/link';
import { Clock, BookOpen, Star, ArrowRight } from 'lucide-react';

export default function CoursesPage() {
    const courses = getCourses();

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-16 px-4">
                {/* Hero */}
                <section className="max-w-6xl mx-auto mb-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Online Courses
                        <span className="block text-xl md:text-2xl text-teal-400 mt-2 font-normal">
                            学びを、人生の変化に変える
                        </span>
                    </motion.h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        時間や場所にとらわれず、自分のペースで学べるオンラインプログラム。
                    </p>
                </section>

                {/* Course Grid */}
                <section className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-teal-500/30 group flex flex-col"
                        >
                            {/* Thumbnail Placeholder */}
                            <div className="h-48 bg-zinc-800 relative group-hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="px-2 py-1 bg-teal-500/90 text-black text-xs font-bold rounded mb-2 inline-block">
                                        {course.level}
                                    </span>
                                    <h2 className="text-xl font-bold text-white leading-tight">
                                        {course.title}
                                    </h2>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <p className="text-zinc-400 text-sm mb-6 flex-1 line-clamp-3">
                                    {course.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-6">
                                    <div className="flex items-center gap-1">
                                        <BookOpen size={14} className="text-teal-400" />
                                        <span>{course.modules.length} Modules</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} className="text-teal-400" />
                                        <span>Self-Paced</span>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                                    <div className="text-white font-bold text-lg">
                                        ¥{course.price.toLocaleString()}
                                    </div>
                                    <Link
                                        href={`/courses/${course.slug}`}
                                        className="flex items-center text-teal-400 text-sm font-bold hover:gap-2 transition-all"
                                    >
                                        詳細を見る <ArrowRight size={16} className="ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </section>
            </main>
        </>
    );
}
