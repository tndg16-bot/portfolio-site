import { SITE_R4 } from '@/data/r4/site';

export function PersonSchemaR4() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '本山貴裕',
    alternateName: 'Motoyama Takahiro',
    url: SITE_R4.url,
    image: `${SITE_R4.url}/images/motoyama-profile.webp`,
    sameAs: [SITE_R4.sns.note, SITE_R4.sns.threads, SITE_R4.sns.x, SITE_R4.sns.linkedin, SITE_R4.sns.github],
    jobTitle: 'AI コンサルタント / AI 研修ファシリテーター',
    worksFor: { '@type': 'Organization', name: '株式会社パンハウス' },
    knowsAbout: ['AI 活用支援', '生成 AI 研修', 'AI 推進プロジェクト', 'カウンセリング型営業', '業務自動化'],
    address: { '@type': 'PostalAddress', addressLocality: '福岡市', addressRegion: '福岡県', addressCountry: 'JP' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_R4.url}/about` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
