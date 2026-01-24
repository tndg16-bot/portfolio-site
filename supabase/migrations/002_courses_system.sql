-- Online Course System Schema
-- This schema enables:
-- 1. Course management with modules and lessons
-- 2. User enrollment tracking
-- 3. Lesson progress tracking
-- 4. Video content management (Cloudflare Stream integration)

-- ============================================================================
-- COURSES TABLE
-- Manages course information and pricing
-- ============================================================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL DEFAULT 0, -- Price in cents (e.g., 1000 = $10.00)
  currency VARCHAR(3) DEFAULT 'USD',
  stripe_product_id VARCHAR(255) UNIQUE,
  stripe_price_id VARCHAR(255) UNIQUE,
  thumbnail_url TEXT,
  video_id VARCHAR(255), -- Cloudflare Stream video ID for course preview
  instructor_name VARCHAR(255),
  instructor_title VARCHAR(255),
  instructor_bio TEXT,
  level VARCHAR(50) DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  category VARCHAR(100),
  tags JSONB DEFAULT '[]'::JSONB,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  total_duration INTEGER DEFAULT 0, -- Total duration in seconds
  total_lessons INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::JSONB
);

-- Indexes for courses
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_is_published ON courses(is_published);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_stripe_product_id ON courses(stripe_product_id);

-- RLS for courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read published courses
CREATE POLICY "Public read access to published courses" ON courses
  FOR SELECT USING (is_published = TRUE);

-- Policy: Service role can manage courses
CREATE POLICY "Service role can manage courses" ON courses
  FOR ALL TO service_role;

-- ============================================================================
-- MODULES TABLE
-- Manages course modules (sections)
-- ============================================================================
CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(course_id, order_index)
);

-- Indexes for modules
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON modules(course_id);
CREATE INDEX IF NOT EXISTS idx_modules_order_index ON modules(order_index);

-- RLS for modules
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read modules of published courses
CREATE POLICY "Public read access to modules" ON modules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = modules.course_id
      AND courses.is_published = TRUE
    )
  );

-- Policy: Service role can manage modules
CREATE POLICY "Service role can manage modules" ON modules
  FOR ALL TO service_role;

-- ============================================================================
-- LESSONS TABLE
-- Manages individual lessons within modules
-- ============================================================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT, -- Lesson content (markdown or HTML)
  video_id VARCHAR(255), -- Cloudflare Stream video ID
  video_duration INTEGER, -- Duration in seconds
  order_index INTEGER NOT NULL,
  is_free BOOLEAN DEFAULT FALSE, -- Whether this lesson is free to preview
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::JSONB,
  UNIQUE(module_id, slug),
  UNIQUE(module_id, order_index)
);

-- Indexes for lessons
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_slug ON lessons(slug);
CREATE INDEX IF NOT EXISTS idx_lessons_order_index ON lessons(order_index);
CREATE INDEX IF NOT EXISTS idx_lessons_is_free ON lessons(is_free);

-- RLS for lessons
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read free lessons or lessons of published courses
CREATE POLICY "Public read access to free lessons" ON lessons
  FOR SELECT USING (is_free = TRUE);

CREATE POLICY "Public read access to enrolled lessons" ON lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM modules
      JOIN courses ON courses.id = modules.course_id
      JOIN enrollments ON enrollments.course_id = courses.id
      WHERE modules.id = lessons.module_id
      AND courses.is_published = TRUE
      AND enrollments.user_id = auth.uid()
    )
  );

-- Policy: Service role can manage lessons
CREATE POLICY "Service role can manage lessons" ON lessons
  FOR ALL TO service_role;

-- ============================================================================
-- ENROLLMENTS TABLE
-- Tracks user course enrollments
-- ============================================================================
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  stripe_checkout_session_id VARCHAR(255) UNIQUE,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- For time-limited access
  is_active BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::JSONB,
  UNIQUE(user_id, course_id)
);

-- Indexes for enrollments
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_stripe_checkout_session_id ON enrollments(stripe_checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_is_active ON enrollments(is_active);

-- RLS for enrollments
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own enrollments
CREATE POLICY "Users read own enrollments" ON enrollments
  FOR SELECT USING (user_id = auth.uid());

-- Policy: Service role can manage enrollments
CREATE POLICY "Service role can manage enrollments" ON enrollments
  FOR ALL TO service_role;

-- ============================================================================
-- USER_PROGRESS TABLE
-- Tracks user's lesson progress
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT FALSE,
  last_watched_position INTEGER DEFAULT 0, -- Position in video (seconds)
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::JSONB,
  UNIQUE(user_id, lesson_id)
);

-- Indexes for user_progress
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_is_completed ON user_progress(is_completed);

-- RLS for user_progress
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read/write their own progress
CREATE POLICY "Users read own progress" ON user_progress
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users update own progress" ON user_progress
  FOR UPDATE USING (user_id = auth.uid());

-- Policy: Service role can manage user progress
CREATE POLICY "Service role can manage user progress" ON user_progress
  FOR ALL TO service_role;

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- Update course total lessons and duration when lessons change
-- ============================================================================
CREATE OR REPLACE FUNCTION update_course_stats()
RETURNS TRIGGER AS $$
DECLARE
  total_lessons_count INTEGER;
  total_duration_sum INTEGER;
BEGIN
  -- Count total lessons for the course
  SELECT COUNT(*)
  INTO total_lessons_count
  FROM lessons
  JOIN modules ON modules.id = lessons.module_id
  WHERE modules.course_id = NEW.course_id;

  -- Sum total duration for the course
  SELECT COALESCE(SUM(video_duration), 0)
  INTO total_duration_sum
  FROM lessons
  JOIN modules ON modules.id = lessons.module_id
  WHERE modules.course_id = NEW.course_id;

  -- Update course stats
  UPDATE courses
  SET
    total_lessons = total_lessons_count,
    total_duration = total_duration_sum,
    updated_at = NOW()
  WHERE id = NEW.course_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new lessons
CREATE TRIGGER trigger_update_course_stats_on_lesson_insert
  AFTER INSERT ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_course_stats();

-- Create trigger for lesson updates
CREATE TRIGGER trigger_update_course_stats_on_lesson_update
  AFTER UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_course_stats();

-- Create trigger for lesson deletes
CREATE TRIGGER trigger_update_course_stats_on_lesson_delete
  AFTER DELETE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_course_stats();

-- Helper function: Check if user is enrolled in a course
CREATE OR REPLACE FUNCTION is_enrolled(course_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM enrollments
    WHERE enrollments.course_id = is_enrolled.course_id
    AND enrollments.user_id = auth.uid()
    AND enrollments.is_active = TRUE
    AND (enrollments.expires_at IS NULL OR enrollments.expires_at > NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Get course progress percentage
CREATE OR REPLACE FUNCTION get_course_progress(course_id UUID)
RETURNS NUMERIC AS $$
DECLARE
  total_lessons_count INTEGER;
  completed_lessons_count INTEGER;
BEGIN
  -- Count total lessons for the course
  SELECT COUNT(*)
  INTO total_lessons_count
  FROM lessons
  JOIN modules ON modules.id = lessons.module_id
  WHERE modules.course_id = get_course_progress.course_id;

  -- Count completed lessons for the user
  SELECT COUNT(*)
  INTO completed_lessons_count
  FROM user_progress
  JOIN lessons ON lessons.id = user_progress.lesson_id
  JOIN modules ON modules.id = lessons.module_id
  WHERE modules.course_id = get_course_progress.course_id
  AND user_progress.user_id = auth.uid()
  AND user_progress.is_completed = TRUE;

  -- Calculate progress
  IF total_lessons_count = 0 THEN
    RETURN 0;
  END IF;

  RETURN (completed_lessons_count::NUMERIC / total_lessons_count::NUMERIC) * 100;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- USEFUL VIEWS
-- ============================================================================

-- View: User's enrolled courses with progress
CREATE OR REPLACE VIEW user_enrolled_courses AS
SELECT
  e.id AS enrollment_id,
  e.user_id,
  e.course_id,
  c.slug AS course_slug,
  c.title AS course_title,
  c.description AS course_description,
  c.thumbnail_url,
  c.total_lessons,
  get_course_progress(c.id) AS progress_percentage,
  e.enrolled_at,
  e.expires_at,
  e.is_active,
  e.completed_at
FROM enrollments e
JOIN courses c ON c.id = e.course_id
WHERE e.is_active = TRUE;

-- View: Course details with module and lesson counts
CREATE OR REPLACE VIEW course_details AS
SELECT
  c.id,
  c.slug,
  c.title,
  c.description,
  c.price,
  c.currency,
  c.thumbnail_url,
  c.video_id AS preview_video_id,
  c.instructor_name,
  c.instructor_title,
  c.level,
  c.category,
  c.tags,
  c.is_published,
  c.published_at,
  c.total_lessons,
  c.total_duration,
  COUNT(DISTINCT m.id) AS total_modules,
  COUNT(CASE WHEN l.is_free = TRUE THEN 1 END) AS free_lessons_count
FROM courses c
LEFT JOIN modules m ON m.course_id = c.id
LEFT JOIN lessons l ON l.module_id = m.id
GROUP BY c.id;

-- View: Lesson with enrollment check
CREATE OR REPLACE VIEW lesson_with_enrollment AS
SELECT
  l.id,
  l.slug,
  l.title,
  l.description,
  l.content,
  l.video_id,
  l.video_duration,
  l.order_index,
  l.is_free,
  l.module_id,
  m.course_id,
  m.title AS module_title,
  m.order_index AS module_order,
  is_enrolled(m.course_id) AS is_enrolled,
  COALESCE(up.is_completed, FALSE) AS is_completed,
  COALESCE(up.last_watched_position, 0) AS last_watched_position
FROM lessons l
JOIN modules m ON m.id = l.module_id
LEFT JOIN user_progress up ON up.lesson_id = l.id AND up.user_id = auth.uid();

-- ============================================================================
-- COMMENTS
-- This schema supports a complete online course system with:
-- 1. Course management with pricing and Stripe integration
-- 2. Modular lesson structure
-- 3. User enrollment tracking
-- 4. Lesson progress tracking with video position
-- 5. Video content integration (Cloudflare Stream)
-- 6. Row Level Security for secure access control
-- 7. Helper functions for enrollment checks and progress calculation
-- 8. Useful views for course details and user progress
-- 9. Automatic course statistics updates
-- ============================================================================
