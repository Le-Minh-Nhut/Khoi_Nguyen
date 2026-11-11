import { describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { storageKeys } from '@/lib/storage';
import PracticePage from '@/pages/PracticePage';
import PhraseBankPage from '@/pages/PhraseBankPage';
import ScenarioDetailPage from '@/pages/ScenarioDetailPage';
import TipsPage from '@/pages/TipsPage';
import SavedPage from '@/pages/SavedPage';
import { quizzes } from '@/content/practice';
import { tips } from '@/content/tips';
import type { ReactNode } from 'react';

function wrap(ui: ReactNode, initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppProviders>{ui}</AppProviders>
    </MemoryRouter>,
  );
}

/** Pages that read route params need the real route shape. */
function wrapRoute(path: string, pattern: string, element: ReactNode) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppProviders>
        <Routes>
          <Route path={pattern} element={element} />
        </Routes>
      </AppProviders>
    </MemoryRouter>,
  );
}

/** Answer every question in a quiz card, then submit. */
async function completeQuiz(user: ReturnType<typeof userEvent.setup>, cardIndex: number) {
  const cards = screen.getAllByRole('article');
  const card = cards[cardIndex];
  const fieldsets = within(card).getAllByRole('group');
  for (const fieldset of fieldsets) {
    // First option of each question: not always correct, which is the point.
    await user.click(within(fieldset).getAllByRole('radio')[0]);
  }
  await user.click(within(card).getByRole('button', { name: /kiểm tra đáp án/i }));
}

describe('PracticePage quiz scores', () => {
  // F-02 regression: each quiz card owned a separate useState copy of the same
  // localStorage key, so answering quiz B wiped quiz A's score.
  it('keeps both quizzes in one shared score record', async () => {
    const user = userEvent.setup();
    wrap(<PracticePage />);

    await completeQuiz(user, 0);
    await completeQuiz(user, 1);

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(storageKeys.quizScores) ?? '{}');
      expect(Object.keys(stored).sort()).toEqual([quizzes[0].id, quizzes[1].id].sort());
    });

    const stored = JSON.parse(localStorage.getItem(storageKeys.quizScores) ?? '{}');
    expect(stored[quizzes[0].id].attempts).toBe(1);
    expect(stored[quizzes[1].id].attempts).toBe(1);
  });

  it('never lowers the best score and always increments attempts', async () => {
    const user = userEvent.setup();
    const quizId = quizzes[0].id;

    // Seed a perfect best score with one attempt before mounting.
    localStorage.setItem(
      storageKeys.quizScores,
      JSON.stringify({
        [quizId]: { best: quizzes[0].questions.length, total: quizzes[0].questions.length, attempts: 1 },
      }),
    );
    wrap(<PracticePage />);

    const cards = screen.getAllByRole('article');
    const card = cards[0];
    const fieldsets = within(card).getAllByRole('group');
    // Answer everything wrong deliberately.
    for (const fieldset of fieldsets) {
      const label = fieldset.querySelector('legend')?.textContent ?? '';
      const question = quizzes[0].questions.find((q) => label.includes(q.prompt.vi));
      const radios = within(fieldset).getAllByRole('radio');
      const wrongIndex = question
        ? question.options.findIndex((option) => option.id !== question.answerId)
        : 0;
      await user.click(radios[wrongIndex]);
    }
    await user.click(within(card).getByRole('button', { name: /kiểm tra đáp án/i }));

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(storageKeys.quizScores) ?? '{}');
      expect(stored[quizId].attempts).toBe(2);
    });
    const stored = JSON.parse(localStorage.getItem(storageKeys.quizScores) ?? '{}');
    expect(stored[quizId].best).toBe(quizzes[0].questions.length);
  });

  it('ignores a corrupted score record and still renders', () => {
    localStorage.setItem(storageKeys.quizScores, '{"terminology-core": "nope"}');
    wrap(<PracticePage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});

describe('PracticePage translation drafts', () => {
  it('shows no word count for whitespace-only input', async () => {
    const user = userEvent.setup();
    wrap(<PracticePage />);
    const area = document.querySelector('#exercise-response');
    expect(area).not.toBeNull();
    await user.type(area as HTMLElement, '   ');
    expect(screen.queryByText(/^\d+ từ$/)).not.toBeInTheDocument();
  });

  it('counts real words', async () => {
    const user = userEvent.setup();
    wrap(<PracticePage />);
    await user.type(document.querySelector('#exercise-response') as HTMLElement, 'one two three');
    expect(screen.getByText(/^3 từ$/)).toBeInTheDocument();
  });
});

describe('PhraseBankPage display modes', () => {
  // F-06 regression: `showVi` required the translation to be unhidden, so `vi`
  // mode combined with hide-all produced completely empty cards.
  it('keeps the Vietnamese line visible in vi mode even after hide-all', async () => {
    const user = userEvent.setup();
    wrap(<PhraseBankPage />);

    await user.click(screen.getByRole('button', { name: /ẩn tất cả bản dịch/i }));
    await user.click(screen.getByRole('button', { name: /chỉ tiếng việt/i }));

    // Every card still shows Vietnamese content.
    const cards = document.querySelectorAll('ul > li[id]');
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      expect(card.textContent?.trim().length ?? 0).toBeGreaterThan(0);
    }
    expect(document.body.textContent).not.toContain('— Hiện bản dịch —');
  });

  it('does not offer the translation toggle outside both mode', async () => {
    const user = userEvent.setup();
    wrap(<PhraseBankPage />);
    expect(screen.queryAllByRole('button', { name: /^ẩn bản dịch$/i }).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: /chỉ tiếng anh/i }));
    expect(screen.queryByRole('button', { name: /ẩn tất cả bản dịch/i })).not.toBeInTheDocument();
    expect(screen.queryAllByRole('button', { name: /^ẩn bản dịch$/i })).toHaveLength(0);
  });

  it('hides and shows a single translation in both mode', async () => {
    const user = userEvent.setup();
    wrap(<PhraseBankPage />);
    const [first] = screen.getAllByRole('button', { name: /^ẩn bản dịch$/i });
    await user.click(first);
    expect(screen.queryAllByRole('button', { name: /^hiện bản dịch$/i }).length).toBeGreaterThan(0);
  });
});

describe('ScenarioDetailPage hidden translations', () => {
  // F-07 regression: the hidden set lived for the component's lifetime, so the
  // next scenario inherited the previous one's hidden turn indexes.
  it('does not leak hidden turns into another scenario', async () => {
    const user = userEvent.setup();
    wrapRoute(
      '/scenarios/university-partnership-meeting',
      '/scenarios/:slug',
      <ScenarioDetailPage />,
    );

    const firstTurn = document.querySelector('ol li button[aria-pressed]');
    expect(firstTurn).not.toBeNull();
    await user.click(firstTurn as HTMLElement);
    expect(document.body.textContent).toContain('— Hiện bản dịch —');

    // Navigate within the same component instance via the "next" link.
    const nextLink = screen.getAllByRole('link').find((link: HTMLElement) =>
      link.getAttribute('href')?.startsWith('/scenarios/'),
    );
    expect(nextLink).toBeDefined();
    await user.click(nextLink as HTMLElement);
    await waitFor(() => {
      expect(document.body.textContent).not.toContain('— Hiện bản dịch —');
    });
  });
});

describe('TipsPage deep link', () => {
  // F-03 regression: /saved had no way back to the exact tip.
  it('opens the tip named in the URL', () => {
    const lastTip = tips[tips.length - 1];
    wrap(<TipsPage />, [`/tips?tip=${lastTip.id}`]);
    const current = document.querySelector('[aria-current="true"]');
    expect(current?.textContent).toContain(String(lastTip.number).padStart(2, '0'));
    expect(
      screen.getByRole('button', { name: new RegExp(`^(Lưu|Bỏ lưu): ${lastTip.id}$`) }),
    ).toBeInTheDocument();
  });

  it('falls back to the first tip for an unknown id', () => {
    wrap(<TipsPage />, ['/tips?tip=does-not-exist']);
    expect(screen.getByRole('button', { name: /^Lưu: / })).toBeInTheDocument();
  });
});

describe('SavedPage', () => {
  it('lists a saved tip with a link back to it', () => {
    const tip = tips[0];
    localStorage.setItem(
      storageKeys.bookmarks,
      JSON.stringify({ glossary: [], phrases: [], lessons: [], tips: [tip.id], scenarios: [] }),
    );
    wrap(<SavedPage />);
    const link = screen.getByRole('link', { name: new RegExp(tip.title.vi.slice(0, 12), 'i') });
    expect(link).toHaveAttribute('href', `/tips?tip=${tip.id}`);
  });

  it('still renders when a bookmark points at content that no longer exists', () => {
    localStorage.setItem(
      storageKeys.bookmarks,
      JSON.stringify({ glossary: ['ghost-term'], phrases: [], lessons: [], tips: [], scenarios: [] }),
    );
    wrap(<SavedPage />);
    // The badge counts one item, so the page must explain the missing entry
    // rather than claim nothing was ever saved.
    expect(screen.getByRole('status').textContent).toContain('không còn trong sổ tay');
    expect(screen.queryByText(/^Chưa lưu nội dung nào\.$/)).not.toBeInTheDocument();
  });
});
