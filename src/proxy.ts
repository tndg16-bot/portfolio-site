import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  void request;
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  // Content Security Policy
  // Allows: Google Analytics/GTM, Vercel Analytics, Sentry, Supabase
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com https://*.vercel-scripts.com https://*.sentry.io",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://*.supabase.co https://www.google-analytics.com",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://va.vercel-scripts.com https://*.vercel-scripts.com https://*.supabase.co https://*.sentry.io",
    "frame-src 'none'",
    "frame-ancestors 'none'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, fonts
     * - Static assets (svg, png, jpg, jpeg, gif, webp, ico)
     * - /monitoring (Sentry tunnel route)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|monitoring|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
