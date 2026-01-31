/**
 * Simple Authentication System
 *
 * This file provides a simple authentication system using environment variables
 * for password verification and HTTP-only cookies for session management.
 */

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

// ============================================================================
// CONFIGURATION
// ============================================================================

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'default-secret-key-change-in-production'
);

const SESSION_COOKIE_NAME = 'admin_session';

// ============================================================================
// TYPES
// ============================================================================

export interface SessionPayload extends JWTPayload {
  authenticated: boolean;
  timestamp: number;
  [key: string]: unknown;
}

export interface AuthResult {
  success: boolean;
  message?: string;
}

// ============================================================================
// AUTHENTICATION FUNCTIONS
// ============================================================================

/**
 * Verify admin password from environment variable
 */
export async function verifyPassword(password: string): Promise<AuthResult> {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return {
      success: false,
      message: 'Admin password not configured',
    };
  }

  if (password === adminPassword) {
    return { success: true };
  }

  return {
    success: false,
    message: 'Invalid password',
  };
}

/**
 * Create a JWT session token
 */
export async function createSessionToken(): Promise<string> {
  const payload: SessionPayload = {
    authenticated: true,
    timestamp: Date.now(),
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify JWT session token
 */
export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const session = payload as unknown as SessionPayload;

    return session.authenticated === true;
  } catch (error) {
    return false;
  }
}

// ============================================================================
// COOKIE MANAGEMENT
// ============================================================================

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

/**
 * Delete session cookie
 */
export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Get session cookie
 */
export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

// ============================================================================
// AUTHENTICATION CHECKS
// ============================================================================

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionCookie();

  if (!token) {
    return false;
  }

  return verifySessionToken(token);
}

/**
 * Login user with password
 */
export async function login(password: string): Promise<AuthResult> {
  const verifyResult = await verifyPassword(password);

  if (!verifyResult.success) {
    return verifyResult;
  }

  const token = await createSessionToken();
  setSessionCookie(token);

  return { success: true };
}

/**
 * Logout user
 */
export function logout(): void {
  deleteSessionCookie();
}

/**
 * Require authentication (for API routes and server components)
 * Throws an error if not authenticated
 */
export async function requireAuth(): Promise<void> {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    throw new Error('Unauthorized');
  }
}

// ============================================================================
// MIDDLEWARE HELPERS
// ============================================================================

/**
 * Check if request is authorized (for API routes)
 */
export async function checkAuthorization(request: Request): Promise<boolean> {
  try {
    const cookieHeader = request.headers.get('cookie');

    if (!cookieHeader) {
      return false;
    }

    const cookies = cookieHeader.split(';').reduce<Record<string, string>>(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      },
      {}
    );

    const token = cookies[SESSION_COOKIE_NAME];

    if (!token) {
      return false;
    }

    return verifySessionToken(token);
  } catch (error) {
    return false;
  }
}

/**
 * Get unauthorized response
 */
export function unauthorizedResponse(): Response {
  return Response.json(
    { error: 'Unauthorized', message: 'Please login first' },
    { status: 401 }
  );
}
