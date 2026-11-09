import { useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Eye, RotateCcw, X } from 'lucide-react';
import { quizzes, translationExercises } from '@/content/practice';
import type { Quiz, TranslationExercise } from '@/types/content';
import type { QuizScore as StoredQuizScore } from '@/types/storage';
import { useI18n } from '@/hooks/useApp';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { storageKeys } from '@/lib/storage';
import { cn } from '@/lib/cn';
import { PageHeader } from '@/components/shared/PageHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/input';
import { CopyButton } from '@/components/shared/Actions';

type Scores = Record<string, StoredQuizScore>;

export default function PracticePage() {
  const t = useI18n();

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs items={[{ label: t('nav.practice') }]} />
      <PageHeader eyebrow={t('nav.learn')} title={t('practice.title')} lede={t('practice.lede')} />

      <nav aria-label={t('nav.practice')} className="mt-6 flex flex-wrap gap-2">
        <a
          href="#quizzes"
          className="rounded-full border border-divider bg-surface px-3 py-1.5 text-[12.5px] text-ink-muted transition-colors hover:border-accent/40 hover:text-accent-strong"
        >
          {t('practice.quiz')}
        </a>
        <a
          href="#exercises"
          className="rounded-full border border-divider bg-surface px-3 py-1.5 text-[12.5px] text-ink-muted transition-colors hover:border-accent/40 hover:text-accent-strong"
        >
          {t('practice.exercises')}
        </a>
      </nav>

      <section id="quizzes" aria-labelledby="quizzes-heading" className="mt-8 scroll-mt-24">
        <h2 id="quizzes-heading" className="text-h2 mb-4">
          {t('practice.quiz')}
        </h2>
        <div className="grid gap-6 xl:grid-cols-2">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>

      <section id="exercises" aria-labelledby="exercises-heading" className="mt-14 scroll-mt-24">
        <h2 id="exercises-heading" className="text-h2 mb-1">
          {t('practice.exercises')}
        </h2>
        <p className="mb-4 max-w-[66ch] text-[13.5px] leading-relaxed text-ink-muted">
          {t('practice.compareNote')}
        </p>
        <ExerciseWorkspace exercises={translationExercises} />
      </section>
    </div>
  );
}

function QuizCard({ quiz }: { quiz: Quiz }) {
  const t = useI18n();
  const [scores, setScores] = useLocalStorage<Scores>(storageKeys.quizScores, {});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const stored = scores[quiz.id];
  const allAnswered = quiz.questions.every((question) => answers[question.id]);
  const correctCount = quiz.questions.filter((q) => answers[q.id] === q.answerId).length;

  const submit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    const previous = scores[quiz.id];
    if (!previous || correctCount > previous.best) {
      setScores((current) => ({
        ...current,
        [quiz.id]: {
          best: correctCount,
          total: quiz.questions.length,
          attempts: (previous?.attempts ?? 0) + 1,
        },
      }));
    } else {
      setScores((current) => ({
        ...current,
        [quiz.id]: { ...previous, attempts: previous.attempts + 1 },
      }));
    }
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <article className="flex flex-col rounded-panel border border-divider bg-surface">
      <header className="border-b border-divider p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-h3 font-serif">{quiz.title.vi}</h3>
            <p className="mt-0.5 text-[12.5px] text-ink-muted">{quiz.title.en}</p>
          </div>
          <Badge tone="accent">{quiz.questions.length} câu</Badge>
        </div>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{quiz.description.vi}</p>
        {stored ? (
          <p className="mt-2 text-[12.5px] text-ink-muted">
            {t('practice.best')}: <strong className="text-ink">{stored.best}/{stored.total}</strong> ·{' '}
            {stored.attempts} {t('practice.attempts')}
          </p>
        ) : null}
      </header>

      <ol className="flex-1 divide-y divide-divider">
        {quiz.questions.map((question, index) => {
          const selected = answers[question.id];
          return (
            <li key={question.id} className="p-5">
              <fieldset>
                <legend className="text-[14px] font-medium leading-relaxed text-ink">
                  <span className="mr-1.5 tabular-nums text-ink-muted">{index + 1}.</span>
                  {question.prompt.vi}
                </legend>
                <p className="mt-0.5 text-[12px] text-ink-muted">{question.prompt.en}</p>

                <div className="mt-2.5 space-y-1.5">
                  {question.options.map((option) => {
                    const isCorrect = option.id === question.answerId;
                    const isChosen = selected === option.id;
                    return (
                      <label
                        key={option.id}
                        className={cn(
                          'flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2 text-[13.5px] leading-snug transition-colors',
                          submitted && isCorrect
                            ? 'border-success/40 bg-success-soft text-[#174f36]'
                            : submitted && isChosen && !isCorrect
                              ? 'border-error/40 bg-error-soft text-[#7a1f17]'
                              : isChosen
                                ? 'border-accent/50 bg-accent-soft/60'
                                : 'border-divider hover:border-accent/35 hover:bg-canvas',
                        )}
                      >
                        <input
                          type="radio"
                          name={`${quiz.id}-${question.id}`}
                          value={option.id}
                          checked={isChosen}
                          disabled={submitted}
                          onChange={() =>
                            setAnswers((current) => ({ ...current, [question.id]: option.id }))
                          }
                          className="mt-0.5 size-3.5 accent-[color:var(--color-accent)]"
                        />
                        <span className="flex-1">
                          {option.vi}
                          <span className="mt-0.5 block text-[11.5px] text-ink-muted/90">{option.en}</span>
                        </span>
                        {submitted && isCorrect ? (
                          <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />
                        ) : null}
                        {submitted && isChosen && !isCorrect ? (
                          <X className="mt-0.5 size-3.5 shrink-0 text-error" aria-hidden="true" />
                        ) : null}
                      </label>
                    );
                  })}
                </div>

                {submitted ? (
                  <div
                    className={cn(
                      'mt-3 rounded-lg border px-3 py-2 text-[12.5px] leading-relaxed',
                      selected === question.answerId
                        ? 'border-success/25 bg-success-soft/60 text-[#1c5138]'
                        : 'border-error/20 bg-error-soft/40 text-[#7a2a22]',
                    )}
                    role="status"
                  >
                    <p className="font-semibold">
                      {selected === question.answerId ? t('practice.correct') : t('practice.incorrect')}
                    </p>
                    <p className="mt-0.5">{question.explanation.vi}</p>
                  </div>
                ) : null}
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-divider p-5">
        {submitted ? (
          <>
            <p className="text-[14px] font-medium text-ink" role="status">
              {t('practice.score')}: <strong className="text-accent-strong">{correctCount}</strong> / {quiz.questions.length}
            </p>
            <Button variant="secondary" size="sm" onClick={retry}>
              <RotateCcw className="size-3.5" aria-hidden="true" />
              {t('action.retry')}
            </Button>
          </>
        ) : (
          <>
            <p className="text-[12.5px] text-ink-muted">
              {Object.keys(answers).length} / {quiz.questions.length}
            </p>
            <Button size="sm" onClick={submit} disabled={!allAnswered}>
              {t('practice.submit')}
            </Button>
          </>
        )}
      </div>
    </article>
  );
}

const directionKey = {
  'en-vi': 'practice.direction.en-vi',
  'vi-en': 'practice.direction.vi-en',
} as const;

const levelKey = {
  beginner: 'practice.level.beginner',
  intermediate: 'practice.level.intermediate',
  advanced: 'practice.level.advanced',
} as const;

function ExerciseWorkspace({ exercises }: { exercises: TranslationExercise[] }) {
  const t = useI18n();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [drafts, setDrafts] = useLocalStorage<Record<string, string>>(
    `${storageKeys.noteTemplate}:drafts`,
    {},
  );

  const exercise = exercises[index];
  const progress = ((index + 1) / exercises.length) * 100;

  const go = (next: number) => {
    setIndex(Math.max(0, Math.min(exercises.length - 1, next)));
    setRevealed(false);
  };

  const counts = useMemo(() => {
    const map = { en: 0, vi: 0 };
    for (const item of exercises) {
      if (item.direction === 'en-vi') map.en += 1;
      else map.vi += 1;
    }
    return map;
  }, [exercises]);

  if (!exercise) return null;

  return (
    <div className="rounded-panel border border-divider bg-surface">
      <div className="border-b border-divider p-4">
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={exercises.length}
          aria-valuenow={index + 1}
          aria-label={t('label.progress')}
          className="h-1 w-full overflow-hidden rounded-full bg-divider"
        >
          <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[12.5px] text-ink-muted">
            {t('practice.question')} <strong className="text-ink">{index + 1}</strong> {t('practice.of')}{' '}
            {exercises.length}
          </p>
          <p className="text-[12px] text-ink-muted">
            EN→VI {counts.en} · VI→EN {counts.vi}
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{t(directionKey[exercise.direction])}</Badge>
          <Badge>{t(levelKey[exercise.level])}</Badge>
        </div>
        <h3 className="mt-3 text-h3 font-serif">{exercise.title.vi}</h3>

        <div className="mt-4 rounded-card border border-divider bg-canvas/60 p-4">
          <p className="eyebrow mb-1.5">{t('label.source')}</p>
          <p lang={exercise.direction === 'en-vi' ? 'en' : 'vi'} className="font-serif text-[1.05rem] leading-relaxed text-ink">
            {exercise.source}
          </p>
        </div>

        <div className="mt-4">
          <label htmlFor="exercise-response" className="mb-1 block text-[13px] font-medium text-ink">
            {t('practice.yourTranslation')}
          </label>
          <Textarea
            id="exercise-response"
            rows={4}
            lang={exercise.direction === 'en-vi' ? 'vi' : 'en'}
            value={drafts[exercise.id] ?? ''}
            onChange={(event) =>
              setDrafts((current) => ({ ...current, [exercise.id]: event.target.value }))
            }
            placeholder={exercise.direction === 'en-vi' ? 'Nhập bản dịch tiếng Việt…' : 'Write your English translation…'}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setRevealed((current) => !current)}
            aria-expanded={revealed}
            aria-controls="exercise-suggested"
          >
            {revealed ? <Eye className="size-3.5" aria-hidden="true" /> : <Eye className="size-3.5" aria-hidden="true" />}
            {revealed ? t('practice.hideAnswer') : t('practice.reveal')}
          </Button>
          <CopyButton
            variant="ghost"
            size="sm"
            text={`${exercise.source}\n\n${exercise.suggested}`}
            label="Sao chép cả hai"
          />
          {(drafts[exercise.id] ?? '').length > 0 ? (
            <span className="text-[11.5px] text-ink-muted">
              {drafts[exercise.id].trim().split(/\s+/).length} từ
            </span>
          ) : null}
        </div>

        {revealed ? (
          <div id="exercise-suggested" className="mt-4 space-y-3">
            <div className="rounded-card border border-success/25 bg-success-soft/60 p-4">
              <p className="eyebrow mb-1.5 text-success">{t('practice.reveal')}</p>
              <p
                lang={exercise.direction === 'en-vi' ? 'vi' : 'en'}
                className="font-serif text-[1.02rem] leading-relaxed text-[#17492f]"
              >
                {exercise.suggested}
              </p>
            </div>
            <div className="rounded-card border border-divider bg-surface p-4">
              <p className="eyebrow mb-1.5">{t('label.note')}</p>
              <p className="text-[13px] leading-relaxed text-ink-muted">{exercise.notes.vi}</p>
              {exercise.terms && exercise.terms.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {exercise.terms.map((term) => (
                    <li
                      key={term.en}
                      className="rounded border border-divider bg-canvas px-1.5 py-0.5 text-[11.5px] text-ink-muted"
                    >
                      {term.en} — {term.vi}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-divider p-4">
        <Button variant="secondary" size="sm" onClick={() => go(index - 1)} disabled={index === 0}>
          <ChevronLeft className="size-3.5" aria-hidden="true" />
          {t('action.previous')}
        </Button>
        <span className="text-[12px] tabular-nums text-ink-muted">
          {index + 1} / {exercises.length}
        </span>
        <Button size="sm" onClick={() => go(index + 1)} disabled={index === exercises.length - 1}>
          {t('action.next')}
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
