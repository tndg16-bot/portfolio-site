/**
 * Online Course System Types
 *
 * This file contains all TypeScript types for the online course system,
 * including Supabase database types, Stripe types, and frontend component types.
 */

// ============================================================================
// SUPABASE DATABASE TYPES
// Matches the schema in supabase/migrations/002_courses_system.sql
// ============================================================================

export interface Course {
  id: string;
  slug: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  stripe_product_id?: string;
  stripe_price_id?: string;
  thumbnail_url?: string;
  video_id?: string;
  instructor_name?: string;
  instructor_title?: string;
  instructor_bio?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  tags: string[];
  is_published: boolean;
  published_at?: string;
  total_duration: number;
  total_lessons: number;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  video_id?: string;
  video_duration?: number;
  order_index: number;
  is_free: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id?: string;
  course_id: string;
  stripe_checkout_session_id?: string;
  enrolled_at: string;
  expires_at?: string;
  is_active: boolean;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id?: string;
  lesson_id: string;
  is_completed: boolean;
  last_watched_position: number;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// STRIPE TYPES
// ============================================================================

export interface StripeCheckoutSession {
  session_id: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_email?: string;
  metadata?: {
    course_id: string;
    user_id?: string;
  };
}

// ============================================================================
// FRONTEND COMPONENT TYPES
// ============================================================================

export interface CourseListProps {
  courses: Course[];
  loading: boolean;
}

export interface CourseDetailProps {
  course: Course;
  lessons: Lesson[];
  modules: Module[];
  progress: number;
  loading: boolean;
}

export interface LessonNavigationProps {
  modules: Module[];
  lessons: Lesson[];
  currentLessonId: string;
  completedLessons: string[];
  onLessonSelect: (lessonId: string) => void;
}

export interface VideoPlayerProps {
  videoId: string;
  lessonId: string;
  onProgressUpdate: (position: number) => void;
  onComplete: () => void;
}

export interface CheckoutPageProps {
  course: Course;
  loading: boolean;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface CheckoutSessionRequest {
  course_slug: string;
}

export interface CheckoutSessionResponse {
  session_url: string;
  session_id: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: {
    object: StripeCheckoutSession;
  };
}

export interface SignedVideoUrlRequest {
  video_id: string;
}

export interface SignedVideoUrlResponse {
  signed_url: string;
  duration: number;
  thumbnail: string;
}

// ============================================================================
// VIEW TYPES (from Supabase views)
// ============================================================================

export interface UserEnrolledCourse {
  enrollment_id: string;
  user_id?: string;
  course_id: string;
  course_slug: string;
  course_title: string;
  course_description?: string;
  course_thumbnail_url?: string;
  course_total_lessons: number;
  progress_percentage: number;
  enrolled_at: string;
  expires_at?: string;
  is_active: boolean;
  completed_at?: string;
}

export interface LessonWithEnrollment {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  video_id?: string;
  video_duration?: number;
  order_index: number;
  is_free: boolean;
  module_id: string;
  course_id: string;
  module_title: string;
  module_order: number;
  is_enrolled: boolean;
  is_completed: boolean;
  last_watched_position: number;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface CourseFilter {
  category?: string;
  level?: CourseLevel;
  search?: string;
}
