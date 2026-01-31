'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Calendar, Shield, X, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Subscriber } from '@/types/newsletter';

interface RouteContext {
  params: Promise<{ id: string }>;
}

function SubscriberDetailContent({ id }: { id: string }) {
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchSubscriber = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/newsletter/subscribers/${id}`);
      if (response.ok) {
        const data: Subscriber = await response.json();
        setSubscriber(data);
      }
    } catch (error) {
      console.error('Failed to fetch subscriber:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriber();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('この購読者を削除しますか？')) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/newsletter/subscribers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.href = '/admin/newsletter';
      }
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-12 h-12 text-zinc-500 animate-spin" />
      </div>
    );
  }

  if (!subscriber) {
    return (
      <div className="text-center py-20">
        <X className="w-16 h-16 text-zinc-500 mx-auto mb-4" />
        <p className="text-zinc-400">購読者が見つかりませんでした</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/newsletter"
          className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          ダッシュボードに戻る
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          {deleting ? '削除中...' : '削除'}
        </button>
      </div>

      {/* Subscriber Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        {/* Email Card */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 text-2xl font-bold flex-shrink-0">
              {subscriber.email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold text-white truncate">
                  {subscriber.email}
                </h2>
                {subscriber.unsubscribed_at ? (
                  <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs font-medium whitespace-nowrap">
                    配信停止
                  </span>
                ) : subscriber.is_verified ? (
                  <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs font-medium whitespace-nowrap">
                    認証済み
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded text-xs font-medium whitespace-nowrap">
                    未認証
                  </span>
                )}
              </div>
              {subscriber.first_name || subscriber.last_name ? (
                <p className="text-zinc-400 truncate">
                  {(subscriber.first_name || '') + ' ' + (subscriber.last_name || '')}
                </p>
              ) : (
                <p className="text-zinc-500">名前未入力</p>
              )}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Subscription Info */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-teal-400" />
              購読情報
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-zinc-500 mb-1">登録日</p>
                <p className="text-white">
                  {new Date(subscriber.subscribed_at).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {subscriber.verified_at && (
                <div>
                  <p className="text-sm text-zinc-500 mb-1">認証日</p>
                  <p className="text-white">
                    {new Date(subscriber.verified_at).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              )}
              {subscriber.unsubscribed_at && (
                <div>
                  <p className="text-sm text-zinc-500 mb-1">配信停止日</p>
                  <p className="text-red-400">
                    {new Date(subscriber.unsubscribed_at).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-400" />
              設定
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-zinc-500 mb-1">受信頻度</p>
                <p className="text-white capitalize">
                  {subscriber.preferences?.frequency || 'weekly'}
                </p>
              </div>
              {subscriber.preferences?.categories && subscriber.preferences.categories.length > 0 && (
                <div>
                  <p className="text-sm text-zinc-500 mb-1">興味のあるカテゴリ</p>
                  <div className="flex flex-wrap gap-2">
                    {subscriber.preferences.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-teal-500/10 text-teal-400 rounded text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Metadata */}
        {subscriber.metadata && Object.keys(subscriber.metadata).length > 0 && (
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">メタデータ</h3>
            <pre className="bg-black/50 rounded-lg p-4 text-xs text-zinc-300 overflow-x-auto">
              {JSON.stringify(subscriber.metadata, null, 2)}
            </pre>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default async function SubscriberDetailPage({ params }: RouteContext) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<div className="text-white">読み込み中...</div>}>
          <SubscriberDetailContent id={id} />
        </Suspense>
      </div>
    </div>
  );
}
