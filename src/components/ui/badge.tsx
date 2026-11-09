import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'neutral' | 'accent' | 'highlight' | 'success' | 'error';

const tones: Record<Tone, string> = {
  neutral: 'border-divider-strong bg-canvas text-ink-muted',
  accent: 'border-accent/25 bg-accent-soft text-accent-strong',
  highlight: 'border-highlight/70 bg-highlight-soft text-[#7a5518]',
  success: 'border-success/25 bg-success-soft text-success',
  error: 'border-error/25 bg-error-soft text-error',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium leading-5',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
