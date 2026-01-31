'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Trash2, Eye, Plus, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Subscriber } from '@/types/newsletter';

interface SubscribersResponse {
  subscribers: Subscriber[];
  total: number;
  page: number;
  limit: number;
}

function NewsletterDashboardContent() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const limit = 20;

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(statusFilter !== 'all' && { status: statusFilter }),
      });

      const response = await fetch(`/api/newsletter/subscribers?${params}`);
      const data: SubscribersResponse = await response.json();
      setSubscribers(data.subscribers);
      setTotal(data.total);
    } catch (error) {
      console.error('Failed to fetch subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [page, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchSubscribers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('この購読者を削除しますか？')) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/newsletter/subscribers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSubscribers(subscribers.filter(s => s.id !== id));
        setTotal(total - 1);
      }
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Newsletter Dashboard</h1>
          <p className="text-zinc-400">
            購読者: {total.toLocaleString()}人
          </p>
        </div>
        <Link
          href="/admin/newsletter/create"
          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Newsletter
        </Link>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4 space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Emailを検索..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-black/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors"
          >
            <option value="all">すべてのステータス</option>
            <option value="verified">認証済み</option>
            <option value="unverified">未認証</option>
            <option value="unsubscribed">配信停止</option>
          </select>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-400 text-black font-semibold px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            検索
          </button>
        </form>
      </div>

      {/* Subscribers Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-zinc-400">
            <RefreshCw className="w-8 h-8 mx-auto mb-3 animate-spin" />
            <p>読み込み中...</p>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-zinc-400">購読者が見つかりませんでした</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left px-6 py-4 text-zinc-400 font-medium">Email</th>
                    <th className="text-left px-6 py-4 text-zinc-400 font-medium">名前</th>
                    <th className="text-left px-6 py-4 text-zinc-400 font-medium">ステータス</th>
                    <th className="text-left px-6 py-4 text-zinc-400 font-medium">登録日</th>
                    <th className="text-right px-6 py-4 text-zinc-400 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {subscribers.map((subscriber, index) => (
                      <motion.tr
                        key={subscriber.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="border-b border-zinc-800/50 hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 font-semibold">
                              {subscriber.email[0].toUpperCase()}
                            </div>
                            <span className="text-white">{subscriber.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-zinc-300">
                          {subscriber.first_name || subscriber.last_name
                            ? `${subscriber.first_name || ''} ${subscriber.last_name || ''}`.trim()
                            : '-'}
                        </td>
                        <td className="px-6 py-4">
                          {subscriber.unsubscribed_at ? (
                            <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs font-medium">
                              配信停止
                            </span>
                          ) : subscriber.is_verified ? (
                            <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs font-medium">
                              認証済み
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded text-xs font-medium">
                              未認証
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-zinc-400">
                          {new Date(subscriber.subscribed_at).toLocaleDateString('ja-JP')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/newsletter/subscribers/${subscriber.id}`}
                              className="p-2 text-zinc-400 hover:text-white transition-colors"
                              title="詳細を表示"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(subscriber.id)}
                              disabled={deletingId === subscriber.id}
                              className="p-2 text-zinc-400 hover:text-red-400 transition-colors disabled:opacity-50"
                              title="削除"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800">
                <p className="text-sm text-zinc-400">
                  {total > 0 ? `${(page - 1) * limit + 1} - ${Math.min(page * limit, total)} / ${total.toLocaleString()}件` : '0件'}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="p-2 text-zinc-400 hover:text-white transition-colors disabled:opacity-30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-8 h-8 rounded transition-colors ${
                            pageNum === page
                              ? 'bg-teal-500 text-black font-medium'
                              : 'text-zinc-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="p-2 text-zinc-400 hover:text-white transition-colors disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function NewsletterDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<div className="text-white">読み込み中...</div>}>
          <NewsletterDashboardContent />
        </Suspense>
      </div>
    </div>
  );
}
