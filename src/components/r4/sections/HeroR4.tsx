import Link from 'next/link';
import Image from 'next/image';
import { Seigaiha } from '@/components/r4/wagashi';
import { SITE_R4 } from '@/data/r4/site';
import { aboutContentR4 } from '@/data/r4/about-content';

export function HeroR4({
  catch_: catchText,
  sub,
  pretitle,
}: {
  catch_: string;
  sub: string;
  pretitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-wagashi-cream to-wagashi-kinari py-w-7 md:py-w-8">
      <div className="absolute right-0 bottom-0 w-[40%] aspect-square">
        <Seigaiha size={400} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-wagashi-gold/30" />
      <div className="relative z-10 mx-auto grid max-w-wagashi-hero grid-cols-1 gap-w-6 px-w-3 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {pretitle ? (
            <div className="mb-w-3 flex items-center gap-w-2">
              <span className="block h-8 w-1 bg-wagashi-ginshu" aria-hidden="true" />
              <span className="font-en text-xs uppercase tracking-wider text-wagashi-tanboku">
                {pretitle}
              </span>
            </div>
          ) : null}
          <h1 className="font-serif text-4xl leading-heading tracking-heading text-wagashi-aizumi md:text-5xl lg:text-6xl">
            {catchText}
          </h1>
          <p className="mt-w-3 max-w-wagashi-read text-base leading-body text-wagashi-tanboku md:text-lg">
            {sub}
          </p>
          <div className="mt-w-4 flex flex-wrap gap-w-2">
            <Link
              href={SITE_R4.timerex}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-wagashi-vermilion px-w-3 py-w-2 font-medium text-white transition-colors duration-wagashi-hover hover:bg-[#d35400]"
            >
              無料相談を予約する（30分）→
            </Link>
            <Link
              href={SITE_R4.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-wagashi-indigo px-w-3 py-w-2 text-wagashi-indigo transition-colors duration-wagashi-hover hover:bg-wagashi-indigo hover:text-white"
            >
              LINE で気軽に聞く
            </Link>
          </div>
          <p className="mt-w-4 font-serif text-xs text-wagashi-tanboku">— 本山貴裕</p>
        </div>
        <div className="relative lg:col-span-4">
          <div className="relative aspect-square overflow-hidden rounded-sm bg-wagashi-kinari">
            <Image
              src="/images/motoyama-hero.webp"
              alt="本山貴裕のプロフィール写真。福岡を背景に微笑む3/4視線のカット"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              priority
              className="object-cover"
              placeholder="empty"
            />
            <div className="absolute right-2 bottom-2 h-6 w-8 bg-wagashi-gold/70" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

export const heroDefaults = aboutContentR4.hero;
