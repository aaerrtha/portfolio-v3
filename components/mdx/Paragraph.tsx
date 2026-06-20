import type { ComponentProps } from "react";

export function Paragraph({ children, ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className="mb-5 max-w-3xl text-left text-base leading-relaxed text-foreground"
    >
      {children}
    </p>
  );
}
