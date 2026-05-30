import type { ServiceR4 } from '@/data/r4/services';
import { SITE_R4 } from '@/data/r4/site';

export function ServiceSchemaR4({ service }: { service: ServiceR4 }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: service.name,
    description: service.shortDescription,
    url: `${SITE_R4.url}/services/${service.slug}`,
    provider: { '@type': 'Person', name: '本山貴裕', url: `${SITE_R4.url}/about` },
    areaServed: { '@type': 'Country', name: 'JP' },
    serviceType: service.audience === 'business' ? 'AI Consulting (B2B)' : 'AI Coaching (B2C)',
    audience: {
      '@type': 'Audience',
      audienceType: service.audience === 'business' ? '法人' : '個人',
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
