import type { CSSProperties, HTMLAttributes } from "react";

interface MaterialIconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number;
  filled?: boolean;
}

export function MaterialIcon({
  name,
  size = 24,
  filled = false,
  className = "",
  style,
  ...props
}: MaterialIconProps) {
  const opsz = Math.min(Math.max(size, 20), 48);

  return (
    <span
      {...props}
      aria-hidden={props["aria-hidden"] ?? true}
      className={`material-symbols-rounded inline-block leading-none ${className}`}
      style={
        {
          fontSize: size,
          fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${opsz}`,
          ...style,
        } satisfies CSSProperties
      }
    >
      {name}
    </span>
  );
}
