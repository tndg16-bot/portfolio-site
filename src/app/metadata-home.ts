import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。",
  openGraph: {
    title: "本山 貴裕 | Life Self-Determination Protocol",
    description: "「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。",
    url: "https://takahiro-motoyama.vercel.app",
    images: [{ url: "/images/ogp-default.jpg", width: 1200, height: 630 }]
  },
  alternates: {
    canonical: "https://takahiro-motoyama.vercel.app"
  }
};
