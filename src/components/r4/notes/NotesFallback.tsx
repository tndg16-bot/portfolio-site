'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function NotesFallbackR4({
  fetchedAt,
  hasStale,
}: {
  fetchedAt?: string;
  hasStale: boolean;
}) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.refresh();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, router]);

  return (
    <aside
      role="status"
      className="mb-w-4 rounded-sm border border-wagashi-gold bg-wagashi-cream p-w-3 text-sm text-wagashi-tanboku"
    >
      <p className="font-semibold text-wagashi-aizumi">最新の note を取りに行けませんでした。</p>
      {hasStale && fetchedAt ? (
        <p className="mt-w-1">
          直近に取得できた記事を表示しています（
          {new Date(fetchedAt).toLocaleString('ja-JP')} 時点）。
        </p>
      ) : null}
      <p className="mt-w-2">
        {secondsLeft} 秒後に自動で再試行します。{' '}
        <button
          type="button"
          onClick={() => router.refresh()}
          className="underline underline-offset-2"
        >
          今すぐ再試行
        </button>
      </p>
    </aside>
  );
}
