import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { GetRequestConfigParams } from 'next-intl/server';

const locales = ['ja', 'en'] as const;
type Locale = typeof locales[number];

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams) => {
  // Ensure locale is a valid string
  const locale = await requestLocale;
  const validatedLocale = (locale || 'ja') as Locale;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(validatedLocale)) notFound();

  return {
    locale: validatedLocale,
    messages: (await import(`@/messages/${validatedLocale}.json`)).default,
  };
});
