-- Row Level Security (RLS) Policies
-- Run this in Supabase SQL Editor after schema.sql

-- Enable RLS on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Courses: Everyone can read published courses
CREATE POLICY "Everyone can view published courses"
  ON courses
  FOR SELECT
  USING (status = 'published');

-- Enrollments: Users can read their own enrollments
CREATE POLICY "Users can view own enrollments"
  ON enrollments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Enrollments: Users can create their own enrollments
CREATE POLICY "Users can create own enrollments"
  ON enrollments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Enrollments: Users can update their own enrollments
CREATE POLICY "Users can update own enrollments"
  ON enrollments
  FOR UPDATE
  USING (auth.uid() = user_id);

-- User Progress: Users can read their own progress
CREATE POLICY "Users can view own progress"
  ON user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- User Progress: Users can create their own progress
CREATE POLICY "Users can create own progress"
  ON user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User Progress: Users can update their own progress
CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Modules: Users enrolled in a course can view modules
CREATE POLICY "Enrolled users can view modules"
  ON modules
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.course_id = modules.course_id
      AND enrollments.user_id = auth.uid()
    )
  );

-- Lessons: Users enrolled in a course can view lessons
CREATE POLICY "Enrolled users can view lessons"
  ON lessons
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      JOIN modules ON enrollments.course_id = modules.course_id
      WHERE modules.id = lessons.module_id
      AND enrollments.user_id = auth.uid()
    )
  );

-- Storage: Users can upload their own files (if needed)
-- Add storage policies here if you implement file uploads

-- Function to check if user is enrolled
CREATE OR REPLACE FUNCTION is_enrolled(course_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM enrollments
    WHERE enrollments.course_id = $1
    AND enrollments.user_id = auth.uid()
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Function to get user progress
CREATE OR REPLACE FUNCTION get_course_progress(course_id UUID)
RETURNS TABLE (
  total_lessons INTEGER,
  completed_lessons INTEGER,
  progress_percentage INTEGER
) AS $$
  SELECT
    COUNT(*) as total_lessons,
    COUNT(*) FILTER (WHERE up.completed = TRUE) as completed_lessons,
    ROUND(
      100.0 * COUNT(*) FILTER (WHERE up.completed = TRUE) / NULLIF(COUNT(*), 0),
      0
    ) as progress_percentage
  FROM lessons l
  JOIN modules m ON l.module_id = m.id
  JOIN enrollments e ON e.course_id = m.course_id
  LEFT JOIN user_progress up ON up.lesson_id = l.id AND up.user_id = auth.uid()
  WHERE e.course_id = $1 AND e.user_id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER;

-- Comment on policies
COMMENT ON POLICY "Everyone can view published courses" ON courses IS '誰でも公開中のコースを閲覧可能';
COMMENT ON POLICY "Users can view own enrollments" ON enrollments IS 'ユーザーは自分の受講情報のみ閲覧可能';
COMMENT ON POLICY "Users can create own enrollments" ON enrollments IS 'ユーザーは自分の受講情報のみ作成可能';
COMMENT ON POLICY "Users can update own enrollments" ON enrollments IS 'ユーザーは自分の受講情報のみ更新可能';
COMMENT ON POLICY "Users can view own progress" ON user_progress IS 'ユーザーは自分の進捗のみ閲覧可能';
COMMENT ON POLICY "Users can create own progress" ON user_progress IS 'ユーザーは自分の進捗のみ作成可能';
COMMENT ON POLICY "Users can update own progress" ON user_progress IS 'ユーザーは自分の進捗のみ更新可能';
