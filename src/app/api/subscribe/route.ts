import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resendクライアントの初期化（環境変数から取得）
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // メールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { message: '有効なメールアドレスを入力してください。' },
        { status: 400 }
      );
    }

    // Resend APIキーが設定されている場合、ウェルカムメールを送信
    if (resend) {
      try {
        // 購読者へウェルカムメールを送信
        await resend.emails.send({
          from: 'newsletter@takahiro-motoyama.vercel.app', // Resendで認証済みドメインに変更必要
          to: email,
          subject: '【本山貴大】ニュースレターへのご登録ありがとうございます',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">ご登録ありがとうございます！</h1>
              <p>本山貴大のニュースレターにご登録いただき、ありがとうございます。</p>
              <p>これから以下のような情報をお届けします：</p>
              <ul>
                <li>新着記事のお知らせ</li>
                <li>セッション・イベント情報</li>
                <li>限定コンテンツ</li>
              </ul>
              <p>今後ともよろしくお願いいたします。</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #666; font-size: 12px;">
                このメールは ${email} 宛に送信されています。<br />
                配信停止をご希望の場合は、このメールに返信してください。
              </p>
            </div>
          `,
        });

        // 管理者への通知（オプション）
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail) {
          await resend.emails.send({
            from: 'newsletter@takahiro-motoyama.vercel.app',
            to: adminEmail,
            subject: '【通知】新規ニュースレター登録',
            html: `<p>新規登録: ${email}</p>`,
          });
        }
      } catch (emailError) {
        console.error('Resend Email Error:', emailError);
        // メール送信に失敗しても、登録自体は成功とする
      }
    } else {
      // 開発環境やAPIキー未設定の場合はログに記録
      console.log('Newsletter subscription (no Resend configured):', email);
    }

    return NextResponse.json(
      { message: 'ニュースレターに登録しました！最新情報をお届けします。' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscribe Error:', error);
    return NextResponse.json(
      { message: 'エラーが発生しました。もう一度お試しください。' },
      { status: 500 }
    );
  }
}
