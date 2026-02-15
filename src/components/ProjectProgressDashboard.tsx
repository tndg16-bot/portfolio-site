"use client";

import { useEffect, useState } from 'react';
import { Activity, Circle, CheckCircle2, Clock, GitPullRequest, Loader2, RefreshCw, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface IssueStats {
  total: number;
  inProgress: number;
  completed: number;
  notStarted: number;
  lastUpdated: string;
  issues: Array<{
    id: number;
    number: number;
    title: string;
    state: string;
    labels: string[];
    updated_at: string;
    html_url: string;
  }>;
}

export default function ProjectProgressDashboard() {
  const [stats, setStats] = useState<IssueStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/github-issues');
      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load issues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
    // Refresh every 5 minutes
    const interval = setInterval(fetchIssues, 300000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const completionRate = stats ? Math.round((stats.completed / stats.total) * 100) : 0;

  if (loading) {
    return (
      <div className="glass-panel rounded-2xl p-8">
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="animate-spin h-12 w-12 text-japan-indigo" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel rounded-2xl p-8">
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <Activity className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchIssues}
            className="flex items-center gap-2 px-6 py-2 bg-japan-indigo text-white rounded-full hover:bg-japan-indigo/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            再試行
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-japan-indigo mb-2">
            プロジェクト進捗ダッシュボード
          </h2>
          <p className="text-zinc-600">
            GitHub Issuesからのリアルタイム進捗管理
          </p>
        </div>
        <button
          onClick={fetchIssues}
          className="p-2 hover:bg-japan-indigo/10 rounded-full transition-colors"
          title="更新"
        >
          <RefreshCw className="h-5 w-5 text-japan-indigo" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <GitPullRequest className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">合計</span>
          </div>
          <p className="text-3xl font-bold text-blue-900">{stats?.total || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">進行中</span>
          </div>
          <p className="text-3xl font-bold text-amber-900">{stats?.inProgress || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">完了</span>
          </div>
          <p className="text-3xl font-bold text-green-900">{stats?.completed || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-xl p-6 border border-zinc-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Circle className="h-5 w-5 text-zinc-600" />
            <span className="text-sm font-medium text-zinc-700">未着手</span>
          </div>
          <p className="text-3xl font-bold text-zinc-900">{stats?.notStarted || 0}</p>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 border border-zinc-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-japan-indigo" />
            <span className="font-semibold text-japan-indigo">進捗率</span>
          </div>
          <span className="text-2xl font-bold text-japan-indigo">{completionRate}%</span>
        </div>
        <div className="w-full bg-zinc-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-japan-indigo to-violet-500 rounded-full"
          />
        </div>
        <p className="text-sm text-zinc-500 mt-2 text-right">
          {stats?.completed || 0} / {stats?.total || 0} タスク完了
        </p>
      </div>

      {/* Last Updated */}
      {stats?.lastUpdated && (
        <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
          <Activity className="h-4 w-4" />
          <span>最終更新: {formatDate(stats.lastUpdated)}</span>
        </div>
      )}

      {/* Recent Issues */}
      {stats?.issues && stats.issues.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-japan-indigo mb-4">最近の更新</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {stats.issues.slice(0, 10).map((issue) => (
              <motion.a
                key={issue.id}
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="block p-4 bg-white rounded-lg border border-zinc-200 hover:border-japan-indigo/50 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {issue.state === 'closed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : issue.labels.includes('in-progress') ? (
                      <Clock className="h-5 w-5 text-amber-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-zinc-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-japan-charcoal hover:text-japan-indigo transition-colors line-clamp-2">
                      {issue.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {issue.labels.length > 0 && (
                        <>
                          {issue.labels.map((label) => (
                            <span
                              key={label}
                              className="text-xs px-2 py-1 bg-japan-indigo/10 text-japan-indigo rounded-full"
                            >
                              {label}
                            </span>
                          ))}
                        </>
                      )}
                      <span className="text-xs text-zinc-500">
                        #{issue.number} · {formatDate(issue.updated_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
