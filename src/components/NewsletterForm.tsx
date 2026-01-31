'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('メールアドレスを入力してください。');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate API call
    setTimeout(() => {
      console.log('Subscribed:', email);
      setStatus('success');
      setEmail('');
    }, 1000);
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

        <p className="text-zinc-400 mb-8">
          ブログの更新情報や、より深い考察、限定コンテンツをニュースレターとしてお届けします。
          スパムは送りません。いつでも解除可能です。
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" aria-label="ニュースレター登録フォーム">
          <input
            id="newsletter-email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all disabled:opacity-50"
            required
            aria-label="メールアドレス"
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? 'newsletter-error' : undefined}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-teal-500 hover:bg-teal-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
            aria-live="polite"
          >
            {status === 'loading' ? '送信中...' : status === 'success' ? '登録完了！' : '登録する'}
          </button>
        </form>

        {errorMessage && (
          <p id="newsletter-error" className="text-red-400 text-sm mt-2" role="alert">
            {errorMessage}
          </p>
        )}

        {status === 'success' && (
          <p className="text-teal-400 text-sm mt-4 animate-fade-in" role="status">
            登録ありがとうございます！確認メールをお送りしました。
          </p>
        )}
      </div>
    </div>
  );
}
