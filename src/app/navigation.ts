import type { UiKey } from '@/content/translations';

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
