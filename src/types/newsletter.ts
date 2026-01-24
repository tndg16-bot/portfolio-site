/**
 * Newsletter Management System Types
 *
 * This file contains all TypeScript types for the newsletter management system,
 * including database types, API request/response types, and frontend component types.
 */

// ============================================================================
// DATABASE TYPES
// Matches the Supabase schema in supabase/migrations/001_newsletter_system.sql
// ============================================================================

export type SubscriberStatus = 'verified' | 'unverified' | 'unsubscribed';

export interface Subscriber {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_verified: boolean;
  verification_token?: string;
  unsubscribe_token?: string;
  subscribed_at: string;
  verified_at?: string;
  unsubscribed_at?: string;
  preferences: SubscriberPreferences;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SubscriberPreferences {
  categories: string[];
  frequency: 'daily' | 'weekly' | 'monthly';
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export type NewsletterStatus = 'draft' | 'scheduled' | 'sent' | 'cancelled';

export interface Newsletter {
  id: string;
  title: string;
  slug: string;
  subject: string;
  preview_text?: string;
  content_html: string;
  content_text?: string;
  status: NewsletterStatus;
  scheduled_at?: string;
  sent_at?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown>;
  // Join fields (when fetched with tags)
  tags?: Tag[];
}

export interface NewsletterTag {
  id: string;
  newsletter_id: string;
  tag_id: string;
  created_at: string;
}

export type DeliveryStatus = 'pending' | 'sent' | 'failed' | 'opened' | 'clicked' | 'bounced';

export interface DeliveryLog {
  id: string;
  newsletter_id: string;
  subscriber_id: string;
  status: DeliveryStatus;
  sent_at?: string;
  opened_at?: string;
  clicked_at?: string;
  error_message?: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

// ============================================================================
// VIEW TYPES
// Useful database views for statistics and reporting
// ============================================================================

export interface ActiveSubscriber {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_verified: boolean;
  subscribed_at: string;
  verified_at?: string;
  preferences: SubscriberPreferences;
  metadata: Record<string, unknown>;
}

export interface NewsletterStats {
  id: string;
  title: string;
  status: NewsletterStatus;
  scheduled_at?: string;
  sent_at?: string;
  total_sent: number;
  total_opened: number;
  total_clicked: number;
  total_failed: number;
}

// ============================================================================
// API REQUEST TYPES
// Types for API requests to newsletter endpoints
// ============================================================================

export interface SubscribeRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  preferences?: Partial<SubscriberPreferences>;
}

export interface VerifySubscriberRequest {
  token: string;
}

export interface UpdateSubscriberRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  preferences?: Partial<SubscriberPreferences>;
  metadata?: Record<string, unknown>;
}

export interface UnsubscribeRequest {
  token: string;
}

export interface CreateNewsletterRequest {
  title: string;
  subject: string;
  preview_text?: string;
  content_html: string;
  content_text?: string;
  scheduled_at?: string;
  tag_slugs?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateNewsletterRequest {
  title?: string;
  subject?: string;
  preview_text?: string;
  content_html?: string;
  content_text?: string;
  scheduled_at?: string;
  status?: NewsletterStatus;
  tag_slugs?: string[];
  metadata?: Record<string, unknown>;
}

export interface SendNewsletterRequest {
  newsletter_id: string;
  send_immediately?: boolean;
  test_email?: string;
}

export interface CreateTagRequest {
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

// ============================================================================
// API RESPONSE TYPES
// Types for API responses from newsletter endpoints
// ============================================================================

export interface SubscribeResponse {
  success: boolean;
  message: string;
  subscriber_id?: string;
  requires_verification?: boolean;
}

export interface VerifySubscriberResponse {
  success: boolean;
  message: string;
}

export interface UnsubscribeResponse {
  success: boolean;
  message: string;
}

export interface SubscribersResponse {
  subscribers: Subscriber[];
  total: number;
  page: number;
  limit: number;
}

export interface NewslettersResponse {
  newsletters: Newsletter[];
  total: number;
  page: number;
  limit: number;
}

export interface NewsletterResponse {
  newsletter: Newsletter;
}

export interface SendNewsletterResponse {
  success: boolean;
  message: string;
  newsletter_id: string;
  queued_count?: number;
}

export interface NewsletterStatsResponse {
  stats: NewsletterStats;
}

export interface TagsResponse {
  tags: Tag[];
}

// ============================================================================
// API ERROR TYPES
// Standard error types for API responses
// ============================================================================

export interface ApiError {
  error: string;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

// ============================================================================
// FRONTEND COMPONENT TYPES
// Types for React components
// ============================================================================

export interface NewsletterFormData {
  title: string;
  subject: string;
  preview_text: string;
  content_html: string;
  content_text: string;
  scheduled_at?: string;
  tags: string[];
}

export interface SubscriberListFilters {
  status?: SubscriberStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface NewsletterListFilters {
  status?: NewsletterStatus;
  search?: string;
  tag_slug?: string;
  page?: number;
  limit?: number;
}

// ============================================================================
// EMAIL TEMPLATE TYPES
// Types for email templates and rendering
// ============================================================================

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

export interface NewsletterEmailData {
  subscriber: Subscriber;
  newsletter: Newsletter;
  unsubscribe_url: string;
  view_online_url: string;
}

// ============================================================================
// UTILITY TYPES
// Helper types for common operations
// ============================================================================

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ============================================================================
// DATABASE QUERY TYPES
// Types for database queries and operations
// ============================================================================

export interface SubscriberQueryOptions {
  include_unsubscribed?: boolean;
  status?: SubscriberStatus;
  page?: number;
  limit?: number;
  search?: string;
}

export interface NewsletterQueryOptions {
  status?: NewsletterStatus;
  tag_slug?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface DeliveryStatsQueryOptions {
  newsletter_id?: string;
  start_date?: string;
  end_date?: string;
}

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================