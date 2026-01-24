/**
 * Login API Route
 *
 * POST /api/admin/auth/login
 * Body: { password: string }
 * Response: { success: boolean, message?: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Password is required' },
        { status: 400 }
      );
    }

    const result = await login(password);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Unauthorized', message: result.message },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Login failed' },
      { status: 500 }
    );
  }
}
