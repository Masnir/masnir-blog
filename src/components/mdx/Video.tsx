/**
 * Privacy-friendly video embed. Supports YouTube (via youtube-nocookie),
 * Vimeo, or a direct MP4 file. CSP in netlify.toml allows only these frame
 * sources. Usage: <Video youtube="VIDEO_ID" title="..." /> or <Video src="/x.mp4" />
 */
export function Video({
  youtube,
  vimeo,
  src,
  title = 'Embedded video',
  caption,
}: {
  youtube?: string;
  vimeo?: string;
  src?: string;
  title?: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black">
        {youtube && (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtube}`}
            title={title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {vimeo && (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://player.vimeo.com/video/${vimeo}`}
            title={title}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
        {src && (
          <video className="absolute inset-0 h-full w-full" controls preload="metadata">
            <source src={src} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
