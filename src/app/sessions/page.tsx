"use client";

import { motion, Variants } from "framer-motion";
import {
    CheckCircle2,
    ArrowRight,
    Clock,
    Video,
    MessageCircle,
    ShieldCheck,
    HelpCircle,
    CalendarDays,
    Star,
    Quote,
    FileText,
    AlertTriangle,
} from "lucide-react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Link from "next/link";
import { getFeaturedTestimonials } from "@/data/testimonials";

const BookingForm = dynamic(() => import("@/components/BookingForm"), {
    loading: () => (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
        </div>
    ),
    ssr: true,
});

export default function SessionsPage() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    // 意思決定メモ10項目
    const decisionMemoItems = [
        "今日のテーマ",
        "理想の状態",
        "現状（事実）",
        "大事にしたい価値観（上位3つ）",
        "障害（内的／外的）",
        "ギャップの正体",
        "次の一歩（Next Action 1〜3個）",
        "期限",
        "やらないこと（捨てる選択）",
        "進捗の測り方",
    ];

    // 60分の流れ（タイムライン）
    const sessionTimeline = [
        { time: "0-5分", title: "ゴールのすり合わせ", desc: "何が起きたら「来てよかった」かを確認" },
        { time: "5-12分", title: "軽い現状確認", desc: "いま一番困っている一点を伺います" },
        { time: "12-27分", title: "理想→価値観の言語化", desc: "あなたの大切にしたいことを言葉に" },
        { time: "27-42分", title: "深い現状整理", desc: "いつから？障害の整理" },
        { time: "42-55分", title: "ギャップ特定→Next Action", desc: "次の一歩と期限を決定" },
        { time: "55-60分", title: "振り返り＋次の選択肢", desc: "スコア確認と次の進め方" },
    ];

    const faqs = [
        {
            q: "コーチング経験がなくても大丈夫ですか？",
            a: "はい。むしろ「初めての方」が多いです。構えず、お話しいただくだけで大丈夫です。",
        },
        {
            q: "どんな話をすればいいかわかりません",
            a: "問いかけを通じて自然と言葉が出てきます。準備は不要です。",
        },
        {
            q: "秘密は守られますか？",
            a: "はい。お話しいただいた内容は一切外部に漏らしません。",
        },
        {
            q: "1回で効果はありますか？",
            a: "1回でも「思考の整理」効果を実感される方が多いです。継続は任意です。",
        },
    ];

    // 対象外の方
    const exclusions = [
        "現在、医療機関で治療中の方",
        "服薬中の方",
        "強い希死念慮がある方",
        "日常生活に支障が出るほどの不調がある方",
    ];

    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-24 pb-16">
                {/* Hero */}
                <section className="w-full max-w-4xl px-4 mb-16">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-center"
                    >
                        <motion.div variants={itemVariants} className="mb-4 flex justify-center">
                            <span className="inline-block rounded-full bg-teal-500/10 px-4 py-1 text-sm font-medium text-teal-400 border border-teal-500/20">
                                モヤモヤ整理セッション
                            </span>
                        </motion.div>
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                        >
                            60分で、価値観と判断軸を言語化し
                            <br />
                            <span className="text-forest">A4一枚</span>に整理して持ち帰る
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                        >
                            正解を渡すのではなく、あなたが自分で決められる状態をつくります。
                        </motion.p>
                    </motion.div>
                </section>

                {/* まず最初に（安心のために） */}
                <section className="w-full max-w-4xl px-4 mb-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="glass-panel rounded-3xl p-8 md:p-12 border border-teal-500/10"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3"
                        >
                            <ShieldCheck className="text-teal-400" /> まず最初に（安心のために）
                        </motion.h2>
                        <motion.div variants={itemVariants} className="text-zinc-200 space-y-4 leading-relaxed">
                            <p>
                                このセッションは、<strong className="text-white">合う／合わないがあります。</strong>
                            </p>
                            <p>
                                もし途中で「これは違うな」と感じたら、遠慮なく言ってください。そこで止めても大丈夫です。
                            </p>
                            <p>
                                その代わり、合いそうだと思ったら、60分で一緒に
                                <span className="text-teal-400 font-semibold">「意思決定メモ」</span>
                                を作り切りましょう。
                            </p>
                            <p className="text-zinc-400 text-sm">
                                ※ 最後に必要であれば次の進め方の選択肢をご提案します（強制はありません）。
                            </p>
                        </motion.div>
                    </motion.div>
                </section>

                {/* 成果物セクション */}
                <section className="w-full max-w-4xl px-4 mb-20">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-bold text-white mb-10 text-center flex items-center justify-center gap-3"
                    >
                        <FileText className="text-teal-400" /> このセッションでやること（成果物）
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5"
                    >
                        <p className="text-zinc-200 mb-6">
                            セッション後に、以下を整理した{" "}
                            <span className="text-teal-400 font-bold">意思決定メモ（A4 1枚）</span>{" "}
                            をお渡しします。
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {decisionMemoItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50"
                                >
                                    <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                                        {i + 1}
                                    </span>
                                    <span className="text-zinc-100">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 60分の流れ（タイムライン） */}
                <section className="w-full max-w-4xl px-4 mb-20">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-bold text-white mb-10 text-center flex items-center justify-center gap-3"
                    >
                        <Clock className="text-teal-400" /> 進め方（60分の流れ）
                    </motion.h2>
                    <div className="relative">
                        {/* タイムライン縦線 */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-teal-500/30 transform md:-translate-x-1/2" />
                        <div className="space-y-8">
                            {sessionTimeline.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`relative flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        } items-center gap-4 md:gap-8`}
                                >
                                    {/* マーカー */}
                                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-teal-500 rounded-full transform -translate-x-1/2 z-10 shadow-lg shadow-teal-500/30" />
                                    {/* カード */}
                                    <div
                                        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] glass-panel rounded-xl p-5 border border-white/5`}
                                    >
                                        <div className="text-teal-400 font-mono text-sm mb-1">{step.time}</div>
                                        <h3 className="text-white font-bold text-lg mb-1">{step.title}</h3>
                                        <p className="text-zinc-300 text-sm">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-10 flex flex-wrap justify-center gap-6 text-zinc-300"
                    >
                        <span className="flex items-center gap-2">
                            <Clock size={18} className="text-teal-400" /> 60分
                        </span>
                        <span className="flex items-center gap-2">
                            <Video size={18} className="text-teal-400" /> オンライン (Zoom)
                        </span>
                        <span className="flex items-center gap-2">
                            <ShieldCheck size={18} className="text-teal-400" /> 完全守秘
                        </span>
                    </motion.div>
                </section>

                {/* 料金 */}
                <section className="w-full max-w-3xl px-4 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl p-8 md:p-12 text-center border border-teal-500/20"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">料金</h2>
                        <p className="text-zinc-200 mb-4">
                            初回（60分）は
                            <span className="text-teal-400 font-bold text-2xl mx-2">モニターとして無料</span>
                            です。
                        </p>
                        <p className="text-zinc-400 text-sm">
                            ※ 2回目以降は、ご希望がある場合のみ個別にご案内します（強制はありません）。
                        </p>
                    </motion.div>
                </section>

                {/* 次の進め方 */}
                <section className="w-full max-w-3xl px-4 mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">
                            次の進め方（必要な場合のみ）
                        </h2>
                        <div className="text-zinc-200 space-y-4 leading-relaxed">
                            <p>1回目のメモだけで動けそうなら、もちろんそれがベストです。</p>
                            <p>
                                もし「期限は決まったが、一人では進めにくい」「どこから手をつけるか迷う」という場合は、
                                期限に向けたロードマップを設計する時間を追加で取ることもできます。
                            </p>
                            <p className="text-zinc-400 text-sm">（必要な場合のみご案内します）</p>
                        </div>
                    </motion.div>
                </section>

                {/* 録画について */}
                <section className="w-full max-w-3xl px-4 mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Video className="text-teal-400" /> 録画について（任意）
                        </h2>
                        <div className="text-zinc-200 space-y-3 leading-relaxed">
                            <p>
                                継続する場合に前回の内容を正確に引き継ぐため、録画をお願いする場合があります（任意）。
                            </p>
                            <ul className="space-y-2 text-zinc-300 list-disc list-inside ml-4">
                                <li>同意がない場合は録画しません</li>
                                <li>録画データは90日で削除</li>
                                <li>第三者には共有しません</li>
                                <li>削除依頼はいつでも可能</li>
                            </ul>
                        </div>
                    </motion.div>
                </section>

                {/* FAQ */}
                <section className="w-full max-w-4xl px-4 mb-20">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-bold text-white mb-10 text-center flex items-center justify-center gap-3"
                    >
                        <HelpCircle className="text-teal-400" /> よくある質問
                    </motion.h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="glass-panel rounded-xl p-6 border border-white/5"
                            >
                                <h3 className="text-white font-semibold mb-2 flex items-start gap-2">
                                    <MessageCircle className="text-teal-400 shrink-0 mt-1" size={18} />
                                    {faq.q}
                                </h3>
                                <p className="text-zinc-300 pl-6">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 注意事項（境界線） */}
                <section className="w-full max-w-3xl px-4 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl p-8 md:p-12 border border-amber-500/20 bg-amber-500/5"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <AlertTriangle className="text-amber-400" /> 注意事項（境界線）
                        </h2>
                        <div className="text-zinc-200 space-y-4 leading-relaxed">
                            <p>
                                このセッションは<strong className="text-white">医療・心理療法ではありません</strong>。
                                診断や治療を目的としたものではなく、意思決定と行動のサポートを目的としています。
                            </p>
                            <div className="mt-6 p-4 rounded-lg bg-zinc-800/50 border border-amber-500/20">
                                <p className="text-amber-400 font-semibold mb-3">
                                    以下の方は専門機関を優先してください：
                                </p>
                                <ul className="space-y-2 text-zinc-300">
                                    {exclusions.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-amber-400">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className="text-zinc-400 text-sm">
                                安全のため、状況によってはお受けできない場合があります。
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* お申込み後の流れ */}
                <section className="w-full max-w-3xl px-4 mb-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <CalendarDays className="text-teal-400" /> お申込み後の流れ
                        </h2>
                        <ol className="space-y-4 text-zinc-200 leading-relaxed">
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-base font-bold shrink-0">
                                    1
                                </span>
                                <span>
                                    フォーム送信後、
                                    <strong className="text-white">24時間以内</strong>にメールで返信いたします
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-base font-bold shrink-0">
                                    2
                                </span>
                                <span>日程調整リンクから、ご都合の良い日時をお選びください</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-base font-bold shrink-0">
                                    3
                                </span>
                                <span>当日、Zoomリンクをお送りします</span>
                            </li>
                        </ol>
                    </motion.div>
                </section>

                {/* Testimonials Section */}
                <section className="w-full max-w-5xl px-4 mb-20">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-bold text-white mb-10 text-center flex items-center justify-center gap-3"
                    >
                        <Star className="text-teal-400" /> セッション体験者の声
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {getFeaturedTestimonials()
                            .slice(0, 2)
                            .map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-panel rounded-2xl p-6 relative overflow-hidden"
                                >
                                    <Quote className="absolute top-4 right-4 text-white/5" size={48} />
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={
                                                    i < testimonial.rating
                                                        ? "fill-teal-400 text-teal-400"
                                                        : "text-zinc-700"
                                                }
                                            />
                                        ))}
                                    </div>
                                    <blockquote className="text-zinc-300 leading-relaxed mb-6 relative z-10">
                                        <p>{testimonial.content}</p>
                                    </blockquote>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            {testimonial.avatar?.initials || testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{testimonial.name}</p>
                                            <p className="text-zinc-500 text-sm">{testimonial.position}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-8"
                    >
                        <Link
                            href="/case-studies"
                            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
                        >
                            すべての事例を見る
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </section>

                {/* 診断誘導バナー */}
                <section className="w-full max-w-3xl px-4 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl p-8 md:p-10 border border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="text-5xl">🤖</div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                    まずは無料で適性診断
                                </h3>
                                <p className="text-zinc-300 text-base">
                                    5問の質問で、あなたに向いているAI副業タイプがわかります。
                                    <br />
                                    セッションを受ける前に、自分の傾向を把握しておきましょう。
                                </p>
                            </div>
                            <a
                                href="https://ai-diagnosis-six.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:brightness-110 transition-all whitespace-nowrap"
                            >
                                診断を受ける
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    </motion.div>
                </section>

                {/* Booking Form */}
                <BookingForm />

                {/* Back Link */}
                <section className="w-full max-w-4xl px-4 py-12 text-center">
                    <Link
                        href="/"
                        className="text-zinc-400 hover:text-teal-400 transition-colors text-sm"
                    >
                        ← トップページへ戻る
                    </Link>
                </section>
            </main>
        </>
    );
}
