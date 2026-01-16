'use client';

import { getCourseBySlug } from '@/data/courses';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, CheckCircle, Lock } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { useState } from 'react';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function LearningPage({ params }: Props) {
    const { slug } = await params;
    const course = getCourseBySlug(slug);

    if (!course) {
        notFound();
    }

    // Mock State: In a real app, this would be Client Component access to URL params or Global State
    // For this mock, we just render the first lesson as active
    const activeLesson = course.modules[0].lessons[0];

    return (
        <div className="min-h-screen bg-black flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-80 border-r border-zinc-800 bg-zinc-900 flex flex-col h-screen overflow-hidden sticky top-0">
                <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
                    <Link href="/courses" className="text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <div className="text-xs text-teal-400 font-bold uppercase">Learning Dashboard</div>
                        <h1 className="text-white font-bold text-sm truncate w-48">{course.title}</h1>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {course.modules.map(module => (
                        <div key={module.id}>
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-2">
                                {module.title}
                            </h3>
                            <div className="space-y-1">
                                {module.lessons.map(lesson => (
                                    <button
                                        key={lesson.id}
                                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors ${lesson.id === activeLesson.id
                                                ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                                                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                                            }`}
                                    >
                                        {lesson.id === activeLesson.id ? (
                                            <PlayCircle size={16} />
                                        ) : (
                                            <CheckCircle size={16} className="text-zinc-700" />
                                        )}
                                        <span className="text-sm truncate">{lesson.title}</span>
                                        <span className="text-xs text-zinc-600 ml-auto">{lesson.duration}m</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-zinc-800">
                    <div className="text-xs text-zinc-500 mb-2">Progress: 10%</div>
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 w-[10%]" />
                    </div>
                </div>
            </aside>

            {/* Main Player Area */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                <div className="p-6 md:p-12 max-w-5xl w-full mx-auto">
                    <VideoPlayer title={activeLesson.title} />

                    <div className="mt-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {activeLesson.title}
                        </h1>
                        <div className="prose prose-invert max-w-none text-zinc-300">
                            <p>{activeLesson.content}</p>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-between">
                        <button className="text-zinc-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors">
                            <ArrowLeft size={16} /> Previous Lesson
                        </button>
                        <button className="bg-teal-500 hover:bg-teal-400 text-black font-semibold flex items-center gap-2 px-6 py-2 rounded-lg transition-colors">
                            Mark as Complete <CheckCircle size={16} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
