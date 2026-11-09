import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { BookmarksProvider, SettingsProvider } from '@/app/SettingsProvider';
import { storageKeys } from '@/lib/storage';
import { GlossaryBrowser } from '@/components/glossary/GlossaryBrowser';
import { BookmarkButton } from '@/components/shared/Actions';
import type { ReactNode } from 'react';

function wrap(ui: ReactNode, initialEntries = ['/glossary']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppProviders>{ui}</AppProviders>
    </MemoryRouter>,
  );
}

describe('GlossaryBrowser', () => {
  it('lists all terms and filters by a diacritic-free query', async () => {
    const user = userEvent.setup();
    wrap(<GlossaryBrowser />);

    expect(screen.getByRole('status').textContent).toContain('96');

    await user.type(screen.getByRole('searchbox', { name: /tìm thuật ngữ/i }), 'hoc bong');

    expect(screen.getByRole('status').textContent).not.toContain('96');
    expect(screen.getByText('Full scholarship')).toBeInTheDocument();
  });

  it('filters by abbreviation when typing MOU', async () => {
    const user = userEvent.setup();
    wrap(<GlossaryBrowser />);
    await user.type(screen.getByRole('searchbox', { name: /tìm thuật ngữ/i }), 'mou');
    expect(screen.getByText('Memorandum of Understanding')).toBeInTheDocument();
  });

  it('shows an empty state for a query with no matches', async () => {
    const user = userEvent.setup();
    wrap(<GlossaryBrowser />);
    await user.type(screen.getByRole('searchbox', { name: /tìm thuật ngữ/i }), 'zzzzqqq');
    expect(screen.getByText(/không có thuật ngữ nào khớp/i)).toBeInTheDocument();
  });

  it('narrows the list when a category is chosen', async () => {
    const user = userEvent.setup();
    wrap(<GlossaryBrowser />);
    const controls = screen.getAllByRole('button', { name: /học bổng & hỗ trợ tài chính/i });
    await user.click(controls[0]);
    const status = screen.getByRole('status').textContent ?? '';
    expect(status).toMatch(/12/);
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
      JSON.stringify({ glossary: ['tuition-fee'], phrases: [], lessons: [], scenarios: [] }),
    );
    wrap(<BookmarkButton kind="glossary" id="tuition-fee" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
});

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

import { useSettings } from '@/app/SettingsProvider';
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
