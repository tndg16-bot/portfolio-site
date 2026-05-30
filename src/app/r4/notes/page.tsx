import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/r4/metadata';
import { fetchNotesR4 } from '@/lib/r4/notes-fetcher';
import { NotesListR4 } from '@/components/r4/notes/NotesList';
import { NotesFallbackR4 } from '@/components/r4/notes/NotesFallback';
import { BreadcrumbSchemaR4 } from '@/components/r4/schema/BreadcrumbSchema';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';
import { SITE_R4 } from '@/data/r4/site';

export const revalidate = 600;

export const metadata: Metadata = buildMetadata({
  title: 'note 最近の記事',
  description: 'AI・営業・個人事業の試行錯誤を、その日の言葉で。毎日 note で発信中。',
  path: '/notes',
  ogCategory: 'note',
});

export default async function NotesPage() {
  const { items, stale, fetchedAt } = await fetchNotesR4();
  return (
    <>
      <BreadcrumbSchemaR4
        items={[
          { name: 'Top', url: `${SITE_R4.url}/` },
          { name: 'Notes', url: `${SITE_R4.url}/notes` },
        ]}
      />
      <HeaderR4 />
      <main className="bg-wagashi-cream">
        <section className="py-w-7 px-w-3">
          <div className="mx-auto max-w-wagashi-card">
            <h1 className="font-serif text-4xl leading-heading tracking-heading text-wagashi-aizumi md:text-5xl">
              毎日書いています。
            </h1>
            <p className="mt-w-3 text-wagashi-tanboku">
              AI ・営業・個人事業の試行錯誤を、その日の言葉で。
            </p>
            <div className="mt-w-5">
              {stale ? <NotesFallbackR4 hasStale={items.length > 0} fetchedAt={fetchedAt} /> : null}
              <NotesListR4 items={items} muted={stale} />
            </div>
            <div className="mt-w-5 text-center">
              <a
                href={`${SITE_R4.sns.note}?utm_source=site&utm_medium=notes&utm_campaign=follow`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-en text-sm uppercase tracking-wider text-wagashi-ginshu hover:underline"
              >
                note でフォローする →
              </a>
            </div>
          </div>
        </section>
      </main>
      <FooterR4 />
    </>
  );
}
