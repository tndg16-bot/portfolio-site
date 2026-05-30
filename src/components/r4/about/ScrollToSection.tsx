'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function ScrollToSectionR4() {
  const sp = useSearchParams();
  useEffect(() => {
    const id = sp?.get('section');
    if (!id) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.setAttribute('tabindex', '-1');
      (el as HTMLElement).focus({ preventScroll: true });
    });
  }, [sp]);
  return null;
}
