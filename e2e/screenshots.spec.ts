import { test } from '@playwright/test';
import { mkdirSync } from 'node:fs';

/**
 * Visual capture only — it produces files rather than assertions, so it runs once
 * (see `testMatch` for the desktop project) instead of on every viewport project.
 */
const PAGES: Array<{ path: string; name: string }> = [
  { path: '/', name: 'home' },
  { path: '/glossary', name: 'glossary' },
  { path: '/glossary/memorandum-of-understanding', name: 'glossary-detail' },
  { path: '/phrase-bank', name: 'phrase-bank' },
  { path: '/guide/types-of-interpreting', name: 'guide-lesson' },
  { path: '/scenarios/mou-signing-ceremony', name: 'scenario-detail' },
  { path: '/toolkit', name: 'toolkit' },
  { path: '/practice', name: 'practice' },
  { path: '/tips', name: 'tips' },
  { path: '/saved', name: 'saved' },
  { path: '/about', name: 'about' },
  { path: '/missing-page', name: 'not-found' },
];

test.describe('visual capture', () => {
  for (const viewport of [
    { tag: 'desktop', width: 1440, height: 900 },
    { tag: 'mobile', width: 390, height: 844 },
  ]) {
    for (const target of PAGES) {
      test(`${viewport.tag} ${target.name}`, async ({ page }) => {
        mkdirSync('screenshots', { recursive: true });
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(target.path);
        await page.waitForLoadState('networkidle');
        await page.screenshot({
          path: `screenshots/${viewport.tag}-${target.name}.png`,
          fullPage: true,
        });
      });
    }
  }

  test('mobile drawer open', async ({ page }) => {
    mkdirSync('screenshots', { recursive: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: /Mở menu/ }).click();
    await page.getByRole('dialog').waitFor();
    await page.screenshot({ path: 'screenshots/mobile-drawer.png' });
  });

  test('search palette open', async ({ page }) => {
    mkdirSync('screenshots', { recursive: true });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.getByRole('banner').waitFor();
    await page.keyboard.press('Control+k');
    await page.locator('#global-search-input').fill('hoc bong');
    await page.waitForTimeout(250);
    await page.screenshot({ path: 'screenshots/desktop-search.png' });
  });
});
