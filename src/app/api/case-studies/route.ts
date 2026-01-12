import { NextRequest, NextResponse } from 'next/server';
import { getCaseStudies, getFeaturedCaseStudies, getCaseStudiesByCategory, searchCaseStudies } from '@/data/case-studies';

/**
 * GET /api/case-studies
 * Get all case studies with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    let studies = getCaseStudies();

    // Filter by category
    if (category && category !== 'all') {
      studies = getCaseStudiesByCategory(category);
    }

    // Filter by featured
    if (featured) {
      studies = getFeaturedCaseStudies();
    }

    // Search
    if (search) {
      studies = searchCaseStudies(search);
    }

    // Apply pagination
    const paginatedStudies = studies.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      caseStudies: paginatedStudies,
      total: studies.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch case studies',
      },
      { status: 500 }
    );
  }
}
