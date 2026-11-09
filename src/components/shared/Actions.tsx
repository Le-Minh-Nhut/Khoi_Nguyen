import { Bookmark, Check, Copy } from 'lucide-react';
import { useBookmark, useCopy, useI18n } from '@/hooks/useApp';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

type BookmarkKind = 'glossary' | 'phrases' | 'lessons' | 'scenarios';

interface BookmarkButtonProps {
  kind: BookmarkKind;
  id: string;
  withLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function BookmarkButton({ kind, id, withLabel = false, size = 'md', className }: BookmarkButtonProps) {
  const t = useI18n();
  const { saved, toggle } = useBookmark(kind, id);
  const label = saved ? t('action.saved') : t('action.save');

  const button = (
    <Button
      variant={saved ? 'secondary' : 'ghost'}
      size={withLabel ? (size === 'sm' ? 'sm' : 'md') : size === 'sm' ? 'iconSm' : 'icon'}
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? `${t('action.unsave')}: ${id}` : `${t('action.save')}: ${id}`}
      className={cn(saved && 'border-accent/40 text-accent-strong', className)}
    >
      <Bookmark className="size-4" fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
      {withLabel ? <span>{label}</span> : null}
    </Button>
  );

  return withLabel ? button : <Tooltip label={label}>{button}</Tooltip>;
}

interface CopyButtonProps {
  text: string;
  label?: string;
  withLabel?: boolean;
  size?: 'sm' | 'md';
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export function CopyButton({
  text,
  label,
  withLabel = true,
  size = 'md',
  variant = 'secondary',
  className,
}: CopyButtonProps) {
  const t = useI18n();
  const [status, copy] = useCopy();
  const copied = status === 'copied';
  const failed = status === 'error';
  const base = label ?? t('action.copy');

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => void copy(text)}
      className={cn(copied && 'border-success/40 text-success', failed && 'border-error/40 text-error', className)}
      aria-live="polite"
    >
      {copied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      {withLabel ? (
        <span>{failed ? t('action.copyFailed') : copied ? t('action.copied') : base}</span>
      ) : (
        <span className="sr-only">{failed ? t('action.copyFailed') : copied ? t('action.copied') : base}</span>
      )}
    </Button>
  );
}
