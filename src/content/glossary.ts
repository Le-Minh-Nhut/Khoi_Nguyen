import type { GlossaryTerm } from '@/types/content';
import { glossaryPartStudents } from './glossary/partStudents.ts';
import { glossaryPartCooperation } from './glossary/partCooperation.ts';
import { glossaryPartResearch } from './glossary/partResearch.ts';

/** All glossary terms, in category order. 96 entries, 12 per category. */
export const glossaryTerms: GlossaryTerm[] = [
  ...glossaryPartStudents,
  ...glossaryPartCooperation,
  ...glossaryPartResearch,
];
