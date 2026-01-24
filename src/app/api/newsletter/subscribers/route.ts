/**
 * Newsletter Subscribers API
 * GET /api/newsletter/subscribers - List all subscribers
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/lib/supabase';
import { type SubscribersResponse, type ApiError } from '@/types/newsletter';

/**
 * GET /api/newsletter/subscribers
 * Retrieves a paginated list of subscribers
 *
 * Query parameters:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 20)
 * - status: Filter by status (verified, unverified, unsubscribed)
 * - search: Search by email or name
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const supabase = getSupabaseServiceClient();

    // Build query
    let query = supabase
      .from('subscribers')
      .select('*', { count: 'exact' })
      .order('subscribed_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    // Apply status filter
    if (status === 'unsubscribed') {
      query = query.not('unsubscribed_at', 'is', null);
    } else if (status === 'verified') {
      query = query.eq('is_verified', true).is('unsubscribed_at', null);
    } else if (status === 'unverified') {
      query = query.eq('is_verified', false).is('unsubscribed_at', null);
    } else {
      // Default: only active subscribers
      query = query.is('unsubscribed_at', null);
    }

    // Apply search filter
    if (search) {
      query = query.or(`email.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
    }

    const { data: subscribers, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json<ApiError>(
        { error: 'Database error', message: 'Failed to fetch subscribers' },
        { status: 500 }
      );
    }

    const response: SubscribersResponse = {
      subscribers: subscribers || [],
      total: count || 0,
      page,
      limit,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Subscribers GET error:', error);
    return NextResponse.json<ApiError>(
      { error: 'Internal error', message: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
