import { ArrowRight, BookOpen, Compass, Languages } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { glossaryCategories } from '@/content/glossaryCategories';
import { phrases } from '@/content/phrases';
import { scenarios } from '@/content/scenarios';
import { useI18n } from '@/hooks/useApp';
import { Button } from '@/components/ui/button';
import { GlossarySearch } from '@/components/glossary/GlossarySearch';
import { EventPathway } from '@/components/home/EventPathway';
import { FeaturedTerm } from '@/components/home/FeaturedTerm';
import { FeaturedScenario } from '@/components/home/FeaturedScenario';
import { ResourceGrid } from '@/components/home/ResourceGrid';
import { EventCategories } from '@/components/home/EventCategories';
import { BilingualBlock } from '@/components/shared/Bilingual';
import { glossaryTerms } from '@/content/glossary';
import { ImageCredit } from '@/components/shared/ImageCredit';
import { imagePath } from '@/lib/imagePath';

export function HeroDocument() {
  const t = useI18n();
  return (
    <figure
      aria-label={t('hero.doc.label')}
      className="relative mx-auto w-full max-w-[30rem] lg:max-w-none"
    >
      {/* Back sheet: a second page peeking out, implying a bound document. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-3 h-full rounded-panel border border-divider/80 bg-surface/70"
      />
      <div className="relative rotate-[-0.6deg] rounded-panel border border-divider-strong/80 bg-surface p-6 shadow-raise sm:p-7">
        <div className="flex items-start justify-between gap-4 border-b border-divider pb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted" lang="en">
              {t('hero.doc.forum.en')}
            </p>
            <p className="mt-1 font-serif text-[13px] italic text-ink-muted" lang="vi">
              {t('hero.doc.forum.vi')}
            </p>
          </div>
          <span className="shrink-0 rounded border border-divider px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">
            EN ⇄ VI
          </span>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {t('label.english')}
            </p>
            <p className="mt-1 font-serif text-[1.05rem] leading-[1.5] text-ink" lang="en">
              {t('hero.doc.sentence.en')}
            </p>
          </div>

          <div className="border-l-2 border-accent/40 pl-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-strong">
              {t('label.vietnamese')}
            </p>
            <p className="mt-1 text-[1.05rem] leading-[1.6] text-ink" lang="vi">
              {t('hero.doc.sentence.vi')}
            </p>
          </div>

          <div className="rounded-lg bg-highlight-soft px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a5518]">
              {t('label.keyTerm')}
            </p>
            <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-serif text-[15px] font-semibold text-ink" lang="en">
                {t('hero.doc.term.en')}
              </span>
              <span className="text-[13px] text-ink-muted" lang="vi">
                {t('hero.doc.term.vi')}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-dashed border-divider pt-3 text-[11px] text-ink-muted">
          <span>{t('hero.doc.session')}</span>
          <span className="flex items-center gap-1">
            <Languages className="size-3" aria-hidden="true" />
            {t('hero.doc.mode')}
          </span>
        </div>
      </div>
    </figure>
  );
}

export default function HomePage() {
  const t = useI18n();

  const featuredTerm = useMemo(() => {
    return { slug: 'memorandum-of-understanding', en: 'Memorandum of Understanding (MOU)' };
  }, []);

  const featuredScenario = scenarios[0];

  const phraseCount = phrases.length;

  return (
    <>
      {/* ------------------------------- Hero -------------------------------- */}
      <section className="relative overflow-hidden border-b border-divider bg-surface">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-32 size-[34rem] rounded-full bg-accent-soft/70 blur-2xl"
        />
        <div className="container-page relative grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center lg:gap-16 lg:py-20">
          <div className="animate-rise">
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-accent/50" aria-hidden="true" />
              {t('home.eyebrow')}
            </p>
            {/* Fluid size: the fixed 3.35rem step overflowed the section's
                overflow-hidden box below ~430px and clipped "Languages." */}
            <h1 className="mt-4 text-[clamp(1.75rem,7.4vw,3.35rem)] font-semibold leading-[1.06] tracking-[-0.025em]">
              <span className="block">Bridge Languages.</span>
              <span className="block">Connect Education.</span>
            </h1>
            <p className="mt-5 max-w-[46ch] font-serif text-[1.15rem] italic leading-snug text-ink-muted">
              {t('home.lede')}
            </p>
            <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-ink-muted">
              {t('home.lede2')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/glossary">
                  {t('glossary.title')}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/scenarios">{t('scenarios.title')}</Link>
              </Button>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-divider pt-5">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-ink-muted">
                  {t('home.stat.terms')}
                </dt>
                <dd className="font-serif text-xl font-semibold text-ink">{glossaryTerms.length}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-ink-muted">
                  {t('home.stat.phrases')}
                </dt>
                <dd className="font-serif text-xl font-semibold text-ink">{phraseCount}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-ink-muted">
                  {t('home.stat.scenarios')}
                </dt>
                <dd className="font-serif text-xl font-semibold text-ink">{scenarios.length}</dd>
              </div>
            </dl>
          </div>

          <div className="animate-rise [animation-delay:120ms]">
            <HeroDocument />
          </div>
        </div>
      </section>

      {/* ---------------------------- Quick search --------------------------- */}
      <section className="container-page -mt-8 pb-4">
        <div className="rounded-panel border border-divider bg-surface p-5 shadow-raise sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[15px] font-semibold text-ink">{t('search.heroLabel')}</h2>
            <p className="text-[12px] text-ink-muted">{t('search.hint')}</p>
          </div>
          <div className="mt-3">
            <GlossarySearch variant="hero" />
          </div>
        </div>
      </section>

      {/* ------------------------- Browse by event --------------------------- */}
      <section className="container-page py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow mb-2">{t('glossary.categories')}</p>
            <h2 className="text-h2 max-w-[26ch]">{t('home.browse.title')}</h2>
            <p className="mt-2 max-w-[60ch] text-sm text-ink-muted">{t('home.browse.lede')}</p>
          </div>
          <Button asChild variant="quiet" size="sm">
            <Link to="/glossary">
              {t('action.viewAll')}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <EventCategories categories={glossaryCategories} />
      </section>

      {/* --------------------------- Pathway -------------------------------- */}
      <section className="border-y border-divider bg-surface">
        <div className="container-page py-14">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">{t('home.pathway.eyebrow')}</p>
            <h2 className="text-h2">{t('home.pathway.title')}</h2>
            <p className="mt-2 text-sm text-ink-muted">{t('home.pathway.lede')}</p>
          </div>
          <EventPathway />
        </div>
      </section>

      {/* ------------------------ Featured term ----------------------------- */}
      <section className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <FeaturedTerm termSlug={featuredTerm.slug} />
          {featuredScenario ? <FeaturedScenario scenario={featuredScenario} /> : null}
        </div>
      </section>

      {/* --------------------------- Photo band ----------------------------- */}
      <section aria-labelledby="field-band-heading" className="border-t border-divider bg-canvas">
        <div className="container-page py-12">
          <h2 id="field-band-heading" className="sr-only">
            {t('home.band.heading')}
          </h2>
          <figure className="overflow-hidden rounded-panel border border-divider">
            <div className="relative h-[14rem] w-full sm:h-[18rem] lg:h-[22rem]">
              <img
                src={imagePath('hero-band.webp')}
                alt={t('home.band.alt')}
                width={1600}
                height={685}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
            <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-t border-divider bg-surface px-4 py-2.5">
              <p className="max-w-[62ch] text-[12.5px] leading-relaxed text-ink-muted">
                {t('home.band.caption')}
              </p>
              <ImageCredit file="hero-band.webp" />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* -------------------------- Resources ------------------------------- */}
      <section className="border-t border-divider bg-surface">
        <div className="container-page py-14">
          <div className="mb-6 max-w-2xl">
            <p className="eyebrow mb-2">{t('home.resources.eyebrow')}</p>
            <h2 className="text-h2">{t('home.resources.title')}</h2>
          </div>
          <ResourceGrid />
        </div>
      </section>

      {/* ---------------------------- CTA ----------------------------------- */}
      <section className="container-page py-14">
        <div className="relative overflow-hidden rounded-panel border border-accent/20 bg-accent-soft px-6 py-10 sm:px-10">
          <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <h2 className="text-h2 max-w-[28ch]">{t('home.cta.title')}</h2>
              <p className="mt-1 max-w-[52ch] text-sm text-ink-muted">{t('home.cta.body')}</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Button asChild>
                <Link to="/guide/types-of-interpreting">
                  <BookOpen className="size-4" aria-hidden="true" />
                  {t('guide.start')}
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/practice">
                  <Compass className="size-4" aria-hidden="true" />
                  {t('practice.title')}
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-8 border-t border-accent/15 pt-5">
            <BilingualBlock
              en="“Prepare the terminology, then practise saying it aloud. Reading a glossary is not the same as being able to produce a term under pressure.”"
              vi="“Hãy chuẩn bị thuật ngữ, rồi luyện nói thành tiếng. Đọc bảng thuật ngữ không giống với việc có thể bật ra thuật ngữ đó dưới áp lực.”"
              label={t('home.cta.note')}
              dense
            />
          </div>
        </div>
      </section>
    </>
  );
}
