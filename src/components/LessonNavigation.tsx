'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, PlayCircle, CheckCircle2, Lock } from 'lucide-react';
import type { Module, Lesson } from '@/types/course';
import { cn } from '@/lib/utils';

interface LessonNavigationProps {
  modules: Module[];
  lessons: Lesson[];
  currentLessonId: string;
  completedLessons: string[];
  onLessonSelect: (lessonId: string) => void;
  courseSlug: string;
  progress: number;
}

export default function LessonNavigation({
  modules,
  lessons,
  currentLessonId,
  completedLessons,
  onLessonSelect,
  courseSlug,
  progress,
}: LessonNavigationProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  // Group lessons by module
  const lessonsByModule = modules.reduce((acc, module) => {
    acc[module.id] = lessons.filter(l => l.module_id === module.id);
    return acc;
  }, {} as Record<string, Lesson[]>);

  // Find current lesson's module
  const currentLesson = lessons.find(l => l.id === currentLessonId);
  const currentModuleId = currentLesson?.module_id;

  return (
    <aside className="hidden lg:block w-80 bg-white border-l border-zinc-200 h-[calc(100vh-80px)] overflow-y-auto">
      {/* Progress Bar */}
      <div className="p-4 border-b border-zinc-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-zinc-600">Course Progress</span>
          <span className="text-sm font-bold text-teal-600">{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-zinc-200 rounded-full h-2">
          <div
            className="bg-teal-500 rounded-full h-2 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Modules List */}
      <div className="py-4">
        {modules.map((module, moduleIndex) => {
          const moduleLessons = lessonsByModule[module.id] || [];
          const isExpanded = expandedModules.has(module.id);
          const isCurrentModule = currentModuleId === module.id;
          const completedInModule = moduleLessons.filter(l => completedLessons.includes(l.id)).length;
          const totalInModule = moduleLessons.length;
          const moduleProgress = totalInModule > 0 ? (completedInModule / totalInModule) * 100 : 0;

          return (
            <div key={module.id} className="mb-2">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-lg border transition-all",
                  isCurrentModule ? "border-teal-500 bg-teal-50" : "border-zinc-200 hover:border-zinc-300"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {isCurrentModule && <PlayCircle className="w-5 h-5 text-teal-600" />}
                    <span className="font-semibold text-zinc-900">{module.title}</span>
                  </div>
                  <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded-full">
                    {moduleLessons.length} lessons
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-zinc-400 transition-transform",
                    isExpanded ? "rotate-180" : ""
                  )}
                />
              </button>

              {/* Module Progress */}
              <div className="px-4 py-2">
                <div className="w-full bg-zinc-100 rounded-full h-1.5 mb-2">
                  <div
                    className="bg-teal-400 rounded-full h-1.5 transition-all duration-500"
                    style={{ width: `${moduleProgress}%` }}
                  />
                </div>
              </div>

              {/* Lessons List */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-1">
                  {moduleLessons.map((lesson) => {
                    const isCurrentLesson = lesson.id === currentLessonId;
                    const isCompleted = completedLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onLessonSelect(lesson.id)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3",
                          isCurrentLesson
                            ? "border-teal-500 bg-teal-50"
                            : isCompleted
                            ? "border-green-300 bg-green-50"
                            : "border-zinc-200 hover:border-zinc-300"
                        )}
                      >
                        {/* Lesson Icon */}
                        <div className="w-6 h-6 flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-full h-full text-green-600" />
                          ) : isCurrentLesson ? (
                            <PlayCircle className="w-full h-full text-teal-600" />
                          ) : (
                            <div className="w-full h-full border-2 border-zinc-300 rounded-full flex items-center justify-center">
                              <span className="text-xs text-zinc-400">{moduleIndex + 1}</span>
                            </div>
                          )}
                        </div>

                        {/* Lesson Title */}
                        <div className="flex-1">
                          <p className="font-medium text-sm text-zinc-900">{lesson.title}</p>
                          {lesson.video_duration && (
                            <p className="text-xs text-zinc-500">
                              {Math.floor(lesson.video_duration / 60)} min
                            </p>
                          )}
                        </div>

                        {/* Lock icon for non-free lessons */}
                        {!lesson.is_free && !isCompleted && (
                          <Lock className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-200">
        <Link
          href={`/learn/${courseSlug}`}
          className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          <span>Back to Course List</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
}
