/**
 * Runtime validation for everything read out of localStorage.
 *
 * `readStorage` used to trust the parsed JSON shape, so a `null`, a number, or
 * an object missing a field could reach a component and throw during render.
 * Every persisted key now goes through a normalizer that returns a usable value
 * for any input, including the legacy shapes earlier versions wrote.
 */
import type {
  AppSettings,
  BookmarkKind,
  BookmarkState,
  GlossaryTemplateRow,
  NoteTemplateValues,
  QuizScore,
} from '@/types/storage';

const BOOKMARK_KINDS: BookmarkKind[] = ['glossary', 'phrases', 'lessons', 'tips', 'scenarios'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is string => typeof item === 'string' && item.length > 0))];
}

export function normalizeSettings(value: unknown): AppSettings {
  if (!isRecord(value)) return { uiLang: 'vi', showTranslations: true };
  return {
    uiLang: value.uiLang === 'en' ? 'en' : 'vi',
    showTranslations: value.showTranslations !== false,
  };
}

export const EMPTY_BOOKMARKS: BookmarkState = {
  glossary: [],
  phrases: [],
  lessons: [],
  tips: [],
  scenarios: [],
};

/**
 * Normalizes bookmarks and migrates the legacy shape where tips were stored as
 * `lessons: ['tip:<id>']`. The migration is idempotent: a tip id present in
 * both places is kept once.
 */
export function normalizeBookmarks(value: unknown): BookmarkState {
  const raw = isRecord(value) ? value : {};
  const tips = new Set(stringArray(raw.tips));
  const lessons: string[] = [];

  for (const id of stringArray(raw.lessons)) {
    if (id.startsWith('tip:')) {
      const tipId = id.slice(4);
      if (tipId) tips.add(tipId);
      continue;
    }
    if (!lessons.includes(id)) lessons.push(id);
  }

  return {
    glossary: stringArray(raw.glossary),
    phrases: stringArray(raw.phrases),
    lessons,
    tips: [...tips],
    scenarios: stringArray(raw.scenarios),
  };
}

export function countBookmarks(bookmarks: BookmarkState): number {
  return BOOKMARK_KINDS.reduce((total, kind) => total + bookmarks[kind].length, 0);
}

function finiteInt(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? Math.floor(value) : fallback;
}

/** Quiz scores keyed by quiz id; malformed entries are dropped, not trusted. */
export function normalizeQuizScores(value: unknown): Record<string, QuizScore> {
  if (!isRecord(value)) return {};
  const out: Record<string, QuizScore> = {};
  for (const [id, entry] of Object.entries(value)) {
    if (!isRecord(entry)) continue;
    const total = finiteInt(entry.total);
    if (total === 0) continue;
    out[id] = {
      best: Math.min(finiteInt(entry.best), total),
      total,
      attempts: finiteInt(entry.attempts),
    };
  }
  return out;
}

/** Checklist progress: only boolean values count, so a stray string cannot tick a box. */
export function normalizeChecklist(value: unknown): Record<string, boolean> {
  if (!isRecord(value)) return {};
  const out: Record<string, boolean> = {};
  for (const [id, done] of Object.entries(value)) {
    if (typeof done === 'boolean') out[id] = done;
  }
  return out;
}

export function normalizeGlossaryRows(value: unknown): GlossaryTemplateRow[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(isRecord)
    .map((row, index) => ({
      id: typeof row.id === 'string' && row.id ? row.id : `row-restored-${index}`,
      en: typeof row.en === 'string' ? row.en : '',
      vi: typeof row.vi === 'string' ? row.vi : '',
      context: typeof row.context === 'string' ? row.context : '',
    }));
}

const NOTE_FIELDS: Array<keyof NoteTemplateValues> = [
  'topic',
  'mainIdea',
  'names',
  'numbers',
  'terminology',
  'actions',
];

export function normalizeNoteValues(value: unknown): NoteTemplateValues {
  const raw = isRecord(value) ? value : {};
  const out = {} as NoteTemplateValues;
  for (const field of NOTE_FIELDS) {
    out[field] = typeof raw[field] === 'string' ? (raw[field] as string) : '';
  }
  return out;
}

export function normalizeDrafts(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {};
  const out: Record<string, string> = {};
  for (const [id, draft] of Object.entries(value)) {
    if (typeof draft === 'string') out[id] = draft;
  }
  return out;
}
