import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/r4/metadata';
import { HeaderR4 } from '@/components/r4/nav/HeaderR4';
import { FooterR4 } from '@/components/r4/nav/FooterR4';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: '利用規約',
  description: '本山貴裕（個人事業）の利用規約。消費者契約法・民法 548-4・反社条項・著作権法 32 条準拠の r4 版。',
  path: '/legal/terms',
  ogCategory: 'legal',
});

export default function TermsPage() {
  return (
    <>
      <HeaderR4 />
      <main className="bg-wagashi-cream">
        <article className="mx-auto max-w-wagashi-card px-w-3 py-w-7 prose prose-wagashi">
          <h1 className="font-serif text-3xl text-wagashi-aizumi tracking-heading">利用規約</h1>

          <p>
            本利用規約（以下「本規約」）は、本山貴裕（以下「当事業者」）が運営するウェブサイト wagashi.dev および kata-works.com（総称して「当サイト」）、ならびに当事業者が提供するサービス（以下「本サービス」）の利用条件を定めるものです。
          </p>

          <h2 className="font-serif text-xl text-wagashi-indigo">第1条（適用）</h2>
          <ol>
            <li>本規約は、本サービスの利用に関する一切の関係に適用されます。</li>
            <li>利用者は、本サービスを利用することにより、本規約の全条項に同意したものとみなします。</li>
          </ol>

          <h2 className="font-serif text-xl text-wagashi-indigo">第2条（サービス内容）</h2>
          <p>本サービスは、AI 研修・AI 推進支援・AI 開発（小規模 GPTs/Bot 限定）・コーチング・伴走コンサルティング等を含みます。</p>

          <h2 className="font-serif text-xl text-wagashi-indigo">第3条（利用料金）</h2>
          <ol>
            <li>各サービスの料金は、サイト内サービスページに表示します。</li>
            <li>料金は税込価格で表示し、別途通信費・交通費等の実費が発生する場合があります。</li>
            <li>段階的キャンセル規定（特商法表記参照）：提供開始日 14 日前まで全額返金、13 日〜7 日前 50% 返金、6 日前〜前日 30% 返金、当日・提供開始後 返金不可。</li>
          </ol>

          <h2 className="font-serif text-xl text-wagashi-indigo">第4条（知的財産権）</h2>
          <ol>
            <li>当サイトに掲載されているコンテンツの著作権は、当事業者または正当な権利者に帰属します。</li>
            <li>利用者は、私的利用の範囲を超えて無断で複製・転載・配布することはできません。</li>
            <li>著作権法第 32 条に定める引用の要件を満たす場合は、出典の明示（サイト URL）を条件にこれを認めます。当該要件を超えて利用される場合は、事前に当事業者の許諾を得てください。</li>
          </ol>

          <h2 className="font-serif text-xl text-wagashi-indigo">第5条（禁止事項）</h2>
          <ol>
            <li>法令または公序良俗に違反する行為</li>
            <li>当事業者または第三者の権利を侵害する行為</li>
            <li>当事業者の業務を妨害する行為</li>
            <li>本サービスを利用して不当な利益を得る行為</li>
            <li>虚偽の情報を入力する行為</li>
            <li>不正アクセス、リバースエンジニアリング、その他システムに過度の負荷をかける行為</li>
            <li>第三者になりすまして本サービスを利用する行為</li>
            <li>前各号に準ずる行為であって、当事業者が合理的な根拠に基づき不適切と判断する行為</li>
          </ol>

          <h2 className="font-serif text-xl text-wagashi-indigo">第6条（免責事項）</h2>
          <ol>
            <li>当サイトの情報は、執筆時点で正確を期しておりますが、その完全性・正確性・有用性を保証するものではありません。</li>
            <li>当事業者は、本サービスの利用により生じた利用者または第三者の損害について、当事業者の責に帰すべき事由による場合を除き、責任を負いません。ただし、当事業者の故意または重大な過失による場合はこの限りではありません。当事業者の軽過失に起因する損害については、損害賠償の範囲は当該役務に対応する代金額を上限とします。</li>
            <li>本サービスの利用により得られる成果は、利用者の状況・取組み度合いにより異なります。当事業者は特定の結果を保証するものではありません。</li>
          </ol>

          <h2 className="font-serif text-xl text-wagashi-indigo">第7条（サービスの変更・中断・終了）</h2>
          <ol>
            <li>当事業者は、天災・通信障害・法令変更・運営継続が著しく困難な事由など合理的な理由がある場合、事前通知の上、本サービスの内容を変更・中断・終了することができます。やむを得ない場合は事後通知に代えることができます。</li>
            <li>当事業者は、本サービスの変更・中断・終了により生じた損害について、当事業者の責に帰すべき事由による場合を除き、責任を負いません。</li>
          </ol>

          <h2 className="font-serif text-xl text-wagashi-indigo">第8条（規約の変更・民法 548-4 対応）</h2>
          <ol>
            <li>当事業者は、(1) 本規約の変更が利用者の一般の利益に適合する場合、または (2) 本規約の変更が契約目的に反せず、かつ変更の必要性・変更内容の相当性・変更内容その他の事情に照らして合理的なものである場合に限り、本規約を変更することができます。</li>
            <li>規約改定の場合、改定の 30 日前までに本サイトにて告知します。</li>
            <li>告知期間内にサービスの利用を継続した場合、改定後の規約に同意したものとみなします。</li>
            <li>改定後の規約は、告知後 30 日目から効力を生じます。</li>
          </ol>

          <h2 className="font-serif text-xl text-wagashi-indigo">第9条（準拠法・裁判管轄）</h2>
          <ol>
            <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
            <li>本サービスに関して紛争が生じた場合、まずは誠意をもって協議の上、解決を図るものとします。</li>
            <li>協議が調わない場合、当事業者の所在地を管轄する地方裁判所または簡易裁判所を第一審の裁判所とします（消費者契約法に基づき、消費者である利用者の利益が不当に害される場合は適用されません）。</li>
            <li>消費者である利用者と当事業者との間の紛争については、民事訴訟法第 3 条の 4 の規定に従い、消費者の住所地を管轄する地方裁判所または簡易裁判所においても提起することができます。</li>
          </ol>

          <h2 className="font-serif text-xl text-wagashi-indigo">第10条（反社会的勢力の排除）</h2>
          <ol>
            <li>利用者は、自らが暴力団、暴力団員、暴力団準構成員、暴力団関係企業、総会屋等、社会運動標榜ゴロまたは特殊知能暴力集団等、その他これに準ずる者（以下「反社会的勢力」）に該当しないこと、および反社会的勢力と関係を有しないことを表明し、保証します。</li>
            <li>当事業者は、利用者が前項に違反した場合、何らの催告なく本サービスの提供を停止し、または契約を解除することができます。</li>
          </ol>

          <h2 className="font-serif text-xl text-wagashi-indigo">第11条（有料サービスの個別契約）</h2>
          <ol>
            <li>本規約とは別に、有料の AI 研修・コンサルティング・伴走プログラム等を提供する場合、別途「業務委託契約書」または「サービス利用契約書」を取り交わすことがあります。</li>
            <li>個別契約と本規約の内容に齟齬がある場合、個別契約が優先されます。</li>
          </ol>

          <h2 className="font-serif text-xl text-wagashi-indigo">第12条（個人情報の取扱い）</h2>
          <p>
            個人情報の取扱いについては、別途{' '}
            <Link href="/legal/privacy" className="text-wagashi-ginshu underline-offset-2 hover:underline">
              プライバシーポリシー
            </Link>{' '}
            に従います。
          </p>

          <h2 className="font-serif text-xl text-wagashi-indigo">第13条（お問い合わせ）</h2>
          <ul>
            <li>事業者名：本山貴裕（個人事業）</li>
            <li>メール：hello@kata-works.com（法人窓口）／ contact@wagashi.dev（一般）</li>
          </ul>

          <p className="text-sm text-wagashi-tanboku">制定日：2026-07-01（予定）／最終改定日：2026-07-01（r4 反映）</p>
        </article>
      </main>
      <FooterR4 />
    </>
  );
}
