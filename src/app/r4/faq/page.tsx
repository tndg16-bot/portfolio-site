import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/r4/metadata';
import { faqR4 } from '@/data/r4/faq';
import { FaqSchemaR4 } from '@/components/r4/schema/FaqSchema';
import { BreadcrumbSchemaR4 } from '@/components/r4/schema/BreadcrumbSchema';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';
import Link from 'next/link';
import { SITE_R4 } from '@/data/r4/site';

export const metadata: Metadata = buildMetadata({
  title: 'よくある質問 / FAQ',
  description: 'AI研修の料金、助成金、個人向けサービス、初心者対応、業界特化など、よく寄せられる質問に回答。',
  path: '/faq',
});

export default function FaqPage() {
  const grouped = faqR4.reduce<Record<string, typeof faqR4>>((acc, f) => {
    (acc[f.category] ||= []).push(f);
    return acc;
  }, {});
  return (
    <>
      <FaqSchemaR4 faqs={faqR4} />
      <BreadcrumbSchemaR4
        items={[
          { name: 'Top', url: `${SITE_R4.url}/` },
          { name: 'FAQ', url: `${SITE_R4.url}/faq` },
        ]}
      />
      <HeaderR4 />
      <main className="bg-wagashi-cream">
        <section className="py-w-7 px-w-3">
          <div className="mx-auto max-w-wagashi-card">
            <h1 className="font-serif text-4xl leading-heading tracking-heading text-wagashi-aizumi md:text-5xl">
              よくある質問
            </h1>
            {Object.entries(grouped).map(([category, items]) => (
              <section key={category} className="mt-w-6">
                <h2 className="font-serif text-2xl text-wagashi-indigo tracking-heading">{category}</h2>
                <dl className="mt-w-3 space-y-w-3">
                  {items.map((f, i) => (
                    <details
                      key={i}
                      className="rounded-sm border-b border-wagashi-tanboku/15 transition-all duration-wagashi-accordion ease-wagashi-accordion"
                    >
                      <summary className="cursor-pointer list-none py-w-2 font-serif text-base text-wagashi-aizumi">
                        <span className="mr-w-1 font-en text-wagashi-ginshu">Q.</span>
                        {f.question}
                      </summary>
                      <div className="px-w-2 pb-w-3 text-wagashi-charcoal">
                        {f.answer}
                        {f.relatedHref ? (
                          <>
                            {' '}
                            <Link href={f.relatedHref} className="text-wagashi-ginshu underline-offset-2 hover:underline">
                              詳しく見る →
                            </Link>
                          </>
                        ) : null}
                      </div>
                    </details>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </section>
      </main>
      <FooterR4 />
    </>
  );
}
