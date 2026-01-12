/**
 * Type definitions for Case Studies
 */

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  client: {
    name: string;
    logo?: string;
    industry: string;
  };
  category: 'learning' | 'business' | 'career' | 'personal';
  tags: string[];
  featured: boolean;
  thumbnail?: {
    image: string;
    alt: string;
  };
  stats?: Metric[];
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: TestimonialEmbed;
  date: string;
}

export interface Metric {
  key: string;
  value: string;
  description: string;
}

export interface TestimonialEmbed {
  quote: string;
  author: string;
  role: string;
}
