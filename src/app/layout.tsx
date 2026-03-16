import { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { SectionBackground } from "@/components/SectionBackground";
import { PersonJsonLd, OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://takahiro-motoyama.vercel.app"),
  title: {
    default: "本山 貴裕 | Life Self-Determination Protocol",
    template: "%s | 本山 貴裕"
  },
  description: "「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。",
  keywords: [
    "コーチング",
    "AI活用",
    "人生設計",
    "自己決定",
    "ライフコーチ",
    "キャリアデザイン",
    "AIコンサルティング",
    "モヤモヤ整理",
    "対話セッション"
  ],
  authors: [{ name: "本山貴裕" }],
  creator: "本山貴裕",
  publisher: "本山貴裕",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://takahiro-motoyama.vercel.app",
    siteName: "本山 貴裕 | Life Self-Determination Protocol",
    title: "本山 貴裕 | Life Self-Determination Protocol",
    description: "「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。",
    images: [
      {
        url: "/images/ogp-default.jpg",
        width: 1200,
        height: 630,
        alt: "本山 貴裕 | Life Self-Determination Protocol"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "本山 貴裕 | Life Self-Determination Protocol",
    description: "「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。",
    images: ["/images/ogp-default.jpg"],
    // creator: "Set your Twitter handle here when available"
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://takahiro-motoyama.vercel.app"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`scroll-smooth ${notoSerifJP.variable}`}>
      <head>
        <meta name="theme-color" content="#165E83" />
      </head>
      <body className={`${inter.variable} ${notoJP.variable} font-sans antialiased japan-bg overflow-x-hidden`}>
        <GoogleAnalytics />
        <PersonJsonLd />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <SectionBackground />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
