import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  description: '特定商取引法に基づく表記',
};

export default function LegalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 pb-16 px-4">
      <div className="max-w-3xl w-full prose prose-zinc">
        <h1 className="text-3xl font-bold text-zinc-800 mb-8">特定商取引法に基づく表記</h1>

        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b border-zinc-200">
              <td className="py-4 pr-4 font-medium text-zinc-700 w-1/3">事業者名</td>
              <td className="py-4 text-zinc-600">本山 貴裕</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="py-4 pr-4 font-medium text-zinc-700">所在地</td>
              <td className="py-4 text-zinc-600">請求があった場合に遅滞なく開示いたします</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="py-4 pr-4 font-medium text-zinc-700">電話番号</td>
              <td className="py-4 text-zinc-600">請求があった場合に遅滞なく開示いたします</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="py-4 pr-4 font-medium text-zinc-700">メールアドレス</td>
              <td className="py-4 text-zinc-600">t.ndg16@gmail.com</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="py-4 pr-4 font-medium text-zinc-700">販売価格</td>
              <td className="py-4 text-zinc-600">各サービスページに記載の通り（税込表示）</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="py-4 pr-4 font-medium text-zinc-700">支払方法</td>
              <td className="py-4 text-zinc-600">銀行振込</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="py-4 pr-4 font-medium text-zinc-700">支払時期</td>
              <td className="py-4 text-zinc-600">サービス提供前にお支払いいただきます</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="py-4 pr-4 font-medium text-zinc-700">サービス提供時期</td>
              <td className="py-4 text-zinc-600">お申し込み確認後、日程調整の上で提供いたします</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="py-4 pr-4 font-medium text-zinc-700">キャンセル・返金</td>
              <td className="py-4 text-zinc-600">セッション24時間前までのキャンセルは全額返金いたします。それ以降のキャンセルは返金いたしかねます。</td>
            </tr>
            <tr className="border-b border-zinc-200">
              <td className="py-4 pr-4 font-medium text-zinc-700">動作環境</td>
              <td className="py-4 text-zinc-600">オンラインセッション: Zoomが動作するPC・スマートフォン、安定したインターネット接続</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
