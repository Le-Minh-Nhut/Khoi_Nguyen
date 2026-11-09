import { ArrowRight, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scenarios } from '@/content/scenarios';
import { useI18n } from '@/hooks/useApp';
import { PageHeader, StatPill } from '@/components/shared/PageHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Badge } from '@/components/ui/badge';

export default function ScenariosPage() {
  const t = useI18n();

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs items={[{ label: t('nav.scenarios') }]} />
      <PageHeader
        eyebrow={t('nav.learn')}
        title={t('scenarios.title')}
        lede={t('scenarios.lede')}
        meta={
          <>
            <StatPill label="tình huống" value={String(scenarios.length)} />
            <StatPill
              label="lượt thoại"
              value={String(scenarios.reduce((sum, item) => sum + item.dialogue.length, 0))}
            />
          </>
        }
      />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {scenarios.map((scenario, index) => (
          <li key={scenario.slug}>
            <Link
              to={`/scenarios/${scenario.slug}`}
              className="group flex h-full flex-col rounded-panel border border-divider bg-surface p-5 transition-colors hover:border-accent/40"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-serif text-sm font-semibold tabular-nums text-divider-strong">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <MessagesSquare className="size-4 text-accent" aria-hidden="true" />
              </div>

              <h2 className="mt-3 text-[1.15rem] font-semibold leading-snug text-ink transition-colors group-hover:text-accent-strong">
                {scenario.title.vi}
              </h2>
              <p className="mt-0.5 text-[12.5px] text-ink-muted">{scenario.title.en}</p>

              <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-muted">{scenario.setting.vi}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge tone="accent">{scenario.dialogue.length} lượt thoại</Badge>
                <Badge>{scenario.terms.length} thuật ngữ</Badge>
              </div>

              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-strong">
                {t('scenarios.open')}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
