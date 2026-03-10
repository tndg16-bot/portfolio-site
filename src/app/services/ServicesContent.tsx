"use client";

import { motion, Variants } from "framer-motion";
import { CheckCircle2, ArrowRight, Clock, Briefcase, GraduationCap, Star, Users, Calendar, Lock } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { getAllServices } from "@/data/services";
import { SessionService } from "@/types/services";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const FeatureCheck: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-start gap-3 text-zinc-700">
        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
        <span>{text}</span>
    </div>
);

const IdealBadge: React.FC<{ isIdeal: boolean; text: string }> = ({ isIdeal, text }) => (
    <div className={`flex items-start gap-2 text-sm ${isIdeal ? 'text-teal-600' : 'text-zinc-500'}`}>
        {isIdeal ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <Lock className="w-4 h-4 shrink-0 mt-0.5" />}
        <span>{text}</span>
    </div>
);

const cardColors = [
  'bg-gradient-to-br from-blue-500 to-blue-600',    // AI診断
  'bg-gradient-to-br from-cyan-500 to-cyan-600',     // AIワークショップ
  'bg-gradient-to-br from-indigo-500 to-indigo-600', // AIコンサル
  'bg-gradient-to-br from-violet-500 to-violet-600', // AI継続サポート
  'bg-gradient-to-br from-teal-500 to-teal-600',     // モヤモヤ整理
  'bg-gradient-to-br from-purple-500 to-purple-600', // 羅針盤
  'bg-gradient-to-br from-slate-600 to-slate-700',   // 企業向け
];

const ServiceCard: React.FC<{ service: SessionService; index: number }> = ({ service, index }) => {
    return (
        <motion.div
            variants={itemVariants}
            className="relative group"
        >
            {/* Popular Badge */}
            {service.popular && (
                <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-japan-indigo text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                        <Star className="w-4 h-4" />
                        人気
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                {/* Header */}
                <div className={`p-8 ${cardColors[index % cardColors.length]} text-white`}>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="bg-japan-indigo text-white/90 text-base leading-relaxed">{service.description}</p>
                </div>

                {/* Body */}
                <div className="p-8 flex-1 flex flex-col">
                    {/* Duration */}
                    <div className="flex items-center gap-2 text-zinc-600 mb-6">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">{service.duration}</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8 flex-1">
                        <h4 className="font-semibold text-zinc-800 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            サービス内容
                        </h4>
                        {service.features.map((feature, i) => (
                            <FeatureCheck key={i} text={feature} />
                        ))}
                    </div>

                    {/* Pricing */}
                    <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-2xl p-6 mb-8">
                        {service.pricing.type === 'screening' ? (
                            <div>
                                <div className="flex items-center gap-2 text-zinc-700 mb-2">
                                    <Lock className="w-5 h-5" />
                                    <span className="font-semibold">審査制</span>
                                </div>
                                <p className="text-sm text-zinc-600">{service.pricing.notes}</p>
                            </div>
                        ) : service.pricing.type === 'package' ? (
                            <div>
                                <p className="text-3xl font-bold text-teal-600 mb-2">{service.pricing.price}</p>
                                <p className="text-sm text-zinc-600">{service.pricing.notes}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg font-semibold text-zinc-700 mb-2">お問い合わせください</p>
                                <p className="text-sm text-zinc-600">{service.pricing.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Ideal For */}
                    <div className="space-y-2 mb-6">
                        <h4 className="font-semibold text-zinc-800 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            こんな方におすすめ
                        </h4>
                        {service.idealFor.map((item, i) => (
                            <IdealBadge key={i} isIdeal={true} text={item} />
                        ))}
                    </div>

                    {/* Not Ideal For */}
                    {service.notIdealFor && service.notIdealFor.length > 0 && (
                        <div className="space-y-2 mb-8">
                            <h4 className="font-semibold text-zinc-800 flex items-center gap-2">
                                <Briefcase className="w-5 h-5" />
                                注意点
                            </h4>
                            {service.notIdealFor.map((item, i) => (
                                <IdealBadge key={i} isIdeal={false} text={item} />
                            ))}
                        </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {service.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-zinc-100 text-zinc-600 text-sm rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="/sessions#booking"
                        className="block w-full py-4 rounded-xl bg-japan-indigo text-white font-bold text-center hover:shadow-lg hover:shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
                    >
                        {service.pricing.type === 'screening' ? '無料相談を予約する' : 'お問い合わせ'}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default function ServicesContent() {
    const services = getAllServices();

    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center overflow-x-hidden bg-gradient-to-b from-zinc-50 to-zinc-100 pt-20 pb-24">
                {/* Hero Section */}
                <section className="w-full max-w-4xl px-4 py-16">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-center"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-white/10 mb-8">
                            <Briefcase className="w-4 h-4 text-teal-500" />
                            <span className="text-sm text-zinc-600">Services</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6 text-zinc-800">
                            サービス紹介
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                            AI活用支援からパーソナルコーチングまで。<br />
                            あなたのビジネスと人生を、次のステージへ。
                        </motion.p>
                    </motion.div>
                </section>

                {/* Services Grid */}
                <section className="w-full max-w-7xl px-4 py-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {services.map((service, index) => (
                            <ServiceCard key={service.id} service={service} index={index} />
                        ))}
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
                            <h2 className="text-3xl font-bold text-zinc-800 mb-4">よくあるご質問</h2>
                            <p className="text-zinc-600">サービスに関する疑問にお答えします</p>
                        </motion.div>

                        <div className="space-y-4">
                            {[
                                {
                                    q: "初めての方でも大丈夫ですか？",
                                    a: "はい。初めての方でも安心してご参加いただけます。まずは無料相談からお試しいただけます。"
                                },
                                {
                                    q: "オンラインでのセッションは可能ですか？",
                                    a: "はい。すべてのセッションはZoomを使用したオンラインで行っております。場所を選ばず、ご自宅から安心して参加いただけます。"
                                },
                                {
                                    q: "法人での利用も可能ですか？",
                                    a: "はい。企業向けの意思決定ワークショップも承っております。詳細はお問い合わせください。"
                                },
                                {
                                    q: "AIの知識がなくても大丈夫ですか？",
                                    a: "はい。無料AI活用診断では、AIの基礎から丁寧にご説明します。実際にその場でデモを見ていただくので、知識ゼロでも安心です。"
                                },
                                {
                                    q: "どんな業種でもAI活用できますか？",
                                    a: "はい。不動産、飲食、士業、サービス業など、幅広い業種でのAI活用実績があります。業種に合わせた最適な活用法をご提案します。"
                                }
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow"
                                >
                                    <h3 className="text-lg font-semibold text-zinc-800 mb-3 flex items-start gap-3">
                                        <span className="text-teal-500 font-bold">Q.</span>
                                        {faq.q}
                                    </h3>
                                    <p className="text-zinc-600 pl-7 leading-relaxed">
                                        <span className="text-purple-500 font-bold mr-2">A.</span>
                                        {faq.a}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* CTA Section */}
                <section className="w-full max-w-4xl px-4 py-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 via-teal-600 to-purple-600 p-12 text-center"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

                        <motion.div variants={itemVariants} className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold bg-japan-indigo text-white mb-4">
                                あなたの変化を、今から始めましょう
                            </h2>
                            <p className="text-xl bg-japan-indigo text-white/90 mb-8 max-w-2xl mx-auto">
                                まずは無料相談で、あなたの状況をお聞かせください。<br />
                                完璧なタイミングを待つ必要はありません。
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/sessions#booking"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-teal-600 font-bold text-lg hover:bg-zinc-50 transition-colors shadow-lg"
                                >
                                    <Calendar className="w-5 h-5" />
                                    無料相談を予約する
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-japan-indigo/10 text-white font-bold text-lg hover:bg-white/20 transition-colors border border-white/20"
                                >
                                    お問い合わせ
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Footer */}
                <footer className="w-full py-8 border-t border-zinc-200 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex gap-6 text-zinc-600 text-sm">
                                <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
                                <Link href="/philosophy" className="hover:text-teal-600 transition-colors">Philosophy</Link>
                                <Link href="/sessions" className="hover:text-teal-600 transition-colors">Sessions</Link>
                                <Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
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