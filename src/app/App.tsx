import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { useI18n } from '@/hooks/useApp';
import { useSettings } from './SettingsProvider';

function ScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

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
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
