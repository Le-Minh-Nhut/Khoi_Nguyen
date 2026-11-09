import { Search } from 'lucide-react';
import { forwardRef } from 'react';
import { useI18n } from '@/hooks/useApp';
import { cn } from '@/lib/cn';

interface SearchTriggerProps {
  onClick: () => void;
  variant?: 'header' | 'block';
  className?: string;
}

/** Opens the global command palette. Rendered as a button, not a fake input. */
export const SearchTrigger = forwardRef<HTMLButtonElement, SearchTriggerProps>(function SearchTrigger(
  { onClick, variant = 'header', className },
  ref,
) {
  const t = useI18n();

  if (variant === 'block') {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          'group flex w-full items-center gap-3 rounded-lg border border-divider-strong bg-surface px-3.5 py-3 text-left transition-colors hover:border-accent/50',
          className,
        )}
      >
        <Search className="size-4 shrink-0 text-ink-muted" aria-hidden="true" />
        <span className="flex-1 truncate text-[15px] text-ink-muted">{t('search.placeholder')}</span>
        <kbd className="hidden shrink-0 rounded border border-divider bg-canvas px-1.5 py-0.5 font-sans text-[11px] font-medium text-ink-muted sm:block">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-lg border border-divider bg-canvas px-2.5 text-[13px] text-ink-muted transition-colors hover:border-accent/40 hover:bg-surface hover:text-ink',
        className,
      )}
      aria-label={`${t('nav.search')} (⌘K)`}
    >
      <Search className="size-4" aria-hidden="true" />
      <span className="hidden xl:inline">{t('nav.search')}</span>
      <kbd className="hidden rounded border border-divider bg-surface px-1 font-sans text-[10px] font-medium sm:inline">
        ⌘K
      </kbd>
    </button>
  );
});
