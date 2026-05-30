import Link from 'next/link';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';

export default function NotFoundR4() {
  return (
    <>
      <HeaderR4 />
      <main className="bg-wagashi-cream min-h-[60vh] grid place-items-center px-w-3">
        <div className="text-center">
          <p className="font-num text-7xl text-wagashi-aizumi">404</p>
          <p className="mt-w-3 font-serif text-xl text-wagashi-aizumi">このページは、まだ書いていません。</p>
          <Link
            href="/"
            className="mt-w-4 inline-block rounded-sm bg-wagashi-vermilion px-w-3 py-w-2 text-white"
          >
            トップへ戻る →
          </Link>
        </div>
      </main>
      <FooterR4 />
    </>
  );
}
