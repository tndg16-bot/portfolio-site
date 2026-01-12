import { Testimonial } from '@/types/testimonials';

/**
 * Testimonials Data
 * Diverse backgrounds and realistic feedback
 */
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: '田中 美咲',
    position: 'ITエンジニア',
    company: 'ABC株式会社',
    avatar: {
      initials: '田',
    },
    rating: 5,
    content: '「何から始めればいいかわからない」状態から、具体的な行動計画ができました。コーチングセッションで自分の強みと弱みを言語化でき、AIツールとの組み合わせ方も分かりました。今では自信を持って副業を進められます。',
    date: '2025-12-15',
    tags: ['副業', 'AI活用'],
    featured: true,
    category: 'professional'
  },
  {
    id: 'testimonial-2',
    name: '佐藤 太郎',
    position: '開発部門マネージャー',
    company: 'XYZ株式会社',
    avatar: {
      initials: '佐',
    },
    rating: 5,
    content: '意思決定ワークショップが非常に参考になりました。「誰も決められない」チームから、「みんなで決める」文化へと変革できました。意思決定スピードが2倍になり、プロジェクト遅延も大幅に減少しました。',
    date: '2025-11-20',
    tags: ['リーダーシップ', '意思決定'],
    featured: true,
    category: 'professional'
  },
  {
    id: 'testimonial-3',
    name: '山本 誠',
    position: 'ITコンサルタント',
    avatar: {
      initials: '山',
    },
    rating: 5,
    content: '「他社の真似」という悪循環から抜け出せました。価値観の言語化ワークを通じて、自分の「羅針盤」が見えました。今では他人のノウハウに振り回されず、自分の判断で行動できています。',
    date: '2025-10-10',
    tags: ['自己決定', 'キャリア'],
    featured: true,
    category: 'entrepreneur'
  },
  {
    id: 'testimonial-4',
    name: '鈴木 花子',
    position: '学生',
    avatar: {
      initials: '鈴',
    },
    rating: 4,
    content: '就活で迷子になっていましたが、コーチングで自分の価値観を整理できました。「正解」を探すのではなく、「自分にとっての正解」を見つける方法を学びました。面接でも自分の言葉で話せるようになり、自信につながりました。',
    date: '2025-09-25',
    tags: ['就活', '自己理解'],
    featured: false,
    category: 'student'
  },
  {
    id: 'testimonial-5',
    name: '高橋 健太',
    position: 'フリーランスエンジニア',
    avatar: {
      initials: '高',
    },
    rating: 5,
    content: '「答えを知りたい」という欲求が強くて、常に外部情報を探していました。コーチングで「問いかけ」の力を学び、自分の内面から答えを見つける力がつきました。今ではGoogle検索の時間が減り、自分のアイデアを信じて行動できています。',
    date: '2025-08-15',
    tags: ['フリーランス', '自立思考'],
    featured: false,
    category: 'entrepreneur'
  },
  {
    id: 'testimonial-6',
    name: '伊藤 美緒',
    position: 'マーケティングマネージャー',
    company: 'DEF株式会社',
    avatar: {
      initials: '伊',
    },
    rating: 4,
    content: '「正解」を求め続けて、かえって迷子になっていました。コーチングで自分の判断軸を作り、チームマネジメントでも活用できています。部下からも「意思決定がスムーズになった」と好評です。',
    date: '2025-07-20',
    tags: ['リーダーシップ', 'チーム管理'],
    featured: false,
    category: 'professional'
  },
  {
    id: 'testimonial-7',
    name: '渡辺 光',
    position: '教師',
    avatar: {
      initials: '渡',
    },
    rating: 5,
    content: '生徒指導でも「正解」を教えることに集中していましたが、コーチングを通じて「問いかけ」の重要性を学びました。今では生徒に答えを教えるのではなく、自分で見つける力を育むようになり、授業の質が向上しました。',
    date: '2025-06-10',
    tags: ['教育', '指導法'],
    featured: false,
    category: 'teacher'
  },
  {
    id: 'testimonial-8',
    name: '中村 翔太',
    position: '学生',
    avatar: {
      initials: '中',
    },
    rating: 5,
    content: '将来への不安が強くて、行動できていませんでしたが、コーチングで「3ヶ月後の自分」を具体的にイメージできました。今では迷いよりも行動が優先になり、就活も前向きに進められています。',
    date: '2025-05-05',
    tags: ['就活', '将来設計'],
    featured: false,
    category: 'student'
  }
];

/**
 * Get all testimonials
 */
export function getTestimonials(): Testimonial[] {
  return testimonials;
}

/**
 * Get featured testimonials
 */
export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured);
}

/**
 * Get testimonials by category
 */
export function getTestimonialsByCategory(category: string): Testimonial[] {
  return testimonials.filter((t) => t.category === category);
}

/**
 * Search testimonials
 */
export function searchTestimonials(query: string): Testimonial[] {
  const lowerQuery = query.toLowerCase();
  return testimonials.filter((t) =>
    t.name.toLowerCase().includes(lowerQuery) ||
    t.content.toLowerCase().includes(lowerQuery) ||
    (t.tags && t.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
}
