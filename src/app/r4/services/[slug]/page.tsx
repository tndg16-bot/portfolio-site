import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { buildMetadata } from '@/lib/r4/metadata';
import { allServicesR4, getServiceR4BySlug } from '@/data/r4/services';
import { ServiceSchemaR4 } from '@/components/r4/schema/ServiceSchema';
import { BreadcrumbSchemaR4 } from '@/components/r4/schema/BreadcrumbSchema';
import { FaqSchemaR4 } from '@/components/r4/schema/FaqSchema';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';
import { RelatedNotesR4 } from '@/components/r4/sections/RelatedNotesR4';
import { SITE_R4 } from '@/data/r4/site';

export async function generateStaticParams() {
  return allServicesR4.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceR4BySlug(slug);
  if (!s) return {};
  return buildMetadata({
    title: `${s.name} | サービス`,
    description: s.shortDescription,
    path: `/services/${s.slug}`,
    ogCategory: 'service',
  });
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceR4BySlug(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceSchemaR4 service={service} />
      <FaqSchemaR4 faqs={service.faqs.map((f) => ({ category: '', question: f.q, answer: f.a }))} />
      <BreadcrumbSchemaR4
        items={[
          { name: 'Top', url: `${SITE_R4.url}/` },
          { name: 'Services', url: `${SITE_R4.url}/services` },
          { name: service.name, url: `${SITE_R4.url}/services/${service.slug}` },
        ]}
      />
      <HeaderR4 />
      <main className="bg-wagashi-cream">
        <section className="py-w-7 px-w-3">
          <div className="mx-auto max-w-wagashi-read">
            <p className="font-en text-xs uppercase tracking-wider text-wagashi-tanboku">
              {service.audience === 'business' ? `Tier ${service.tier} / 法人` : '個人向け'}
            </p>
            <h1 className="mt-w-2 font-serif text-3xl leading-heading tracking-heading text-wagashi-aizumi md:text-4xl">
              {service.name}
            </h1>
            <p className="mt-w-3 text-wagashi-tanboku">{service.shortDescription}</p>
            <div className="mt-w-4 inline-flex items-baseline gap-w-2 border-l-2 border-wagashi-ginshu pl-w-3">
              <p className="font-num text-3xl text-wagashi-indigo">{service.priceLabel}</p>
            </div>
            <p className="mt-w-1 text-sm text-wagashi-tanboku">{service.duration}</p>
          </div>
        </section>

        <section className="px-w-3 py-w-6 bg-wagashi-kinari">
          <div className="mx-auto max-w-wagashi-read whitespace-pre-line text-wagashi-charcoal">
            {service.longDescription}
          </div>
        </section>

        <section className="px-w-3 py-w-6">
          <div className="mx-auto max-w-wagashi-card">
            <h2 className="font-serif text-2xl text-wagashi-indigo">こんな方におすすめ</h2>
            <p className="mt-w-3 text-wagashi-charcoal">{service.targetBuyer}</p>
          </div>
        </section>

        <section className="px-w-3 py-w-6 bg-wagashi-kinari">
          <div className="mx-auto max-w-wagashi-card">
            <h2 className="font-serif text-2xl text-wagashi-indigo">プロセス</h2>
            <ol className="mt-w-4 space-y-w-3 border-l border-wagashi-ginshu/40 pl-w-3">
              {service.process.map((p) => (
                <li key={p.step}>
                  <p className="font-num text-xl text-wagashi-indigo">Step {p.step}</p>
                  <h3 className="mt-w-1 font-serif text-base text-wagashi-aizumi">{p.title}</h3>
                  <p className="mt-w-1 text-sm text-wagashi-tanboku">{p.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-w-3 py-w-6">
          <div className="mx-auto max-w-wagashi-card">
            <h2 className="font-serif text-2xl text-wagashi-indigo">よくある質問</h2>
            <dl className="mt-w-4 space-y-w-3">
              {service.faqs.map((f, i) => (
                <div key={i} className="border-b border-wagashi-tanboku/20 pb-w-3">
                  <dt className="font-serif text-base text-wagashi-aizumi">
                    <span className="font-en text-wagashi-ginshu">Q.</span> {f.q}
                  </dt>
                  <dd className="mt-w-1 text-wagashi-tanboku">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="px-w-3 py-w-6 bg-wagashi-kinari">
          <div className="mx-auto max-w-wagashi-card">
            <RelatedNotesR4 tags={service.relatedNoteTags} serviceSlug={service.slug} />
          </div>
        </section>

        <section className="px-w-3 py-w-6">
          <div className="mx-auto max-w-wagashi-read text-center">
            <p className="font-serif text-xl text-wagashi-aizumi">{service.cta.primary}</p>
            <div className="mt-w-3 flex flex-wrap justify-center gap-w-2">
              <Link
                href={SITE_R4.timerex}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-wagashi-vermilion px-w-3 py-w-2 text-white"
              >
                無料相談を予約する →
              </Link>
              <Link href="/contact" className="rounded-sm border border-wagashi-indigo px-w-3 py-w-2 text-wagashi-indigo">
                フォームで送る
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterR4 />
    </>
  );
}
