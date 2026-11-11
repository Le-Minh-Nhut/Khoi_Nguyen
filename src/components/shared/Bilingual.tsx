import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useI18n } from '@/hooks/useApp';

interface BilingualBlockProps {
  en: string;
  vi: string;
  label?: string;
  note?: string;
  className?: string;
  dense?: boolean;
}

/**
 * The signature reading unit: source and translation stacked on a shared
 * grid so the eye can compare them line by line. Labels are structural —
 * they mark which side is which, not decoration. Each side carries its own
 * `lang` so a screen reader switches voice instead of reading Vietnamese with
 * an English pronunciation (the document language is the *UI* language).
 */
export function BilingualBlock({ en, vi, label, note, className, dense }: BilingualBlockProps) {
  const t = useI18n();
  return (
    <div className={cn('border-l-2 border-divider-strong/70 pl-4 sm:pl-5', className)}>
      {label ? <p className="eyebrow mb-2">{label}</p> : null}
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
            {t('label.english')}
          </p>
          <p
            lang="en"
            className={cn(
              'bilingual-line font-serif text-[1.02rem] leading-relaxed text-ink',
              dense && 'text-[0.98rem]',
            )}
          >
            {en}
          </p>
        </div>
        <div className="border-t border-dashed border-divider pt-3 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent-strong">
            {t('label.vietnamese')}
          </p>
          <p
            lang="vi"
            className={cn('bilingual-line text-[1.02rem] leading-relaxed text-ink', dense && 'text-[0.98rem]')}
          >
            {vi}
          </p>
        </div>
      </div>
      {note ? (
        <p
          lang="vi"
          className="mt-3 border-l border-highlight/80 bg-highlight-soft/70 px-3 py-2 text-[13px] leading-relaxed text-[#6b4a12]"
        >
          <span className="font-semibold">{t('label.note')}: </span>
          {note}
        </p>
      ) : null}
    </div>
  );
}

interface TranslationNoteProps {
  children: ReactNode;
  title?: string;
  className?: string;
  lang?: 'vi' | 'en';
}

/** Callout for a decision that a literal rendering would get wrong. */
export function TranslationNote({ children, title, className, lang = 'vi' }: TranslationNoteProps) {
  return (
    <aside
      lang={lang}
      className={cn(
        'rounded-card border border-highlight/60 bg-highlight-soft px-4 py-3.5 text-[13.5px] leading-relaxed text-[#5f4413]',
        className,
      )}
    >
      {title ? <p className="mb-1 font-semibold text-[#4d370f]">{title}</p> : null}
      {children}
    </aside>
  );
}

/** Small inline language marker used on list rows. */
export function LangTag({ lang }: { lang: 'en' | 'vi' }) {
  return (
    <span
      className={cn(
        'inline-block rounded-[3px] px-1 py-px text-[10px] font-semibold uppercase tracking-wider',
        lang === 'en' ? 'bg-canvas text-ink-muted' : 'bg-accent-soft text-accent-strong',
      )}
      aria-hidden="true"
    >
      {lang}
    </span>
  );
}
