'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, CreditCard } from 'lucide-react';
import type { Course } from '@/types/course';

interface CheckoutPageProps {
  params: Promise<{
    course_slug: string;
  }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { course_slug } = await params;

  // NOTE: This component requires Stripe integration
  // Install with: npm install stripe @stripe/stripe-js
  // Configure STRIPE_PUBLISHABLE_KEY in .env.local

  // Fetch course details (placeholder - will be from Supabase in production)
  const course: Course | null = null;

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p>The course you're looking for doesn't exist.</p>
          <a href="/learn" className="text-teal-400 hover:underline">
            Back to Courses
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8"
        >
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-zinc-200">
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">
              Complete Your Purchase
            </h1>
            <p className="text-zinc-600">
              You're about to purchase: <strong>{course.title}</strong>
            </p>
          </div>

          {/* Course Details */}
          <div className="mb-8 p-6 bg-zinc-50 rounded-xl">
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">Course Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-600">Price:</span>
                <span className="text-xl font-bold text-zinc-900">
                  ${(course.price / 100).toFixed(2)} {course.currency.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Lessons:</span>
                <span className="font-semibold text-zinc-900">{course.total_lessons}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Duration:</span>
                <span className="font-semibold text-zinc-900">
                  {Math.floor(course.total_duration / 60)} minutes
                </span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">What's Included</h2>
            <ul className="space-y-3">
              {[
                'Full access to all course materials',
                'Video lessons with progress tracking',
                'Lifetime access to course updates',
              'Certificate of completion',
              'Community access',
              'Email support',
              '7-day money-back guarantee',
              'Secure payment via Stripe',
              'Instant access after purchase',
              'Works on all devices',
              'Downloadable resources',
              'Priority support',
              'Bonus materials included',
              'Expert instructor feedback',
                'Flexible learning schedule',
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-zinc-700">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-zinc-900">Secure Payment</h3>
            </div>
            <p className="text-sm text-zinc-600 mb-4">
              Your payment information is secure and encrypted. We use Stripe for payment processing and don't store your card details.
            </p>
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>SSL Secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>PCI Compliant</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>PCI DSS Certified</span>
              </div>
            </div>
          </div>

          {/* Checkout Button Placeholder */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <XCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Stripe Integration Required
            </h3>
            <p className="text-zinc-600 mb-4">
              Payment processing requires Stripe package installation and configuration.
            </p>
            <p className="text-sm text-zinc-500">
              <strong>To enable payment:</strong>
              <br />
              1. Run: <code className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded">npm install stripe @stripe/stripe-js</code>
              <br />
              2. Add environment variables to .env.local:
              <code className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded text-xs block mt-2">
                STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxx<br />
                STRIPE_SECRET_KEY=sk_test_xxxxxxxx<br />
                STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxx
              </code>
              <br />
              3. Create Stripe products and prices in dashboard
            </p>
            <a href="/learn" className="inline-block mt-4 px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors">
              Back to Courses
            </a>
          </div>

          {/* Footer Links */}
          <div className="text-center text-sm text-zinc-500 pt-6 border-t border-zinc-200">
            <a href="/learn" className="hover:text-zinc-700">
              ← Back to Course List
            </a>
            <span className="mx-4">|</span>
            <a href="/contact" className="hover:text-zinc-700">
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
