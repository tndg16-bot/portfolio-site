import { NextRequest, NextResponse } from 'next/server';
import { getAllFAQs, getFAQsByCategory, searchFAQs } from '@/data/faqs';

/**
 * GET /api/faqs
 * Get all FAQs with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let faqList = getAllFAQs();

    // Filter by category
    if (category && category !== 'all') {
      faqList = getFAQsByCategory(category);
    }

    // Search
    if (search) {
      faqList = searchFAQs(search);
    }

    // Apply pagination
    const paginatedFAQs = faqList.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      faqs: paginatedFAQs,
      total: faqList.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch FAQs',
      },
      { status: 500 }
    );
  }
}
