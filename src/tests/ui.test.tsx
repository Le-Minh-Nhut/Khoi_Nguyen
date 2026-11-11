import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { BookmarksProvider, SettingsProvider, useBookmarks } from '@/app/SettingsProvider';
import { storageKeys } from '@/lib/storage';
import { GlossaryBrowser } from '@/components/glossary/GlossaryBrowser';
import { BookmarkButton } from '@/components/shared/Actions';
import { useSettings } from '@/app/SettingsProvider';
import type { ReactNode } from 'react';

function wrap(ui: ReactNode, initialEntries = ['/glossary']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppProviders>{ui}</AppProviders>
    </MemoryRouter>,
  );
}

/** The browser writes the query into the URL on a debounce. */
async function typeQuery(value: string) {
  const user = userEvent.setup();
  await user.type(screen.getByRole('searchbox', { name: /tìm thuật ngữ/i }), value);
  return user;
}

describe('GlossaryBrowser', () => {
  it('lists every term by default', () => {
    wrap(<GlossaryBrowser />);
    expect(screen.getByRole('status').textContent).toContain('96');
  });

  it('filters by a diacritic-free query', async () => {
    wrap(<GlossaryBrowser />);
    await typeQuery('hoc bong');

    // "Full scholarship" is in the unfiltered list too, so wait on the count.
    await waitFor(() => {
      expect(screen.getByRole('status').textContent).not.toContain('96');
    });
    expect(screen.getByText('Full scholarship')).toBeInTheDocument();
  });

  it('filters by abbreviation when typing MOU', async () => {
    wrap(<GlossaryBrowser />);
    await typeQuery('mou');
    await waitFor(() => {
      expect(screen.getByText('Memorandum of Understanding')).toBeInTheDocument();
    });
  });

  it('shows an empty state for a query with no matches', async () => {
    wrap(<GlossaryBrowser />);
    await typeQuery('zzzzqqq');
    await waitFor(() => {
      expect(screen.getByText(/không có thuật ngữ nào khớp/i)).toBeInTheDocument();
    });
  });

  it('narrows the list when a category is chosen', async () => {
    const user = userEvent.setup();
    wrap(<GlossaryBrowser />);
    const controls = screen.getAllByRole('button', { name: /học bổng & hỗ trợ tài chính/i });
    await user.click(controls[0]);
    await waitFor(() => {
      expect(screen.getByRole('status').textContent ?? '').toMatch(/12/);
    });
  });

  // F-05 regression: the URL is the source of truth. The component used to
  // initialise its state from `useSearchParams` once and then ignore later
  // changes, so an in-app link to `/glossary?q=…` left the old query on screen.
  it('adopts a query that arrives while the browser is already mounted', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/glossary']}>
        <AppProviders>
          <Link to="/glossary?q=hoc bong">search scholarships</Link>
          <GlossaryBrowser />
        </AppProviders>
      </MemoryRouter>,
    );

    expect(screen.getByRole('searchbox', { name: /tìm thuật ngữ/i })).toHaveValue('');
    await user.click(screen.getByRole('link', { name: /search scholarships/i }));

    await waitFor(() => {
      expect(screen.getByRole('searchbox', { name: /tìm thuật ngữ/i })).toHaveValue('hoc bong');
    });
    expect(screen.getByText('Full scholarship')).toBeInTheDocument();
  });

  it('reads both query and category straight from the URL on first render', () => {
    wrap(<GlossaryBrowser />, ['/glossary?q=hoc bong&category=scholarships']);
    expect(screen.getByRole('searchbox', { name: /tìm thuật ngữ/i })).toHaveValue('hoc bong');
    expect(screen.getByText('Full scholarship')).toBeInTheDocument();
  });

  it('ignores an unknown category param instead of showing nothing', () => {
    wrap(<GlossaryBrowser />, ['/glossary?category=not-a-category']);
    expect(screen.getByRole('status').textContent).toContain('96');
  });
});

describe('bookmark persistence', () => {
  it('writes the bookmark to localStorage and reflects it in the button state', async () => {
    const user = userEvent.setup();
    wrap(<BookmarkButton kind="glossary" id="mou" withLabel />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    await user.click(button);

    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(JSON.parse(localStorage.getItem(storageKeys.bookmarks) ?? '{}').glossary).toContain('mou');
  });

  it('restores bookmarks from a previous session', () => {
    localStorage.setItem(
      storageKeys.bookmarks,
      JSON.stringify({ glossary: ['tuition-fee'], phrases: [], lessons: [], tips: [], scenarios: [] }),
    );
    wrap(<BookmarkButton kind="glossary" id="tuition-fee" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  // F-03 regression: tips were stored as `lessons: ['tip:<id>']` and then
  // disappeared from /saved. They must resolve as tips, and a legacy entry that
  // also exists under `tips` must not be counted twice.
  it('resolves a legacy tip bookmark written into lessons', () => {
    localStorage.setItem(
      storageKeys.bookmarks,
      JSON.stringify({ glossary: [], phrases: [], lessons: ['tip:false-friend'], scenarios: [] }),
    );
    wrap(<BookmarksProbe />);
    expect(screen.getByTestId('tips').textContent).toBe('false-friend');
    expect(screen.getByTestId('lessons').textContent).toBe('');
    expect(screen.getByTestId('count').textContent).toBe('1');
  });

  it('does not double-count a tip present in both lessons and tips', () => {
    localStorage.setItem(
      storageKeys.bookmarks,
      JSON.stringify({
        glossary: [],
        phrases: [],
        lessons: ['types-of-interpreting', 'tip:false-friend'],
        tips: ['false-friend'],
        scenarios: [],
      }),
    );
    wrap(<BookmarksProbe />);
    expect(screen.getByTestId('tips').textContent).toBe('false-friend');
    expect(screen.getByTestId('lessons').textContent).toBe('types-of-interpreting');
    expect(screen.getByTestId('count').textContent).toBe('2');
  });

  // F-09 regression: a malformed value must be repaired, not trusted.
  it('survives a bookmarks value that is not an object', () => {
    localStorage.setItem(storageKeys.bookmarks, 'null');
    wrap(<BookmarksProbe />);
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('drops non-string bookmark ids instead of crashing', () => {
    localStorage.setItem(
      storageKeys.bookmarks,
      JSON.stringify({ glossary: [1, null, 'mou'], phrases: 'nope' }),
    );
    wrap(<BookmarksProbe />);
    expect(screen.getByTestId('glossary').textContent).toBe('mou');
    expect(screen.getByTestId('count').textContent).toBe('1');
  });
});

function BookmarksProbe() {
  const { bookmarks, count } = useBookmarks();
  return (
    <div>
      <span data-testid="glossary">{bookmarks.glossary.join(',')}</span>
      <span data-testid="lessons">{bookmarks.lessons.join(',')}</span>
      <span data-testid="tips">{bookmarks.tips.join(',')}</span>
      <span data-testid="count">{String(count)}</span>
    </div>
  );
}

describe('settings language switch', () => {
  it('persists the UI language choice', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SettingsProvider>
          <BookmarksProvider>
            <LanguageProbe />
          </BookmarksProvider>
        </SettingsProvider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('lang').textContent).toBe('vi');
    await user.click(screen.getByRole('button', { name: /switch/i }));
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(JSON.parse(localStorage.getItem(storageKeys.settings) ?? '{}').uiLang).toBe('en');
  });
});

function LanguageProbe() {
  const { uiLang, toggleUiLang } = useSettings();
  return (
    <div>
      <span data-testid="lang">{uiLang}</span>
      <button type="button" onClick={toggleUiLang}>
        switch
      </button>
    </div>
  );
}
