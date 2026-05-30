import type { NoteItem } from '@/lib/r4/notes-types';
import Image from 'next/image';

export function NotesListR4({ items, muted = false }: { items: NoteItem[]; muted?: boolean }) {
  if (items.length === 0) {
    return (
      <p className="text-wagashi-tanboku">
        まだ取得できる note 記事がありません。直接{' '}
        <a href="https://note.com/tndg" className="underline">note でご覧ください</a>。
      </p>
    );
  }
  return (
    <ul
      className={`grid gap-w-4 md:grid-cols-2 ${muted ? 'opacity-70' : ''}`}
      aria-label="note 記事一覧"
    >
      {items.map((note) => (
        <li key={note.url}>
          <a
            href={`${note.url}?utm_source=site&utm_medium=notes&utm_campaign=${note.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-sm border border-wagashi-tanboku/15 bg-wagashi-kinari p-w-3 transition-colors duration-wagashi-hover hover:border-wagashi-indigo"
          >
            {note.thumbnail ? (
              <div className="relative mb-w-2 aspect-[4/3] overflow-hidden bg-wagashi-cream">
                <Image src={note.thumbnail} alt="" fill sizes="(min-width: 768px) 480px, 100vw" />
              </div>
            ) : null}
            <p className="mb-w-1 font-num text-xs text-wagashi-tanboku">
              {new Date(note.publishedAt).toLocaleDateString('ja-JP')}
            </p>
            <h3 className="font-serif text-base leading-snug text-wagashi-aizumi">{note.title}</h3>
            {note.excerpt ? (
              <p className="mt-w-1 text-sm text-wagashi-tanboku">{note.excerpt}</p>
            ) : null}
            <span className="mt-w-2 inline-block font-en text-xs uppercase tracking-wider text-wagashi-ginshu">
              note で読む →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
