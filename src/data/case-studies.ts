import { CaseStudy } from '@/types/case-studies';

/**
 * Case Studies Data
 * Realistic coaching and consulting scenarios with before/after transformations
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'case-study-1',
    slug: 'zero-to-conversational',
    title: 'AI副業を始められない方から、1ヶ月で3万円稼ぐまで',
    subtitle: 'コーチングとAI活用で、副業収入を実現',
    client: {
      name: '田中 美咲',
      industry: 'ITエンジニア（本業）'
    },
    category: 'career',
    tags: ['副業', 'AI活用', 'コーチング', '収益化'],
    featured: true,
    summary: '「副業を始めたいが、何から始めればいいかわからない」状態から、1ヶ月間のコーチングとAIツール活用で、月3万円の副業収入を実現しました。',
    challenge: '田中さんはITエンジニアとして勤務しながら、「将来の不安」「キャリアの幅を広げたい」と思い、副業を始めたいと考えていました。しかし、「時間がない」「何から始めればいいかわからない」「リスクが怖い」という理由で、半年間何も行動できていませんでした。',
    solution: '1ヶ月間の個人コーチングプログラムを実施。\n\n1. **自己分析ワーク**: 現在のスキル・リソース・制約を言語化\n2. **目標設定**: 月1万円〜3万円の具体的な収益目標を設定\n3. **AIツール選定**: ChatGPT、Claude、Notion AIなど、目的に合ったツールを選定\n4. **実践プロジェクト**: 小さなプロジェクトから開始（プロンプト作成代行 → コンテンツ作成）\n5. **週次チェック**: 毎週の進捗を確認し、問題を早期発見・解決',
    results: [
      '1ヶ月で月3万円の副業収入を実現',
      '3つのAIツールを使いこなせるようになった',
      '自己決定能力が向上し、仕事でも活用',
      '次のステップ（フリーランス移行）の道筋が見えた'
    ],
    stats: [
      {
        key: '収益',
        value: '月3万円',
        description: '1ヶ月で実現'
      },
      {
        key: '学習時間',
        value: '週5時間',
        description: '無理のないペース'
      },
      {
        key: 'AIツール',
        value: '3つ',
        description: 'ChatGPT, Claude, Notion AI'
      }
    ],
    testimonial: {
      quote: '「何から始めればいいかわからない状態から、具体的な行動計画ができました。AIは魔法ではなく、使い方次第ということが分かりました。自分の価値を売る方法が見つかって、自信につながりました。」',
      author: '田中 美咲',
      role: 'ITエンジニア'
    },
    date: '2025-12-15'
  },
  {
    id: 'case-study-2',
    slug: 'decision-speed-doubled',
    title: '社内意思決定が遅いマネージャーが、意思決定スピードを2倍に',
    subtitle: '意思決定フレームワークを導入し、組織効率を改善',
    client: {
      name: 'ABC株式会社',
      industry: '製造業'
    },
    category: 'business',
    tags: ['意思決定', 'リーダーシップ', '組織改善', 'ワークショップ'],
    featured: true,
    summary: 'チームの意思決定に時間がかかり、プロジェクトが遅延していたマネージャーに、意思決定フレームワークをトレーニング。意思決定スピードが2倍になり、プロジェクト遅延を50%削減しました。',
    challenge: 'ABC株式会社の開発部門（20名）では、重要な意思決定に1週間以上かかることが常態化していました。「誰も責任を取りたくない」「上長の許可を待つ」という文化が蔓延し、プロジェクト遅延が頻発。マネージャーの佐藤さんは「自分のチームだけスピードが遅い」と悩んでいました。',
    solution: '意思決定ワークショップと3ヶ月間のフォローアップ。\n\n1. **現状分析**: チームの意思決定プロセスを可視化\n2. **ワークショップ実施**: 1日間の意思決定フレームワークトレーニング\n3. **意思決定チャート**: 誰が何を決定できるか明確化\n4. **週次KPI**: 意思決定スピード、遅延率を計測\n5. **フィードバック文化**: 決定の品質とスピードの両方を評価',
    results: [
      '意思決定スピードが2倍に改善（7日→3.5日）',
      'プロジェクト遅延率を50%削減',
      'チームのエンゲージメントスコアが15点上昇',
      '責任の所在が明確になり、推奨力が向上'
    ],
    stats: [
      {
        key: '意思決定スピード',
        value: '2倍',
        description: '7日 → 3.5日'
      },
      {
        key: '遅延削減',
        value: '50%',
        description: 'プロジェクト遅延率'
      },
      {
        key: 'エンゲージメント',
        value: '+15点',
        description: 'チーム満足度'
      }
    ],
    testimonial: {
      quote: '「誰も決められない状況から、みんなが『決める』ようになりました。フレームワークがあると、リスクを怖がらずに決断できることを学びました。」',
      author: '佐藤 太郎',
      role: '開発部門マネージャー'
    },
    date: '2025-11-20'
  },
  {
    id: 'case-study-3',
    slug: 'consultant-original-service',
    title: 'ノウハウ依存で立ち止まっているコンサルタントが、独自サービスを立ち上げ',
    subtitle: '「他社の真似」からの脱却と自己決定の確立',
    client: {
      name: '山本 誠',
      industry: 'ITコンサルタント'
    },
    category: 'personal',
    tags: ['自己決定', 'キャリア', '起業準備', '独自価値'],
    featured: false,
    summary: '「他社の成功事例を真似しても成果が出ない」と悩んでいたコンサルタントが、自己決定フレームワークを使って独自サービスを立ち上げました。「答えは外にあるのではなく、自分の中から見つける」ことを学びました。',
    challenge: '山本さんはITコンサルタントとして5年間働いてきましたが、「独自の視点や強みが見つからない」という悩みを抱えていました。成功事例の真似、トレーニング参加、ノウハウ習得など、様々なアプローチを試みましたが、いずれも長続きせず。「結局、自分に何が足りないのか」と迷子になっていました。',
    solution: '3ヶ月間の羅針盤プログラム（週1回コーチング）を実施。\n\n1. **価値観の言語化**: 「何を大切にし、何を大切にしないか」を明確化\n2. **強みの再発見**: 他人の評価ではなく、自分の体験から強みを言語化\n3. **独自価値の定義**: 「自分しかできないこと」「他人はやりたくないこと」を可視化\n4. **サービス設計**: 独自の視点で顧客の課題を定義\n5. **実験的リリース**: 小さく始めて、実際の顧客フィードバックを収集',
    results: [
      '独自のマネタイムツール「自己決定ノート」をリリース',
      '初月で10名の有料ユーザー獲得',
      '「自分の言葉で語れる」ようになり、仕事での提案力が向上',
      'ノウハウ探しの時間を週5時間削減'
    ],
    stats: [
      {
        key: '有料ユーザー',
        value: '10名',
        description: '初月で獲得'
      },
      {
        key: 'リリース期間',
        value: '3ヶ月',
        description: 'プログラム完了まで'
      },
      {
        key: '提案力',
        value: '+30%',
        description: 'クライアント評価'
      }
    ],
    date: '2025-10-10'
  }
];

/**
 * Get all case studies
 */
export function getCaseStudies(): CaseStudy[] {
  return caseStudies;
}

/**
 * Get case study by slug
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

/**
 * Get featured case studies
 */
export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}

/**
 * Get case studies by category
 */
export function getCaseStudiesByCategory(category: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.category === category);
}

/**
 * Search case studies
 */
export function searchCaseStudies(query: string): CaseStudy[] {
  const lowerQuery = query.toLowerCase();
  return caseStudies.filter((cs) =>
    cs.title.toLowerCase().includes(lowerQuery) ||
    cs.summary.toLowerCase().includes(lowerQuery) ||
    cs.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
