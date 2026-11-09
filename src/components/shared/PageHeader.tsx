import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/badge';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

/** Shared masthead for index pages. Editorial: hairline, no card. */
export function PageHeader({ eyebrow, title, lede, meta, actions, className }: PageHeaderProps) {
  return (
    <header className={cn('border-b border-divider pb-8', className)}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-h1 font-serif font-semibold text-ink">{title}</h1>
          {lede ? <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ink-muted md:text-base">{lede}</p> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      {meta ? <div className="mt-5 flex flex-wrap items-center gap-2">{meta}</div> : null}
    </header>
  );
}

export function SectionHeading({
  title,
  description,
  action,
  id,
  level = 2,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  id?: string;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="max-w-2xl">
        <Heading id={id} className={level === 2 ? 'text-h2' : 'text-h3'}>
          {title}
        </Heading>
        {description ? <p className="mt-1.5 text-sm text-ink-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 rounded-md border border-divider bg-surface px-2.5 py-1 text-[13px] text-ink-muted">
      <strong className="font-serif text-[15px] font-semibold text-ink">{value}</strong>
      {label}
    </span>
  );
}

export function MetaBadges({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <Badge key={item} tone="neutral">
          {item}
        </Badge>
      ))}
    </>
  );
}
