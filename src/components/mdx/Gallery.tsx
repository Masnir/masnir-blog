import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Responsive image gallery grid. Usage:
 * <Gallery images={[{ src, alt, caption }, ...]} columns={3} />
 */
export function Gallery({ images, columns = 2 }: { images: GalleryImage[]; columns?: 2 | 3 }) {
  const cols = columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';
  return (
    <div className={`my-8 grid grid-cols-1 gap-4 ${cols}`}>
      {images.map((img) => (
        <figure key={img.src} className="m-0">
          <div className="overflow-hidden rounded-lg border border-border">
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, 400px"
              className="h-full w-full object-cover"
            />
          </div>
          {img.caption && (
            <figcaption className="mt-2 text-center text-xs text-muted">{img.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
