import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { MDXRenderer } from "@/components/mdx/MDXRenderer";
import { LabDetailHeader } from "@/components/labs/LabDetailHeader";
import { LabDetailTags } from "@/components/labs/LabDetailTags";
import { LabScreenshotGallery } from "@/components/labs/LabScreenshotGallery";
import { splitLabContent } from "@/lib/lab-content";
import { getAllLabs, getLabBySlug } from "@/lib/labs";

interface LabDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLabs().map((lab) => ({
    slug: lab.slug,
  }));
}

export async function generateMetadata({ params }: LabDetailPageProps) {
  const { slug } = await params;
  const lab = getLabBySlug(slug);

  if (!lab) {
    return { title: "Not Found" };
  }

  return {
    title: lab.title,
    description: lab.summary ?? lab.description,
  };
}

export default async function LabDetailPage({ params }: LabDetailPageProps) {
  const { slug } = await params;
  const lab = getLabBySlug(slug);

  if (!lab) {
    notFound();
  }

  const { intro, body } = splitLabContent(lab.content);
  const summary = lab.summary ?? (intro || lab.description);

  return (
    <article className="w-full text-left">
      <Link
        href="/labs"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="h-[18px] w-[18px]" aria-hidden="true" />
        Labs
      </Link>

      <LabScreenshotGallery title={lab.title} screenshots={lab.screenshots} />

      <LabDetailHeader experiment={lab} />

      <p className="max-w-3xl text-base leading-relaxed text-muted">{summary}</p>

      <LabDetailTags experiment={lab} />

      {body && (
        <section aria-label="Additional details" className="mt-10 max-w-3xl">
          <MDXRenderer source={body} />
        </section>
      )}
    </article>
  );
}
