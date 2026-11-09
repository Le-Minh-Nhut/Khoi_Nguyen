import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { glossaryTerms } from '@/content/glossary';
import { useI18n } from '@/hooks/useApp';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/shared/Actions';

/** One term, rendered as an editorial excerpt rather than a card in a grid. */
export function FeaturedTerm({ termSlug }: { termSlug: string }) {
  const t = useI18n();
  const term = glossaryTerms.find((item) => item.slug === termSlug) ?? glossaryTerms[0];

  if (!term) {
    return (
      <div className="rounded-card border border-dashed border-divider p-6 text-sm text-ink-muted">
        {t('saved.missing')}
      </div>
    );
  }

  return (
    <article aria-labelledby="featured-term-heading" className="flex flex-col">
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="size-4 text-accent" aria-hidden="true" />
        <p className="eyebrow">{t('label.keyTerm')}</p>
      </div>

      <h2 id="featured-term-heading" className="text-h2 font-serif">
        {term.en}
      </h2>
      <p className="mt-1 font-serif text-lg text-accent-strong">{term.vi}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {term.abbreviation ? <Badge tone="accent">{term.abbreviation}</Badge> : null}
        <Badge>{term.category.replace(/-/g, ' ')}</Badge>
      </div>

      <dl className="mt-5 space-y-4 border-t border-divider pt-5">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {t('label.definition')}
          </dt>
          <dd className="mt-1 text-[15px] leading-relaxed text-ink">{term.definitionVi}</dd>
          <dd className="mt-1 text-[13.5px] leading-relaxed text-ink-muted">{term.definitionEn}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {t('label.example')}
          </dt>
          <dd className="mt-1 font-serif text-[15px] italic leading-relaxed text-ink">“{term.exampleEn}”</dd>
          <dd className="mt-0.5 text-[14px] leading-relaxed text-ink-muted">“{term.exampleVi}”</dd>
        </div>
      </dl>

      {term.note ? (
        <p className="mt-4 rounded-lg border border-highlight/60 bg-highlight-soft px-3.5 py-2.5 text-[13px] leading-relaxed text-[#5f4413]">
          <span className="font-semibold">{t('label.note')}: </span>
          {term.note.vi}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Button asChild variant="secondary" size="sm">
          <Link to={`/glossary/${term.slug}`}>
            {t('glossary.detailBack')}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </Button>
        <CopyButton
          size="sm"
          withLabel
          label={t('action.copy')}
          text={`${term.en} — ${term.vi}\n${term.definitionVi}`}
        />
      </div>
    </article>
  );
}
