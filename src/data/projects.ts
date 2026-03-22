/**
 * Projects Data - 本山貴裕の作品集
 * Apps配下のプロジェクトをポートフォリオとして管理
 */

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  emoji: string;
  category: 'individual' | 'corporate' | 'automation' | 'archive';
  status: 'live' | 'development' | 'private' | 'coming-soon';
  url?: string;
  github?: string;
  techStack: string[];
  featured: boolean;
  iconColor: string;
  highlights?: string[];
}

export const projects: Project[] = [
  // ============= 個人向けサービス・ツール =============
  {
    id: 'talent-diagnosis',
    slug: 'talent-diagnosis',
    title: '才能診断ツール',
    description: '数秘術・四柱推命・運気サイクルを統合し、AIによるパーソナライズされたスピリチュアルアドバイスを生成。',
    emoji: '🔮',
    category: 'individual',
    status: 'live',
    url: 'https://talent-diagnosis.vercel.app',
    techStack: ['Next.js 16', 'TypeScript', 'Ollama', 'Chart.js', 'lunar-javascript'],
    featured: true,
    iconColor: 'violet',
    highlights: [
      '数秘術（ライフパス/ソウル/パーソナリティナンバー）',
      '四柱推命（日干・通変星・十二運）',
      'AIによるパーソナライズアドバイス',
    ]
  },
  {
    id: 'ai-diagnosis',
    slug: 'ai-diagnosis',
    title: 'AI副業適性診断',
    description: '5問の質問で、あなたに向いているAI副業タイプを診断。MBTI分析も可能。',
    emoji: '🤖',
    category: 'individual',
    status: 'live',
    url: 'https://ai-diagnosis-six.vercel.app',
    techStack: ['React', 'TypeScript', 'Vercel'],
    featured: true,
    iconColor: 'purple',
    highlights: [
      '5問の質問で適性を診断',
      'MBTIタイプ別の分析',
      '副業プランの提案',
    ]
  },
  
  // ============= 自動化ツール =============
  {
    id: 'ai-writing-automation',
    slug: 'ai-writing-automation',
    title: 'AI Writing Automation',
    description: 'キーワード入力からGoogle Docs完成稿まで、AIライティングノウハウを自動化するシステム。ブログ・YouTube台本・ゆっくり動画台本に対応。',
    emoji: '✍️',
    category: 'automation',
    status: 'live',
    github: 'https://github.com/tndg16-bot/ai-writing-automation',
    techStack: ['Python', 'OpenAI API', 'Google Docs API'],
    featured: true,
    iconColor: 'blue',
    highlights: [
      'SEO対策済みブログ記事を5分で生成',
      'YouTube台本・ゆっくり動画台本対応',
      '80-90%の時間短縮を実現',
    ]
  },
  {
    id: 'kindlescanpdf',
    slug: 'kindlescanpdf',
    title: 'Kindle to PDF',
    description: 'Kindle Web Readerからページをキャプチャし、PDFに変換するChrome拡張機能。500ページ以上の大規模ドキュメントにも対応。',
    emoji: '📚',
    category: 'individual',
    status: 'live',
    techStack: ['TypeScript', 'Chrome Extension', 'IndexedDB', 'jsPDF'],
    featured: false,
    iconColor: 'orange',
    highlights: [
      '自動ページ送り・キャプチャ',
      'メモリ効率的な処理（IndexedDB使用）',
      '一時停止・再開機能',
    ]
  },
  {
    id: 'calendar-sync-manager',
    slug: 'calendar-sync-manager',
    title: 'Calendar Sync Manager',
    description: 'Google Calendar/Tasks連携。音声入力対応で、素早くタスクを登録。',
    emoji: '📋',
    category: 'automation',
    status: 'private',
    techStack: ['React', 'Google API', 'Web Speech API'],
    featured: false,
    iconColor: 'cyan',
    highlights: [
      'Google Calendar/Tasks双方向同期',
      '音声入力によるクイック登録',
      'ウィジェット形式のUI',
    ]
  },
  {
    id: 'termlog',
    slug: 'termlog',
    title: 'TermLog',
    description: 'ターミナルセッションの自動記録・検索ツール。AI開発セッションのログを永続化。',
    emoji: '💾',
    category: 'automation',
    status: 'development',
    techStack: ['Python', 'SQLite', 'Click'],
    featured: false,
    iconColor: 'green',
    highlights: [
      'ターミナル履歴の自動保存',
      '全文検索機能',
      'セッション単位での管理',
    ]
  },
  {
    id: 'session-vault',
    slug: 'session-vault',
    title: 'SessionVault',
    description: 'AIとのチャットセッションを永続化・検索可能にするナレッジベース。過去のAI対話から学びを抽出。',
    emoji: '🗄️',
    category: 'automation',
    status: 'development',
    techStack: ['Python', 'SQLite', 'Semantic Search'],
    featured: false,
    iconColor: 'indigo',
    highlights: [
      'セッション履歴の永続化',
      'セマンティック検索',
      '知識の再利用',
    ]
  },
  {
    id: 'antigravity-vault',
    slug: 'antigravity-vault',
    title: 'AntigravityVault',
    description: 'Obsidian Vaultとの双方向同期を実現するツール。ノートとコードの統合管理。',
    emoji: '🚀',
    category: 'automation',
    status: 'development',
    techStack: ['Python', 'Obsidian API'],
    featured: false,
    iconColor: 'pink',
  },
  {
    id: 'self-analysis-notification',
    slug: 'self-analysis-notification',
    title: 'Self Analysis Notification',
    description: '定期的な自己分析プロンプトを通知するツール。内省習慣の自動化。',
    emoji: '🔔',
    category: 'individual',
    status: 'development',
    techStack: ['Python', 'Windows Notification'],
    featured: false,
    iconColor: 'yellow',
  },
  
  // ============= 法人向けサービス・ツール =============
  {
    id: 'github-actions-cicd',
    slug: 'github-actions-cicd',
    title: 'GitHub Actions CI/CD',
    description: 'PRごとの自動Lint/Buildチェック、AIエージェント協調開発のためのマルチエージェント階層構造を構築。',
    emoji: '⚙️',
    category: 'corporate',
    status: 'live',
    techStack: ['GitHub Actions', 'CI/CD', 'Multi-Agent'],
    featured: false,
    iconColor: 'green',
    highlights: [
      '自動Lint/Build/Testチェック',
      'マルチエージェント協調ワークフロー',
      'Vercel自動デプロイ連携',
    ]
  },
  // ============= Archive（非表示） =============
  {
    id: 'nihongo-ai',
    slug: 'nihongo-ai',
    title: 'Nihongo AI',
    description: 'AIを活用した日本語学習プラットフォーム。5つのアーキタイプチューター、ゲーミフィケーション、発音練習機能を搭載。',
    emoji: '🇯🇵',
    category: 'archive',
    status: 'development',
    github: 'https://github.com/tndg16-bot/nihongo-mate',
    techStack: ['Next.js 15', 'TypeScript', 'Supabase', 'Claude API', 'Web Speech API'],
    featured: false,
    iconColor: 'rose',
  },
  {
    id: 'gamified-mandala-chart',
    slug: 'gamified-mandala-chart',
    title: 'Gamified Mandala Chart',
    description: 'ゲーミフィケーションを取り入れた曼荼羅チャート形式の目標設定・達成管理アプリケーション。',
    emoji: '🎯',
    category: 'archive',
    status: 'development',
    github: 'https://github.com/tndg16-bot/gamified-mandala-chart',
    techStack: ['Next.js 16', 'TypeScript', 'Firebase', 'Framer Motion', 'Stripe'],
    featured: false,
    iconColor: 'amber',
  },
];

/**
 * Get all projects (excluding archive)
 */
export function getProjects(): Project[] {
  return projects.filter((p) => p.category !== 'archive');
}

/**
 * Get featured projects (excluding archive)
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured && p.category !== 'archive');
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter((p) => p.category === category);
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Get live projects
 */
export function getLiveProjects(): Project[] {
  return projects.filter((p) => p.status === 'live');
}
