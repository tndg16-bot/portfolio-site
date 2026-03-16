'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 bg-japan-cream">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-japan-vermilion/20 mb-4">Error</p>
        <h1 className="text-2xl font-semibold text-japan-charcoal font-[family-name:var(--font-noto-serif)] mb-4">
          問題が発生しました
        </h1>
        <p className="text-zinc-600 mb-8">
          申し訳ございません。しばらく経ってからもう一度お試しください。
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-japan-indigo text-white rounded-lg hover:bg-japan-indigo/90 transition-colors"
          >
            再試行
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-japan-indigo text-japan-indigo rounded-lg hover:bg-japan-indigo/5 transition-colors"
          >
            ホームに戻る
          </a>
        </div>
      </div>
    </main>
  );
}
