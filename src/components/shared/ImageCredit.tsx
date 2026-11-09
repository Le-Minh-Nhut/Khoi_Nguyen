import { creditFor } from '@/content/imageCredits';
import { cn } from '@/lib/cn';
import { imagePath } from '@/lib/imagePath';

interface ImageCreditProps {
  /** File name inside public/images, e.g. "cat-exchange.webp". */
  file: string;
  /** "overlay" sits on a dark photo edge; "inline" sits below it on paper. */
  variant?: 'overlay' | 'inline';
  className?: string;
}

/**
 * Attribution line required by CC BY / CC BY-SA. Intentionally quiet: it is
 * legally necessary, not decorative.
 */
export function ImageCredit({ file, variant = 'inline', className }: ImageCreditProps) {
  const credit = creditFor(file);
  if (!credit) return null;

  const text = `${credit.license} · ${credit.author}`;

  if (variant === 'overlay') {
    return (
      <a
        href={credit.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'pointer-events-auto inline-block rounded bg-ink/70 px-1.5 py-0.5 text-[10px] leading-tight text-white/90 backdrop-blur-sm transition-colors hover:text-white',
          className,
        )}
        title={credit.title}
      >
        {text}
      </a>
    );
  }

  return (
    <p className={cn('text-[11px] leading-tight text-ink-muted', className)}>
      <a
        href={credit.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-2 transition-colors hover:text-accent-strong hover:underline"
        title={credit.title}
      >
        {text}
      </a>
    </p>
  );
}

/** Cropped photo used inside category and scenario tiles. */
export function TileImage({
  file,
  alt,
  className,
  sizes,
  width = 900,
  height = 562,
}: {
  file: string;
  alt: string;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
}) {
  return (
    <img
      src={imagePath(file)}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      sizes={sizes}
      className={cn('size-full object-cover', className)}
    />
  );
}
