import type { ComponentProps } from "react";
import { getHeadingText, slugifyHeading } from "@/lib/headings";
import { Paragraph } from "./Paragraph";
import { ImageGrid } from "./ImageGrid";
import { CaseImage } from "./CaseImage";
import { SummaryHighlight } from "./SummaryHighlight";

function Heading2({ children, ...props }: ComponentProps<"h2">) {
  const id = slugifyHeading(getHeadingText(children));

  return (
    <h2
      {...props}
      id={id}
      className="mb-4 mt-10 w-full scroll-mt-28 text-left font-serif text-xl font-semibold text-foreground md:scroll-mt-10"
    >
      {children}
    </h2>
  );
}

function Heading3(props: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className="mb-3 mt-8 w-full text-left font-serif text-lg font-semibold text-foreground"
    />
  );
}

function UnorderedList(props: ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className="mb-5 w-full list-disc space-y-2 pl-5 text-left text-base leading-relaxed text-foreground"
    />
  );
}

function OrderedList(props: ComponentProps<"ol">) {
  return (
    <ol
      {...props}
      className="mb-5 w-full list-decimal space-y-2 pl-5 text-left text-base leading-relaxed text-foreground"
    />
  );
}

function ListItem(props: ComponentProps<"li">) {
  return <li {...props} className="text-left" />;
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
