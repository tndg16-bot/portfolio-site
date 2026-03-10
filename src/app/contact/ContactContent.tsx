'use client';

import { motion, Variants } from 'framer-motion';
import { Mail, MessageCircle, Linkedin, Calendar, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';

const BookingForm = dynamic(() => import('@/components/BookingForm'), {
    loading: () => <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
    </div>,
    ssr: true
});

export default function ContactContent() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const contactMethods = [
        {
            icon: Calendar,
            title: "無料相談を予約",
            description: "30分のオンライン相談で、あなたの状況をお聞かせください",
            action: "予約する",
            href: "/sessions#booking",
            primary: true
        },
        {
            icon: Mail,
            title: "メールで問い合わせ",
            description: "ご質問やご相談はメールでも承っております",
            action: "メールを送る",
            href: "mailto:t.ndg16@gmail.com",
            primary: false
        },
        {
            icon: MessageCircle,
            title: "LINE公式アカウント",
            description: "気軽にメッセージでご連絡いただけます",
            action: "友だち追加",
            href: "https://lin.ee/VAYurUv",
            primary: false,
            target: "_blank" as const,
            rel: "noopener noreferrer"
        }
    ];

    const socialLinks = [
        {
            icon: Linkedin,
            name: "LinkedIn",
            description: "専門的なつながり",
            href: "https://www.linkedin.com/in/takahiro-motoyama/"
        }
    ];

    const faqItems = [
        {
            question: "オンラインでのセッションは可能ですか？",
            answer: "はい、すべてのセッションはZoomを使用したオンラインで行っております。場所を選ばず、ご自宅から安心して参加いただけます。"
        },
        {
            question: "セッションの前に準備することはありますか？",
            answer: "特別な準備は必要ありません。静かで落ち着ける環境と、安定したインターネット接続があれば大丈夫です。"
        },
        {
            question: "キャンセルや日程変更はできますか？",
            answer: "セッション24時間前までであれば、日程変更を承っております。お気軽にご連絡ください。"
        },
        {
            question: "法人での研修やワークショップは実施していますか？",
            answer: "はい、企業向けの研修やワークショップも承っております。詳細はメールにてお問い合わせください。"
        }
    ];

    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-20">
                {/* Hero Section */}
                <section className="relative w-full py-24 px-4">
                    <div className="absolute inset-0 bg-gradient-to-b from-japan-indigo/5 via-japan-violet/5 to-transparent" />

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="relative z-10 max-w-4xl mx-auto text-center"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-japan-indigo/10 to-japan-violet/10 border border-japan-indigo/10 mb-8">
                            <Send className="w-4 h-4 text-teal-400" />
                            <span className="text-sm text-zinc-600">気軽にご連絡ください</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-white via-teal-200 to-purple-200 bg-clip-text text-transparent">
                                あなたの一歩を
                            </span>
                            <br />
                            <span className="text-japan-indigo">お待ちしています</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                            変化への第一歩は、小さな「問い合わせ」から始まります。<br />
                            お気軽にご連絡ください。
                        </motion.p>
                    </motion.div>
                </section>

                {/* Contact Methods */}
                <section className="w-full max-w-6xl px-4 py-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid gap-6 md:grid-cols-3"
                    >
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={index}
                                href={method.href}
                                target={method.target}
                                rel={method.rel}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className={`group relative p-8 rounded-2xl border transition-all duration-300 ${method.primary
                                        ? 'bg-gradient-to-br from-teal-500/20 to-purple-500/20 border-teal-500/30 hover:border-teal-400/50'
                                        : 'bg-white/60 border-japan-indigo/10 hover:border-japan-indigo/20 hover:bg-japan-indigo/5'
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${method.primary
                                        ? 'bg-gradient-to-br from-teal-400 to-purple-500'
                                        : 'bg-japan-indigo/5 group-hover:bg-japan-indigo/10'
                                    } transition-colors`}>
                                    <method.icon className="w-7 h-7 text-japan-indigo" />
                                </div>

                                <h3 className="text-xl font-bold text-japan-indigo mb-3">{method.title}</h3>
                                <p className="text-zinc-500 mb-6 leading-relaxed">{method.description}</p>

                                <div className={`inline-flex items-center gap-2 font-medium ${method.primary ? 'text-teal-400' : 'text-zinc-600 group-hover:text-white'
                                    } transition-colors`}>
                                    {method.action}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>

                                {method.primary && (
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                            </motion.a>
                        ))}
                    </motion.div>
                </section>

                {/* Booking Form Section */}
                <section className="w-full max-w-4xl px-4 py-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-japan-indigo mb-4">セッション予約フォーム</h2>
                            <p className="text-zinc-500">以下のフォームからお気軽にお申し込みください</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <BookingForm />
                        </motion.div>
                    </motion.div>
                </section>

                {/* Info & Social Section */}
                <section className="w-full max-w-6xl px-4 py-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid gap-8 md:grid-cols-2"
                    >
                        {/* Session Info */}
                        <motion.div
                            variants={itemVariants}
                            className="p-8 rounded-2xl bg-white/60 border border-japan-indigo/10"
                        >
                            <h3 className="text-2xl font-bold text-japan-indigo mb-6">セッション情報</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-teal-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-japan-indigo mb-1">実施方法</h4>
                                        <p className="text-zinc-500">オンライン（Zoom）</p>
                                        <p className="text-sm text-zinc-500 mt-1">安定したインターネット環境があればどこからでも参加可能</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-japan-indigo mb-1">対応時間</h4>
                                        <p className="text-zinc-500">平日 10:00 - 20:00</p>
                                        <p className="text-sm text-zinc-500 mt-1">土日祝も事前予約で対応可能</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={itemVariants}
                            className="p-8 rounded-2xl bg-white/60 border border-japan-indigo/10"
                        >
                            <h3 className="text-2xl font-bold text-japan-indigo mb-6">SNS・その他</h3>

                            <div className="space-y-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/60 hover:bg-japan-indigo/5 border border-japan-indigo/10 hover:border-japan-indigo/20 transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                                            <social.icon className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-japan-indigo">{social.name}</h4>
                                            <p className="text-sm text-zinc-500">{social.description}</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-japan-indigo group-hover:translate-x-1 transition-all" />
                                    </a>
                                ))}
                            </div>

                            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                                <p className="text-sm text-amber-700">
                                    💡 LinkedInでは、AIと人間の協働に関する考察や、プロジェクトの進捗を発信しています。
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* FAQ Section */}
                <section className="w-full max-w-4xl px-4 py-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-japan-indigo mb-4">よくあるご質問</h2>
                            <p className="text-zinc-500">お問い合わせ前にご確認ください</p>
                        </motion.div>

                        <div className="space-y-4">
                            {faqItems.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="p-6 rounded-2xl bg-white/60 border border-japan-indigo/10 hover:border-japan-indigo/20 transition-colors"
                                >
                                    <h3 className="text-lg font-medium text-japan-indigo mb-3 flex items-start gap-3">
                                        <span className="text-teal-400 font-bold">Q.</span>
                                        {faq.question}
                                    </h3>
                                    <p className="text-zinc-500 pl-7 leading-relaxed">
                                        <span className="text-purple-400 font-bold mr-2">A.</span>
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* CTA Section */}
                <section className="w-full max-w-4xl px-4 py-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/20 via-purple-500/10 to-pink-500/20 border border-japan-indigo/10 p-12 text-center"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.15),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]" />

                        <motion.div variants={itemVariants} className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-japan-indigo mb-4">
                                変化は、一通のメッセージから
                            </h2>
                            <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
                                完璧なタイミングを待つ必要はありません。<br />
                                今この瞬間が、あなたの新しい始まりです。
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/sessions#booking"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-japan-indigo text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-teal-500/25"
                                >
                                    <Calendar className="w-5 h-5" />
                                    無料相談を予約する
                                </Link>
                                <a
                                    href="mailto:t.ndg16@gmail.com"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-japan-indigo/10 text-white font-bold text-lg hover:bg-japan-indigo/10 transition-colors border border-japan-indigo/20"
                                >
                                    <Mail className="w-5 h-5" />
                                    メールで問い合わせ
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Footer */}
                <footer className="w-full py-12 border-t border-japan-indigo/5 bg-japan-indigo/5">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex gap-6 text-zinc-500 text-sm">
                                <Link href="/about" className="hover:text-teal-400 transition-colors">About</Link>
                                <Link href="/philosophy" className="hover:text-teal-400 transition-colors">Philosophy</Link>
                                <Link href="/sessions" className="hover:text-teal-400 transition-colors">Sessions</Link>
                                <Link href="/contact" className="hover:text-teal-400 transition-colors">Contact</Link>
                                <Link href="/privacy" className="hover:text-teal-400 transition-colors">プライバシーポリシー</Link>
                                <Link href="/legal" className="hover:text-teal-400 transition-colors">特定商取引法に基づく表記</Link>
                            </div>
                            <p className="text-zinc-500 text-sm">
                                © 2026 Takahiro Motoyama. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}