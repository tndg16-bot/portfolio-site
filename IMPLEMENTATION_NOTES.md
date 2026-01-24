# Package Installation Requirements

## Next Steps for Full Functionality

The following packages need to be installed to enable Stripe and Cloudflare Stream functionality:

```bash
npm install stripe @stripe/stripe-js
npm install @cloudflare/video-js
```

## Environment Variables to Add

After installing the packages, add these to `.env.local`:

```bash
# ============================================
# Stripe Configuration
# ============================================
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx

# ============================================
# Cloudflare Stream Configuration
# ============================================
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token

# ============================================
# Site Configuration (already exists)
# ============================================
NEXT_PUBLIC_SITE_URL=https://takahiro-motoyama.vercel.app
```

## Files Created (Placeholder Implementation)

The following files have been created with placeholder implementations:
- `src/types/course.ts` - TypeScript types for courses
- `src/app/api/checkout/[course_slug]/route.ts` - Stripe checkout API
- `src/app/api/webhooks/stripe/route.ts` - Stripe webhook handler
- `src/app/checkout/[course_slug]/page.tsx` - Checkout UI
- `src/app/api/videos/[video_id]/signed-url/route.ts` - Cloudflare signed URL API
- `src/components/VideoPlayer.tsx` - Video player component
- `src/components/LessonNavigation.tsx` - Lesson navigation sidebar
- `src/app/learn/page.tsx` - Course list page
- `src/app/learn/[course_slug]/page.tsx` - Course detail/learning page

## Next Steps

1. Install required packages:
   ```bash
   npm install stripe @stripe/stripe-js @cloudflare/video-js
   ```

2. Configure environment variables in `.env.local`

3. Update the placeholder files to use the installed packages:
   - Uncomment and update the code in `src/app/api/checkout/[course_slug]/route.ts`
   - Uncomment and update the code in `src/app/api/webhooks/stripe/route.ts`
   - Uncomment and update the code in `src/app/api/videos/[video_id]/signed-url/route.ts`

4. Create Stripe products and prices:
   - Go to https://dashboard.stripe.com
   - Create products for each course
   - Set pricing
   - Copy Product ID and Price ID

5. Test the flows:
   - Test course enrollment with Stripe
   - Test video playback with Cloudflare Stream
   - Test progress tracking

## Implementation Notes

### Stripe Integration
- Checkout session creation for course purchases
- Webhook handling for payment confirmation
- Enrollment record creation in Supabase
- Success and cancel pages

### Cloudflare Stream
- Signed URL generation for video protection
- Custom video player with full controls
- Progress tracking integration
- Responsive design

### Learning Dashboard
- Course list with enrollment status
- Course detail page with video player
- Lesson navigation sidebar (accordion)
- Progress tracking with completion status
- Mobile-responsive layout

---

**Created**: 2026-01-24
**Status**: Placeholder implementations created - awaiting package installation
