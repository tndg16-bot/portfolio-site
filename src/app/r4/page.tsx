import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/r4/metadata';
import { aboutContentR4 } from '@/data/r4/about-content';
import { businessTiers, individualServices } from '@/data/r4/services';
import { testimonialsR4 } from '@/data/r4/testimonials';
import { HeroR4 } from '@/components/r4/sections/HeroR4';
import { RecentNotesR4 } from '@/components/r4/sections/RecentNotesR4';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';
import { PersonSchemaR4 } from '@/components/r4/schema/PersonSchema';
import { SITE_R4 } from '@/data/r4/site';

export const metadata: Metadata = buildMetadata({
  title: '本山貴裕 | AI研修・推進支援・個人向けAI活用伴走 (wagashi.dev)',
  description: 'AIを"知っている"から"使いこなす"へ。営業14年 × AI実装3年。法人向け研修・全社推進支援、個人向け伴走プログラムを提供。',
  path: '/',
});

const VALUES = [
  { ji: '聞', subtitle: '傾聴', desc: '商談の8割は聞く時間。AI 導入支援でも同じです。' },
  { ji: '型', subtitle: '実装の型', desc: '研修で終わらせず、業務フローに組み込むまで。' },
  { ji: '継', subtitle: '継続', desc: '組織の習慣として根付くまで地味に伴走します。' },
];

export default function HomePage() {
  return (
    <>
      <PersonSchemaR4 />
      <HeaderR4 />
      <main className="bg-wagashi-cream">
        <HeroR4
          catch_={aboutContentR4.hero.catchB2B}
          sub={aboutContentR4.hero.sub}
          pretitle="AI 実装の伴走者"
        />

        {/* 価値提供3要素：漢字一文字 */}
        <section className="py-w-7 px-w-3 bg-wagashi-kinari">
          <div className="mx-auto grid max-w-wagashi-card gap-w-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <article key={v.ji} className="text-center">
                <p className="font-serif text-7xl text-wagashi-aizumi md:text-8xl">{v.ji}</p>
                <p className="mt-w-2 font-en text-xs uppercase tracking-wider text-wagashi-ginshu">{v.subtitle}</p>
                <p className="mt-w-2 text-sm text-wagashi-tanboku">{v.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* サービスプレビュー */}
        <section className="py-w-7 px-w-3">
          <div className="mx-auto max-w-wagashi-card">
            <h2 className="font-serif text-3xl text-wagashi-indigo tracking-heading">サービス</h2>
            <p className="mt-w-2 text-wagashi-tanboku">
              法人向けは Tier 1-4、個人向けは確定額の 3 本立てで提供しています。
            </p>
            <div className="mt-w-4 grid gap-w-3 md:grid-cols-2">
              <Link
                href="/services?audience=business"
                className="block rounded-sm border border-wagashi-tanboku/20 bg-wagashi-kinari p-w-4 transition-colors duration-wagashi-hover hover:border-wagashi-indigo"
              >
                <p className="font-en text-xs uppercase tracking-wider text-wagashi-ginshu">For Business</p>
                <h3 className="mt-w-2 font-serif text-xl text-wagashi-aizumi">法人向け 4 階層</h3>
                <p className="mt-w-2 text-sm text-wagashi-tanboku">
                  ¥3万〜（半日WS）／¥10-20万/月（3ヶ月伴走）／¥30-50万/月〜（PoC並走）／要問合せ（全社推進）
                </p>
                <p className="mt-w-3 font-en text-xs uppercase tracking-wider text-wagashi-ginshu">View →</p>
              </Link>
              <Link
                href="/services?audience=individual"
                className="block rounded-sm border border-wagashi-tanboku/20 bg-wagashi-kinari p-w-4 transition-colors duration-wagashi-hover hover:border-wagashi-indigo"
              >
                <p className="font-en text-xs uppercase tracking-wider text-wagashi-ginshu">For Individuals</p>
                <h3 className="mt-w-2 font-serif text-xl text-wagashi-aizumi">個人向け 3 本</h3>
                <p className="mt-w-2 text-sm text-wagashi-tanboku">
                  ¥10,000（90分単発）／¥30,000-80,000（モヤモヤ整理セッション）／¥150,000（3ヶ月伴走）
                </p>
                <p className="mt-w-3 font-en text-xs uppercase tracking-wider text-wagashi-ginshu">View →</p>
              </Link>
            </div>
          </div>
        </section>

        {/* 実績数値 */}
        <section className="py-w-7 px-w-3 bg-wagashi-aizumi text-wagashi-kinari">
          <div className="mx-auto grid max-w-wagashi-card gap-w-5 md:grid-cols-3 text-center">
            {[
              { value: '14年', label: '営業現場経験' },
              { value: '20+社', label: '法人 AI 研修・推進支援（協業）' },
              { value: '78%', label: '研修後の現場活用継続率（一例）' },
            ].map((m) => (
              <article key={m.label}>
                <p className="font-num text-5xl text-wagashi-gold md:text-6xl">{m.value}</p>
                <p className="mt-w-2 text-sm text-wagashi-kinari/80">{m.label}</p>
              </article>
            ))}
          </div>
        </section>

        {/* RecentNotes セクション */}
        <RecentNotesR4 />

        {/* お客様の声 (placeholder) */}
        <section className="py-w-7 px-w-3">
          <div className="mx-auto max-w-wagashi-card">
            <h2 className="font-serif text-3xl text-wagashi-indigo tracking-heading">お客様の声</h2>
            <div className="mt-w-5 grid gap-w-4 md:grid-cols-3">
              {testimonialsR4.map((t) => (
                <article
                  key={t.id}
                  className="border border-wagashi-tanboku/20 bg-wagashi-kinari p-w-3"
                >
                  <p className="font-serif text-2xl text-wagashi-ginshu">「」</p>
                  <p className="mt-w-2 text-sm text-wagashi-charcoal">{t.quote}</p>
                  <p className="mt-w-3 text-xs text-wagashi-tanboku">{t.attribution}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-w-7 px-w-3 bg-wagashi-kinari">
          <div className="mx-auto max-w-wagashi-read text-center">
            <h2 className="font-serif text-4xl text-wagashi-aizumi md:text-5xl">
              一度、話してみませんか。
            </h2>
            <p className="mt-w-3 text-wagashi-tanboku">
              法人の方も、個人で動いている方も歓迎です。30 分の無料相談からどうぞ。
            </p>
            <div className="mt-w-4">
              <Link
                href={SITE_R4.timerex}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-sm bg-wagashi-vermilion px-w-4 py-w-2 text-white"
              >
                無料相談を予約する →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterR4 />
    </>
  );
}
