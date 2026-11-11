import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { useI18n } from '@/hooks/useApp';
import { useSettings } from './SettingsProvider';
import { routeTitle } from './navigation';

/**
 * Scroll behaviour is ours, not the browser's: Chrome restores the previous
 * position on popstate *after* React has rendered, which can leave the reader
 * deep inside a page they just returned to. Taking over `history.scrollRestoration`
 * plus a synchronous popstate listener makes Back always land at the top (or at
 * the `#hash` target).
 */
function useScrollReset() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    const apply = () => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.scrollIntoView({ block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    };

    apply();
    // popstate fires before the router re-renders, so this wins the race with
    // the browser's own restoration.
    window.addEventListener('popstate', apply);
    return () => window.removeEventListener('popstate', apply);
  }, [pathname, hash]);
}

function ScrollRestoration() {
  useScrollReset();
  return null;
}

/** Keeps <html lang> in sync with the UI language for correct pronunciation. */
function DocumentLanguage() {
  const { uiLang } = useSettings();

  useEffect(() => {
    document.documentElement.lang = uiLang;
    document.documentElement.dataset.uiLang = uiLang;
  }, [uiLang]);

  return null;
}

function RouteAnnouncer() {
  const { pathname } = useLocation();
  const t = useI18n();
  const firstPaint = useRef(true);

  useEffect(() => {
    document.title = routeTitle(pathname, t);

    // Never move focus on the initial load: the skip link must stay the first
    // focusable element, and a reader arriving at a deep link expects focus at
    // the document start. On client-side navigation, focus <main> so a screen
    // reader announces the new page instead of staying on the old link.
    if (firstPaint.current) {
      firstPaint.current = false;
      return;
    }
    const active = document.activeElement;
    if (active && active !== document.body) return;
    const main = document.getElementById('main-content');
    if (!main) return;
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
  }, [pathname, t]);

  return null;
}

export function App() {
  const t = useI18n();

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t('nav.skip')}
      </a>
      <ScrollRestoration />
      <DocumentLanguage />
      <RouteAnnouncer />
      <SiteHeader />
      <main id="main-content" className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
