import type { Lesson } from '@/types/content';
import { lessonPart1 } from './lessons/part1';
import { lessonPart2 } from './lessons/part2';
import { lessonPart3 } from './lessons/part3';

/** Eight chapters, in reading order. */
export const lessons: Lesson[] = [...lessonPart1, ...lessonPart2, ...lessonPart3];
