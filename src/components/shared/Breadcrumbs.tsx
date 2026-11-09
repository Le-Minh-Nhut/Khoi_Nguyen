import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Crumb } from '@/app/navigation';
import { useI18n } from '@/hooks/useApp';

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = useI18n();
  return (
    <nav aria-label={t('nav.menu')} className="mb-5">
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-ink-muted">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1 transition-colors hover:text-accent-strong"
            aria-label={t('nav.home')}
          >
            <Home className="size-3.5" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">{t('nav.home')}</span>
          </Link>
        </li>
        {items.map((crumb, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
              <ChevronRight className="size-3.5 text-divider-strong" aria-hidden="true" />
              {crumb.to && !last ? (
                <Link to={crumb.to} className="transition-colors hover:text-accent-strong">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-ink' : undefined}>
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
