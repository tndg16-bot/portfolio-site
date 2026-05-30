import { Suspense } from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/r4/metadata';
import { aboutContentR4 } from '@/data/r4/about-content';
import { timelineR4 } from '@/data/r4/timeline';
import { PersonSchemaR4 } from '@/components/r4/schema/PersonSchema';
import { BreadcrumbSchemaR4 } from '@/components/r4/schema/BreadcrumbSchema';
import { ScrollToSectionR4 } from '@/components/r4/about/ScrollToSection';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';
import { Kikko } from '@/components/r4/wagashi';
import Link from 'next/link';
import { SITE_R4 } from '@/data/r4/site';

export const metadata: Metadata = buildMetadata({
  title: 'About 本山貴裕 | プロフィール・経歴・スキル',
  description: '営業14年・AI実装3年。証券→人材→AIスタートアップ。福岡拠点の個人事業者本山貴裕のプロフィール、できること、価値観。',
  path: '/about',
  ogCategory: 'about',
});

export default function AboutPage() {
  return (
    <>
      <PersonSchemaR4 />
      <BreadcrumbSchemaR4
        items={[
          { name: 'Top', url: `${SITE_R4.url}/` },
          { name: 'About', url: `${SITE_R4.url}/about` },
        ]}
      />
      <HeaderR4 />
      <Suspense fallback={null}>
        <ScrollToSectionR4 />
      </Suspense>
      <main className="bg-wagashi-cream">
        <section className="py-w-7 px-w-3">
          <div className="mx-auto max-w-wagashi-read">
            <p className="font-serif text-xs text-wagashi-tanboku">— 本山貴裕</p>
            <h1 className="mt-w-2 font-serif text-4xl leading-heading tracking-heading text-wagashi-aizumi md:text-5xl">
              {aboutContentR4.hero.catchB2C}
            </h1>
            <p className="mt-w-3 text-wagashi-tanboku">{aboutContentR4.hero.sub}</p>
          </div>
        </section>

        <section className="py-w-6 px-w-3 bg-wagashi-kinari">
          <div className="mx-auto max-w-wagashi-read whitespace-pre-line text-base leading-body text-wagashi-charcoal">
            {aboutContentR4.intro}
          </div>
        </section>

        <section className="py-w-6 px-w-3">
          <div className="mx-auto max-w-wagashi-card">
            <h2 className="font-serif text-3xl text-wagashi-indigo tracking-heading">経歴</h2>
            <ol className="mt-w-4 space-y-w-4 border-l border-wagashi-tanboku/20 pl-w-3">
              {timelineR4.map((entry) => (
                <li key={entry.year} className={entry.emphasis ? 'border-l-2 border-wagashi-ginshu -ml-[2px] pl-w-2' : ''}>
                  <p className="font-num text-2xl text-wagashi-indigo">{entry.year}</p>
                  <h3 className="mt-w-1 font-serif text-lg text-wagashi-aizumi">{entry.title}</h3>
                  <p className="mt-w-1 text-wagashi-tanboku">{entry.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="relative overflow-hidden py-w-6 px-w-3 bg-wagashi-kinari">
          <div className="absolute inset-0 opacity-50">
            <Kikko size={500} />
          </div>
          <div className="relative mx-auto max-w-wagashi-card">
            <h2 className="font-serif text-3xl text-wagashi-indigo tracking-heading">できること</h2>
            <div className="mt-w-4 grid gap-w-4 md:grid-cols-3">
              {[
                { title: 'AI 実装・運用', items: ['業務での AI 日常運用（ChatGPT / Claude / Gemini）', 'AI エージェント開発（Discord / Obsidian）', 'Claude Code で業務スキル開発', 'プロンプト設計テンプレート運用'] },
                { title: '営業・組織開発', items: ['カウンセリング型営業 7 ステップ', 'インサイドセールス実務', '営業体制の制度設計（KPI/採用フロー）', '法人向け研修ファシリテーション'] },
                { title: 'コンテンツ発信', items: ['note 日次運用（毎日投稿）', 'Threads マーケティング（7カテゴリ・1日3回）', 'AI 下書き → 本人校正 → 公開パイプライン'] },
              ].map((col) => (
                <div key={col.title} className="border-l-2 border-wagashi-ginshu/40 pl-w-3">
                  <h3 className="font-serif text-lg text-wagashi-aizumi">{col.title}</h3>
                  <ul className="mt-w-2 space-y-w-1">
                    {col.items.map((s) => (
                      <li key={s} className="flex gap-w-2 text-sm text-wagashi-tanboku">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-wagashi-ginshu" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-w-6 px-w-3">
          <div className="mx-auto max-w-wagashi-read">
            <h2 className="font-serif text-3xl text-wagashi-indigo tracking-heading">大切にしている3つの軸</h2>
          </div>
          {aboutContentR4.philosophy.sections.map((sec) => (
            <article
              key={sec.id}
              id={sec.id}
              className="mx-auto mt-w-7 max-w-wagashi-read scroll-mt-w-5"
              aria-labelledby={`${sec.id}-h`}
            >
              <h3 id={`${sec.id}-h`} className="font-serif text-2xl text-wagashi-aizumi">
                {sec.title}
              </h3>
              <div className="mt-w-3 whitespace-pre-line text-base leading-body text-wagashi-charcoal">
                {sec.body}
              </div>
            </article>
          ))}
        </section>

        <section className="py-w-6 px-w-3 bg-wagashi-kinari">
          <div className="mx-auto max-w-wagashi-read whitespace-pre-line text-base leading-body text-wagashi-charcoal">
            {aboutContentR4.closing}
          </div>
          <div className="mx-auto mt-w-4 flex max-w-wagashi-read flex-wrap justify-center gap-w-2">
            <Link
              href={SITE_R4.timerex}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-wagashi-vermilion px-w-3 py-w-2 text-white"
            >
              無料相談を予約する →
            </Link>
            <Link href="/services" className="rounded-sm border border-wagashi-indigo px-w-3 py-w-2 text-wagashi-indigo">
              サービス一覧を見る
            </Link>
          </div>
        </section>
      </main>
      <FooterR4 />
    </>
  );
}
