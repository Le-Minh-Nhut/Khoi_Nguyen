import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { BookOpen, Bookmark, CornerDownLeft, FileText, Languages, Search } from 'lucide-react';
import { glossaryTerms } from '@/content/glossary';
import { phrases } from '@/content/phrases';
import { lessons } from '@/content/lessons';
import { scenarios } from '@/content/scenarios';
import { useI18n } from '@/hooks/useApp';
import { searchHandbook, type SearchResult, type SearchResultKind } from '@/lib/search';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/cn';

const SUGGESTIONS = ['MOU', 'học bổng', 'student exchange', 'admission', 'keynote speaker', 'credit transfer'];

const kindIcon: Record<SearchResultKind, typeof FileText> = {
  glossary: BookOpen,
  phrase: Languages,
  lesson: FileText,
  scenario: Bookmark,
};

const kindLabelKey: Record<
  SearchResultKind,
  'search.group.glossary' | 'search.group.phrases' | 'search.group.lessons' | 'search.group.scenarios'
> = {
  glossary: 'search.group.glossary',
  phrase: 'search.group.phrases',
  lesson: 'search.group.lessons',
  scenario: 'search.group.scenarios',
};

const LIST_ID = 'global-search-results';
const optionId = (index: number) => `global-search-option-${index}`;

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Combobox + listbox per the WAI-ARIA APG: the input owns
 * `aria-expanded`/`aria-controls`/`aria-activedescendant`, one listbox wraps all
 * options so `aria-activedescendant` resolves, and option ids are stable.
 */
export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const t = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(
    () => searchHandbook(query, { glossary: glossaryTerms, phrases, lessons, scenarios }, 20),
    [query],
  );

  const grouped = useMemo(() => {
    const buckets = new Map<SearchResultKind, SearchResult[]>();
    for (const result of results) {
      const list = buckets.get(result.kind) ?? [];
      list.push(result);
      buckets.set(result.kind, list);
    }
    return [...buckets.entries()];
  }, [results]);

  // Result identity, not array position, so Enter never opens a stale row.
  const flatIds = useMemo(() => results.map((item) => item.id), [results]);

  useEffect(() => {
    // Results shrank (or changed) under the cursor: clamp instead of overflowing.
    setActiveIndex((index) => (index < flatIds.length ? index : 0));
  }, [flatIds]);

  const go = (href: string) => {
    onOpenChange(false);
    setQuery('');
    setActiveIndex(0);
    navigate(href);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (flatIds.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % flatIds.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + flatIds.length) % flatIds.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(flatIds.length - 1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const target = results[activeIndex];
      if (target) go(target.href);
    }
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setQuery('');
      setActiveIndex(0);
    }
  };

  const showSuggestions = query.trim() === '';

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 animate-fade bg-ink/40 backdrop-blur-[2px]" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[12vh] z-50 w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-panel border border-divider bg-surface shadow-overlay sm:top-[15vh]"
          onOpenAutoFocus={(event) => {
            // Focus the input, not the close affordance.
            event.preventDefault();
            document.getElementById('global-search-input')?.focus();
          }}
        >
          <DialogPrimitive.Title className="sr-only">{t('search.title')}</DialogPrimitive.Title>

          <div className="flex items-center gap-2.5 border-b border-divider px-4">
            <Search className="size-4 shrink-0 text-ink-muted" aria-hidden="true" />
            <input
              id="global-search-input"
              type="search"
              role="combobox"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={t('search.placeholder')}
              aria-label={t('search.title')}
              aria-autocomplete="list"
              aria-expanded={!showSuggestions && results.length > 0}
              aria-controls={LIST_ID}
              aria-activedescendant={
                !showSuggestions && results.length > 0 && results[activeIndex]
                  ? optionId(activeIndex)
                  : undefined
              }
              autoComplete="off"
              className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-muted [&::-webkit-search-cancel-button]:appearance-none"
            />
            <kbd className="hidden shrink-0 rounded border border-divider bg-canvas px-1.5 py-0.5 font-sans text-[11px] text-ink-muted sm:block">
              Esc
            </kbd>
          </div>

          <div id={LIST_ID} className="max-h-[min(60vh,26rem)] overflow-y-auto p-2 scrollbar-slim">
            {showSuggestions ? (
              <div className="px-2 py-3">
                <p className="eyebrow mb-2">{t('search.recent')}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery(suggestion);
                          setActiveIndex(0);
                        }}
                        className="rounded-md border border-divider bg-canvas px-2.5 py-1 text-[13px] text-ink-muted transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent-strong"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] text-ink-muted">{t('search.hint')}</p>
              </div>
            ) : results.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-ink-muted" role="status">
                {t('search.empty')}
              </p>
            ) : (
              <ul role="listbox" aria-label={t('search.title')}>
                {grouped.map(([kind, items]) => {
                  const Icon = kindIcon[kind];
                  const groupId = `search-group-${kind}`;
                  return (
                    <>
                      <li key={groupId} role="presentation">
                        <p
                          id={groupId}
                          className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted"
                        >
                          {t(kindLabelKey[kind])}
                        </p>
                      </li>
                      {items.map((item) => {
                        const index = results.indexOf(item);
                        const selected = index === activeIndex;
                        return (
                          <li key={`${kind}-${item.id}`} role="presentation">
                            <div
                              id={optionId(index)}
                              role="option"
                              tabIndex={-1}
                              aria-selected={selected}
                              onMouseEnter={() => setActiveIndex(index)}
                              onClick={() => go(item.href)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                  event.preventDefault();
                                  go(item.href);
                                }
                              }}
                              className={cn(
                                'flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors',
                                selected ? 'bg-accent-soft' : 'hover:bg-canvas',
                              )}
                            >
                              <Icon
                                className={cn('size-4 shrink-0', selected ? 'text-accent' : 'text-ink-muted')}
                                aria-hidden="true"
                              />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[14px] font-medium text-ink">
                                  {item.title}
                                </span>
                                <span className="block truncate text-[13px] text-ink-muted">{item.subtitle}</span>
                              </span>
                              {selected ? (
                                <CornerDownLeft className="size-3.5 shrink-0 text-ink-muted" aria-hidden="true" />
                              ) : null}
                            </div>
                          </li>
                        );
                      })}
                    </>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-divider bg-canvas px-4 py-2 text-[11px] text-ink-muted">
            <span>{t('search.keys')}</span>
            <Badge tone="accent">
              {results.length} {t('label.results')}
            </Badge>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
