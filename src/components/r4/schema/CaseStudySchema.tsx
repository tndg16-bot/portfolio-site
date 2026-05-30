import type { WorkR4 } from '@/data/r4/works';
import { SITE_R4 } from '@/data/r4/site';

export function CaseStudySchemaR4({ work }: { work: WorkR4 }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${work.industry}の${work.role}`,
    description: work.challenge.slice(0, 150),
    url: `${SITE_R4.url}/works/${work.slug}`,
    datePublished: `${work.yearMonth}-01`,
    author: { '@type': 'Person', name: '本山貴裕', url: `${SITE_R4.url}/about` },
    publisher: { '@type': 'Person', name: '本山貴裕', url: SITE_R4.url },
    about: { '@type': 'Thing', name: `${work.industry}の AI 活用事例` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_R4.url}/works/${work.slug}` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
