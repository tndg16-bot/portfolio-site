import { NextResponse } from 'next/server';
import { getContentStatus, getScheduledPosts } from '@/lib/posts';

export async function GET() {
    try {
        const status = getContentStatus();
        const scheduledPosts = getScheduledPosts();

        return NextResponse.json({
            success: true,
            ...status,
            scheduledPosts: scheduledPosts.map(post => ({
                id: post.id,
                title: post.title,
                date: post.date,
                category: post.category,
            })),
        });
    } catch (error) {
        console.error('Error fetching content status:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch content status',
        }, { status: 500 });
    }
}
