export type Lesson = {
    id: string;
    title: string;
    duration: number; // minutes
    isFree?: boolean;
    videoUrl?: string; // Mock URL
    content?: string; // Markdown content
};

export type Module = {
    id: string;
    title: string;
    lessons: Lesson[];
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
    modules: Module[];
    features: string[];
};

export const courses: Course[] = [
    {
        id: 'c1',
        slug: 'life-design-basic',
        title: 'Life Design Basic: 自己決定の基礎',
        subtitle: '迷いから抜け出し、自分で決める力を取り戻す4週間の旅',
        description: '「何がしたいかわからない」「周りの目が気になる」そんな悩みを持つ人のための基礎講座。価値観の言語化から始め、小さな自己決定を積み重ねるマインドセットを習得します。',
        price: 29800,
        thumbnail: '/images/course-basic.jpg', // Placeholder
        level: 'Beginner',
        features: [
            '全4モジュール（動画20本）',
            'ワークシート付き',
            '修了証発行',
            '無期限アクセス'
        ],
        modules: [
            {
                id: 'm1',
                title: 'Module 1: 現状の可視化',
                lessons: [
                    { id: 'l1-1', title: 'オリエンテーション', duration: 10, isFree: true, content: 'コースの進め方について解説します。' },
                    { id: 'l1-2', title: 'なぜ「決められない」のか？', duration: 15, content: '決断疲れと心理的ブロックの正体。' },
                    { id: 'l1-3', title: 'ワーク: 時間と感情のログ', duration: 20, content: '自分のリソースがどこに消えているかを知る。' }
                ]
            },
            {
                id: 'm2',
                title: 'Module 2: 価値観の採掘',
                lessons: [
                    { id: 'l2-1', title: '他人のものさし vs 自分のものさし', duration: 18, content: '価値観を混同してしまうメカニズム。' },
                    { id: 'l2-2', title: 'ワーク: 価値観キーワード', duration: 25, content: 'あなたにとって譲れないものを言葉にする。' }
                ]
            }
        ]
    },
    {
        id: 'c2',
        slug: 'ai-productivity-master',
        title: 'AI Productivity Master',
        subtitle: 'AIを「第2の脳」として使いこなし、生産性を劇的に向上させる',
        description: 'ChatGPT、Claude、Perplexity。次々と現れるAIツールに振り回されていませんか？ツールの使い方ではなく、「AIと協働する思考法」を学びます。',
        price: 49800,
        thumbnail: '/images/course-ai.jpg', // Placeholder
        level: 'Intermediate',
        features: [
            '実践プロンプト集',
            '毎月アップデート',
            'Q&Aコミュニティ参加権'
        ],
        modules: [
            {
                id: 'm1-ai',
                title: 'Chapter 1: AI思考のインストール',
                lessons: [
                    { id: 'l-ai-1', title: '検索から対話へ', duration: 12, isFree: true, content: 'Google検索とAI対話の決定的な違い。' }
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
