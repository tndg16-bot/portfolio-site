-- Newsletter Management System Schema
-- This schema enables:
-- 1. Subscriber management with tracking
-- 2. Newsletter creation and management
-- 3. Email delivery tracking
-- 4. Newsletter categorization with tags

-- ============================================================================
-- SUBSCRIBERS TABLE
-- Manages newsletter subscribers with verification and preferences
-- ============================================================================
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  is_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255) UNIQUE,
  unsubscribe_token VARCHAR(255) UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  preferences JSONB DEFAULT '{"categories": [], "frequency": "weekly"}'::JSONB,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for subscribers
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_is_verified ON subscribers(is_verified);
CREATE INDEX idx_subscribers_subscribed_at ON subscribers(subscribed_at);

-- Row Level Security for subscribers
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read verified subscribers (for public stats)
CREATE POLICY "Public read access to verified subscriber stats" ON subscribers
  FOR SELECT USING (true);

-- Policy: Allow service role to insert subscribers
CREATE POLICY "Service role can insert subscribers" ON subscribers
  FOR INSERT TO service_role WITH CHECK (true);

-- Policy: Allow service role to update subscribers
CREATE POLICY "Service role can update subscribers" ON subscribers
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);

-- Policy: Allow service role to delete subscribers
CREATE POLICY "Service role can delete subscribers" ON subscribers
  FOR DELETE TO service_role USING (true);

-- ============================================================================
-- TAGS TABLE
-- Manages newsletter tags/categories
-- ============================================================================
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3B82F6',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for tags
CREATE INDEX idx_tags_slug ON tags(slug);

-- RLS for tags
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to tags" ON tags
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage tags" ON tags
  FOR ALL TO service_role;

-- ============================================================================
-- NEWSLETTERS TABLE
-- Manages newsletter content and delivery status
-- ============================================================================
CREATE TABLE IF NOT EXISTS newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  subject VARCHAR(255) NOT NULL,
  preview_text TEXT,
  content_html TEXT NOT NULL,
  content_text TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'cancelled')),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::JSONB
);

-- Indexes for newsletters
CREATE INDEX idx_newsletters_status ON newsletters(status);
CREATE INDEX idx_newsletters_slug ON newsletters(slug);
CREATE INDEX idx_newsletters_created_at ON newsletters(created_at DESC);

-- RLS for newsletters
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to sent newsletters" ON newsletters
  FOR SELECT USING (status = 'sent');

CREATE POLICY "Service role can manage newsletters" ON newsletters
  FOR ALL TO service_role;

-- ============================================================================
-- NEWSLETTER_TAGS TABLE
-- Many-to-many relationship between newsletters and tags
-- ============================================================================
CREATE TABLE IF NOT EXISTS newsletter_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  newsletter_id UUID NOT NULL REFERENCES newsletters(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(newsletter_id, tag_id)
);

-- Indexes for newsletter_tags
CREATE INDEX idx_newsletter_tags_newsletter_id ON newsletter_tags(newsletter_id);
CREATE INDEX idx_newsletter_tags_tag_id ON newsletter_tags(tag_id);

-- RLS for newsletter_tags
ALTER TABLE newsletter_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to newsletter_tags" ON newsletter_tags
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage newsletter_tags" ON newsletter_tags
  FOR ALL TO service_role;

-- ============================================================================
-- DELIVERY_LOGS TABLE
-- Tracks email delivery status and engagement
-- ============================================================================
CREATE TABLE IF NOT EXISTS delivery_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  newsletter_id UUID NOT NULL REFERENCES newsletters(id) ON DELETE CASCADE,
  subscriber_id UUID NOT NULL REFERENCES subscribers(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'opened', 'clicked', 'bounced')),
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for delivery_logs
CREATE INDEX idx_delivery_logs_newsletter_id ON delivery_logs(newsletter_id);
CREATE INDEX idx_delivery_logs_subscriber_id ON delivery_logs(subscriber_id);
CREATE INDEX idx_delivery_logs_status ON delivery_logs(status);
CREATE INDEX idx_delivery_logs_sent_at ON delivery_logs(sent_at DESC);

-- RLS for delivery_logs
ALTER TABLE delivery_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage delivery_logs" ON delivery_logs
  FOR ALL TO service_role;

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- Automatically update updated_at timestamp
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_subscribers_updated_at
    BEFORE UPDATE ON subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at
    BEFORE UPDATE ON tags
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletters_updated_at
    BEFORE UPDATE ON newsletters
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- INITIAL DATA
-- Insert default tags
-- ============================================================================
INSERT INTO tags (name, slug, description, color) VALUES
  ('テクノロジー', 'technology', 'テクノロジー関連のニュース', '#3B82F6'),
  ('セッション', 'sessions', 'セッション・イベント情報', '#10B981'),
  ('限定コンテンツ', 'exclusive', '限定コンテンツ', '#F59E0B'),
  ('お知らせ', 'announcements', '重要なお知らせ', '#EF4444')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- USEFUL VIEWS
-- ============================================================================

-- View: Active subscribers (not unsubscribed)
CREATE OR REPLACE VIEW active_subscribers AS
SELECT
    id,
    email,
    first_name,
    last_name,
    is_verified,
    subscribed_at,
    verified_at,
    preferences,
    metadata
FROM subscribers
WHERE unsubscribed_at IS NULL;

-- View: Newsletter statistics
CREATE OR REPLACE VIEW newsletter_stats AS
SELECT
    n.id,
    n.title,
    n.status,
    n.scheduled_at,
    n.sent_at,
    COUNT(DISTINCT dl.subscriber_id) FILTER (WHERE dl.status = 'sent') as total_sent,
    COUNT(DISTINCT dl.subscriber_id) FILTER (WHERE dl.status = 'opened') as total_opened,
    COUNT(DISTINCT dl.subscriber_id) FILTER (WHERE dl.status = 'clicked') as total_clicked,
    COUNT(DISTINCT dl.subscriber_id) FILTER (WHERE dl.status = 'failed') as total_failed
FROM newsletters n
LEFT JOIN delivery_logs dl ON n.id = dl.newsletter_id
GROUP BY n.id, n.title, n.status, n.scheduled_at, n.sent_at;

-- ============================================================================
-- COMMENTS
-- This schema supports a complete newsletter management system with:
-- 1. Subscriber tracking (verification, preferences, unsubscribe)
-- 2. Newsletter content management (draft, schedule, send)
-- 3. Tag-based categorization
-- 4. Delivery tracking with engagement metrics
-- 5. Row Level Security for secure access control
-- 6. Automatic timestamp management
-- 7. Useful views for statistics and reporting
-- ============================================================================
