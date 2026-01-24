/**
 * Newsletter Subscriber API
 * GET /api/newsletter/subscribers/[id] - Get a specific subscriber
 * PUT /api/newsletter/subscribers/[id] - Update subscriber info
 * DELETE /api/newsletter/subscribers/[id] - Delete a subscriber
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/lib/supabase';
import { type Subscriber, type ApiError, type UpdateSubscriberRequest } from '@/types/newsletter';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/newsletter/subscribers/[id]
 * Retrieves a specific subscriber by ID
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const supabase = getSupabaseServiceClient();

    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json<ApiError>(
          { error: 'Not found', message: 'Subscriber not found' },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      return NextResponse.json<ApiError>(
        { error: 'Database error', message: 'Failed to fetch subscriber' },
        { status: 500 }
      );
    }

    return NextResponse.json<Subscriber>(subscriber);
  } catch (error) {
    console.error('Subscriber GET error:', error);
    return NextResponse.json<ApiError>(
      { error: 'Internal error', message: 'Failed to fetch subscriber' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/newsletter/subscribers/[id]
 * Updates subscriber information
 */
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body: UpdateSubscriberRequest = await request.json();
    const { email, first_name, last_name, preferences, metadata } = body;

    const supabase = getSupabaseServiceClient();

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (email !== undefined) {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json<ApiError>(
          { error: 'Validation error', message: '有効なメールアドレスを入力してください。' },
          { status: 400 }
        );
      }
      updateData.email = email;
    }

    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (preferences !== undefined) updateData.preferences = preferences;
    if (metadata !== undefined) updateData.metadata = metadata;

    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json<ApiError>(
        { error: 'Database error', message: 'Failed to update subscriber' },
        { status: 500 }
      );
    }

    return NextResponse.json<Subscriber>(subscriber);
  } catch (error) {
    console.error('Subscriber PUT error:', error);
    return NextResponse.json<ApiError>(
      { error: 'Internal error', message: 'Failed to update subscriber' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/newsletter/subscribers/[id]
 * Deletes a subscriber permanently
 */
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const supabase = getSupabaseServiceClient();

    const { error } = await supabase
      .from('subscribers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json<ApiError>(
        { error: 'Database error', message: 'Failed to delete subscriber' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Subscriber deleted' });
  } catch (error) {
    console.error('Subscriber DELETE error:', error);
    return NextResponse.json<ApiError>(
      { error: 'Internal error', message: 'Failed to delete subscriber' },
      { status: 500 }
    );
  }
}
