import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, Languages } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { phrases } from '@/content/phrases';
import { phraseCategories } from '@/content/phraseCategories';
import type { Phrase, PhraseCategoryId } from '@/types/content';
import { phraseMatches } from '@/lib/search';
import { useI18n } from '@/hooks/useApp';
import { cn } from '@/lib/cn';
import { PageHeader, StatPill } from '@/components/shared/PageHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { SearchField } from '@/components/shared/SearchField';
import { EmptyState } from '@/components/shared/EmptyState';
import { BookmarkButton, CopyButton } from '@/components/shared/Actions';
import { Button } from '@/components/ui/button';
import { TranslationNote } from '@/components/shared/Bilingual';

type DisplayMode = 'both' | 'en' | 'vi';

export default function PhraseBankPage() {
  const t = useI18n();
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState<PhraseCategoryId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<DisplayMode>('both');
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  // `/phrase-bank?phrase=<id>` (the link /saved uses) scrolls to and highlights
  // one expression. The param is consumed once, then dropped so a reload does
  // not re-scroll a page the reader has already moved on from.
  const targetPhrase = params.get('phrase');
  useEffect(() => {
    if (!targetPhrase) return;
    const exists = phrases.some((phrase) => phrase.id === targetPhrase);
    if (exists) {
      const element = document.getElementById(targetPhrase);
      element?.scrollIntoView({ block: 'center' });
      element?.focus?.();
    }
    setParams({}, { replace: true });
  }, [targetPhrase, setParams]);

  const results = useMemo(
    () =>
      phrases.filter(
        (phrase) => (category === 'all' || phrase.category === category) && phraseMatches(phrase, query) > 0,
      ),
    [category, query],
  );

  const toggleTranslation = (id: string) => {
    setHidden((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allHidden = results.length > 0 && results.every((phrase) => hidden.has(phrase.id));
  const toggleAll = () => {
    setHidden(allHidden ? new Set() : new Set(results.map((phrase) => phrase.id)));
  };
  // Leaving `both` mode drops the hidden set: otherwise switching to `vi` would
  // keep every card blank even though the toggle is no longer offered.
  const selectMode = (next: DisplayMode) => {
    setMode(next);
    if (next !== 'both') setHidden(new Set());
  };

  const grouped = useMemo(() => {
    const buckets: Array<{ category: (typeof phraseCategories)[number]; items: Phrase[] }> = [];
    for (const cat of phraseCategories) {
      const items = results.filter((phrase) => phrase.category === cat.id);
      if (items.length > 0) buckets.push({ category: cat, items });
    }
    return buckets;
  }, [results]);

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs items={[{ label: t('nav.phrases') }]} />
      <PageHeader
        eyebrow={t('nav.reference')}
        title={t('phrases.title')}
        lede={t('phrases.lede')}
        meta={
          <>
            <StatPill label={t('label.terms')} value={String(phrases.length)} />
            <StatPill label={t('glossary.categories')} value={String(phraseCategories.length)} />
          </>
        }
      />

      {/* Controls */}
      <div className="sticky top-16 z-20 -mx-4 mt-6 border-b border-divider bg-canvas/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder={t('glossary.search')}
            label={t('glossary.search')}
            className="lg:max-w-sm"
          />

          <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
            <div
              className="flex items-center rounded-lg border border-divider bg-surface p-0.5"
              role="group"
              aria-label={t('phrases.display')}
            >
              {(
                [
                  ['both', t('phrases.display.both'), Languages],
                  ['en', t('phrases.display.en'), Eye],
                  ['vi', t('phrases.display.vi'), EyeOff],
                ] as const
              ).map(([value, label, Icon]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectMode(value)}
                  aria-pressed={mode === value}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-[6px] px-2.5 py-1.5 text-[12.5px] font-medium transition-colors',
                    mode === value ? 'bg-accent-soft text-accent-strong' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>

            {mode === 'both' ? (
              <Button variant="secondary" size="sm" onClick={toggleAll}>
                {allHidden ? t('action.showAll') : t('action.hideAll')}
              </Button>
            ) : null}
          </div>
        </div>

        <div className="-mx-1 mt-2.5 flex gap-1 overflow-x-auto px-1 pb-0.5 scrollbar-slim">
          <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>
            {t('label.all')}
          </FilterChip>
          {phraseCategories.map((cat) => (
            <FilterChip key={cat.id} active={category === cat.id} onClick={() => setCategory(cat.id)}>
              {cat.label.vi}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[13px] text-ink-muted" role="status" aria-live="polite">
        <strong className="font-semibold tabular-nums text-ink">{results.length}</strong> {t('label.results')}
      </p>

      {results.length === 0 ? (
        <EmptyState
          className="mt-6"
          title={t('phrases.empty')}
          description={t('glossary.emptyHint')}
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
            >
              {t('action.clear')}
            </Button>
          }
        />
      ) : (
        <div className="mt-3 space-y-10">
          {grouped.map(({ category: cat, items }) => (
            <section key={cat.id} aria-labelledby={`phrase-group-${cat.id}`}>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 border-b border-divider pb-2">
                <h2 id={`phrase-group-${cat.id}`} className="text-h3 font-serif">
                  {cat.label.vi}
                </h2>
                <p className="text-[12px] text-ink-muted">
                  {cat.label.en} · {items.length}
                </p>
              </div>
              <ul className="space-y-3">
                {items.map((phrase) => (
                  <PhraseCard
                    key={phrase.id}
                    phrase={phrase}
                    mode={mode}
                    translationHidden={hidden.has(phrase.id)}
                    onToggleTranslation={() => toggleTranslation(phrase.id)}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors',
        active
          ? 'border-accent/40 bg-accent text-white'
          : 'border-divider bg-surface text-ink-muted hover:border-accent/30 hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}

function PhraseCard({
  phrase,
  mode,
  translationHidden,
  onToggleTranslation,
}: {
  phrase: Phrase;
  mode: DisplayMode;
  translationHidden: boolean;
  onToggleTranslation: () => void;
}) {
  const t = useI18n();
  // In `vi` mode the Vietnamese line IS the content, so the translation toggle
  // must never hide it; the toggle only exists in `both` mode.
  const showEn = mode !== 'vi';
  const showVi = mode === 'vi' || (mode === 'both' && !translationHidden);
  const toggleable = mode === 'both';

  const copyValue = mode === 'en' ? phrase.en : mode === 'vi' ? phrase.vi : `${phrase.en}\n${phrase.vi}`;

  return (
    <li
      id={phrase.id}
      tabIndex={-1}
      className="group scroll-mt-28 rounded-card border border-divider bg-surface p-4 outline-none sm:p-5 focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {showEn ? (
          <div className={cn(!showVi && 'sm:col-span-2')}>
            <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              {t('label.english')}
            </p>
            <p className="font-serif text-[1.02rem] leading-relaxed text-ink" lang="en">
              {phrase.en}
            </p>
          </div>
        ) : null}

        {showVi ? (
          <div
            className={cn(
              'border-t border-dashed border-divider pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0',
              !showEn && 'sm:col-span-2 sm:border-l-0 sm:pl-0',
            )}
          >
            <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-accent-strong">
              {t('label.vietnamese')}
            </p>
            <p className="text-[1.02rem] leading-relaxed text-ink" lang="vi">
              {phrase.vi}
            </p>
          </div>
        ) : null}

        {!showVi && toggleable ? (
          <div className="flex items-center border-t border-dashed border-divider pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <button
              type="button"
              onClick={onToggleTranslation}
              className="text-[13px] font-medium text-accent-strong hover:underline"
            >
              {t('action.showTranslation')}
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-4 border-t border-divider pt-3">
        <p className="text-[12.5px] leading-relaxed text-ink-muted">
          <span className="font-medium text-ink">{t('label.context')}: </span>
          <span lang="vi">{phrase.context.vi}</span>
        </p>

        {phrase.note && showVi ? (
          <TranslationNote className="mt-2.5 px-3 py-2 text-[12.5px]">
            <span className="font-semibold">{t('label.note')}: </span>
            {phrase.note.vi}
          </TranslationNote>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <CopyButton size="sm" variant="ghost" text={copyValue} />
          <BookmarkButton kind="phrases" id={phrase.id} withLabel size="sm" />
          {toggleable ? (
            <Button variant="ghost" size="sm" onClick={onToggleTranslation} className="text-ink-muted">
              {translationHidden ? t('action.showTranslation') : t('action.hideTranslation')}
            </Button>
          ) : null}
        </div>
      </div>
    </li>
  );
}
