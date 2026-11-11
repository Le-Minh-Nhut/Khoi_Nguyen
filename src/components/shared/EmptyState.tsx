import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

/** Empty states invite an action; they do not apologise. */
export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-card border border-dashed border-divider-strong bg-surface/60 px-6 py-12 text-center',
        className,
      )}
      role="status"
    >
      {icon ? <div className="mb-3 flex justify-center text-ink-muted">{icon}</div> : null}
      <p className="font-serif text-lg font-semibold text-ink">{title}</p>
      {description ? <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-muted">{description}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
