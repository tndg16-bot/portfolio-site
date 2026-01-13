'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Award, Clock } from 'lucide-react';
import Image from 'next/image';

export interface Metric {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  thumbnail: string;
  tags: string[];
  featuredMetrics: Metric[];
  slug: string;
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick?: () => void;
  index?: number;
}

export default function CaseStudyCard({ caseStudy, onClick, index = 0 }: CaseStudyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
      role="article"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' && onClick) onClick();
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={caseStudy.thumbnail}
          alt={`${caseStudy.title} project thumbnail`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Client & Industry */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-teal-400 font-medium">{caseStudy.client}</span>
          <span className="text-zinc-500">{caseStudy.industry}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-2">
          {caseStudy.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {caseStudy.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-zinc-300"
            >
              {tag}
            </span>
          ))}
          {caseStudy.tags.length > 3 && (
            <span className="px-3 py-1 text-xs font-medium bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400">
              +{caseStudy.tags.length - 3}
            </span>
          )}
        </div>

        {/* Featured Metrics */}
        {caseStudy.featuredMetrics && caseStudy.featuredMetrics.length > 0 && (
          <div className="flex gap-4 pt-2 border-t border-white/5">
            {caseStudy.featuredMetrics.slice(0, 2).map((metric, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {metric.icon || <TrendingUp size={16} className="text-teal-400" />}
                <div>
                  <p className="text-lg font-bold text-white">{metric.value}</p>
                  <p className="text-xs text-zinc-500">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="flex items-center gap-2 text-teal-400 font-medium text-sm mt-4"
          whileHover={{ gap: 8 }}
        >
          <span>View Case Study</span>
          <ArrowRight size={16} />
        </motion.div>
      </div>
    </motion.article>
  );
}
