import Link from 'next/link';
import { footerNavR4 } from '@/data/r4/navigation';
import { SITE_R4 } from '@/data/r4/site';
import { RakkanYama, Seigaiha } from '@/components/r4/wagashi';

export function FooterR4() {
  return (
    <footer className="relative mt-w-8 border-t border-wagashi-tanboku/20 bg-wagashi-aizumi text-wagashi-kinari">
      <div className="absolute top-0 right-0 h-[60px] w-[40%] overflow-hidden opacity-30">
        <Seigaiha size={320} color="#F8F3E6" opacity={0.1} />
      </div>
      <div className="mx-auto flex max-w-wagashi-hero justify-center pt-w-3" aria-hidden="false">
        <RakkanYama />
      </div>
      <div className="relative mx-auto grid max-w-wagashi-hero gap-w-4 px-w-3 py-w-4 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-serif text-xl text-wagashi-kinari">本山貴裕</p>
          <p className="mt-w-1 text-sm text-wagashi-kinari/70">AI 研修・推進支援・個人向け AI 活用伴走</p>
        </div>
        {[
          { title: 'サービス', items: footerNavR4.services },
          { title: 'コンテンツ', items: footerNavR4.contents },
          { title: 'お問い合わせ', items: footerNavR4.contact },
        ].map((col) => (
          <div key={col.title}>
            <p className="font-serif text-sm text-wagashi-kinari/80">{col.title}</p>
            <ul className="mt-w-2 space-y-w-1">
              {col.items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="text-sm text-wagashi-kinari/70 transition-colors duration-wagashi-hover hover:text-wagashi-gold"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-wagashi-kinari/15">
        <div className="mx-auto flex max-w-wagashi-hero flex-col gap-w-1 px-w-3 py-w-2 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-w-3 text-xs text-wagashi-kinari/60">
            {footerNavR4.legal.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className="transition-colors duration-wagashi-hover hover:text-wagashi-gold"
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="font-en text-xs text-wagashi-kinari/60">© {new Date().getFullYear()} 本山貴裕 / {SITE_R4.shortName}</p>
        </div>
      </div>
    </footer>
  );
}
