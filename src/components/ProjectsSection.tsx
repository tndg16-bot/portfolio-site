"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Cpu, ExternalLink, Github, Lock, Sparkles, Target, Code2, Wrench, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import type { Project } from "@/app/api/projects-v2/route";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// カラーマッピング
const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-500/20' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500/20' },
  green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500/20' },
  rose: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-500/20' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-500/20' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-500/20' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500/20' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-500/20' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-500/20' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-500/20' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500/20' },
};

/**
 * GitHub APIからプロジェクトデータを取得
 */
async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects-v2');
    const data = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

// ステータスバッジ
function StatusBadge({ status }: { status: Project['status'] }) {
  switch (status) {
    case 'live':
      return <span className="text-green-600 text-sm font-medium">✅ 公開中</span>;
    case 'development':
      return <span className="text-blue-600 text-sm font-medium">🚧 開発中</span>;
    case 'private':
      return <span className="text-zinc-500 text-sm font-medium">🔒 プライベート</span>;
    case 'coming-soon':
      return <span className="text-amber-600 text-sm font-medium">🔜 近日公開</span>;
    default:
      return null;
  }
}

// カテゴリアイコン
function CategoryIcon({ category }: { category: Project['category'] }) {
  switch (category) {
    case 'main':
      return <Rocket size={16} />;
    case 'tool':
      return <Wrench size={16} />;
    case 'experiment':
      return <Code2 size={16} />;
    default:
      return <Cpu size={16} />;
  }
}

// プロジェクトカード
function ProjectCard({ project }: { project: Project }) {
  const color = colorMap[project.iconColor] || colorMap.blue;
  const isClickable = project.url || project.github;
  
  const CardWrapper = isClickable ? motion.a : motion.div;
  const cardProps = isClickable ? {
    href: project.url || project.github,
    target: "_blank",
    rel: "noopener noreferrer",
  } : {};

  return (
    <CardWrapper
      {...cardProps}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true }}
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`glass-panel group relative flex flex-col rounded-3xl p-8 border border-japan-indigo/10 hover:border-japan-indigo/30 transition-all duration-500 bg-white/60 ${isClickable ? 'cursor-pointer' : ''}`}
    >
      {/* アイコンバッジ */}
      <div className={`absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-md ${color.border} ${color.text} group-hover:scale-110 transition-transform duration-500`}>
        {project.featured ? <Sparkles size={24} /> : <Target size={24} />}
      </div>
      
      {/* Emoji */}
      <div className="text-4xl mb-4">{project.emoji}</div>
      
      {/* タイトル */}
      <h3 className="text-xl font-bold text-japan-indigo mb-2">{project.title}</h3>
      
      {/* 説明 */}
      <p className="text-zinc-600 text-sm mb-4 flex-grow line-clamp-3">
        {project.description}
      </p>
      
      {/* ハイライト */}
      {project.highlights && project.highlights.length > 0 && (
        <ul className="text-xs text-zinc-500 mb-4 space-y-1">
          {project.highlights.slice(0, 2).map((highlight, i) => (
            <li key={i} className="flex items-start gap-1">
              <span className="text-green-500 mt-0.5">✓</span>
              <span className="line-clamp-1">{highlight}</span>
            </li>
          ))}
        </ul>
      )}
      
      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, 3).map((tech, i) => (
          <span key={i} className={`text-xs ${color.bg} ${color.text} px-2 py-1 rounded-full`}>
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded-full">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
      
      {/* フッター */}
      <div className="flex items-center justify-between">
        <StatusBadge status={project.status} />
        {isClickable && (
          <div className="flex items-center text-japan-indigo text-sm font-medium group-hover:gap-3 transition-all">
            詳細を見る
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState<'all' | 'main' | 'tool'>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // コンポーネントマウント時にプロジェクトを取得
  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
      setLoading(false);
    }
    loadProjects();
  }, []);

  // フィルタリング
  const featuredProjects = projects.filter(p => p.featured);
  const mainProjects = projects.filter(p => p.category === 'main');
  const toolProjects = projects.filter(p => p.category === 'tool');

  const displayProjects = filter === 'all'
    ? featuredProjects
    : filter === 'main'
      ? mainProjects
      : toolProjects;

  return (
    <section id="section-projects" className="w-full max-w-7xl px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="text-center mb-16"
      >
        <motion.div variants={itemVariants} className="mb-4 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-japan-indigo/5 px-4 py-1 text-sm font-medium text-japan-indigo border border-japan-indigo/10">
            <Cpu size={16} />
            <span>Portfolio</span>
          </div>
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-4xl font-bold md:text-5xl text-japan-indigo mb-4">
          本山貴裕の作品集
        </motion.h2>
        <motion.p variants={itemVariants} className="text-zinc-500 text-lg max-w-2xl mx-auto mb-8">
          自己決定力を加速させるためのAIツール・アプリケーションを開発しています
        </motion.p>
        
        {/* フィルターボタン */}
        <motion.div variants={itemVariants} className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-japan-indigo text-white'
                : 'bg-japan-indigo/10 text-japan-indigo hover:bg-japan-indigo/20'
            }`}
          >
            ⭐ Featured
          </button>
          <button
            onClick={() => setFilter('main')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'main'
                ? 'bg-japan-indigo text-white'
                : 'bg-japan-indigo/10 text-japan-indigo hover:bg-japan-indigo/20'
            }`}
          >
            🚀 Main Products ({mainProjects.length})
          </button>
          <button
            onClick={() => setFilter('tool')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'tool'
                ? 'bg-japan-indigo text-white'
                : 'bg-japan-indigo/10 text-japan-indigo hover:bg-japan-indigo/20'
            }`}
          >
            🔧 Tools ({toolProjects.length})
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
      
      {/* 全プロジェクト数表示 */}
      <motion.p 
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 text-zinc-400 text-sm"
      >
        計 {mainProjects.length + toolProjects.length} プロジェクト開発中
      </motion.p>
    </section>
  );
}
