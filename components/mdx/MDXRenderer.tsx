import { compileMDXContent } from "@/lib/mdx";

interface MDXRendererProps {
  source: string;
}

export async function MDXRenderer({ source }: MDXRendererProps) {
  const content = await compileMDXContent(source);

  return (
    <article className="prose-custom mt-10 max-w-3xl text-left [&_*]:text-left">
      {content}
    </article>
  );
}
