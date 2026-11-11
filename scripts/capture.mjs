/**
 * Visual capture for the fix report. Writes full-resolution PNGs to
 * `artifacts/audit/<route>-<width>.png` after fonts have loaded and lazy images
 * have been triggered (Playwright's `fullPage` alone leaves them blank).
 *
 * Usage: node scripts/capture.mjs [baseUrl] [label]
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4173';
const LABEL = process.argv[3] ?? 'after';
const OUT = 'artifacts/audit';
mkdirSync(OUT, { recursive: true });

const TARGETS = [
  ['/', 'home'],
  ['/glossary/', 'glossary'],
  ['/glossary/tuition-fee/', 'glossary-detail'],
  ['/phrase-bank', 'phrase-bank'],
  ['/guide/types-of-interpreting', 'guide-lesson'],
  ['/scenarios/university-partnership-meeting', 'scenario-detail'],
  ['/practice', 'practice'],
  ['/toolkit', 'toolkit'],
  ['/tips', 'tips'],
  ['/saved', 'saved'],
  ['/about', 'about'],
];
const WIDTHS = [320, 390, 768, 1440];

const browser = await chromium.launch();
for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const [route, name] of TARGETS) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Scroll through so lazy images decode.
    for (let y = 0; y < 12000; y += 500) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(40);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}/${LABEL}-${name}-${width}.png`, fullPage: true });
  }
  await page.close();
}
await browser.close();
console.log(`captured to ${OUT} (label: ${LABEL})`);
