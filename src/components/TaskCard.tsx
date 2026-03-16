'use client';

import { useState } from 'react';
import { Check, Clock, AlertCircle, User } from 'lucide-react';

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

export default function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const statusColors = {
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    pending: 'bg-zinc-500/20 text-zinc-600 border-zinc-500/30',
    blocked: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  
  const priorityColors = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-zinc-600',
  };
  
  const statusIcons = {
    completed: <Check className="w-4 h-4" />,
    in_progress: <Clock className="w-4 h-4" />,
    pending: <AlertCircle className="w-4 h-4" />,
    blocked: <AlertCircle className="w-4 h-4 text-red-400" />,
  };
  
  const isOverdue = new Date(task.dueDate) < new Date();
  const daysUntilDue = Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div
      className={`glass-card p-4 rounded-lg border ${statusColors[task.status]}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed');
          }}
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
            <h3 className="text-lg font-semibold bg-japan-indigo text-white">
              {task.title}
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2 py-1 rounded-full ${
                priorityColors[task.priority]
              }`}>
                {task.priority === 'high' && '高'}
                {task.priority === 'medium' && '中'}
                {task.priority === 'low' && '低'}
              </span>
              {isOverdue && (
                <span className="text-red-400 font-medium">
                  {Math.abs(daysUntilDue)}日遅延
                </span>
              )}
            </div>
          </div>
          
          <p className="text-zinc-300 text-sm mb-3">
            {task.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-zinc-600">
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
      
      {expanded && (
        <div className="mt-4 pt-4 border-t border-zinc-700/50">
          <h4 className="text-sm font-semibold text-zinc-300 mb-2">
            タスク詳細
          </h4>
          <div className="space-y-2 text-xs text-zinc-600">
            <div className="flex justify-between">
              <span>タスクID:</span>
              <span className="font-mono">{task.id}</span>
            </div>
            <div className="flex justify-between">
              <span>作成日:</span>
              <span>2026-01-16</span>
            </div>
            {task.dependencies.length > 0 && (
              <div>
                <div className="mb-1">依存タスク:</div>
                {task.dependencies.map((depId) => (
                  <div key={depId} className="font-mono text-xs p-1 bg-zinc-800/50 rounded">
                    {depId}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
