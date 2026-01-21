'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    async function handleCallback() {
      try {
        // Check current session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
          setStatus('success');
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
      }
    }

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-md w-full">
        <div className="glass-panel rounded-3xl p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-japan-indigo mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-japan-indigo mb-4">
                ログイン処理中...
              </h1>
              <p className="text-zinc-600">しばらくお待ちください。</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-japan-indigo mb-4">
                ログインしました
              </h1>
              <p className="text-zinc-600">ダッシュボードに転送します...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-japan-indigo mb-4">
                エラーが発生しました
              </h1>
              <p className="text-zinc-600 mb-6">ログインに失敗しました。</p>
              <button
                onClick={() => router.push('/auth/login')}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-japan-indigo text-white font-bold text-lg hover:bg-japan-indigo/90 transition-all shadow-xl px-8"
              >
                再度ログイン
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
