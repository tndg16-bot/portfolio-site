import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { buildMetadata } from '@/lib/r4/metadata';
import { worksR4, getWorkR4BySlug, panhouseDisclosure } from '@/data/r4/works';
import { CaseStudySchemaR4 } from '@/components/r4/schema/CaseStudySchema';
import { BreadcrumbSchemaR4 } from '@/components/r4/schema/BreadcrumbSchema';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';
import { ManjiBadge } from '@/components/r4/wagashi';
import { SITE_R4 } from '@/data/r4/site';

export async function generateStaticParams() {
  return worksR4.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWorkR4BySlug(slug);
  if (!w) return {};
  return buildMetadata({
    title: `${w.industry}の${w.role} | 実績`,
    description: `${w.industry}・${w.scaleHint ?? ''}での${w.role}。${w.metrics.map((m) => m.value).join(' / ')}`,
    path: `/works/${w.slug}`,
    ogCategory: 'case',
  });
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkR4BySlug(slug);
  if (!work) notFound();
  const idx = worksR4.findIndex((w) => w.slug === slug);

  return (
    <>
      <CaseStudySchemaR4 work={work} />
      <BreadcrumbSchemaR4
        items={[
          { name: 'Top', url: `${SITE_R4.url}/` },
          { name: 'Works', url: `${SITE_R4.url}/works` },
          { name: work.industry, url: `${SITE_R4.url}/works/${work.slug}` },
        ]}
      />
      <HeaderR4 />
      <main className="bg-wagashi-cream">
        <section className="px-w-3 py-w-7">
          <div className="mx-auto max-w-wagashi-read">
            <ManjiBadge number={`#0${idx + 1}`} size={64} />
            <h1 className="mt-w-3 font-serif text-3xl leading-heading tracking-heading text-wagashi-aizumi md:text-4xl">
              {work.industry}の{work.role}
            </h1>
            <p className="mt-w-1 font-num text-sm text-wagashi-tanboku">
              {work.yearMonth} / {work.duration} / {work.scaleHint ?? ''}
            </p>
          </div>
        </section>

        <section className="px-w-3 py-w-6 bg-wagashi-kinari">
          <div className="mx-auto max-w-wagashi-read">
            <h2 className="font-serif text-2xl text-wagashi-indigo">課題</h2>
            <p className="mt-w-3 text-wagashi-charcoal">{work.challenge}</p>
          </div>
        </section>

        <section className="px-w-3 py-w-6">
          <div className="mx-auto max-w-wagashi-read">
            <h2 className="font-serif text-2xl text-wagashi-indigo">本山の担当範囲</h2>
            <p className="mt-w-3 text-wagashi-charcoal">{work.motoyamaContribution}</p>
          </div>
        </section>

        <section className="px-w-3 py-w-6 bg-wagashi-kinari">
          <div className="mx-auto max-w-wagashi-card">
            <h2 className="font-serif text-2xl text-wagashi-indigo">成果（チーム成果と本山寄与の区別）</h2>
            <div className="mt-w-4 grid gap-w-4 md:grid-cols-3">
              {work.metrics.map((m) => (
                <div key={m.label} className="border-l-2 border-wagashi-ginshu pl-w-3">
                  <p className="font-num text-3xl text-wagashi-indigo">{m.value}</p>
                  <p className="mt-w-1 text-xs text-wagashi-tanboku">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-w-4 text-wagashi-charcoal">{work.resultWithAttribution}</p>
          </div>
        </section>

        <section className="px-w-3 py-w-6">
          <div className="mx-auto max-w-wagashi-read">
            <h2 className="font-serif text-2xl text-wagashi-indigo">学び・所感</h2>
            <blockquote className="mt-w-3 border-l-4 border-wagashi-ginshu pl-w-3 font-serif text-lg italic text-wagashi-aizumi">
              「{work.learningVoice}」
            </blockquote>
          </div>
        </section>

        <section className="px-w-3 py-w-6 bg-wagashi-kinari">
          <div className="mx-auto max-w-wagashi-read text-sm text-wagashi-tanboku">
            <p className="font-serif text-wagashi-aizumi">補足：パンハウス案件としての開示</p>
            <p className="mt-w-1">{panhouseDisclosure}</p>
          </div>
        </section>

        <section className="px-w-3 py-w-6">
          <div className="mx-auto max-w-wagashi-read text-center">
            <p className="font-serif text-xl text-wagashi-aizumi">同じような課題で相談したい方へ</p>
            <Link
              href={SITE_R4.timerex}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-w-3 inline-block rounded-sm bg-wagashi-vermilion px-w-3 py-w-2 text-white"
            >
              無料相談を予約する →
            </Link>
          </div>
        </section>
      </main>
      <FooterR4 />
    </>
  );
}
