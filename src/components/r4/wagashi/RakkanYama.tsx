/** 落款印「山」— 各ページ Footer 直上・クリックで /about へ */
import Link from 'next/link';

export function RakkanYama({
  size = 32,
  href = '/about',
  label = '本山貴裕のプロフィールへ',
}: {
  size?: number;
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-block transition-transform duration-wagashi-hover hover:rotate-[-2deg]"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="rakkan-title"
      >
        <title id="rakkan-title">{label}</title>
        <rect x="2" y="2" width="28" height="28" fill="#C25A3C" rx="1" />
        {/* 山 篆書体っぽい線画（白抜き） */}
        <g fill="#F8F3E6">
          <rect x="14" y="6" width="4" height="20" />
          <rect x="6" y="12" width="4" height="14" />
          <rect x="22" y="12" width="4" height="14" />
          <rect x="4" y="24" width="24" height="2" />
        </g>
      </svg>
    </Link>
  );
}
