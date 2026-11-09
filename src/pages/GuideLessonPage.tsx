import { ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { lessons } from '@/content/lessons';
import { glossaryTerms } from '@/content/glossary';
import { useActiveSection, useI18n } from '@/hooks/useApp';
import { cn } from '@/lib/cn';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { BilingualBlock, TranslationNote } from '@/components/shared/Bilingual';
import { BookmarkButton } from '@/components/shared/Actions';
import { Badge } from '@/components/ui/badge';
import NotFoundPage from './NotFoundPage';

function slugifyHeading(text: string, index: number) {
  return `section-${index}-${text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40)}`;
}

export default function GuideLessonPage() {
  const t = useI18n();
  const navigate = useNavigate();
  const { slug } = useParams();
  const index = lessons.findIndex((item) => item.slug === slug);

  const headingIds = useMemo(() => {
    if (index === -1) return [];
    return lessons[index].sections.map((section, i) => slugifyHeading(section.heading.vi, i));
  }, [index]);

  const activeId = useActiveSection(headingIds);

  if (index === -1) return <NotFoundPage />;

  const lesson = lessons[index];
  const previous = index > 0 ? lessons[index - 1] : null;
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;
  const related = lesson.relatedTerms
    .map((termSlug) => glossaryTerms.find((term) => term.slug === termSlug))
    .filter((term): term is NonNullable<typeof term> => term !== undefined);

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs
        items={[
          { label: t('nav.guide'), to: '/guide' },
          { label: `Chương ${lesson.number}` },
        ]}
      />

      {/* Mobile: chapter picker only, so the article starts near the top. */}
      <div className="mb-6 lg:hidden">
        <label htmlFor="chapter-select" className="eyebrow mb-1.5 block">
          {t('label.chapters')}
        </label>
        <select
          id="chapter-select"
          value={lesson.slug}
          onChange={(event) => navigate(`/guide/${event.target.value}`)}
          className="h-11 w-full rounded-lg border border-divider-strong bg-surface px-3 text-[14px] text-ink"
        >
          {lessons.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.number}. {item.title.vi}
            </option>
          ))}
        </select>
        <details className="mt-2 rounded-lg border border-divider bg-surface px-3 py-2">
          <summary className="cursor-pointer text-[13px] font-medium text-ink-muted">
            {t('guide.inThisChapter')} ({lesson.sections.length})
          </summary>
          <ol className="mt-2 space-y-1">
            {lesson.sections.map((section, i) => (
              <li key={headingIds[i]}>
                <a href={`#${headingIds[i]}`} className="block py-0.5 text-[12.5px] text-ink-muted">
                  {i + 1}. {section.heading.vi}
                </a>
              </li>
            ))}
          </ol>
        </details>
      </div>

      <div className="grid gap-10 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-12">
        {/* Desktop: the chapter rail doubles as navigation and progress. */}
        <aside aria-label={t('label.chapters')} className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <div className="rounded-card border border-divider bg-surface">
            <div className="border-b border-divider px-4 py-3">
              <p className="eyebrow">{t('label.chapters')}</p>
            </div>
            <nav className="max-h-[52vh] overflow-y-auto p-2 scrollbar-slim">
              <ol className="space-y-0.5">
                {lessons.map((item) => {
                  const current = item.slug === lesson.slug;
                  return (
                    <li key={item.slug}>
                      <Link
                        to={`/guide/${item.slug}`}
                        aria-current={current ? 'page' : undefined}
                        className={cn(
                          'flex gap-2 rounded-md px-2.5 py-2 text-[13px] leading-snug transition-colors',
                          current
                            ? 'bg-accent-soft font-medium text-accent-strong'
                            : 'text-ink-muted hover:bg-canvas hover:text-ink',
                        )}
                      >
                        <span className="tabular-nums text-[11px] text-ink-muted/70">{item.number}</span>
                        <span className="min-w-0">{item.title.vi}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>
            <div className="border-t border-divider px-4 py-3">
              <p className="eyebrow mb-2">{t('guide.inThisChapter')}</p>
              <ol className="space-y-1">
                {lesson.sections.map((section, i) => (
                  <li key={headingIds[i]}>
                    <a
                      href={`#${headingIds[i]}`}
                      className={cn(
                        'block py-0.5 text-[12.5px] leading-snug transition-colors hover:text-accent-strong',
                        activeId === headingIds[i] ? 'font-medium text-accent-strong' : 'text-ink-muted',
                      )}
                    >
                      {i + 1}. {section.heading.vi}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </aside>

        <article className="min-w-0 max-w-[46rem]">
          <header className="border-b border-divider pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">
                {t('guide.chapter')} {lesson.number}
              </Badge>
              <Badge>{lesson.readingMinutes} {t('label.readingTime')}</Badge>
            </div>
            <h1 className="mt-3 text-[1.9rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[2.3rem]">
              {lesson.title.vi}
            </h1>
            <p className="mt-1 font-serif text-[1.05rem] italic text-ink-muted">{lesson.title.en}</p>
            <p className="prose-guide mt-4 text-[15px]">{lesson.summary.vi}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <BookmarkButton kind="lessons" id={lesson.slug} withLabel />
            </div>
          </header>

          <section aria-labelledby="objectives-heading" className="mt-7 rounded-card border border-divider bg-canvas/50 p-5">
            <h2 id="objectives-heading" className="eyebrow mb-2">
              {t('label.objectives')}
            </h2>
            <ul className="space-y-1.5">
              {lesson.objectives.map((objective) => (
                <li key={objective.en} className="flex gap-2 text-[14px] leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  <span>{objective.vi}</span>
                </li>
              ))}
            </ul>
          </section>

          {lesson.sections.map((section, i) => (
            <section key={headingIds[i]} id={headingIds[i]} className="mt-10 scroll-mt-24">
              <h2 className="text-h3 border-b border-divider pb-2 font-serif">{section.heading.vi}</h2>
              <p className="mt-1 text-[12.5px] uppercase tracking-[0.08em] text-ink-muted/80">
                {section.heading.en}
              </p>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.en.slice(0, 40)} className="prose-guide mt-3">
                  {paragraph.vi}
                </p>
              ))}

              {section.bullets ? (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.en} className="flex gap-2.5 text-[15px] leading-relaxed text-ink">
                      <span aria-hidden="true" className="mt-2.5 h-px w-2.5 shrink-0 bg-accent" />
                      <span>{bullet.vi}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.example ? (
                <div className="mt-4 rounded-card border border-divider bg-surface p-4">
                  {section.example.label ? (
                    <p className="eyebrow mb-2">{section.example.label.vi}</p>
                  ) : null}
                  <BilingualBlock
                    en={section.example.source.en}
                    vi={section.example.source.vi}
                    dense
                  />
                  {section.example.note ? (
                    <TranslationNote className="mt-3">
                      <p>{section.example.note.vi}</p>
                      <p className="mt-1.5 border-t border-highlight/50 pt-1.5 text-[12px] text-[#7a5a20]">
                        {section.example.note.en}
                      </p>
                    </TranslationNote>
                  ) : null}
                </div>
              ) : null}

              {section.table ? (
                <div className="mt-4 overflow-x-auto rounded-card border border-divider">
                  <table className="w-full min-w-[34rem] border-collapse text-left text-[13.5px]">
                    {section.table.caption ? (
                      <caption className="border-b border-divider bg-canvas px-3.5 py-2 text-left text-[12px] font-medium text-ink-muted">
                        {section.table.caption.vi}
                      </caption>
                    ) : null}
                    <thead>
                      <tr className="border-b border-divider bg-canvas/60">
                        {section.table.headers.map((header) => (
                          <th key={header.en} scope="col" className="px-3.5 py-2 font-semibold text-ink">
                            {header.vi}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]?.en} className="border-b border-divider/70 last:border-0">
                          {row.map((cell, cellIndex) => (
                            <td
                              key={`${cell.en}-${cellIndex}`}
                              className={cn('px-3.5 py-2 align-top', cellIndex === 0 ? 'font-medium text-ink' : 'text-ink-muted')}
                            >
                              {cell.vi}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {section.note ? (
                <TranslationNote className="mt-3">
                  <span className="font-semibold">{t('label.note')}: </span>
                  {section.note.vi}
                </TranslationNote>
              ) : null}
            </section>
          ))}

          <section aria-labelledby="takeaways-heading" className="mt-10 rounded-card border border-accent/20 bg-accent-soft/60 p-5">
            <h2 id="takeaways-heading" className="text-h3 mb-3 font-serif">
              {t('label.takeaways')}
            </h2>
            <ul className="space-y-2">
              {lesson.takeaways.map((takeaway) => (
                <li key={takeaway.en} className="flex gap-2.5 text-[14px] leading-relaxed text-ink">
                  <Bookmark aria-hidden="true" className="mt-1 size-3.5 shrink-0 text-accent" />
                  <span>{takeaway.vi}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="tips-heading" className="mt-6">
            <h2 id="tips-heading" className="text-h3 mb-2 font-serif">
              {t('label.tips')}
            </h2>
            <ul className="space-y-1.5">
              {lesson.tips.map((tip) => (
                <li key={tip.en} className="flex gap-2 text-[14px] leading-relaxed text-ink-muted">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-ink-muted/40" />
                  <span>{tip.vi}</span>
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 ? (
            <section aria-labelledby="related-terms-heading" className="mt-8 border-t border-divider pt-5">
              <h2 id="related-terms-heading" className="text-h3 mb-3 font-serif">
                {t('label.related')}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {related.map((term) => (
                  <li key={term.slug}>
                    <Link
                      to={`/glossary/${term.slug}`}
                      className="inline-flex items-baseline gap-1.5 rounded-md border border-divider bg-surface px-2.5 py-1.5 text-[13px] transition-colors hover:border-accent/40 hover:bg-accent-soft/50"
                    >
                      <span className="font-medium text-ink">{term.en}</span>
                      <span className="text-ink-muted">{term.vi}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <nav aria-label={t('label.chapters')} className="mt-10 flex flex-wrap justify-between gap-3 border-t border-divider pt-6">
            {previous ? (
              <Link
                to={`/guide/${previous.slug}`}
                className="group flex max-w-[48%] min-w-0 flex-col rounded-lg border border-divider px-3.5 py-2.5 transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
              >
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-ink-muted">
                  <ArrowLeft className="size-3" aria-hidden="true" />
                  {t('guide.prev')}
                </span>
                <span className="mt-0.5 truncate text-[14px] font-medium text-ink">{previous.title.vi}</span>
              </Link>
            ) : (
              <span aria-hidden="true" className="flex-1" />
            )}
            {next ? (
              <Link
                to={`/guide/${next.slug}`}
                className="group flex max-w-[48%] min-w-0 flex-col items-end rounded-lg border border-divider px-3.5 py-2.5 text-right transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
              >
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-ink-muted">
                  {t('guide.next')}
                  <ArrowRight className="size-3" aria-hidden="true" />
                </span>
                <span className="mt-0.5 truncate text-[14px] font-medium text-ink">{next.title.vi}</span>
              </Link>
            ) : (
              <Link
                to="/practice"
                className="flex max-w-[48%] flex-col items-end rounded-lg border border-accent/30 bg-accent-soft px-3.5 py-2.5 text-right transition-colors hover:bg-accent-soft/70"
              >
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-accent-strong">
                  {t('practice.title')}
                  <ArrowRight className="size-3" aria-hidden="true" />
                </span>
                <span className="mt-0.5 text-[14px] font-medium text-ink">{t('practice.quiz')}</span>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}
