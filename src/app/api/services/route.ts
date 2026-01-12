import { NextRequest, NextResponse } from 'next/server';
import { getAllServices, getServiceById, getServicesByTag, getServicesByFormat, getPopularServices } from '@/data/services';

/**
 * GET /api/services
 * Get all services with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const popular = searchParams.get('popular') === 'true';
    const format = searchParams.get('format');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let serviceList = getAllServices();

    // Filter by format
    if (format) {
      serviceList = getServicesByFormat(format);
    }

    // Filter by tag
    if (tag) {
      serviceList = getServicesByTag(tag);
    }

    // Filter by popular
    if (popular) {
      serviceList = getPopularServices();
    }

    // Apply pagination
    const paginatedServices = serviceList.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      services: paginatedServices,
      total: serviceList.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch services',
      },
      { status: 500 }
    );
  }
}
