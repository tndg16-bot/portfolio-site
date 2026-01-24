/**
 * Blog Management System Types
 *
 * This file contains all TypeScript types for the blog management system,
 * including admin API request/response types and frontend component types.
 */

import { PostContent, PostData } from '@/lib/posts';

// ============================================================================
// ADMIN API REQUEST TYPES
// Types for admin API requests to manage blog posts
// ============================================================================

export interface CreatePostRequest {
  slug: string;
  title: string;
  date: string;
  description?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
  content: string;
}

export interface UpdatePostRequest {
  slug?: string;
  title?: string;
  date?: string;
  description?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
  content?: string;
}

export interface DeletePostRequest {
  slug: string;
}

// ============================================================================
// ADMIN API RESPONSE TYPES
// Types for admin API responses from blog management endpoints
// ============================================================================

export interface PostListResponse {
  posts: AdminPostData[];
  total: number;
}

export interface PostResponse {
  post: AdminPostData;
}

export interface SuccessResponse {
  success: boolean;
  message: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

// ============================================================================
// ADMIN POST TYPES
// Extended post types for admin interface
// ============================================================================

export interface AdminPostData extends PostData {
  slug: string;
  published: boolean;
  content?: string;
}

export interface AdminPostContent extends PostContent {
  published: boolean;
}

// ============================================================================
// AUTH TYPES
// Types for authentication and authorization
// ============================================================================

export interface AuthConfig {
  enabled: boolean;
  passwordHash?: string;
  sessionMaxAge?: number;
}

export interface LoginRequest {
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export interface AuthResult {
  authenticated: boolean;
}

// ============================================================================
// FILTER & PAGINATION TYPES
// Types for filtering and pagination
// ============================================================================

export interface PostListFilters {
  search?: string;
  category?: string;
  tag?: string;
  published?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface SortOptions {
  field: 'date' | 'title' | 'category';
  order: 'asc' | 'desc';
}

// ============================================================================
// FRONTEND FORM TYPES
// Types for React components and forms
// ============================================================================

export interface PostFormData {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string;
  published: boolean;
  content: string;
}

export interface FormErrors {
  slug?: string;
  title?: string;
  date?: string;
  content?: string;
}

// ============================================================================
// VALIDATION TYPES
// Types for validation rules
// ============================================================================

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean | string;
}

export interface ValidationRules {
  slug: ValidationRule;
  title: ValidationRule;
  date: ValidationRule;
  content: ValidationRule;
  category?: ValidationRule;
  tags?: ValidationRule;
}

// ============================================================================
// UTILITY TYPES
// Helper types for common operations
// ============================================================================

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
