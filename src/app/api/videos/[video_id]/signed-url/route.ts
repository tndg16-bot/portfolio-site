import { NextResponse } from 'next/server';

// NOTE: This API requires @cloudflare/video-js to be installed
// Install with: npm install @cloudflare/video-js
// Then update environment variables in .env.local:
// - CLOUDFLARE_ACCOUNT_ID
// - CLOUDFLARE_API_TOKEN

export async function GET(
  request: Request,
  { params }: { params: { video_id: string } }
) {
  try {
    const { video_id } = params;

    // NOTE: Cloudflare Stream integration requires package installation
    // The code below will work once @cloudflare/video-js is installed

    // Placeholder response for now
    return NextResponse.json(
      {
        error: 'Cloudflare Stream integration requires package installation',
        message: 'Install @cloudflare/video-js package and configure environment variables',
        video_id,
      },
      { status: 503 }
    );

    /* 
    // FULL IMPLEMENTATION (once @cloudflare/video-js is installed):

    import { createClient } from '@supabase/supabase-js';
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    // Verify user has access to this video (check enrollment)
    // For now, we'll generate a signed URL without enrollment check
    // In production, add AuthGuard to verify enrollment

    // Generate signed URL using Cloudflare API
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || '';
    const apiToken = process.env.CLOUDFLARE_API_TOKEN || '';

    const signedUrl = `https://customer.cloudflarestream.com/${accountId}/${video_id}/signed`;

    // Get video metadata
    const { data: videoMetadata, error } = await supabase
      .from('lessons')
      .select('video_duration')
      .eq('video_id', video_id)
      .single();

    return NextResponse.json({
      signed_url: signedUrl,
      duration: videoMetadata?.video_duration || 0,
      thumbnail: '', // Will be from Stream API
    });
    */

  } catch (error) {
    console.error('Signed URL generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate signed URL' },
      { status: 500 }
    );
  }
}
