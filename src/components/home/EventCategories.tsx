import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { GlossaryCategory } from '@/types/content';

/** Eight domains as a numbered ledger — the structure carries the meaning. */
export function EventCategories({ categories }: { categories: GlossaryCategory[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-card border border-divider bg-divider sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category, index) => (
        <li key={category.id} className="bg-surface">
          <Link
            to={`/glossary?category=${category.id}`}
            className="group flex h-full flex-col p-4 transition-colors hover:bg-accent-soft/60 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-serif text-[13px] font-semibold tabular-nums text-ink-muted/70">
                {String(index + 1).padStart(2, '0')}
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-ink-muted/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </div>
            <div className="mt-auto pt-8">
              <h3 className="text-[15px] font-semibold leading-snug text-ink">{category.label.vi}</h3>
              <p className="mt-0.5 text-[12.5px] leading-snug text-ink-muted">{category.label.en}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
