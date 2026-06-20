import Image from "next/image";
import type { LabScreenshot } from "@/lib/types";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";
import { PlaceholderBlock } from "@/components/ui/PlaceholderBlock";

interface LabScreenshotGalleryProps {
  title: string;
  screenshots?: LabScreenshot[];
}

const PLACEHOLDER_COUNT = 6;

export function LabScreenshotGallery({
  title,
  screenshots = [],
}: LabScreenshotGalleryProps) {
  const items: LabScreenshot[] =
    screenshots.length > 0
      ? screenshots
      : Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => ({
          alt: `${title} screenshot ${index + 1}`,
        }));

  return (
    <div className="-mx-3 mb-10 flex gap-4 overflow-x-auto px-3 pb-2 scrollbar-hide md:mx-0 md:px-0">
      {items.map((screenshot, index) => (
        <div
          key={screenshot.src ?? `placeholder-${index}`}
          className="w-[min(78vw,22rem)] shrink-0 sm:w-[22rem] lg:w-[24rem]"
        >
          <PlaceholderBlock
            aspect="video"
            className="h-full rounded-2xl"
            label={screenshot.alt ?? `${title} screenshot`}
          >
            {screenshot.src && (
              <Image
                src={screenshot.src}
                alt={screenshot.alt ?? `${title} screenshot ${index + 1}`}
                width={960}
                height={600}
                className="h-full w-full object-cover"
                placeholder="blur"
                blurDataURL={IMAGE_BLUR_DATA_URL}
              />
            )}
          </PlaceholderBlock>
        </div>
      ))}
    </div>
  );
}
