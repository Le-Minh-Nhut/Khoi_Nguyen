import type {
  GlossaryTerm,
  Lesson,
  Phrase,
  Scenario,
} from '@/types/content';
import { scoreMatch } from './normalizeText';

export type SearchResultKind = 'glossary' | 'phrase' | 'lesson' | 'scenario';

export interface SearchResult {
  id: string;
  kind: SearchResultKind;
  title: string;
  subtitle: string;
  href: string;
  /** Matched secondary text, when the hit came from the translation side. */
  matchHint?: string;
}

interface SearchIndexInput {
  glossary: GlossaryTerm[];
  phrases: Phrase[];
  lessons: Lesson[];
  scenarios: Scenario[];
}

interface Candidate {
  result: SearchResult;
  haystacks: Array<{ text: string; weight: number }>;
}

const KIND_WEIGHT: Record<SearchResultKind, number> = {
  glossary: 1.15,
  phrase: 1,
  lesson: 0.95,
  scenario: 0.95,
};

function buildCandidates({ glossary, phrases, lessons, scenarios }: SearchIndexInput): Candidate[] {
  const candidates: Candidate[] = [];

  for (const term of glossary) {
    candidates.push({
      result: {
        id: term.slug,
        kind: 'glossary',
        title: term.en,
        subtitle: term.vi,
        href: `/glossary/${term.slug}`,
      },
      haystacks: [
        { text: term.en, weight: 3 },
        { text: term.vi, weight: 3 },
        { text: term.abbreviation ?? '', weight: 3 },
        { text: (term.variants ?? []).join(' '), weight: 2 },
        { text: term.definitionEn, weight: 1 },
        { text: term.definitionVi, weight: 1 },
      ],
    });
  }

  for (const phrase of phrases) {
    candidates.push({
      result: {
        id: phrase.id,
        kind: 'phrase',
        title: phrase.en,
        subtitle: phrase.vi,
        href: `/phrase-bank#${phrase.id}`,
      },
      haystacks: [
        { text: phrase.en, weight: 3 },
        { text: phrase.vi, weight: 3 },
        { text: phrase.context.en, weight: 1 },
        { text: phrase.context.vi, weight: 1 },
      ],
    });
  }

  for (const lesson of lessons) {
    candidates.push({
      result: {
        id: lesson.slug,
        kind: 'lesson',
        title: lesson.title.en,
        subtitle: lesson.title.vi,
        href: `/guide/${lesson.slug}`,
      },
      haystacks: [
        { text: lesson.title.en, weight: 3 },
        { text: lesson.title.vi, weight: 3 },
        { text: lesson.summary.en, weight: 1 },
        { text: lesson.summary.vi, weight: 1 },
      ],
    });
  }

  for (const scenario of scenarios) {
    candidates.push({
      result: {
        id: scenario.slug,
        kind: 'scenario',
        title: scenario.title.en,
        subtitle: scenario.title.vi,
        href: `/scenarios/${scenario.slug}`,
      },
      haystacks: [
        { text: scenario.title.en, weight: 3 },
        { text: scenario.title.vi, weight: 3 },
        { text: scenario.overview.en, weight: 1 },
        { text: scenario.overview.vi, weight: 1 },
        { text: scenario.terms.map((t) => `${t.en} ${t.vi}`).join(' '), weight: 1.5 },
      ],
    });
  }

  return candidates;
}

/**
 * Ranked global search across the whole handbook.
 * Empty query → empty result list (the palette shows its own hints).
 */
export function searchHandbook(query: string, input: SearchIndexInput, limit = 24): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const scored: Array<{ result: SearchResult; score: number }> = [];

  for (const candidate of buildCandidates(input)) {
    let best = 0;
    for (const { text, weight } of candidate.haystacks) {
      if (!text) continue;
      const score = scoreMatch(text, trimmed, weight);
      if (score > best) best = score;
    }
    if (best > 0) {
      scored.push({
        result: candidate.result,
        score: best * KIND_WEIGHT[candidate.result.kind],
      });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title));
  return scored.slice(0, limit).map((item) => item.result);
}

/** Matches a term against a single query, used by the glossary page. */
export function termMatches(term: GlossaryTerm, query: string): number {
  if (!query.trim()) return 1;
  return Math.max(
    scoreMatch(term.en, query, 3),
    scoreMatch(term.vi, query, 3),
    scoreMatch(term.abbreviation ?? '', query, 3),
    scoreMatch((term.variants ?? []).join(' '), query, 2),
    scoreMatch(term.definitionEn, query, 1),
    scoreMatch(term.definitionVi, query, 1),
  );
}

export function phraseMatches(phrase: Phrase, query: string): number {
  if (!query.trim()) return 1;
  return Math.max(
    scoreMatch(phrase.en, query, 3),
    scoreMatch(phrase.vi, query, 3),
    scoreMatch(phrase.context.en, query, 1),
    scoreMatch(phrase.context.vi, query, 1),
  );
}
