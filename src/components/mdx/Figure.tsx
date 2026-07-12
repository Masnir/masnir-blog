import Image from 'next/image';

/**
 * Image with caption + required alt text. Uses next/image for optimization,
 * responsive sizes, and lazy loading. Usage:
 * <Figure src="/uploads/x.png" alt="..." caption="..." width={1200} height={630} />
 */
export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-border">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 768px"
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
