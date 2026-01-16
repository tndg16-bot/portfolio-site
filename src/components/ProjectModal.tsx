'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Circle, Clock } from 'lucide-react';

interface Subtask {
    title: string;
    completed: boolean;
}

interface Project {
    name: string;
    status: 'not_started' | 'in_progress' | 'completed';
    description?: string;
    issueNumber?: number;
    issueUrl?: string;
    subtasks?: Subtask[];
    progress?: number;
}

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-2xl bg-white border border-japan-indigo/10 rounded-3xl p-6 shadow-2xl pointer-events-auto max-h-[85vh] overflow-y-auto scrollbar-custom">

                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-japan-indigo mb-2">{project.name}</h2>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className={`px-3 py-1 rounded-full border ${project.status === 'completed'
                                                ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                                                : project.status === 'in_progress'
                                                    ? 'bg-amber-100 border-amber-300 text-amber-700'
                                                    : 'bg-zinc-100 border-zinc-300 text-zinc-500'
                                            }`}>
                                            {project.status === 'completed' ? 'Completed' :
                                                project.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                                        </span>
                                        {project.progress !== undefined && (
                                            <span className="text-japan-indigo font-mono">
                                                {project.progress}% Complete
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-japan-indigo"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Description */}
                            {project.description && (
                                <p className="text-zinc-600 mb-8 leading-relaxed">
                                    {project.description}
                                </p>
                            )}

                            {/* Subtasks */}
                            {project.subtasks && project.subtasks.length > 0 ? (
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-japan-indigo mb-4 flex items-center gap-2">
                                        <Clock size={20} className="text-japan-indigo" />
                                        <span>Steps & Progress</span>
                                    </h3>
                                    {project.subtasks.map((task, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${task.completed
                                                    ? 'bg-emerald-50 border-emerald-100'
                                                    : 'bg-white border-zinc-100'
                                                }`}
                                        >
                                            <div className="mt-1">
                                                {task.completed ? (
                                                    <CheckCircle2 size={20} className="text-emerald-500" />
                                                ) : (
                                                    <Circle size={20} className="text-zinc-300" />
                                                )}
                                            </div>
                                            <span className={`${task.completed ? 'text-zinc-400 line-through' : 'text-zinc-700'}`}>
                                                {task.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-zinc-500 bg-zinc-50 rounded-xl border border-zinc-100">
                                    サブタスク情報はありません
                                </div>
                            )}

                            {/* Footer (Issue Link) */}
                            {(project.issueUrl || project.issueNumber) && (
                                <div className="mt-8 pt-6 border-t border-japan-indigo/5 flex justify-end">
                                    <a
                                        href={project.issueUrl ?? `https://github.com/tndg16-bot/papa/issues/${project.issueNumber}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-zinc-500 hover:text-japan-indigo transition-colors flex items-center gap-2"
                                    >
                                        GitHub Issue{project.issueNumber ? ` #${project.issueNumber}` : ''} を開く ↗
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
