import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, getFeaturedTestimonials, getTestimonialsByCategory, searchTestimonials } from '@/data/testimonials';

/**
 * GET /api/testimonials
 * Get all testimonials with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const rating = searchParams.get('rating');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    let testimonialList = getTestimonials();

    // Filter by category
    if (category && category !== 'all') {
      testimonialList = getTestimonialsByCategory(category);
    }

    // Filter by featured
    if (featured) {
      testimonialList = getFeaturedTestimonials();
    }

    // Filter by minimum rating
    if (rating) {
      const minRating = parseInt(rating);
      testimonialList = testimonialList.filter((t) => t.rating >= minRating);
    }

    // Search
    if (search) {
      testimonialList = searchTestimonials(search);
    }

    // Apply pagination
    const paginatedTestimonials = testimonialList.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      testimonials: paginatedTestimonials,
      total: testimonialList.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch testimonials',
      },
      { status: 500 }
    );
  }
}
