'use client';

// Avoid creating Supabase client at module scope.
// In CI/Vercel builds, env vars may be missing and Next will still evaluate this module while prerendering.

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseAnonKey) {
      setMessage({
        type: 'error',
        text: 'Supabaseの環境変数が未設定のため、現在ログイン機能を利用できません。',
      });
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'ログイン用メールを送信しました。メールをご確認ください。' });
    } catch (error: unknown) {
      const messageText = error instanceof Error ? error.message : 'エラーが発生しました。';
      setMessage({ type: 'error', text: messageText });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-md w-full">
        <div className="glass-panel rounded-3xl p-8">
          <h1 className="text-3xl font-bold text-japan-indigo mb-6 text-center">
            ログイン
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                className="w-full px-4 py-3 rounded-xl border border-japan-indigo/20 focus:border-japan-indigo focus:ring-2 focus:ring-japan-indigo/20 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-full bg-japan-indigo text-white font-bold text-lg hover:bg-japan-indigo/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl"
            >
              {loading ? '送信中...' : '魔法のリンクを送信'}
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-xl ${
                message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <p className="mt-6 text-center text-sm text-zinc-600">
            メールに記載されたリンクをクリックすると、ログインできます。
          </p>
        </div>
      </div>
    </div>
  );
}
