import { describe, expect, it } from 'vitest';
import {
  countBookmarks,
  normalizeBookmarks,
  normalizeChecklist,
  normalizeDrafts,
  normalizeGlossaryRows,
  normalizeNoteValues,
  normalizeQuizScores,
  normalizeSettings,
} from '@/lib/storageSchema';
import { countWords, escapeCsvCell, toCsv } from '@/lib/storage';

describe('normalizeSettings', () => {
  it('falls back for null, numbers, strings and arrays', () => {
    for (const value of [null, 42, true, 'en', [], undefined]) {
      expect(normalizeSettings(value)).toEqual({ uiLang: 'vi', showTranslations: true });
    }
  });

  it('keeps a valid value and repairs a partial one', () => {
    expect(normalizeSettings({ uiLang: 'en', showTranslations: false })).toEqual({
      uiLang: 'en',
      showTranslations: false,
    });
    expect(normalizeSettings({ uiLang: 'fr' })).toEqual({ uiLang: 'vi', showTranslations: true });
    expect(normalizeSettings({ uiLang: 'en' }).showTranslations).toBe(true);
  });
});

describe('normalizeBookmarks', () => {
  it('returns five empty lists for garbage input', () => {
    expect(normalizeBookmarks(null)).toEqual({
      glossary: [],
      phrases: [],
      lessons: [],
      tips: [],
      scenarios: [],
    });
  });

  it('migrates legacy tip ids out of lessons exactly once', () => {
    const result = normalizeBookmarks({
      lessons: ['tip:false-friend', 'types-of-interpreting'],
      tips: ['false-friend'],
    });
    expect(result.lessons).toEqual(['types-of-interpreting']);
    expect(result.tips).toEqual(['false-friend']);
  });

  it('deduplicates repeated ids', () => {
    expect(normalizeBookmarks({ glossary: ['mou', 'mou', 'mou'] }).glossary).toEqual(['mou']);
  });

  it('keeps only non-empty strings', () => {
    expect(normalizeBookmarks({ glossary: ['mou', 7, null, '', {}] }).glossary).toEqual(['mou']);
  });

  it('treats a non-array field as empty', () => {
    expect(normalizeBookmarks({ glossary: 'mou' }).glossary).toEqual([]);
  });

  it('counts every kind', () => {
    expect(
      countBookmarks({
        glossary: ['a'],
        phrases: ['b', 'c'],
        lessons: ['d'],
        tips: ['e'],
        scenarios: [],
      }),
    ).toBe(5);
  });
});

describe('normalizeQuizScores', () => {
  it('drops malformed entries and clamps best to total', () => {
    const result = normalizeQuizScores({
      good: { best: 5, total: 5, attempts: 2 },
      over: { best: 99, total: 5, attempts: 1 },
      noTotal: { best: 3, attempts: 1 },
      notObject: 4,
      negative: { best: -1, total: 5, attempts: -2 },
    });
    expect(result.good).toEqual({ best: 5, total: 5, attempts: 2 });
    expect(result.over).toEqual({ best: 5, total: 5, attempts: 1 });
    expect(result.noTotal).toBeUndefined();
    expect(result.notObject).toBeUndefined();
    expect(result.negative).toEqual({ best: 0, total: 5, attempts: 0 });
  });

  it('returns an empty map for a non-object', () => {
    expect(normalizeQuizScores([])).toEqual({});
    expect(normalizeQuizScores('x')).toEqual({});
  });
});

describe('normalizeChecklist', () => {
  it('keeps only booleans, so a stray string cannot tick a box', () => {
    expect(normalizeChecklist({ a: true, b: 'false', c: 1, d: null, e: false })).toEqual({
      a: true,
      e: false,
    });
  });
});

describe('normalizeGlossaryRows', () => {
  it('repairs missing fields and regenerates a missing id', () => {
    const rows = normalizeGlossaryRows([{ en: 'MOU' }, { id: 'r2', vi: 'Học bổng' }, 'junk']);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({ id: 'row-restored-0', en: 'MOU', vi: '', context: '' });
    expect(rows[1]).toEqual({ id: 'r2', en: '', vi: 'Học bổng', context: '' });
  });

  it('returns an empty list for a non-array', () => {
    expect(normalizeGlossaryRows(null)).toEqual([]);
  });
});

describe('normalizeNoteValues and normalizeDrafts', () => {
  it('fills every note field with a string', () => {
    const values = normalizeNoteValues({ topic: 'Agenda', numbers: 42 });
    expect(values.topic).toBe('Agenda');
    expect(values.numbers).toBe('');
    expect(values.actions).toBe('');
    expect(Object.keys(values)).toHaveLength(6);
  });

  it('keeps only string drafts', () => {
    expect(normalizeDrafts({ ex1: 'text', ex2: 5, ex3: null })).toEqual({ ex1: 'text' });
  });
});

describe('escapeCsvCell', () => {
  it('quotes separators, quotes and newlines per RFC 4180', () => {
    expect(escapeCsvCell('plain')).toBe('plain');
    expect(escapeCsvCell('a,b')).toBe('"a,b"');
    expect(escapeCsvCell('say "hi"')).toBe('"say ""hi"""');
    expect(escapeCsvCell('line1\nline2')).toBe('"line1\nline2"');
  });

  // F-15 regression: a cell starting with a formula marker is executed by Excel
  // when the CSV is opened, so user-typed glossary rows could run code.
  it('neutralises formula-like cells', () => {
    expect(escapeCsvCell('=1+1')).toBe("'=1+1");
    expect(escapeCsvCell('+SUM(A1)')).toBe("'+SUM(A1)");
    expect(escapeCsvCell('-2+3')).toBe("'-2+3");
    expect(escapeCsvCell('@cmd')).toBe("'@cmd");
    expect(escapeCsvCell('   =HYPERLINK("http://x")')).toContain("'   =HYPERLINK");
    expect(escapeCsvCell('\t=1')).toContain("'");
  });

  it('leaves ordinary Vietnamese text and negative-looking words alone', () => {
    expect(escapeCsvCell('Học bổng toàn phần')).toBe('Học bổng toàn phần');
    expect(escapeCsvCell('2024 report')).toBe('2024 report');
  });

  it('round-trips a row through toCsv', () => {
    const csv = toCsv([
      ['English term', 'Vietnamese term', 'Context'],
      ['MOU, revised', 'Biên bản "ghi nhớ"', '=formula'],
    ]);
    expect(csv.split('\r\n')).toHaveLength(2);
    expect(csv).toContain('"MOU, revised"');
    expect(csv).toContain('"Biên bản ""ghi nhớ"""');
    expect(csv).toContain("'=formula");
  });
});

describe('countWords', () => {
  // F-19 regression: `"   ".trim().split(/\s+/).length` is 1, not 0.
  it('reports zero for whitespace-only input', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('   ')).toBe(0);
    expect(countWords('\n\t  \n')).toBe(0);
  });

  it('counts real words, collapsing runs of whitespace', () => {
    expect(countWords('one')).toBe(1);
    expect(countWords('  one   two  ')).toBe(2);
    expect(countWords('một\nhai\ttri')).toBe(3);
  });

  it('counts Vietnamese text with diacritics', () => {
    expect(countWords('Học bổng toàn phần')).toBe(4);
  });
});
