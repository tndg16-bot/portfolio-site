'use client';

import { useState } from 'react';
import { LayoutDashboard, List, Filter, Plus, Calendar, Check, Clock, AlertCircle, User } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: string;
  dependencies: string[];
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export default function TaskManagementDashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      title: "GitHub Projects API research",
      description: "Research GitHub Projects API documentation and capabilities",
      status: "completed",
      priority: "high",
      assignee: "development-team",
      dueDate: "2026-01-16",
      dependencies: []
    },
    {
      id: "task-2",
      title: "Evaluate task management tools (Linear, ZenHub, Notion)",
      description: "Evaluate Linear, ZenHub, Notion task management capabilities",
      status: "pending",
      priority: "high",
      assignee: "development-team",
      dueDate: "2026-01-23",
      dependencies: ["task-1"]
    },
    {
      id: "task-3",
      title: "Create simple task management UI",
      description: "Create a basic task management UI component",
      status: "pending",
      priority: "high",
      assignee: "development-team",
      dueDate: "2026-01-30",
      dependencies: ["task-2"]
    },
    {
      id: "task-4",
      title: "Implement progress visualization",
      description: "Implement progress bars and status indicators",
      status: "pending",
      priority: "high",
      assignee: "development-team",
      dueDate: "2026-02-06",
      dependencies: ["task-3"]
    }
  ]);
  
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress' | 'pending'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'status'>('priority');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
      return (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99);
    }
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === 'status') {
      const statusOrder: Record<string, number> = { completed: 0, in_progress: 1, pending: 2, blocked: 3 };
      return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99);
    }
    return 0;
  });

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    blocked: tasks.filter((t) => t.status === 'blocked').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            タスク管理ダッシュボード
          </h1>
          <p className="text-zinc-400">
            プロジェクト進捗を管理するタスク管理システム
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 mb-1">総タスク</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <List className="w-5 h-5 text-zinc-400" />
            </div>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 mb-1">完了</p>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-xs">✓</span>
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 mb-1">進行中</p>
                <p className="text-2xl font-bold text-blue-400">{stats.inProgress}</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 text-xs">⟳</span>
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 mb-1">未着手</p>
                <p className="text-2xl font-bold text-zinc-400">{stats.pending}</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-zinc-500/20 flex items-center justify-center">
                <span className="text-zinc-400 text-xs">◯</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-zinc-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            >
              <option value="all">すべてのタスク</option>
              <option value="completed">完了</option>
              <option value="in_progress">進行中</option>
              <option value="pending">未着手</option>
              <option value="blocked">ブロック</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            >
              <option value="priority">優先度順</option>
              <option value="dueDate">期限順</option>
              <option value="status">ステータス順</option>
            </select>
          </div>
          
          <button className="flex items-center gap-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg px-4 py-2 text-teal-400 text-sm transition-colors">
            <Plus className="w-4 h-4" />
            新規タスク
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="grid gap-4 md:grid-cols-2">
        {sortedTasks.map((task) => {
          const statusColors = {
            completed: 'bg-green-500/20 text-green-400 border-green-500/30',
            in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            pending: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
            blocked: 'bg-red-500/20 text-red-400 border-red-500/30',
          };
          
          const statusIcons = {
            completed: <Check className="w-4 h-4" />,
            in_progress: <Clock className="w-4 h-4" />,
            pending: <AlertCircle className="w-4 h-4" />,
            blocked: <AlertCircle className="w-4 h-4 text-red-400" />,
          };
          
          const isOverdue = new Date(task.dueDate) < new Date();
          
          return (
            <div key={task.id} className={`glass-card p-4 rounded-lg border ${statusColors[task.status]}`}>
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                  className={`mt-1 rounded-full p-1 transition-colors ${
                    task.status === 'completed'
                      ? 'bg-green-500/30 hover:bg-green-500/50'
                      : 'bg-zinc-700/50 hover:bg-zinc-600/50'
                  }`}
                >
                  {statusIcons[task.status]}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 rounded-full bg-zinc-700/50 text-zinc-400">
                        {task.priority === 'high' && '高'}
                        {task.priority === 'medium' && '中'}
                        {task.priority === 'low' && '低'}
                      </span>
                      {isOverdue && (
                        <span className="text-red-400 font-medium">
                          {Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) * -1)}日遅延
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-zinc-300 text-sm mb-3">
                    {task.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className={isOverdue ? 'text-red-400' : ''}>
                        {task.dueDate}
                      </span>
                    </div>
                    {task.dependencies.length > 0 && (
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{task.dependencies.length} 依存</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {sortedTasks.length === 0 && (
        <div className="glass-card p-8 rounded-lg text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
              <LayoutDashboard className="w-8 h-8 text-zinc-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            該当するタスクがありません
          </h3>
          <p className="text-zinc-400">
            フィルタ条件を変更して、タスクを表示してください。
          </p>
        </div>
      )}

      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="mt-8 glass-card p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-400">全体の進捗</span>
            <span className="text-sm font-semibold text-white">
              {Math.round((stats.completed / stats.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-zinc-700/50 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(stats.completed / stats.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
