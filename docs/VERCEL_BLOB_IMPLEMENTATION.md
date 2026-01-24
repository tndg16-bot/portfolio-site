# Vercel Blob Video Implementation Guide

**目的**: Vercel Blob Storage を使用した動画配信システムの実装

---

## 📦 パッケージ インストール

```bash
# Vercel Blob SDK
npm install @vercel/blob
```

---

## 🔧 環境変数の追加

### `.env.local` に追加:

```bash
# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# Stripe (Payment Processing)
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx

# Supabase (Authentication & Database)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

### Vercel Token の取得方法

1. [ ] Vercel Dashboard にアクセス: https://vercel.com
2. [ ] 左メニュー > Tokens
3. [ ] `Create Token` をクリック
4. [ ] Scope を選択:
   - Account Scope
   - Access Control: Read/Write to Blobs
5. [ ] Token をコピーして `.env.local` に追加
6. [ ] **期限**: 90日後に更新すること

---

## 📁 ファイル構成

### 1. Vercel Blob アップロード API

**ファイル**: `src/app/api/admin/videos/upload/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { createClient } from '@supabase/supabase-js';

const ALLOWED_ORIGINS = ['https://takahiro-motoyama.vercel.app'];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const lessonId = formData.get('lesson_id') as string;

    if (!file || !lessonId) {
      return NextResponse.json(
        { error: 'Missing required fields: file and lesson_id' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Only video files are allowed' },
        { status: 400 }
      );
    }

    // Read file into buffer
    const buffer = await file.arrayBuffer();
    const filename = `${Date.now()}-${file.name}`;
    const contentType = file.type;

    // Upload to Vercel Blob
    const blob = await put(filename, buffer, {
      contentType,
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
    });

    if (!blob.url) {
      return NextResponse.json(
        { error: 'Failed to upload video' },
        { status: 500 }
      );
    }

    // Update Supabase with video URL
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    const { error: updateError } = await supabase
      .from('lessons')
      .update({ video_id: blob.url })
      .eq('id', lessonId)
      .select();

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update video URL' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: blob.url,
      filename,
      size: blob.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload video' },
      { status: 500 }
    );
  }
}
```

### 2. 動画 URL 取得 API（更新版）

**ファイル**: `src/app/api/videos/[video_id]/signed-url/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(
  request: Request,
  { params }: { params: { video_id: string } }
) {
  try {
    const { video_id } = params;

    // Fetch video data from Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('video_id, video_duration, title, slug')
      .eq('id', video_id)
      .single();

    if (error || !lesson) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Return Vercel Blob URL directly (no signing needed for public blobs)
    return NextResponse.json({
      signed_url: lesson.video_id, // This is the Vercel Blob URL
      duration: lesson.video_duration || 0,
      title: lesson.title,
      slug: lesson.slug,
    });
  } catch (error) {
    console.error('Video fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}
```

### 3. VideoPlayer コンポーネント（Vercel Blob 版）

**ファイル**: `src/components/VideoPlayer.tsx`（上書）

**主な変更点**:
- `videoId` prop → `videoUrl` prop に変更
- Vercel Blob SDK で動画を読み込む
- `put` を使用して `src/app/api/admin/videos/upload/route.ts` でアップロードした動画の URL を保存
- 直接 HTML5 video 要素を使用

---

## 🎨 コンポーネント使用例

### Learn ページでの使用

```typescript
import VideoPlayer from '@/components/VideoPlayer';

// 動画 URL を Supabase から取得
const { data: lesson } = await supabase
  .from('lessons')
  .select('id, video_id, title, slug')
  .eq('slug', courseSlug)
  .single();

export default async function LearnCoursePage({ params }: { params: { course_slug: string } }) {
  // ... existing code ...

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_slug', courseSlug)
    .order('order_index', { ascending: true })
    .limit(1)
    .single();

  if (lesson && lesson.video_id) {
    return (
      <VideoPlayer
        videoUrl={lesson.video_id} // Vercel Blob URL
        lessonId={lesson.id}
        onProgressUpdate={handleProgressUpdate}
        onComplete={handleLessonComplete}
      />
    );
  }

  // Handle errors gracefully
  if (error || !lesson) {
    return <p>Video not found</p>;
  }
}
```

---

## 🔄 実装フロー

1. **開発環境準備**
   - [ ] Vercel Token の取得と `.env.local` に追加
   - [ ] `@vercel/blob` パッケージのインストール
   - [ ] 管理者認証の実装（オプション）

2. **API ル下作成**
   - [ ] `src/app/api/admin/videos/upload/route.ts`
   - [ ] `src/app/api/videos/[video_id]/signed-url/route.ts` を更新

3. **コンポーネント更新**
   - [ ] `src/components/VideoPlayer.tsx` を更新

4. **管理画面追加**
   - [ ] 動画アップロードフォームの追加
   - [ ] 動画一覧画面の追加

5. **テスト**
   - ローカルで動画が再生される
   - 進捗が保存される
   - アップロード機能が動作する

---

## 📊 Vercel Blob Documentation

### 公式ドキュメント
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- [Vercel Blob SDK](https://www.npmjs.com/package/@vercel/blob)

### 主な API
- `put()` - ファイルのアップロード
- `head()` - ファイルのメタデータ取得
- `delete()` - ファイルの削除
- `list()` - ファイル一覧
- `copy()` - ファイルのコピー

---

## 💡 エラーハンドリング

### アップロード時
- ファイルサイズ制限: 25MB（プロジェクト全体で 500MB）
- ファイル形式: video/mp4, video/webm, video/ogg, video/quicktime
- レート制限: 認数制限

### トラブルシューティング
- **エラー**: "401 Unauthorized"
  - **原因**: Token が無効 or 権限違反
  - **解決**: Token を確認し、Scope を再確認
  - [ ] 管理者権限チェックの実装

- **エラー**: "413 Payload Too Large"
  - **原因**: ファイルサイズが大きすぎる
  - **解決**: ファイルサイズを確認、25MB以下に圧縮

---

## 📝 推奨されるファイル構成

### Vercel プロジェクトのバケット構成（例）：

```
portfolio-site/
  ├── videos/
  │   ├── course-1-introduction.mp4
  │   ├── course-1-lesson-1.mp4
  │   ├── course-1-lesson-2.mp4
│   └── ...
  └── thumbnails/
      ├── course-1-thumbnail.png
      └── ...
```

---

**作成日**: 2026-01-24
**担当**: Sisyphus
