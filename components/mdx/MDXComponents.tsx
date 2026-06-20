import type { ComponentProps, ReactNode } from "react";
import { slugify } from "@/lib/sections";
import { Paragraph } from "./Paragraph";
import { ImageGrid } from "./ImageGrid";
import { CaseImage } from "./CaseImage";
import { SummaryHighlight } from "./SummaryHighlight";

function getHeadingText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getHeadingText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return getHeadingText((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function Heading2(props: ComponentProps<"h2">) {
  const id = slugify(getHeadingText(props.children));

  return (
    <h2
      {...props}
      id={id}
      className="mb-4 mt-10 scroll-mt-28 text-center font-serif text-xl font-semibold text-foreground"
    />
  );
}

function Heading3(props: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className="mb-3 mt-8 text-center font-serif text-lg font-semibold text-foreground"
    />
  );
}

function UnorderedList(props: ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className="mx-auto mb-5 max-w-2xl list-inside list-disc space-y-2 text-center text-base leading-relaxed text-foreground"
    />
  );
}

function OrderedList(props: ComponentProps<"ol">) {
  return (
    <ol
      {...props}
      className="mx-auto mb-5 max-w-2xl list-inside list-decimal space-y-2 text-center text-base leading-relaxed text-foreground"
    />
  );
}

function ListItem(props: ComponentProps<"li">) {
  return <li {...props} className="text-center" />;
}

function Strong(props: ComponentProps<"strong">) {
  return <strong {...props} className="font-semibold text-foreground" />;
}

export const mdxComponents = {
  p: Paragraph,
  h2: Heading2,
  h3: Heading3,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  strong: Strong,
  ImageGrid,
  CaseImage,
  SummaryHighlight,
};
