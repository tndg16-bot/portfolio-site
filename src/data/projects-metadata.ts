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
  description?: string;
  links?: { label: string; url: string }[];
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
    ],
    description: 'AIキャラクターとの会話を通じて、楽しみながら日本語を学べる学習プラットフォーム。',
    links: [
      { label: "詳細を見る", url: "/lp/nihongo-mate" }
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
      'PWA対応でオフライン動作可能',
    ],
    description: '目標達成のための曼荼羅チャートをゲーム化し、継続的なモチベーション維持を支援するツール。',
    links: [
      { label: "詳細を見る", url: "/lp/gamified-mandala-chart" }
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
    ],
    description: '生年月日から、あなたの隠れた才能や運勢を多角的に診断するスピリチュアルAIツール。',
    links: [
      { label: "詳細を見る", url: "/lp/talent-diagnosis" }
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
    ],
    description: '簡単な質問に答えるだけで、あなたに最適なAI副業を提案する診断ツール。',
    links: [
      { label: "詳細を見る", url: "/lp/ai-diagnosis-six" }
    ]
  },
  'xboost': {
    slug: 'xboost',
    title: 'Xboost',
    emoji: '🚀',
    category: 'tool',
    featured: true,
    iconColor: 'sky',
    highlights: [
      'AIによる投稿作成支援・テンプレート機能',
      '最大2ヶ月先までの予約投稿機能',
      '1年分のデータ分析と勝ちパターン発見',
    ],
    description: 'X（旧Twitter）運用に必要な「作成・投稿・分析・改善」の全サイクルを一元管理し、発信力を最大化するSaaSツール。',
    links: [
      { label: "詳細を見る", url: "/lp/xboost" }
    ]
  },
  'emo-sns': {
    slug: 'emo-sns',
    title: 'EmoSNS',
    emoji: '🥺',
    category: 'main',
    featured: false,
    iconColor: 'pink',
    highlights: [
      '「感情」の瞬間にフォーカスしたSNS',
      '数値による評価を排除したポジティブな空間',
      'Next.jsによるモダンなWebアプリケーション',
    ],
    description: '日常の些細な「感情」を共有し、共感し合うための新しいソーシャルプラットフォーム（開発中）。',
    links: [
      { label: "詳細を見る", url: "/lp/emo-sns" }
    ]
  },
  'instagram': {
    slug: 'instagram',
    title: 'InstaFlow AI',
    emoji: '📸',
    category: 'tool',
    featured: false,
    iconColor: 'fuchsia',
    highlights: [
      'マルチエージェントシステムによる運用自動化',
      'Frontend/Backend/Infraの各担当AIが協調動作',
      'ビジネス成長を加速させる統合プラットフォーム',
    ],
    description: '複数のAIエージェントが連携してインスタグラム運用を自動化・最適化する次世代マーケティングプラットフォーム。',
    links: [
      { label: "詳細を見る", url: "/lp/instagram" }
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
    ],
    description: 'ブログ記事や動画台本の作成をAIで自動化し、コンテンツ制作の時間を劇的に短縮するツール。',
    links: [
      { label: "詳細を見る", url: "/lp/ai-writing-automation" }
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
      'Kindle Cloud Readerからの自動ページキャプチャ',
      'メモリ効率的な処理（IndexedDB使用）',
      'PDFへの自動変換・結合機能',
    ],
    description: 'Kindle Cloud Readerの書籍を自動でキャプチャし、個人的な学習用にPDF化するChrome拡張機能。',
    links: [
      { label: "詳細を見る", url: "/lp/kindlescanpdf" }
    ]
  },
  'task-manager': {
    slug: 'task-manager',
    title: 'タスク管理ツール',
    emoji: '📅',
    category: 'tool',
    featured: true,
    iconColor: 'cyan',
    highlights: [
      '音声入力対応 (Web Speech API)',
      'Google Calendar/Tasks 双方向連携',
      'OAuth 2.0によるセキュアな認証',
    ],
    description: '音声入力で素早くタスク登録ができ、GoogleカレンダーとToDoリストに自動同期するWebアプリケーション。',
    links: [
      { label: "詳細を見る", url: "/lp/task-manager" }
    ]
  },
  'termlog-opencode': {
    slug: 'termlog-opencode',
    title: 'TermLog for OpenCode',
    emoji: '📝',
    category: 'tool',
    featured: false,
    iconColor: 'slate',
    highlights: [
      'AIチャットセッションの自動保存・要約',
      'ローカルLLMを用いた会話抽出',
      'ObsidianへのMarkdown自動エクスポート',
    ],
    description: 'OpenCodeでのAIとの対話履歴を自動的に記録・要約し、Obsidianに知識として蓄積するツール。',
    links: [
      { label: "詳細を見る", url: "/lp/termlog-opencode" }
    ]
  },
  'portfolio': {
    slug: 'portfolio',
    title: 'Portfolio Site',
    emoji: '🎨',
    category: 'main',
    featured: false, // トップページに表示しない
    iconColor: 'indigo',
    highlights: [
      'Next.js 14 + Tailwind CSSによる構築',
      'マルチエージェント開発体制の実践',
      'プロジェクトメタデータの集中管理',
    ],
    description: 'AI活用プロジェクトのショーケース。開発プロセス自体をAIと協調して行う実験場としても機能。',
    links: [
      { label: "詳細を見る", url: "/lp/portfolio" }
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
      'ターミナル操作履歴の自動保存',
      '全文検索機能付きログビューア',
      'セッション単位での履歴管理',
    ],
    description: '開発者のターミナル操作をすべて記録・保存し、過去の作業内容をいつでも検索・参照できるログ管理ツール。',
    links: [
      { label: "詳細を見る", url: "/lp/termlog" }
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
      'AIセッション履歴の永続化と管理',
      'セマンティック検索による知識抽出',
      '過去の対話からのナレッジ再利用',
    ],
    description: 'AIとの対話履歴をセキュアに保存し、必要な時にいつでも知識として引き出せるセッション管理システム。',
    links: [
      { label: "詳細を見る", url: "/lp/session-vault" }
    ]
  },
  'antigravity-vault': {
    slug: 'antigravity-vault',
    title: 'AntigravityVault',
    emoji: '🚀',
    category: 'tool',
    featured: true,
    iconColor: 'pink',
    highlights: [
      'Antigravity会話ログのObsidian自動保存',
      'Protocol Buffers解析によるログ抽出',
      'Local REST API経由のシームレス連携',
    ],
    description: 'Google IDE (Antigravity) の会話ログを解析し、Obsidianにナレッジとして自動蓄積する連携ツール。',
    links: [
      { label: "詳細を見る", url: "/lp/antigravity-vault" }
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
      '定期的な自己分析プロンプト通知',
      'Googleカレンダーとの連携',
      '内省習慣の自動化と定着支援',
    ],
    description: '定期的に自己分析のための問いかけを通知し、忙しい日常の中で自分を見つめ直す時間を確保するツール。',
    links: [
      { label: "詳細を見る", url: "/lp/self-analysis-notification" }
    ]
  },
};
