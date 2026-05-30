/** 青海波（せいがいは）— 主モチーフ・opacity 4-8% */
export function Seigaiha({
  size = 240,
  color = '#165E83',
  opacity = 0.06,
  ariaHidden = true,
  className,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  ariaHidden?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={className}
    >
      <defs>
        <pattern id="seigaiha" x="0" y="0" width="72" height="36" patternUnits="userSpaceOnUse">
          <circle cx="36" cy="36" r="36" fill="none" stroke={color} strokeWidth="0.5" opacity={opacity * 4} />
          <circle cx="0" cy="36" r="36" fill="none" stroke={color} strokeWidth="0.5" opacity={opacity * 4} />
          <circle cx="72" cy="36" r="36" fill="none" stroke={color} strokeWidth="0.5" opacity={opacity * 4} />
          <circle cx="36" cy="36" r="24" fill="none" stroke={color} strokeWidth="0.5" opacity={opacity * 6} />
          <circle cx="0" cy="36" r="24" fill="none" stroke={color} strokeWidth="0.5" opacity={opacity * 6} />
          <circle cx="72" cy="36" r="24" fill="none" stroke={color} strokeWidth="0.5" opacity={opacity * 6} />
          <circle cx="36" cy="36" r="12" fill="none" stroke={color} strokeWidth="0.5" opacity={opacity * 8} />
          <circle cx="0" cy="36" r="12" fill="none" stroke={color} strokeWidth="0.5" opacity={opacity * 8} />
          <circle cx="72" cy="36" r="12" fill="none" stroke={color} strokeWidth="0.5" opacity={opacity * 8} />
        </pattern>
      </defs>
      <rect width="240" height="240" fill="url(#seigaiha)" />
    </svg>
  );
}
