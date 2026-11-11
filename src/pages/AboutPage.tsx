import { BookOpen, Compass, ShieldCheck, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/hooks/useApp';
import { PageHeader, StatPill } from '@/components/shared/PageHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { glossaryTerms } from '@/content/glossary';
import { phrases } from '@/content/phrases';
import { lessons } from '@/content/lessons';
import { scenarios } from '@/content/scenarios';
import { Button } from '@/components/ui/button';
import { ImageCredit } from '@/components/shared/ImageCredit';
import { imageCredits } from '@/content/imageCredits';
import { imagePath } from '@/lib/imagePath';
import type { UiKey } from '@/content/translations';

const audienceKeys: UiKey[] = [
  'about.audience.1',
  'about.audience.2',
  'about.audience.3',
  'about.audience.4',
  'about.audience.5',
];

const featureKeys: Array<{ icon: typeof BookOpen; body: UiKey; to: string; cta: UiKey }> = [
  { icon: BookOpen, body: 'about.feature.glossary', to: '/glossary', cta: 'nav.glossary' },
  { icon: Compass, body: 'about.feature.phrases', to: '/phrase-bank', cta: 'nav.phrases' },
  { icon: Target, body: 'about.feature.guide', to: '/guide', cta: 'nav.guide' },
  { icon: Users, body: 'about.feature.scenarios', to: '/scenarios', cta: 'nav.scenarios' },
  { icon: ShieldCheck, body: 'about.feature.toolkit', to: '/toolkit', cta: 'nav.toolkit' },
];

export default function AboutPage() {
  const t = useI18n();

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs items={[{ label: t('nav.about') }]} />
      <PageHeader
        eyebrow={t('nav.about')}
        title={t('about.title')}
        lede={t('about.lede')}
        meta={
          <>
            <StatPill label={t('label.terms')} value={String(glossaryTerms.length)} />
            <StatPill label={t('nav.phrases')} value={String(phrases.length)} />
            <StatPill label={t('label.chapters')} value={String(lessons.length)} />
            <StatPill label={t('nav.scenarios')} value={String(scenarios.length)} />
          </>
        }
      />

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 max-w-[68ch]">
          <figure className="mb-8 overflow-hidden rounded-panel border border-divider">
            <img
              src={imagePath('about-venue.webp')}
              alt={t('about.venueAlt')}
              width={1100}
              height={619}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-cover"
            />
            <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-t border-divider bg-surface px-3.5 py-2">
              <span className="text-[12px] text-ink-muted">{t('about.venueCaption')}</span>
              <ImageCredit file="about-venue.webp" />
            </figcaption>
          </figure>

          <section aria-labelledby="background">
            <h2 id="background" className="text-h2 mb-3">
              {t('about.background')}
            </h2>
            <p className="prose-guide">{t('about.background.p1')}</p>
            <p className="prose-guide mt-3">{t('about.background.p2')}</p>
          </section>

          <section aria-labelledby="mission" className="mt-10">
            <h2 id="mission" className="text-h2 mb-3">
              {t('about.mission')}
            </h2>
            <p className="prose-guide">{t('about.mission.body')}</p>
          </section>

          <section aria-labelledby="vision" className="mt-10">
            <h2 id="vision" className="text-h2 mb-3">
              {t('about.vision')}
            </h2>
            <p className="prose-guide">{t('about.vision.body')}</p>
          </section>

          <section aria-labelledby="audience" className="mt-10">
            <h2 id="audience" className="text-h2 mb-3">
              {t('about.audience')}
            </h2>
            <ul className="space-y-2">
              {audienceKeys.map((key) => (
                <li key={key} className="flex gap-3 border-b border-divider pb-2 text-[14.5px]">
                  <span className="flex-1 text-ink">{t(key)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="features" className="mt-10">
            <h2 id="features" className="text-h2 mb-3">
              {t('about.features')}
            </h2>
            <ul className="space-y-3">
              {featureKeys.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.to} className="flex gap-3 rounded-lg border border-divider bg-surface p-4">
                    <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] leading-relaxed text-ink">{t(feature.body)}</p>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="self-center">
                      <Link to={feature.to}>{t(feature.cta)}</Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="credits" className="mt-10">
            <h2 id="credits" className="text-h2 mb-2">
              {t('about.credits')}
            </h2>
            <p className="mb-3 max-w-[62ch] text-[13px] leading-relaxed text-ink-muted">
              {t('about.credits.lede2')}
            </p>
            <ul className="divide-y divide-divider rounded-card border border-divider bg-surface">
              {imageCredits.map((credit) => (
                <li
                  key={credit.file}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-3.5 py-2.5"
                >
                  <span className="min-w-0 text-[12.5px] text-ink">{credit.author}</span>
                  <a
                    href={credit.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-ink-muted underline-offset-2 hover:text-accent-strong hover:underline"
                    title={credit.title}
                  >
                    {credit.license}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="disclaimer"
            className="mt-10 rounded-card border border-highlight/70 bg-highlight-soft p-5"
          >
            <h2 id="disclaimer" className="text-h3 mb-2 text-[#4d370f]">
              {t('about.disclaimer')}
            </h2>
            <p className="text-[13.5px] leading-relaxed text-[#5f4413]">{t('footer.disclaimer')}</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-[#5f4413]">{t('about.disclaimerEn')}</p>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-divider bg-canvas/60 p-4">
            <h2 className="eyebrow mb-2">{t('about.principles')}</h2>
            <ul className="space-y-2 text-[13px] leading-relaxed text-ink-muted">
              <li>{t('about.principles.1')}</li>
              <li>{t('about.principles.2')}</li>
              <li>{t('about.principles.3')}</li>
              <li>{t('about.principles.4')}</li>
            </ul>
          </div>

          <div className="rounded-card border border-divider bg-surface p-4">
            <h2 className="eyebrow mb-2">{t('about.tech')}</h2>
            <p className="text-[13px] leading-relaxed text-ink-muted">{t('about.tech.body')}</p>
          </div>

          <div className="rounded-card border border-divider bg-accent-soft/60 p-4">
            <h2 className="eyebrow mb-1">{t('about.start')}</h2>
            <p className="text-[13px] leading-relaxed text-ink-muted">{t('about.start.body')}</p>
            <Button asChild size="sm" className="mt-3">
              <Link to="/guide/types-of-interpreting">{t('guide.start')}</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
