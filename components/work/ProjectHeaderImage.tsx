import Image from "next/image";
import type { ProjectFrontmatter } from "@/lib/types";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";
import { PlaceholderBlock } from "@/components/ui/PlaceholderBlock";

interface ProjectHeaderImageProps {
  project: ProjectFrontmatter;
}

export function ProjectHeaderImage({ project }: ProjectHeaderImageProps) {
  const alt = project.headerAlt ?? project.coverAlt ?? project.title;

  return (
    <PlaceholderBlock
      aspect="wide"
      className="mx-auto mb-10 w-full"
      label={alt}
    >
      {(project.headerImage ?? project.coverImage) && (
        <Image
          src={project.headerImage ?? project.coverImage!}
          alt={alt}
          width={1200}
          height={675}
          className="h-full w-full object-cover"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
          priority
        />
      )}
    </PlaceholderBlock>
  );
}
