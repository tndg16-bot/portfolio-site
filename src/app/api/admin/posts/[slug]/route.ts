/**
 * Individual Blog Post API Route
 *
 * GET /api/admin/posts/[slug] - Get a specific post
 * PUT /api/admin/posts/[slug] - Update a post
 * DELETE /api/admin/posts/[slug] - Delete a post
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkAuthorization, unauthorizedResponse } from '@/lib/auth';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostResponse, UpdatePostRequest, SuccessResponse, ErrorResponse } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

// Helper: Find file by slug
function findFilePath(slug: string): string | null {
  const fileNames = fs.readdirSync(postsDirectory);

  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const fileSlug = matterResult.data.slug || fileName.replace(/\.md$/, '');

    if (fileSlug === slug) {
      return fullPath;
    }
  }

  return null;
}

// ============================================================================
// GET - Get a specific post
// ============================================================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    if (!(await checkAuthorization(request))) {
      return unauthorizedResponse();
    }

    const { slug } = await params;

    // Find file
    const filePath = findFilePath(slug);
    if (!filePath) {
      const errorResponse: ErrorResponse = {
        error: 'Not Found',
        message: 'Post not found',
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    // Read file
    const fileContents = fs.readFileSync(filePath, 'utf8');
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

    const postSlug = data.slug || slug;

    const post = {
      id: postSlug,
      slug: postSlug,
      title: data.title,
      date: data.date,
      description: data.description,
      category: data.category,
      tags: data.tags,
      published: data.published !== false,
      content: matterResult.content,
    };

    const response: PostResponse = { post };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// ============================================================================
// PUT - Update a post
// ============================================================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    if (!(await checkAuthorization(request))) {
      return unauthorizedResponse();
    }

    const { slug } = await params;
    const body: UpdatePostRequest = await request.json();

    // Find existing file
    const filePath = findFilePath(slug);
    if (!filePath) {
      const errorResponse: ErrorResponse = {
        error: 'Not Found',
        message: 'Post not found',
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    // Read existing file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);
    const existingData = matterResult.data as {
      date: string;
      title: string;
      description?: string;
      category?: string;
      tags?: string[];
      published?: boolean;
      slug?: string;
    };

    // Update fields
    const newData = {
      date: body.date ?? existingData.date,
      title: body.title ?? existingData.title,
      description: body.description ?? existingData.description,
      category: body.category ?? existingData.category,
      tags: body.tags ?? existingData.tags,
      published: body.published ?? (existingData.published !== false),
      slug: body.slug ?? existingData.slug ?? slug,
    };

    // If slug changed, create new file and delete old one
    const newSlug = newData.slug;
    const newFilePath = path.join(postsDirectory, `${newSlug}.md`);

    if (newSlug !== slug) {
      // Check if new slug already exists
      if (fs.existsSync(newFilePath) && newFilePath !== filePath) {
        const errorResponse: ErrorResponse = {
          error: 'Conflict',
          message: 'Post with new slug already exists',
        };
        return NextResponse.json(errorResponse, { status: 409 });
      }

      // Delete old file
      fs.unlinkSync(filePath);
    }

    // Write updated file
    const fileContent = matter.stringify(body.content ?? matterResult.content, newData);
    fs.writeFileSync(newFilePath, fileContent, 'utf8');

    const response: SuccessResponse = {
      success: true,
      message: 'Post updated successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// ============================================================================
// DELETE - Delete a post
// ============================================================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    if (!(await checkAuthorization(request))) {
      return unauthorizedResponse();
    }

    const { slug } = await params;

    // Find file
    const filePath = findFilePath(slug);
    if (!filePath) {
      const errorResponse: ErrorResponse = {
        error: 'Not Found',
        message: 'Post not found',
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    // Delete file
    fs.unlinkSync(filePath);

    const response: SuccessResponse = {
      success: true,
      message: 'Post deleted successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
