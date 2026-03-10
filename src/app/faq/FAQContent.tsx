'use client';

import { motion } from 'framer-motion';
import { HelpCircle, Calendar, CheckCircle2, Search, List } from 'lucide-react';
import { useMemo, useState } from 'react';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQ[] = [
    {
      id: 'faq-0',
      question: 'セッションはどのような形式で行われますか？',
      answer:
        'オンライン（Zoom）で60〜90分の1on1対話形式です。事前に簡単なフォームで現状をお伺いし、当日は質問を通じて内面を整理します。',
      category: 'セッション',
    },
    {
      id: 'faq-1',
      question: 'コーチング経験がなくても大丈夫ですか？',
      answer:
        'はい。むしろ「初めての方」が多いです。構えず、お話しいただくだけで大丈夫です。問いを通じて自然と言葉が出てきます。',
      category: 'セッション',
    },
    {
      id: 'faq-2',
      question: 'どんな話をすればいいかわかりません',
      answer:
        '問いを通じて自然と言葉が出てきます。準備は不要です。「何もせずに正解だけ欲しい」と考えている方には、あまり向かないかもしれません。',
      category: 'セッション',
    },
    {
      id: 'faq-3',
      question: '秘密は守られますか？',
      answer:
        'はい。お話しいただいただ内容は一切外部に漏らしません。安心して本音で話してください。',
      category: 'プライバシー',
    },
    {
      id: 'faq-4',
      question: '1回で効果はありますか？',
      answer:
        '1回でも「思考の整理」効果を実感される方が多いです。継続は任意です。まず1回体験して、継続するか判断することをお勧めします。',
      category: '効果',
    },
    {
      id: 'faq-5',
      question: '無料モニターでやっている理由は何ですか？',
      answer:
        '将来的に「意思決定できる人を増やす」活動をしていきたいからです。そのために、今は悩みの構造を多角的に理解し、セッションの質を磨いています。',
      category: '料金',
    },
    {
      id: 'faq-6',
      question: 'キャンセルや日程変更はできますか？',
      answer:
        'はい。セッション24時間前までであれば、日程変更を承っています。お気軽にご連絡ください。',
      category: '日程',
    },
    {
      id: 'faq-7',
      question: '法人での研修やワークショップは実施していますか？',
      answer:
        'はい、企業向けの研修やワークショップも承っています。詳細はメールにてお問い合わせください。',
      category: '法人対応',
    },
    {
      id: 'faq-8',
      question: 'オンラインでのセッションは可能ですか？',
      answer:
        'はい、すべてのセッションはZoomを使用したオンラインで行われております。場所を選ばず、ご自宅から安心して参加いただけます。',
      category: '形式',
    },
    {
      id: 'faq-9',
      question: 'セッションの前に準備することはありますか？',
      answer:
        '特別な準備は必要ありません。静かで落ち着ける環境と、安定したインターネット接続があれば大丈夫です。',
      category: '準備',
    },
    {
      id: 'faq-10',
      question: 'AI活用については教えてもらえますか？',
      answer:
        'はい。あなたのニーズに合わせて、実践的なAI活用方法やツールについてもアドバイスします。ITスキルの有無に関わらず、活用できる範囲でサポートします。',
      category: 'AI活用',
    },
    {
      id: 'faq-11',
      question: 'どのような方に特にお勧めですか？',
      answer:
        '「情報に振り回されて、決断できない」「ノウハウを集めすぎて、行動できなくなっている」「他人の期待ばかり満たして、自分の人生を生きていない感覚がある」方に特にお勧めします。',
      category: '対象者',
    },
    {
      id: 'faq-12',
      question: 'どのような方にはあまり向かないですか？',
      answer:
        '「何もせずに正解だけ欲しい」「自分の前提を変える気がない」「行動のコミットが難しい状態」という方には、あまり向かないかもしれません。',
      category: '対象者',
    },
  ];

export default function FAQContent() {
  const categories = useMemo(
    () => Array.from(new Set(faqs.map((faq) => faq.category))),
    []
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
  const [query, setQuery] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredFAQs = useMemo(() => {
    const q = query.trim().toLowerCase();

    return faqs.filter((faq) => {
      const inCategory =
        selectedCategory === 'すべて' || faq.category === selectedCategory;

      if (!q) return inCategory;

      const haystack = `${faq.question} ${faq.answer} ${faq.category}`.toLowerCase();
      return inCategory && haystack.includes(q);
    });
  }, [query, selectedCategory]);

  const toggleOpen = (faq: FAQ) => {
    setOpenId(openId === faq.id ? null : faq.id);
  };

  const jumpToFAQ = (faq: FAQ) => {
    setOpenId(faq.id);

    // Let React open the item before scrolling.
    requestAnimationFrame(() => {
      const el = document.getElementById(faq.id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <>
      <section className="relative w-full min-h-[60vh] flex items-center justify-center px-4 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-purple-500/5 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <div className="mb-6 flex justify-center">
            <span className="inline-block rounded-full bg-teal-500/10 px-4 py-1 text-sm font-medium text-teal-400 border border-teal-500/20">
              FAQ
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-teal-200 to-purple-200 bg-clip-text text-transparent">
              よくある質問
            </span>
          </h1>

          <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            セッションに関する疑問にお答えします。
          </p>
        </motion.div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-4 py-16">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <label className="block text-sm text-zinc-300 mb-2" htmlFor="faq-search">
            キーワード検索
          </label>
          <div className="relative">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="faq-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="例：Zoom / キャンセル / AI"
              className="w-full rounded-2xl bg-japan-indigo/5 border border-white/10 pl-12 pr-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
            />
          </div>
          <div className="mt-2 text-xs text-zinc-400">
            {filteredFAQs.length}件ヒット
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          <button
            onClick={() => setSelectedCategory('すべて')}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedCategory === 'すべて'
                ? 'bg-teal-500 border-teal-400 text-white'
                : 'bg-white/5 border-white/20 text-zinc-300 hover:border-teal-500/50 hover:text-white'
            }`}
          >
            すべて
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border transition-colors ${
                selectedCategory === category
                  ? 'bg-teal-500 border-teal-400 text-white'
                  : 'bg-white/5 border-white/20 text-zinc-300 hover:border-teal-500/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          {/* TOC / Index */}
          <aside className="lg:sticky lg:top-24">
            <div className="glass-panel rounded-2xl border border-white/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <List className="w-5 h-5 text-teal-400" />
                <h2 className="text-base font-semibold bg-japan-indigo text-white">目次</h2>
              </div>

              <div className="space-y-2 max-h-[60vh] overflow-auto pr-1">
                {filteredFAQs.map((faq, idx) => (
                  <a
                    key={faq.id}
                    href={`#${faq.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      jumpToFAQ(faq);
                    }}
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-japan-indigo text-white hover:bg-white/5 transition-colors"
                    aria-label={`FAQ ${idx + 1}: ${faq.question}`}
                  >
                    <span className="text-zinc-500 mr-2">{idx + 1}.</span>
                    {faq.question}
                  </a>
                ))}

                {filteredFAQs.length === 0 && (
                  <div className="text-sm text-zinc-400 px-3 py-2">
                    条件に一致する質問が見つかりませんでした。
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                id={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden scroll-mt-24"
              >
                <button
                  onClick={() => toggleOpen(faq)}
                  className="w-full p-6 flex items-start gap-4 text-left hover:bg-white/5 transition-colors"
                  aria-expanded={openId === faq.id}
                  aria-controls={`${faq.id}-panel`}
                >
                  <div className="w-12 h-12 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    {openId === faq.id ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-400" />
                    ) : (
                      <HelpCircle className="w-6 h-6 text-teal-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-teal-500/10 text-teal-400">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold bg-japan-indigo text-white">
                      {faq.question}
                    </h3>
                  </div>
                </button>

                {openId === faq.id && (
                  <motion.div
                    id={`${faq.id}-panel`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-6 pb-6 pt-0"
                  >
                    <p className="text-zinc-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/20 via-purple-500/10 to-pink-500/20 border border-white/10 p-12 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-japan-indigo text-white mb-4">
              その他ご質問がございましたら
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              お気軽にお問い合わせください。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-japan-indigo text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-teal-500/25"
              >
                <HelpCircle className="w-5 h-5" />
                お問い合わせ
              </a>
              <a
                href="/sessions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-japan-indigo/10 text-white font-bold text-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                <Calendar className="w-5 h-5" />
                セッションを予約
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
