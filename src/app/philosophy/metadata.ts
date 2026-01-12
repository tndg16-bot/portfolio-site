import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Philosophy",
  description: "人生の自己決定を取り戻す。溢れる情報と「正解」の押し付けから、魂の呼吸を守り抜く。",
  keywords: ["人生哲学", "自己決定", "聖域", "AI活用", "静寂"],
  openGraph: {
    title: "Philosophy | 本山 貴裕",
    description: "人生の自己決定を取り戻す。溢れる情報と「正解」の押し付けから、魂の呼吸を守り抜く。",
    url: "https://takahiro-motoyama.vercel.app/philosophy",
    images: [{ url: "/images/ogp-philosophy.jpg", width: 1200, height: 630 }]
  },
  alternates: {
    canonical: "https://takahiro-motoyama.vercel.app/philosophy"
  }
};
