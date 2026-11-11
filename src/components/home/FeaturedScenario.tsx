import { ArrowRight, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Scenario } from '@/types/content';
import { useI18n } from '@/hooks/useApp';
import { useSettings } from '@/app/SettingsProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function FeaturedScenario({ scenario }: { scenario: Scenario }) {
  const t = useI18n();
  const { uiLang } = useSettings();
  const other = uiLang === 'vi' ? 'en' : 'vi';
  const firstTurn = scenario.dialogue[0];

  return (
    <article
      aria-labelledby="featured-scenario-heading"
      className="flex flex-col rounded-panel border border-divider bg-canvas/50 p-6 sm:p-7"
    >
      <div className="mb-3 flex items-center gap-2">
        <MessagesSquare className="size-4 text-accent" aria-hidden="true" />
        <p className="eyebrow">{t('scenarios.title')}</p>
      </div>

      <h2 id="featured-scenario-heading" className="text-h3 font-serif" lang={uiLang}>
        {scenario.title[uiLang]}
      </h2>
      <p className="mt-0.5 text-[13.5px] text-ink-muted" lang={other}>
        {scenario.title[other]}
      </p>

      <p className="mt-3 text-[14px] leading-relaxed text-ink-muted" lang={uiLang}>
        {scenario.setting[uiLang]}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge tone="accent">
          {scenario.dialogue.length} {t('label.turns')}
        </Badge>
        <Badge>
          {scenario.terms.length} {t('label.terms')}
        </Badge>
      </div>

      {firstTurn ? (
        <div className="mt-5 flex-1 rounded-xl border border-divider bg-surface px-4 py-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
            {firstTurn.speaker.vi} · {firstTurn.role.vi}
          </p>
          <p className="mt-1.5 font-serif text-[14.5px] leading-relaxed text-ink" lang="en">
            “{firstTurn.en}”
          </p>
          <p
            className="mt-1.5 border-t border-dashed border-divider pt-1.5 text-[13.5px] leading-relaxed text-ink-muted"
            lang="vi"
          >
            “{firstTurn.vi}”
          </p>
        </div>
      ) : null}

      <Button asChild className="mt-5 self-start" size="sm">
        <Link to={`/scenarios/${scenario.slug}`}>
          {t('scenarios.open')}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </Button>
    </article>
  );
}
