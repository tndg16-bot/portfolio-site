import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { CheckoutSessionRequest } from '@/types/course';

// NOTE: This API requires @stripe/stripe-js to be installed
// Install with: npm install stripe @stripe/stripe-js
// Then update environment variables in .env.local:
// - STRIPE_PUBLISHABLE_KEY
// - STRIPE_SECRET_KEY
// - STRIPE_WEBHOOK_SECRET

export async function POST(
  request: Request,
  { params }: { params: Promise<{ course_slug: string }> }
) {
  try {
    const { course_slug } = await params;
    const body: CheckoutSessionRequest = await request.json();

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    // Fetch course details from Supabase
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', course_slug)
      .eq('is_published', true)
      .single();

    if (courseError || !course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // NOTE: Stripe integration requires stripe package installation
    // The code below will work once stripe is installed

    // Placeholder response for now
    return NextResponse.json(
      {
        error: 'Stripe integration requires package installation',
        message: 'Install stripe package and configure environment variables',
        course: {
          id: course.id,
          slug: course.slug,
          title: course.title,
          price: course.price,
          currency: course.currency,
        }
      },
      { status: 503 }
    );

    /* 
    // FULL IMPLEMENTATION (once stripe is installed):

    import Stripe from 'stripe';
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-12-02.acacia',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: course.currency || 'usd',
            product_data: {
              name: course.title,
              description: course.description || '',
              images: course.thumbnail_url ? [course.thumbnail_url] : undefined,
            },
            unit_amount: course.price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/cancel?course_slug=${course_slug}`,
      metadata: {
        course_id: course.id,
        course_slug: course.slug,
      },
      customer_email: body.email,
    });

    return NextResponse.json({
      session_url: session.url,
      session_id: session.id,
    });
    */

  } catch (error) {
    console.error('Checkout session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
