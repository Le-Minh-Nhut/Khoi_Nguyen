/**
 * GitHub Pages serves a 404 status for paths with no file. Copying the app
 * shell into `<route>/index.html` for every known route makes those URLs
 * return 200 while React Router still owns the rendering.
 *
 * Run after `vite build` (uses the same alias config, so it imports the
 * typed content directly instead of re-parsing source files).
 */
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { glossaryTerms } from '../src/content/glossary.ts';
import { lessons } from '../src/content/lessons.ts';
import { scenarios } from '../src/content/scenarios.ts';

const DIST = 'dist';
const shell = join(DIST, 'index.html');

const routes = [
  'about',
  'glossary',
  'phrase-bank',
  'guide',
  'scenarios',
  'toolkit',
  'tips',
  'practice',
  'saved',
  ...glossaryTerms.map((term) => `glossary/${term.slug}`),
  ...lessons.map((lesson) => `guide/${lesson.slug}`),
  ...scenarios.map((scenario) => `scenarios/${scenario.slug}`),
];

for (const route of routes) {
  const target = join(DIST, route, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await copyFile(shell, target);
}

console.log(`Routes prerendered: ${routes.length}`);
