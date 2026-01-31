/**
 * Supabase Client Configuration
 *
 * This file sets up the Supabase client for database and auth operations.
 * Environment variables must be configured in .env.local
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Create a Supabase client for use in browser and API routes
 * Uses the anon key for client-side operations
 */
export const createSupabaseClient = (): SupabaseClient => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

/**
 * Create a Supabase client with service role privileges
 * Only use on the server side (API routes, server components)
 */
export const createSupabaseServiceClient = (): SupabaseClient => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase service role environment variables');
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

/**
 * Singleton instances for reuse
 */
let supabaseClientInstance: SupabaseClient | null = null;
let supabaseServiceClientInstance: SupabaseClient | null = null;

/**
 * Get the Supabase client (singleton pattern)
 * For use in API routes and server components
 */
export const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseClientInstance) {
    supabaseClientInstance = createSupabaseClient();
  }
  return supabaseClientInstance;
};

/**
 * Get the Supabase service client (singleton pattern)
 * For server-side operations with elevated privileges
 */
export const getSupabaseServiceClient = (): SupabaseClient => {
  if (!supabaseServiceClientInstance) {
    supabaseServiceClientInstance = createSupabaseServiceClient();
  }
  return supabaseServiceClientInstance;
};

/**
 * Check if Supabase is configured
 */
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey);
};

/**
 * Check if Supabase service role is configured
 */
export const isSupabaseServiceConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseServiceRoleKey);
};
