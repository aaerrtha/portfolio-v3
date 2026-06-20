import Image from "next/image";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";
import { PlaceholderBlock } from "@/components/ui/PlaceholderBlock";

interface CaseImageProps {
  src?: string;
  alt?: string;
  caption?: string;
  aspect?: "video" | "square" | "wide";
}

export function CaseImage({
  src,
  alt = "Content image placeholder",
  caption,
  aspect = "wide",
}: CaseImageProps) {
  return (
    <figure className="my-8 w-full text-left">
      <PlaceholderBlock aspect={aspect} className="w-full" label={alt}>
        {src && (
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
          />
        )}
      </PlaceholderBlock>
      {caption && (
        <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
