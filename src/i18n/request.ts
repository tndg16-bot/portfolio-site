import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['ja', 'en'];

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is a valid string
  const validatedLocale = locale || 'ja';

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(validatedLocale as (typeof locales)[number])) notFound();

  return {
    locale: validatedLocale,
    messages: (await import(`@/messages/${validatedLocale}.json`)).default,
  };
});
