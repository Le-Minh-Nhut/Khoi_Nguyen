import { describe, expect, it } from 'vitest';
import { normalizeText, scoreMatch, tokenize } from '@/lib/normalizeText';
import { searchHandbook, termMatches, phraseMatches } from '@/lib/search';
import { glossaryTerms } from '@/content/glossary';
import { phrases } from '@/content/phrases';
import { lessons } from '@/content/lessons';
import { scenarios } from '@/content/scenarios';
import { glossaryCategories } from '@/content/glossaryCategories';
import { phraseCategories } from '@/content/phraseCategories';
import { quizzes, translationExercises } from '@/content/practice';
import { tips } from '@/content/tips';
import { escapeCsvCell, toCsv } from '@/lib/storage';

describe('normalizeText', () => {
  it('strips Vietnamese diacritics', () => {
    expect(normalizeText('Học bổng toàn phần')).toBe('hoc bong toan phan');
    expect(normalizeText('Đại học Quốc gia')).toBe('dai hoc quoc gia');
  });

  it('collapses whitespace and lowercases', () => {
    expect(normalizeText('  KEYNOTE   Speaker ')).toBe('keynote speaker');
  });

  it('tokenizes to individual words', () => {
    expect(tokenize('mou học bổng')).toEqual(['mou', 'hoc', 'bong']);
  });
});

describe('scoreMatch', () => {
  it('requires every token to appear', () => {
    expect(scoreMatch('Memorandum of Understanding', 'mou')).toBe(0);
    expect(scoreMatch('Memorandum of Understanding', 'understanding')).toBeGreaterThan(0);
  });

  it('rewards prefix hits over mid-word hits', () => {
    const prefix = scoreMatch('credit transfer', 'credit');
    const middle = scoreMatch('accredit', 'credit');
    expect(prefix).toBeGreaterThan(middle);
  });
});

describe('glossary dataset', () => {
  it('has 96 terms and 12 in each of the 8 categories', () => {
    expect(glossaryTerms).toHaveLength(96);
    expect(glossaryCategories).toHaveLength(8);
    for (const category of glossaryCategories) {
      const count = glossaryTerms.filter((term) => term.category === category.id).length;
      expect(count, `category ${category.id}`).toBe(12);
    }
  });

  it('has unique slugs and unique English terms', () => {
    expect(new Set(glossaryTerms.map((t) => t.slug)).size).toBe(glossaryTerms.length);
    expect(new Set(glossaryTerms.map((t) => t.en.toLowerCase())).size).toBe(glossaryTerms.length);
  });

  it('only references existing related slugs', () => {
    const slugs = new Set(glossaryTerms.map((t) => t.slug));
    for (const term of glossaryTerms) {
      for (const related of term.related ?? []) {
        expect(slugs.has(related), `${term.slug} -> ${related}`).toBe(true);
      }
    }
  });

  it('gives every term a non-empty bilingual definition and example', () => {
    for (const term of glossaryTerms) {
      expect(term.definitionEn.length).toBeGreaterThan(20);
      expect(term.definitionVi.length).toBeGreaterThan(10);
      expect(term.exampleEn.length).toBeGreaterThan(10);
      expect(term.exampleVi.length).toBeGreaterThan(5);
    }
  });

  it('finds the documented search examples', () => {
    const cases: Array<[string, string]> = [
      ['mou', 'memorandum-of-understanding'],
      ['hoc bong', 'full-scholarship'],
      ['student exchange', 'exchange-student'],
      ['admission', 'admission'],
      ['keynote speaker', 'keynote-speaker'],
    ];
    for (const [query, slug] of cases) {
      const result = searchHandbook(
        query,
        { glossary: glossaryTerms, phrases, lessons, scenarios },
        24,
      );
      expect(result.length, query).toBeGreaterThan(0);
      const hit = glossaryTerms.find((t) => t.slug === slug);
      expect(hit, slug).toBeDefined();
      expect(termMatches(hit!, query), `${query} -> ${slug}`).toBeGreaterThan(0);
    }
  });

  it('matches Vietnamese queries without accents', () => {
    const term = glossaryTerms.find((t) => t.slug === 'tuition-fee')!;
    expect(termMatches(term, 'hoc phi')).toBeGreaterThan(0);
    expect(termMatches(term, 'học phí')).toBeGreaterThan(0);
  });
});

describe('phrase dataset', () => {
  it('has 48 phrases, 8 per category, unique ids', () => {
    expect(phrases).toHaveLength(48);
    expect(new Set(phrases.map((p) => p.id)).size).toBe(48);
    for (const category of phraseCategories) {
      expect(phrases.filter((p) => p.category === category.id).length).toBe(8);
    }
  });

  it('matches a bilingual phrase query', () => {
    const phrase = phrases[0];
    expect(phraseMatches(phrase, phrase.vi.split(' ')[0])).toBeGreaterThan(0);
  });
});

describe('lesson + scenario datasets', () => {
  it('has 8 ordered lessons with substantial sections', () => {
    expect(lessons).toHaveLength(8);
    lessons.forEach((lesson, index) => {
      expect(lesson.number).toBe(index + 1);
      expect(lesson.sections.length).toBeGreaterThanOrEqual(5);
      expect(lesson.objectives.length).toBeGreaterThanOrEqual(3);
      expect(lesson.takeaways.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('has 6 scenarios with 8 dialogue turns each', () => {
    expect(scenarios).toHaveLength(6);
    for (const scenario of scenarios) {
      expect(scenario.dialogue.length).toBe(8);
      expect(scenario.dialogue.every((turn) => turn.en.length > 0 && turn.vi.length > 0)).toBe(true);
      expect(scenario.objectives.length).toBeGreaterThanOrEqual(3);
      expect(scenario.terms.length).toBeGreaterThanOrEqual(5);
    }
  });
});

describe('practice dataset', () => {
  it('ships 2 quizzes with 5 valid questions each', () => {
    expect(quizzes).toHaveLength(2);
    for (const quiz of quizzes) {
      expect(quiz.questions).toHaveLength(5);
      for (const question of quiz.questions) {
        expect(question.options).toHaveLength(4);
        expect(question.options.some((option) => option.id === question.answerId)).toBe(true);
        expect(new Set(question.options.map((o) => o.id)).size).toBe(4);
      }
    }
  });

  it('ships 10 exercises in both directions', () => {
    expect(translationExercises).toHaveLength(10);
    expect(translationExercises.filter((e) => e.direction === 'en-vi')).toHaveLength(5);
    expect(translationExercises.filter((e) => e.direction === 'vi-en')).toHaveLength(5);
    expect(new Set(translationExercises.map((e) => e.id)).size).toBe(10);
  });

  it('has 10 tips numbered sequentially', () => {
    expect(tips).toHaveLength(10);
    tips.forEach((tip, index) => expect(tip.number).toBe(index + 1));
  });
});

describe('csv export', () => {
  it('quotes cells containing separators', () => {
    expect(escapeCsvCell('plain')).toBe('plain');
    expect(escapeCsvCell('a,b')).toBe('"a,b"');
    expect(escapeCsvCell('say "hi"')).toBe('"say ""hi"""');
    expect(escapeCsvCell('line\nbreak')).toBe('"line\nbreak"');
  });

  it('joins rows with CRLF', () => {
    expect(toCsv([['a', 'b'], ['c', 'd']])).toBe('a,b\r\nc,d');
  });

  it('round-trips a Vietnamese glossary row', () => {
    const csv = toCsv([['Memorandum of Understanding', 'Biên bản ghi nhớ', 'MOU, non-binding']]);
    expect(csv).toBe('Memorandum of Understanding,Biên bản ghi nhớ,"MOU, non-binding"');
  });
});

describe('global search', () => {
  it('returns nothing for an empty query', () => {
    expect(searchHandbook('   ', { glossary: glossaryTerms, phrases, lessons, scenarios })).toEqual([]);
  });

  it('searches across all four content types', () => {
    const index = { glossary: glossaryTerms, phrases, lessons, scenarios };
    expect(searchHandbook('scholarship', index, 40).some((r) => r.kind === 'glossary')).toBe(true);
    expect(searchHandbook('welcome', index, 40).some((r) => r.kind === 'phrase')).toBe(true);
    expect(searchHandbook('listening', index, 40).some((r) => r.kind === 'lesson')).toBe(true);
    expect(searchHandbook('consultation', index, 40).some((r) => r.kind === 'scenario')).toBe(true);
  });

  it('links results to real routes', () => {
    const results = searchHandbook('mou', { glossary: glossaryTerms, phrases, lessons, scenarios });
    const glossaryHit = results.find((r) => r.kind === 'glossary');
    expect(glossaryHit?.href).toMatch(/^\/glossary\/[a-z-]+$/);
  });
});
