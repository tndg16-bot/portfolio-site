/** 亀甲（きっこう）— 信頼・堅牢のメタファ・/about できることカード用 */
export function Kikko({
  size = 240,
  color = '#5B5651',
  opacity = 0.05,
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
        <pattern id="kikko" x="0" y="0" width="48" height="56" patternUnits="userSpaceOnUse">
          <polygon
            points="24,4 44,16 44,40 24,52 4,40 4,16"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity={opacity * 20}
          />
        </pattern>
      </defs>
      <rect width="240" height="240" fill="url(#kikko)" />
    </svg>
  );
}
