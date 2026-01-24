"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Compass, Cpu, Target, CheckCircle2, Sparkles, Zap, Shield, Globe } from "lucide-react";
import { useTranslations } from 'next-intl';
import { Link } from "@/i18n";
import dynamic from 'next/dynamic';
import Header from "@/components/Header";

const Dashboard = dynamic(() => import('@/components/Dashboard'), {
  loading: () => <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-japan-indigo"></div>
  </div>,
  ssr: false
});

const BookingForm = dynamic(() => import('@/components/BookingForm'), {
  loading: () => <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-japan-indigo"></div>
  </div>,
  ssr: false
});

export default function Home() {
  const t = useTranslations('home');
  const common = useTranslations('common');

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
      {/* Language Switcher */}
      <div className="fixed top-20 right-4 z-50">
        <Link href="/ja" className="px-3 py-1 rounded-l bg-japan-indigo/10 text-japan-indigo hover:bg-japan-indigo/20 transition-colors">
          JA
        </Link>
        <Link href="/en" className="px-3 py-1 rounded-r bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
          EN
        </Link>
      </div>

      {/* Hero Section */}
      <section id="section-hero" className="relative flex min-h-screen w-full flex-col items-center justify-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="glass-panel z-10 w-full max-w-4xl rounded-3xl p-8 md:p-16 text-center shadow-2xl backdrop-blur-xl"
        >
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-japan-indigo/5 px-4 py-1 text-sm font-medium text-japan-indigo border border-japan-indigo/10">
              <Sparkles size={16} />
              <span>Life Self-Determination Protocol</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-bold tracking-tight md:text-7xl leading-tight drop-shadow-sm text-japan-indigo"
          >
            静寂の中で、<br />
            <span className="text-japan-gradient">「自分の直感」</span>を再編する
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-10 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto text-zinc-600"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/sessions"
              className="flex h-14 items-center gap-2 rounded-full bg-japan-indigo px-8 text-lg font-bold text-white transition-all hover:bg-japan-indigo/90 hover:scale-105 active:scale-95 shadow-xl group"
            >
              {common('bookSession')}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://ai-diagnosis-six.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center gap-2 rounded-full bg-japan-vermilion px-8 text-lg font-bold text-white transition-all hover:brightness-110 hover:scale-105 active:scale-95 shadow-xl group"
            >
              <Sparkles className="h-5 w-5" />
              無料で適性診断
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/philosophy"
              className="glass-card flex h-14 items-center gap-2 rounded-full px-8 text-lg font-bold text-japan-indigo border border-japan-indigo/20 hover:bg-japan-indigo/5 transition-all"
            >
              メソッドを探究する
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 z-0 opacity-10">
          {[
            { top: "15%", left: "10%", duration: 6 },
            { top: "25%", left: "80%", duration: 7 },
            { top: "40%", left: "20%", duration: 8 },
            { top: "60%", left: "70%", duration: 6 },
            { top: "75%", left: "30%", duration: 9 },
            { top: "10%", left: "60%", duration: 7 },
            { top: "85%", left: "85%", duration: 10 },
            { top: "50%", left: "5%", duration: 8 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                y: [0, -60, 0],
                x: [0, 30, 0],
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: i * 0.7,
              }}
              className="absolute text-japan-indigo"
              style={{
                top: pos.top,
                left: pos.left,
              }}
            >
              {i % 3 === 0 ? <Compass size={40} /> : i % 3 === 1 ? <Cpu size={40} /> : <Target size={40} />}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="section-philosophy" className="w-full max-w-7xl px-4 py-24 min-h-screen flex items-center relative">
        <div className="absolute inset-0 pattern-seigaiha opacity-30 z-[-1]" />
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12 w-full">
          <motion.div
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            className="glass-panel group relative flex flex-col justify-center rounded-3xl p-10 md:p-14 border border-japan-indigo/10 hover:border-japan-indigo/30 transition-all duration-700 bg-white/60"
          >
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-lg border border-japan-indigo/10 text-japan-indigo group-hover:scale-110 transition-transform duration-500">
              <Shield size={32} />
            </div>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl leading-tight text-japan-indigo">
              内なる聖域。<br />
              <span className="text-japan-gradient font-light">Spiritual Resilience</span>
            </h2>
            <p className="mb-8 text-zinc-600 leading-relaxed text-lg">
              {t('philosophy.description')}
            </p>
            <div className="space-y-5">
              {[
                { title: "ノウハウ依存からの「卒業」", desc: "情報の奴隷から、知恵の主へ。" },
                { title: "自己確信の再構築", desc: "揺るぎない根源的な自信の復元。" },
                { title: "メンタル・レジリエンス", desc: "荒波を乗りこなす精神の柔軟性。" }
              ].map((item) => (
                <div key={item.title} className="flex gap-4 group/item">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-japan-indigo/10 text-japan-indigo group-hover/item:scale-110 transition-all">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-japan-indigo">{item.title}</h4>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            className="glass-panel group relative flex flex-col justify-center rounded-3xl p-10 md:p-14 border border-japan-indigo/10 hover:border-japan-indigo/30 transition-all duration-700 bg-white/60"
          >
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg border border-japan-indigo/10 text-japan-indigo group-hover:scale-110 transition-transform duration-500">
              <Zap size={32} />
            </div>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl leading-tight text-japan-indigo">
              創造の武器。<br />
              <span className="text-japan-gradient font-light">AI practical Wisdom</span>
            </h2>
            <p className="mb-8 text-zinc-600 leading-relaxed text-lg">
              意志を社会へ実装するための「加速装置」としてのAI。
              単なる「使い方」ではなく、あなたの思想を自律的に拡張させる「デジタル分身」としてのAI設計を伝授します。
            </p>
            <div className="space-y-5">
              {[
                { title: "AI思考パートナーシップ", desc: "LLMを「道具」から「鏡」へ変える。" },
                { title: "高付加価値のプロダクト化", desc: "独自の思想をデジタル資産へ転換。" },
                { title: "自律型ビジネスモデル", desc: "時間と場所を自己決定するための構造。" }
              ].map((item) => (
                <div key={item.title} className="flex gap-4 group/item">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-japan-indigo/10 text-japan-indigo group-hover/item:scale-110 transition-all">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-japan-indigo">{item.title}</h4>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Future Section */}
      <section id="section-future" className="w-full max-w-6xl px-4 py-24 min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 pattern-asanoha opacity-30 z-[-1]" />
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel relative max-w-3xl rounded-3xl p-12 md:p-20 text-center overflow-hidden border border-japan-indigo/10 shadow-3xl bg-white/80"
        >
          <div className="absolute -inset-10 bg-japan-gold/5 blur-[100px] pointer-events-none" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 text-4xl font-bold md:text-6xl text-japan-indigo leading-tight"
          >
            {t('future.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12 text-zinc-600 text-lg md:text-xl font-light leading-relaxed"
          >
            {t('future.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              href="/sessions"
              className="flex h-16 w-full max-w-md mx-auto items-center justify-center gap-3 rounded-full bg-japan-indigo text-xl font-bold text-white transition-all hover:bg-japan-indigo/90 hover:shadow-2xl active:scale-95 shadow-xl"
            >
              「人生の再定義」セッションを予約
              <ArrowRight className="h-6 w-6" />
            </Link>
            <p className="mt-6 text-sm text-zinc-500">※限定枠のため、審査制とさせていただいております。</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Dashboard Section */}
      <Dashboard />

      {/* Projects Section */}
      <section id="section-projects" className="w-full max-w-7xl px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-japan-indigo/5 px-4 py-1 text-sm font-medium text-japan-indigo border border-japan-indigo/10">
              <Cpu size={16} />
              <span>AI Tools</span>
            </div>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl font-bold md:text-5xl text-japan-indigo mb-4">
            AI活用プロジェクト
          </motion.h2>
          <motion.p variants={itemVariants} className="text-zinc-500 text-lg max-w-2xl mx-auto">
            自己決定力を加速させるためのAIツールを開発しています
          </motion.p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
          {/* AI副業適性診断ツール */}
          <motion.a
            href="https://ai-diagnosis-six.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-panel group relative flex flex-col rounded-3xl p-8 border border-japan-indigo/10 hover:border-japan-indigo/30 transition-all duration-500 bg-white/60 cursor-pointer"
          >
            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-md border border-purple-500/20 text-purple-600 group-hover:scale-110 transition-transform duration-500">
              <Sparkles size={24} />
            </div>
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-japan-indigo mb-2">AI副業適性診断</h3>
            <p className="text-zinc-600 text-sm mb-4 flex-grow">
              5問の質問で、あなたに向いているAI副業タイプを診断。MBTI分析も可能。
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-japan-indigo/10 text-japan-indigo px-2 py-1 rounded-full">React</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">TypeScript</span>
              <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Vercel</span>
            </div>
            <div className="flex items-center text-japan-indigo text-sm font-medium group-hover:gap-3 transition-all">
              診断を試す <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

          {/* タスク管理ツール */}
          <motion.div
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={itemVariants}
            className="glass-panel group relative flex flex-col rounded-3xl p-8 border border-japan-indigo/10 hover:border-japan-indigo/30 transition-all duration-500 bg-white/60"
          >
            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-md border border-blue-500/20 text-blue-600 group-hover:scale-110 transition-transform duration-500">
              <Target size={24} />
            </div>
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-japan-indigo mb-2">タスク管理ツール</h3>
            <p className="text-zinc-600 text-sm mb-4 flex-grow">
              Google Calendar/Tasks連携。音声入力対応で、素早くタスクを登録。
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">React</span>
              <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">Google API</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Voice</span>
            </div>
            <div className="text-zinc-500 text-sm">
              🔒 プライベート利用
            </div>
          </motion.div>

          {/* GitHub Actions CI & Multi-Agent Workflow */}
          <motion.div
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={itemVariants}
            className="glass-panel group relative flex flex-col rounded-3xl p-8 border border-japan-indigo/10 hover:border-japan-indigo/30 transition-all duration-500 bg-white/60"
          >
            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-md border border-green-500/20 text-green-600 group-hover:scale-110 transition-transform duration-500">
              <Cpu size={24} />
            </div>
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-japan-indigo mb-2">GitHub Actions CI/CD</h3>
            <p className="text-zinc-600 text-sm mb-4 flex-grow">
              PRごとの自動Lint/Buildチェック、AIエージェント協調開発のためのマルチエージェントワークフロー構造を構築。
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">GitHub Actions</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">CI/CD</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Multi-Agent</span>
            </div>
            <div className="text-zinc-500 text-sm">
              ✅ 本番運用中
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <BookingForm />

      {/* Footer */}
      <footer className="w-full py-20 text-center border-t border-japan-indigo/5 bg-japan-indigo/5">
        <div className="max-w-4xl mx-auto px-4">
          {/* LINE CTA */}
          <div className="mb-12 p-8 rounded-2xl bg-white/50 border border-japan-indigo/10 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-japan-indigo mb-2">🎁 LINE登録で無料特典</h3>
                <p className="text-zinc-600 text-sm">AI副業ロードマップPDF + 初回相談無料</p>
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
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 text-zinc-600 font-medium text-sm">
            <Link href="/about" className="hover:text-japan-indigo transition-colors">{common('about')}</Link>
            <Link href="/philosophy" className="hover:text-japan-indigo transition-colors">{common('philosophy')}</Link>
            <Link href="/sessions" className="hover:text-japan-indigo transition-colors">{common('sessions')}</Link>
            <Link href="/blog" className="hover:text-japan-indigo transition-colors">Blog</Link>
            <Link href="/faq" className="hover:text-japan-indigo transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-japan-indigo transition-colors">{common('contact')}</Link>
            <a href="https://ai-diagnosis-six.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">🤖 AI診断</a>
            <a href="https://lin.ee/VAYurUv" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">LINE</a>
          </div>
          <p className="text-zinc-500 text-sm tracking-widest uppercase">© 2026 Takahiro Motoyama. Designed for Self-Determination.</p>
        </div>
      </footer>
    </main>
  );
}
