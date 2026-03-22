'use client';

import { motion } from 'framer-motion';
import { skills, skillCategories, getProjectCountByTech } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const categoryColorMap: Record<string, string> = {
  frontend: 'bg-japan-indigo/10 text-japan-indigo border-japan-indigo/20',
  backend: 'bg-japan-charcoal/10 text-japan-charcoal border-japan-charcoal/20',
  'ai-ml': 'bg-japan-gold/10 text-japan-gold border-japan-gold/20',
  platform: 'bg-japan-violet/10 text-japan-violet border-japan-violet/20',
  tool: 'bg-japan-moss/10 text-japan-moss border-japan-moss/20',
};

export default function TechStackCloud() {
  const prefersReducedMotion = useReducedMotion();
  const projectCounts = getProjectCountByTech();

  // Sort by proficiency then name
  const sortedSkills = [...skills].sort((a, b) => b.proficiency - a.proficiency || a.name.localeCompare(b.name));

  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {skillCategories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className={`w-2.5 h-2.5 rounded-full ${categoryColorMap[cat.id].split(' ')[0]}`} />
            {cat.label}
          </div>
        ))}
      </div>

      {/* Cloud */}
      <div className="flex flex-wrap gap-2 justify-center">
        {sortedSkills.map((skill, index) => {
          const colors = categoryColorMap[skill.category] || categoryColorMap.frontend;
          const size = skill.proficiency >= 5 ? 'text-sm px-4 py-2' :
                       skill.proficiency >= 4 ? 'text-sm px-3 py-1.5' :
                       'text-xs px-3 py-1';

          return (
            <motion.span
              key={skill.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: index * 0.03 }}
              className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${colors} ${size}`}
            >
              {skill.nameJa || skill.name}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
