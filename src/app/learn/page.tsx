'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Clock, CheckCircle, Lock } from 'lucide-react';
import type { UserEnrolledCourse } from '@/types/course';
import { cn } from '@/lib/utils';

export default function LearnPage() {
  const [courses, setCourses] = useState<UserEnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        );

        // Get current user
        const { data: userData } = await supabase.auth.getUser();

        if (!userData?.user) {
          setError('Please log in to view your courses');
          setLoading(false);
          return;
        }

        // Fetch user's enrolled courses with progress
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select(`
            *,
            courses (
              id,
              title,
              slug,
              description,
              thumbnail_url,
              total_lessons,
              total_duration
            )
          `)
          .eq('user_id', userData.user.id)
          .eq('is_active', true)
          .order('enrolled_at', { ascending: false });

        if (enrollmentsError) throw enrollmentsError;

        // Transform data to match UserEnrolledCourse type
        const userCourses: UserEnrolledCourse[] = (enrollments || []).map((enrollment: any) => ({
          enrollment_id: enrollment.id,
          user_id: userData.user.id,
          course_id: enrollment.course_id,
          course_slug: enrollment.courses?.slug || '',
          course_title: enrollment.courses?.title || 'Unknown Course',
          course_description: enrollment.courses?.description || null,
          course_thumbnail_url: enrollment.courses?.thumbnail_url || null,
          course_total_lessons: enrollment.courses?.total_lessons || 0,
          progress_percentage: enrollment.progress_percentage || 0,
          enrolled_at: enrollment.enrolled_at,
          expires_at: enrollment.expires_at || null,
          is_active: enrollment.is_active,
          completed_at: enrollment.completed_at || null,
        }));

        setCourses(userCourses);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError('Failed to load courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  if (courses.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <BookOpen className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">No Courses Yet</h2>
          <p className="text-zinc-600 mb-6">
            You haven't enrolled in any courses yet. Browse available courses and start your learning journey!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">My Courses</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course.course_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <Link
                href={`/learn/${course.course_slug}`}
                className="block bg-white rounded-xl shadow-lg border border-zinc-200 overflow-hidden hover:shadow-xl hover:border-teal-300 transition-all"
              >
                {/* Course Thumbnail */}
                <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                  {course.course_thumbnail_url ? (
                    <img
                      src={course.course_thumbnail_url}
                      alt={course.course_title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                      <BookOpen className="w-16 h-16 text-zinc-600" />
                    </div>
                  )}

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-6 h-6 text-zinc-900 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5">
                  <h3 className="font-bold text-zinc-900 mb-2 line-clamp-2">
                    {course.course_title}
                  </h3>
                  {course.course_description && (
                    <p className="text-sm text-zinc-600 line-clamp-3 mb-4">
                      {course.course_description}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.course_total_lessons} lessons</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-zinc-700">
                        {course.progress_percentage >= 100 ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </span>
                        ) : (
                          `${course.progress_percentage.toFixed(0)}% complete`
                        )}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {course.enrolled_at ? new Date(course.enrolled_at).toLocaleDateString() : ''}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-500",
                          course.progress_percentage >= 100
                            ? "bg-green-500"
                            : "bg-teal-500"
                        )}
                        style={{ width: `${course.progress_percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Continue Button */}
                  <Link
                    href={`/learn/${course.course_slug}`}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all",
                      course.progress_percentage >= 100
                        ? "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                        : "bg-teal-600 text-white hover:bg-teal-700"
                    )}
                  >
                    {course.progress_percentage >= 100 ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Review Course</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        <span>Continue Learning</span>
                      </>
                    )}
                  </Link>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
