'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const matchedArticles = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const ALL_ARTICLES: Article[] = [
      { id: '001-knowhow-dependency', slug: '001-knowhow-dependency', title: 'ノウハウ依存からの卒業', description: '「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。', date: '2026-01-10' },
      { id: '002-ai-thinking-partner', slug: '002-ai-thinking-partner', title: 'AIを思考パートナーとして使う方法', description: 'AIを思考パートナーとして活用する方法と、自分の思考をクリアにするテクニック。', date: '2026-01-10' },
      { id: '003-three-questions', slug: '003-three-questions', title: '判断軸を見つける3つの質問', description: '重要な決定をする前の3つの質問。', date: '2026-01-10' },
      { id: '004-intuition-technology', slug: '004-intuition-technology', title: '「直感」を信じる技術', description: 'データと感覚を統合した意思決定プロセス。', date: '2026-01-12' },
      { id: '005-journaling-intro', slug: '005-journaling-intro', title: '「書くだけ」で悩みは9割消える', description: '思考を整理するジャーナリング入門。', date: '2026-01-12' },
      { id: '006-mental-model', slug: '006-mental-model', title: 'あなたの「当たり前」を疑う', description: '成長を妨げる「メンタルモデル」の見つけ方。', date: '2026-01-12' },
      { id: '007-perfectionism-freedom', slug: '007-perfectionism-freedom', title: '「完璧主義」からの解放宣言', description: '80点で走り出す「最速実行」の技術。', date: '2026-01-12' },
      { id: '008-freedom-from-expectations', slug: '008-freedom-from-expectations', title: '他人の「期待」から自由になる', description: '本当の自分の欲求を見つける方法。', date: '2026-01-12' },
      { id: '009-create-your-strengths', slug: '009-create-your-strengths', title: '「強み」は探すな、「創り出せ」', description: '才能を掛け合わせるキャリア戦略。', date: '2026-01-12' },
      { id: '010-motivation-systems', slug: '010-motivation-systems', title: 'なぜ「モチベーション」は続かないのか？', description: '意志力に頼らない仕組みの作り方。', date: '2026-01-12' },
      { id: '011-self-esteem-action', slug: '011-self-esteem-action', title: '「自己肯定感が低い」は勘違い', description: '自信を行動から作るフィードバックループ。', date: '2026-01-12' },
      { id: '012-ai-information-gathering', slug: '012-ai-information-gathering', title: 'AI時代の情報収集術', description: '「ググる」から「対話する」へ。', date: '2026-01-12' },
      { id: '013-ai-career-future', slug: '013-ai-career-future', title: 'あなたの仕事、AIでどう変わる？', description: '3つのステップで考える未来のキャリアプラン。', date: '2026-01-12' },
      { id: '014-career-hypothesis', slug: '014-career-hypothesis', title: '「やりたいこと」が見つからない君へ', description: '「仮説検証」としてのキャリアの歩き方。', date: '2026-01-12' },
      { id: '015-before-job-change', slug: '015-before-job-change', title: '「転職」の前にやるべきこと', description: 'あなたの市場価値を測る3つの指標。', date: '2026-01-12' },
      { id: '016-reskilling-trap', slug: '016-reskilling-trap', title: '「リスキリング」の罠', description: '学ぶだけで終わらない人の共通点。', date: '2026-01-12' },
      { id: '017-pomodoro-technique', slug: '017-pomodoro-technique', title: '「時間がない」は幻想', description: '脳をだますポモドーロ・テクニック活用法。', date: '2026-01-12' },
      { id: '018-morning-routine', slug: '018-morning-routine', title: '「朝時間」を制する者は人生を制す', description: 'タイプ別・最強のモーニングルーティン。', date: '2026-01-12' },
      { id: '019-not-to-do-list', slug: '019-not-to-do-list', title: '「やらないことリスト」のススメ', description: '「No」と言う勇気が時間を生み出す。', date: '2026-01-12' },
      { id: '020-art-of-rest', slug: '020-art-of-rest', title: '最高の休息法 - 「何もしない」をする勇気', description: '質の高い休息のススメ。', date: '2026-01-12' },
    ];

    const lowerQuery = query.toLowerCase();
    const matchedArticles = ALL_ARTICLES.filter(article => {
      const titleMatch = article.title.toLowerCase().includes(lowerQuery);
      const descMatch = article.description.toLowerCase().includes(lowerQuery);
      const tagMatch = article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));

      return titleMatch || descMatch || tagMatch;
    });

    return matchedArticles;
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm">Blogに戻る</span>
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">
          {query ? `"${query}" の検索結果` : '全記事'}
        </h1>
        <p className="text-zinc-400">
          {query
            ? `${matchedArticles.length}件の記事が見つかりました`
            : `全${ALL_ARTICLES.length}件の記事`}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6"
          >
            {matchedArticles.length > 0 ? (
              matchedArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-6 rounded-xl hover:border-teal-500/30 transition-all group block"
                >
                  <Link href={`/blog/${article.slug}`} className="block">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors mb-2">
                          {article.title}
                        </h2>
                        {article.description && (
                          <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
                            {article.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          {article.category && (
                            <span className="text-xs px-2 py-1 bg-teal-500/10 text-teal-400 rounded">
                              {article.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <time
                        dateTime={article.date}
                        className="text-sm text-zinc-500 whitespace-nowrap"
                      >
                        {article.date}
                      </time>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="glass-card p-12 rounded-xl">
                  <X className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
                  <p className="text-zinc-400 text-lg mb-2">該当する記事が見つかりませんでした</p>
                  <p className="text-zinc-500 text-sm">
                    別のキーワードで検索するか、
                    <Link href="/" className="text-teal-400 hover:text-teal-300">
                      記事一覧を確認
                    </Link>
                    してください。
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
