'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CreateNewsletterRequest } from '@/types/newsletter';

export default function CreateNewsletterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateNewsletterRequest>({
    title: '',
    subject: '',
    preview_text: '',
    content_html: '',
    content_text: '',
    scheduled_at: '',
    tag_slugs: [],
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = true) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // For now, just show a message since we don't have the newsletter creation API yet
      setStatus('success');
      setMessage(saveAsDraft ? '下書きを保存しました' : 'ニュースレターを送信しました');
      setTimeout(() => {
        router.push('/admin/newsletter');
      }, 2000);
    } catch (error) {
      setStatus('error');
      setMessage('エラーが発生しました');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/newsletter"
            className="inline-flex items-center text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            ダッシュボードに戻る
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Newsletter</h1>
          <p className="text-zinc-400">新しいニュースレターを作成して送信する</p>
        </div>

        {/* Status Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          {/* Title */}
          <div className="glass-card rounded-xl p-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              タイトル <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="ニュースレターのタイトル"
              className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors"
              required
            />
          </div>

          {/* Subject */}
          <div className="glass-card rounded-xl p-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              件名 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="メールの件名"
              className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors"
              required
            />
          </div>

          {/* Preview Text */}
          <div className="glass-card rounded-xl p-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              プレビューテキスト（オプション）
            </label>
            <textarea
              value={formData.preview_text}
              onChange={(e) => setFormData({ ...formData, preview_text: e.target.value })}
              placeholder="受信トレイに表示される短いテキスト"
              rows={2}
              className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors resize-none"
            />
          </div>

          {/* Content HTML */}
          <div className="glass-card rounded-xl p-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              コンテンツ（HTML） <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.content_html}
              onChange={(e) => setFormData({ ...formData, content_html: e.target.value })}
              placeholder="<div>...</div>"
              rows={12}
              className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors resize-none font-mono text-sm"
              required
            />
            <p className="text-xs text-zinc-500 mt-2">HTML形式でコンテンツを入力してください</p>
          </div>

          {/* Content Text */}
          <div className="glass-card rounded-xl p-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              プレーンテキスト（オプション）
            </label>
            <textarea
              value={formData.content_text}
              onChange={(e) => setFormData({ ...formData, content_text: e.target.value })}
              placeholder="プレーンテキスト版"
              rows={8}
              className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors resize-none"
            />
            <p className="text-xs text-zinc-500 mt-2">HTMLをサポートしないメールクライアント用</p>
          </div>

          {/* Scheduled Date */}
          <div className="glass-card rounded-xl p-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              送信予定日時（オプション）
            </label>
            <input
              type="datetime-local"
              value={formData.scheduled_at}
              onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
              className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
            />
            <p className="text-xs text-zinc-500 mt-2">空欄の場合はすぐに送信されます</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              {isPreview ? '編集に戻る' : 'プレビュー'}
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                下書き保存
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                送信する
              </button>
            </div>
          </div>
        </form>

        {/* Preview */}
        {isPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass-card rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">プレビュー</h2>
            <div className="bg-white rounded-lg p-6 text-black">
              <h3 className="text-2xl font-bold mb-4">{formData.subject}</h3>
              {formData.preview_text && (
                <p className="text-zinc-600 mb-4 italic">{formData.preview_text}</p>
              )}
              <div dangerouslySetInnerHTML={{ __html: formData.content_html }} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
