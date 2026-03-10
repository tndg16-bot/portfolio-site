"use client";

import { motion } from 'framer-motion';
import { Code, Rocket, BookOpen, ExternalLink, Github, ChevronRight } from 'lucide-react';
import { getProjectsByCategory } from '@/data/projects';
import Link from 'next/link';

export default function WorksCollection() {
  const services = getProjectsByCategory('main');
  const tools = getProjectsByCategory('tool');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="space-y-12">
      {/* Services Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
            <Rocket className="h-6 w-6 bg-japan-indigo text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-japan-indigo">
              開発したサービス
            </h2>
            <p className="text-zinc-600 mt-1">
              実際に稼働中のプロダクトと実験的プロジェクト
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="glass-panel rounded-2xl p-6 border border-zinc-200 hover:border-japan-indigo/50 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{project.emoji}</div>
                <div className="flex items-center gap-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-japan-indigo/10 rounded-full transition-colors"
                      title="Webサイトを見る"
                    >
                      <ExternalLink className="h-4 w-4 text-japan-indigo" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-japan-indigo/10 rounded-full transition-colors"
                      title="GitHubで見る"
                    >
                      <Github className="h-4 w-4 text-japan-indigo" />
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="p-2 hover:bg-japan-indigo/10 rounded-full transition-colors group-hover:bg-japan-indigo group-hover:text-white"
                    title="詳細を見る"
                  >
                    <ChevronRight className="h-4 w-4 text-japan-indigo" />
                  </Link>
                </div>
              </div>

              <h3 className="text-xl font-bold text-japan-indigo mb-2 group-hover:text-japan-indigo transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-600 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.status === 'live' && (
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    Live
                  </span>
                )}
                {project.status === 'development' && (
                  <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                    開発中
                  </span>
                )}
                {project.status === 'coming-soon' && (
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tools Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
            <Code className="h-6 w-6 bg-japan-indigo text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-japan-indigo">
              作成したスキル・ツール
            </h2>
            <p className="text-zinc-600 mt-1">
              開発効率化と自動化のための実用ツール
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {tools.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="glass-panel rounded-xl p-5 border border-zinc-200 hover:border-japan-indigo/50 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{project.emoji}</div>
                <div className="flex items-center gap-1">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:bg-japan-indigo/10 rounded-full transition-colors"
                      title="GitHubで見る"
                    >
                      <Github className="h-3.5 w-3.5 text-japan-indigo" />
                    </a>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:bg-japan-indigo/10 rounded-full transition-colors"
                      title="詳細を見る"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-japan-indigo" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-japan-indigo mb-2 group-hover:text-japan-indigo transition-colors line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-600 mb-3 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {project.status === 'live' && (
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                    )}
                    {project.status === 'development' && (
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    )}
                    {project.status === 'private' && (
                      <span className="w-2 h-2 rounded-full bg-zinc-500" />
                    )}
                    <span className="text-xs text-zinc-500 capitalize">
                      {project.status === 'live' && 'Live'}
                      {project.status === 'development' && '開発中'}
                      {project.status === 'private' && 'プライベート'}
                      {project.status === 'coming-soon' && 'Coming Soon'}
                    </span>
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      className="text-xs text-japan-indigo hover:underline flex items-center gap-1"
                    >
                      詳細
                      <ChevronRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Learning Materials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl">
            <BookOpen className="h-6 w-6 bg-japan-indigo text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-japan-indigo">
              学習教材・コース
            </h2>
            <p className="text-zinc-600 mt-1">
              知識を体系的に学べる教育コンテンツ
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-8 border border-zinc-200">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.a
              href="/courses"
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl p-6 bg-japan-indigo text-white hover:shadow-2xl transition-all"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">AI副業コース</h3>
                <p className="bg-japan-indigo text-white/90 mb-4">
                  AI活用で副業を始めるための実践的ガイド
                </p>
                <div className="flex items-center gap-2 bg-japan-indigo text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm">コースを見る</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            </motion.a>

            <motion.a
              href="/learn"
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl p-6 bg-japan-indigo text-white hover:shadow-2xl transition-all"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">学習リソース</h3>
                <p className="bg-japan-indigo text-white/90 mb-4">
                  プログラミング・AI・ツール活用の学習ガイド
                </p>
                <div className="flex items-center gap-2 bg-japan-indigo text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm">リソースを見る</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            </motion.a>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-6 p-6 bg-zinc-50 rounded-xl border border-zinc-200"
          >
            <h4 className="font-semibold text-japan-indigo mb-4">学習カテゴリー</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: '🤖', label: 'AI活用', color: 'bg-violet-100 text-violet-700' },
                { icon: '💻', label: 'プログラミング', color: 'bg-blue-100 text-blue-700' },
                { icon: '📝', label: 'ライティング', color: 'bg-green-100 text-green-700' },
                { icon: '🎯', label: '生産性', color: 'bg-amber-100 text-amber-700' },
              ].map((category) => (
                <Link
                  key={category.label}
                  href="/learn"
                  className={`flex items-center gap-2 p-3 rounded-lg ${category.color} hover:opacity-80 transition-opacity`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-sm font-medium">{category.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-12"
      >
        <h3 className="text-2xl font-bold text-japan-indigo mb-4">
          プロジェクトをもっと詳しく見る
        </h3>
        <p className="text-zinc-600 mb-6 max-w-2xl mx-auto">
          すべてのプロジェクトの詳細、技術スタック、開発ストーリーを確認できます
        </p>
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
