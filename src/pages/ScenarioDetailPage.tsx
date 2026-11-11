import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { scenarios } from '@/content/scenarios';
import type { DialogueTurn } from '@/types/content';
import { useI18n } from '@/hooks/useApp';
import { cn } from '@/lib/cn';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { BookmarkButton, CopyButton } from '@/components/shared/Actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TranslationNote } from '@/components/shared/Bilingual';
import NotFoundPage from './NotFoundPage';

const EMPTY_HIDDEN: Set<number> = new Set();

export default function ScenarioDetailPage() {
  const t = useI18n();
  const { slug } = useParams();
  const index = scenarios.findIndex((item) => item.slug === slug);
  // Per-scenario hidden set, keyed by slug: navigating to another scenario no
  // longer inherits the previous one's hidden turn indexes.
  const [hiddenBySlug, setHiddenBySlug] = useState<Record<string, Set<number>>>({});

  if (index === -1) return <NotFoundPage />;

  const scenario = scenarios[index];
  const hidden = hiddenBySlug[scenario.slug] ?? EMPTY_HIDDEN;
  const previous = index > 0 ? scenarios[index - 1] : null;
  const next = index < scenarios.length - 1 ? scenarios[index + 1] : null;

  const allHidden = hidden.size === scenario.dialogue.length;

  const toggleAll = () =>
    setHiddenBySlug((current) => ({
      ...current,
      [scenario.slug]: allHidden ? new Set() : new Set(scenario.dialogue.map((_, i) => i)),
    }));

  const toggleOne = (turn: number) =>
    setHiddenBySlug((current) => {
      const copy = new Set(current[scenario.slug] ?? []);
      if (copy.has(turn)) copy.delete(turn);
      else copy.add(turn);
      return { ...current, [scenario.slug]: copy };
    });

  const dialogueText = scenario.dialogue
    .map((turn) => `${turn.speaker.vi} (${turn.role.vi})\nEN: ${turn.en}\nVI: ${turn.vi}`)
    .join('\n\n');

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs
        items={[
          { label: t('nav.scenarios'), to: '/scenarios' },
          { label: scenario.title.vi },
        ]}
      />

      <header className="border-b border-divider pb-6">
        <p className="eyebrow mb-2">
          {t('scenarios.title')} · {String(index + 1).padStart(2, '0')}
        </p>
        <h1 className="text-[1.9rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[2.3rem]">
          {scenario.title.vi}
        </h1>
        <p className="mt-1 font-serif text-[1.05rem] italic text-ink-muted">{scenario.title.en}</p>
        <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-ink">{scenario.overview.vi}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <BookmarkButton kind="scenarios" id={scenario.slug} withLabel />
          <CopyButton text={dialogueText} label={t('scenarios.copyDialogue')} />
        </div>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
        <div className="min-w-0">
          <section aria-labelledby="objectives-heading" className="rounded-card border border-divider bg-canvas/50 p-5">
            <h2 id="objectives-heading" className="eyebrow mb-2">
              {t('label.communicationObjectives')}
            </h2>
            <ul className="space-y-1.5">
              {scenario.objectives.map((objective) => (
                <li key={objective.en} className="flex gap-2 text-[14px] leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  <span lang="vi">{objective.vi}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="dialogue-heading" className="mt-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-divider pb-2">
              <h2 id="dialogue-heading" className="text-h3 font-serif">
                {t('label.dialogue')}
              </h2>
              <Button variant="ghost" size="sm" onClick={toggleAll} className="text-ink-muted">
                {allHidden ? <Eye className="size-4" aria-hidden="true" /> : <EyeOff className="size-4" aria-hidden="true" />}
                {allHidden ? t('action.showAll') : t('action.hideAll')}
              </Button>
            </div>

            <ol className="space-y-3">
              {scenario.dialogue.map((turn, turnIndex) => (
                <DialogueTurnCard
                  key={`${turn.speaker.en}-${turnIndex}`}
                  turn={turn}
                  index={turnIndex}
                  translationHidden={hidden.has(turnIndex)}
                  onToggle={() => toggleOne(turnIndex)}
                />
              ))}
            </ol>
          </section>

          <section aria-labelledby="tips-heading" className="mt-8 rounded-card border border-accent/20 bg-accent-soft/50 p-5">
            <h2 id="tips-heading" className="text-h3 mb-2 font-serif">
              {t('label.tips')}
            </h2>
            <ul className="space-y-2">
              {scenario.tips.map((tip) => (
                <li key={tip.en} className="flex gap-2.5 text-[14px] leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  <span lang="vi">{tip.vi}</span>
                </li>
              ))}
            </ul>
          </section>

          <nav aria-label={t('nav.scenarios')} className="mt-10 flex flex-wrap justify-between gap-3 border-t border-divider pt-6">
            {previous ? (
              <Link
                to={`/scenarios/${previous.slug}`}
                className="flex max-w-[48%] min-w-0 flex-col rounded-lg border border-divider px-3.5 py-2.5 transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
              >
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-ink-muted">
                  <ArrowLeft className="size-3" aria-hidden="true" />
                  {t('action.previous')}
                </span>
                <span className="mt-0.5 truncate text-[14px] font-medium text-ink">{previous.title.vi}</span>
              </Link>
            ) : (
              <span aria-hidden="true" className="flex-1" />
            )}
            {next ? (
              <Link
                to={`/scenarios/${next.slug}`}
                className="flex max-w-[48%] min-w-0 flex-col items-end rounded-lg border border-divider px-3.5 py-2.5 text-right transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
              >
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-ink-muted">
                  {t('action.next')}
                  <ArrowRight className="size-3" aria-hidden="true" />
                </span>
                <span className="mt-0.5 truncate text-[14px] font-medium text-ink">{next.title.vi}</span>
              </Link>
            ) : (
              <span aria-hidden="true" className="flex-1" />
            )}
          </nav>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-divider bg-surface p-4">
            <h2 className="eyebrow mb-2 flex items-center gap-1.5">
              <Users className="size-3.5" aria-hidden="true" />
              {t('label.roles')}
            </h2>
            <ul className="space-y-1.5">
              {scenario.roles.map((role) => (
                <li key={role.en} className="text-[13px] leading-snug text-ink">
                  {role.vi}
                  <span className="block text-[11.5px] text-ink-muted">{role.en}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-divider bg-canvas/60 p-4">
            <h2 className="eyebrow mb-2">{t('label.importantTerms')}</h2>
            <ul className="space-y-2">
              {scenario.terms.map((term) => (
                <li key={term.en} className="text-[13px] leading-snug">
                  {term.slug ? (
                    <Link
                      to={`/glossary/${term.slug}`}
                      className="font-medium text-accent-strong hover:underline"
                    >
                      {term.en}
                    </Link>
                  ) : (
                    <span className="font-medium text-ink">{term.en}</span>
                  )}
                  <span className="block text-[12px] text-ink-muted">{term.vi}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/glossary"
              className="mt-3 inline-flex items-center gap-1 text-[12.5px] text-ink-muted hover:text-accent-strong"
            >
              {t('glossary.title')}
              <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-card border border-divider bg-surface p-4">
            <p className="eyebrow mb-1">{t('label.setting')}</p>
            <p className="text-[13px] leading-relaxed text-ink-muted">{scenario.setting.vi}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge>{scenario.dialogue.length} lượt</Badge>
              <Badge>{scenario.tips.length} mẹo</Badge>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function DialogueTurnCard({
  turn,
  index,
  translationHidden,
  onToggle,
}: {
  turn: DialogueTurn;
  index: number;
  translationHidden: boolean;
  onToggle: () => void;
}) {
  const t = useI18n();
  const isEven = index % 2 === 0;

  return (
    <li
      className={cn(
        'rounded-card border border-divider p-4 sm:p-5',
        isEven ? 'bg-surface' : 'bg-canvas/60',
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-divider pb-2">
        <div>
          <p className="text-[13.5px] font-semibold text-ink">{turn.speaker.vi}</p>
          <p className="text-[11.5px] uppercase tracking-[0.08em] text-ink-muted">{turn.role.vi}</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-1.5 rounded-md border border-divider bg-surface px-2 py-1 text-[11.5px] text-ink-muted transition-colors hover:border-accent/40 hover:text-accent-strong"
          aria-pressed={!translationHidden}
        >
          {translationHidden ? (
            <Eye className="size-3" aria-hidden="true" />
          ) : (
            <EyeOff className="size-3" aria-hidden="true" />
          )}
          {translationHidden ? t('action.showTranslation') : t('action.hideTranslation')}
        </button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-6">
        <div>
          <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {t('label.english')}
          </p>
          <p className="font-serif text-[1rem] leading-relaxed text-ink" lang="en">
            {turn.en}
          </p>
        </div>
        <div className="border-t border-dashed border-divider pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-accent-strong">
            {t('label.vietnamese')}
          </p>
          {translationHidden ? (
            <p className="text-[13px] italic text-ink-muted">— {t('action.showTranslation')} —</p>
          ) : (
            <p className="text-[1rem] leading-relaxed text-ink" lang="vi">
              {turn.vi}
            </p>
          )}
        </div>
      </div>

      {turn.note && !translationHidden ? (
        <TranslationNote className="mt-3 px-3 py-2 text-[12.5px]">
          <span className="font-semibold">{t('label.note')}: </span>
          {turn.note.vi}
        </TranslationNote>
      ) : null}
    </li>
  );
}
