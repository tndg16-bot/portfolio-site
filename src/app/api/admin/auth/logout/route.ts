/**
 * Logout API Route
 *
 * POST /api/admin/auth/logout
 * Response: { success: boolean }
 */

import { NextResponse } from 'next/server';
import { logout } from '@/lib/auth';

export async function POST() {
  try {
    logout();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Logout failed' },
      { status: 500 }
    );
  }
}
