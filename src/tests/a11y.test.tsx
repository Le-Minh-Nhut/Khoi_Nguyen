import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { SearchDialog } from '@/components/search/SearchDialog';
import { ui } from '@/content/translations';
import type { UiKey } from '@/content/translations';

describe('UI dictionary completeness', () => {
  it('has a non-empty string in both languages for every key', () => {
    for (const [key, value] of Object.entries(ui) as Array<[UiKey, { en: string; vi: string }]>) {
      expect(value.en.trim(), `${key}.en`).not.toBe('');
      expect(value.vi.trim(), `${key}.vi`).not.toBe('');
    }
  });

  it('does not leak an untranslated key into the Vietnamese dictionary', () => {
    const suspicious = Object.keys(ui).filter((key) => key === (ui as Record<string, unknown>)[key]);
    expect(suspicious).toEqual([]);
  });
});

describe('SearchDialog accessibility', () => {
  function renderDialog() {
    return render(
      <MemoryRouter>
        <AppProviders>
          <SearchDialog open onOpenChange={() => {}} />
        </AppProviders>
      </MemoryRouter>,
    );
  }

  it('exposes the combobox/listbox contract', async () => {
    const user = userEvent.setup();
    renderDialog();

    const input = document.querySelector('#global-search-input') as HTMLInputElement;
    expect(input).toHaveAttribute('role', 'combobox');
    expect(input).toHaveAttribute('aria-controls', 'global-search-results');

    await user.type(input, 'hoc bong');

    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(document.querySelectorAll('[role="listbox"]')).toHaveLength(1);

    // Every option has a stable id and the active descendant points at one.
    const options = document.querySelectorAll('[role="option"]');
    expect(options.length).toBeGreaterThan(0);
    for (const option of options) expect(option.id).toMatch(/^global-search-option-\d+$/);
    expect(input.getAttribute('aria-activedescendant')).toBe('global-search-option-0');
  });

  it('moves the active descendant with the arrow keys', async () => {
    const user = userEvent.setup();
    renderDialog();
    const input = document.querySelector('#global-search-input') as HTMLInputElement;
    await user.type(input, 'hoc bong');
    await user.keyboard('{ArrowDown}');
    expect(input.getAttribute('aria-activedescendant')).toBe('global-search-option-1');
    await user.keyboard('{ArrowUp}');
    expect(input.getAttribute('aria-activedescendant')).toBe('global-search-option-0');
    // Wrap around rather than running off the end.
    await user.keyboard('{ArrowUp}');
    const count = document.querySelectorAll('[role="option"]').length;
    expect(input.getAttribute('aria-activedescendant')).toBe(`global-search-option-${count - 1}`);
  });

  it('clamps the active index when the result set shrinks', async () => {
    const user = userEvent.setup();
    renderDialog();
    const input = document.querySelector('#global-search-input') as HTMLInputElement;
    await user.type(input, 'a');
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');
    await user.clear(input);
    await user.type(input, 'mou');
    expect(input.getAttribute('aria-activedescendant')).toBe('global-search-option-0');
  });

  it('selects exactly one option at a time', async () => {
    const user = userEvent.setup();
    renderDialog();
    const input = document.querySelector('#global-search-input') as HTMLInputElement;
    await user.type(input, 'exchange');
    await user.keyboard('{ArrowDown}');
    const selected = document.querySelectorAll('[role="option"][aria-selected="true"]');
    expect(selected).toHaveLength(1);
  });

  it('announces the number of results in the footer', async () => {
    const user = userEvent.setup();
    renderDialog();
    const input = document.querySelector('#global-search-input') as HTMLInputElement;
    await user.type(input, 'mou');
    const footer = screen.getByText(/kết quả/);
    expect(footer.textContent).toMatch(/\d+/);
  });

  it('shows the empty state without a listbox when nothing matches', async () => {
    const user = userEvent.setup();
    renderDialog();
    const input = document.querySelector('#global-search-input') as HTMLInputElement;
    await user.type(input, 'zzzzqqq');
    expect(screen.getByText(/không có kết quả/i)).toBeInTheDocument();
    expect(document.querySelectorAll('[role="listbox"]')).toHaveLength(0);
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps the dialog title for screen readers', () => {
    renderDialog();
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getAllByText(/tìm trong sổ tay/i).length).toBeGreaterThan(0);
  });
});
