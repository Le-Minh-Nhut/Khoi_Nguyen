import * as React from 'react';
import { cn } from '@/lib/cn';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'h-10 w-full rounded-lg border border-divider-strong bg-surface px-3 text-[15px] text-ink placeholder:text-ink-muted/70',
        'transition-colors hover:border-accent/40 focus-visible:border-accent focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:bg-canvas disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, rows = 4, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={cn(
      'w-full resize-y rounded-lg border border-divider-strong bg-surface px-3 py-2 text-[15px] leading-relaxed text-ink placeholder:text-ink-muted/70',
      'transition-colors hover:border-accent/40 focus-visible:border-accent focus-visible:outline-none',
      className,
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';
