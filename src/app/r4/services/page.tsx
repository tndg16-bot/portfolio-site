import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/r4/metadata';
import { businessTiers, individualServices } from '@/data/r4/services';
import { BreadcrumbSchemaR4 } from '@/components/r4/schema/BreadcrumbSchema';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';
import { Asanoha } from '@/components/r4/wagashi';
import { SITE_R4 } from '@/data/r4/site';

export const metadata: Metadata = buildMetadata({
  title: 'サービス一覧 | 法人向け AI 研修・個人向け AI 活用',
  description: '法人向け AI 研修・推進支援を Tier 1-4 で、個人向け AI 活用ワークショップ・伴走を 3 本で提供。AI 導入から全社展開、副業立ち上げまで対応。',
  path: '/services',
  ogCategory: 'service',
});

function TierCard({
  href,
  tierLabel,
  name,
  price,
  duration,
  target,
}: {
  href: string;
  tierLabel: string;
  name: string;
  price: string;
  duration: string;
  target: string;
}) {
  return (
    <Link
      href={href}
      className="relative block overflow-hidden rounded-sm border border-wagashi-tanboku/20 bg-wagashi-kinari p-w-3 transition-colors duration-wagashi-hover hover:border-wagashi-indigo"
    >
      <div className="absolute inset-0 opacity-30">
        <Asanoha size={400} />
      </div>
      <div className="relative">
        <div className="flex items-center gap-w-1">
          <span className="block h-4 w-1 bg-wagashi-ginshu" aria-hidden="true" />
          <span className="font-en text-xs uppercase tracking-wider text-wagashi-tanboku">{tierLabel}</span>
        </div>
        <h3 className="mt-w-2 font-serif text-xl text-wagashi-aizumi">{name}</h3>
        <p className="mt-w-2 font-num text-2xl text-wagashi-indigo">{price}</p>
        <p className="mt-w-1 text-sm text-wagashi-tanboku">{duration}</p>
        <p className="mt-w-2 text-sm text-wagashi-tanboku">{target}</p>
        <span className="mt-w-3 inline-block font-en text-xs uppercase tracking-wider text-wagashi-ginshu">
          詳細を見る →
        </span>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchemaR4
        items={[
          { name: 'Top', url: `${SITE_R4.url}/` },
          { name: 'Services', url: `${SITE_R4.url}/services` },
        ]}
      />
      <HeaderR4 />
      <main className="bg-wagashi-cream">
        <section className="py-w-7 px-w-3">
          <div className="mx-auto max-w-wagashi-read">
            <h1 className="font-serif text-4xl leading-heading tracking-heading text-wagashi-aizumi md:text-5xl">
              あなたの組織と業務に、AI を溶かす。
            </h1>
            <p className="mt-w-3 text-wagashi-tanboku">
              法人向けは Tier 1-4 の購買導線、個人向けは確定額の 3 本立て。
              料金・期間・対象を一覧で 5 秒で判別できる構造にしています。
            </p>
          </div>
        </section>

        <section className="px-w-3 py-w-6 bg-wagashi-kinari">
          <div className="mx-auto max-w-wagashi-card">
            <h2 className="font-serif text-2xl text-wagashi-indigo tracking-heading">法人向け（Tier 1-4）</h2>
            <div className="mt-w-4 grid gap-w-3 md:grid-cols-2 lg:grid-cols-4">
              {businessTiers.map((s) => (
                <TierCard
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  tierLabel={`Tier ${s.tier} — ${s.tier === 1 ? '入口' : s.tier === 2 ? 'スケール' : s.tier === 3 ? '深化' : 'エンタープライズ'}`}
                  name={s.name}
                  price={s.priceLabel}
                  duration={s.duration}
                  target={s.targetBuyer.split('。')[0]}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-w-3 py-w-6">
          <div className="mx-auto max-w-wagashi-card">
            <h2 className="font-serif text-2xl text-wagashi-indigo tracking-heading">個人向け</h2>
            <div className="mt-w-4 grid gap-w-3 md:grid-cols-3">
              {individualServices.map((s) => (
                <TierCard
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  tierLabel="個人"
                  name={s.name}
                  price={s.priceLabel}
                  duration={s.duration}
                  target={s.targetBuyer.split('。')[0]}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterR4 />
    </>
  );
}
