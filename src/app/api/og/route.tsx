import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : '本山貴大 Portfolio';

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
            backgroundColor: '#030712', // gray-950
            color: 'white',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Decorative Elements */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
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
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
              filter: 'blur(40px)',
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
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.5)',
              maxWidth: '90%',
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                marginBottom: 24,
                color: '#fff',
                lineHeight: 1.1,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
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
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                M
              </div>
              <div
                style={{
                  fontSize: 28,
                  color: '#cbd5e1', // slate-300
                  fontWeight: 500,
                }}
              >
                本山貴大 | Portfolio
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
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
