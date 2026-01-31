export const locales = ['ja', 'en'];
export const defaultLocale = 'ja';
export type Locale = (typeof locales)[number];

export function getLocalizedPath(pathname: string, locale: Locale) {
  // Remove leading slash if present
  const cleanPath = pathname.replace(/^\//, '');

  // If the path starts with a locale, replace it
  const localeMatch = locales.find(loc => cleanPath.startsWith(`${loc}/`) || cleanPath === loc);
  if (localeMatch) {
    const withoutLocale = cleanPath.replace(new RegExp(`^${localeMatch}/?`), '');
    return `/${locale}/${withoutLocale}`;
  }

  // Otherwise, prepend the locale
  return `/${locale}/${cleanPath}`;
}

export function removeLocaleFromPath(pathname: string, locale: Locale): string {
  const withoutLocale = pathname.replace(new RegExp(`^/${locale}`), '');
  return withoutLocale || '/';
}
