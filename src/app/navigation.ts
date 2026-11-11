import type { UiKey } from '@/content/translations';
import { glossaryTerms } from '@/content/glossary';
import { lessons } from '@/content/lessons';
import { scenarios } from '@/content/scenarios';

const SITE_NAME = 'EduLingo Guide';

export interface NavLink {
  to: string;
  labelKey: UiKey;
  descriptionKey?: UiKey;
}

export interface NavGroup {
  labelKey: UiKey;
  links: NavLink[];
}

/** Desktop header: three groups + two direct links. Keeps the bar calm. */
export const navGroups: NavGroup[] = [
  {
    labelKey: 'nav.reference',
    links: [
      { to: '/glossary', labelKey: 'nav.glossary' },
      { to: '/phrase-bank', labelKey: 'nav.phrases' },
    ],
  },
  {
    labelKey: 'nav.learn',
    links: [
      { to: '/guide', labelKey: 'nav.guide' },
      { to: '/scenarios', labelKey: 'nav.scenarios' },
      { to: '/tips', labelKey: 'nav.tips' },
    ],
  },
];

export const directLinks: NavLink[] = [
  { to: '/toolkit', labelKey: 'nav.toolkit' },
  { to: '/practice', labelKey: 'nav.practice' },
];

/** Mobile drawer lists everything flat, in reading order. */
export const mobileNav: NavLink[] = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/glossary', labelKey: 'nav.glossary' },
  { to: '/phrase-bank', labelKey: 'nav.phrases' },
  { to: '/guide', labelKey: 'nav.guide' },
  { to: '/scenarios', labelKey: 'nav.scenarios' },
  { to: '/toolkit', labelKey: 'nav.toolkit' },
  { to: '/tips', labelKey: 'nav.tips' },
  { to: '/practice', labelKey: 'nav.practice' },
  { to: '/saved', labelKey: 'nav.saved' },
  { to: '/about', labelKey: 'nav.about' },
];

export const footerGroups: NavGroup[] = [
  {
    labelKey: 'footer.explore',
    links: [
      { to: '/glossary', labelKey: 'nav.glossary' },
      { to: '/phrase-bank', labelKey: 'nav.phrases' },
      { to: '/scenarios', labelKey: 'nav.scenarios' },
      { to: '/saved', labelKey: 'nav.saved' },
    ],
  },
  {
    labelKey: 'footer.learn',
    links: [
      { to: '/guide', labelKey: 'nav.guide' },
      { to: '/tips', labelKey: 'nav.tips' },
      { to: '/practice', labelKey: 'nav.practice' },
      { to: '/toolkit', labelKey: 'nav.toolkit' },
    ],
  },
  {
    labelKey: 'footer.reference',
    links: [
      { to: '/about', labelKey: 'nav.about' },
      { to: '/glossary', labelKey: 'nav.glossary' },
    ],
  },
];

export interface Crumb {
  label: string;
  to?: string;
}

export const sectionLabels: Record<string, UiKey> = {
  glossary: 'nav.glossary',
  'phrase-bank': 'nav.phrases',
  guide: 'nav.guide',
  scenarios: 'nav.scenarios',
  toolkit: 'nav.toolkit',
  tips: 'nav.tips',
  practice: 'nav.practice',
  saved: 'nav.saved',
  about: 'nav.about',
};

/* ------------------------------ Route titles ------------------------------ */

const SECTION_TITLES: Record<string, UiKey> = {
  glossary: 'glossary.title',
  guide: 'guide.title',
  scenarios: 'scenarios.title',
  'phrase-bank': 'phrases.title',
  toolkit: 'toolkit.title',
  tips: 'tips.title',
  practice: 'practice.title',
  saved: 'saved.title',
  about: 'about.title',
};

/** Human title for the current path, resolved from the same data the pages use. */
export function routeTitle(pathname: string, t: (key: UiKey) => string): string {
  const [section, slug] = pathname.split('/').filter(Boolean);
  if (!section) return SITE_NAME;

  if (slug) {
    if (section === 'glossary') {
      const term = glossaryTerms.find((item) => item.slug === slug);
      if (term) return `${term.en} — ${SITE_NAME}`;
    }
    if (section === 'guide') {
      const lesson = lessons.find((item) => item.slug === slug);
      if (lesson) return `${lesson.title.vi} — ${SITE_NAME}`;
    }
    if (section === 'scenarios') {
      const scenario = scenarios.find((item) => item.slug === slug);
      if (scenario) return `${scenario.title.vi} — ${SITE_NAME}`;
    }
  }

  const key = section ? SECTION_TITLES[section] : undefined;
  return key ? `${t(key)} — ${SITE_NAME}` : `${t('notFound.title')} — ${SITE_NAME}`;
}

/**
 * Route identity for assistive tech: a unique document title per page, and the
 * <main> landmark takes focus on navigation so a screen reader announces the new
 * page instead of staying wherever the previous one left off.
 */
