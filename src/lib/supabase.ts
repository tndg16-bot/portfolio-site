/**
 * Supabase Client Setup
 *
 * This module initializes the Supabase client with environment variables.
 * Environment variables must be set in .env.local for local development
 * and in Vercel for production.
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Supabase client instance
 * Use this for all database operations
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Type definitions for database tables
 */
export type Database = {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          thumbnail_url: string;
          price: number;
          status: 'draft' | 'published' | 'archived';
          instructor_name: string;
          instructor_image_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      modules: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          description: string;
          order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['modules']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['modules']['Insert']>;
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          description: string;
          video_url: string;
          duration: number; // in seconds
          order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['lessons']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>;
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
          completed_at: string | null;
          progress: number; // 0-100
        };
        Insert: Omit<Database['public']['Tables']['enrollments']['Row'], 'id' | 'enrolled_at'>;
        Update: Partial<Database['public']['Tables']['enrollments']['Insert']>;
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed: boolean;
          completed_at: string | null;
          watch_duration: number; // in seconds
        };
        Insert: Omit<Database['public']['Tables']['user_progress']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['user_progress']['Insert']>;
      };
    };
  };
};
