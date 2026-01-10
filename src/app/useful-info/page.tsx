'use client';

import { motion } from 'framer-motion';
import { Book, Lightbulb, Target, HelpCircle, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function UsefulInfoPage() {
  const resources = [
    {
      icon: Book,
      category: "コーチング",
      items: [
        {
          title: "自己決定の基礎",
          description: "自分で決める力を育むための基本知識",
          url: "#"
        },
        {
          title: "価値観の見つけ方",
          description: "自分にとって大切なものを言語化する方法",
          url: "#"
        }
      ]
    },
    {
      icon: Lightbulb,
      category: "AI活用",
      items: [
        {
          title: "AIとの対話の極意",
          description: "AIを思考パートナーとして使うコツ",
          url: "#"
        },
        {
          title: "AIツールガイド",
          description: "効率的なAI活用のためのツール紹介",
          url: "#"
        }
      ]
    },
    {
      icon: Target,
      category: "実践",
      items: [
        {
          title: "30日チャレンジ",
          description: "習慣化のための1ヶ月プラン",
          url: "#"
        },
        {
          title: "モヤモヤ整理シート",
          description: "思考を整理するためのワークシート",
          url: "#"
        }
      ]
    },
    {
      icon: HelpCircle,
      category: "トラブルシューティング",
      items: [
        {
          title: "セッションに役立つ事前準備",
          description: "セッションを最大限活用するための準備",
          url: "#"
        },
        {
          title: "よくある質問",
          description: "セッションに関するFAQ",
          url: "/contact"
        }
      ]
    }
  ];

  return (
    <>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative w-full py-24 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-teal-500/5 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto text-center"
          >
            <div className="mb-6 flex justify-center">
              <span className="inline-block rounded-full bg-teal-500/10 px-4 py-1 text-sm font-medium text-teal-400 border border-teal-500/20">
                Useful Resources
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-teal-200 to-purple-200 bg-clip-text text-transparent">
                お役立ち情報
              </span>
            </h1>
            
            <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              セッションをより活用するためのリソースや、
              <br />
              自己成長に役立つ情報をまとめています。
            </p>
          </motion.div>
        </section>

        {/* Resources Grid */}
        <section className="w-full max-w-6xl mx-auto px-4 py-16">
          {resources.map((resourceGroup, groupIndex) => (
            <motion.div
              key={resourceGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1, duration: 0.6 }}
              className="mb-16"
            >
              <div className="glass-panel rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500/20 to-purple-500/20 flex items-center justify-center">
                    <resourceGroup.icon className="w-7 h-7 text-teal-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {resourceGroup.category}
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {resourceGroup.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIndex * 0.05 }}
                      className="group"
                    >
                      <Link
                        href={item.url}
                        className="block p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/30 transition-all"
                      >
                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-teal-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-zinc-300 leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 text-teal-400 group-hover:translate-x-1 transition-transform">
                          <span className="text-sm font-medium">詳細を見る</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Blog Preview Section */}
        <section className="w-full max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Book className="w-6 h-6 text-teal-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                ブログも公開中
              </h2>
            </div>
            
            <p className="text-zinc-300 max-w-2xl mx-auto mb-8">
              AI活用や自己決定に関する知見・学びを発信しています。
            </p>
            
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 text-white font-bold text-lg hover:opacity-90 transition-opacity"
            >
              ブログを見る
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/20 via-purple-500/10 to-pink-500/20 border border-white/10 p-12 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                役立つ情報をお届けします
              </h2>
              <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
                セッション後の復習や、自己成長に役立つリソースを
                <br />
                定期的に更新・追加していきます。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sessions"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-teal-500/25"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  セッションを予約
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  <HelpCircle className="w-5 h-5" />
                  お問い合わせ
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="w-full py-12 border-t border-white/5 bg-black/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-6 text-zinc-400 text-sm">
                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
                <Link href="/about" className="hover:text-teal-400 transition-colors">About</Link>
                <Link href="/philosophy" className="hover:text-teal-400 transition-colors">Philosophy</Link>
                <Link href="/sessions" className="hover:text-teal-400 transition-colors">Sessions</Link>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">Contact</Link>
                <Link href="/useful-info" className="hover:text-teal-400 transition-colors">Useful Info</Link>
              </div>
              <p className="text-zinc-500 text-sm">
                © 2026 Takahiro Motoyama. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
