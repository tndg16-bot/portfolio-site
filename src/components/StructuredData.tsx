'use client';

import { jsonLdPerson, jsonLdOrganization, jsonLdWebSite } from '@/lib/structured-data';

export function StructuredData() {
  return (
    <>
      {/* Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdPerson),
        }}
      />
      {/* Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdOrganization),
        }}
      />
      {/* WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdWebSite),
        }}
      />
    </>
  );
}
