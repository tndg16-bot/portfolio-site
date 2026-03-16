import { SessionService } from '@/types/services';

/**
 * Services Data
 * Comprehensive service offerings with pricing and details
 */
export const services: SessionService[] = [
  {
    id: 'ai-workshop',
    title: 'AI導入ワークショップ',
    titleEn: 'AI Workshop',
    description: '2時間のハンズオンで、AIツールを実際に業務に使えるようになります。プロンプトテンプレート集付きで、翌日からすぐ実践可能。',
    duration: '2時間',
    durationMinutes: 120,
    pricing: { type: 'fixed', price: '10,000円〜', notes: '個人参加10,000円（税込）/ 法人（3名まで）30,000円（税込）' },
    features: ['テーマ別ハンズオン実習', 'プロンプトテンプレート集（持ち帰り）', '1週間のチャットサポート', '業務別AI活用ワークフロー', 'オンライン or 対面対応'],
    idealFor: ['AI活用診断を受けて「もっと知りたい」と感じた方', 'ChatGPTの基本を業務レベルに引き上げたい方', '社員のAIリテラシーを高めたい経営者', 'AI副業に興味がある方'],
    notIdealFor: ['完全初心者（まずは無料診断からどうぞ）', 'AIの理論だけを学びたい方'],
    format: 'hybrid',
    frequency: 'one-time',
    popular: true,
    tags: ['AI活用', 'ワークショップ', 'ハンズオン', '研修'],
    category: 'both'
  },
  {
    id: 'ai-consulting',
    title: '業務自動化コンサルティング',
    titleEn: 'AI Business Automation',
    description: '3ヶ月間で業務のAI活用を設計・導入・定着させる伴走型プログラム。週1回のMTGとチャットサポートで、確実に成果を出します。',
    duration: '3ヶ月（週1回MTG + チャット随時）',
    durationMinutes: 60,
    pricing: { type: 'package', price: '50,000円/月', notes: '3ヶ月契約（税込150,000円）。分割払い可能。' },
    features: ['業務フロー棚卸し＋AI活用戦略設計', 'ツール選定・アカウント設定代行', 'プロンプト・ワークフロー構築', '社員向け操作研修（2回まで）', '週1回オンラインMTG（30分）', 'チャットサポート（無制限）', '月次成果レポート'],
    idealFor: ['本格的にAIを業務に組み込みたい中小企業', '複数業務の自動化を検討している経営者', '社員にAIを使わせたいが教育手段がない企業', 'AI導入で競合に差をつけたい事業者'],
    notIdealFor: ['一度だけ相談したい方（ワークショップをおすすめします）', '3ヶ月間の時間投資が難しい方'],
    format: 'online',
    frequency: 'series',
    popular: false,
    tags: ['AI活用', 'コンサルティング', '業務自動化', '法人向け'],
    category: 'business'
  },
  {
    id: 'ai-support',
    title: 'AI活用継続サポート',
    titleEn: 'Ongoing AI Support',
    description: '月1回のMTGとチャットサポートで、AIの活用をどんどん広げます。新ツール情報の共有やプロンプトレビューで、常に最新のAI活用を実現。',
    duration: '月額制（月1回MTG + チャット）',
    durationMinutes: 30,
    pricing: { type: 'package', price: '10,000円/月', notes: '最低契約期間なし。いつでも解約可能。' },
    features: ['月1回オンラインMTG（30分）', '新ツール・アップデート情報の共有', 'チャット質問対応（月10回まで）', 'プロンプトレビュー・改善提案', '月1回AI活用ニュースレター'],
    idealFor: ['ワークショップやコンサルティング受講後に継続的な相談相手が欲しい方', 'AI活用を組織全体に広げたい方', '最新のAI情報をキャッチアップしたい方'],
    notIdealFor: ['まだAIを使い始めていない方（まずは無料診断からどうぞ）'],
    format: 'online',
    frequency: 'ongoing',
    popular: false,
    tags: ['AI活用', '月額', '継続', 'サポート'],
    category: 'business'
  },
  {
    id: 'single-session',
    title: 'モヤモヤ整理セッション',
    titleEn: 'Life Self-Determination Session',
    description: '60〜90分で、価値観と判断軸を言語化して、次の一歩まで落とします。「答えを知りたい」ではなく、「自分で決断できるようになりたい」という方に最適です。',
    duration: '60-90分',
    durationMinutes: 60,
    pricing: {
      type: 'screening',
      price: null,
      notes: '審査制のため、詳細は個別にお伝えいたします。初回のみ特別価格をご用意しています。'
    },
    features: [
      '価値観の言語化',
      '判断軸の整理',
      '次のアクション3つ',
      'AI活用アドバイス',
      'アフターフォローアップ',
      'Zoomオンライン実施'
    ],
    idealFor: [
      '「正解」を求め続けて、かえって迷子になっている方',
      'ノウハウを集めすぎて、行動できなくなっている方',
      'AI時代に自分の価値をどう発揮すべきか模索している方',
      'キャリアの岐路に立って、決断に困っている方'
    ],
    notIdealFor: [
      '答えを誰かに決めてほしい方',
      '自己分析に苦手意識がある方',
      '即時的なトラブル解決が必要な方',
      '他人の価値観を押し付けられたい方'
    ],
    format: 'online',
    frequency: 'one-time',
    popular: true,
    tags: ['コーチング', 'キャリア', '自己理解', '意思決定'],
    category: 'individual'
  },
  {
    id: 'compass-program',
    title: '3ヶ月間・羅針盤プログラム',
    titleEn: 'Compass Program (3 Months)',
    description: '週1回のセッションで、3ヶ月間で人生の羅針盤を確立します。「正解」を見つけるのではなく、「自分の羅針盤」を構築することを目指します。',
    duration: '3ヶ月（全12回）',
    durationMinutes: 60,
    pricing: {
      type: 'package',
      price: '150,000円',
      notes: '分割払い可能。詳細はお問い合わせください。'
    },
    features: [
      '週1回の個別セッション（各60分）',
      '毎週の週次レポート',
      'チャットサポート付き',
      'AIツール導入ガイド',
      '進捗ダッシュボード',
      'セッション録画',
      '振り返りシート'
    ],
    idealFor: [
      '人生を大きく変えたいと考えている方',
      '継続的なサポートが必要な方',
      'AI副業を始めたい方',
      'キャリアチェンジを検討している方',
      '自己理解を深めたい方'
    ],
    notIdealFor: [
      '一度だけ相談したい方',
      '時間を大幅に投資できない方',
      'すぐに答えを知りたい方'
    ],
    format: 'online',
    frequency: 'series',
    popular: true,
    tags: ['長期プログラム', '副業', 'キャリアチェンジ', 'コーチング'],
    category: 'individual'
  },
  {
    id: 'corporate-workshop',
    title: '企業向け・意思決定ワークショップ',
    titleEn: 'Decision-Making Workshop',
    description: 'チームの意思決定力を高めるワークショッププログラム。「誰も決められない」組織文化を変革し、効率的で質の高い意思決定を実現します。',
    duration: '半日〜1日',
    durationMinutes: 240,
    pricing: {
      type: 'fixed',
      price: 'お問い合わせください',
      notes: 'チームサイズ、カスタマイズ内容により変動'
    },
    features: [
      'チーム診断',
      'カスタマイズされたワークショップ',
      '意思決定フレームワークの導入',
      'アクションプラン作成',
      'フォローアップセッション1回',
      '教材提供',
      '事前ヒアリング',
      '成果レポート'
    ],
    idealFor: [
      'チームの意思決定力を強化したい企業',
      '変革期にある組織',
      'リモートチームのマネジメント',
      '意思決定が遅延しているチーム',
      'リーダーシップ力を向上させたいマネージャー'
    ],
    notIdealFor: [
      '個人の相談',
      '小規模チーム（5名未満）',
      '特定のスキルトレーニングのみを希望する場合'
    ],
    format: 'online',
    frequency: 'one-time',
    popular: false,
    tags: ['法人向け', 'チームビルディング', 'リーダーシップ', '意思決定'],
    category: 'business'
  },
  {
    id: 'ai-promotion',
    title: 'AI推進支援（全社展開）',
    titleEn: 'Enterprise AI Promotion',
    description: '全社的なAI活用を段階的に推進するプログラム。Phase 0（現状診断）からPhase 3（自走化）まで、御社のペースに合わせて伴走します。',
    duration: '6ヶ月〜',
    durationMinutes: 60,
    pricing: { type: 'fixed', price: 'お問い合わせください', notes: '企業規模・カスタマイズ内容により変動' },
    features: ['現状診断・AI活用度アセスメント', '全社AI活用ロードマップ策定', '部門別AI活用戦略', '研修プログラム設計・実施', '定着支援・効果測定'],
    idealFor: ['全社的にAI活用を推進したい企業', 'AI導入が部分的で全社展開できていない企業', 'DX推進担当者がAI戦略に悩んでいる企業'],
    notIdealFor: ['個人での利用', '特定ツール1つだけ導入したい場合'],
    format: 'hybrid',
    frequency: 'series',
    popular: false,
    tags: ['法人向け', 'AI推進', '全社展開', 'DX'],
    category: 'business'
  },
  {
    id: 'ai-development',
    title: 'AI開発',
    titleEn: 'Custom AI Development',
    description: 'オリジナルGPTs、Claude Codeスキル、業務特化チャットボットなど、御社専用のAIプロダクトを開発します。',
    duration: '要相談',
    durationMinutes: 60,
    pricing: { type: 'fixed', price: 'お問い合わせください', notes: '開発内容・規模により変動。まずは無料相談でヒアリングします。' },
    features: ['オリジナルGPTs作成', 'Claude Codeスキル開発', '業務特化チャットボット構築', 'API連携・ワークフロー自動化', '運用サポート・改善提案'],
    idealFor: ['既存ツールでは対応できない業務課題がある企業', '社内ナレッジを活用したAIを作りたい企業', 'AI活用をさらに高度化したい企業'],
    notIdealFor: ['AIの基礎を学びたい方（ワークショップをおすすめ）', '大規模基幹システムの開発'],
    format: 'online',
    frequency: 'one-time',
    popular: false,
    tags: ['法人向け', 'AI開発', 'GPTs', 'チャットボット'],
    category: 'business'
  }
];

/**
 * Get all services
 */
export function getAllServices(): SessionService[] {
  return services;
}

/**
 * Get service by ID
 */
export function getServiceById(id: string): SessionService | undefined {
  return services.find((service) => service.id === id);
}

/**
 * Get services by tag
 */
export function getServicesByTag(tag: string): SessionService[] {
  return services.filter((service) => service.tags.includes(tag));
}

/**
 * Get services by format
 */
export function getServicesByFormat(format: string): SessionService[] {
  return services.filter((service) => service.format === format);
}

/**
 * Get popular services
 */
export function getPopularServices(): SessionService[] {
  return services.filter((service) => service.popular);
}

/**
 * Get services by frequency
 */
export function getServicesByFrequency(frequency: string): SessionService[] {
  return services.filter((service) => service.frequency === frequency);
}
