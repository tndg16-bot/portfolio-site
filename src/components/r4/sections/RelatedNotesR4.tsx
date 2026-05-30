import { fetchNotesR4 } from '@/lib/r4/notes-fetcher';
import Link from 'next/link';

export async function RelatedNotesR4({
  tags,
  serviceSlug,
  limit = 3,
}: {
  tags: string[];
  serviceSlug: string;
  limit?: number;
}) {
  const { items } = await fetchNotesR4();
  const matched = items
    .filter((n) =>
      tags.some((tag) =>
        (n.categories ?? []).some((c) => c.includes(tag)) || n.title.includes(tag)
      )
    )
    .slice(0, limit);

  const related =
    matched.length >= limit
      ? matched
      : [...matched, ...items.filter((n) => !matched.includes(n)).slice(0, limit - matched.length)];

  if (related.length === 0) return null;

  return (
    <section className="border-t border-wagashi-cream py-w-4" aria-labelledby="related-notes-h">
      <h3
        id="related-notes-h"
        className="mb-w-3 font-serif text-xl text-wagashi-indigo tracking-heading"
      >
        関連の note 記事
      </h3>
      <ul className="space-y-w-2">
        {related.map((n) => (
          <li key={n.url}>
            <a
              href={`${n.url}?utm_source=site&utm_medium=service-related&utm_campaign=${serviceSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline justify-between gap-w-3 text-wagashi-aizumi transition-colors duration-wagashi-hover hover:text-wagashi-indigo"
            >
              <span className="font-medium">{n.title}</span>
              <time className="ml-w-3 font-num text-xs text-wagashi-tanboku">
                {new Date(n.publishedAt).toLocaleDateString('ja-JP')}
              </time>
            </a>
          </li>
        ))}
      </ul>
      <Link
        href="/notes"
        className="mt-w-2 inline-block font-en text-xs uppercase tracking-wider text-wagashi-ginshu"
      >
        もっと読む →
      </Link>
    </section>
  );
}
