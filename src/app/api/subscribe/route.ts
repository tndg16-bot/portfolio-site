import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 簡単なバリデーション
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: '有効なメールアドレスが必要です。' },
        { status: 400 }
      );
    }

    // TODO: ここで実際のメール配信サービス（Resend, ConvertKitなど）と連携する
    // 例: await resend.emails.send({ ... })

    // 処理の遅延をシミュレート（UX確認用）
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 成功レスポンス
    return NextResponse.json(
      { message: '購読登録を受け付けました。' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscribe Error:', error);
    return NextResponse.json(
      { message: 'サーバーエラーが発生しました。' },
      { status: 500 }
    );
  }
}
