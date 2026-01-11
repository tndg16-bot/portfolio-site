import { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { LiquidCursor } from "@/components/LiquidCursor";
import { SectionBackground } from "@/components/SectionBackground";
import { PersonJsonLd, OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://takahiro-motoyama.vercel.app"),
  title: {
    default: "本山 貴大 | Life Self-Determination Protocol",
    template: "%s | 本山 貴大"
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
  authors: [{ name: "本山貴大" }],
  creator: "本山貴大",
  publisher: "本山貴大",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://takahiro-motoyama.vercel.app",
    siteName: "本山 貴大 | Life Self-Determination Protocol",
    title: "本山 貴大 | Life Self-Determination Protocol",
    description: "「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。",
    images: [
      {
        url: "/images/ogp-default.jpg",
        width: 1200,
        height: 630,
        alt: "本山 貴大 | Life Self-Determination Protocol"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "本山 貴大 | Life Self-Determination Protocol",
    description: "「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。",
    images: ["/images/ogp-default.jpg"],
    creator: "@your-twitter-handle"
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
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
    <html lang="ja" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.variable} ${notoJP.variable} font-sans antialiased bali-bg overflow-x-hidden`}>
        <PersonJsonLd />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <SectionBackground />
        <LiquidCursor />
        {children}
      </body>
    </html>
  );
}
