import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sessions",
  description: "60分で、価値観と判断軸を言語化して、次の一歩まで落とします。無料のモヤモヤ整理セッションを予約。",
  keywords: ["セッション予約", "モヤモヤ整理", "コーチング", "人生設計", "AI活用"],
  openGraph: {
    title: "Sessions | 本山 貴裕",
    description: "60分で、価値観と判断軸を言語化して、次の一歩まで落とします。無料のモヤモヤ整理セッションを予約。",
    url: "https://takahiro-motoyama.vercel.app/sessions",
    images: [{ url: "/images/ogp-sessions.jpg", width: 1200, height: 630 }]
  },
  alternates: {
    canonical: "https://takahiro-motoyama.vercel.app/sessions"
  }
};
