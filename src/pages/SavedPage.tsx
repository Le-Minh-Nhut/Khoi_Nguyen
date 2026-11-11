import { useMemo, useState } from 'react';
import { BookMarked, BookOpen, Languages, Lightbulb, MessagesSquare, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '@/app/SettingsProvider';
import { glossaryTerms } from '@/content/glossary';
import { phrases } from '@/content/phrases';
import { lessons } from '@/content/lessons';
import { scenarios } from '@/content/scenarios';
import { tips } from '@/content/tips';
import { useI18n } from '@/hooks/useApp';
import { PageHeader, StatPill } from '@/components/shared/PageHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';

interface SavedRow {
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export default function SavedPage() {
  const t = useI18n();
  const { bookmarks, remove, count } = useBookmarks();
  const [confirming, setConfirming] = useState(false);

  const groups = useMemo(() => {
    const glossaryRows: SavedRow[] = bookmarks.glossary
      .map((slug) => glossaryTerms.find((term) => term.slug === slug))
      .filter((term): term is NonNullable<typeof term> => term !== undefined)
      .map((term) => ({
        id: term.slug,
        title: term.en,
        subtitle: term.vi,
        href: `/glossary/${term.slug}`,
      }));

    const phraseRows: SavedRow[] = bookmarks.phrases
      .map((id) => phrases.find((phrase) => phrase.id === id))
      .filter((phrase): phrase is NonNullable<typeof phrase> => phrase !== undefined)
      .map((phrase) => ({
        id: phrase.id,
        title: phrase.en,
        subtitle: phrase.vi,
        href: `/phrase-bank?phrase=${phrase.id}`,
      }));

    const lessonRows: SavedRow[] = bookmarks.lessons
      .map((slug) => lessons.find((lesson) => lesson.slug === slug))
      .filter((lesson): lesson is NonNullable<typeof lesson> => lesson !== undefined)
      .map((lesson) => ({
        id: lesson.slug,
        title: lesson.title.vi,
        subtitle: `${t('guide.chapter')} ${lesson.number} · ${lesson.title.en}`,
        href: `/guide/${lesson.slug}`,
      }));

    // Tips used to be filed under `lessons` as `tip:<id>` and vanished from this
    // page; they now have their own kind and link straight to the open tip.
    const tipRows: SavedRow[] = bookmarks.tips
      .map((id) => tips.find((tip) => tip.id === id))
      .filter((tip): tip is NonNullable<typeof tip> => tip !== undefined)
      .map((tip) => ({
        id: tip.id,
        title: tip.title.vi,
        subtitle: `${t('label.problem')} · ${tip.title.en}`,
        href: `/tips?tip=${tip.id}`,
      }));

    const scenarioRows: SavedRow[] = bookmarks.scenarios
      .map((slug) => scenarios.find((scenario) => scenario.slug === slug))
      .filter((scenario): scenario is NonNullable<typeof scenario> => scenario !== undefined)
      .map((scenario) => ({
        id: scenario.slug,
        title: scenario.title.vi,
        subtitle: scenario.title.en,
        href: `/scenarios/${scenario.slug}`,
      }));

    return [
      { key: 'glossary' as const, label: t('saved.glossary'), icon: BookOpen, rows: glossaryRows },
      { key: 'phrases' as const, label: t('saved.phrases'), icon: Languages, rows: phraseRows },
      { key: 'lessons' as const, label: t('saved.lessons'), icon: BookMarked, rows: lessonRows },
      { key: 'tips' as const, label: t('saved.tips'), icon: Lightbulb, rows: tipRows },
      { key: 'scenarios' as const, label: t('saved.scenarios'), icon: MessagesSquare, rows: scenarioRows },
    ].filter((group) => group.rows.length > 0);
  }, [bookmarks, t]);

  // A bookmark whose source entry was removed (or renamed) still counts toward
  // the badge, so the page says so instead of silently hiding it.
  const orphanCount = count - groups.reduce((total, group) => total + group.rows.length, 0);

  const clearAll = () => {
    for (const kind of ['glossary', 'phrases', 'lessons', 'tips', 'scenarios'] as const) {
      for (const id of bookmarks[kind]) remove(kind, id);
    }
    setConfirming(false);
  };

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs items={[{ label: t('nav.saved') }]} />
      <PageHeader
        eyebrow={t('nav.saved')}
        title={t('saved.title')}
        lede={t('saved.lede')}
        meta={<StatPill label={t('saved.count')} value={String(count)} />}
        actions={
          count > 0 ? (
            confirming ? (
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-error">{t('saved.clearConfirm')}</span>
                <Button variant="danger" size="sm" onClick={clearAll}>
                  {t('action.remove')}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
                  {t('action.close')}
                </Button>
              </div>
            ) : (
              <Button variant="danger" size="sm" onClick={() => setConfirming(true)}>
                <Trash2 className="size-4" aria-hidden="true" />
                {t('saved.clearAll')}
              </Button>
            )
          ) : null
        }
      />

      <div className="mt-8">
        {groups.length === 0 && count > 0 ? (
          // The badge says N items but none resolve: say so rather than claim
          // "nothing saved yet" while the counter disagrees.
          <div
            className="rounded-card border border-dashed border-divider-strong bg-surface/60 px-6 py-10 text-center"
            role="status"
          >
            <p className="font-serif text-lg font-semibold text-ink">{t('saved.missing')}</p>
            <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-muted">{t('saved.missingHint')}</p>
            <Button variant="secondary" size="sm" className="mt-5" onClick={() => setConfirming(true)}>
              {t('saved.clearAll')}
            </Button>
          </div>
        ) : groups.length === 0 ? (
          <EmptyState
            title={t('saved.empty')}
            description={t('saved.emptyHint')}
            icon={<BookMarked className="size-8" aria-hidden="true" />}
            action={
              <div className="flex flex-wrap justify-center gap-2">
                <Button asChild size="sm">
                  <Link to="/glossary">{t('nav.glossary')}</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link to="/guide">{t('nav.guide')}</Link>
                </Button>
              </div>
            }
          />
        ) : (
          <div className="space-y-10">
            {groups.map((group) => {
              const Icon = group.icon;
              return (
                <section key={group.key} aria-labelledby={`saved-${group.key}`}>
                  <h2
                    id={`saved-${group.key}`}
                    className="mb-3 flex items-center gap-2 border-b border-divider pb-2 text-h3 font-serif"
                  >
                    <Icon className="size-4 text-accent" aria-hidden="true" />
                    {group.label}
                    <span className="ml-1 text-[13px] font-normal text-ink-muted">({group.rows.length})</span>
                  </h2>
                  <ul className="divide-y divide-divider">
                    {group.rows.map((row) => (
                      <li key={row.id} className="flex items-center gap-3 py-3">
                        <Link
                          to={row.href}
                          className="min-w-0 flex-1 transition-colors hover:text-accent-strong"
                        >
                          <span className="block truncate text-[14.5px] font-medium text-ink">{row.title}</span>
                          <span className="block truncate text-[13px] text-ink-muted">{row.subtitle}</span>
                        </Link>
                        <Button
                          variant="ghost"
                          size="iconSm"
                          onClick={() => remove(group.key, row.id)}
                          aria-label={`${t('action.unsave')}: ${row.title}`}
                          className="text-ink-muted hover:text-error"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}

            {orphanCount > 0 ? (
              <p className="rounded-card border border-dashed border-divider-strong bg-surface/60 px-4 py-3 text-[13px] text-ink-muted" role="status">
                {orphanCount} {t('saved.missing')}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
