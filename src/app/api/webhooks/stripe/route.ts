import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// NOTE: This webhook requires @stripe/stripe-js to be installed
// Install with: npm install stripe @stripe/stripe-js
// Then update environment variables in .env.local:
// - STRIPE_PUBLISHABLE_KEY
// - STRIPE_SECRET_KEY
// - STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      );
    }

    // NOTE: Stripe integration requires stripe package installation
    // The code below will work once stripe is installed

    // Placeholder response for now
    return NextResponse.json(
      {
        error: 'Stripe integration requires package installation',
        message: 'Install stripe package and configure environment variables',
      },
      { status: 503 }
    );

    /* 
    // FULL IMPLEMENTATION (once stripe is installed):

    import Stripe from 'stripe';
    import crypto from 'crypto';
    import { NextResponse } from 'next/server';

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-12-02.acacia',
    });
    
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract metadata
      const courseId = session.metadata?.course_id;
      const courseSlug = session.metadata?.course_slug;
      const customerEmail = session.customer_email;

      if (!courseId) {
        console.error('No course_id in metadata');
        return NextResponse.json(
          { error: 'Invalid metadata' },
          { status: 400 }
        );
      }

      // Initialize Supabase client
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );

      // Check if enrollment already exists
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('*')
        .eq('course_id', courseId)
        .eq('stripe_checkout_session_id', session.id)
        .single();

      if (existingEnrollment) {
        console.log('Enrollment already exists:', existingEnrollment.id);
        return NextResponse.json({ received: true });
      }

      // Create enrollment record
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .insert({
          course_id: courseId,
          stripe_checkout_session_id: session.id,
          enrolled_at: new Date().toISOString(),
          is_active: true,
        })
        .select()
        .single();

      if (enrollmentError) {
        console.error('Failed to create enrollment:', enrollmentError);
        return NextResponse.json(
          { error: 'Failed to create enrollment' },
          { status: 500 }
        );
      }

      console.log('Enrollment created:', enrollment.id);
    }

    return NextResponse.json({ received: true });
    */

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Import at the top of the file once stripe is installed:
// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import { createClient } from '@supabase/supabase-js';
// import crypto from 'crypto';
