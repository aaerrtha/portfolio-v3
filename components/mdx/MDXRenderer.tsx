import { compileMDXContent } from "@/lib/mdx";

interface MDXRendererProps {
  source: string;
}

export async function MDXRenderer({ source }: MDXRendererProps) {
  const content = await compileMDXContent(source);

  return <div className="prose-custom mt-10 text-center [&_*]:text-center">{content}</div>;
}
