/** The shapes stored in localStorage. Keep versioned + minimal. */

export type BookmarkKind = 'glossary' | 'phrases' | 'lessons' | 'scenarios';

export type BookmarkState = Record<BookmarkKind, string[]>;

export interface QuizScore {
  best: number;
  total: number;
  attempts: number;
}

export interface NoteTemplateValues {
  topic: string;
  mainIdea: string;
  names: string;
  numbers: string;
  terminology: string;
  actions: string;
}

export interface GlossaryTemplateRow {
  id: string;
  en: string;
  vi: string;
  context: string;
}

export interface AppSettings {
  uiLang: 'vi' | 'en';
  showTranslations: boolean;
}
