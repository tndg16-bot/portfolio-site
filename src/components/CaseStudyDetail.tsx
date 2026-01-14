'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Target, Lightbulb, Award, TrendingUp, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface Metric {
  label: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
}

export interface Testimonial {
  name: string;
  position: string;
  company: string;
  avatar?: string;
  rating: number;
  text: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  heroImage: string;
  tags: string[];
  challenge: string;
  solution: string;
  result: string;
  metrics: Metric[];
  testimonial?: Testimonial;
  technologies?: string[];
  duration?: string;
  role?: string;
}

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
  onBack?: () => void;
}

export default function CaseStudyDetail({ caseStudy, onBack }: CaseStudyDetailProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <CheckCircle2
        key={i}
        size={16}
        className={i < rating ? 'fill-teal-400 text-teal-400' : 'text-zinc-700'}
      />
    ));
  };

  return (
    <article className="min-h-screen" role="article">
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <Image
          src={caseStudy.heroImage}
          alt={`${caseStudy.title} hero image`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-teal-400 font-medium">{caseStudy.client}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {caseStudy.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-3">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {onBack && (
              <motion.button
                whileHover={{ x: -4 }}
                onClick={onBack}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mx-auto"
              >
                <ArrowLeft size={16} />
                <span className="text-sm">Back to all case studies</span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass-panel rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div>
            <p className="text-sm text-zinc-500 mb-1">Client</p>
            <p className="text-white font-medium">{caseStudy.client}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 mb-1">Industry</p>
            <p className="text-white font-medium">{caseStudy.industry}</p>
          </div>
          {caseStudy.duration && (
            <div>
              <p className="text-sm text-zinc-500 mb-1">Duration</p>
              <p className="text-white font-medium">{caseStudy.duration}</p>
            </div>
          )}
          {caseStudy.role && (
            <div>
              <p className="text-sm text-zinc-500 mb-1">Role</p>
              <p className="text-white font-medium">{caseStudy.role}</p>
            </div>
          )}
        </motion.div>

        {/* Technologies */}
        {caseStudy.technologies && caseStudy.technologies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-lg text-sm text-teal-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <Target className="text-amber-400" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">The Challenge</h2>
          </div>
          <div className="pl-14">
            <p className="text-zinc-300 text-lg leading-relaxed">{caseStudy.challenge}</p>
          </div>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl">
              <Lightbulb className="text-teal-400" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">The Solution</h2>
          </div>
          <div className="pl-14">
            <p className="text-zinc-300 text-lg leading-relaxed">{caseStudy.solution}</p>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <Award className="text-emerald-400" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">The Results</h2>
          </div>
          <div className="pl-14 space-y-6">
            <p className="text-zinc-300 text-lg leading-relaxed">{caseStudy.result}</p>

            {/* Metrics Grid */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.metrics.map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                        {metric.icon || <TrendingUp className="text-teal-400" size={20} />}
                      </div>
                      <span className="text-3xl font-bold text-white">{metric.value}</span>
                    </div>
                    <h4 className="text-white font-medium mb-1">{metric.label}</h4>
                    {metric.description && (
                      <p className="text-zinc-500 text-sm">{metric.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-panel rounded-2xl p-8"
          >
            <div className="flex items-start gap-4 mb-4">
              {caseStudy.testimonial.avatar && (
                <Image
                  src={caseStudy.testimonial.avatar}
                  alt={caseStudy.testimonial.name}
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-teal-500/30"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-1">
                    {renderStars(caseStudy.testimonial.rating)}
                  </div>
                </div>
                <h4 className="text-white font-bold">{caseStudy.testimonial.name}</h4>
                <p className="text-zinc-500 text-sm">
                  {caseStudy.testimonial.position} at {caseStudy.testimonial.company}
                </p>
              </div>
            </div>
            <blockquote className="text-zinc-300 text-lg italic leading-relaxed border-l-4 border-teal-500/30 pl-4">
              "{caseStudy.testimonial.text}"
            </blockquote>
          </motion.div>
        )}
      </section>
    </article>
  );
}
