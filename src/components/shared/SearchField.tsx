import { Search, X } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
  autoFocus?: boolean;
}

/** Search input with a clear affordance; label is always programmatic. */
export function SearchField({ value, onChange, placeholder, label, className, autoFocus }: SearchFieldProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted/70"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        autoFocus={autoFocus}
        autoComplete="off"
        className={cn(
          'h-10 w-full rounded-lg border border-divider-strong bg-surface pl-9 pr-9 text-[14px] text-ink',
          'placeholder:text-ink-muted/70 transition-colors hover:border-accent/40',
          'focus-visible:border-accent focus-visible:outline-none',
          '[&::-webkit-search-cancel-button]:hidden',
        )}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Xóa tìm kiếm"
          className="absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-content-center rounded text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
