/** Shared content types. UI code depends on these, never on data files directly. */

import type { NoteTemplateValues } from './storage';

export type UiLang = 'vi' | 'en';

export interface Bilingual {
  en: string;
  vi: string;
}

/* --------------------------------- Glossary -------------------------------- */

export type GlossaryCategoryId =
  | 'study-abroad'
  | 'scholarships'
  | 'cooperation'
  | 'conferences'
  | 'administration'
  | 'exchange'
  | 'research'
  | 'events';

export interface GlossaryCategory {
  id: GlossaryCategoryId;
  label: Bilingual;
  /** One-line scope note shown above the category's term list. */
  scope: Bilingual;
}

export interface GlossaryTerm {
  slug: string;
  en: string;
  vi: string;
  abbreviation?: string;
  category: GlossaryCategoryId;
  definitionEn: string;
  definitionVi: string;
  exampleEn: string;
  exampleVi: string;
  exampleTranslationVi?: string;
  exampleTranslationEn?: string;
  note?: Bilingual;
  related?: string[];
  /** Alternative renderings / search synonyms that should still match. */
  variants?: string[];
}

/* ---------------------------------- Phrases -------------------------------- */

export type PhraseCategoryId =
  | 'opening'
  | 'introducing'
  | 'moderating'
  | 'partnership'
  | 'study-abroad'
  | 'closing';

export interface PhraseCategory {
  id: PhraseCategoryId;
  label: Bilingual;
  scope: Bilingual;
}

export interface Phrase {
  id: string;
  category: PhraseCategoryId;
  en: string;
  vi: string;
  context: Bilingual;
  note?: Bilingual;
}

/* ---------------------------------- Lessons -------------------------------- */

export interface LessonTable {
  caption?: Bilingual;
  headers: Bilingual[];
  rows: Bilingual[][];
}

export interface LessonExample {
  label?: Bilingual;
  source: Bilingual;
  translation: Bilingual;
  note?: Bilingual;
}

export interface LessonSection {
  heading: Bilingual;
  paragraphs?: Bilingual[];
  bullets?: Bilingual[];
  example?: LessonExample;
  table?: LessonTable;
  note?: Bilingual;
}

export interface Lesson {
  slug: string;
  number: number;
  title: Bilingual;
  summary: Bilingual;
  readingMinutes: number;
  objectives: Bilingual[];
  sections: LessonSection[];
  tips: Bilingual[];
  takeaways: Bilingual[];
  relatedTerms: string[];
}

/* -------------------------------- Scenarios -------------------------------- */

export interface ScenarioTerm {
  en: string;
  vi: string;
  /** Optional glossary slug for cross-linking. */
  slug?: string;
}

export interface DialogueTurn {
  speaker: Bilingual;
  role: Bilingual;
  en: string;
  vi: string;
  /** Interpreter's note on how the turn was rendered. */
  note?: Bilingual;
}

export interface Scenario {
  slug: string;
  title: Bilingual;
  setting: Bilingual;
  roles: Bilingual[];
  overview: Bilingual;
  objectives: Bilingual[];
  terms: ScenarioTerm[];
  dialogue: DialogueTurn[];
  tips: Bilingual[];
}

/* ------------------------------ Tips & mistakes ----------------------------- */

export interface Tip {
  id: string;
  number: number;
  title: Bilingual;
  problem: Bilingual;
  example: Bilingual;
  better: Bilingual;
  explanation: Bilingual;
  advice: Bilingual[];
  relatedTerms?: string[];
}

/* --------------------------------- Practice -------------------------------- */

export interface QuizOption {
  id: string;
  en: string;
  vi: string;
}

export interface QuizQuestion {
  id: string;
  prompt: Bilingual;
  options: QuizOption[];
  answerId: string;
  explanation: Bilingual;
}

export interface Quiz {
  id: string;
  title: Bilingual;
  description: Bilingual;
  questions: QuizQuestion[];
}

export type TranslationDirection = 'en-vi' | 'vi-en';

export interface TranslationExercise {
  id: string;
  title: Bilingual;
  direction: TranslationDirection;
  level: 'beginner' | 'intermediate' | 'advanced';
  source: string;
  suggested: string;
  notes: Bilingual;
  terms?: ScenarioTerm[];
}

/* ---------------------------------- Toolkit -------------------------------- */

export interface ChecklistItem {
  id: string;
  label: Bilingual;
  detail?: Bilingual;
}

export interface QualityCriterion extends ChecklistItem {
  question: Bilingual;
}

export interface ReferenceResource {
  name: string;
  url: string;
  description: Bilingual;
  kind: Bilingual;
}

export interface NoteTemplateField {
  id: keyof NoteTemplateValues;
  label: Bilingual;
  placeholder: Bilingual;
  rows?: number;
}
