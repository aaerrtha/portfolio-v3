import Image from "next/image";

interface CaseImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function CaseImage({ src, alt, caption }: CaseImageProps) {
  return (
    <figure className="text-left">
      <div className="overflow-hidden rounded-2xl bg-[#D0E7FF]">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0QwRTdGRiIvPjwvc3ZnPg=="
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
