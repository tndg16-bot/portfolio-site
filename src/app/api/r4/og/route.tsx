import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const CATEGORY_LABEL: Record<string, string> = {
  default: 'wagashi.dev',
  service: 'サービス',
  case: '実績',
  note: 'note',
  about: 'About',
  legal: 'Legal',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || '本山貴裕 | AI研修・推進支援';
  const category = searchParams.get('category') || 'default';
  const label = CATEGORY_LABEL[category] || 'wagashi.dev';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #F0E8D6 0%, #F0E8D6 60%, #E6B422 60%, #E6B422 100%)',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 28, color: '#165E83', fontWeight: 700, marginBottom: 40 }}>{label}</div>
        <div
          style={{
            fontSize: 64,
            color: '#0C3A52',
            fontWeight: 700,
            lineHeight: 1.4,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#165E83',
            fontSize: 24,
          }}
        >
          <div>本山貴裕</div>
          <div style={{ fontSize: 20, opacity: 0.7 }}>wagashi.dev</div>
        </div>
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          style={{ position: 'absolute', bottom: 40, right: 40, opacity: 0.18 }}
        >
          <circle cx="120" cy="120" r="100" stroke="#165E83" strokeWidth="20" fill="none" />
          <circle cx="120" cy="120" r="70" stroke="#165E83" strokeWidth="15" fill="none" />
          <circle cx="120" cy="120" r="40" stroke="#165E83" strokeWidth="10" fill="none" />
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=604800, immutable',
      },
    }
  );
}
