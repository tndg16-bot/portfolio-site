/**
 * r4 経歴タイムライン
 * Source: T-201_about_motoyama_draft.md r4
 */
export interface TimelineEntry {
  year: number;
  ageHint?: string;
  title: string;
  body: string;
  emphasis?: boolean;
}

export const timelineR4: TimelineEntry[] = [
  {
    year: 2012,
    title: '大手証券会社入社（個人営業）',
    body: '同期250人中、最初の半年は完全に売れず、ほぼ最下位。先輩に「説明しすぎ。客の話を聞いてない」と言われた日から商談の8割を「聞くこと」に振り直す。半年後、同期250人中2位、予算比300%。',
    emphasis: true,
  },
  { year: 2015, title: '人材業界に転身', body: '法人営業・採用支援・組織開発を経験。' },
  { year: 2018, title: 'キャリア・人材コンサル領域', body: '多業界を担当（金融・製造・IT・サービス業）。' },
  { year: 2022, title: '29歳11ヶ月で独立を決意', body: '生成AI 黎明期に出会い、自分の業務に毎日組み込み始める。', emphasis: true },
  { year: 2023, title: '個人事業として AI 活用支援サービスを設計・テスト運用', body: '小さく試行錯誤を重ねる。' },
  { year: 2024, title: '株式会社パンハウスと業務委託契約', body: 'インサイドセールス + 営業体制の制度設計。法人向けの AI 研修案件は協業で対応することが多い。', emphasis: true },
  { year: 2025, title: 'パンハウスとの協業で法人向け AI 研修プロジェクトに継続参加', body: '通信大手・化学メーカー・IR 支援企業など複数案件で前段ヒアリング/後段定着設計を担当。' },
  { year: 2026, title: '個人事業として中小企業・個人事業主の AI 活用伴走を再起動', body: 'note・Threads で試行錯誤を発信中。「知っている」を「使える」に変えるところまで、地味に一緒にやる。', emphasis: true },
];
