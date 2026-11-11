import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

/**
 * Regression suite for the frontend audit (F-01 … F-19 + NEW-*).
 *
 * Deliberately assertion-heavy: the previous suite captured screenshots and
 * asserted almost nothing, which is how the hero clipping and the hidden-state
 * leaks survived. Every test here fails on the pre-fix revision.
 */

/** Below 640px the language switch and full nav live in the mobile drawer. */
async function openNavIfNeeded(page: Page) {
  const burger = page.getByRole('button', { name: /mở menu/i });
  if (await burger.isVisible().catch(() => false)) {
    await burger.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    return true;
  }
  return false;
}

function collectProblems(page: Page) {
  const consoleErrors: string[] = [];
  const failed: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(String(error)));
  page.on('response', (response) => {
    const url = response.url();
    // GitHub Pages returns 404 for the SPA fallback on an unknown path; the
    // app's own 404 page is asserted separately.
    if (response.status() >= 400) failed.push(`${response.status()} ${url}`);
  });
  return { consoleErrors, failed };
}

const ROUTES = [
  '/',
  '/about',
  '/glossary/',
  '/glossary/tuition-fee/',
  '/phrase-bank',
  '/guide/',
  '/guide/types-of-interpreting',
  '/scenarios/',
  '/scenarios/university-partnership-meeting',
  '/toolkit',
  '/tips',
  '/practice',
  '/saved',
];

test.describe('routes and document identity', () => {
  for (const route of ROUTES) {
    test(`${route} renders one h1, a title, and no console errors`, async ({ page }) => {
      const { consoleErrors } = collectProblems(page);
      await page.goto(route, { waitUntil: 'networkidle' });

      await expect(page.locator('h1')).toHaveCount(1);
      const title = await page.title();
      expect(title).toContain('EduLingo Guide');

      // NEW-title: the document title must identify the page, not the site root.
      if (route !== '/') {
        expect(title).not.toBe('EduLingo Guide — Bridge Languages. Connect Education.');
      }
      expect(consoleErrors).toEqual([]);
    });
  }

  test('an unknown path renders the 404 page and still has one h1', async ({ page }) => {
    await page.goto('/this-route-does-not-exist', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/không có trong sổ tay/i);
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('client-side navigation updates the title and moves focus to main', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const homeTitle = await page.title();
    // On narrow viewports the nav is inside the drawer.
    const opened = await openNavIfNeeded(page);
    await page.locator('a[href="/glossary"]').last().click();
    if (opened) {
      // The drawer closes itself on route change.
      await expect(page.getByRole('dialog')).toHaveCount(0);
    }
    await expect(page).toHaveURL(/\/glossary\/?$/);
    // The title effect runs after the URL settles.
    await expect(page).toHaveTitle(/Thuật ngữ giáo dục/, { timeout: 5000 });
    expect(await page.title()).not.toBe(homeTitle);
  });

  test('deep links under the deploy base path load their assets', async ({ page }) => {
    await page.goto('/glossary/tuition-fee/', { waitUntil: 'networkidle' });
    // F-08: `./favicon.svg` used to resolve inside the nested route folder.
    const iconHref = await page.getAttribute('link[rel="icon"]', 'href');
    expect(iconHref).not.toContain('/glossary/');
    const iconStatus = await page.evaluate(async (href) => {
      const response = await fetch(href as string);
      return response.status;
    }, iconHref);
    expect(iconStatus).toBe(200);
  });
});

test.describe('F-01 hero heading', () => {
  for (const width of [320, 360, 390, 768, 1280, 1440]) {
    test(`no heading text is clipped or overflowing at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      const geometry = await page.evaluate(() => {
        const h1 = document.querySelector('h1') as HTMLElement;
        const lines = [...h1.querySelectorAll('span')].map((span) => {
          const box = span.getBoundingClientRect();
          return { text: span.textContent ?? '', left: box.left, right: box.right, width: box.width };
        });
        const parent = h1.parentElement as HTMLElement;
        return {
          lines,
          parentLeft: parent.getBoundingClientRect().left,
          parentRight: parent.getBoundingClientRect().right,
          // scrollWidth > clientWidth means content is cut off inside the box.
          h1Scroll: h1.scrollWidth,
          h1Client: h1.clientWidth,
        };
      });

      for (const line of geometry.lines) {
        expect(line.left, `"${line.text}" starts inside the box`).toBeGreaterThanOrEqual(
          geometry.parentLeft - 1,
        );
        expect(line.right, `"${line.text}" ends inside the box`).toBeLessThanOrEqual(
          geometry.parentRight + 1,
        );
      }
      expect(geometry.h1Scroll).toBeLessThanOrEqual(geometry.h1Client + 1);
    });
  }
});

test.describe('F-04 internal navigation', () => {
  test('client-side links resolve to real pages and render them', async ({ page }) => {
    await page.goto('/tips', { waitUntil: 'networkidle' });
    const related = page.locator('main a[href^="/glossary/"]').first();
    await expect(related).toBeVisible();
    await related.click();
    await expect(page).toHaveURL(/\/glossary\/[a-z-]+$/);
    await expect(page.locator('h1')).toHaveCount(1);
  });
});

test.describe('F-05 glossary URL state', () => {
  test('the URL and the rendered results agree after typing', async ({ page }) => {
    await page.goto('/glossary/', { waitUntil: 'networkidle' });
    await page.getByRole('searchbox', { name: /tìm thuật ngữ/i }).fill('mou');
    await expect(page).toHaveURL(/[?&]q=mou/);
    await expect(page.getByText('Memorandum of Understanding')).toBeVisible();
  });

  test('a query arriving while the page is mounted is applied', async ({ page }) => {
    await page.goto('/glossary/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('status')).toContainText('96');
    // In-app navigation to the same route with different params.
    await page.evaluate(() => {
      window.history.pushState({}, '', '/glossary?q=hoc%20bong');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    await expect(page.getByRole('searchbox', { name: /tìm thuật ngữ/i })).toHaveValue('hoc bong');
    await expect(page.getByText('Full scholarship')).toBeVisible();
  });

  test('back and forward move between queries', async ({ page }) => {
    await page.goto('/glossary/?q=mou', { waitUntil: 'networkidle' });
    await page.goto('/glossary/?q=scholarship', { waitUntil: 'networkidle' });
    await page.goBack();
    await expect(page.getByRole('searchbox', { name: /tìm thuật ngữ/i })).toHaveValue('mou');
  });

  test('a category filter lands in the URL and narrows the list', async ({ page }) => {
    await page.goto('/glossary/', { waitUntil: 'networkidle' });
    // Below 1024px the category rail is replaced by a filter dialog.
    const filtersButton = page.getByRole('button', { name: /bộ lọc/i });
    if (await filtersButton.isVisible().catch(() => false)) {
      await filtersButton.click();
      await expect(page.getByRole('dialog')).toBeVisible();
    }
    await page.getByRole('button', { name: /học bổng & hỗ trợ tài chính/i }).first().click();
    await expect(page).toHaveURL(/category=/);
    await expect(page.getByRole('status')).toContainText('12');
  });
});

test.describe('F-02 practice scores', () => {
  test('both quizzes keep their own score and survive a reload', async ({ page }) => {
    await page.goto('/practice', { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });

    const cards = page.locator('#quizzes article');
    for (let cardIndex = 0; cardIndex < 2; cardIndex += 1) {
      const card = cards.nth(cardIndex);
      const groups = card.locator('fieldset');
      const count = await groups.count();
      for (let i = 0; i < count; i += 1) {
        await groups.nth(i).locator('input[type="radio"]').first().check();
      }
      await card.getByRole('button', { name: /kiểm tra đáp án/i }).click();
    }

    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('edulingo:v1:quiz-scores') ?? '{}'));
    expect(Object.keys(stored)).toHaveLength(2);
    for (const entry of Object.values(stored) as Array<{ attempts: number }>) {
      expect(entry.attempts).toBe(1);
    }

    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByText(/Điểm cao nhất/)).toHaveCount(2);
  });
});

test.describe('F-03 tips bookmarks round-trip', () => {
  test('save a tip, see it in /saved, follow the link back, then remove it', async ({ page }) => {
    await page.goto('/tips', { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });

    await page.getByRole('button', { name: /^Lưu: / }).click();
    await expect(page.getByRole('button', { name: /^Bỏ lưu: / })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await page.goto('/saved', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: /Lưu ý & lỗi/i })).toBeVisible();
    const link = page.locator('main a[href^="/tips?tip="]').first();
    const href = await link.getAttribute('href');
    expect(href).toMatch(/^\/tips\?tip=/);

    await link.click();
    await expect(page).toHaveURL(new RegExp(href!.replace('?', '\\?')));
    const remove = page.getByRole('button', { name: /^Bỏ lưu: / });
    await expect(remove).toHaveAttribute('aria-pressed', 'true');
    await remove.click();
    await expect(page.getByRole('button', { name: /^Lưu: / })).toBeVisible();
  });

  test('a legacy tip bookmark stored under lessons still appears', async ({ page }) => {
    await page.goto('/saved', { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      localStorage.setItem(
        'edulingo:v1:bookmarks',
        JSON.stringify({ glossary: [], phrases: [], lessons: ['tip:machine-translation'], scenarios: [] }),
      );
    });
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('main a[href^="/tips?tip="]')).toHaveCount(1);
  });
});

test.describe('F-06 phrase bank display modes', () => {
  test('vi mode never blanks a card, even after hide-all', async ({ page }) => {
    await page.goto('/phrase-bank', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /ẩn tất cả bản dịch/i }).click();
    await page.getByRole('button', { name: /^Chỉ tiếng Việt$/ }).click();

    const empties = await page.evaluate(() => {
      const placeholders = [...document.querySelectorAll('p')].filter((p) =>
        p.textContent.includes('— Hiện bản dịch —'),
      );
      return placeholders.length;
    });
    expect(empties).toBe(0);
    await expect(page.getByRole('button', { name: /ẩn tất cả bản dịch|hiện tất cả bản dịch/i })).toHaveCount(0);
  });

  test('both mode still hides and reveals translations individually', async ({ page }) => {
    await page.goto('/phrase-bank', { waitUntil: 'networkidle' });
    const hide = page.getByRole('button', { name: /^Ẩn bản dịch$/ });
    await expect(hide.first()).toBeVisible();
    await hide.first().click();
    await expect(page.getByRole('button', { name: /^Hiện bản dịch$/ }).first()).toBeVisible();
  });
});

test.describe('F-07 scenario hidden translations', () => {
  test('hidden turns do not carry over to the next scenario', async ({ page }) => {
    await page.goto('/scenarios/university-partnership-meeting', { waitUntil: 'networkidle' });
    const firstToggle = page
      .locator('section:has(#dialogue-heading) ol > li')
      .first()
      .locator('button[aria-pressed]');
    await firstToggle.click();
    await expect(page.getByText('— Hiện bản dịch —')).toHaveCount(1);

    await page.locator('nav[aria-label] a[href^="/scenarios/"]').last().click();
    await expect(page).not.toHaveURL(/university-partnership-meeting/);
    await expect(page.getByText('— Hiện bản dịch —')).toHaveCount(0);
  });
});

test.describe('F-13 global search dialog', () => {
  test('exposes combobox semantics and moves the active descendant', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.keyboard.press('Control+k');
    const input = page.locator('#global-search-input');
    await expect(input).toBeVisible();
    await input.fill('hoc bong');

    await expect(input).toHaveAttribute('role', 'combobox');
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await expect(input).toHaveAttribute('aria-controls', 'global-search-results');
    await expect(page.locator('[role="listbox"]')).toHaveCount(1);

    const firstActive = await input.getAttribute('aria-activedescendant');
    expect(firstActive).toBe('global-search-option-0');
    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveAttribute('aria-activedescendant', 'global-search-option-1');
  });

  test('Enter opens the highlighted result and Escape restores focus', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.keyboard.press('Control+k');
    await page.locator('#global-search-input').fill('mou');
    await expect(page.getByRole('option').first()).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/glossary\/memorandum-of-understanding/);

    await page.keyboard.press('Control+k');
    const input = page.locator('#global-search-input');
    await input.fill('exchange');
    await page.keyboard.press('Escape');
    await expect(input).toHaveCount(0);
  });

  test('clamps the active option when the result set shrinks', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.keyboard.press('Control+k');
    const input = page.locator('#global-search-input');
    await input.fill('a');
    for (let i = 0; i < 5; i += 1) await page.keyboard.press('ArrowDown');
    await input.fill('mou');
    await expect(page.getByRole('option').first()).toHaveAttribute('aria-selected', 'true');
  });

  test('finds results without diacritics and by abbreviation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.keyboard.press('Control+k');
    const input = page.locator('#global-search-input');

    await input.fill('hoc bong');
    await expect(page.getByRole('option').first()).toBeVisible();
    await input.fill('MOU');
    await expect(
      page.getByRole('listbox').getByText('Memorandum of Understanding'),
    ).toBeVisible();
    await input.fill('zzzzqqq');
    await expect(page.getByText(/không có kết quả/i)).toBeVisible();
  });
});

test.describe('F-09 corrupted storage', () => {
  const values = ['null', '42', '"str"', '[]', '{}', 'not json', '{"uiLang":42}', '{"glossary":null}'];

  for (const value of values) {
    test(`renders the app when settings and bookmarks are ${value}`, async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.evaluate((stored) => {
        localStorage.clear();
        localStorage.setItem('edulingo:v1:settings', stored);
        localStorage.setItem('edulingo:v1:bookmarks', stored);
      }, value);
      await page.goto('/saved', { waitUntil: 'networkidle' });
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('body')).not.toBeEmpty();
    });
  }
});

test.describe('F-19 translation draft word count', () => {
  test('whitespace-only input reports no word count', async ({ page }) => {
    await page.goto('/practice', { waitUntil: 'networkidle' });
    await page.locator('#exercise-response').fill('   \n  \t ');
    await expect(page.getByText(/^\d+ từ$/)).toHaveCount(0);
    await page.locator('#exercise-response').fill('one two three');
    await expect(page.getByText('3 từ')).toBeVisible();
  });
});

test.describe('F-11 interface language', () => {
  test('switching to English translates the chrome and persists', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // The switch sits in the header on wide screens and in the drawer below 640px.
    const inDrawer = await openNavIfNeeded(page);
    await page.getByRole('button', { name: /đổi ngôn ngữ giao diện/i }).last().click();
    // A Radix dialog marks the rest of the page aria-hidden while open, which
    // would hide the very headings this test asserts on.
    if (inDrawer) await page.keyboard.press('Escape');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    // Section headings are chrome and must follow the interface language. They
    // render at every width, unlike the header links that hide below 640px.
    await expect(
      page.getByRole('heading', { level: 2, name: /Browse by educational event/i }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /Nhóm thuật ngữ/ })).toHaveCount(0);

    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    // Chrome is translated, not just the html lang attribute.
    await expect(page.getByRole('heading', { level: 2, name: /Browse by educational event/i })).toBeVisible();
  });
});

test.describe('F-12 bilingual language metadata', () => {
  test('each side of a bilingual block carries its own lang', async ({ page }) => {
    await page.goto('/glossary/tuition-fee/', { waitUntil: 'networkidle' });
    await expect(page.locator('h1[lang="en"]')).toBeVisible();
    await expect(page.locator('p[lang="vi"]').first()).toBeVisible();
    await expect(page.locator('p[lang="en"]').first()).toBeVisible();
  });

  test('scenario dialogue marks both languages', async ({ page }) => {
    await page.goto('/scenarios/university-partnership-meeting', { waitUntil: 'networkidle' });
    await expect(page.locator('section:has(#dialogue-heading) p[lang="en"]').first()).toBeVisible();
    await expect(page.locator('section:has(#dialogue-heading) p[lang="vi"]').first()).toBeVisible();
  });
});

test.describe('F-14 contrast of informational text', () => {
  test('every text node meets WCAG AA', async ({ page }) => {
    const failures: Array<{ route: string; text: string; ratio: number; need: number; color: string }> = [];

    for (const route of [
      '/',
      '/glossary/',
      '/phrase-bank',
      '/scenarios/university-partnership-meeting',
      '/toolkit',
      '/about',
    ]) {
      await page.goto(route, { waitUntil: 'networkidle' });
      const bad = await page.evaluate(() => {
        // Tailwind v4 emits oklab()/color-mix() for alpha colours, which a regex
        // over rgb() mis-parses. Render each colour into a 1x1 canvas instead.
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
        const toRgb = (cssColor: string): [number, number, number, number] => {
          if (!cssColor || cssColor === 'transparent') return [0, 0, 0, 0];
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = '#000';
          ctx.fillStyle = cssColor;
          ctx.fillRect(0, 0, 1, 1);
          const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
          return [r, g, b, a / 255];
        };
        const toLinear = (c: number) => {
          const s = c / 255;
          return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        };
        const luminance = ([r, g, b]: number[]) =>
          0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
        const backdrop = (element: Element): number[] => {
          const layers: Array<[number, number, number, number]> = [];
          let node: Element | null = element;
          while (node) {
            const rgba = toRgb(getComputedStyle(node).backgroundColor);
            if (rgba[3] > 0) layers.push(rgba);
            node = node.parentElement;
          }
          let out: number[] = [255, 255, 255];
          for (let i = layers.length - 1; i >= 0; i -= 1) {
            const [r, g, b, a] = layers[i];
            out = out.map((value, index) => [r, g, b][index] * a + value * (1 - a));
          }
          return out;
        };
        const ratio = (a: number[], b: number[]) => {
          const l1 = luminance(a);
          const l2 = luminance(b);
          return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        };

        const found: Array<{ text: string; ratio: number; need: number; color: string; cls: string }> = [];
        for (const element of document.querySelectorAll('p, span, dt, dd, a, li, button, th, td, label')) {
          const text = (element.textContent ?? '').trim();
          if (!text || element.children.length > 0) continue;
          const style = getComputedStyle(element);
          if (style.visibility === 'hidden' || style.display === 'none') continue;
          const [r, g, b, alpha] = toRgb(style.color);
          if (alpha === 0) continue;
          const foreground = [r, g, b].map((value) => value * alpha + 255 * (1 - alpha));
          const size = parseFloat(style.fontSize);
          const weight = parseInt(style.fontWeight, 10) || 400;
          const large = size >= 24 || (size >= 18.66 && weight >= 700);
          const need = large ? 3 : 4.5;
          const value = ratio(foreground, backdrop(element));
          if (value < need) {
            found.push({
              text: text.slice(0, 40),
              ratio: Number(value.toFixed(2)),
              need,
              color: style.color,
              cls: String(element.className).slice(0, 60),
            });
          }
        }
        return found;
      });
      failures.push(...bad.map((item) => ({ route, ...item })));
    }

    expect(failures).toEqual([]);
  });
});

test.describe('F-16 layout integrity across viewports', () => {
  test('no page scrolls horizontally and nothing is clipped', async ({ page }) => {
    for (const route of ['/', '/glossary/', '/phrase-bank', '/guide/', '/toolkit', '/practice', '/about']) {
      await page.goto(route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${route} scrolls horizontally`).toBeLessThanOrEqual(1);
    }
  });

  test('navigation is reachable and touch targets are usable', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const opened = await openNavIfNeeded(page);
    if (opened) {
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toHaveCount(0);
      // Body scroll lock must be released with the drawer.
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
    } else {
      await expect(page.getByRole('navigation', { name: /điều hướng/i }).first()).toBeVisible();
    }

    // Buttons and checkboxes are discrete controls, so WCAG 2.2 AA target size
    // (2.5.8, 24x24 CSS px) applies. Inline text links — including those in the
    // footer — are exempt under the inline exception and are not checked.
    const tooSmall = await page.evaluate(() => {
      const bad = [];
      for (const element of document.querySelectorAll('button, input[type="checkbox"], select')) {
        const style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        // `sr-only` controls are clipped by design and only appear on focus.
        if (style.clipPath !== 'none' && style.clipPath !== 'auto') continue;
        const box = element.getBoundingClientRect();
        if (box.width <= 1 || box.height <= 1) continue;
        if (box.width < 24 || box.height < 24) {
          bad.push(
            `${element.tagName.toLowerCase()} ${Math.round(box.width)}x${Math.round(box.height)} ${String(element.className).slice(0, 50)}`,
          );
        }
      }
      return bad;
    });
    expect(tooSmall).toEqual([]);
  });
});

test.describe('F-15 CSV export safety', () => {
  test('a formula-like glossary row is neutralised in the export', async ({ page }) => {
    await page.goto('/toolkit', { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });

    await page.getByRole('button', { name: /thêm dòng/i }).first().click();
    await expect(page.getByRole('textbox', { name: /dòng 1/i }).first()).toBeVisible();
    await page
      .getByRole('textbox', { name: /thuật ngữ tiếng anh, dòng 1/i })
      .fill('=HYPERLINK("http://evil")');
    await page.getByRole('textbox', { name: /thuật ngữ tiếng việt, dòng 1/i }).fill('Học bổng');

    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: /xuất csv/i }).click();
    const file = await download;
    const stream = await file.createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream) chunks.push(chunk as Buffer);
    const csv = Buffer.concat(chunks).toString('utf8');

    expect(csv).toContain("'=HYPERLINK");
    expect(csv).toContain('Học bổng');
    // Header matches the visible table (localized chrome).
    expect(csv).toContain('Thuật ngữ tiếng Anh');
    expect(csv).toContain('Ngữ cảnh');
    // UTF-8 BOM so Excel reads Vietnamese correctly.
    expect(csv.charCodeAt(0)).toBe(0xfeff);
  });
});

test.describe('NEW: history and scroll restoration', () => {
  test('browser back returns to the previous page and the top of it', async ({ page }) => {
    await page.goto('/glossary/', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: /full scholarship/i }).first().click();
    await expect(page).toHaveURL(/\/glossary\/full-scholarship/);
    await page.goBack();
    await expect(page).toHaveURL(/\/glossary\/?$/);

    // The scroll reset runs in an effect after the route commits, so poll rather
    // than sampling once: a bare read can land before the effect fires.
    await expect
      .poll(() => page.evaluate(() => Math.round(window.scrollY)), { timeout: 4000 })
      .toBeLessThan(80);
    expect(await page.evaluate(() => history.scrollRestoration)).toBe('manual');
  });

  test('saved bookmarks persist across a reload', async ({ page }) => {
    await page.goto('/glossary/tuition-fee/', { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /^Lưu: / }).first().click();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByRole('button', { name: /^Bỏ lưu: / }).first()).toBeVisible();
  });
});
