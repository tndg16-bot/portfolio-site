/**
 * Blog Posts API Route
 *
 * GET /api/admin/posts - List all posts
 * POST /api/admin/posts - Create a new post
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkAuthorization, unauthorizedResponse } from '@/lib/auth';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostListResponse, CreatePostRequest, SuccessResponse } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

// ============================================================================
// GET - List all posts
// ============================================================================
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!(await checkAuthorization(request))) {
      return unauthorizedResponse();
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const tag = searchParams.get('tag') || undefined;
    const published = searchParams.get('published');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Get all files
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames.map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const data = matterResult.data as {
        date: string;
        title: string;
        description?: string;
        category?: string;
        tags?: string[];
        published?: boolean;
        slug?: string;
      };

      const slug = data.slug || fileName.replace(/\.md$/, '');

      return {
        id: slug,
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        category: data.category,
        tags: data.tags,
        published: data.published !== false, // Default to true if not set
      };
    });

    // Filter posts
    let filteredPosts = posts;

    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.description?.toLowerCase().includes(searchLower)
      );
    }

    if (category) {
      filteredPosts = filteredPosts.filter((post) =>
        post.category === category
      );
    }

    if (tag) {
      filteredPosts = filteredPosts.filter((post) =>
        post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    }

    if (published !== null && published !== undefined) {
      const isPublished = published === 'true';
      filteredPosts = filteredPosts.filter((post) =>
        post.published === isPublished
      );
    }

    // Sort by date (newest first)
    filteredPosts.sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });

    // Paginate
    const total = filteredPosts.length;
    const startIndex = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

    const response: PostListResponse = {
      posts: paginatedPosts,
      total,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// ============================================================================
// POST - Create a new post
// ============================================================================
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!(await checkAuthorization(request))) {
      return unauthorizedResponse();
    }

    const body: CreatePostRequest = await request.json();

    // Validate required fields
    if (!body.slug || !body.title || !body.date || !body.content) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const filePath = path.join(postsDirectory, `${body.slug}.md`);
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Conflict', message: 'Post with this slug already exists' },
        { status: 409 }
      );
    }

    // Create frontmatter
    const frontmatter = {
      date: body.date,
      title: body.title,
      description: body.description || '',
      category: body.category,
      tags: body.tags || [],
      published: body.published !== false, // Default to true
      slug: body.slug,
    };

    // Write file
    const fileContent = matter.stringify(body.content, frontmatter);
    fs.writeFileSync(filePath, fileContent, 'utf8');

    const response: SuccessResponse = {
      success: true,
      message: 'Post created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to create post' },
      { status: 500 }
    );
  }
}
