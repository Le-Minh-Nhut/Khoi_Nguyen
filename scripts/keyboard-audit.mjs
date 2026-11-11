/**
 * Keyboard and focus audit across the primary flows. Drives the app with the
 * keyboard only and reports anything unreachable or mislabelled.
 *
 * Usage: node scripts/keyboard-audit.mjs [baseUrl]
 */
import { chromium } from '@playwright/test';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4173';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const results = [];

/* 1. Skip link is the first stop and moves focus into main. */
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.keyboard.press('Tab');
const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim());
results.push({ check: 'skip link is first tab stop', pass: /bỏ qua|skip/i.test(firstFocus ?? ''), got: firstFocus });
await page.keyboard.press('Enter');
const hashTarget = await page.evaluate(() => location.hash);
results.push({ check: 'skip link targets #main-content', pass: hashTarget === '#main-content', got: hashTarget });

/* 2. Every interactive element has an accessible name. */
for (const route of ['/', '/glossary/', '/phrase-bank', '/toolkit', '/practice', '/saved', '/tips']) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
  // Real accessible names come from a <label>, aria-labelledby, or aria-label —
  // a DOM-text heuristic reports false positives for labelled inputs.
  const unnamed = await page.evaluate(async () => {
    const bad = [];
    const candidates = [...document.querySelectorAll('button, a[href], input, select, textarea')].filter(
      (element) => {
        const style = getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden';
      },
    );
    for (const element of candidates) {
      const id = element.id;
      const htmlFor = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`) : null;
      const wrapped = element.closest('label');
      const named =
        element.getAttribute('aria-label') ||
        element.getAttribute('aria-labelledby') ||
        element.getAttribute('title') ||
        htmlFor?.textContent?.trim() ||
        wrapped?.textContent?.trim() ||
        (element.textContent ?? '').trim();
      if (!named) {
        bad.push(
          `${element.tagName.toLowerCase()}${id ? '#' + id : ''}.${String(element.className).slice(0, 40)}`,
        );
      }
    }
    return bad;
  });
  results.push({ check: `${route}: no unnamed interactive elements`, pass: unnamed.length === 0, got: unnamed });
}

/* 3. Focus ring is visible (outline changes) on a button. */
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.keyboard.press('Tab');
await page.keyboard.press('Tab');
const focusStyle = await page.evaluate(() => {
  const element = document.activeElement;
  if (!element) return null;
  const style = getComputedStyle(element);
  return { tag: element.tagName, outlineWidth: style.outlineWidth, outlineStyle: style.outlineStyle };
});
results.push({
  check: 'focus-visible draws an outline',
  pass: focusStyle !== null && focusStyle.outlineStyle !== 'none' && parseFloat(focusStyle.outlineWidth) > 0,
  got: focusStyle,
});

/* 4. Escape closes the mobile drawer and releases the scroll lock. */
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /mở menu/i }).click();
const locked = await page.evaluate(() => document.body.style.overflow);
await page.keyboard.press('Escape');
await page.waitForTimeout(300);
const released = await page.evaluate(() => document.body.style.overflow);
results.push({ check: 'drawer locks and releases body scroll', pass: locked === 'hidden' && released !== 'hidden', got: { locked, released } });

/* 5. Tab order inside the drawer stays within it. */
await page.getByRole('button', { name: /mở menu/i }).click();
await page.waitForTimeout(200);
const inside = await page.evaluate(() => {
  const drawer = document.querySelector('[role="dialog"]');
  return drawer?.contains(document.activeElement) ?? false;
});
results.push({ check: 'focus moves into the drawer', pass: inside, got: inside });
await page.keyboard.press('Escape');

/* 6. Global search is fully keyboard-drivable. */
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.keyboard.press('Control+k');
await page.keyboard.type('mou');
const activeId = await page.getAttribute('#global-search-input', 'aria-activedescendant');
await page.keyboard.press('Enter');
await page.waitForTimeout(500);
results.push({
  check: 'search opens, highlights and navigates by keyboard',
  pass: Boolean(activeId) && page.url().includes('/glossary/'),
  got: { activeId, url: page.url() },
});

await browser.close();
let failures = 0;
for (const result of results) {
  if (!result.pass) failures += 1;
  console.log(`${result.pass ? 'PASS' : 'FAIL'}  ${result.check}${result.pass ? '' : ` -> ${JSON.stringify(result.got)}`}`);
}
console.log(`\n${results.length - failures}/${results.length} keyboard checks passed`);
process.exit(failures === 0 ? 0 : 1);
