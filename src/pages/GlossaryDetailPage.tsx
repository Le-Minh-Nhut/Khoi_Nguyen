import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { glossaryTerms } from '@/content/glossary';
import { glossaryCategories } from '@/content/glossaryCategories';
import { useI18n } from '@/hooks/useApp';
import { useSettings } from '@/app/SettingsProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookmarkButton, CopyButton } from '@/components/shared/Actions';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { BilingualBlock, TranslationNote } from '@/components/shared/Bilingual';
import NotFoundPage from './NotFoundPage';

export default function GlossaryDetailPage() {
  const t = useI18n();
  const { uiLang } = useSettings();
  const { slug } = useParams();
  const index = glossaryTerms.findIndex((item) => item.slug === slug);

  if (index === -1) return <NotFoundPage />;

  const term = glossaryTerms[index];
  const category = glossaryCategories.find((item) => item.id === term.category);
  const related = (term.related ?? [])
    .map((relatedSlug) => glossaryTerms.find((item) => item.slug === relatedSlug))
    .filter((item): item is NonNullable<typeof item> => item !== undefined);
  const previous = index > 0 ? glossaryTerms[index - 1] : null;
  const next = index < glossaryTerms.length - 1 ? glossaryTerms[index + 1] : null;

  const copyPayload = [
    `${term.en}${term.abbreviation ? ` (${term.abbreviation})` : ''} — ${term.vi}`,
    '',
    `EN: ${term.definitionEn}`,
    `VI: ${term.definitionVi}`,
    '',
    `Example: ${term.exampleEn}`,
    `Ví dụ: ${term.exampleVi}`,
    term.note ? `\nNote: ${term.note.en}\nGhi chú: ${term.note.vi}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs
        items={[
          { label: t('nav.glossary'), to: '/glossary' },
          ...(category ? [{ label: category.label[uiLang], to: `/glossary?category=${category.id}` }] : []),
          { label: term.en },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
        <article className="min-w-0">
          <header className="border-b border-divider pb-6">
            <div className="flex flex-wrap items-center gap-2">
              {category ? <Badge tone="accent">{category.label[uiLang]}</Badge> : null}
              {term.abbreviation ? <Badge>{term.abbreviation}</Badge> : null}
            </div>
            <h1
              lang="en"
              className="mt-3 text-[1.9rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[2.35rem]"
            >
              {term.en}
            </h1>
            <p className="mt-1.5 font-serif text-[1.3rem] text-accent-strong" lang="vi">
              {term.vi}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <BookmarkButton kind="glossary" id={term.slug} withLabel />
              <CopyButton text={copyPayload} label={t('action.copy')} />
            </div>
          </header>

          <section aria-labelledby="definition-heading" className="mt-7">
            <h2 id="definition-heading" className="eyebrow mb-2">
              {t('label.definition')}
            </h2>
            <p className="prose-guide text-[15.5px]" lang="vi">
              {term.definitionVi}
            </p>
            <p className="mt-2 max-w-[70ch] text-[14px] leading-relaxed text-ink-muted" lang="en">
              {term.definitionEn}
            </p>
          </section>

          <section aria-labelledby="example-heading" className="mt-8">
            <h2 id="example-heading" className="eyebrow mb-2">
              {t('label.example')}
            </h2>
            <BilingualBlock en={term.exampleEn} vi={term.exampleVi} />
          </section>

          {term.note ? (
            <section aria-labelledby="note-heading" className="mt-8">
              <h2 id="note-heading" className="sr-only">
                {t('label.note')}
              </h2>
              <TranslationNote title={t('label.note')}>
                <p>{term.note.vi}</p>
                <p className="mt-2 border-t border-highlight/50 pt-2 text-[12.5px] text-[#7a5a20]" lang="en">
                  {term.note.en}
                </p>
              </TranslationNote>
            </section>
          ) : null}

          {related.length > 0 ? (
            <section aria-labelledby="related-heading" className="mt-10 border-t border-divider pt-6">
              <h2 id="related-heading" className="text-h3 mb-3">
                {t('label.related')}
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/glossary/${item.slug}`}
                      className="group flex items-baseline justify-between gap-3 rounded-lg border border-divider bg-surface px-3.5 py-2.5 transition-colors hover:border-accent/40 hover:bg-accent-soft/50"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] font-medium text-ink">{item.en}</span>
                        <span className="block truncate text-[12.5px] text-ink-muted" lang="vi">
                          {item.vi}
                        </span>
                      </span>
                      <ArrowRight
                        className="size-3.5 shrink-0 text-ink-muted transition-colors group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <nav
            aria-label={t('nav.glossary')}
            className="mt-10 flex flex-wrap items-stretch justify-between gap-3 border-t border-divider pt-6"
          >
            {previous ? (
              <Link
                to={`/glossary/${previous.slug}`}
                className="group flex min-w-0 max-w-[48%] flex-1 flex-col rounded-lg border border-divider px-3.5 py-2.5 transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
              >
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-ink-muted">
                  <ArrowLeft className="size-3" aria-hidden="true" />
                  {t('action.previous')}
                </span>
                <span className="mt-0.5 truncate text-[14px] font-medium text-ink">{previous.en}</span>
              </Link>
            ) : (
              <span aria-hidden="true" className="flex-1" />
            )}
            {next ? (
              <Link
                to={`/glossary/${next.slug}`}
                className="group flex min-w-0 max-w-[48%] flex-1 flex-col items-end rounded-lg border border-divider px-3.5 py-2.5 text-right transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
              >
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-ink-muted">
                  {t('action.next')}
                  <ArrowRight className="size-3" aria-hidden="true" />
                </span>
                <span className="mt-0.5 truncate text-[14px] font-medium text-ink">{next.en}</span>
              </Link>
            ) : null}
          </nav>
        </article>

        <aside className="lg:pt-1">
          <div className="sticky top-24 space-y-5">
            <div className="rounded-card border border-divider bg-surface p-4">
              <p className="eyebrow mb-2">{t('label.suggested')}</p>
              <p className="font-serif text-[1.05rem] leading-snug text-ink">{term.vi}</p>
              <div className="mt-3 border-t border-divider pt-3">
                <Button asChild variant="ghost" size="sm" className="-ml-2">
                  <Link to="/glossary">
                    <ArrowLeft className="size-3.5" aria-hidden="true" />
                    {t('glossary.detailBack')}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-card border border-divider bg-canvas/60 p-4">
              <p className="eyebrow mb-2">{t('label.category')}</p>
              {category ? (
                <Link
                  to={`/glossary?category=${category.id}`}
                  className="text-[13.5px] font-medium text-accent-strong hover:underline"
                >
                  {category.label.vi}
                </Link>
              ) : null}
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">{category?.scope.vi}</p>
            </div>

            <div className="rounded-card border border-divider bg-surface p-4">
              <p className="eyebrow mb-2">{t('action.copy')}</p>
              <CopyButton
                className="w-full"
                size="sm"
                variant="secondary"
                text={`${term.en} — ${term.vi}`}
                label={t('label.suggested')}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
