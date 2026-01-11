'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('有効なメールアドレスを入力してください。');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'エラーが発生しました。');
      }

      setStatus('success');
      setMessage('登録ありがとうございます！最新情報をお届けします。');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : '予期せぬエラーが発生しました。');
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto my-12">
      <div className="glass-card rounded-2xl p-8 md:p-10 border border-white/10 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Newsletter
            </h3>
            <p className="text-zinc-300">
              最新の記事や技術的な知見、プロジェクトの裏側をお届けします。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="メールアドレス"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'loading' || status === 'success'}
              className={`
                px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 min-w-[140px] transition-all
                ${status === 'success' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-default' 
                  : 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg hover:shadow-teal-500/25'
                }
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>登録完了</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>購読する</span>
                </>
              )}
            </motion.button>
          </form>

          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 flex items-center gap-2 text-sm ${
                  status === 'error' ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {status === 'error' && <AlertCircle className="w-4 h-4" />}
                <span>{message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
