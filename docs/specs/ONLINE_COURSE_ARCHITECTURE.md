# Online Course System Architecture

## Overview
A self-hosted online course platform integrated into the existing Next.js portfolio.
Goal: Provide a premium learning experience with video streaming, progress tracking, and secure access control.

## 1. Tech Stack
| Component | Technology | Reasoning |
|-----------|------------|-----------|
| **Frontend** | Next.js 15 (App Router) | Existing stack, high performance. |
| **Auth** | Supabase Auth (or Clerk) | Secure handling of Magic Links/Social Login. |
| **Database** | Supabase (PostgreSQL) | Relational data for courses/users/progress. |
| **Video** | Cloudflare Stream | Adaptive bitrate streaming, cheap ($5/1000min), signed URLs. |
| **Payment** | Stripe | Checkout for one-time purchases. |
| **UI** | TailwindCSS + Shadcn/UI | Consistent design system. |

## 2. Database Schema (Supabase)

### `profiles` (User Data)
- `id`: uuid (PK, references auth.users)
- `email`: text
- `full_name`: text
- `avatar_url`: text
- `created_at`: timestamp

### `courses` (Products)
- `id`: uuid (PK)
- `slug`: text (unique)
- `title`: text
- `description`: text
- `thumbnail_url`: text
- `price`: integer (JPY)
- `is_published`: boolean

### `modules` (Chapters)
- `id`: uuid (PK)
- `course_id`: uuid (FK)
- `title`: text
- `order_index`: integer

### `lessons` (Content)
- `id`: uuid (PK)
- `module_id`: uuid (FK)
- `title`: text
- `video_url`: text (Cloudflare Stream ID)
- `content`: markdown (Text content)
- `is_free_preview`: boolean
- `duration`: integer (seconds)
- `order_index`: integer

### `enrollments` (Purchases)
- `user_id`: uuid (PK, FK)
- `course_id`: uuid (PK, FK)
- `purchased_at`: timestamp

### `UserProgress` (Learning Status)
- `user_id`: uuid (PK, FK)
- `lesson_id`: uuid (PK, FK)
- `is_completed`: boolean
- `last_watched_position`: integer (seconds)

## 3. URL Structure
- `/courses` - Course Catalog (List)
- `/courses/[slug]` - Course Landing Page (Sales Page)
- `/learn/[course_slug]` - Learning Dashboard (Player + Sidebar)

## 4. Development Phases
1.  **Phase 5-1: DB & Auth**: Set up Supabase and User Login.
2.  **Phase 5-2: Video Integration**: Upload test video to Cloudflare and render in Player.
3.  **Phase 5-3: Course UI**: Build the Learning Interface.
4.  **Phase 5-4: Payments**: Integrate Stripe.

## 5. Security Strategy
- **Video Protection**: Cloudflare Stream Signed URLs (prevent hotlinking/downloading).
- **Access Control**: RLS (Row Level Security) in Supabase. Users can only read `lessons` if they exist in `enrollments`.
