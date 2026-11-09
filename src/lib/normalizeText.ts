/**
 * Diacritic-insensitive normalization for Vietnamese + English search.
 * "học bổng" → "hoc bong", "Đại học" → "dai hoc".
 */
const COMBINING_MARKS = /[\u0300-\u036f]/g;

export function normalizeText(input: string): string {
  return input
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Split a query into normalized tokens for AND matching. */
export function tokenize(input: string): string[] {
  return normalizeText(input).split(' ').filter(Boolean);
}

/**
 * Rank a haystack against a query. Higher is better; 0 means no match.
 * All tokens must appear (AND) so multi-word queries stay meaningful.
 */
export function scoreMatch(haystack: string, query: string, weight = 1): number {
  const tokens = tokenize(query);
  if (tokens.length === 0) return 0;
  const hay = normalizeText(haystack);
  let score = 0;
  for (const token of tokens) {
    const index = hay.indexOf(token);
    if (index === -1) return 0;
    // Exact/prefix hits on a word boundary outrank mid-word hits.
    const boundary = index === 0 || hay[index - 1] === ' ';
    score += boundary ? 3 : 1;
    if (boundary && hay.startsWith(token)) score += 2;
  }
  return score * weight;
}

/** Corners a normalized string so it can be matched by abbreviation. */
export function matchesQuery(haystack: string, query: string): boolean {
  return scoreMatch(haystack, query) > 0;
}
