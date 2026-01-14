'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

export interface Testimonial {
  id: string;
  name: string;
  position?: string;
  company?: string;
  avatar?: string | { initials: string; imageUrl?: string };
  rating: number;
  text?: string;
  content?: string;
  project?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
  variant?: 'default' | 'compact';
}

export default function TestimonialCard({
  testimonial,
  index = 0,
  variant = 'default',
}: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={variant === 'compact' ? 14 : 16}
        className={i < rating ? 'fill-teal-400 text-teal-400' : 'text-zinc-700'}
      />
    ));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`glass-card rounded-2xl p-6 ${
        variant === 'compact' ? 'p-5' : 'p-8'
      } relative overflow-hidden group`}
      role="article"
    >
      {/* Decorative quote icon */}
      <Quote
        size={variant === 'compact' ? 32 : 48}
        className="absolute top-4 right-4 text-white/5 group-hover:text-teal-500/10 transition-colors"
      />

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        <div className="flex gap-1">{renderStars(testimonial.rating)}</div>
        <span className="text-zinc-500 text-sm ml-2">{testimonial.rating}/5</span>
      </div>

      {/* Text */}
      <blockquote className="text-zinc-300 leading-relaxed mb-6 relative z-10">
        <p className="text-base md:text-lg">{testimonial.text || testimonial.content}</p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        {testimonial.avatar && typeof testimonial.avatar === 'string' ? (
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <Image
              src={testimonial.avatar}
              alt={`${testimonial.name} avatar`}
              fill
              className="object-cover rounded-full border-2 border-teal-500/30 group-hover:border-teal-500/50 transition-colors"
              sizes="56px"
            />
          </div>
        ) : testimonial.avatar && typeof testimonial.avatar === 'object' && testimonial.avatar.imageUrl ? (
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <Image
              src={testimonial.avatar.imageUrl}
              alt={`${testimonial.name} avatar`}
              fill
              className="object-cover rounded-full border-2 border-teal-500/30 group-hover:border-teal-500/50 transition-colors"
              sizes="56px"
            />
          </div>
        ) : (
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            {testimonial.avatar && typeof testimonial.avatar === 'object' 
              ? testimonial.avatar.initials 
              : testimonial.name.charAt(0)}
          </div>
        )}

        <div className="flex-1">
          <h4 className="text-white font-bold text-base md:text-lg">{testimonial.name}</h4>
          <p className="text-zinc-500 text-sm">{testimonial.position}</p>
          <p className="text-teal-400 text-sm font-medium">{testimonial.company}</p>
        </div>
      </div>

      {/* Project tag */}
      {testimonial.project && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <span className="text-xs text-zinc-500">
            Project: <span className="text-zinc-300">{testimonial.project}</span>
          </span>
        </div>
      )}
    </motion.article>
  );
}
