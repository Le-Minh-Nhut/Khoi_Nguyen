import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/hooks/useApp';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const t = useI18n();

  return (
    <div className="container-page flex min-h-[60vh] items-center py-16">
      <div className="w-full max-w-2xl">
        <p className="font-serif text-[5rem] font-semibold leading-none text-ink-muted sm:text-[6rem]">404</p>
        <h1 className="mt-2 text-h1">{t('notFound.title')}</h1>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink-muted">{t('notFound.lede')}</p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t('notFound.home')}
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/glossary">
              <Search className="size-4" aria-hidden="true" />
              {t('nav.glossary')}
            </Link>
          </Button>
        </div>
        <p className="mt-8 text-[12.5px] text-ink-muted">
          ⌘K · Ctrl K — {t('search.title')}
        </p>
      </div>
    </div>
  );
}
