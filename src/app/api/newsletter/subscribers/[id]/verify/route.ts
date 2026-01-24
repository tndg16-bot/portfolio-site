/**
 * Newsletter Subscriber Verification API
 * POST /api/newsletter/subscribers/[id]/verify
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/lib/supabase';
import { type VerifySubscriberResponse, type ApiError } from '@/types/newsletter';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/newsletter/subscribers/[id]/verify
 * Verifies a subscriber's email address
 *
 * Body:
 * - token: Verification token sent to the subscriber's email
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
        { error: 'Bad request', message: 'Verification token is required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServiceClient();

    // Check if the token matches
    const { data: subscriber, error: fetchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('id', id)
      .eq('verification_token', token)
      .single();

    if (fetchError || !subscriber) {
      return NextResponse.json<VerifySubscriberResponse>(
        { success: false, message: '無効な認証リンクです。' },
        { status: 400 }
      );
    }

    // Already verified
    if (subscriber.is_verified) {
      return NextResponse.json<VerifySubscriberResponse>(
        { success: true, message: '既に認証済みです。' }
      );
    }

    // Verify the subscriber
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({
        is_verified: true,
        verified_at: new Date().toISOString(),
        verification_token: null, // Clear the token after verification
      })
      .eq('id', id);

    if (updateError) {
      console.error('Supabase update error:', updateError);
      return NextResponse.json<VerifySubscriberResponse>(
        { success: false, message: '認証に失敗しました。' },
        { status: 500 }
      );
    }

    return NextResponse.json<VerifySubscriberResponse>({
      success: true,
      message: 'メールアドレスを認証しました！',
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json<VerifySubscriberResponse>(
      { success: false, message: 'エラーが発生しました。' },
      { status: 500 }
    );
  }
}
