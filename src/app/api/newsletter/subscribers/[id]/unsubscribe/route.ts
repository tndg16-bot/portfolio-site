/**
 * Newsletter Subscriber Unsubscribe API
 * POST /api/newsletter/subscribers/[id]/unsubscribe
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/lib/supabase';
import { type UnsubscribeResponse, type ApiError } from '@/types/newsletter';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/newsletter/subscribers/[id]/unsubscribe
 * Unsubscribes a user from the newsletter
 *
 * Body:
 * - token: Unsubscribe token sent to the subscriber's email
 */
export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json<ApiError>(
        { error: 'Bad request', message: 'Unsubscribe token is required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServiceClient();

    // Check if the token matches
    const { data: subscriber, error: fetchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('id', id)
      .eq('unsubscribe_token', token)
      .single();

    if (fetchError || !subscriber) {
      return NextResponse.json<UnsubscribeResponse>(
        { success: false, message: '無効な配信停止リンクです。' },
        { status: 400 }
      );
    }

    // Already unsubscribed
    if (subscriber.unsubscribed_at) {
      return NextResponse.json<UnsubscribeResponse>(
        { success: true, message: '既に配信停止されています。' }
      );
    }

    // Unsubscribe the user
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({
        unsubscribed_at: new Date().toISOString(),
        unsubscribe_token: null, // Clear the token after unsubscribe
      })
      .eq('id', id);

    if (updateError) {
      console.error('Supabase update error:', updateError);
      return NextResponse.json<UnsubscribeResponse>(
        { success: false, message: '配信停止に失敗しました。' },
        { status: 500 }
      );
    }

    return NextResponse.json<UnsubscribeResponse>({
      success: true,
      message: 'ニュースレターの配信を停止しました。',
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json<UnsubscribeResponse>(
      { success: false, message: 'エラーが発生しました。' },
      { status: 500 }
    );
  }
}
