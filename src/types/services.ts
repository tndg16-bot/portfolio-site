/**
 * Type definitions for Services and FAQs
 */

export interface SessionService {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  duration: string;
  durationMinutes: number;
  pricing: {
    type: 'fixed' | 'screening' | 'package';
    price: string | null;
    notes: string;
  };
  features: string[];
  idealFor: string[];
  notIdealFor?: string[];
  format: 'online' | 'in-person' | 'hybrid';
  frequency?: 'one-time' | 'series' | 'ongoing';
  popular?: boolean;
  tags: string[];
}

export interface Pricing {
  type: 'fixed' | 'screening' | 'package';
  price: string | null;
  notes: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

export interface ServiceFormat {
  id: string;
  name: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}
