"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, ArrowRight, Clock, Star, Calendar, Lock, MessageCircle } from "lucide-react";
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
        <CheckCircle2 className="w-5 h-5 text-japan-indigo shrink-0 mt-0.5" />
        <span>{text}</span>
    </div>
);

const IdealBadge: React.FC<{ isIdeal: boolean; text: string }> = ({ isIdeal, text }) => (
    <div className={`flex items-start gap-2 text-sm ${isIdeal ? 'text-japan-indigo' : 'text-zinc-700'}`}>
        {isIdeal ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <Lock className="w-4 h-4 shrink-0 mt-0.5" />}
        <span>{text}</span>
    </div>
);

const getCardColor = (category: string) => {
    switch (category) {
        case 'individual': return 'bg-japan-indigo';
        case 'business': return 'bg-japan-charcoal';
        case 'both': return 'bg-gradient-to-br from-japan-indigo to-japan-charcoal';
        default: return 'bg-japan-indigo';
    }
};

type TabKey = 'all' | 'individual' | 'business';

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
                <div className={`p-8 ${getCardColor(service.category)} text-white`}>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/90 text-base leading-relaxed">{service.description}</p>
                </div>

                {/* Body */}
                <div className="p-8 flex-1 flex flex-col">
                    {/* Duration */}
                    <div className="flex items-center gap-2 text-zinc-800 mb-6">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">{service.duration}</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8 flex-1">
                        <h4 className="font-semibold text-zinc-800">
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
                                <p className="text-sm text-zinc-800">{service.pricing.notes}</p>
                            </div>
                        ) : service.pricing.type === 'package' ? (
                            <div>
                                <p className="text-3xl font-bold text-japan-indigo mb-2">{service.pricing.price}</p>
                                <p className="text-sm text-zinc-800">{service.pricing.notes}</p>
                            </div>
                        ) : service.pricing.type === 'fixed' && service.pricing.price && service.pricing.price !== 'お問い合わせください' ? (
                            <div>
                                <p className="text-3xl font-bold text-japan-indigo mb-2">{service.pricing.price}</p>
                                <p className="text-sm text-zinc-800">{service.pricing.notes}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg font-semibold text-zinc-700 mb-2">お問い合わせください</p>
                                <p className="text-sm text-zinc-800">{service.pricing.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Ideal For */}
                    <div className="space-y-2 mb-6">
                        <h4 className="font-semibold text-zinc-800">
                            こんな方におすすめ
                        </h4>
                        {service.idealFor.map((item, i) => (
                            <IdealBadge key={i} isIdeal={true} text={item} />
                        ))}
                    </div>

                    {/* Not Ideal For */}
                    {service.notIdealFor && service.notIdealFor.length > 0 && (
                        <div className="space-y-2 mb-8">
                            <h4 className="font-semibold text-zinc-800">
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
                            <span key={i} className="px-3 py-1 bg-zinc-100 text-zinc-800 text-sm rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <Link
                        href="/contact"
                        className="block w-full py-4 rounded-xl bg-japan-indigo text-white font-bold text-center hover:shadow-lg hover:shadow-japan-indigo/25 transition-all flex items-center justify-center gap-2"
                    >
                        無料相談を予約する
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <a
                        href="https://lin.ee/VAYurUv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex items-center justify-center gap-1 text-sm text-japan-indigo hover:underline"
                    >
                        <MessageCircle className="w-4 h-4" />
                        LINEで気軽に相談 →
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default function ServicesContent() {
    const allServices = getAllServices();
    const [activeTab, setActiveTab] = useState<TabKey>('all');

    const filteredServices = allServices.filter((service) => {
        if (activeTab === 'all') return true;
        if (activeTab === 'individual') return service.category === 'individual' || service.category === 'both';
        if (activeTab === 'business') return service.category === 'business' || service.category === 'both';
        return true;
    });

    const tabs: { key: TabKey; label: string }[] = [
        { key: 'all', label: 'すべて' },
        { key: 'individual', label: '個人向け' },
        { key: 'business', label: '法人向け' },
    ];

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
                        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6 text-zinc-800">
                            サービス紹介
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl text-zinc-800 max-w-2xl mx-auto leading-relaxed">
                            AI活用支援からパーソナルコーチングまで。<br />
                            個人の意思決定から、法人のAI活用まで。
                        </motion.p>
                    </motion.div>
                </section>

                {/* Social Proof Bar */}
                <section className="w-full max-w-4xl px-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-japan-indigo/5 border border-japan-indigo/10 rounded-2xl py-4 px-6 text-center"
                    >
                        <p className="text-japan-indigo font-bold text-lg">
                            副業人材 <span className="text-2xl">500</span>名 / 法人 <span className="text-2xl">20</span>社 の支援実績
                        </p>
                    </motion.div>
                </section>

                {/* Tab UI */}
                <section className="w-full max-w-4xl px-4 mb-8">
                    <div className="flex justify-center gap-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`transition-all ${
                                    activeTab === tab.key
                                        ? 'bg-japan-indigo text-white rounded-full px-6 py-2'
                                        : 'text-japan-indigo border border-japan-indigo/20 rounded-full px-6 py-2 hover:bg-japan-indigo/5'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Step-up Flow */}
                <section className="w-full max-w-4xl px-4 mb-8">
                    <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-zinc-700">
                        <span className="px-3 py-1 bg-japan-indigo/10 text-japan-indigo rounded-full font-medium">ワークショップ</span>
                        <ArrowRight className="w-4 h-4" />
                        <span className="px-3 py-1 bg-japan-indigo/10 text-japan-indigo rounded-full font-medium">3ヶ月コンサル</span>
                        <ArrowRight className="w-4 h-4" />
                        <span className="px-3 py-1 bg-japan-indigo/10 text-japan-indigo rounded-full font-medium">継続サポート</span>
                        <ArrowRight className="w-4 h-4" />
                        <span className="px-3 py-1 bg-japan-gold/10 text-japan-charcoal rounded-full font-medium">AI推進（全社）</span>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="w-full max-w-7xl px-4 py-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredServices.map((service) => {
                            const originalIndex = allServices.findIndex((s) => s.id === service.id);
                            return (
                                <ServiceCard key={service.id} service={service} index={originalIndex} />
                            );
                        })}
                    </motion.div>
                </section>

                {/* CTA Section */}
                <section className="w-full max-w-4xl px-4 py-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="relative overflow-hidden rounded-3xl bg-japan-indigo p-12 text-center"
                    >
                        <motion.div variants={itemVariants} className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                まずは30分の無料相談から
                            </h2>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                まずは無料相談で、あなたの状況をお聞かせください。<br />
                                オンラインで、あなたの状況に合わせてご提案します。
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-japan-indigo font-bold text-lg hover:bg-zinc-50 transition-colors shadow-lg"
                                >
                                    <Calendar className="w-5 h-5" />
                                    無料相談を予約する
                                </Link>
                                <a
                                    href="https://lin.ee/VAYurUv"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-colors border border-white/20"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    LINEで気軽に相談
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Footer */}
                <footer className="w-full py-8 border-t border-zinc-200 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex gap-6 text-zinc-800 text-sm">
                                <Link href="/about" className="hover:text-japan-indigo transition-colors">About</Link>
                                <Link href="/philosophy" className="hover:text-japan-indigo transition-colors">Philosophy</Link>
                                <Link href="/sessions" className="hover:text-japan-indigo transition-colors">Sessions</Link>
                                <Link href="/contact" className="hover:text-japan-indigo transition-colors">Contact</Link>
                                <Link href="/privacy" className="hover:text-japan-indigo transition-colors">プライバシーポリシー</Link>
                                <Link href="/legal" className="hover:text-japan-indigo transition-colors">特定商取引法に基づく表記</Link>
                            </div>
                            <p className="text-zinc-700 text-sm">
                                © 2026 Takahiro Motoyama. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
