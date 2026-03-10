import React from 'react';

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

type ArticleJsonLdProps = {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  url: string;
  image: string | string[];
};

export const ArticleJsonLd: React.FC<ArticleJsonLdProps> = ({
  title,
  description,
  datePublished,
  dateModified,
  authorName = '本山貴裕',
  url,
  image,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: 'https://takahiro-motoyama.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: '本山貴裕',
      url: 'https://takahiro-motoyama.vercel.app',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return <JsonLd data={data} />;
};

export const PersonJsonLd: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '本山貴裕',
    url: 'https://takahiro-motoyama.vercel.app',
    jobTitle: 'Life Self-Determination Coach',
    description: '「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。',
    image: 'https://takahiro-motoyama.vercel.app/images/profile.jpg', // Assuming this exists or using default
    sameAs: [
      'https://www.linkedin.com/in/takahiro-motoyama/',
      // Add other social links
    ],
    knowsAbout: [
        "コーチング",
        "AI活用",
        "人生設計",
        "自己決定",
        "ライフコーチ",
        "キャリアデザイン"
    ]
  };

  return <JsonLd data={data} />;
};

export const OrganizationJsonLd: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '本山 貴裕 | Life Self-Determination Protocol',
    description: '「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。',
    url: 'https://takahiro-motoyama.vercel.app',
    logo: 'https://takahiro-motoyama.vercel.app/images/logo.png', // Assuming logo exists
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 't.ndg16@gmail.com',
        availableLanguage: 'Japanese'
    }
  };

  return <JsonLd data={data} />;
};

export const WebsiteJsonLd: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '本山 貴裕 | Life Self-Determination Protocol',
    description: '「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。',
    url: 'https://takahiro-motoyama.vercel.app',
  };

  return <JsonLd data={data} />;
};

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

export const BreadcrumbJsonLd: React.FC<BreadcrumbJsonLdProps> = ({ items }) => {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemListElement,
  };

  return <JsonLd data={data} />;
};

type FAQItem = {
  question: string;
  answer: string;
};

type FAQPageJsonLdProps = {
  faqs: FAQItem[];
};

export const FAQPageJsonLd: React.FC<FAQPageJsonLdProps> = ({ faqs }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
};

type ServiceJsonLdProps = {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  url?: string;
};

export const ServiceJsonLd: React.FC<ServiceJsonLdProps> = ({
  name,
  description,
  provider = '本山貴裕',
  areaServed = 'JP',
  url = 'https://takahiro-motoyama.vercel.app/services',
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Person',
      name: provider,
      url: 'https://takahiro-motoyama.vercel.app',
    },
    areaServed,
    url,
  };

  return <JsonLd data={data} />;
};
