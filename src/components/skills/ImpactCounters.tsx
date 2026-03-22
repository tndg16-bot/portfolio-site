'use client';

import { motion } from 'framer-motion';
import { Clock, Zap, Users, Code, Briefcase, FileText } from 'lucide-react';
import { impactMetrics } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock, Zap, Users, Code, Briefcase, FileText,
};

export default function ImpactCounters() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {impactMetrics.map((metric, index) => {
        const Icon = iconMap[metric.icon] || Code;
        return (
          <motion.div
            key={metric.id}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
            className="bg-surface rounded-2xl p-6 border border-border-default text-center"
          >
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-xl bg-japan-gold/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-japan-gold" aria-hidden="true" />
              </div>
            </div>
            <div
              className="text-3xl md:text-4xl font-bold text-japan-gold mb-1"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {metric.value}
            </div>
            <div className="text-sm font-medium text-text-primary mb-1">{metric.label}</div>
            <div className="text-xs text-text-muted">{metric.description}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
