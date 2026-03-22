'use client';

import { motion } from 'framer-motion';
import { skillCategories, getSkillsByCategory } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const colorMap: Record<string, string> = {
  'japan-indigo': 'bg-japan-indigo',
  'japan-charcoal': 'bg-japan-charcoal',
  'japan-gold': 'bg-japan-gold',
  'japan-violet': 'bg-japan-violet',
  'japan-moss': 'bg-japan-moss',
};

export default function SkillBars() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-8">
      {skillCategories.map((category) => {
        const categorySkills = getSkillsByCategory(category.id);
        if (categorySkills.length === 0) return null;
        const barColor = colorMap[category.color] || 'bg-japan-indigo';

        return (
          <div key={category.id}>
            <h3 className="text-sm font-bold text-text-strong uppercase tracking-wider mb-4">
              {category.label}
            </h3>
            <div className="space-y-3">
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-sm text-text-primary w-36 shrink-0 truncate">
                    {skill.nameJa || skill.name}
                  </span>
                  <div className="flex-1 flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <motion.div
                        key={level}
                        className={`h-3 flex-1 rounded-sm ${
                          level <= skill.proficiency
                            ? barColor
                            : 'bg-surface-section'
                        }`}
                        initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                        whileInView={prefersReducedMotion ? {} : { scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={prefersReducedMotion ? { duration: 0 } : {
                          duration: 0.4,
                          delay: index * 0.05 + level * 0.05,
                        }}
                        style={{ transformOrigin: 'left' }}
                        role="progressbar"
                        aria-valuenow={skill.proficiency}
                        aria-valuemin={0}
                        aria-valuemax={5}
                        aria-label={`${skill.name}: ${skill.proficiency}/5`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
