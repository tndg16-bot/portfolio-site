import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  description: '特定商取引法に基づく表記。事業者情報、支払方法、キャンセルポリシー等',
};

export default function LegalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 pb-16 px-4">
      <div className="max-w-3xl w-full prose prose-zinc">
        <h1 className="text-3xl font-bold text-text-primary mb-8">特定商取引法に基づく表記</h1>

        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary w-1/3">事業者名</td>
              <td className="py-4 text-text-primary">本山 貴裕</td>
            </tr>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary">所在地</td>
              <td className="py-4 text-text-primary">請求があった場合、メールにて遅滞なく開示いたします</td>
            </tr>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary">電話番号</td>
              <td className="py-4 text-text-primary">請求があった場合、メールにて遅滞なく開示いたします</td>
            </tr>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary">メールアドレス</td>
              <td className="py-4 text-text-primary">t.ndg16@gmail.com</td>
            </tr>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary">販売価格</td>
              <td className="py-4 text-text-primary">各サービスページに記載の通り（税込表示）</td>
            </tr>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary">商品以外の必要料金</td>
              <td className="py-4 text-text-primary">インターネット接続料金、通信料等はお客様のご負担となります</td>
            </tr>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary">支払方法</td>
              <td className="py-4 text-text-primary">銀行振込</td>
            </tr>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary">支払時期</td>
              <td className="py-4 text-text-primary">お申し込み確認後、請求書発行から7日以内にお支払いいただきます</td>
            </tr>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary">サービス提供時期</td>
              <td className="py-4 text-text-primary">お申し込み確認後、日程調整の上で提供いたします</td>
            </tr>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary">キャンセル・返金</td>
              <td className="py-4 text-text-primary">セッション24時間前までのキャンセルは全額返金いたします。それ以降のキャンセルは返金いたしかねます。事業者都合による中止の場合は全額返金いたします。</td>
            </tr>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary">クーリングオフ</td>
              <td className="py-4 text-text-primary">通信販売のため、クーリングオフ制度は適用されません</td>
            </tr>
            <tr className="border-b border-border-default">
              <td className="py-4 pr-4 font-medium text-text-secondary">動作環境</td>
              <td className="py-4 text-text-primary">オンラインセッション: Google Meetが動作するPC・スマートフォン、安定したインターネット接続</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
