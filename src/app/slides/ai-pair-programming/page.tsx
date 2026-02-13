"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Mic, Play, ArrowRight, Code, AlertTriangle, CheckCircle, Maximize2, Minimize2 } from "lucide-react";

// Typewriter Component for Live Demo
const Typewriter = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayText(text.slice(0, i));
                i++;
                if (i > text.length) clearInterval(interval);
            }, 30); // Typing speed
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timer);
    }, [text, delay]);

    return <span className="font-mono whitespace-pre-wrap">{displayText}<span className="animate-pulse">|</span></span>;
};

// Slide Data
const slides = [
    {
        id: 1,
        chapter: "Opening",
        title: "AIとペアプログラミングする未来",
        subtitle: "君は指揮者、AIは演奏者",
        visual: "🎵 🤖",
        bgGradient: "from-blue-100 to-indigo-100",
        textColor: "text-indigo-900",
        narration: "プログラミングって、黒い画面に英語がいっぱい…と思ってませんか？"
    },
    {
        id: 2,
        chapter: "Chapter 1: 開発は変わった",
        title: "昔の開発 (Before)",
        content: [
            "徹夜 🌙",
            "エナジードリンク 🥤",
            "大量の専門書 📚",
            "孤独な戦い 💀"
        ],
        visual: "😫 💻",
        bgGradient: "from-gray-800 to-gray-900",
        textColor: "text-gray-100",
        narration: "ひと昔前まで、開発といえばこんなイメージでした。一部の天才だけが操れる、難解な呪文の世界。"
    },
    {
        id: 3,
        chapter: "Chapter 1: 開発は変わった",
        title: "今の開発 (After)",
        content: [
            "コーヒー片手に ☕",
            "AIと会話 💬",
            "パズル感覚 🧩",
            "最強のパートナー 🤝"
        ],
        visual: "😊 🤖",
        bgGradient: "from-orange-100 to-amber-100",
        textColor: "text-orange-900",
        narration: "でも今は違います。まるでパートナーとお茶をしながら、パズルを組み立てるようにモノ作りができるんです。"
    },
    {
        id: 4,
        chapter: "Chapter 2: 3つの魔法道具",
        title: "1. Claude (クロード)",
        subtitle: "頼れる執事",
        content: [
            "知力: S 🧠",
            "体力: 無限 ⚡",
            "性格: 真面目で優しい"
        ],
        visual: "🤵‍♂️",
        bgGradient: "from-amber-50 to-orange-100",
        textColor: "text-amber-900",
        narration: "紹介しましょう。1人目のパートナー、Claudeです。彼は疲れることを知らない超優秀な執筆家です。"
    },
    {
        id: 5,
        chapter: "Chapter 2: 3つの魔法道具",
        title: "2. GitHub (ギットハブ)",
        subtitle: "セーブ機能付きの巨大倉庫",
        content: [
            "過去に戻れる ⏳",
            "何度失敗しても大丈夫",
            "世界中の知恵が集まる 🌍"
        ],
        visual: "🏰",
        bgGradient: "from-slate-100 to-gray-200",
        textColor: "text-slate-900",
        narration: "2つ目はGitHub。ここは巨大な図書館であり、時間を巻き戻せるタイムマシンでもあります。失敗しても、いつでもやり直せます。"
    },
    {
        id: 6,
        chapter: "Chapter 2: 3つの魔法道具",
        title: "Vercel (バーセル)",
        subtitle: "魔法の発射台",
        content: [
            "パスポート発行 (初期設定) 🎫",
            "あとはワンクリックで発射 🚀",
            "世界中に届く 🌏"
        ],
        visual: "🚀",
        bgGradient: "from-black to-slate-900",
        textColor: "text-white",
        narration: "最後はVercel。作った作品を世界中に届ける発射台です。最初のセットアップさえ済ませれば、あとはボタン一つで何度でも旅に出られます。"
    },
    {
        id: 7,
        chapter: "Chapter 3: ワークフロー",
        title: "たった3つのステップ",
        subtitle: "指揮者の仕事",
        customContent: (
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8 w-full">
                <div className="flex flex-col items-center p-4 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 flex-1">
                    <Mic size={40} className="mb-2" />
                    <h3 className="text-lg font-bold">1. 指示 (Order)</h3>
                    <p className="text-xs opacity-80">やりたいことを伝える</p>
                </div>
                <ArrowRight size={24} className="hidden md:block animate-pulse mx-2" />
                <div className="flex flex-col items-center p-4 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 flex-1">
                    <Code size={40} className="mb-2" />
                    <h3 className="text-lg font-bold">2. 生成 (Generate)</h3>
                    <p className="text-xs opacity-80">AIがコードを書く</p>
                </div>
                <ArrowRight size={24} className="hidden md:block animate-pulse mx-2" />
                <div className="flex flex-col items-center p-4 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 flex-1">
                    <Play size={40} className="mb-2" />
                    <h3 className="text-lg font-bold">3. 確認 (Check)</h3>
                    <p className="text-xs opacity-80">出来上がりを見る</p>
                </div>
            </div>
        ),
        bgGradient: "from-teal-100 to-emerald-100",
        textColor: "text-teal-900",
        narration: "難しそうに見えますか？実はやることは3つだけ。「指示して、作ってもらって、確認する」。この繰り返しです。"
    },
    {
        id: 8,
        chapter: "Real Talk: 具体例",
        title: "実際にどう指示するの？",
        subtitle: "抽象的な言葉 vs 具体的な指示",
        customContent: (
            <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-red-50/50 rounded-xl border border-red-200">
                    <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2 text-sm"><AlertTriangle size={16} /> 悪い指示 (Bad)</h3>
                    <p className="text-red-900 font-mono text-xs bg-white/50 p-2 rounded">
                        &quot;かっこいいサイト作って&quot;
                    </p>
                    <div className="mt-2 text-[10px] text-red-700 leading-tight">
                        😰 AI: 「かっこいい」の定義がわからず、ありきたりな青いサイトを作る。
                    </div>
                </div>
                <div className="p-4 bg-green-50/50 rounded-xl border border-green-200">
                    <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2 text-sm"><CheckCircle size={16} /> 良い指示 (Good)</h3>
                    <p className="text-green-900 font-mono text-xs bg-white/50 p-2 rounded">
                        &quot;バリ島の夕日イメージLP / メイン色:#FF5722と紫 / ヒーローに波の画像&quot;
                    </p>
                    <div className="mt-2 text-[10px] text-green-700 leading-tight">
                        😃 AI: 具体的な色と画像指定があるため、一発で期待通りのものを作る。
                    </div>
                </div>
            </div>
        ),
        bgGradient: "from-yellow-50 to-orange-50",
        textColor: "text-slate-800",
        narration: "AIはエスパーではありません。「かっこいい」ではなく、「バリ島の夕日のようなオレンジ」と具体的に伝える。これが『指揮者』の腕の見せ所です。"
    },
    {
        id: 9,
        chapter: "Live Demo: 生成の瞬間",
        title: "AIがコードを書く様子",
        subtitle: "瞬き厳禁。",
        customContent: (
            <div className="w-full max-w-xl mx-auto mt-4 bg-gray-900 rounded-xl p-4 shadow-2xl text-left border border-gray-700 h-48 overflow-auto relative">
                <div className="flex gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="text-green-400 font-mono text-xs leading-relaxed">
                    <span className="opacity-50">{/* AI Generating Code... */}</span><br />
                    <Typewriter text={`const HeroSection = () => {
    return (
        <div className="bg-gradient-to-r from-orange to-purple flex center">
            <h1 className="text-6xl text-white">Bali Sunset</h1>
            <p>Experience the magic.</p>
        </div>
    );
};`} delay={500} />
                </div>
            </div>
        ),
        bgGradient: "from-gray-900 to-black",
        textColor: "text-white",
        narration: "見てください。あなたが指示を出してから、わずか数秒。AIは迷うことなく、完璧な文法でコードを打ち込みます。これが『魔法』の正体です。"
    },
    {
        id: 10,
        chapter: "Real Talk: 証拠",
        title: "本当に作れるの？",
        subtitle: "Case Study: このスライド自体",
        customContent: (
            <div className="mt-4 p-6 bg-white/30 backdrop-blur-md rounded-2xl border border-white/40">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Code className="text-blue-600" size={32} />
                    <ArrowRight className="opacity-50" />
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-lg flex items-center justify-center text-[10px] font-bold">
                        This Slide
                    </div>
                </div>
                <p className="text-lg font-medium leading-relaxed">
                    <span className="font-bold text-indigo-700 decoration-4 underline decoration-indigo-300">今あなたが見ているこのスライド</span>も、
                    私がコードを一行も書かずに、AIとの対話だけで作りました。
                </p>
            </div>
        ),
        bgGradient: "from-blue-50 to-indigo-50",
        textColor: "text-indigo-900",
        narration: "身近な証拠をお見せしましょう。今ご覧になっているこのスライドシステム自体、私がコードを1行も書かずに、AIに『作って』と言って30秒で生成されたものです。これが『証拠』です。"
    },
    {
        id: 11,
        chapter: "Story: 人生の物語",
        title: "失敗続きだった彼が、\nなぜ指揮者になれたのか？",
        subtitle: "A True Story",
        content: [
            "昔: プログラミング挫折経験あり 📉",
            "転機: AIに「日本語で」命令できると知った ⚡",
            "今: 週末に家族のアプリを作ってヒーローに 🦸‍♂️"
        ],
        visual: "👨‍💻",
        bgGradient: "from-indigo-100 to-rose-100",
        textColor: "text-slate-800",
        narration: "ある男性の話です。彼は昔、Javaで挫折しました。でも今、彼は娘のために『お片付けアプリ』を作り、家庭のヒーローです。彼が変わったのではありません。道具が変わったのです。"
    },
    {
        id: 12,
        chapter: "Real Talk: 失敗談",
        title: "失敗したらどうする？",
        subtitle: "エラーは「会話のきっかけ」",
        content: [
            "画面が真っ白に... 😱",
            "エラーログをAIに投げる 📋",
            "AI: 'すみません、直します！' 🙇‍♂️",
            "なおった！ 🎉"
        ],
        visual: "🐛 ➡ 🦋",
        bgGradient: "from-rose-50 to-pink-50",
        textColor: "text-rose-900",
        narration: "もちろん、失敗もします。画面が真っ白になることもあります。でも大丈夫。そのエラー画面すら、AIに見せれば『あ、ごめんここ直すね』と即座に修正してくれます。"
    },
    {
        id: 13,
        chapter: "Closing",
        title: "あなたのアイデアは、\n形になるのを待っています",
        subtitle: "YOU are the Conductor.",
        visual: "🌅 💡",
        bgGradient: "from-indigo-900 via-purple-900 to-pink-900",
        textColor: "text-white",
        narration: "今日、皆さんは「魔法の杖」を手に入れました。でも、本当にすごいのは杖ではありません。「これを作りたい」と願う、皆さんの想像力です。さあ、始めましょう！"
    }
];

export default function SlidePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((curr) => Math.min(curr + 1, slides.length - 1));
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((curr) => Math.max(curr - 1, 0));
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === " ") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "f") toggleFullscreen();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextSlide, prevSlide, toggleFullscreen]);

    const curr = slides[currentSlide];

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-neutral-900 p-4 font-sans">

            {/* 16:9 Aspect Ratio Container */}
            <div className={`aspect-video w-full max-w-7xl relative overflow-hidden rounded-2xl shadow-2xl flex flex-col transition-colors duration-500 bg-gradient-to-br ${curr.bgGradient} ${curr.textColor}`}>

                {/* Header */}
                <div className="absolute top-6 left-8 z-10 opacity-60 text-sm font-bold tracking-widest uppercase">
                    {curr.chapter}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={curr.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="w-full text-center max-w-5xl"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{curr.title}</h1>

                            {curr.subtitle && (
                                <h2 className="text-xl md:text-2xl font-light mb-8 opacity-80">{curr.subtitle}</h2>
                            )}

                            {curr.visual && (
                                <div className="text-8xl mb-6 animate-bounce-slow">{curr.visual}</div>
                            )}

                            {/* Content List */}
                            {curr.content && (
                                <ul className="text-left inline-block space-y-3 text-lg md:text-2xl font-medium">
                                    {curr.content.map((item, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.15 + 0.3 }}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="opacity-50">•</span> {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            )}

                            {curr.customContent}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer / Narration Area - Fixed within Container */}
                <div className="w-full min-h-[120px] bg-black/10 backdrop-blur-sm border-t border-black/5 p-6 flex items-center justify-center relative z-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={curr.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-start gap-4 max-w-4xl text-left"
                        >
                            <Mic className="shrink-0 opacity-70 mt-1" size={24} />
                            <p className="text-lg md:text-xl italic leading-relaxed font-serif font-medium opacity-90">
                                &quot;{curr.narration}&quot;
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Internal Controls */}
                <div className="absolute bottom-6 right-6 flex gap-2 z-30">
                    <button onClick={prevSlide} disabled={currentSlide === 0} className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white disabled:opacity-20 transition">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white disabled:opacity-20 transition">
                        <ChevronRight size={24} />
                    </button>
                    <button onClick={toggleFullscreen} className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition ml-2">
                        {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                    </button>
                </div>

                {/* Page Number */}
                <div className="absolute bottom-6 left-6 text-sm font-bold opacity-40">
                    {currentSlide + 1} / {slides.length}
                </div>

            </div>
        </div>
    );
}
