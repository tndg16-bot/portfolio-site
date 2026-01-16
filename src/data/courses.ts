export type Lesson = {
    id: string;
    title: string;
    duration: number; // minutes
    isFree?: boolean;
    videoUrl?: string; // Mock URL
    content?: string; // Markdown content
    description?: string; // レッスンの説明
};

export type Module = {
    id: string;
    title: string;
    lessons: Lesson[];
    orderIndex: number;
};

export type Course = {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    price: number;
    thumbnail: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    levelLabel: string; // 日本語レベル表示
    modules: Module[];
    features: string[];
    // 追加項目
    targetAudience: string[]; // 受講対象
    learningGoals: string[]; // 学習目標
    expectedOutcomes: string[]; // 期待できる結果
    totalDuration: number; // 総時間（分）
    instructor: {
        name: string;
        title: string;
        avatar: string;
        bio: string;
    };
    requirements: string[]; // 受講に必要なもの
    faqs: {
        question: string;
        answer: string;
    }[];
};

export const courses: Course[] = [
    {
        id: 'c1',
        slug: 'life-design-basic',
        title: 'Life Design Basic: 自己決定の基礎',
        subtitle: '迷いから抜け出し、自分で決める力を取り戻す4週間の旅',
        description: `「何がしたいかわからない」「周りの目が気になる」そんな悩みを持つ人のための基礎講座。

価値観の言語化から始め、小さな自己決定を積み重ねるマインドセットを習得します。このコースを通じて、他者の評価に左右されない「自分軸」を確立し、迷いのない行動力を手に入れます。

特に、以下のような方におすすめです：
- キャリアの方向性で迷っている方
- 他者の期待に応えることに疲れている方
- 「本当は何がしたいのか」を見つめたい方
- AI時代において、自分だけの価値を確立したい方`,
        price: 29800,
        thumbnail: '/images/course-basic.jpg',
        level: 'Beginner',
        levelLabel: '初級（基礎）',
        totalDuration: 240, // 4時間
        targetAudience: [
            'キャリアの方向性で迷っている方（20-40代）',
            '他者の期待に応えることに疲れている方',
            '「本当は何がしたいのか」を見つめたい方',
            'AI時代において、自分だけの価値を確立したい方'
        ],
        learningGoals: [
            '自分の価値観を明確に言語化する',
            '小さな決定を積み重ね、自信を育てる',
            '他者の評価に左右されない「自分軸」を確立する',
            '迷いが生じた際の「決め方」を身につける'
        ],
        expectedOutcomes: [
            '日常の迷いが80%以上減少する',
            '自分で決める力が劇的に向上する',
            '他者の期待に応えるストレスから解放される',
            'AI時代において揺るがない「自分軸」を確立する',
            '自信を持って行動できるマインドセットを習得する'
        ],
        features: [
            '全4モジュール（動画20本、総時間約4時間）',
            'ワークシート10種付き（即活用可）',
            '修了証発行（LinkedIn / 履歴書に活用可）',
            '無期限アクセス（購入後いつでも閲覧可）',
            '質問票による個別フィードバック'
        ],
        requirements: [
            'PC / スマートフォン',
            'インターネット接続環境',
            'ノートとペン（ワークシート記入用）',
            '約30分/日の学習時間'
        ],
        instructor: {
            name: '本山 貴裕',
            title: 'AIコンサルタント / 自己決定の専門家',
            avatar: '/images/instructor.jpg',
            bio: 'AIと人間の協働を専門とし、自己決定の力を高めるメソッドを研究・実践中。ITエンジニアとしての経験と、自身のキャリア転換体験を活かし、誰にでも実践できる「自己決定プロトコル」を開発。'
        },
        faqs: [
            {
                question: 'このコースはプログラミングスキル不要ですか？',
                answer: 'はい、このコースはプログラミング知識を前提としません。マインドセットや思考法を学ぶ内容です。誰でも参加できます。'
            },
            {
                question: 'どれくらいの時間をかけて受講すべきですか？',
                answer: '1日あと30分〜1時間を4週間（計8〜28時間）かけて学ぶのがおすすめです。自分のペースで進めることができます。'
            },
            {
                question: '修了証は発行されますか？',
                answer: 'はい、コースを修了した方には修了証を発行します。LinkedInの認証証明や履歴書への記載に活用できます。'
            },
            {
                question: '質問はできますか？',
                answer: 'はい、受講期間中は無制限に質問を受け付けています。ワークシートへの記入内容に基づいた個別フィードバックも提供します。'
            }
        ],
        modules: [
            {
                id: 'm1',
                title: 'Module 1: 現状の可視化',
                orderIndex: 1,
                lessons: [
                    { id: 'l1-1', title: 'オリエンテーション', duration: 10, isFree: true, content: 'コースの進め方について解説します。自分の現在地を知り、4週間の旅のマップを確認しましょう。', description: 'コース全体像と学習の進め方を解説' },
                    { id: 'l1-2', title: 'なぜ「決められない」のか？', duration: 15, content: '決断疲れと心理的ブロックの正体。なぜ選択できないのか、その根本原因を探ります。', description: '決断疲れのメカニズムと心理的ブロックの解説' },
                    { id: 'l1-3', title: 'ワーク: 時間と感情のログ', duration: 20, content: '自分のリソースがどこに消えているかを知る。1週間の時間・感情ログを取るワークを実践します。', description: '時間と感情の可視化ワーク' },
                    { id: 'l1-4', title: '現状の言語化', duration: 15, content: '見つめた課題や悩みを言葉にする。自分の現在地を客観的に把握します。', description: '現状課題の言語化' }
                ]
            },
            {
                id: 'm2',
                title: 'Module 2: 価値観の採掘',
                orderIndex: 2,
                lessons: [
                    { id: 'l2-1', title: '他人のものさし vs 自分のものさし', duration: 18, content: '価値観を混同してしまうメカニズム。なぜ周りと同じことをしないといけないと思ってしまうのかを解説します。', description: '価値観の混同メカニズム' },
                    { id: 'l2-2', title: 'ワーク: 価値観キーワード', duration: 25, content: 'あなたにとって譲れないものを言葉にする。価値観を見つめるフレームワークを学びます。', description: '価値観キーワード抽出ワーク' },
                    { id: 'l2-3', title: '価値観の優先順位', duration: 20, content: '見つけた価値観の優先順位をつけます。どれが最も大切かを明確にします。', description: '価値観の優先順位付け' }
                ]
            },
            {
                id: 'm3',
                title: 'Module 3: 小さな決定の積み重ね',
                orderIndex: 3,
                lessons: [
                    { id: 'l3-1', title: '「迷わない決め」の技術', duration: 22, content: '迷いが生じた際に使える「決め方」のプロセスを学びます。意思決定のフレームワークを習得します。', description: '意思決定のプロセスとフレームワーク' },
                    { id: 'l3-2', title: 'ワーク: 1週間の小さな決定', duration: 15, content: '毎日1つ小さな決定をするワークを実践します。1週間の成果を振り返ります。', description: '1週間の小さな決定ワーク' },
                    { id: 'l3-3', title: '決定の記録と振り返り', duration: 18, content: '決めた内容とその結果を記録します。自分の決定パターンを客観的に把握します。', description: '決定の記録と振り返り' }
                ]
            },
            {
                id: 'm4',
                title: 'Module 4: 自分軸の確立',
                orderIndex: 4,
                lessons: [
                    { id: 'l4-1', title: '自分軸の定義', duration: 20, content: '自分軸とは何か、その重要性を学びます。自分だけの価値を定義します。', description: '自分軸の定義と重要性' },
                    { id: 'l4-2', title: '他人の期待への距離', duration: 18, content: '他者の期待に応えることのデメリットを理解し、健康的な距離感を学びます。', description: '他者の期待との距離感' },
                    { id: 'l4-3', title: '4週間の振り返りと次のステップ', duration: 25, content: 'このコースを通じて得られた成果を振り返ります。次のステップへ向けた行動計画を立てます。', description: '4週間の振り返りと今後の行動計画' }
                ]
            }
        ]
    },
    {
        id: 'c2',
        slug: 'ai-productivity-master',
        title: 'AI Productivity Master',
        subtitle: 'AIを「第2の脳」として使いこなし、生産性を劇的に向上させる',
        description: `ChatGPT、Claude、Perplexity。次々と現れるAIツールに振り回されていませんか？

ツールの使い方を覚えるだけでは不十分です。**「AIと協働する思考法」**を身につけることが必要です。

このコースでは、以下の内容を学びます：
- AIを「検索ツール」から「思考パートナー」へ昇格させるプロンプトエンジニアリング
- 自分のビジネスやキャリアに特化したカスタムAIエージェントの構築
- 生産性を10倍にする「AI x 人間」の最適なワークフローの設計

AIネイティブとして、最もパワフルな「第2の脳」を使いこなし、あなたのキャリアを加速させましょう。`,
        price: 49800,
        thumbnail: '/images/course-ai.jpg',
        level: 'Intermediate',
        levelLabel: '中級（実践）',
        totalDuration: 360, // 6時間
        targetAudience: [
            'ChatGPT / Claude などを既に使っている方',
            'ビジネスでAIを活用したい方',
            'フリーランス・副業で生産性を向上させたい方',
            'プロンプトエンジニアリングに興味がある方'
        ],
        learningGoals: [
            'AIを「検索ツール」から「思考パートナー」へ昇格させる',
            '自分のビジネスに特化したカスタムAIエージェントを構築する',
            '生産性を10倍にするワークフローを設計する'
        ],
        expectedOutcomes: [
            'ChatGPT / Claude のプロンプト力が3倍になる',
            '自分専用のAIエージェントを構築できる',
            '業務時間を50%削減できるワークフローを確立する',
            'AIを使いこなし、ビジネス成果を2倍にできる'
        ],
        features: [
            '全5モジュール（動画25本、総時間約6時間）',
            '実践的なプロンプトテンプレート50種以上',
            '自作AIエージェント構築ガイド',
            'Q&Aコミュニティ参加権（無期限）',
            '毎月のプロンプトライブラリアップデート'
        ],
        requirements: [
            'ChatGPT Plus / Claude Pro 等の有料アカウント（推奨）',
            'PC / スマートフォン',
            'インターネット接続環境',
            '基本的なビジネス英語（APIドキュメント読み取り用）'
        ],
        instructor: {
            name: '本山 貴裕',
            title: 'AIコンサルタント / プロンプトエンジニア',
            avatar: '/images/instructor.jpg',
            bio: 'AIツールの活用とプロンプトエンジニアリングを専門とし、ビジネスパーソンとして活動。OpenAI、AnthropicのAPIを活用した自作ツール開発の経験多数。AIを「道具」ではなく「協働者」として扱うマインドセットを伝授します。'
        },
        faqs: [
            {
                question: '有料のChatGPT / Claudeアカウントが必要ですか？',
                answer: '推奨はされていますが、必須ではありません。無料版でも基本的な内容を学べます。ただし、高度な機能（GPTs、Advanced Data Analysis等）を使用するためには有料アカウントが必要です。'
            },
            {
                question: 'プログラミング知識は必要ですか？',
                answer: 'このコースでは、基本的なPython知識（変数、関数、条件分岐程度）を必要とするレッスンがあります。ただし、大部分の内容はコピペで実践可能です。'
            },
            {
                question: 'Q&Aコミュニティとは何ですか？',
                answer: '受講者限定のオンラインコミュニティです。プロンプトの相談、実践の共有、最新のAI機能の情報交換ができます。無期限で参加可能です。'
            }
        ],
        modules: [
            {
                id: 'm1-ai',
                title: 'Chapter 1: AI思考のインストール',
                orderIndex: 1,
                lessons: [
                    { id: 'l-ai-1', title: '検索から対話へ', duration: 12, isFree: true, content: 'Google検索とAI対話の決定的な違い。AIに質問する際のマインドセットを学びます。', description: '検索と対話の違い、AI活用のマインドセット' },
                    { id: 'l-ai-2', title: 'プロンプトの基礎', duration: 18, content: '良いプロンプトの条件と構造を学びます。4つの基本原則を習得します。', description: 'プロンプトの基本原則と構造' },
                    { id: 'l-ai-3', title: 'ワーク: 目的の言語化', duration: 15, content: 'AIに問う前に目的を明確にするワークを実践します。', description: 'AI活用前の目的設定ワーク' }
                ]
            },
            {
                id: 'm2-ai',
                title: 'Chapter 2: 実践プロンプトエンジニアリング',
                orderIndex: 2,
                lessons: [
                    { id: 'l-ai-4', title: 'コンテキスト設計', duration: 20, content: 'プロンプトに与えるコンテキストの最適な書き方を学びます。役割、背景、制約条件の設定方法。', description: 'プロンプトのコンテキスト設計（役割、背景、制約）' },
                    { id: 'l-ai-5', title: 'チェーン・オブ・ソート（Chain of Thought）', duration: 22, content: 'AIに複雑なタスクをさせるための思考連鎖技法を学びます。', description: '複雑タスクをAIにさせるCoT技法' },
                    { id: 'l-ai-6', title: 'Few-shot / Zero-shot', duration: 18, content: '学習用例を与えるFew-shotプロンプトと、例なしでさせるZero-shotの違いと使い分けを学びます。', description: 'Few-shotとZero-shotの使い分け' }
                ]
            },
            {
                id: 'm3-ai',
                title: 'Chapter 3: カスタムAIエージェント構築',
                orderIndex: 3,
                lessons: [
                    { id: 'l-ai-7', title: 'AIエージェントの基礎', duration: 25, content: 'AIエージェントとは何か、その構造と種類を学びます。', description: 'AIエージェントの概念とアーキテクチャ' },
                    { id: 'l-ai-8', title: '自分専用エージェントの設計', duration: 30, content: '自分のビジネスに合わせたカスタムAIエージェントの設計プロセスを学びます。', description: 'ビジネス特化型AIエージェントの設計' },
                    { id: 'l-ai-9', title: '実装演習（プロトタイピング）', duration: 20, content: '設計したAIエージェントを実際に構築します。プロンプトのテストと改善を繰り返します。', description: 'AIエージェントの実装演習' }
                ]
            },
            {
                id: 'm4-ai',
                title: 'Chapter 4: 最適なワークフロー設計',
                orderIndex: 4,
                lessons: [
                    { id: 'l-ai-10', title: '現ワークフローの分析', duration: 15, content: '現在の業務フローを可視化し、AI活用の機会を特定します。', description: '現在の業務フローの分析とAI活用機会の特定' },
                    { id: 'l-ai-11', title: 'AI x 人間の最適分担', duration: 25, content: '人間とAIの最適な役割分担を設計します。人間にしかできないこと、AIにしかできないことを明確にします。', description: '人間とAIの最適な役割分担設計' },
                    { id: 'l-ai-12', title: 'ワーク: 新ワークフローの実践', duration: 30, content: '学んだ内容を統合した新しいワークフローを実際の業務で実践します。', description: '統合型AIワークフローの実践演習' }
                ]
            },
            {
                id: 'm5-ai',
                title: 'Chapter 5: 継続的な学習とアップデート',
                orderIndex: 5,
                lessons: [
                    { id: 'l-ai-13', title: '最新AI機能の追従', duration: 15, content: 'GPTs、DALL-E、Advanced Data Analysisなど最新機能の使い方を学びます。', description: 'GPTs、DALL-E、Advanced Data Analysis等の使い方' },
                    { id: 'l-ai-14', title: 'Q&Aコミュニティ活用', duration: 10, content: '受講者限定のQ&Aコミュニティを活用した学習方法を紹介します。', description: '受講者限定コミュニティの活用方法' },
                    { id: 'l-ai-15', title: 'プロンプトライブラリの活用', duration: 15, content: '毎月アップデートされるプロンプトライブラリを活用した学習方法を学びます。', description: 'プロンプトライブラリの活用ガイド' }
                ]
            }
        ]
    }
];

export function getCourses() {
    return courses;
}

export function getCourseBySlug(slug: string) {
    return courses.find(c => c.slug === slug);
}
