"use client";

import { projectsMetadata } from "@/data/projects-metadata";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, ExternalLink } from "lucide-react";

const colorVariants: Record<string, { bg: string; text: string; border: string; iconBg: string; baseBg: string }> = {
    rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", iconBg: "bg-rose-100", baseBg: "bg-rose-100" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", iconBg: "bg-amber-100", baseBg: "bg-amber-100" },
    violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-100", iconBg: "bg-violet-100", baseBg: "bg-violet-100" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100", iconBg: "bg-purple-100", baseBg: "bg-purple-100" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", iconBg: "bg-blue-100", baseBg: "bg-blue-100" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100", iconBg: "bg-orange-100", baseBg: "bg-orange-100" },
    cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-100", iconBg: "bg-cyan-100", baseBg: "bg-cyan-100" },
    green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-100", iconBg: "bg-green-100", baseBg: "bg-green-100" },
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100", iconBg: "bg-indigo-100", baseBg: "bg-indigo-100" },
    pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-100", iconBg: "bg-pink-100", baseBg: "bg-pink-100" },
    yellow: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-100", iconBg: "bg-yellow-100", baseBg: "bg-yellow-100" },
    sky: { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-100", iconBg: "bg-sky-100", baseBg: "bg-sky-100" },
    fuchsia: { bg: "bg-fuchsia-50", text: "text-fuchsia-600", border: "border-fuchsia-100", iconBg: "bg-fuchsia-100", baseBg: "bg-fuchsia-100" },
};

export default function ProjectPage() {
    const params = useParams();
    const slug = params.slug as string;
    const project = projectsMetadata[slug];

    if (!project) {
        notFound();
    }

    const colors = colorVariants[project.iconColor] || colorVariants.indigo;

    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-20 text-japan-charcoal bg-[#FDFBF7]">
            <Header />

            <div className="fixed inset-0 pattern-seigaiha opacity-5 pointer-events-none z-0" />

            {/* Hero Section */}
            <section className="relative z-10 w-full max-w-4xl px-4 py-12 md:py-20 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <a href="/" className="group flex items-center gap-1 text-sm text-zinc-500 hover:text-japan-indigo transition-colors">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            ホームに戻る
                        </a>
                    </div>

                    <div className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl ${colors.baseBg} text-6xl shadow-lg border ${colors.border}`}>
                        {project.emoji}
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}>
                            {project.category.toUpperCase()}
                        </span>
                        {project.featured && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1">
                                Featured
                            </span>
                        )}
                    </div>

                    <h1 className="mb-6 text-4xl font-bold md:text-5xl text-japan-indigo leading-tight">
                        {project.title}
                    </h1>

                    <p className="mb-10 text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                        {project.description}
                    </p>

                    {project.links && project.links.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {project.links.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-12 items-center gap-2 rounded-full bg-japan-indigo px-8 text-base font-bold text-white transition-all hover:bg-japan-indigo/90 hover:scale-105 active:scale-95 shadow-lg group"
                                >
                                    {link.label}
                                    <ExternalLink size={18} className="transition-transform group-hover:translate-x-1" />
                                </a>
                            ))}
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Highlights Section */}
            <section className="relative z-10 w-full max-w-5xl px-4 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="glass-panel rounded-3xl p-8 md:p-12 border border-japan-indigo/10 shadow-xl bg-white/60"
                >
                    <div className="flex items-center gap-3 mb-8 border-b border-japan-indigo/5 pb-4">
                        <Cpu className="text-japan-indigo" size={28} />
                        <h2 className="text-2xl font-bold text-japan-indigo">機能・特徴</h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {project.highlights?.map((highlight, index) => (
                            <div key={index} className="flex gap-4 p-4 rounded-xl bg-white/50 border border-white hover:shadow-md transition-shadow">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-japan-indigo/10 text-japan-indigo">
                                    <CheckCircle2 className="h-4 w-4" />
                                </div>
                                <p className="text-zinc-700 font-medium leading-relaxed">{highlight}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

        </main>
    );
}
