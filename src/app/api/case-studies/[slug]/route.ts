import { NextRequest, NextResponse } from 'next/server';
import { getCaseStudyBySlug } from '@/data/case-studies';

/**
 * GET /api/case-studies/[slug]
 * Get specific case study by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const caseStudy = getCaseStudyBySlug(params.slug);

    if (!caseStudy) {
      return NextResponse.json(
        {
          success: false,
          error: 'Case study not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      caseStudy,
    });
  } catch (error) {
    console.error('Error fetching case study:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch case study',
      },
      { status: 500 }
    );
  }
}
