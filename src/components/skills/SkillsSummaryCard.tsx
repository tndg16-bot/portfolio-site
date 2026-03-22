'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getFeaturedSkills } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const categoryColorMap: Record<string, string> = {
  frontend: 'bg-japan-indigo',
  backend: 'bg-japan-charcoal',
  'ai-ml': 'bg-japan-gold',
  platform: 'bg-japan-violet',
  tool: 'bg-japan-moss',
};

export default function SkillsSummaryCard() {
  const prefersReducedMotion = useReducedMotion();
  const featured = getFeaturedSkills();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
      className="bg-surface rounded-2xl p-6 md:p-8 border border-border-default"
    >
      <h3 className="text-xl font-bold text-text-strong mb-4">スキル・技術スタック</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {featured.map((skill) => {
          const barColor = categoryColorMap[skill.category] || 'bg-japan-indigo';
          return (
            <div key={skill.id} className="flex items-center gap-2">
              <span className="text-sm text-text-primary truncate flex-1">
                {skill.nameJa || skill.name}
              </span>
              <div className="flex gap-0.5 shrink-0">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-2 h-2 rounded-full ${
                      level <= skill.proficiency ? barColor : 'bg-surface-section'
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href="/skills"
        className="inline-flex items-center gap-1 text-text-strong font-medium text-sm hover:gap-2 transition-all group"
      >
        すべてのスキルを見る
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}
