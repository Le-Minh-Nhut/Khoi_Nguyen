import { Link } from 'react-router-dom';
import { footerGroups } from '@/app/navigation';
import { useI18n } from '@/hooks/useApp';

export function SiteFooter() {
  const t = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-divider bg-surface">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
          <div className="max-w-sm">
            <p className="font-serif text-xl font-semibold tracking-tight text-ink">
              EduLingo<span className="text-accent">.</span>
            </p>
            <p className="mt-1 text-sm font-medium text-accent-strong">{t('brand.tagline')}</p>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-muted">{t('footer.mission')}</p>
            <p className="mt-4 text-[12px] text-ink-muted">{t('footer.local')}</p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.labelKey} aria-labelledby={`footer-${group.labelKey}`}>
              <h2 id={`footer-${group.labelKey}`} className="eyebrow mb-3">
                {t(group.labelKey)}
              </h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={`${group.labelKey}-${link.to}`}>
                    <Link
                      to={link.to}
                      className="inline-block text-[13px] text-ink-muted transition-colors hover:text-accent-strong hover:underline"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-divider pt-6">
          <p className="max-w-3xl text-[12px] leading-relaxed text-ink-muted">{t('footer.disclaimer')}</p>
          <div className="mt-4 flex flex-col gap-1.5 text-[12px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} EduLingo Guide. {t('footer.rights')}</p>
            <p>Bridge Languages. Connect Education.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
