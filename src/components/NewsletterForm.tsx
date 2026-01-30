'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      const data = await response.json();
      console.log('Subscribed:', email, data);
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Subscribe error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-500/10 transition-colors duration-500" />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 mb-6">
          <Mail size={24} />
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">
          Deep Diveを受け取る
        </h3>

        <p className="text-zinc-400 mb-6">
          ブログの更新情報や、より深い考察、限定コンテンツをニュースレターとしてお届けします。
          スパムは送りません。いつでも解除可能です。
        </p>

        {/* 登録特典 */}
        <div className="bg-zinc-800/50 rounded-lg p-4 mb-6 border border-zinc-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400">🎁</span>
            <span className="text-white font-semibold">登録特典</span>
          </div>
          <p className="text-zinc-300 text-sm">
            「本当の自分を見つける」自己分析ワークシートをプレゼント！
          </p>
          <ul className="text-zinc-400 text-xs mt-2 space-y-1">
            <li>• 価値観の明確化</li>
            <li>• 強みの再発見</li>
            <li>• 行動の軸を決める</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-teal-500 hover:bg-teal-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? '送信中...' : status === 'success' ? '登録完了！' : '登録する'}
          </button>
        </form>

        {status === 'success' && (
          <p className="text-teal-400 text-sm mt-4 animate-fade-in">
            登録ありがとうございます！確認メールをお送りしました。
            <span className="block mt-2 text-zinc-400">
              📧 登録特典：自己分析ワークシートもお届けします！
            </span>
          </p>
        )}

        {status === 'error' && (
          <p className="text-red-400 text-sm mt-4">
            エラーが発生しました。もう一度お試しください。
          </p>
        )}
      </div>
    </div>
  );
}
