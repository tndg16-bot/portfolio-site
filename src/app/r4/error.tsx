'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function ErrorR4({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
  return (
    <html lang="ja">
      <body className="bg-wagashi-cream text-wagashi-charcoal">
        <main className="min-h-screen grid place-items-center px-4">
          <div className="text-center">
            <p className="font-serif text-3xl text-wagashi-aizumi">少しだけ、お待ちください。</p>
            <p className="mt-3 text-sm text-wagashi-tanboku">予期せぬエラーが発生しました。</p>
            <button
              onClick={reset}
              className="mt-6 rounded-sm bg-wagashi-vermilion px-4 py-2 text-white"
            >
              再試行
            </button>
            <p className="mt-4">
              <Link href="/" className="text-wagashi-indigo underline-offset-2 hover:underline">
                トップに戻る
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
