/**
 * Newsletter Subscribe API (Enhanced with Database)
 * POST /api/newsletter/subscribe - Subscribe to the newsletter
 *
 * This route creates a new subscriber in the database and sends a verification email.
 */

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabaseServiceClient } from '@/lib/supabase';
import { type SubscribeResponse, type ApiError, type SubscribeRequest } from '@/types/newsletter';
import crypto from 'crypto';

// Resend client
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/**
 * POST /api/newsletter/subscribe
 * Subscribes a new user to the newsletter
 *
 * Body:
 * - email: Email address (required)
 * - firstName: First name (optional)
 * - lastName: Last name (optional)
 * - preferences: Subscriber preferences (optional)
 */
export async function POST(request: Request) {
  try {
    const body: SubscribeRequest = await request.json();
    const { email, firstName, lastName, preferences } = body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json<ApiError>(
        { error: 'Validation error', message: '有効なメールアドレスを入力してください。' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServiceClient();

    // Check if subscriber already exists
    const { data: existingSubscriber, error: fetchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Supabase fetch error:', fetchError);
      return NextResponse.json<ApiError>(
        { error: 'Database error', message: 'エラーが発生しました。もう一度お試しください。' },
        { status: 500 }
      );
    }

    // If subscriber exists and is active
    if (existingSubscriber && !existingSubscriber.unsubscribed_at) {
      if (existingSubscriber.is_verified) {
        return NextResponse.json<SubscribeResponse>(
          { success: true, message: '既に登録されています。' }
        );
      } else {
        // Resend verification email
        if (resend) {
          try {
            await resend.emails.send({
              from: 'newsletter@takahiro-motoyama.vercel.app',
              to: email,
              subject: '【本山貴大】メールアドレスの認証',
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                  <h1 style="color: #333;">メールアドレスの認証</h1>
                  <p>以下のリンクをクリックして、ニュースレターの登録を完了してください。</p>
                  <p>
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/newsletter/verify?token=${existingSubscriber.verification_token}&id=${existingSubscriber.id}"
                       style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                      メールアドレスを認証する
                    </a>
                  </p>
                  <p style="color: #666; font-size: 12px;">
                    このリンクは24時間有効です。<br />
                    このメールは ${email} 宛に送信されています。
                  </p>
                </div>
              `,
            });
          } catch (emailError) {
            console.error('Resend Email Error:', emailError);
          }
        }

        return NextResponse.json<SubscribeResponse>(
          { success: true, message: '認証メールを再送しました。', subscriber_id: existingSubscriber.id, requires_verification: true }
        );
      }
    }

    // If subscriber exists but was unsubscribed, reactivate
    if (existingSubscriber && existingSubscriber.unsubscribed_at) {
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const unsubscribeToken = crypto.randomBytes(32).toString('hex');

      const { error: updateError } = await supabase
        .from('subscribers')
        .update({
          is_verified: false,
          verification_token: verificationToken,
          unsubscribe_token: unsubscribeToken,
          unsubscribed_at: null,
          first_name: firstName || existingSubscriber.first_name,
          last_name: lastName || existingSubscriber.last_name,
          preferences: preferences || existingSubscriber.preferences,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingSubscriber.id);

      if (updateError) {
        console.error('Supabase update error:', updateError);
        return NextResponse.json<ApiError>(
          { error: 'Database error', message: 'エラーが発生しました。もう一度お試しください。' },
          { status: 500 }
        );
      }

      // Send verification email
      if (resend) {
        try {
          await resend.emails.send({
            from: 'newsletter@takahiro-motoyama.vercel.app',
            to: email,
            subject: '【本山貴大】ニュースレター再登録 - メールアドレスの認証',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333;">ニュースレターへの再登録</h1>
                <p>本山貴大のニュースレターに再登録いただき、ありがとうございます。</p>
                <p>以下のリンクをクリックして、登録を完了してください。</p>
                <p>
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/newsletter/verify?token=${verificationToken}&id=${existingSubscriber.id}"
                     style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                    メールアドレスを認証する
                  </a>
                </p>
                <p style="color: #666; font-size: 12px;">
                  このリンクは24時間有効です。<br />
                  このメールは ${email} 宛に送信されています。
                </p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error('Resend Email Error:', emailError);
        }
      }

      return NextResponse.json<SubscribeResponse>({
        success: true,
        message: '認証メールを送信しました。',
        subscriber_id: existingSubscriber.id,
        requires_verification: true,
      });
    }

    // Create new subscriber
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const unsubscribeToken = crypto.randomBytes(32).toString('hex');

    const { data: newSubscriber, error: insertError } = await supabase
      .from('subscribers')
      .insert({
        email,
        first_name: firstName,
        last_name: lastName,
        is_verified: false,
        verification_token: verificationToken,
        unsubscribe_token: unsubscribeToken,
        preferences: preferences || { categories: [], frequency: 'weekly' },
        subscribed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json<ApiError>(
        { error: 'Database error', message: 'エラーが発生しました。もう一度お試しください。' },
        { status: 500 }
      );
    }

    // Send verification email
    if (resend) {
      try {
        await resend.emails.send({
          from: 'newsletter@takahiro-motoyama.vercel.app',
          to: email,
          subject: '【本山貴大】ニュースレターご登録のお知らせ',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">ご登録ありがとうございます！</h1>
              <p>本山貴大のニュースレターにご登録いただき、ありがとうございます。</p>
              <p>以下のリンクをクリックして、メールアドレスの認証を完了してください。</p>
              <p>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/newsletter/verify?token=${verificationToken}&id=${newSubscriber.id}"
                   style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  メールアドレスを認証する
                </a>
              </p>
              <h2 style="color: #333; margin-top: 30px;">これから以下のような情報をお届けします：</h2>
              <ul>
                <li>新着記事のお知らせ</li>
                <li>セッション・イベント情報</li>
                <li>限定コンテンツ</li>
              </ul>
              <p style="margin-top: 30px; color: #666; font-size: 12px;">
                このリンクは24時間有効です。<br />
                このメールは ${email} 宛に送信されています。<br />
                配信停止をご希望の場合は、このメールに返信してください。
              </p>
            </div>
          `,
        });

        // Admin notification
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail) {
          await resend.emails.send({
            from: 'newsletter@takahiro-motoyama.vercel.app',
            to: adminEmail,
            subject: '【通知】新規ニュースレター登録',
            html: `<p>新規登録: ${email}</p>`,
          });
        }
      } catch (emailError) {
        console.error('Resend Email Error:', emailError);
        // Continue even if email fails
      }
    } else {
      console.log('Newsletter subscription (no Resend configured):', email);
    }

    return NextResponse.json<SubscribeResponse>({
      success: true,
      message: '登録ありがとうございます。認証メールを送信しました。',
      subscriber_id: newSubscriber.id,
      requires_verification: true,
    });
  } catch (error) {
    console.error('Subscribe Error:', error);
    return NextResponse.json<ApiError>(
      { error: 'Internal error', message: 'エラーが発生しました。もう一度お試しください。' },
      { status: 500 }
    );
  }
}
