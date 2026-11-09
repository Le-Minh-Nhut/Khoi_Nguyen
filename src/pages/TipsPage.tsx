import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Info, Lightbulb } from 'lucide-react';
import { tips } from '@/content/tips';
import { useI18n } from '@/hooks/useApp';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { BookmarkButton } from '@/components/shared/Actions';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';

export default function TipsPage() {
  const t = useI18n();
  const [activeId, setActiveId] = useState<string>(tips[0]?.id ?? '');

  const active = useMemo(() => tips.find((tip) => tip.id === activeId) ?? tips[0], [activeId]);

  if (!active) return null;

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs items={[{ label: t('nav.tips') }]} />
      <PageHeader eyebrow={t('nav.learn')} title={t('tips.title')} lede={t('tips.lede')} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
        <nav aria-label={t('tips.title')} className="lg:sticky lg:top-24 lg:self-start">
          <ol className="space-y-0.5">
            {tips.map((tip) => (
              <li key={tip.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(tip.id)}
                  aria-current={tip.id === active.id ? 'true' : undefined}
                  className={cn(
                    'flex w-full gap-2 rounded-md px-2.5 py-2 text-left text-[13px] leading-snug transition-colors',
                    tip.id === active.id
                      ? 'bg-accent-soft font-medium text-accent-strong'
                      : 'text-ink-muted hover:bg-canvas hover:text-ink',
                  )}
                >
                  <span className="tabular-nums text-[11px] text-ink-muted/70">
                    {String(tip.number).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">{tip.title.vi}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0 max-w-[46rem]">
          <header className="border-b border-divider pb-5">
            <p className="eyebrow mb-2">
              Lỗi {String(active.number).padStart(2, '0')} / {tips.length}
            </p>
            <h2 className="text-h2 font-serif">{active.title.vi}</h2>
            <p className="mt-0.5 text-[14px] text-ink-muted">{active.title.en}</p>
            <div className="mt-3">
              <BookmarkButton kind="lessons" id={`tip:${active.id}`} withLabel size="sm" />
            </div>
          </header>

          <section className="mt-6">
            <h3 className="eyebrow mb-2 flex items-center gap-1.5">
              <AlertTriangle className="size-3.5" aria-hidden="true" />
              {t('label.problem')}
            </h3>
            <p className="prose-guide">{active.problem.vi}</p>
          </section>

          <section className="mt-6">
            <h3 className="eyebrow mb-2">{t('label.example')}</h3>
            <div className="rounded-card border border-error/20 bg-error-soft/50 p-4">
              <p className="text-[14px] leading-relaxed text-[#7a1f17]">{active.example.vi}</p>
              <p className="mt-2 border-t border-error/15 pt-2 text-[12.5px] leading-relaxed text-[#8c3a32]">
                {active.example.en}
              </p>
            </div>
          </section>

          <section className="mt-6">
            <h3 className="eyebrow mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              {t('label.better')}
            </h3>
            <div className="rounded-card border border-success/25 bg-success-soft/70 p-4">
              <p className="font-serif text-[1rem] leading-relaxed text-[#154c34]">{active.better.vi}</p>
              <p className="mt-2 border-t border-success/20 pt-2 text-[12.5px] leading-relaxed text-[#2b6047]">
                {active.better.en}
              </p>
            </div>
          </section>

          <section className="mt-6">
            <h3 className="eyebrow mb-2 flex items-center gap-1.5">
              <Info className="size-3.5" aria-hidden="true" />
              {t('label.why')}
            </h3>
            <p className="prose-guide">{active.explanation.vi}</p>
            <p className="mt-1.5 max-w-[70ch] text-[13px] leading-relaxed text-ink-muted">{active.explanation.en}</p>
          </section>

          <section className="mt-6">
            <h3 className="eyebrow mb-2 flex items-center gap-1.5">
              <Lightbulb className="size-3.5" aria-hidden="true" />
              {t('label.advice')}
            </h3>
            <ul className="space-y-1.5">
              {active.advice.map((advice) => (
                <li key={advice.en} className="flex gap-2.5 text-[14.5px] leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-2.5 h-px w-2.5 shrink-0 bg-accent" />
                  <span>{advice.vi}</span>
                </li>
              ))}
            </ul>
          </section>

          {active.relatedTerms && active.relatedTerms.length > 0 ? (
            <section className="mt-8 border-t border-divider pt-5">
              <h3 className="eyebrow mb-2">{t('label.related')}</h3>
              <ul className="flex flex-wrap gap-2">
                {active.relatedTerms.map((term) => (
                  <li key={term}>
                    <a
                      href={`/glossary/${term}`}
                      className="inline-flex items-center gap-1 rounded-md border border-divider bg-surface px-2.5 py-1 text-[13px] text-accent-strong transition-colors hover:border-accent/40 hover:bg-accent-soft/60"
                    >
                      {term.replace(/-/g, ' ')}
                      <ArrowRight className="size-3" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-divider pt-5">
            <Button
              variant="secondary"
              size="sm"
              disabled={active.number === 1}
              onClick={() => {
                const prev = tips.find((tip) => tip.number === active.number - 1);
                if (prev) setActiveId(prev.id);
              }}
            >
              {t('action.previous')}
            </Button>
            <span className="text-[12px] text-ink-muted">
              {active.number} / {tips.length}
            </span>
            <Button
              size="sm"
              disabled={active.number === tips.length}
              onClick={() => {
                const nxt = tips.find((tip) => tip.number === active.number + 1);
                if (nxt) setActiveId(nxt.id);
              }}
            >
              {t('action.next')}
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
