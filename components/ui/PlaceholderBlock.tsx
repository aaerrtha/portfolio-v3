import type { ReactNode } from "react";

interface PlaceholderBlockProps {
  aspect?: "video" | "square" | "wide" | "feed";
  className?: string;
  children?: ReactNode;
  label?: string;
}

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[16/9]",
  feed: "aspect-[16/8]",
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
      className={`placeholder-stripe overflow-hidden rounded-lg ${aspectClasses[aspect]} ${className}`}
    >
      {children}
    </div>
  );
}
