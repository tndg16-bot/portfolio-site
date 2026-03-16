"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import Link from 'next/link';

const BookingForm = dynamic(() => import('@/components/BookingForm'), {
  loading: () => <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-japan-indigo"></div>
  </div>,
  ssr: false
});

const WorksCollection = dynamic(() => import('@/components/WorksCollection'), {
  loading: () => <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-japan-indigo"></div>
  </div>,
  ssr: false
});

const NewsletterForm = dynamic(() => import('@/components/NewsletterForm'), {
  loading: () => <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-japan-indigo"></div>
  </div>,
  ssr: false
});

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-20 text-japan-charcoal">
      <Header />

      {/* ===== 1. Hero Section ===== */}
      <section id="section-hero" className="relative flex min-h-screen w-full flex-col items-center justify-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="z-10 w-full max-w-4xl rounded-3xl p-8 md:p-16 text-center"
        >
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-japan-indigo/5 px-4 py-1 text-sm font-medium text-japan-indigo border border-japan-indigo/10">
              <span>Life Self-Determination Protocol</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-bold tracking-tight md:text-7xl leading-tight drop-shadow-sm"
          >
            AIと人の力で、<br />
            <span className="text-japan-gradient">ビジネスの仕組み</span>をつくる
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-10 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto text-zinc-800"
          >
            AI導入コンサルティング・業務自動化・1on1コーチング。<br />
            個人の副業設計から法人のDX推進まで、<br />
            戦略立案と実装をワンストップで支援します。
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {/* Primary CTA */}
            <Link
              href="/contact"
              className="bg-japan-vermilion text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 group"
            >
              無料で相談する
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            {/* Secondary CTA */}
            <a
              href="#works"
              className="border-2 border-japan-indigo text-japan-indigo px-8 py-4 rounded-full text-lg hover:bg-japan-indigo hover:text-white transition-all flex items-center gap-2"
            >
              実績を見る
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>

      </section>

      {/* ===== 2. Services Overview Section ===== */}
      <section id="services" className="w-full py-24 bg-white/40">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-japan-indigo mb-4">サービス紹介</h2>
            <p className="text-zinc-800 text-lg max-w-2xl mx-auto">
              個人の副業・キャリア設計から、法人のAI導入・DX推進まで対応しています。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                label: "01",
                title: "個人向けサービス",
                description: "1on1コーチング・AI活用支援で、キャリア設計と副業立ち上げを伴走します。",
                href: "/services#individual",
              },
              {
                label: "02",
                title: "法人向けサービス",
                description: "AI導入支援・DX推進コンサルティングで、業務効率化と組織変革を支援します。",
                href: "/services#corporate",
              },
              {
                label: "03",
                title: "AI開発支援",
                description: "オリジナルGPTs・チャットボット・自動化システムを開発・実装します。",
                href: "/services#ai-dev",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link
                  href={service.href}
                  className="group block bg-white rounded-2xl p-8 border border-japan-indigo/10 hover:border-japan-indigo/30 hover:shadow-lg transition-all duration-300 h-full"
                >
                  <span className="text-3xl font-bold text-japan-gold mb-6 block">{service.label}</span>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-zinc-700 mb-4 leading-relaxed">{service.description}</p>
                  <span className="inline-flex items-center gap-1 text-japan-indigo font-medium text-sm group-hover:gap-2 transition-all">
                    詳しく見る
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. Works / Portfolio Section ===== */}
      <section id="works" className="w-full py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-japan-indigo mb-4">実績・ポートフォリオ</h2>
            <p className="text-zinc-800 text-lg max-w-2xl mx-auto">
              開発したサービス・ツール・学習教材をご覧ください。
            </p>
          </motion.div>
          <WorksCollection />
        </div>
      </section>

      {/* ===== 4. About Overview Section ===== */}
      <section id="about" className="w-full py-24 bg-white/40">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-3xl p-8 md:p-12 border border-japan-indigo/10 flex flex-col md:flex-row items-center gap-8"
          >
            {/* Photo Placeholder */}
            <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-japan-indigo flex items-center justify-center">
              <User className="h-16 w-16 text-white/80" />
            </div>

            {/* Bio */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-japan-indigo mb-3">Takahiro Motoyama</h2>
              <p className="text-zinc-800 leading-relaxed mb-2">
                AI時代の「自己決定」を支援するコーチ兼エンジニア。
                情報過多の時代に、静寂の中で研ぎ澄まされる直感と最先端AIの力を掛け合わせ、
                一人ひとりが自分だけの羅針盤を手にするためのセッション・プロダクトを提供しています。
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-japan-indigo font-medium hover:gap-3 transition-all mt-4 group"
              >
                詳しく見る
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 5. Booking / Contact Section ===== */}
      <section id="booking-section" className="w-full py-24">
        <BookingForm />
      </section>

      {/* ===== 6. Newsletter + LINE CTA Section ===== */}
      <section id="newsletter" className="w-full py-24 bg-white/40">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-japan-indigo mb-4">最新情報を受け取る</h2>
            <p className="text-zinc-800 text-lg">ニュースレターやLINEで、限定コンテンツをお届けします。</p>
          </motion.div>

          {/* Newsletter */}
          <NewsletterForm />


          {/* LINE CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl bg-white/50 border border-japan-indigo/10 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-japan-indigo mb-2">LINE登録で無料特典</h3>
                <p className="text-zinc-800 text-sm">AI副業ロードマップPDF + 初回相談無料</p>
              </div>
              <a
                href="https://lin.ee/VAYurUv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#06C755] text-white px-6 py-3 rounded-full font-bold hover:brightness-110 transition-all"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINEで友だち追加
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-japan-indigo/10 bg-japan-indigo/5">
        {/* 3-Column Links */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Column 1: Services */}
            <div>
              <h4 className="text-sm font-bold text-japan-indigo uppercase tracking-wider mb-4">サービス</h4>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li>
                  <Link href="/services" className="hover:text-japan-indigo transition-colors">個人向けサービス</Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-japan-indigo transition-colors">法人向けサービス</Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-japan-indigo transition-colors">AI開発支援</Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Content */}
            <div>
              <h4 className="text-sm font-bold text-japan-indigo uppercase tracking-wider mb-4">コンテンツ</h4>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li>
                  <Link href="/blog" className="hover:text-japan-indigo transition-colors">ブログ</Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-japan-indigo transition-colors">実績・作品集</Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-japan-indigo transition-colors">よくある質問</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h4 className="text-sm font-bold text-japan-indigo uppercase tracking-wider mb-4">お問い合わせ</h4>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li>
                  <Link href="/contact" className="hover:text-japan-indigo transition-colors">無料相談予約</Link>
                </li>
                <li>
                  <a
                    href="https://lin.ee/VAYurUv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-japan-indigo transition-colors"
                  >
                    LINE
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-japan-indigo/10">
          <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
            <p className="tracking-wide">&copy; 2026 TAKAHIRO MOTOYAMA</p>
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/privacy" className="hover:text-japan-indigo transition-colors">プライバシーポリシー</Link>
              <Link href="/legal" className="hover:text-japan-indigo transition-colors">特定商取引法に基づく表記</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
