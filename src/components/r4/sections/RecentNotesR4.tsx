import { fetchNotesR4 } from '@/lib/r4/notes-fetcher';
import { NotesListR4 } from '@/components/r4/notes/NotesList';
import Link from 'next/link';

export async function RecentNotesR4() {
  const { items } = await fetchNotesR4();
  const recent = items.slice(0, 3);
  if (recent.length === 0) return null;
  return (
    <section className="py-w-6 bg-wagashi-kinari" aria-labelledby="recent-notes-h">
      <div className="mx-auto max-w-wagashi-card px-w-3">
        <h2
          id="recent-notes-h"
          className="font-serif text-3xl text-wagashi-indigo tracking-heading"
        >
          最近の note 記事
        </h2>
        <p className="mt-w-1 text-wagashi-tanboku">
          営業現場での AI 活用、個人事業の試行錯誤、Tips を毎日発信中。
        </p>
        <div className="mt-w-4">
          <NotesListR4 items={recent} />
        </div>
        <div className="mt-w-4 text-center">
          <Link
            href="/notes"
            className="inline-block border border-wagashi-indigo px-w-3 py-w-2 font-en text-sm tracking-wider text-wagashi-indigo transition-colors duration-wagashi-hover hover:bg-wagashi-indigo hover:text-white"
          >
            note で全記事を読む →
          </Link>
        </div>
      </div>
    </section>
  );
}
