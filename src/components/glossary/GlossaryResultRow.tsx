import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { GlossaryTerm } from '@/types/content';
import { glossaryCategories } from '@/content/glossaryCategories';
import { BookmarkButton } from '@/components/shared/Actions';

function Highlight({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;
  // Highlight only exact (accent-sensitive) hits; silent fallback keeps the
  // accent-insensitive search from producing misleading highlights.
  const index = text.toLowerCase().indexOf(trimmed.toLowerCase());
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-[2px] bg-highlight-soft px-0.5 text-ink">{text.slice(index, index + trimmed.length)}</mark>
      {text.slice(index + trimmed.length)}
    </>
  );
}

interface GlossaryResultRowProps {
  term: GlossaryTerm;
  query: string;
  /** Hide the category label when the previous row showed the same one. */
  showCategory?: boolean;
}

export function GlossaryResultRow({ term, query, showCategory = true }: GlossaryResultRowProps) {
  const category = glossaryCategories.find((item) => item.id === term.category);

  return (
    <li className="group flex items-start gap-3 py-3.5 transition-colors hover:bg-canvas/60">
      <div className="min-w-0 flex-1">
        <Link
          to={`/glossary/${term.slug}`}
          className="inline-flex items-baseline gap-2 text-[15px] font-semibold leading-snug text-ink transition-colors hover:text-accent-strong"
        >
          <span>
            <Highlight text={term.en} query={query} />
          </span>
          {term.abbreviation ? (
            <span className="rounded border border-divider bg-canvas px-1 text-[10.5px] font-medium text-ink-muted">
              {term.abbreviation}
            </span>
          ) : null}
          <ArrowUpRight
            className="size-3.5 shrink-0 text-ink-muted transition-colors group-hover:text-accent"
            aria-hidden="true"
          />
        </Link>
        <p className="mt-0.5 text-[14px] text-accent-strong">
          <Highlight text={term.vi} query={query} />
        </p>
        <p className="mt-1 line-clamp-2 max-w-[62ch] text-[13px] leading-relaxed text-ink-muted">
          {term.definitionVi}
        </p>
        {category && showCategory ? (
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-ink-muted">{category.label.vi}</p>
        ) : null}
      </div>
      <BookmarkButton kind="glossary" id={term.slug} size="sm" />
    </li>
  );
}
