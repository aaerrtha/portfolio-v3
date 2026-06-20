import type { ComponentProps } from "react";
import { Paragraph } from "./Paragraph";
import { ImageGrid } from "./ImageGrid";
import { CaseImage } from "./CaseImage";
import { SummaryHighlight } from "./SummaryHighlight";

function Heading2(props: ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      className="mb-4 mt-10 max-w-3xl text-left font-serif text-xl font-semibold text-foreground"
    />
  );
}

function Heading3(props: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className="mb-3 mt-8 max-w-3xl text-left font-serif text-lg font-semibold text-foreground"
    />
  );
}

function UnorderedList(props: ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className="mb-5 max-w-3xl list-disc space-y-2 pl-5 text-left text-base leading-relaxed text-foreground"
    />
  );
}

function OrderedList(props: ComponentProps<"ol">) {
  return (
    <ol
      {...props}
      className="mb-5 max-w-3xl list-decimal space-y-2 pl-5 text-left text-base leading-relaxed text-foreground"
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
