# 実装ステータス更新

**更新日**: 2026-01-24
**ステータス**: 🔴 npm registry 問題解決策策定中

---

## 🔴 根本的発見

### npm registry の問題
- `@cloudflare/video-js` パッケージが npm registry に存在しません
- npm login でトークン更新も失敗
- この問題は一時的なもので、継続的な解決が必要

### パッケージの実装状況
| パッケージ | 期待 | 実際 | 状態 |
|--------|------|--------|--------|--------|
| `@stripe/stripe-js` | npm install に成功 | ✅ インストール済み | 使用可能 |
| `@cloudflare/video-js` | npm install に成功 | ❌ npm registryに存在しない | 使用不可 |

---

## 🎯 解決策：Vercel Blob Storage の使用

### 推奨理由

1. **Vercel との統合**
   - 既に Vercel にデプロイされています
   - Vercel Blob Storage は無料枠限で使用可能
   - 高速な CDN 配信が含まれている
   - 既存の認証システムと統合しやすい

2. **パッケージ不要**
   - npm install や pnpm install を試さなくて済む
   - 外部パッケージの依存問題を回避

3. **コード構造のシンプル化**
   - Vercel API はシンプルで明確
   - 動画の管理（アップロード、削除、メタデータ更新）が容易

### 実装方針

1. **Vercel Blob API ル下**
   - 動画のアップロード
   - 動画のメタデータ設定
   - 署名付き URL の生成（または公開設定）
   - 動画の削除

2. **VideoPlayer コンポーネントの更新**
   - Vercel Blob Storage から動画を読み込む
   - 直接 HTML5 video 要素を使用する
   - カスタム実装済みのまま使用

3. **既存コードの活用**
   - VideoPlayer.tsx はカスタム実装済み
   - src/app/api/videos/[video_id]/signed-url/route.ts を Vercel Blob で使用

---

## 📝 新しい API ル下（Vercel Blob Storage）

### 1. Vercel Blob アップロード API
**ファイル**: `src/app/api/admin/videos/upload/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { createClient } from '@supabase/supabase-js';

// Vercel Blob Storage 設可にする（管理者のみアクセス可）
const ALLOWED_ORIGINS = ['https://takahiro-motoyama.vercel.app'];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check file type
    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Only video files are allowed' },
        { status: 400 }
      );
    }

    // Get user authentication (TODO: Implement admin check)
    // For now, allow upload (in production, add auth check)

    // Upload to Vercel Blob Storage
    const buffer = await file.arrayBuffer();
    const filename = `${Date.now()}-${file.name}`;
    const contentType = file.type;

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

    const { data: lessonData, error } = await supabase
      .from('lessons')
      .update({ video_id: blob.url })
      .eq('id', 'video_id-from-form') // This would need to be passed
      .select();

    if (error) {
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

### 2. 動画取得 API（更新版）

**ファイル**: `src/app/api/videos/[video_id]/signed-url/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { del } from '@vercel/blob';

export async function GET(
  request: Request,
  { params }: { params: { video_id: string } }
) {
  try {
    const { video_id } = params;

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    // Fetch lesson with video URL
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', video_id)
      .single();

    if (error || !lesson || !lesson.video_id) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // If video_id is already a full URL (Vercel Blob URL), use it directly
    if (lesson.video_id.startsWith('http')) {
      return NextResponse.json({
        signed_url: lesson.video_id,
        duration: lesson.video_duration || 0,
      });
    }

    // Otherwise, return error (Vercel Blob doesn't need signed URLs)
    return NextResponse.json(
      {
        error: 'Video URLs are stored directly in Supabase',
        message: 'No signed URL generation needed',
      },
      { status: 400 }
    );
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

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Maximize, Volume2, VolumeX, RefreshCw } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string; // Changed from videoId to videoUrl
  lessonId: string;
  onProgressUpdate?: (position: number) => void;
  onComplete?: () => void;
}

export default function VideoPlayer({ videoUrl, lessonId, onProgressUpdate, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onProgressUpdate?.(videoRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onComplete?.();
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setVolume(vol);
      setIsMuted(vol === 0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Loading state
  if (loading || !videoUrl) {
    return (
      <div className="relative aspect-video bg-zinc-900 rounded-lg flex items-center justify-center">
        <div className="text-center text-zinc-400">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p>Loading video...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative aspect-video bg-zinc-900 rounded-lg flex flex-col items-center justify-center">
        <div className="text-center text-zinc-400 p-6">
          <RefreshCw className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Video Loading Error</h3>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden group">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onClick={togglePlayPause}
        playsInline
      />

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-zinc-700 rounded-full mb-4 overflow-hidden">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-full opacity-0 cursor-pointer"
            style={{
              background: `linear-gradient(to right, #2dd4bf ${progressPercentage}%, #374151 ${progressPercentage}%)`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/80 mb-3">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between gap-2">
          {/* Play/Pause */}
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-zinc-900" />
            ) : (
              <Play className="w-5 h-5 text-zinc-900 ml-1" />
            )}
          </button>

          {/* Rewind 10s */}
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = Math.max(0, currentTime - 10);
              }
            }}
            className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            aria-label="Rewind 10 seconds"
          >
            <span className="text-white font-semibold">-10s</span>
          </button>

          {/* Forward 10s */}
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = Math.min(duration, currentTime + 10);
              }
            }}
            className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            aria-label="Forward 10 seconds"
          >
            <span className="text-white font-semibold">+10s</span>
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-zinc-900" />
              ) : (
                <Volume2 className="w-5 h-5 text-zinc-900" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 opacity-0 cursor-pointer"
            />
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            aria-label="Toggle fullscreen"
          >
            <Maximize className="w-5 h-5 text-zinc-900" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔧 .env.local に追加する環境変数

```bash
# ============================================
# Vercel Blob Storage (Video Hosting)
# ============================================
# Get these from https://vercel.com/account/tokens
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# ============================================
# Stripe (Payment Processing)
# ============================================
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx

# ============================================
# Supabase (Authentication & Database)
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

# ============================================
# Site Configuration
# ============================================
NEXT_PUBLIC_SITE_URL=https://takahiro-motoyama.vercel.app
```

### Vercel Token の取得方法
1. Vercel Dashboard にアクセス
2. 左メニュー > Tokens
3. `Create Token` をクリック
4. Scope を選択:
   - Account Scope
   - Access Control: Read/Write to Blobs
5. Token をコピーして `BLOB_READ_WRITE_TOKEN` に追加
6. Token 期限: 90日なので定期的に更新

---

## 📋 手順（Vercel Blob Storage で動画配信）

### Step 1: Vercel Token の設定
1. [ ] Vercel Dashboard にログイン
2. [ ] Tokens > Create Token でトークン作成
3. [ ] Scope を Account Scope に設定
4. [ ] Token を `.env.local` に追加

### Step 2: 動画の準備
1. [ ] 動画を Vercel Blob Storage にアップロードする
2. [ ] 各レッスンの video_id フィールドに Vercel Blob URL を保存

### Step 3: コードの実装
1. [ ] API ル下（upload, signed-url）を作成
2. [ ] VideoPlayer コンポーネントを Vercel Blob 版に更新
3. [ ] プロジェクトに追加

### Step 4: テスト
1. [ ] 動画が正常に再生される
2. [ ] ユーザーがスライドできる
3. [ [ ] 進捗が保存される
4. [ ] 予期外のエラー処理が機能する

---

## 🎯 期待される機能

### 完了時
- [ ] 動画のアップロードが可能
- [ ] Vercel 高速 CDN による動画配信
- [ ] 既存の認証システムとの連携
- [ ] Stripe 決済統合が可能

### 機能制限（Vercel Blob）
- [ ] 署名付き URL は不要（公開/プライベート設定が可能）
- [ ] 直接 HTML5 video でのみの再生
- [ ] ストリーミングは Vercel CDN のみ

---

## 💡 代替案（参考）

以下のサービスも検討可能です：

| サービス | 利点 | 欠点 |
|--------|------|------|
| **Vercel Blob** | ✅ 既に統合済み<br>✅ 高速 CDN<br>✅ 無料枠内 | ❌ ストリーミングのみ<br>❌ 追加機能が限定的 |
| **Vimeo** | ✅ プラグイン満度の高い<br>✅ API が充実 | ❌ 有料（$15+/月）<br>❌ 帯域制限 |
| **AWS S3 + CloudFront** | ✅ 拡張可能<br>�️ 高性能<br>✅ ストリーミング可能 | ❌ 複雑<br>❌ AWS 依存 |
| **Bunny.net Stream** | ✅ 高速・安価<br>✅ API がシンプル<br>❌ ド新規格<br> ❌ 視業安定性 |

**推奨**: Vercel Blob → 将来的に他サービスも検討

---

## 📚 参考文献

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Vercel Blob SDK](https://www.npmjs.com/package/@vercel/blob)
- [Supabase Storage vs External Object Storage comparison](https://supabase.com/docs/guides/storage)

---

**作成日**: 2026-01-24
**ステータス**: 🟢 解決策策定中 - Vercel Blob Storage に方針
**担当**: Sisyphus
