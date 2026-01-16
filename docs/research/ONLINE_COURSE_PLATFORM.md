# Online Course Infrastructure Study

## Objective
To determine the best platform/infrastructure for hosting online courses (video + text + quizzes) for "Life Self-Determination".

## Requirements
- **Content Types**: Video (required), Text, PDF downloads.
- **User Experience**: Progress tracking, clean UI, mobile responsive.
- **Monetization**: One-time payment (Stripe).
- **Control**: High customization preferred.
- **Cost**: Minimize monthly fixed costs initially.

## Options Analysis

### 1. SaaS LMS Platforms (Teachable / Kajabi)
*   **Pros**:
    *   No development required (hosting, video player, progress tracking all built-in).
    *   Marketing features (email automation, landing pages) included.
*   **Cons**:
    *   **Cost**: Teachable ($39/mo + fees), Kajabi ($149/mo). High fixed cost.
    *   **Design**: Hard to match the portfolio's custom aesthetics completely.
    *   **Platform Lock-in**: Hard to migrate later.

### 2. Udemy
*   **Pros**:
    *   Zero upfront cost.
    *   Access to Udemy's massive marketplace traffic.
*   **Cons**:
    *   **Low Branding**: It's "Udemy's course", not yours.
    *   **Price Logic**: Udemy controls discounting (often sold for $10). Low margin.
    *   **No Customer Data**: You don't own the email list.

### 3. Self-Hosted (Next.js + Stripe + Video Hosting) - **RECOMMENDED**
*   **Architecture**:
    *   **Frontend**: Existing Next.js portfolio.
    *   **Auth**: NextAuth.js (or Clerk/Supabase Auth).
    *   **Video**: Mux or Cloudflare Stream (pay-as-you-go, very cheap).
    *   **DB**: Supabase (PostgreSQL) for user purchase & progress data.
    *   **Payments**: Stripe Checkout.
*   **Pros**:
    *   **Complete Design Control**: Seamless integration with the "Premium" portfolio design.
    *   **Cost Efficiency**: $0/mo fixed cost (Vercel free tier + Pay-as-you-go video).
    *   **Data Ownership**: Full control over user data.
*   **Cons**:
    *   **Dev Effort**: Needs implementation of Auth, DB schema, and Video Player component.
    *   **Video Protection**: Cloudflare Stream Signed URLs (prevent hotlinking/downloading).
    *   **Access Control**: RLS (Row Level Security) in Supabase. Users can only read `lessons` if they exist in `enrollments`.

## 6. Estimated Monthly Cost (Running Costs)

| Service | Plan | Cost (Approx) | Notes |
| :--- | :--- | :--- | :--- |
| **Vercel** | Pro | **$20/mo** | Commercial use recommended. (Hobby is free but has commercial limits). |
| **Supabase** | Free | **$0/mo** | Up to 500MB DB & 500MB Storage. Enough for start. |
| **Cloudflare Stream** | Pay-as-you-go | **~$5/mo** | $5 per 1,000 mins stored. Viewing is $1/1,000 mins. |
| **Stripe** | Standard | **$0/mo** | 3.6% transaction fee only. No fixed cost. |
| **Domain** | - | **~$1.5/mo** | Approx $15-20/year. |
| **Total** | | **~$26.5/mo** | (Approx 3,000 - 4,000 JPY) |

*Note: Initially, if sticking to Vercel Hobby (Personal), fixed cost is essentially just Cloudflare (~$5). But for a proper business setup, budgeting ~$27 is safe.*

## Implementation Roadmap (Self-Hosted)

1.  **Database Setup (Supabase)**
    *   Tables: `users`, `courses`, `enrollments`, `progress`.
2.  **Authentication**
    *   Integrate Clerk or NextAuth for login/signup.
3.  **Video Infrastructure**
    *   Set up Cloudflare Stream ($5/1000min).
4.  **Course UI**
    *   Course functionality: `/courses` (List), `/courses/[slug]` (Player).

## Conclusion
Given the technical capability available (Phase 5 Member System is planned), **Self-Hosted** is the strategic choice. It builds asset value in your own domain and keeps costs low until revenue scales.
