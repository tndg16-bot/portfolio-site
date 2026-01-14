import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/posts';

export async function GET() {
    const allPosts = getSortedPostsData();
    // Get latest 3 posts
    const featuredPosts = allPosts.slice(0, 3);

    return NextResponse.json(featuredPosts);
}
