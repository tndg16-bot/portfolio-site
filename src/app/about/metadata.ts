import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "「判断軸を取り戻して、自分で決められる人を増やしたい」。コーチング理念と経歴のご紹介。",
  keywords: ["コーチング理念", "経歴", "自己決定", "コーチング実績"],
  openGraph: {
    title: "About | 本山 貴裕",
    description: "「判断軸を取り戻して、自分で決められる人を増やしたい」。コーチング理念と経歴をご紹介。",
    url: "https://takahiro-motoyama.vercel.app/about",
    images: [{ url: "/images/ogp-about.jpg", width: 1200, height: 630 }]
  },
  alternates: {
    canonical: "https://takahiro-motoyama.vercel.app/about"
  }
};
