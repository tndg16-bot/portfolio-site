"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Circle, TrendingUp, Activity, ChevronRight, Github } from "lucide-react";
import ProjectModal from "./ProjectModal";

interface Subtask {
    title: string;
    completed: boolean;
}

interface Project {
    name: string;
    repoName?: string;
    status: "not_started" | "in_progress" | "completed";
    description?: string;
    issueNumber?: number;
    issueUrl?: string;
    subtasks?: Subtask[];
    progress?: number;
}

interface Stats {
    total: number;
    inProgress: number;
    completed: number;
    notStarted: number;
}

interface ActivityItem {
    date: string;
    message: string;
    type: "milestone" | "update" | "completed";
    repoName?: string;
}

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, inProgress: 0, completed: 0, notStarted: 0 });
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [dataSource, setDataSource] = useState<string>("");

    // Modal state
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const [projectsRes, activitiesRes] = await Promise.all([
                    fetch("/api/projects"),
                    fetch("/api/activities"),
                ]);

                const projectsData = await projectsRes.json();
                const activitiesData = await activitiesRes.json();

                if (projectsData.success) {
                    setProjects(projectsData.projects);
                    setStats(projectsData.stats);
                    setLastUpdated(projectsData.lastUpdated);
                    setDataSource(projectsData.source || "github-issues");
                    setError(null);
                } else {
                    setError(projectsData.error || "データの取得に失敗しました");
                    console.error("Projects API error:", projectsData.error);
                }

                if (activitiesData.success) {
                    setActivities(activitiesData.activities);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setError(error instanceof Error ? error.message : "不明なエラー");
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        // Refresh every 1 minute（更新頻度向上）
        const interval = setInterval(fetchData, 1 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
            case "in_progress":
                return <Clock className="h-5 w-5 text-amber-500" />;
            default:
                return <Circle className="h-5 w-5 text-zinc-400" />;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "completed":
                return "完了";
            case "in_progress":
                return "進行中";
            default:
                return "未着手";
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "milestone":
                return <TrendingUp className="h-4 w-4 text-purple-600" />;
            case "completed":
                return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
            default:
                return <Activity className="h-4 w-4 text-japan-indigo" />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-japan-indigo"></div>
            </div>
        );
    }

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-japan-indigo">
                            🎯 プロジェクト進捗
                        </h2>
                        {error && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                                <span>⚠️ {error}</span>
                            </div>
                        )}
                        {!error && dataSource && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-700">
                                <span>📡 データソース: {dataSource === "github-issues" ? "GitHub Issues" : dataSource}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-sm text-zinc-700" suppressHydrationWarning>
                            最終更新: {lastUpdated ? new Date(lastUpdated).toLocaleString("ja-JP") : "-"}
                        </span>
                        <span className="text-xs text-zinc-600">1分ごとに自動更新</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="glass-panel rounded-2xl p-4 text-center bg-white/60">
                        <div className="text-3xl font-bold text-japan-indigo">{stats.total}</div>
                        <div className="text-sm text-zinc-700">合計</div>
                    </div>
                    <div className="glass-panel rounded-2xl p-4 text-center bg-white/60">
                        <div className="text-3xl font-bold text-amber-500">{stats.inProgress}</div>
                        <div className="text-sm text-zinc-700">進行中</div>
                    </div>
                    <div className="glass-panel rounded-2xl p-4 text-center bg-white/60">
                        <div className="text-3xl font-bold text-emerald-600">{stats.completed}</div>
                        <div className="text-sm text-zinc-700">完了</div>
                    </div>
                    <div className="glass-panel rounded-2xl p-4 text-center bg-white/60">
                        <div className="text-3xl font-bold text-zinc-700">{stats.notStarted}</div>
                        <div className="text-sm text-zinc-700">未着手</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Projects List */}
                    <div className="glass-panel rounded-3xl p-6 bg-white/60">
                        <div className="flex items-center gap-2 mb-6">
                            <Github className="h-5 w-5 text-japan-indigo" />
                            <h3 className="text-xl font-bold text-japan-indigo">プロジェクト一覧</h3>
                        </div>
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleProjectClick(project)}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-japan-indigo/5 hover:bg-japan-indigo/10 transition-all cursor-pointer group border border-transparent hover:border-japan-indigo/20"
                                >
                                    {getStatusIcon(project.status)}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-japan-charcoal truncate group-hover:text-japan-indigo transition-colors">
                                            {project.name}
                                        </div>
                                        {project.repoName && (
                                            <div className="text-xs text-zinc-700 truncate">
                                                <span className="text-japan-indigo/70 font-medium">{project.repoName}</span>
                                            </div>
                                        )}
                                        {project.description && (
                                            <div className="text-xs text-zinc-700 truncate">
                                                {project.description}
                                            </div>
                                        )}
                                        {project.progress !== undefined && project.progress > 0 && (
                                            <div className="w-full h-1 bg-zinc-200 rounded-full mt-2 overflow-hidden">
                                                <div
                                                    className="h-full bg-japan-indigo/50 rounded-full"
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`text-xs px-2 py-1 rounded-full ${project.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                                            project.status === "in_progress" ? "bg-amber-100 text-amber-700" :
                                                "bg-zinc-100 text-zinc-700"
                                            }`}>
                                            {getStatusLabel(project.status)}
                                        </span>
                                        <ChevronRight size={14} className="text-zinc-400 group-hover:text-japan-indigo transition-colors opacity-0 group-hover:opacity-100" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="glass-panel rounded-3xl p-6 bg-white/60">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity className="h-5 w-5 text-japan-indigo" />
                            <h3 className="text-xl font-bold text-japan-indigo">最近の活動</h3>
                        </div>
                        <div className="space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
                            {activities.length > 0 ? (
                                activities.map((activity, index) => (
                                    <motion.div
                                        key={`${activity.date}-${index}`}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex gap-3"
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-zinc-700 mb-1">
                                                {activity.date}
                                                {activity.repoName && <span className="ml-2 text-japan-indigo/70">· {activity.repoName}</span>}
                                            </div>
                                            <div className="text-sm text-zinc-700">{activity.message}</div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center text-zinc-700 py-8">
                                    最近の活動がありません
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <ProjectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={selectedProject}
                />
            </motion.div>
        </section>
    );
}
