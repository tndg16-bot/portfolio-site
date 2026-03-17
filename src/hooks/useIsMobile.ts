'use client';

import { useSyncExternalStore } from 'react';

const query = '(max-width: 768px)';

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Returns true when the viewport width is 768px or less (mobile breakpoint).
 * Used to serve appropriately-sized image assets.
 */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
