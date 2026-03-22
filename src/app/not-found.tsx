import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 bg-japan-cream">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-japan-indigo/20 mb-4">404</p>
        <h1 className="text-2xl font-semibold text-japan-charcoal font-[family-name:var(--font-noto-serif)] mb-4">
          ページが見つかりませんでした
        </h1>
        <p className="text-text-secondary mb-8">
          お探しのページは移動または削除された可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-japan-indigo text-white rounded-lg hover:bg-japan-indigo/90 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
