import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeText, scoreMatch, tokenize } from '@/lib/normalizeText';
import { phraseMatches, searchHandbook, termMatches } from '@/lib/search';
import { glossaryTerms } from '@/content/glossary';
import { phrases } from '@/content/phrases';
import { lessons } from '@/content/lessons';
import { scenarios } from '@/content/scenarios';

describe('normalizeText / search', () => {
  it('strips Vietnamese diacritics and folds đ/Đ', () => {
    expect(normalizeText('Học bổng')).toBe('hoc bong');
    expect(normalizeText('Đại học')).toBe('dai hoc');
    expect(normalizeText('  nhiều    khoảng trắng  ')).toBe('nhieu khoang trang');
  });

  it('tokenizes an empty or whitespace query to no tokens', () => {
    expect(tokenize('')).toEqual([]);
    expect(tokenize('   ')).toEqual([]);
  });

  it('scores a word-boundary hit above a mid-word hit', () => {
    expect(scoreMatch('exchange student', 'exchange')).toBeGreaterThan(
      scoreMatch('studentexchange', 'exchange'),
    );
  });

  it('returns 0 when any token is missing (AND semantics)', () => {
    expect(scoreMatch('học bổng', 'học tín chỉ')).toBe(0);
  });

  it('matches by abbreviation', () => {
    expect(matchesQuery('Memorandum of Understanding', 'MOU')).toBe(false);
    expect(matchesQuery('MOU', 'mou')).toBe(true);
  });

  // A query that matches nothing must yield zero results, not the whole corpus.
  it('never returns the whole corpus for an empty global query', () => {
    expect(searchHandbook('', { glossary: glossaryTerms, phrases, lessons, scenarios })).toEqual([]);
    expect(searchHandbook('   ', { glossary: glossaryTerms, phrases, lessons, scenarios })).toEqual([]);
  });

  it('scores every term as 1 for an empty query so a category filter keeps them', () => {
    for (const term of glossaryTerms) expect(termMatches(term, '')).toBe(1);
    for (const phrase of phrases) expect(phraseMatches(phrase, '')).toBe(1);
  });

  it('finds MOU through the abbreviation field', () => {
    const hits = searchHandbook('mou', { glossary: glossaryTerms, phrases, lessons, scenarios });
    expect(hits.some((hit) => hit.href === '/glossary/memorandum-of-understanding')).toBe(true);
  });

  it('ranks title hits above definition-only hits', () => {
    const hits = searchHandbook('scholarship', { glossary: glossaryTerms, phrases, lessons, scenarios });
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].title.toLowerCase()).toContain('scholar');
  });

  it('respects the result limit', () => {
    expect(searchHandbook('a', { glossary: glossaryTerms, phrases, lessons, scenarios }, 3)).toHaveLength(3);
  });

  it('is stable for results with identical scores', () => {
    const first = searchHandbook('the', { glossary: glossaryTerms, phrases, lessons, scenarios });
    const second = searchHandbook('the', { glossary: glossaryTerms, phrases, lessons, scenarios });
    expect(first.map((r) => r.id)).toEqual(second.map((r) => r.id));
  });
});
