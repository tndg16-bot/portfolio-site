import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/r4/metadata';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';

export const metadata: Metadata = buildMetadata({
  title: 'プライバシーポリシー',
  description: '本山貴裕（個人事業）のプライバシーポリシー。改正個人情報保護法 2022・外国第三者提供・PCI DSS 準拠・Consent Mode v2 対応。',
  path: '/legal/privacy',
  ogCategory: 'legal',
});

export default function PrivacyPage() {
  return (
    <>
      <HeaderR4 />
      <main className="bg-wagashi-cream">
        <article className="mx-auto max-w-wagashi-card px-w-3 py-w-7 prose prose-wagashi">
          <h1 className="font-serif text-3xl text-wagashi-aizumi tracking-heading">プライバシーポリシー</h1>
          <p>
            本山貴裕（以下「当事業者」）は、当サイト（wagashi.dev および kata-works.com）における個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
          </p>

          <h2 className="font-serif text-xl text-wagashi-indigo">1. 個人情報の定義</h2>
          <p>
            本ポリシーにおいて「個人情報」とは、個人情報の保護に関する法律第2条第1項に定義される情報（氏名、メールアドレス、電話番号、企業名、所属など、特定の個人を識別できる情報）を指します。
          </p>

          <h2 className="font-serif text-xl text-wagashi-indigo">2. 取得する個人情報</h2>
          <ul>
            <li>お問い合わせフォーム：氏名、メールアドレス、企業名（任意）、お問い合わせ内容、IP アドレス（Cloudflare Turnstile によるスパム検証用）</li>
            <li>無料相談予約（TimeRex 経由）：氏名、メールアドレス、相談希望テーマ</li>
            <li>アクセスログ：IP アドレス、ブラウザ種別、参照元 URL、閲覧ページ、滞在時間（Cookie / Google Analytics 4 経由）</li>
            <li>クレジットカード決済（Stripe）：カード情報は Stripe が直接取得・保持し、当事業者のサーバーには一切保存されません（PCI DSS Level 1 準拠 / SAQ-A 相当）</li>
          </ul>

          <h2 className="font-serif text-xl text-wagashi-indigo">3. 個人情報の利用目的</h2>
          <ol>
            <li>お問い合わせ・無料相談予約への対応</li>
            <li>サービス提供に必要な連絡・情報提供</li>
            <li>当事業者が提供するサービスに関する情報のご案内（ご本人の同意があった場合のみ）</li>
            <li>アクセス解析によるサイト改善・ユーザビリティ向上</li>
            <li>法令に基づく対応</li>
          </ol>

          <h2 className="font-serif text-xl text-wagashi-indigo">4. 第三者提供</h2>
          <p>当事業者は、法令に基づく場合等を除き、ご本人の同意なく個人情報を第三者に提供することはありません。</p>

          <h2 className="font-serif text-xl text-wagashi-indigo">5. 業務委託先・利用ツール</h2>
          <ul>
            <li>Vercel Inc.（米国）/ Web サイトホスティング</li>
            <li>Cloudflare, Inc.（米国）/ DNS・セキュリティ・Email Routing</li>
            <li>Google LLC（米国）/ Google Analytics 4</li>
            <li>Resend Inc.（米国）/ メール送信</li>
            <li>株式会社サイカ（TimeRex）/ 予約管理</li>
            <li>Sentry, Inc.（米国）/ エラー監視（個人情報を含まないようマスキング処理を適用）</li>
            <li>Stripe Payments Japan株式会社 / Stripe, Inc.（米国）/ クレジットカード決済代行</li>
          </ul>

          <h3 className="font-serif text-base text-wagashi-aizumi">5.1 外国にある第三者への提供（改正個情法 第28条 対応）</h3>
          <p>
            上記委託先のうち、Vercel・Cloudflare・Resend・Sentry・Google・Stripe は外国にある第三者に該当します（所在国：米国）。米国の個人情報保護制度の概要および当該事業者が講じる措置については、各社プライバシーポリシーをご確認ください。当事業者は、これらの委託先が個人情報保護法に相当する基準に適合する体制を継続的に講じていることを確認のうえ、個人データを移転しています。
          </p>

          <h3 className="font-serif text-base text-wagashi-aizumi">5.2 Stripe による決済情報の取扱い</h3>
          <p>
            カード番号・有効期限・セキュリティコード等のカード情報は、Stripe が直接取得・保持し、当事業者のサーバーには一切保存されません（PCI DSS Level 1 準拠）。当事業者は決済結果と取引メタデータのみを参照します。
          </p>

          <h3 className="font-serif text-base text-wagashi-aizumi">5.3 Cloudflare Turnstile について</h3>
          <p>
            当サイトのお問い合わせフォームではスパム防止のため Cloudflare Turnstile を使用しています。Turnstile は IP アドレスを取得しますが、個人を特定する情報とは結合しません。
          </p>

          <h2 className="font-serif text-xl text-wagashi-indigo">6. Cookie の利用</h2>
          <h3 className="font-serif text-base text-wagashi-aizumi">6.1 利用している Cookie</h3>
          <ul>
            <li>必須 Cookie：サイト機能維持のため（同意不要）</li>
            <li>解析 Cookie：Google Analytics 4 によるアクセス解析（Cookie 同意バナーで「了解しました」を選択された場合に限り計測開始）。Cookie ID は個人関連情報として扱い、Google LLC に提供されます。Google 側で個人データと結合されることが想定されるため、提供にあたり利用者の同意を取得します。</li>
            <li>広告 Cookie：当サイトでは使用していません</li>
          </ul>
          <h3 className="font-serif text-base text-wagashi-aizumi">6.2 Google Consent Mode v2 について</h3>
          <p>
            同意を選択されなかった場合でも、Google Consent Mode v2 によるプライバシー保護モードで限定的な計測情報（個人を識別しない統計情報のみ）が送信される場合があります。完全停止を希望される場合は、Google 提供のオプトアウトアドオンをご利用ください：https://tools.google.com/dlpage/gaoptout
          </p>

          <h2 className="font-serif text-xl text-wagashi-indigo">7. 個人情報の安全管理</h2>
          <ul>
            <li>HTTPS（HSTS 強制）による通信暗号化</li>
            <li>アクセスログの監視</li>
            <li>不要となった個人情報の削除</li>
          </ul>

          <h2 className="font-serif text-xl text-wagashi-indigo">8. 漏えい等が発生した場合の対応（改正個情法 第26条 対応）</h2>
          <p>
            当事業者は、個人情報の漏えい、滅失、毀損その他の安全確保に係る事態であって、個人の権利利益を害するおそれが大きいものが発生した場合、個人情報保護委員会への報告および本人への通知を、法令の定めに従い速やかに実施します。具体的には：速報（当該事態を知った日から概ね 3〜5 日以内）／確報（当該事態を知った日から 30 日以内）／本人通知（個人の権利利益を害するおそれが大きい事態の場合、本人へ速やかに通知）。
          </p>

          <h2 className="font-serif text-xl text-wagashi-indigo">9. 個人情報の開示・訂正・利用停止等の請求</h2>
          <ul>
            <li>請求方法：本ポリシー末尾の連絡先まで、件名「個人情報請求」を明記の上、メールにてご連絡ください</li>
            <li>本人確認：請求受付時に、運転免許証・マイナンバーカード等の写しの送付をお願いする場合があります</li>
            <li>対応期間：請求受領後、30 日以内を目安に対応いたします</li>
            <li>手数料：無料</li>
            <li>電磁的方法による開示：ご希望に応じて PDF 等での開示にも対応します</li>
          </ul>

          <h2 className="font-serif text-xl text-wagashi-indigo">10. お問い合わせ窓口</h2>
          <ul>
            <li>事業者名：本山貴裕（個人事業）</li>
            <li>メール：hello@kata-works.com（法人窓口）／ contact@wagashi.dev（一般）</li>
            <li>受付時間：平日 10:00-19:00</li>
          </ul>

          <h2 className="font-serif text-xl text-wagashi-indigo">11. 改定</h2>
          <p>本ポリシーは、法令の改正・サービスの変更等に応じて改定する場合があります。改定後の内容は本ページに掲載した時点から効力を生じます。</p>

          <p className="text-sm text-wagashi-tanboku">
            制定日：2026-07-01（予定）／最終改定日：2026-07-01（r4 反映）
          </p>
        </article>
      </main>
      <FooterR4 />
    </>
  );
}
