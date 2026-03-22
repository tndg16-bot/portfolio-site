"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, User, Building2, Code, CheckCircle, Quote } from "lucide-react";
import Link from 'next/link';
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HomeContent() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0 } : {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...(prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" })
      }
    }
  };

  return (
    <>
      {/* ===== 1. Hero ===== */}
      <section id="section-hero" className="relative flex min-h-screen w-full flex-col items-center justify-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="z-10 w-full max-w-4xl rounded-3xl p-8 md:p-16 text-center"
        >
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-surface-section px-4 py-1 text-sm font-medium text-text-strong border border-border-default">
              <span>AI導入支援 実績20社超</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-8 font-bold tracking-tight text-4xl md:text-6xl lg:text-7xl leading-[1.2] text-wrap-balance"
            style={{ textWrap: 'balance' }}
          >
            AI導入から実装まで、丸ごと任せられる
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-10 text-base md:text-lg leading-relaxed max-w-lg mx-auto text-text-secondary"
          >
            「何から始めれば？」にお答えします。<br className="hidden md:block" />
            戦略から動くシステムまで作れるから、提案で終わりません。
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/contact"
              className="bg-japan-vermilion text-white px-10 py-5 min-h-[56px] rounded-full text-lg font-bold shadow-lg shadow-japan-vermilion/40 hover:shadow-xl hover:scale-105 transition-[transform,box-shadow] duration-200 flex items-center justify-center gap-2 group ring-2 ring-japan-vermilion/20"
            >
              無料相談を予約する
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#case-studies"
              className="border-2 border-japan-indigo text-japan-indigo px-10 py-5 min-h-[56px] rounded-full text-lg font-bold hover:bg-japan-indigo hover:text-white transition-colors duration-200 flex items-center justify-center gap-2"
            >
              導入事例を見る
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== 2. Trust Bar (信頼バー) ===== */}
      <section className="w-full py-12 bg-surface-section">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-8"
          >
            {/* Photo placeholder - replace with actual photo */}
            <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full bg-japan-indigo flex items-center justify-center overflow-hidden">
              <User className="h-12 w-12 text-white/80" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-1">本山貴裕</h2>
              <p className="text-text-strong font-medium mb-2">AI導入・業務自動化コンサルタント</p>
              <p className="text-text-secondary text-sm">
                金融（上場証券）→ 人材（マイナビ）→ AI（独立）<br />
                12年で3業界を横断。戦略と実装の両方ができる「手を動かせるコンサル」。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 3. Impact Numbers ===== */}
      <section className="w-full py-16">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { value: "80%", label: "業務時間の削減（AI自動化導入後）" },
              { value: "2倍", label: "意思決定スピードの改善" },
              { value: "20社+", label: "個人・法人の支援実績" },
              { value: "12年", label: "金融・HR・AI 3業界の実務経験" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-japan-gold mb-1" style={{ fontVariantNumeric: 'tabular-nums' }}>{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 4. Why Choose Me (選ばれる3つの理由) ===== */}
      <section className="w-full py-24 bg-surface-section">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text-strong mb-4">選ばれる3つの理由</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "戦略だけでなく、自分の手で作れる",
                description: "提案書だけ渡して終わり、ではありません。エンジニアとして自らコードを書き、動くシステムまで納品します。だから「提案は良かったけど実装で頓挫した」がありません。",
              },
              {
                icon: Building2,
                title: "3業界の実務経験で「現場がわかる」",
                description: "金融（上場証券）・人材（マイナビ）・AI領域で12年の実務経験。業界特有の課題やレギュレーションを理解した上で、地に足のついた提案ができます。",
              },
              {
                icon: User,
                title: "個人も法人も、同じ熱量で向き合う",
                description: "副業で月3万円を目指す個人も、DXを推進する法人も、「自分で決めて動ける人を増やす」という同じ信念で支援します。",
              },
            ].map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.15 }}
                className="bg-surface rounded-2xl p-8 border border-border-default"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-japan-indigo rounded-xl mb-6">
                  <reason.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-3">{reason.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. Services (2 Columns) ===== */}
      <section id="services" className="w-full py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text-strong mb-4">2つの支援領域</h2>
            <p className="text-text-primary text-lg max-w-2xl mx-auto">
              あなたの状況に合わせたプランを提案します。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Individual */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            >
              <Link
                href="/services#individual"
                className="group block bg-surface rounded-2xl p-8 border border-border-default hover:border-border-emphasis hover:shadow-lg transition-[border-color,box-shadow] duration-300 h-full"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-japan-indigo rounded-xl mb-6">
                  <User className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">個人の方へ — キャリア・副業設計</h3>
                <p className="text-text-strong text-sm font-medium mb-4">
                  「何がしたいかわからない」から、3ヶ月で収益化の道筋が見える。
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "初回無料：60分のキャリア診断セッション",
                    "3ヶ月プログラム：週1の1on1で副業月3万円を実現",
                    "AI適性診断：5分であなたに合うAI副業がわかる",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-text-primary text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-japan-gold shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1 text-text-strong font-medium text-sm group-hover:gap-2 transition-all">
                  まずは無料診断を受ける
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>

            {/* Corporate */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.15 }}
            >
              <Link
                href="/services#corporate"
                className="group block bg-surface rounded-2xl p-8 border border-border-default hover:border-border-emphasis hover:shadow-lg transition-[border-color,box-shadow] duration-300 h-full"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-japan-gold rounded-xl mb-6">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">法人の方へ — AI導入・DX推進</h3>
                <p className="text-text-strong text-sm font-medium mb-4">
                  「AIで何ができるか」を可視化し、3ヶ月で業務効率80%改善を目指す。
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "2時間ワークショップ：自社のAI活用ポイントを特定（1万円〜）",
                    "3ヶ月コンサル：業務フロー分析→自動化設計→実装（月15万円〜）",
                    "カスタム開発：社内GPT・チャットボット・自動化システム構築",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-text-primary text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-japan-gold shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1 text-text-strong font-medium text-sm group-hover:gap-2 transition-all">
                  導入事例を見る
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 6. Case Studies (導入事例) ===== */}
      <section id="case-studies" className="w-full py-24 bg-surface-section">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text-strong mb-4">導入事例</h2>
            <p className="text-text-primary text-lg max-w-2xl mx-auto">
              実際に成果が出たプロジェクトの一部をご紹介します。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "📊",
                title: "ゼロからAI副業で月3万円を達成",
                client: "30代ITエンジニア / 相談から1ヶ月",
                challenge: "副業に興味はあるが何から始めればいいかわからない",
                solution: "AI適性診断 → 個別コーチング（週1×4回）",
                result: "AIライティングツールを活用し、初月で3万円の副収入を実現",
                quote: "具体的な行動計画ができて、自信を持って進められました",
                quoteName: "田中さん",
              },
              {
                emoji: "⚡",
                title: "チームの意思決定速度を2倍に改善",
                client: "20名規模のIT企業 / 開発部門",
                challenge: "「誰も決められない」会議文化で、プロジェクト遅延が常態化",
                solution: "意思決定ワークショップ（2時間×3回）+ フレームワーク導入",
                result: "意思決定スピード2倍 / プロジェクト遅延50%削減",
                quote: "みんなで決める文化に変わりました",
                quoteName: "佐藤さん（開発部門マネージャー）",
              },
              {
                emoji: "✍️",
                title: "コンテンツ制作の80-90%を自動化",
                client: "フリーランスマーケター",
                challenge: "ブログ・YouTube台本の制作に毎週10時間以上費やしていた",
                solution: "AI Writing Automationシステムの導入・カスタマイズ",
                result: "1記事あたり5分で生成 / 週10時間→1時間に短縮",
                quote: "空いた時間で本業に集中できるようになりました",
                quoteName: "",
              },
            ].map((caseStudy, index) => (
              <motion.div
                key={caseStudy.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                className="bg-surface rounded-2xl p-6 border border-border-default flex flex-col"
              >
                <div className="text-3xl mb-3">{caseStudy.emoji}</div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{caseStudy.title}</h3>
                <p className="text-text-muted text-xs mb-4">{caseStudy.client}</p>

                <div className="space-y-3 mb-6 flex-grow">
                  <div>
                    <span className="text-xs font-medium text-text-muted">課題</span>
                    <p className="text-text-secondary text-sm">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-text-muted">支援内容</span>
                    <p className="text-text-secondary text-sm">{caseStudy.solution}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-japan-gold">成果</span>
                    <p className="text-text-primary text-sm font-medium">{caseStudy.result}</p>
                  </div>
                </div>

                {caseStudy.quote && (
                  <div className="border-t border-border-default pt-4">
                    <div className="flex items-start gap-2">
                      <Quote className="h-4 w-4 text-japan-gold/40 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-text-secondary text-sm italic">「{caseStudy.quote}」</p>
                        {caseStudy.quoteName && (
                          <p className="text-text-muted text-xs mt-1">— {caseStudy.quoteName}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. Process (ご支援の流れ) ===== */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text-strong mb-4">ご支援の流れ</h2>
          </motion.div>

          <div className="space-y-0">
            {[
              { step: "①", title: "無料診断（30分）", description: "課題の整理と方向性の確認" },
              { step: "②", title: "ヒアリング", description: "業務フロー・目標の詳細把握" },
              { step: "③", title: "提案", description: "カスタマイズされたプランの提示" },
              { step: "④", title: "実行", description: "戦略立案から実装・自動化まで" },
              { step: "⑤", title: "成果確認", description: "KPIモニタリングと改善" },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 py-6 border-b border-border-default last:border-b-0"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-japan-indigo flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">{step.title}</h3>
                  <p className="text-text-secondary text-sm">{step.description}</p>
                </div>
                {index === 0 && (
                  <span className="ml-auto shrink-0 text-xs bg-japan-vermilion/10 text-japan-vermilion px-3 py-1 rounded-full font-medium">
                    無料
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. CTA ===== */}
      <section id="cta" className="w-full py-24 bg-japan-indigo">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              まずは無料相談で、<br className="md:hidden" />あなたの状況をお聞かせください。
            </h2>

            <p className="text-white/90 text-lg mb-3">
              オンラインで、あなたの状況に合わせてご提案します。
            </p>

            <div className="flex flex-col items-center gap-2 mb-8 text-white/80">
              {[
                "現状の課題を整理",
                "AI導入・改善の優先順位を提案",
                "具体的なロードマップを作成",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-japan-gold" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-japan-indigo px-8 py-4 min-h-[56px] rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-[transform,box-shadow] duration-200 flex items-center justify-center gap-2 group"
              >
                無料相談を予約する
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://lin.ee/VAYurUv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#06C755] text-white px-8 py-4 min-h-[56px] rounded-full text-lg font-bold hover:brightness-110 transition-[filter] duration-200"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINEで気軽に相談
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
