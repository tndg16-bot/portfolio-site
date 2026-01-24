import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Noto_Sans_JP } from "next/font/google";
import "../../globals.css";
import { LiquidCursor } from "@/components/LiquidCursor";
import { SectionBackground } from "@/components/SectionBackground";
import { PersonJsonLd, OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { routing } from "@/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
});

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    metadataBase: new URL("https://takahiro-motoyama.vercel.app"),
    title: {
      default: locale === 'ja'
        ? "本山 貴大 | Life Self-Determination Protocol"
        : "Takahiro Motoyama | Life Self-Determination Protocol",
      template: "%s | 本山 貴大"
    },
    description: locale === 'ja'
      ? "「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。"
      : "From 'how-to dependency' to 'life self-determination'. Design your autonomous life with AI and philosophy.",
    keywords: locale === 'ja' ? [
      "コーチング",
      "AI活用",
      "人生設計",
      "自己決定",
      "ライフコーチ",
      "キャリアデザイン",
      "AIコンサルティング",
      "モヤモヤ整理",
      "対話セッション"
    ] : [
      "coaching",
      "AI utilization",
      "life design",
      "self-determination",
      "life coach",
      "career design",
      "AI consulting",
      "clarity",
      "coaching sessions"
    ],
    alternates: {
      languages: {
        ja: '/ja',
        en: '/en',
      },
      canonical: "https://takahiro-motoyama.vercel.app"
    }
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.variable} ${notoJP.variable} font-sans antialiased japan-bg overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          <PersonJsonLd />
          <OrganizationJsonLd />
          <WebsiteJsonLd />
          <SectionBackground />
          <LiquidCursor />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
