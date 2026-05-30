import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/r4/metadata';
import { worksR4, panhouseDisclosure } from '@/data/r4/works';
import { BreadcrumbSchemaR4 } from '@/components/r4/schema/BreadcrumbSchema';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';
import { ManjiBadge } from '@/components/r4/wagashi';
import { SITE_R4 } from '@/data/r4/site';

export const metadata: Metadata = buildMetadata({
  title: '実績 / Works',
  description: '通信大手・化学メーカー・IR支援企業など、業界＋規模＋数値のぼかし表記で公開。本山個人の貢献度を明示しチーム成果と区別。',
  path: '/works',
  ogCategory: 'case',
});

export default function WorksPage() {
  return (
    <>
      <BreadcrumbSchemaR4
        items={[
          { name: 'Top', url: `${SITE_R4.url}/` },
          { name: 'Works', url: `${SITE_R4.url}/works` },
        ]}
      />
      <HeaderR4 />
      <main className="bg-wagashi-cream">
        <section className="py-w-7 px-w-3">
          <div className="mx-auto max-w-wagashi-read">
            <h1 className="font-serif text-4xl leading-heading tracking-heading text-wagashi-aizumi md:text-5xl">
              業界をぼかしても、成果は嘘をつかない。
            </h1>
            <p className="mt-w-3 text-wagashi-tanboku">
              社名は出さず、業界＋規模＋数値で記録。チーム成果と本山の担当範囲を明確に区別しています。
            </p>
            <aside className="mt-w-4 rounded-sm border border-wagashi-gold/50 bg-wagashi-kinari p-w-3 text-sm text-wagashi-tanboku">
              <p className="font-serif text-wagashi-aizumi">パンハウス案件としての開示</p>
              <p className="mt-w-1">{panhouseDisclosure}</p>
            </aside>
          </div>
        </section>

        <section className="px-w-3 py-w-6 bg-wagashi-kinari">
          <div className="mx-auto max-w-wagashi-card space-y-w-7">
            {worksR4.map((w, idx) => (
              <article
                key={w.slug}
                className="border-t-2 border-wagashi-tanboku/10 pt-w-5"
                aria-labelledby={`work-${w.slug}-h`}
              >
                <div className="flex flex-wrap items-start justify-between gap-w-3">
                  <div>
                    <ManjiBadge number={`#0${idx + 1}`} size={60} />
                  </div>
                  <Link
                    href={`/works/${w.slug}`}
                    className="font-en text-xs uppercase tracking-wider text-wagashi-ginshu hover:underline"
                  >
                    詳細を読む →
                  </Link>
                </div>
                <h2 id={`work-${w.slug}-h`} className="mt-w-3 font-serif text-2xl text-wagashi-aizumi md:text-3xl">
                  {w.industry}の{w.role}
                </h2>
                <p className="mt-w-1 font-num text-sm text-wagashi-tanboku">
                  {w.yearMonth} / {w.duration}
                </p>
                <div className="mt-w-4 grid gap-w-4 md:grid-cols-3">
                  {w.metrics.map((m) => (
                    <div key={m.label} className="border-l-2 border-wagashi-ginshu pl-w-2">
                      <p className="font-num text-2xl text-wagashi-indigo">{m.value}</p>
                      <p className="text-xs text-wagashi-tanboku">{m.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-w-4 text-wagashi-tanboku">{w.challenge}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <FooterR4 />
    </>
  );
}
