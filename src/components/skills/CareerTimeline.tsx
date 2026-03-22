'use client';

import { motion } from 'framer-motion';
import { careerMilestones } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const domainColors: Record<string, { bg: string; border: string; text: string }> = {
  finance: { bg: 'bg-japan-gold/10', border: 'border-japan-gold', text: 'text-japan-gold' },
  hr: { bg: 'bg-japan-moss/10', border: 'border-japan-moss', text: 'text-japan-moss' },
  ai: { bg: 'bg-japan-indigo/10', border: 'border-japan-indigo', text: 'text-japan-indigo' },
};

export default function CareerTimeline() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ol className="relative border-l-2 border-border-default ml-4 md:ml-0">
      {careerMilestones.map((milestone, index) => {
        const colors = domainColors[milestone.domain] || domainColors.ai;

        return (
          <motion.li
            key={milestone.id}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.15 }}
            className="mb-10 ml-8 last:mb-0"
          >
            {/* Circle node */}
            <div className={`absolute -left-[13px] w-6 h-6 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center`}>
              <div className={`w-2 h-2 rounded-full ${colors.border.replace('border-', 'bg-')}`} />
            </div>

            {/* Content */}
            <div className="bg-surface rounded-xl p-5 border border-border-default">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                  {milestone.year}
                </span>
                <span className="text-xs text-text-muted">{milestone.titleJa}</span>
              </div>

              <p className="text-text-secondary text-sm mb-3">{milestone.description}</p>

              {milestone.highlight && (
                <p className="text-text-strong text-sm font-medium mb-3">
                  {milestone.highlight}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {milestone.skills.map((skill) => (
                  <span key={skill} className="text-xs px-2 py-0.5 bg-surface-section text-text-primary rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
