import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/r4/metadata';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';

export const metadata: Metadata = buildMetadata({
  title: '特定商取引法に基づく表記',
  description: '本山貴裕（個人事業）の特定商取引法に基づく表記。販売事業者・所在地・連絡先・料金・支払方法・段階的キャンセル規定。',
  path: '/legal/tokushoho',
  ogCategory: 'legal',
});

const ROWS: [string, string][] = [
  ['販売事業者', '本山貴裕（個人事業）'],
  ['運営責任者', '本山貴裕'],
  ['所在地', '〒XXX-XXXX [レゾナンス契約後の住所]（本山さん P0-1 完了後に置換）'],
  ['電話番号', '[050-XXXX-XXXX]（レゾナンス電話番号貸しオプション or 050 番号）／受付：平日 10:00-19:00／※請求があり次第、遅滞なく開示します'],
  ['メールアドレス', 'hello@kata-works.com（法人窓口）／お問い合わせは /contact フォームよりお願いします'],
  ['ウェブサイト', 'https://wagashi.dev（メイン）／ https://kata-works.com（法人窓口）'],
  ['商品・サービス', 'AI 研修・AI 推進支援・AI 開発（小規模 GPTs/Bot 限定）・コーチング・伴走コンサルティング'],
  ['販売価格', '各サービスページに税込価格を表示。法人向けは Tier 別レンジ表示、別途見積もり'],
  ['表示価格以外の料金', '必要に応じて通信費・交通費（対面開催時）は実費'],
  ['支払方法', '銀行振込（前払い）／クレジットカード（Stripe・現在準備中）'],
  [
    'クレジットカード決済（Stripe）詳細',
    '利用可能ブランド：Visa / Mastercard / JCB / American Express / Diners／決済タイミング：申込確認後の即時与信・売上確定／カード明細名義：「WAGASHI*MOTOYAMA」（Stripe 登録時に確定）／分割払い不可・一括のみ／継続課金（サブスクリプション）型サービスは現在提供しておりません（提供開始時は別途明記）',
  ],
  ['支払時期', '前払い：請求書発行から 7 日以内（特に指定が無い場合）'],
  ['役務の提供時期', '入金確認後 3 営業日以内にスケジュール調整'],
  [
    '返金・キャンセル規定',
    '提供開始日の 14 日前まで：全額返金／13 日前〜7 日前：50% 返金（準備費用相当）／6 日前〜前日：30% 返金／当日無断キャンセル・提供開始後：返金不可／※法人契約は別途個別契約書で規定',
  ],
  ['動作環境', '各サービスページに明記（Google Meet / Slack 等）'],
  ['個人情報の取扱い', 'ご本人の個人情報はプライバシーポリシーに基づき厳格に保護します'],
  ['免責事項', '本サービスの利用により得られる成果は個人差があり、特定の結果を保証するものではありません'],
];

export default function TokushohoPage() {
  return (
    <>
      <HeaderR4 />
      <main className="bg-wagashi-cream">
        <article className="mx-auto max-w-wagashi-card px-w-3 py-w-7">
          <h1 className="font-serif text-3xl text-wagashi-aizumi tracking-heading">特定商取引法に基づく表記</h1>
          <p className="mt-w-2 text-sm text-wagashi-tanboku">
            本書は 2025 年改正特商法・2022 年改正個人情報保護法を踏まえた内容です。
          </p>
          <table className="mt-w-5 w-full border-collapse text-sm">
            <tbody>
              {ROWS.map(([k, v]) => (
                <tr key={k} className="border-b border-wagashi-tanboku/20">
                  <th scope="row" className="w-1/3 py-w-2 pr-w-3 text-left font-serif text-wagashi-aizumi align-top">
                    {k}
                  </th>
                  <td className="py-w-2 text-wagashi-tanboku align-top whitespace-pre-line">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-w-5 text-xs text-wagashi-tanboku">最終更新：[公開日 YYYY-MM-DD]（公開直前に当日日付に更新）</p>
        </article>
      </main>
      <FooterR4 />
    </>
  );
}
