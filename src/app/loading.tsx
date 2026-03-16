export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-japan-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-japan-indigo/20 border-t-japan-indigo rounded-full animate-spin" />
        <p className="text-sm text-zinc-500">読み込み中...</p>
      </div>
    </main>
  );
}
