// @ts-ignore - Prisma Client will be generated after running `npx prisma generate`
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. ユーザーの作成（開発チームとテストユーザー）
  const devTeam = await prisma.user.upsert({
    where: { email: 'dev-team@portfolio.com' },
    update: {},
    create: {
      email: 'dev-team@portfolio.com',
      name: 'Development Team',
      company: 'Takahiro Motoyama Portfolio',
      passwordHash: 'dev-team-hash', // 本番環境ではハッシュ化が必要
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: 'test-user@example.com' },
    update: {},
    create: {
      email: 'test-user@example.com',
      name: 'Test User',
      company: 'Test Company',
      passwordHash: 'test-user-hash', // 本番環境ではハッシュ化が必要
    },
  });

  console.log('✅ Users created:', { devTeam, testUser });

  // 2. 問いかけスクリプト（自己決定プロセス用）の作成
  const scripts = await prisma.questioningScript.createMany([
    {
      category: 'SITUATION',
      question: '今の状況をどう理解していますか？',
      followUpQuestions: [
        '何が起きているのか、客観的に言えますか？',
        '何を決定する必要がありますか？',
        'どんな情報が不足していますか？',
      ],
      answerType: 'TEXT',
    },
    {
      category: 'GOAL',
      question: 'どんなゴールを目指しますか？',
      followUpQuestions: [
        'そのゴールがあなたにとってなぜ重要ですか？',
        'どのゴールを優先しますか？',
        'そのゴールを達成するための期間はどれくらいですか？',
      ],
      answerType: 'TEXT',
    },
    {
      category: 'OPTIONS',
      question: 'どのような選択肢がありますか？',
      followUpQuestions: [
        'それぞれのメリットとデメリットは何ですか？',
        'どの選択肢が自分の価値観に最も合いますか？',
        'どの選択肢が期待される結果につながりますか？',
      ],
      answerType: 'CHOICE',
    },
    {
      category: 'VALUES',
      question: '自分の価値観は何ですか？',
      followUpQuestions: [
        'どの価値観が最も重要ですか？',
        'どの価値観が2番目に重要ですか？',
        'どの価値観が3番目に重要ですか？',
      ],
      answerType: 'RATING',
    },
    {
      category: 'INTUITION',
      question: '自分の直感は何を言っていますか？',
      followUpQuestions: [
        'その選択肢を選ぶと楽しそうですか？',
        'その選択肢を選ぶと不安を感じますか？',
        'その選択肢を選ぶと成長しそうですか？',
      ],
      answerType: 'RATING',
    },
    {
      category: 'DECISION',
      question: 'どの選択肢を選びますか？',
      followUpQuestions: [
        'その理由は何ですか？',
        'いつから実行しますか？',
        '誰と一緒に実行しますか？',
      ],
      answerType: 'TEXT',
    },
    {
      category: 'REFLECTION',
      question: '期待通りにいきましたか？',
      followUpQuestions: [
        '何を学びましたか？',
        '次回はどう改善できますか？',
        'どのようなパターンを特定できましたか？',
      ],
      answerType: 'TEXT',
    },
  ]);

  console.log('✅ Questioning scripts created:', scripts.length);

  // 3. AIプロンプトテンプレート（コンテンツ制作用）の作成
  const templates = await prisma.aiPromptTemplate.createMany([
    {
      category: 'CONTENT_CREATION',
      title: 'ブログ記事のアイデア出し',
      template: `ブログ記事のアイデアを10個出してください。
- ターゲット読者: 25〜40歳のエンジニア、フリーランサー
- 興味: AI活用、スキルアップ、副業、効率化
- ユニーク性: 自分のやり方で、自分のルールで

出力形式:
- 各アイデアにつき、以下を含めてください：
  - タイトル（魅力的）
  - 簡単な説明（2〜3文）
  - 読者が得られるメリット（1文）
  - 期待される読者の反応（質問、シェア、コメント）`,
      context: 'エンジニア向けの技術ブログ',
      temperature: 0.7,
    },
    {
      category: 'CONTENT_CREATION',
      title: 'ブログ記事のアウトライン作成',
      template: `「AI活用による効率化で副業月10万を達成した私のスクリプト」というタイトルで記事を書くためのアウトラインを作成してください。
- 見出し: H2「## 導入」、H3「### 背景」、H3「### 成功要因」など
- 構成要素: 段落（-）、箇条書き（•）、強調（**）、引用（>）
- 本文の構成要素: H3（小見出し）、H4（見出し）、コードブロック（\`\`\`）

出力形式:
- Markdown形式
- 各セクションを「## セクション名」で見出しにする
- 各サブセクションを「### サブセクション名」で見出しにする
- 本文の構成要素を「-」で箇条書きにする`,
      context: 'ブログ記事のアウトラインに従う',
      temperature: 0.7,
    },
    {
      category: 'CONTENT_CREATION',
      title: 'ブログ記事のドラフト作成',
      template: `以下のアウトラインに基づいて、記事のドラフトを書いてください。
- タイトル: 「AI活用による効率化で副業月10万を達成した私のスクリプト」
- 本文の長さ: 約3,000文字
- トーン: 実践的、専門的、かつ分かりやすい

出力形式:
- Markdown形式
- 完全な記事のドラフト（導入から結論まで）
- 具体的な例、データ、スクリプトを含めてください
- 読者が実践できるように、詳細なステップとヒントを提供してください

AI活用のポイント:
- AIは「アイデア出し」「ドラフト作成」「コード補完」「情報整理」に活用する
- 最終的なレビュー、調整、専門的な判断は人間が行う
- AIの提案をそのまま採用せず、自分の判断で選別する`,
      context: 'ブログ記事のアウトラインに従う',
      temperature: 0.7,
    },
  ]);

  console.log('✅ AI Prompt templates created:', templates.length);

  // 4. タスクの作成（Issues #83, #84, #85）
  const tasks = await prisma.task.createMany([
    {
      userId: devTeam.id,
      title: 'Issue #83: 自己決定プロセスの定義の詳細化',
      description: '自己決定プロセスの6つのステップを詳細に定義し、UIで実装します。',
      status: 'PENDING',
      priority: 'HIGH',
      assignee: 'development-team',
      dueDate: new Date('2026-02-06'),
      dependencies: [],
      issueNumber: 83,
    },
    {
      userId: devTeam.id,
      title: 'Issue #84: 信頼スコアリングシステムの実装',
      description: '信頼スコアリングシステムをUIとAPIで実装します。',
      status: 'PENDING',
      priority: 'HIGH',
      assignee: 'development-team',
      dueDate: new Date('2026-02-06'),
      dependencies: [],
      issueNumber: 84,
    },
    {
      userId: devTeam.id,
      title: 'Issue #85: AI活用ワークフローの実装',
      description: 'AI活用による効率化のワークフローを製品化・サービス化します。',
      status: 'PENDING',
      priority: 'HIGH',
      assignee: 'development-team',
      dueDate: new Date('2026-02-06'),
      dependencies: [],
      issueNumber: 85,
    },
  ]);

  console.log('✅ Tasks created:', tasks.length);

  // 5. 信頼スコア履歴の初期データ（テストユーザー用）
  const trustScoreHistory = await prisma.trustScoreHistory.create({
    userId: testUser.id,
    activityScore: 0,
    relationshipScore: 0,
    qualityScore: 0,
    revenueScore: 0,
    referralScore: 0,
    totalTrustScore: 0,
    trustLevel: 1,
  });

  console.log('✅ Trust score history created:', trustScoreHistory);

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
