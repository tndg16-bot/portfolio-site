"use client";

import { motion } from 'framer-motion';
import { User, Building2, Zap, ExternalLink, Github, ChevronRight } from 'lucide-react';
import { getProjectsByCategory } from '@/data/projects';
import type { Project } from '@/data/projects';
import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const isClickable = project.url || project.github;

  return (
    <div
      className={`glass-panel rounded-xl ${compact ? 'p-5' : 'p-6'} border border-border-default hover:border-border-emphasis hover:shadow-lg transition-all group`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={compact ? "text-3xl" : "text-4xl"}>{project.emoji}</div>
        <div className="flex items-center gap-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-surface-section rounded-full transition-colors"
              title="GitHubで見る"
            >
              <Github className="h-4 w-4 text-text-muted" />
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-surface-section rounded-full transition-colors"
              title="Webサイトを見る"
            >
              <ExternalLink className="h-4 w-4 text-text-muted" />
            </a>
          )}
        </div>
      </div>

      <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-text-strong mb-2 line-clamp-1`}>
        {project.title}
      </h3>
      <p className={`text-text-secondary ${compact ? 'text-sm' : ''} mb-3 line-clamp-2`}>
        {project.description}
      </p>

      {project.highlights && project.highlights.length > 0 && !compact && (
        <ul className="text-xs text-text-secondary mb-3 space-y-1">
          {project.highlights.slice(0, 2).map((highlight, i) => (
            <li key={i} className="flex items-start gap-1">
              <span className="text-japan-gold mt-0.5">✓</span>
              <span className="line-clamp-1">{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.techStack.slice(0, compact ? 3 : 4).map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 bg-surface-section text-text-primary rounded"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > (compact ? 3 : 4) && (
          <span className="text-xs px-2 py-0.5 bg-surface-section text-text-primary rounded">
            +{project.techStack.length - (compact ? 3 : 4)}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {project.status === 'live' && (
            <>
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-text-secondary">公開中</span>
            </>
          )}
          {project.status === 'development' && (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs text-text-secondary">開発中</span>
            </>
          )}
          {project.status === 'private' && (
            <>
              <span className="w-2 h-2 rounded-full bg-text-muted" />
              <span className="text-xs text-text-secondary">プライベート</span>
            </>
          )}
        </div>
        {isClickable && (
          <a
            href={project.url || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-strong hover:underline flex items-center gap-1"
          >
            詳細
            <ChevronRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function WorksCollection() {
  const prefersReducedMotion = useReducedMotion();
  const individualProjects = getProjectsByCategory('individual');
  const corporateProjects = getProjectsByCategory('corporate');
  const automationProjects = getProjectsByCategory('automation');

  const containerVariants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0 } : {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : {
        duration: 0.5,
      },
    },
  };

  const sections = [
    {
      id: 'individual',
      icon: User,
      iconBg: 'bg-japan-indigo',
      title: '個人向けサービス・ツール',
      subtitle: '副業設計・キャリア支援のためのプロダクト',
      projects: individualProjects,
      cols: 'md:grid-cols-2',
    },
    {
      id: 'corporate',
      icon: Building2,
      iconBg: 'bg-japan-gold',
      title: '法人向けサービス・ツール',
      subtitle: 'DX推進・業務効率化のためのインフラ',
      projects: corporateProjects,
      cols: 'md:grid-cols-2',
    },
    {
      id: 'automation',
      icon: Zap,
      iconBg: 'bg-japan-moss',
      title: '自動化ツール',
      subtitle: '開発効率化と業務自動化のための実用ツール',
      projects: automationProjects,
      cols: 'md:grid-cols-3',
    },
  ];

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <motion.section
          key={section.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`flex items-center justify-center w-10 h-10 ${section.iconBg} rounded-xl`}>
              <section.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-strong">{section.title}</h3>
              <p className="text-text-secondary text-sm">{section.subtitle}</p>
            </div>
          </div>

          <div className={`grid ${section.cols} gap-4`}>
            {section.projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard
                  project={project}
                  compact={section.id === 'automation'}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}

      {/* CTA */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? { duration: 0 } : undefined}
        className="text-center py-8"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-3 bg-japan-indigo text-white rounded-full hover:bg-japan-indigo/90 transition-all hover:scale-105 active:scale-95 shadow-xl"
        >
          すべてのプロジェクトを見る
          <ChevronRight className="h-5 w-5" />
        </Link>
      </motion.div>
    </div>
  );
}
