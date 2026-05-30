/** 卍崩し（まんじくずし）— 継続案件のメタファ・章番号バッジ用 */
export function ManjiBadge({
  number,
  size = 80,
  color = '#165E83',
}: {
  number: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="72"
        height="72"
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
      <path
        d="M14 4 L14 14 L4 14 M66 4 L66 14 L76 14 M14 76 L14 66 L4 66 M66 76 L66 66 L76 66"
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
      <text
        x="40"
        y="48"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="22"
        fill={color}
        fontWeight="600"
      >
        {number}
      </text>
    </svg>
  );
}
