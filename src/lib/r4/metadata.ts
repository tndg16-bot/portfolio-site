/**
 * r4 共通メタデータ・OG ヘルパ
 * Source: T-403_metadata_templates_draft.md r4
 */
import type { Metadata } from 'next';
import { SITE_R4 } from '@/data/r4/site';

export function buildMetadata(opts: {
  title: string;
  description: string;
  path?: string;
  ogCategory?: 'default' | 'service' | 'case' | 'note' | 'about' | 'legal';
}): Metadata {
  const path = opts.path ?? '/';
  const canonical = `${SITE_R4.url}${path}`;
  const ogParams = new URLSearchParams({
    title: opts.title,
    category: opts.ogCategory ?? 'default',
  });
  const ogImage = `${SITE_R4.url}/api/og?${ogParams.toString()}`;
  return {
    title: opts.title,
    description: opts.description.slice(0, 158),
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: SITE_R4.locale,
      url: canonical,
      siteName: SITE_R4.name,
      title: opts.title,
      description: opts.description.slice(0, 158),
      images: [{ url: ogImage, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description.slice(0, 158),
      images: [ogImage],
    },
  };
}
