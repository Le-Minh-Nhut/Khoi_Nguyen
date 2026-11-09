import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { useI18n } from '@/hooks/useApp';
import { navGroups, directLinks } from '@/app/navigation';

export function DesktopNav() {
  const t = useI18n();
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  // Close on outside click, route change, and Escape.
  useEffect(() => {
    if (!openGroup) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpenGroup(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenGroup(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openGroup]);

  useEffect(() => setOpenGroup(null), [location.pathname]);

  const isGroupActive = (links: { to: string }[]) =>
    links.some((link) => location.pathname === link.to || location.pathname.startsWith(`${link.to}/`));

  return (
    <div ref={containerRef} className="hidden items-center gap-1 lg:flex">
      {navGroups.map((group) => {
        const panelId = `${baseId}-${group.labelKey}`;
        const open = openGroup === group.labelKey;
        return (
          <div
            key={group.labelKey}
            className="relative"
            onMouseEnter={() => setOpenGroup(group.labelKey)}
            onMouseLeave={() => setOpenGroup((current) => (current === group.labelKey ? null : current))}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenGroup(open ? null : group.labelKey)}
              className={cn(
                'inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-[14px] font-medium transition-colors',
                isGroupActive(group.links)
                  ? 'text-accent-strong'
                  : 'text-ink-muted hover:bg-accent-soft hover:text-ink',
              )}
            >
              {t(group.labelKey)}
              <ChevronDown
                className={cn('size-3.5 transition-transform', open && 'rotate-180')}
                aria-hidden="true"
              />
            </button>
            {open ? (
              <div
                id={panelId}
                className="absolute left-0 top-full z-40 min-w-[15rem] pt-1.5"
              >
                <ul className="animate-fade rounded-xl border border-divider bg-surface p-1.5 shadow-raise">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          cn(
                            'block rounded-lg px-3 py-2 text-[14px] transition-colors',
                            isActive
                              ? 'bg-accent-soft font-medium text-accent-strong'
                              : 'text-ink hover:bg-canvas',
                          )
                        }
                      >
                        {t(link.labelKey)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        );
      })}

      {directLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            cn(
              'inline-flex h-9 items-center rounded-md px-2.5 text-[14px] font-medium transition-colors',
              isActive
                ? 'text-accent-strong'
                : 'text-ink-muted hover:bg-accent-soft hover:text-ink',
            )
          }
        >
          {t(link.labelKey)}
        </NavLink>
      ))}
    </div>
  );
}
