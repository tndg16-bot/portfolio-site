import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/r4/metadata';
import { BreadcrumbSchemaR4 } from '@/components/r4/schema/BreadcrumbSchema';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';
import { ContactFormR4 } from './ContactForm';
import { SITE_R4 } from '@/data/r4/site';

export const metadata: Metadata = buildMetadata({
  title: 'お問い合わせ・無料相談予約',
  description: '法人のAI推進相談、個人のAI活用相談を30分無料で承ります。TimeRex予約・LINE・メールフォームから。',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchemaR4
        items={[
          { name: 'Top', url: `${SITE_R4.url}/` },
          { name: 'Contact', url: `${SITE_R4.url}/contact` },
        ]}
      />
      <HeaderR4 />
      <main className="bg-wagashi-cream">
        <section className="py-w-7 px-w-3">
          <div className="mx-auto max-w-wagashi-card">
            <h1 className="font-serif text-4xl leading-heading tracking-heading text-wagashi-aizumi md:text-5xl text-center">
              一度、話してみませんか。
            </h1>
            <p className="mt-w-3 text-center text-wagashi-tanboku">
              無理に決めなくて大丈夫です。話を聞かせてください。
            </p>

            <section className="mt-w-6 rounded-sm border border-wagashi-gold/30 bg-wagashi-kinari p-w-4">
              <p className="text-center font-serif text-sm text-wagashi-aizumi">
                <span className="rounded-sm bg-wagashi-gold/20 px-w-1 py-1 text-xs">おすすめ</span> 30 分の無料相談
              </p>
              <p className="mt-w-2 text-center text-wagashi-tanboku">
                TimeRex でカレンダーから空き時間を選べます。
              </p>
              <div className="mt-w-3 text-center">
                <a
                  href={SITE_R4.timerex}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-sm bg-wagashi-vermilion px-w-3 py-w-2 text-white"
                >
                  無料相談を予約する →
                </a>
              </div>
            </section>

            <section className="mt-w-5 text-center">
              <a
                href={SITE_R4.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-sm border border-wagashi-ginshu px-w-3 py-w-2 text-wagashi-ginshu"
              >
                LINE で気軽に質問だけでも →
              </a>
            </section>

            <details className="mt-w-6 rounded-sm border border-wagashi-tanboku/20 p-w-4 [&[open]>summary]:mb-w-3">
              <summary className="cursor-pointer list-none font-serif text-base text-wagashi-aizumi">
                ▾ より丁寧に書きたい方はフォームへ
              </summary>
              <ContactFormR4 />
            </details>
          </div>
        </section>
      </main>
      <FooterR4 />
    </>
  );
}
