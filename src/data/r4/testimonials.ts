/**
 * r4 Testimonials (プレースホルダ・本山さん許諾取得後に差し替え)
 */
export interface TestimonialR4 {
  id: string;
  industry: string;
  audience: 'business' | 'individual';
  quote: string;
  attribution: string;
  serviceSlug?: string;
  yearMonth: string;
  status: 'placeholder' | 'confirmed';
}

export const testimonialsR4: TestimonialR4[] = [
  {
    id: 'placeholder-1',
    industry: '通信業界・利用部門責任者',
    audience: 'business',
    quote: '[本山さん許諾取得後に差し替え予定] 研修後の現場フォロー設計が特に効きました。資料作成時間が確実に短縮され、社内の AI 活用ムードが定着しました。',
    attribution: '【業界】通信大手・利用部門責任者',
    serviceSlug: 'automation-consulting',
    yearMonth: '2025-12',
    status: 'placeholder',
  },
  {
    id: 'placeholder-2',
    industry: '個人事業者（コーチング業）',
    audience: 'individual',
    quote: '[本山さん許諾取得後に差し替え予定] 営業目線で「次にやるべき1歩」を一緒に決めてもらえる時間は本当に貴重でした。3ヶ月で初受注に到達。',
    attribution: 'M 様（個人事業 3 年目）',
    serviceSlug: 'compass-program',
    yearMonth: '2025-11',
    status: 'placeholder',
  },
  {
    id: 'placeholder-3',
    industry: '化学メーカー・AI 推進室',
    audience: 'business',
    quote: '[本山さん許諾取得後に差し替え予定] 数値追いかけだけではなく、推進室と事業部の間の議論の論点を整える伴走者の価値を実感しました。',
    attribution: '【業界】化学メーカー・AI 推進室マネージャー',
    serviceSlug: 'ai-poc-codrive',
    yearMonth: '2025-09',
    status: 'placeholder',
  },
];
