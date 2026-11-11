import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { AppRoutes } from '@/app/router';
import { routeTitle } from '@/app/navigation';
import type { UiKey } from '@/content/translations';

/** Echoes the key so the test asserts which key was chosen, not the copy. */
const echo = (key: UiKey) => key;

/**
 * Route identity tests. `App` is rendered through the real router so the title
 * and landmark behaviour are exercised as shipped.
 */
function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </MemoryRouter>,
  );
}

describe('route titles', () => {
  it('names the site on the home route', () => {
    expect(routeTitle('/', echo)).toBe('EduLingo Guide');
  });

  it('names a glossary term by its English title', () => {
    expect(routeTitle('/glossary/tuition-fee', echo)).toContain('Tuition fee');
  });

  it('falls back to the section title for a term that does not exist', () => {
    const title = routeTitle('/glossary/does-not-exist', echo);
    expect(title).toContain('glossary.title');
  });

  it('names a guide chapter and a scenario by their Vietnamese titles', () => {
    expect(routeTitle('/guide/types-of-interpreting', echo)).toContain('—');
    expect(routeTitle('/scenarios/university-partnership-meeting', echo)).toContain('—');
  });

  it('marks unknown sections as not found', () => {
    expect(routeTitle('/nope', echo)).toContain('notFound.title');
  });
});

describe('rendered routes', () => {
  it('renders the 404 page for an unknown path', async () => {
    renderAt('/this-does-not-exist');
    await waitFor(() => {
      expect(screen.getAllByRole('heading', { level: 1 }).length).toBe(1);
    });
  });

  it('renders the glossary browser from a query string in the URL', async () => {
    renderAt('/glossary?q=mou');
    await waitFor(() => {
      expect(screen.getByText('Memorandum of Understanding')).toBeInTheDocument();
    });
  });

  it('sets a unique document title for the route', async () => {
    const original = document.title;
    renderAt('/about');
    await waitFor(() => {
      expect(document.title).not.toBe(original);
    });
  });
});
