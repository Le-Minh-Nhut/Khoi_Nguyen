import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Bookmark, X } from 'lucide-react';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { mobileNav } from '@/app/navigation';
import { useBookmarks, useSettings } from '@/app/SettingsProvider';
import { useI18n, useScrollLock } from '@/hooks/useApp';
import { cn } from '@/lib/cn';

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: () => void;
}

/**
 * Radix Dialog gives focus trap, Escape handling, and aria wiring.
 * Rendered as a left drawer; body scroll locked while open.
 */
export function MobileNav({ open, onOpenChange, onSearch }: MobileNavProps) {
  const t = useI18n();
  const location = useLocation();
  const { uiLang, toggleUiLang } = useSettings();
  const { count } = useBookmarks();
  useScrollLock(open);

  useEffect(() => onOpenChange(false), [location.pathname, onOpenChange]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 animate-fade bg-ink/40 backdrop-blur-[1px] lg:hidden" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            'fixed inset-y-0 left-0 z-50 flex w-[min(21rem,88vw)] animate-dialog flex-col',
            'border-r border-divider bg-surface shadow-overlay lg:hidden',
          )}
        >
          <div className="flex items-center justify-between border-b border-divider px-5 py-4">
            <DialogPrimitive.Title className="font-serif text-lg font-semibold tracking-tight text-ink">
              EduLingo.
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              className="rounded-md p-2 text-ink-muted transition-colors hover:bg-accent-soft hover:text-ink"
              aria-label={t('nav.closeMenu')}
            >
              <X className="size-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <div className="border-b border-divider px-5 py-3">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onSearch();
              }}
              className="flex w-full items-center justify-between rounded-lg border border-divider bg-canvas px-3 py-2.5 text-sm text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
            >
              {t('nav.search')}
              <kbd className="rounded border border-divider bg-surface px-1.5 py-0.5 font-sans text-[10px]">⌘K</kbd>
            </button>
          </div>

          <nav aria-label={t('nav.menu')} className="flex-1 overflow-y-auto px-3 py-3 scrollbar-slim">
            <ul>
              {mobileNav.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex min-h-11 items-center justify-between rounded-lg px-3 text-[15px] transition-colors',
                        isActive
                          ? 'bg-accent-soft font-medium text-accent-strong'
                          : 'text-ink hover:bg-canvas',
                      )
                    }
                    aria-current={location.pathname === link.to ? 'page' : undefined}
                  >
                    {t(link.labelKey)}
                    {link.to === '/saved' && count > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-accent/25 bg-accent-soft px-1.5 py-0.5 text-[11px] font-medium text-accent-strong">
                        <Bookmark className="size-3" aria-hidden="true" />
                        {count}
                      </span>
                    ) : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-divider px-5 py-4">
            <button
              type="button"
              onClick={toggleUiLang}
              className="flex min-h-11 w-full items-center justify-between rounded-lg border border-divider px-3 text-sm text-ink transition-colors hover:bg-canvas"
            >
              <span className="text-ink-muted">{t('lang.switch')}</span>
              <span className="font-medium text-accent-strong">{uiLang === 'vi' ? 'VI / EN' : 'EN / VI'}</span>
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
