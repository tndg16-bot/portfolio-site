import Link from 'next/link';
import { navItemsR4 } from '@/data/r4/navigation';
import { SITE_R4 } from '@/data/r4/site';

export function HeaderR4() {
  return (
    <header className="border-b border-wagashi-tanboku/15 bg-wagashi-cream/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="mx-auto flex max-w-wagashi-hero items-center justify-between gap-w-3 px-w-3 py-w-2">
        <Link
          href="/"
          className="font-serif text-lg text-wagashi-aizumi tracking-heading hover:text-wagashi-indigo"
        >
          本山貴裕
        </Link>
        <nav aria-label="メイン" className="hidden md:block">
          <ul className="flex items-center gap-w-3">
            {navItemsR4.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className="font-en text-sm uppercase tracking-wider text-wagashi-tanboku transition-colors duration-wagashi-hover hover:text-wagashi-indigo"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={SITE_R4.timerex}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-wagashi-vermilion px-w-3 py-w-1 text-sm text-white transition-colors duration-wagashi-hover hover:bg-[#d35400]"
              >
                無料相談 →
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
