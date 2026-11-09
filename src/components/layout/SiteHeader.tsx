import { Bookmark, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useBookmarks, useSettings } from '@/app/SettingsProvider';
import { useI18n, useSearchHotkey } from '@/hooks/useApp';
import { cn } from '@/lib/cn';
import { DesktopNav } from '@/components/navigation/DesktopNav';
import { MobileNav } from '@/components/navigation/MobileNav';
import { SearchDialog } from '@/components/search/SearchDialog';
import { SearchTrigger } from '@/components/search/SearchTrigger';

const brandLink =
  'font-serif text-[1.35rem] font-semibold tracking-tight text-ink transition-colors hover:text-accent-strong';

export function SiteHeader() {
  const t = useI18n();
  const { uiLang, toggleUiLang } = useSettings();
  const { count } = useBookmarks();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useSearchHotkey(() => setSearchOpen(true));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-divider/90 bg-surface/92 backdrop-blur-md">
        <div className="container-page flex h-16 items-center gap-3">
          <Link to="/" className={cn(brandLink, 'mr-auto shrink-0')}>
            EduLingo<span className="text-accent">.</span>
          </Link>

          <nav aria-label={t('nav.menu')} className="contents">
            <DesktopNav />
          </nav>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-3">
            <div className="hidden md:block">
              <SearchTrigger onClick={() => setSearchOpen(true)} />
            </div>

            <NavLink
              to="/saved"
              className={({ isActive }) =>
                cn(
                  'relative hidden h-9 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-medium transition-colors sm:inline-flex',
                  isActive ? 'text-accent-strong' : 'text-ink-muted hover:bg-accent-soft hover:text-ink',
                )
              }
              aria-label={count > 0 ? `${t('nav.saved')} (${count})` : t('nav.saved')}
            >
              <Bookmark className="size-4" aria-hidden="true" />
              <span className="hidden xl:inline">{t('nav.saved')}</span>
              {count > 0 ? (
                <span className="grid min-w-4 place-content-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-4 text-white">
                  {count}
                </span>
              ) : null}
            </NavLink>

            <button
              type="button"
              onClick={toggleUiLang}
              className="hidden h-9 items-center rounded-md border border-divider px-2.5 text-[12px] font-semibold tracking-wide text-ink-muted transition-colors hover:border-accent/40 hover:text-accent-strong sm:inline-flex"
              aria-label={t('lang.switch')}
              title={t('lang.current')}
            >
              {uiLang === 'vi' ? 'VI / EN' : 'EN / VI'}
            </button>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex size-9 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-accent-soft hover:text-ink md:hidden"
              aria-label={t('nav.search')}
            >
              <Search className="size-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-9 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-accent-soft hover:text-ink lg:hidden"
              aria-label={t('nav.openMenu')}
              aria-expanded={menuOpen}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onOpenChange={setMenuOpen} onSearch={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
