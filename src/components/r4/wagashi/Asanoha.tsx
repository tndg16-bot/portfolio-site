/** 麻の葉（あさのは）— 成長・継続のメタファ・/services 背景透かし opacity 3% */
export function Asanoha({
  size = 240,
  color = '#E6B422',
  opacity = 0.04,
  className,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <pattern id="asanoha" x="0" y="0" width="60" height="104" patternUnits="userSpaceOnUse">
          <g stroke={color} strokeWidth="0.5" fill="none" opacity={opacity * 25}>
            <path d="M30 0 L60 52 L30 104 L0 52 Z" />
            <path d="M30 0 L30 104 M0 52 L60 52" />
            <path d="M30 0 L0 52 M30 0 L60 52" />
            <path d="M30 104 L0 52 M30 104 L60 52" />
          </g>
        </pattern>
      </defs>
      <rect width="240" height="240" fill="url(#asanoha)" />
    </svg>
  );
}
