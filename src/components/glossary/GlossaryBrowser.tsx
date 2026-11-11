import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, X } from 'lucide-react';
import { glossaryTerms } from '@/content/glossary';
import { glossaryCategories } from '@/content/glossaryCategories';
import type { GlossaryCategoryId } from '@/types/content';
import { termMatches } from '@/lib/search';
import { useI18n } from '@/hooks/useApp';
import { useSettings } from '@/app/SettingsProvider';
import { cn } from '@/lib/cn';
import { GlossaryResultRow } from './GlossaryResultRow';
import { SearchField } from '@/components/shared/SearchField';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

type SortMode = 'az' | 'category';

const categoryIds = glossaryCategories.map((category) => category.id);

function isCategoryId(value: string | null): value is GlossaryCategoryId {
  return value !== null && categoryIds.includes(value as GlossaryCategoryId);
}

/**
 * The URL is the single source of truth for the query and the category, so a
 * shared link, the back button, and a later in-route navigation to
 * `/glossary?q=…` all agree with what is on screen. The input keeps local state
 * only so typing stays responsive; a debounce writes it back to the URL.
 */
export function GlossaryBrowser() {
  const t = useI18n();
  const [params, setParams] = useSearchParams();

  const urlQuery = params.get('q') ?? '';
  const urlCategory = params.get('category');
  const category: GlossaryCategoryId | 'all' = isCategoryId(urlCategory) ? urlCategory : 'all';

  const [draft, setDraft] = useState(urlQuery);
  const [sort, setSort] = useState<SortMode>('category');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Adopt an externally changed URL (back/forward, an in-app link) without
  // fighting the user mid-keystroke: the debounce below writes the *trimmed*
  // draft to the URL, so only step in when the URL says something the draft
  // does not already mean.
  useEffect(() => {
    setDraft((current) => (current.trim() === urlQuery ? current : urlQuery));
  }, [urlQuery]);

  useEffect(() => {
    if (draft === urlQuery) return;
    const timer = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (draft.trim()) next.set('q', draft.trim());
      else next.delete('q');
      setParams(next, { replace: true });
    }, 220);
    return () => clearTimeout(timer);
  }, [draft, urlQuery, params, setParams]);

  const deferredQuery = useDeferredValue(urlQuery);

  const setCategory = useCallback(
    (next: GlossaryCategoryId | 'all', replace = true) => {
      const search = new URLSearchParams(params);
      if (next === 'all') search.delete('category');
      else search.set('category', next);
      setParams(search, { replace });
    },
    [params, setParams],
  );

  const results = useMemo(() => {
    const filtered = glossaryTerms.filter(
      (term) => (category === 'all' || term.category === category) && termMatches(term, deferredQuery) > 0,
    );
    if (sort === 'az') {
      return [...filtered].sort((a, b) => a.en.localeCompare(b.en, 'en'));
    }
    return [...filtered].sort(
      (a, b) =>
        categoryIds.indexOf(a.category) - categoryIds.indexOf(b.category) ||
        a.en.localeCompare(b.en, 'en'),
    );
  }, [category, deferredQuery, sort]);

  const countsByCategory = useMemo(() => {
    const counts = new Map<GlossaryCategoryId, number>();
    for (const term of glossaryTerms) {
      counts.set(term.category, (counts.get(term.category) ?? 0) + 1);
    }
    return counts;
  }, []);

  const clearAll = useCallback(() => {
    setDraft('');
    setCategory('all', false);
  }, [setCategory]);

  const activeFilterCount = (urlQuery.trim() ? 1 : 0) + (category !== 'all' ? 1 : 0);

  const categoryList = (
    <CategoryList
      value={category}
      onChange={(next) => {
        setCategory(next);
        setFiltersOpen(false);
      }}
      counts={countsByCategory}
    />
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
      {/* Desktop category rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="eyebrow mb-3">{t('glossary.categories')}</p>
          {categoryList}
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-col gap-3 border-b border-divider pb-4 sm:flex-row sm:items-center">
          <SearchField
            value={draft}
            onChange={setDraft}
            placeholder={t('glossary.search')}
            label={t('glossary.search')}
            className="sm:max-w-md"
          />

          <div className="flex items-center gap-2 sm:ml-auto">
            <Button
              variant="secondary"
              size="md"
              className="lg:hidden"
              onClick={() => setFiltersOpen(true)}
            >
              <LayoutGrid className="size-4" aria-hidden="true" />
              {t('glossary.filters')}
              {activeFilterCount > 0 ? (
                <span className="grid size-4 place-content-center rounded-full bg-accent text-[10px] font-semibold text-white">
                  {activeFilterCount}
                </span>
              ) : null}
            </Button>

            <label className="flex items-center gap-2 text-[13px] text-ink-muted">
              <span className="sr-only sm:not-sr-only">{t('glossary.sort')}</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
                className="h-10 rounded-lg border border-divider-strong bg-surface px-2.5 text-[13px] text-ink transition-colors hover:border-accent/40"
              >
                <option value="category">{t('glossary.sort.recent')}</option>
                <option value="az">{t('glossary.sort.az')}</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[13px] text-ink-muted" role="status" aria-live="polite">
            <strong className="font-semibold tabular-nums text-ink">{results.length}</strong> {t('label.terms')}
            {urlQuery.trim() ? ` · “${urlQuery.trim()}”` : ''}
          </p>
          {activeFilterCount > 0 ? (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-[13px] text-ink-muted transition-colors hover:text-error"
            >
              <X className="size-3.5" aria-hidden="true" />
              {t('action.clear')}
            </button>
          ) : null}
        </div>

        {category !== 'all' ? (
          <p className="mt-3 rounded-lg bg-accent-soft/70 px-3.5 py-2 text-[13px] leading-relaxed text-accent-strong" lang="vi">
            {glossaryCategories.find((item) => item.id === category)?.scope.vi}
          </p>
        ) : null}

        {results.length === 0 ? (
          <EmptyState
            className="mt-6"
            title={t('glossary.empty')}
            description={t('glossary.emptyHint')}
            action={
              <Button variant="secondary" size="sm" onClick={clearAll}>
                {t('action.clear')}
              </Button>
            }
          />
        ) : (
          <ol className="mt-2 divide-y divide-divider">
            {results.map((term, index) => (
              <GlossaryResultRow
                key={term.slug}
                term={term}
                query={deferredQuery}
                showCategory={category === 'all' && results[index - 1]?.category !== term.category}
              />
            ))}
          </ol>
        )}
      </div>

      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent className="max-w-sm">
          <div className="border-b border-divider px-5 py-4">
            <DialogTitle>{t('glossary.categories')}</DialogTitle>
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-3 scrollbar-slim">{categoryList}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CategoryList({
  value,
  onChange,
  counts,
}: {
  value: GlossaryCategoryId | 'all';
  onChange: (value: GlossaryCategoryId | 'all') => void;
  counts: Map<GlossaryCategoryId, number>;
}) {
  const t = useI18n();
  const { uiLang } = useSettings();
  return (
    <ul className="space-y-0.5">
      <li>
        <button
          type="button"
          onClick={() => onChange('all')}
          aria-pressed={value === 'all'}
          className={cn(
            'flex w-full items-baseline justify-between gap-2 rounded-md px-2.5 py-2 text-left text-[13.5px] transition-colors',
            value === 'all'
              ? 'bg-accent-soft font-medium text-accent-strong'
              : 'text-ink-muted hover:bg-canvas hover:text-ink',
          )}
        >
          <span>{t('label.all')}</span>
          <span className="text-[11px] tabular-nums text-ink-muted">{glossaryTerms.length}</span>
        </button>
      </li>
      {glossaryCategories.map((category) => (
        <li key={category.id}>
          <button
            type="button"
            onClick={() => onChange(category.id)}
            aria-pressed={value === category.id}
            className={cn(
              'flex w-full items-baseline justify-between gap-2 rounded-md px-2.5 py-2 text-left text-[13.5px] leading-snug transition-colors',
              value === category.id
                ? 'bg-accent-soft font-medium text-accent-strong'
                : 'text-ink-muted hover:bg-canvas hover:text-ink',
            )}
          >
            <span lang={uiLang}>{category.label[uiLang]}</span>
            <span className="shrink-0 text-[11px] tabular-nums text-ink-muted">
              {counts.get(category.id) ?? 0}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
