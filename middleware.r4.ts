import { NextResponse, type NextRequest } from 'next/server';

/**
 * r4 middleware: 旧 URL → /about?section=X 301 + プレビュー noindex
 * Source: T-301 r4
 */
const LEGACY_TO_SECTION: Record<string, string> = {
  '/philosophy': 'philosophy',
  '/values': 'values',
  '/mission': 'mission',
};

const LEGACY_TO_PATH: Record<string, string> = {
  '/sessions': '/services?audience=individual',
  '/useful-info': '/notes',
};

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 旧 URL: /philosophy → /about?section=philosophy
  const section = LEGACY_TO_SECTION[pathname];
  if (section) {
    const url = req.nextUrl.clone();
    url.pathname = '/about';
    url.searchParams.set('section', section);
    return NextResponse.redirect(url, 301);
  }

  // 旧 URL: /sessions, /useful-info
  const legacyPath = LEGACY_TO_PATH[pathname];
  if (legacyPath) {
    const url = req.nextUrl.clone();
    const [path, query] = legacyPath.split('?');
    url.pathname = path;
    url.search = query ? `?${query}` : '';
    return NextResponse.redirect(url, 301);
  }

  // プレビュー環境: X-Robots-Tag noindex
  const response = NextResponse.next();
  if (process.env.VERCEL_ENV !== 'production') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export const config = {
  matcher: [
    '/philosophy',
    '/values',
    '/mission',
    '/sessions',
    '/useful-info',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
