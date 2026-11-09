import type { GlossaryTerm } from '@/types/content';
import { glossaryPartStudents } from './glossary/partStudents';
import { glossaryPartCooperation } from './glossary/partCooperation';
import { glossaryPartResearch } from './glossary/partResearch';

/** All glossary terms, in category order. 96 entries, 12 per category. */
export const glossaryTerms: GlossaryTerm[] = [
  ...glossaryPartStudents,
  ...glossaryPartCooperation,
  ...glossaryPartResearch,
];
