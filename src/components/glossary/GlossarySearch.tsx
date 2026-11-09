import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { glossaryTerms } from '@/content/glossary';
import { useI18n } from '@/hooks/useApp';
import { termMatches } from '@/lib/search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GlossarySearchProps {
  variant?: 'hero' | 'inline';
  initialQuery?: string;
}

/**
 * Navigates to the glossary with the query applied. On the hero it also shows
 * live suggestions, because that is the fastest path to a definition.
 */
export function GlossarySearch({ variant = 'inline' }: GlossarySearchProps) {
  const t = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const suggestions = useMemo(() => {
    if (variant !== 'hero' || query.trim().length < 2) return [];
    return glossaryTerms
      .map((term) => ({ term, score: termMatches(term, query) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => item.term);
  }, [query, variant]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/glossary?q=${encodeURIComponent(trimmed)}` : '/glossary');
  };

  return (
    <div>
      <form onSubmit={submit} role="search" className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted/70"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('glossary.search')}
            aria-label={t('glossary.search')}
            className={variant === 'hero' ? 'h-11 pl-9 text-[15px]' : 'pl-9'}
          />
        </div>
        <Button type="submit" size={variant === 'hero' ? 'lg' : 'md'} className="shrink-0">
          {t('search.go')}
        </Button>
      </form>

      {suggestions.length > 0 ? (
        <ul className="mt-2 divide-y divide-divider overflow-hidden rounded-lg border border-divider bg-surface">
          {suggestions.map((term) => (
            <li key={term.slug}>
              <button
                type="button"
                onClick={() => navigate(`/glossary/${term.slug}`)}
                className="flex w-full items-baseline justify-between gap-4 px-3 py-2 text-left transition-colors hover:bg-accent-soft/70"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium text-ink">{term.en}</span>
                  <span className="block truncate text-[13px] text-ink-muted">{term.vi}</span>
                </span>
                {term.abbreviation ? (
                  <span className="shrink-0 rounded border border-divider px-1.5 text-[11px] text-ink-muted">
                    {term.abbreviation}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
