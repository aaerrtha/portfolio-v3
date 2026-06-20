import type { ComponentProps } from "react";

export function Paragraph({ children, ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className="mx-auto mb-5 max-w-2xl text-center text-base leading-relaxed text-foreground"
    >
      {children}
    </p>
  );
}
