import type { MetadataRoute } from 'next';
import { allServicesR4 } from '@/data/r4/services';
import { worksR4 } from '@/data/r4/works';
import { SITE_R4 } from '@/data/r4/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_R4.url;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    { url: `${base}/about`, lastModified: now, priority: 0.9 },
    { url: `${base}/services`, lastModified: now, priority: 0.9 },
    { url: `${base}/works`, lastModified: now, priority: 0.8 },
    { url: `${base}/notes`, lastModified: now, priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, priority: 0.8 },
    ...allServicesR4.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...worksR4.map((w) => ({
      url: `${base}/works/${w.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
    { url: `${base}/legal/tokushoho`, lastModified: now, priority: 0.3 },
    { url: `${base}/legal/privacy`, lastModified: now, priority: 0.3 },
    { url: `${base}/legal/terms`, lastModified: now, priority: 0.3 },
  ];
}
