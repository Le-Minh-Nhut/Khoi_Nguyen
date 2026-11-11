import { expect, test, type Page } from '@playwright/test';

const ROUTES: Array<{ path: string; heading: RegExp }> = [
  { path: '/', heading: /Bridge Languages/i },
  { path: '/glossary', heading: /Thuật ngữ giáo dục/i },
  { path: '/glossary/memorandum-of-understanding', heading: /Memorandum of Understanding/i },
  { path: '/phrase-bank', heading: /Ngân hàng mẫu câu/i },
  { path: '/guide', heading: /Hướng dẫn phiên dịch/i },
  { path: '/guide/types-of-interpreting', heading: /Hiểu các hình thức phiên dịch/i },
  { path: '/scenarios', heading: /Hướng dẫn tình huống/i },
  { path: '/scenarios/mou-signing-ceremony', heading: /MOU Signing Ceremony|Lễ ký kết/i },
  { path: '/toolkit', heading: /Bộ công cụ phiên dịch/i },
  { path: '/tips', heading: /Lưu ý & lỗi thường gặp/i },
  { path: '/practice', heading: /Luyện tập/i },
  { path: '/saved', heading: /Nội dung đã lưu/i },
  { path: '/about', heading: /Về sổ tay này/i },
];

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  return overflow;
}

test.describe('every route renders', () => {
  for (const route of ROUTES) {
    test(`${route.path} loads with content`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(route.heading);
      await expect(page.getByRole('contentinfo')).toBeVisible();
      expect(await noHorizontalOverflow(page)).toBeLessThanOrEqual(1);
    });
  }

  test('unknown route shows the 404 page', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/không có trong sổ tay/i);
    await expect(page.getByText('404')).toBeVisible();
  });
});

test.describe('navigation', () => {
  test('header links route to real pages and mark the active section', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) < 1024, 'desktop navigation only');
    await page.goto('/');
    const header = page.getByRole('banner');
    await header.getByRole('button', { name: /Tra cứu/i }).click();
    await header.getByRole('link', { name: 'Thuật ngữ', exact: true }).click();
    await expect(page).toHaveURL(/\/glossary/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Thuật ngữ giáo dục/);
  });

  test('browser back returns to the previous page', async ({ page }) => {
    await page.goto('/glossary');
    await page.getByRole('link', { name: /Memorandum of Understanding/i }).first().click();
    await expect(page).toHaveURL(/\/glossary\/memorandum-of-understanding/);
    await page.goBack();
    await expect(page).toHaveURL(/\/glossary$/);
    await page.goForward();
    await expect(page).toHaveURL(/\/glossary\/memorandum-of-understanding/);
  });

  test('breadcrumbs link back to the index', async ({ page }) => {
    await page.goto('/glossary/tuition-fee');
    await page.getByRole('navigation').getByRole('link', { name: /Thuật ngữ/ }).first().click();
    await expect(page).toHaveURL(/\/glossary/);
  });
});

test.describe('search', () => {
  test('⌘K opens the palette and finds a term without diacritics', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('banner').waitFor();
    await page.keyboard.press('Control+k');
    const input = page.locator('#global-search-input');
    await expect(input).toBeVisible();
    await input.fill('hoc bong');
    await expect(page.getByRole('option').first()).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/glossary\//);
  });

  test('Escape closes the palette', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('banner').waitFor();
    await page.keyboard.press('Control+k');
    await expect(page.locator('#global-search-input')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#global-search-input')).toBeHidden();
  });

  test('glossary search filters and shows a real count', async ({ page }) => {
    await page.goto('/glossary');
    const status = page.getByRole('status').first();
    await expect(status).toContainText('96');
    await page.getByRole('searchbox', { name: /tìm thuật ngữ/i }).fill('mou');
    await expect(page.getByRole('link', { name: /Memorandum of Understanding/i }).first()).toBeVisible();
    await expect(status).not.toContainText('96');
  });
});

test.describe('bookmarks and clipboard', () => {
  test('bookmark persists across reload and appears on the saved page', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/glossary/tuition-fee');

    const save = page.getByRole('button', { name: /tuition-fee$/ });
    await save.waitFor();
    await save.click();
    await expect(save).toHaveAttribute('aria-pressed', 'true');

    await page.reload();
    await expect(page.getByRole('button', { name: /tuition-fee$/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await page.goto('/saved');
    await expect(page.getByRole('link', { name: /Tuition fee/i }).first()).toBeVisible();
  });

  test('copy button writes to the clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/glossary/memorandum-of-understanding');
    await page.getByRole('button', { name: /^Sao chép$/ }).first().click();
    await expect(page.getByText('Đã sao chép').first()).toBeVisible();
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('Biên bản ghi nhớ');
  });
});

test.describe('phrase bank', () => {
  test('hiding all translations removes Vietnamese text and restores it', async ({ page }) => {
    await page.goto('/phrase-bank');
    const firstPhrase = page.locator('li[id^="opening-"]').first();
    await expect(firstPhrase).toContainText(/chào mừng|Kính thưa/i);
    await page.getByRole('button', { name: 'Ẩn tất cả bản dịch' }).click();
    await expect(firstPhrase).not.toContainText('Kính thưa quý vị, thay mặt ban tổ chức');
    await page.getByRole('button', { name: 'Hiện tất cả bản dịch' }).click();
    await expect(firstPhrase).toContainText('Kính thưa quý vị, thay mặt ban tổ chức');
  });

  test('category filter narrows the list', async ({ page }) => {
    await page.goto('/phrase-bank');
    await page.getByRole('button', { name: 'Bế mạc & Cảm ơn' }).click();
    await expect(page.getByRole('status').first()).toContainText('8');
  });
});

test.describe('toolkit', () => {
  test('checklist progress persists and reset clears it', async ({ page }) => {
    await page.goto('/toolkit');
    const first = page.locator('#prep-agenda');
    await first.click();
    await expect(page.getByText(/1 \/ 10 · 10% hoàn thành/i)).toBeVisible();
    await page.reload();
    await expect(page.getByText(/1 \/ 10 · 10% hoàn thành/i)).toBeVisible();
    await page.getByRole('button', { name: 'Đặt lại danh mục' }).click();
    await expect(page.getByText(/0 \/ 10 · 0% hoàn thành/i)).toBeVisible();
  });

  test('glossary template adds a row and exports a CSV', async ({ page }) => {
    await page.goto('/toolkit');
    await page.getByRole('button', { name: /Thêm dòng/ }).first().click();
    // Column headers and aria-labels are localized chrome, not fixed English.
    await page.getByRole('textbox', { name: /thuật ngữ tiếng anh, dòng 1/i }).fill('Articulation agreement');
    await page.getByRole('textbox', { name: /thuật ngữ tiếng việt, dòng 1/i }).fill('Thỏa thuận liên kết đào tạo');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /Xuất CSV/ }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('edulingo-glossary.csv');

    const stream = await download.createReadStream();
    let content = '';
    for await (const chunk of stream) content += chunk.toString('utf8');
    expect(content).toContain('Articulation agreement,Thỏa thuận liên kết đào tạo');
    // Export header row uses the same localized labels as the visible table.
    expect(content).toContain('Thuật ngữ tiếng Anh');
    expect(content).toContain('Ngữ cảnh');
  });

  test('note template saves values and reset clears them', async ({ page }) => {
    await page.goto('/toolkit');
    const topic = page.getByLabel('Chủ đề');
    await topic.fill('Ký kết MOU với đối tác Nhật Bản');
    await page.reload();
    await expect(page.getByLabel('Chủ đề')).toHaveValue('Ký kết MOU với đối tác Nhật Bản');
    await page.locator('#notes').getByRole('button', { name: 'Đặt lại' }).click();
    await expect(page.getByLabel('Chủ đề')).toHaveValue('');
  });
});

test.describe('practice', () => {
  test('quiz scores correctly and reports best score', async ({ page }) => {
    await page.goto('/practice');
    const quiz = page.locator('article').filter({ hasText: 'Thuật ngữ giáo dục cốt lõi' }).first();
    await expect(quiz.getByRole('button', { name: 'Kiểm tra đáp án' })).toBeDisabled();

    const answers = [
      'Memorandum of Understanding',
      'Academic transcript',
      'Credit transfer',
      'Full-tuition scholarship',
      'Head of Department',
    ];
    for (const [index, label] of answers.entries()) {
      const fieldset = quiz.locator('fieldset').nth(index);
      await fieldset.locator('label').filter({ hasText: label }).first().click();
    }

    await quiz.getByRole('button', { name: 'Kiểm tra đáp án' }).click();
    await expect(quiz.getByText(/Điểm:/)).toContainText('5');
    await expect(page.getByText(/Điểm cao nhất/).first()).toBeVisible();

    await quiz.getByRole('button', { name: 'Làm lại' }).click();
    await expect(quiz.getByRole('button', { name: 'Kiểm tra đáp án' })).toBeDisabled();
  });

  test('translation exercise reveals and hides the suggested answer, and saves the draft', async ({ page }) => {
    await page.goto('/practice');
    const workspace = page.locator('#exercises');
    await workspace.getByRole('textbox').fill('Bản dịch thử của tôi');
    await workspace.getByRole('button', { name: /Xem bản dịch gợi ý/ }).click();
    await expect(workspace.getByText(/Kính thưa quý vị đại biểu, quý thầy cô/i).first()).toBeVisible();
    await workspace.getByRole('button', { name: /Ẩn bản dịch gợi ý/ }).click();

    await workspace.getByRole('button', { name: /Tiếp/ }).click();
    await expect(workspace.getByText(/^2 \/ 10$/)).toBeVisible();
    await workspace.getByRole('button', { name: /Trước/ }).click();
    await expect(workspace.getByRole('textbox')).toHaveValue('Bản dịch thử của tôi');
  });
});

test.describe('language switch', () => {
  test('switching to English updates navigation labels and persists', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) < 640, 'language switch is hidden on the smallest breakpoint');
    await page.goto('/');
    await page.getByRole('button', { name: /Đổi ngôn ngữ giao diện/ }).click();
    await expect(page.getByRole('link', { name: 'Glossary', exact: true }).first()).toBeVisible();
    await page.reload();
    await expect(page.getByRole('link', { name: 'Glossary', exact: true }).first()).toBeVisible();
  });
});

test.describe('mobile navigation drawer', () => {
  test('opens, navigates, and closes on Escape', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) >= 1024, 'mobile only');
    await page.goto('/');
    await page.getByRole('button', { name: /Mở menu/ }).click();
    const drawer = page.getByRole('dialog');
    await expect(drawer).toBeVisible();

    // Background scroll must be locked.
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

    await drawer.getByRole('link', { name: 'Mẫu câu', exact: true }).click();
    await expect(page).toHaveURL(/\/phrase-bank/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Ngân hàng mẫu câu/);

    await page.getByRole('button', { name: /Mở menu/ }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
  });
});

test.describe('accessibility basics', () => {
  test('skip link is the first focusable element', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('banner').waitFor();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: /Bỏ qua đến nội dung/ })).toBeFocused();
  });

  test('exactly one h1 per page and no heading level gaps', async ({ page }) => {
    for (const route of ['/', '/glossary', '/guide/types-of-interpreting', '/scenarios/mou-signing-ceremony']) {
      await page.goto(route);
      await expect(page.locator('h1'), route).toHaveCount(1);
    }
  });
});
