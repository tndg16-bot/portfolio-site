'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard, { Testimonial } from './TestimonialCard';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  cardsPerView?: number;
  className?: string;
}

export default function TestimonialSlider({
  testimonials,
  autoScroll = true,
  autoScrollInterval = 5000,
  showDots = true,
  showArrows = true,
  cardsPerView = 1,
  className = '',
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    if (!autoScroll) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [currentIndex, autoScroll, autoScrollInterval]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) return testimonials.length - 1;
      if (newIndex >= testimonials.length) return 0;
      return newIndex;
    });
  }, [testimonials.length]);

  const nextSlide = () => paginate(1);
  const prevSlide = () => paginate(-1);

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      nextSlide();
    } else if (swipe > swipeConfidenceThreshold) {
      prevSlide();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [testimonials.length]);

  return (
    <div className={`relative ${className}`} role="region" aria-label="Testimonials">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="w-full"
          role="listitem"
          aria-roledescription="slide"
          aria-label={`Testimonial ${currentIndex + 1} of ${testimonials.length}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {testimonials
              .slice(currentIndex, currentIndex + cardsPerView)
              .map((testimonial, idx) => (
                <TestimonialCard
                  key={`${currentIndex}-${idx}`}
                  testimonial={testimonial}
                  variant={cardsPerView > 1 ? 'compact' : 'default'}
                />
              ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {showArrows && testimonials.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 p-3 glass-card rounded-full hover:bg-white/10 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 p-3 glass-card rounded-full hover:bg-white/10 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-white" />
          </motion.button>
        </>
      )}

      {/* Dots */}
      {showDots && testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial pagination">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-teal-400 w-8'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
              aria-selected={idx === currentIndex}
              role="tab"
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 to-purple-500"
          initial={{ width: '0%' }}
          animate={{
            width: '0%',
            transition: {
              duration: autoScrollInterval / 1000,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
          style={{ display: autoScroll ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
}
