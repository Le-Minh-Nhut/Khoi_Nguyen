import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lessons } from '@/content/lessons';
import { useI18n } from '@/hooks/useApp';
import { PageHeader, StatPill } from '@/components/shared/PageHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Badge } from '@/components/ui/badge';

export default function GuidePage() {
  const t = useI18n();
  const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.readingMinutes, 0);
  const first = lessons[0];

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs items={[{ label: t('nav.guide') }]} />
      <PageHeader
        eyebrow={t('nav.learn')}
        title={t('guide.title')}
        lede={t('guide.lede')}
        meta={
          <>
            <StatPill label={t('label.chapters')} value={String(lessons.length)} />
            <StatPill label={t('label.readingTime')} value={String(totalMinutes)} />
          </>
        }
        actions={
          first ? (
            <Link to={`/guide/${first.slug}`} className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-strong">
              <BookOpen className="size-4" aria-hidden="true" />
              {t('guide.start')}
            </Link>
          ) : null
        }
      />

      <ol className="mt-8 divide-y divide-divider border-t border-divider">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link
              to={`/guide/${lesson.slug}`}
              className="group grid gap-3 py-6 transition-colors hover:bg-canvas/60 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-start md:gap-6"
            >
              <span className="font-serif text-3xl font-semibold leading-none tabular-nums text-ink-muted transition-colors group-hover:text-accent/60">
                {String(lesson.number).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h2 className="text-h3 font-serif text-ink transition-colors group-hover:text-accent-strong">
                  {lesson.title.vi}
                </h2>
                <p className="text-[13px] text-ink-muted" lang="en">
                  {lesson.title.en}
                </p>
                <p className="mt-2 max-w-[64ch] text-[14px] leading-relaxed text-ink-muted" lang="vi">
                  {lesson.summary.vi}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge>{lesson.readingMinutes} {t('label.readingTime')}</Badge>
                  <Badge>
                    {lesson.sections.length} {t('label.sections')}
                  </Badge>
                  <Badge>
                    {lesson.objectives.length} {t('label.objectivesShort')}
                  </Badge>
                </div>
              </div>
              <span className="hidden self-center text-ink-muted transition-colors group-hover:text-accent md:block">
                <ArrowRight className="size-5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
