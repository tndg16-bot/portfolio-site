import { SessionService } from '@/types/services';

/**
 * Services Data
 * Comprehensive service offerings with pricing and details
 */
export const services: SessionService[] = [
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
    tags: ['コーチング', 'キャリア', '自己理解', '意思決定']
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
      price: 'XXX,XXX円',
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
    tags: ['長期プログラム', '副業', 'キャリアチェンジ', 'コーチング']
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
    tags: ['法人向け', 'チームビルディング', 'リーダーシップ', '意思決定']
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
