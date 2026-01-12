import { FAQ } from '@/types/services';

/**
 * FAQs Data
 * Common questions organized by category
 */
export const faqs: FAQ[] = [
  {
    question: 'コーチング経験がなくても大丈夫ですか？',
    answer: 'はい。むしろ「初めての方」が多いです。構えず、お話しいただくだけで大丈夫です。問いかけを通じて自然と言葉が出てきます。',
    category: 'general'
  },
  {
    question: 'どのような準備が必要ですか？',
    answer: '特別な準備は不要です。静かで落ち着ける環境と、安定したインターネット接続があれば大丈夫です。事前に「今モヤモヤしていること」をメモしておくとスムーズです。',
    category: 'preparation'
  },
  {
    question: 'セッションはどのように進めますか？',
    answer: '1) 事前ヒアリング：簡単なフォームで現状をお伺い（約5分）\n2) セッション本番：60〜90分の対話を通じて内面を整理\n3) アクションプラン：セッション後、具体的な次のステップを言語化\n4) フォローアップ：必要に応じてアフターフォローアップ',
    category: 'process'
  },
  {
    question: '料金はいくらですか？',
    answer: '現在、審査制にてご案内しております。詳細は個別にお伝えいたします。初回のみ特別価格をご用意しています。3ヶ月間の羅針盤プログラムは、パッケージ価格にてご提供いたします。',
    category: 'pricing'
  },
  {
    question: 'キャンセルや日程変更はできますか？',
    answer: 'セッション24時間前までであれば、日程変更を承っております。お気軽にご連絡ください。ただし、3ヶ月間の羅針盤プログラムの場合、別途キャンセル規定が適用されます。',
    category: 'policy'
  },
  {
    question: '1回で効果はありますか？',
    answer: '1回でも「思考の整理」効果を実感される方が多いです。ただし、深い変化を求める場合は、3ヶ月間の羅針盤プログラムをおすすめしています。継続的なサポートでより確実に変化を実現できます。',
    category: 'effectiveness'
  },
  {
    question: '秘密は守られますか？',
    answer: 'はい。お話しいただいた内容は一切外部に漏らしません。コーチングの守秘義務は厳格に遵守いたします。',
    category: 'privacy'
  },
  {
    question: 'どのようなツールを使いますか？',
    answer: 'セッションはZoomで行います。必要に応じて、AIツール（ChatGPT、Claudeなど）の活用方法もご紹介します。また、セッション後の振り返りにはNotionなどのツールも活用できます。',
    category: 'tools'
  },
  {
    question: '対面とオンラインはどちらですか？',
    answer: '基本はZoomを活用したオンラインセッションです。対面をご希望の場合は、別途ご相談ください（東京周辺に限ります）。',
    category: 'process'
  },
  {
    question: 'セッション後にどのようなフォローアップがありますか？',
    answer: 'セッション後、アクションプランを共有いたします。また、3ヶ月間の羅針盤プログラムでは、毎週の週次レポートとチャットサポートが含まれます。必要に応じて追加セッションも可能です。',
    category: 'process'
  },
  {
    question: 'AIをどのように活用しますか？',
    answer: 'セッション中にAIツールを使って思考を整理することもありますが、主に「AI活用の方法」を学びます。自分のニーズに合ったツール選定や、効率的な使い方をサポートします。ツールの使い方を教えるだけでなく、活用のマインドセットも一緒に作ります。',
    category: 'tools'
  },
  {
    question: 'どのような方に特におすすめですか？',
    answer: '「正解」を探すのではなく、「自分の判断軸」を作りたい方に特におすすめです。ノウハウ依存から脱却したい方、キャリアの岐路に立っている方、自己理解を深めたい方に最適です。',
    category: 'general'
  }
];

/**
 * Get all FAQs
 */
export function getAllFAQs(): FAQ[] {
  return faqs;
}

/**
 * Get FAQs by category
 */
export function getFAQsByCategory(category?: string): FAQ[] {
  if (!category) return faqs;
  return faqs.filter((faq) => faq.category === category);
}

/**
 * Search FAQs
 */
export function searchFAQs(query: string): FAQ[] {
  const lowerQuery = query.toLowerCase();
  return faqs.filter((faq) =>
    faq.question.toLowerCase().includes(lowerQuery) ||
    faq.answer.toLowerCase().includes(lowerQuery)
  );
}
