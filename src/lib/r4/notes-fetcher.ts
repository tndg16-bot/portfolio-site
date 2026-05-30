/**
 * r4 note.com RSS fetcher with KV stale cache + fallback
 * Source: T-305_notes_rss_isr_draft.md r4
 */
import type { NoteItem } from './notes-types';
import { SITE_R4 } from '@/data/r4/site';

const STALE_CACHE_KEY = 'notes:lastgood:v1';
const STALE_TTL_DAYS = 30;

type CacheBlob = { items: NoteItem[]; fetchedAt: string };

async function readKv(): Promise<CacheBlob | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  try {
    const res = await fetch(
      `${process.env.KV_REST_API_URL}/get/${STALE_CACHE_KEY}`,
      {
        headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
        cache: 'no-store',
      }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { result: string | null };
    if (!json.result) return null;
    return JSON.parse(json.result) as CacheBlob;
  } catch {
    return null;
  }
}

async function writeKv(items: NoteItem[]): Promise<void> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return;
  try {
    const blob: CacheBlob = {
      items: items.slice(0, 6),
      fetchedAt: new Date().toISOString(),
    };
    await fetch(`${process.env.KV_REST_API_URL}/set/${STALE_CACHE_KEY}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        value: JSON.stringify(blob),
        ex: STALE_TTL_DAYS * 86400,
      }),
    });
  } catch {
    /* swallow */
  }
}

function parseRssXml(xml: string): NoteItem[] {
  const items: NoteItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const titleRegex = /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/;
  const linkRegex = /<link>([\s\S]*?)<\/link>/;
  const pubRegex = /<pubDate>([\s\S]*?)<\/pubDate>/;
  const descRegex = /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/;
  const catRegex = /<category>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/g;
  const enclosureRegex = /<enclosure[^>]*url="([^"]+)"/;

  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < 12) {
    const block = match[1];
    const title = titleRegex.exec(block)?.[1]?.trim() ?? '';
    const link = linkRegex.exec(block)?.[1]?.trim() ?? '';
    const pub = pubRegex.exec(block)?.[1]?.trim() ?? '';
    const desc = descRegex.exec(block)?.[1]?.replace(/<[^>]+>/g, '').trim() ?? '';
    const thumbnail = enclosureRegex.exec(block)?.[1];
    const categories: string[] = [];
    let cm;
    while ((cm = catRegex.exec(block)) !== null) categories.push(cm[1].trim());
    catRegex.lastIndex = 0;
    if (title && link) {
      items.push({
        title,
        url: link,
        publishedAt: pub ? new Date(pub).toISOString() : new Date().toISOString(),
        excerpt: desc.slice(0, 140),
        slug: link.split('/').pop() ?? title,
        categories,
        thumbnail,
      });
    }
  }
  return items;
}

export interface FetchResult {
  items: NoteItem[];
  stale: boolean;
  fetchedAt?: string;
}

export async function fetchNotesR4(): Promise<FetchResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(SITE_R4.noteRss, {
      next: { revalidate: 600 },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`note RSS HTTP ${res.status}`);
    const xml = await res.text();
    const items = parseRssXml(xml);
    if (items.length === 0) throw new Error('No items parsed');
    await writeKv(items);
    return { items, stale: false };
  } catch {
    clearTimeout(timeout);
    const cached = await readKv();
    if (cached) {
      return {
        items: cached.items,
        stale: true,
        fetchedAt: cached.fetchedAt,
      };
    }
    return { items: [], stale: true };
  }
}
