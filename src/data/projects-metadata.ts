/**
 * Projects Metadata - プロジェクトのメタデータ
 * GitHub APIから自動取得できない手動設定情報を管理
 */

export interface ProjectMetadata {
  slug: string;
  title: string;
  emoji: string;
  category: 'main' | 'tool' | 'experiment';
  featured: boolean;
  iconColor: string;
  highlights?: string[];
}

export const projectsMetadata: Record<string, ProjectMetadata> = {
  'nihongo-mate': {
    slug: 'nihongo-mate',
    title: 'Nihongo AI',
    emoji: '🇯🇵',
    category: 'main',
    featured: true,
    iconColor: 'rose',
    highlights: [
      '5つのキャラクターチューター（アニメ、ビジネス、旅行者など）',
      'XP・レベル・実績システムによるゲーム化',
      'Web Speech APIによる発音練習',
    ]
  },
  'gamified-mandala-chart': {
    slug: 'gamified-mandala-chart',
    title: 'Gamified Mandala Chart',
    emoji: '🎯',
    category: 'main',
    featured: true,
    iconColor: 'amber',
    highlights: [
      '曼荼羅チャート形式で目標を81セルに分解',
      'XP・レベル・実績によるモチベーション維持',
      'Obsidian同期・Markdown/PDFエクスポート対応',
    ]
  },
  'talent-diagnosis': {
    slug: 'talent-diagnosis',
    title: '才能診断ツール',
    emoji: '🔮',
    category: 'main',
    featured: true,
    iconColor: 'violet',
    highlights: [
      '数秘術（ライフパス/ソウルナンバー/パーソナリティナンバー）',
      '四柱推命（日干・通変星・十二運）',
      'AIによるパーソナライズされたスピリチュアルアドバイス',
    ]
  },
  'ai-diagnosis-six': {
    slug: 'ai-diagnosis-six',
    title: 'AI副業適性診断',
    emoji: '🤖',
    category: 'main',
    featured: true,
    iconColor: 'purple',
    highlights: [
      '5問の質問で適性を診断',
      'MBTIタイプ別の分析',
      '副業プランの提案',
    ]
  },
  'ai-writing-automation': {
    slug: 'ai-writing-automation',
    title: 'AI Writing Automation',
    emoji: '✍️',
    category: 'tool',
    featured: true,
    iconColor: 'blue',
    highlights: [
      'SEO対策済みブログ記事を5分で生成',
      'YouTube台本・ゆっくり動画台本対応',
      '80-90%の時間短縮を実現',
    ]
  },
  'kindlescanpdf': {
    slug: 'kindlescanpdf',
    title: 'Kindle to PDF',
    emoji: '📚',
    category: 'tool',
    featured: false,
    iconColor: 'orange',
    highlights: [
      '自動ページ送り・キャプチャ',
      'メモリ効率的な処理（IndexedDB使用）',
      '一時停止・再開機能',
    ]
  },
  'calendar-sync-manager': {
    slug: 'calendar-sync-manager',
    title: 'Calendar Sync Manager',
    emoji: '📅',
    category: 'tool',
    featured: false,
    iconColor: 'cyan',
    highlights: [
      'Google Calendar/Tasks双方向同期',
      '音声入力によるクイック登録',
      'ウィジェット形式のUI',
    ]
  },
  'termlog': {
    slug: 'termlog',
    title: 'TermLog',
    emoji: '💾',
    category: 'tool',
    featured: false,
    iconColor: 'green',
    highlights: [
      'ターミナル履歴の自動保存',
      '全文検索機能',
      'セッション単位での管理',
    ]
  },
  'session-vault': {
    slug: 'session-vault',
    title: 'SessionVault',
    emoji: '🗃️',
    category: 'tool',
    featured: false,
    iconColor: 'indigo',
    highlights: [
      'セッション履歴の永続化',
      'セマンティック検索',
      '知識の再利用',
    ]
  },
  'antigravity-vault': {
    slug: 'antigravity-vault',
    title: 'AntigravityVault',
    emoji: '🚀',
    category: 'tool',
    featured: false,
    iconColor: 'pink',
    highlights: [
      'Obsidian Vaultとの双方向同期を実現',
      'ノートとコードの統合管理',
    ]
  },
  'self-analysis-notification': {
    slug: 'self-analysis-notification',
    title: 'Self Analysis Notification',
    emoji: '🔔',
    category: 'tool',
    featured: false,
    iconColor: 'yellow',
    highlights: [
      '定期的な自己分析プロンプトを通知',
      '内省習慣の自動化',
    ]
  },
};
