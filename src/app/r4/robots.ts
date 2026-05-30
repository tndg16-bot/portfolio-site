import type { MetadataRoute } from 'next';
import { SITE_R4 } from '@/data/r4/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE_R4.url}/sitemap.xml`,
    host: SITE_R4.url,
  };
}
