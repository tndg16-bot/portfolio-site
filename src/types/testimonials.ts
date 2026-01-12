/**
 * Type definitions for Testimonials
 */

export interface Testimonial {
  id: string;
  name: string;
  position?: string;
  company?: string;
  avatar?: {
    initials: string;
    imageUrl?: string;
  };
  rating: number;
  content: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  category?: 'student' | 'professional' | 'teacher' | 'entrepreneur';
}
