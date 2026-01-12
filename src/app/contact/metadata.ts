import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "お気軽にご連絡ください。無料相談の予約やメールでの問い合わせも承っております。",
  keywords: ["お問い合わせ", "セッション予約", "無料相談", "連絡先"],
  openGraph: {
    title: "Contact | 本山 貴裕",
    description: "お気軽にご連絡ください。無料相談の予約やメールでの問い合わせも承っております。",
    url: "https://takahiro-motoyama.vercel.app/contact",
    images: [{ url: "/images/ogp-contact.jpg", width: 1200, height: 630 }]
  },
  alternates: {
    canonical: "https://takahiro-motoyama.vercel.app/contact"
  }
};
