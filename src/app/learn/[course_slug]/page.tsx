'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Course, Module, Lesson, UserEnrolledCourse } from '@/types/course';
import VideoPlayer from '@/components/VideoPlayer';
import LessonNavigation from '@/components/LessonNavigation';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function LearnCoursePage({ params }: { params: { course_slug: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonId, setCurrentLessonId] = useState<string>('');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        );

        // Fetch course details
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', params.course_slug)
          .eq('is_published', true)
          .single();

        if (courseError || !courseData) {
          setError('Course not found');
          setLoading(false);
          return;
        }

        setCourse(courseData);

        // Fetch modules
        const { data: modulesData } = await supabase
          .from('modules')
          .select('*')
          .eq('course_id', courseData.id)
          .order('order_index', { ascending: true });

        if (modulesData) {
          setModules(modulesData);

          // Fetch lessons
          const moduleIds = modulesData.map(m => m.id);
          const { data: lessonsData } = await supabase
            .from('lessons')
            .select('*')
            .in('module_id', moduleIds)
            .order('order_index', { ascending: true });

          setLessons(lessonsData || []);

          // Fetch user progress
          const { data: userData } = await supabase.auth.getUser();
          if (userData?.user) {
            const { data: progressData } = await supabase
              .from('user_progress')
              .select('lesson_id, is_completed, last_watched_position')
              .eq('user_id', userData.user.id);

            if (progressData) {
              const completed = new Set(progressData.filter(p => p.is_completed).map(p => p.lesson_id));
              setCompletedLessons(completed);

              // Calculate overall progress
              const totalLessons = (lessonsData || []).length;
              const progress = (completed.size / totalLessons) * 100;
              setProgress(progress);
            }
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch course data:', err);
        setError('Failed to load course');
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [params.course_slug]);

  // Handle lesson selection
  const handleLessonSelect = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle progress update
  const handleProgressUpdate = async (position: number) => {
    // Auto-save progress to Supabase
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );

      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        await supabase
          .from('user_progress')
          .upsert({
            user_id: userData.user.id,
            lesson_id: currentLessonId,
            last_watched_position: position,
          });
      }
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  };

  // Handle lesson completion
  const handleLessonComplete = async () => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );

      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        await supabase
          .from('user_progress')
          .upsert({
            user_id: userData.user.id,
            lesson_id: currentLessonId,
            is_completed: true,
            completed_at: new Date().toISOString(),
          });

        setCompletedLessons(prev => new Set([...prev, currentLessonId]));

        // Recalculate progress
        const totalLessons = lessons.length;
        const newCompleted = new Set([...completedLessons, currentLessonId]);
        const newProgress = (newCompleted.size / totalLessons) * 100;
        setProgress(newProgress);
      }
    } catch (err) {
      console.error('Failed to mark lesson complete:', err);
    }
  };

  // Find current lesson
  const currentLesson = lessons.find(l => l.id === currentLessonId);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-zinc-500">Loading course...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">Error</h2>
          <p className="text-zinc-600">{error || 'Course not found'}</p>
          <Link href="/learn" className="text-teal-600 hover:underline">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Main Content with Video Player */}
      <main className="flex-1 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Course Header */}
          <div className="mb-6">
            <Link href="/learn" className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to My Courses</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-zinc-900 mb-2">{course.title}</h1>
          {course.description && (
            <p className="text-zinc-600 mb-6">{course.description}</p>
          )}
        </div>

        {/* Video Player and Navigation */}
        <div className="lg:grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Video Player Section */}
          <div className="space-y-6">
            {currentLesson && currentLesson.video_id && (
              <VideoPlayer
                videoId={currentLesson.video_id}
                lessonId={currentLesson.id}
                onProgressUpdate={handleProgressUpdate}
                onComplete={handleLessonComplete}
              />
            )}

            {/* Current Lesson Info */}
            {currentLesson && (
              <div className="bg-white rounded-xl shadow border border-zinc-200 p-6">
                <h2 className="text-xl font-bold text-zinc-900 mb-3">
                  {currentLesson.title}
                </h2>
                {currentLesson.content && (
                  <div className="prose max-w-none text-zinc-700">
                    {currentLesson.content}
                  </div>
                )}
              </div>
            )}

            {/* Course Info */}
            {course && (
              <div className="bg-zinc-50 rounded-xl p-6">
                <h3 className="font-semibold text-zinc-900 mb-3">Course Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Instructor:</span>
                    <span className="font-medium text-zinc-900">{course.instructor_name || 'Takahiro Motoyama'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Level:</span>
                    <span className="font-medium text-zinc-900 capitalize">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Total Lessons:</span>
                    <span className="font-medium text-zinc-900">{course.total_lessons}</span>
                  </div>
                  {course.category && (
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Category:</span>
                      <span className="font-medium text-zinc-900">{course.category}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Sidebar Navigation */}
      <LessonNavigation
        modules={modules}
        lessons={lessons}
        currentLessonId={currentLessonId}
        completedLessons={Array.from(completedLessons)}
        onLessonSelect={handleLessonSelect}
        courseSlug={params.course_slug}
        progress={progress}
      />
    </div>
  );
}
