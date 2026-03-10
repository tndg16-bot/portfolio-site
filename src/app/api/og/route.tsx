import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : '本山貴裕 Portfolio';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F5F1E8',
            color: '#1B365D',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Decorative Elements - Gold accent gradients */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-10%',
              right: '-10%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(27, 54, 93, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Top accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #C5A059, #1B365D, #C5A059)',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px 80px',
              zIndex: 10,
              border: '1px solid rgba(197, 160, 89, 0.3)',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              boxShadow: '0 20px 50px -12px rgba(27, 54, 93, 0.1)',
              maxWidth: '90%',
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 900,
                marginBottom: 24,
                color: '#1B365D',
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#1B365D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F5F1E8',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                M
              </div>
              <div
                style={{
                  fontSize: 26,
                  color: '#C5A059',
                  fontWeight: 600,
                }}
              >
                本山貴裕 | Portfolio
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.log(message);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
