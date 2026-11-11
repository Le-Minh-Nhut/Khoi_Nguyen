/**
 * Full-site sweep: drives every route and reports concrete failures, including
 * cases the audit brief calls out (odd input, storage failures, anchors,
 * missing slugs, oversized text).
 *
 * Usage: node scripts/site-sweep.mjs [baseUrl]
 */
import { chromium } from '@playwright/test';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4173';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const issues = [];
const note = (id, detail) => issues.push({ id, detail });

/* Invalid and missing slugs must not render a blank page. */
for (const path of ['/glossary/not-a-term', '/guide/not-a-chapter', '/scenarios/not-a-scenario', '/nope']) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
  const h1 = await page.locator('h1').count();
  const text = (await page.locator('body').innerText()).trim().length;
  if (h1 !== 1 || text < 50) note('missing-slug', `${path}: h1=${h1} textLen=${text}`);
}

/* Hash anchors inside a prerendered deep link. */
await page.goto(`${BASE}/guide/types-of-interpreting`, { waitUntil: 'networkidle' });
const firstAnchor = await page.locator('aside a[href^="#"]').first().getAttribute('href');
await page.goto(`${BASE}/guide/types-of-interpreting${firstAnchor}`, { waitUntil: 'networkidle' });
const anchorOk = await page.evaluate((href) => {
  const el = document.getElementById(href.slice(1));
  if (!el) return false;
  return Math.abs(el.getBoundingClientRect().top) < 400;
}, firstAnchor);
if (!anchorOk) note('anchor', `deep link ${firstAnchor} did not scroll to its section`);

/* Odd input: very long query, control characters, SQL-ish and HTML-ish strings. */
await page.goto(`${BASE}/glossary/`, { waitUntil: 'networkidle' });
const field = page.getByRole('searchbox', { name: /tìm thuật ngữ/i });
for (const value of ['<script>alert(1)</script>', "'; DROP TABLE terms;--", 'x'.repeat(500), '   ', 'á'.repeat(200)]) {
  await field.fill(value);
  await page.waitForTimeout(250);
  const heading = await page.locator('h1').count();
  if (heading !== 1) note('odd-input', `query ${JSON.stringify(value.slice(0, 30))} broke the page`);
  const count = await page.getByRole('status').count();
  if (count === 0) note('odd-input', `query ${JSON.stringify(value.slice(0, 30))} hid the result count`);
}
await field.fill('');

/* Storage blocked: reads/writes must not throw. */
await page.goto(`${BASE}/toolkit`, { waitUntil: 'networkidle' });
await page.evaluate(() => {
  const original = Storage.prototype.setItem;
  Storage.prototype.setItem = function patched() {
    throw new DOMException('QuotaExceededError', 'QuotaExceededError');
  };
  window.__restore = () => {
    Storage.prototype.setItem = original;
  };
});
await page.getByRole('button', { name: /thêm dòng/i }).first().click();
const stillAlive = await page.locator('h1').count();
if (stillAlive !== 1) note('storage-blocked', 'toolkit broke when setItem threw');
await page.evaluate(() => window.__restore?.());

/* Oversized text in a user-editable field must not break layout. */
await page.goto(`${BASE}/toolkit`, { waitUntil: 'networkidle' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle' });
await page.getByRole('button', { name: /thêm dòng/i }).first().click();
const row = page.getByRole('textbox', { name: /dòng 1/i }).first();
await row.fill('Supercalifragilisticexpialidocious'.repeat(6));
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
if (overflow > 1) note('long-input', `long glossary value caused ${overflow}px horizontal overflow`);

/* Every in-app link must resolve: collect hrefs and probe them. */
const seen = new Set();
for (const route of ['/', '/glossary/', '/guide/', '/scenarios/', '/toolkit', '/tips', '/practice', '/saved', '/about']) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll('main a[href], footer a[href], header a[href]')]
      .map((a) => a.getAttribute('href'))
      .filter((href) => href && href.startsWith('/') && !href.startsWith('//')),
  );
  hrefs.forEach((href) => seen.add(href));
}
for (const href of seen) {
  const response = await page.request.get(`${BASE}${href}`);
  if (response.status() >= 400) note('dead-link', `${href} -> ${response.status()}`);
}

/* Print stylesheet presence (brief lists it as optional, so only report absence). */
const hasPrint = await page.evaluate(() =>
  [...document.styleSheets].some((sheet) => {
    try {
      return [...sheet.cssRules].some((rule) => rule.constructor.name === 'CSSMediaRule' && rule.conditionText?.includes('print'));
    } catch {
      return false;
    }
  }),
);

await browser.close();
console.log(JSON.stringify({ issues, checkedLinks: seen.size, hasPrint }, null, 2));
if (issues.length) process.exitCode = 1;
