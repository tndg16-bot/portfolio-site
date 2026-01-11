'use client';

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
      メインコンテンツへスキップ
    </a>
  );
}
