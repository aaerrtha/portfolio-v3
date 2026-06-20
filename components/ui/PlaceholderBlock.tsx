import type { ReactNode } from "react";
import { PLACEHOLDER_BG_CLASS } from "@/lib/image";

interface PlaceholderBlockProps {
  aspect?: "video" | "square" | "wide";
  className?: string;
  children?: ReactNode;
  label?: string;
}

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

export function PlaceholderBlock({
  aspect = "wide",
  className = "",
  children,
  label = "Image placeholder",
}: PlaceholderBlockProps) {
  return (
    <div
      role={children ? undefined : "img"}
      aria-label={children ? undefined : label}
      className={`overflow-hidden rounded-2xl ${PLACEHOLDER_BG_CLASS} ${aspectClasses[aspect]} ${className}`}
    >
      {children}
    </div>
  );
}
