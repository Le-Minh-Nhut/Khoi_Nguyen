import type { UiLang } from '@/types/content';

export type Locale = 'vi-VN' | 'en-US';

export function localeFor(lang: UiLang): Locale {
  return lang === 'vi' ? 'vi-VN' : 'en-US';
}

/**
 * Pick the copy that matches the UI language from a bilingual pair.
 * Bilingual *educational* examples keep both sides — this is only for UI labels.
 */
export function pick(pair: { en: string; vi: string }, lang: UiLang): string {
  return lang === 'vi' ? pair.vi : pair.en;
}
