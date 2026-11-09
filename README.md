# EduLingo Guide

**Bridge Languages. Connect Education.**

A practical Vietnamese–English translation and interpretation handbook for international
education events — as a production-quality frontend application. Frontend only: no backend, no
database, no authentication, no translation API.

Live content: 96 glossary terms (8 domains) · 48 phrase-bank expressions (6 situations) ·
8 guide chapters · 6 scenarios × 8 dialogue turns · 10 common-mistake entries · 2 quizzes
(10 questions) · 10 translation exercises · 5 interactive toolkit tools.

---

## 1. Overview

EduLingo Guide is an independent educational project for people who work in bilingual
international education: interpreting students, beginner interpreters, students supporting
bilingual events, and university international-relations staff.

Three activities structure the product:

- **Look up** — terminology with contextual Vietnamese renderings and translation notes.
- **Learn** — chapters on interpreting technique, plus ten documented common mistakes.
- **Practise** — scored vocabulary quizzes and open translation exercises with suggested answers.

Every visible control works. There are no placeholder screens.

The interface has two layers of language:

- **UI language** — Vietnamese by default, English optional, switchable in the header and
  persisted in `localStorage`. It changes navigation, buttons, headings, empty states, and
  feedback.
- **Educational content** — always bilingual. Source and translation stay side by side (stacked on
  mobile) regardless of the UI language.

---

## 2. Technology stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Language | TypeScript (strict) |
| Build | Vite |
| Styling | Tailwind CSS v4 (`@theme` tokens, no config file) |
| Components | shadcn/ui conventions + Radix UI primitives, hand-scaffolded |
| Routing | React Router 7 |
| Icons | Lucide React |
| Fonts | Be Vietnam Pro (body/UI), Noto Serif (display) — self-hosted via `@fontsource` |
| State | React hooks + Context + `localStorage` |
| Unit tests | Vitest + React Testing Library |
| E2E / visual | Playwright (Chromium) |

No state library, no data-fetching library, no CSS-in-JS runtime, no icon-font, no analytics.

---

## 3. Installation

```bash
npm install
npx playwright install chromium   # only needed for e2e
```

Requires Node 20+ (verified on Node 26).

---

## 4. Development commands

```bash
npm run dev         # Vite dev server (http://localhost:5173)
npm run typecheck   # tsc --noEmit
npm test            # Vitest unit + component tests
npm run e2e         # Playwright, desktop + mobile projects
```

## 5. Build commands

```bash
npm run build       # typecheck + production build to dist/
npm run preview     # serve dist/ on http://localhost:4173
```

---

## 6. Project structure

```text
src/
├── app/
│   ├── App.tsx                 shell: skip link, scroll restoration, <html lang>
│   ├── router.tsx              routes + lazy page loading
│   ├── providers.tsx           settings, bookmarks, tooltip providers
│   ├── SettingsProvider.tsx    UI language, translation visibility, bookmarks context
│   └── navigation.ts           nav groups, footer groups, section labels
│
├── components/
│   ├── glossary/               GlossaryBrowser, GlossarySearch, GlossaryResultRow
│   ├── home/                   Hero pieces: EventPathway, EventCategories, Featured*, ResourceGrid
│   ├── layout/                 SiteHeader, SiteFooter
│   ├── navigation/             DesktopNav (grouped dropdowns), MobileNav (dialog drawer)
│   ├── search/                 SearchTrigger, SearchDialog (⌘K palette)
│   ├── shared/                 PageHeader, Breadcrumbs, Actions, Bilingual, SearchField, EmptyState
│   └── ui/                     button, input, badge, dialog, checkbox, tooltip primitives
│
├── content/                    ALL educational data, framework-free
│   ├── glossary.ts             index        (96 terms)
│   ├── glossary/part*.ts       3 data files grouped by domain
│   ├── glossaryCategories.ts   8 categories with scope notes
│   ├── phrases.ts              48 expressions
│   ├── phraseCategories.ts     6 phrase situations
│   ├── lessons.ts              index        (8 chapters)
│   ├── lessons/part*.ts        3 data files
│   ├── scenarios.ts            6 scenarios, 8 turns each
│   ├── tips.ts                 10 common mistakes
│   ├── practice.ts             2 quizzes + 10 translation exercises
│   ├── toolkit.ts              checklists + reference resources
│   └── translations.ts         UI dictionary (vi/en)
│
├── hooks/
│   ├── useApp.ts               useI18n, useCopy, useBookmark, useDebouncedValue,
│   │                           useSearchHotkey, useScrollLock, useActiveSection
│   └── useLocalStorage.ts      versioned storage with cross-tab sync
│
├── lib/
│   ├── cn.ts                   class merge
│   ├── normalizeText.ts        diacritic-insensitive normalization + scoring
│   ├── search.ts               global ranked search, per-dataset matchers
│   ├── storage.ts              namespaced keys, clipboard, RFC 4180 CSV, download
│   └── format.ts               Intl percent formatting, clamp, uid
│
├── pages/                      14 route components
├── styles/index.css            design tokens, base layer, prose utilities, motion
├── tests/                      setup + content/ui tests
└── types/                      content.ts, storage.ts, i18n.ts
```

Data is separated from presentation: pages and components import typed arrays from
`src/content/*`; no data literals live in components.

---

## 7. Available pages

| Route | Page |
|---|---|
| `/` | Home — hero, editorial bilingual document, quick search, event domains, before/during/after pathway, featured term, featured scenario, resources |
| `/about` | Background, mission, vision, audience, features, disclaimer |
| `/glossary` | 96 terms, category rail, search, filters, sort, live count, bookmarks |
| `/glossary/:slug` | Full entry: definitions, example, translation note, related terms, prev/next |
| `/phrase-bank` | 48 expressions, 6 categories, display mode (both/EN/VI), hide-all, copy, bookmark |
| `/guide` | Chapter index with reading time and objectives count |
| `/guide/:slug` | Reading workspace: chapter rail, in-chapter nav, bilingual examples, tables, notes, takeaways |
| `/scenarios` | Six scenario cards |
| `/scenarios/:slug` | Overview, objectives, side-by-side dialogue with per-turn translation toggle, terminology, tips |
| `/toolkit` | 5 tools: preparation checklist, quality checklist, glossary template + CSV, note template, references |
| `/tips` | 10 common mistakes with problem → example → better → why → advice |
| `/practice` | 2 scored quizzes + 10 translation exercises in a focused workspace |
| `/saved` | Bookmarks grouped by type, remove, clear all, empty state |
| `*` | 404 with recovery links |

---

## 8. Implemented features

**Search.** Global ⌘K / Ctrl K palette searching glossary, phrases, chapters, and scenarios with
ranked results, arrow-key navigation, Enter to open, Escape to close. Glossary search is
diacritic-insensitive (`hoc bong` finds *học bổng*), matches abbreviations (`mou`), and highlights
literal hits.

**Bookmarks.** Persisted under `edulingo:v1:bookmarks`, shared through React Context so every page
shows the same state instantly; synced across browser tabs via the native `storage` event. Count
badge in the header, grouped list on `/saved`, per-item removal, clear-all with confirmation.

**Copy.** Async Clipboard API with a legacy fallback and a transient "Đã sao chép" confirmation.
Terms copy as a formatted bilingual block; scenarios copy as the full annotated dialogue.

**Toolkit.** Checklist progress is computed, persisted, and resettable. The glossary template
supports add/edit/delete with debounced-free controlled inputs, saves locally, and exports real
RFC 4180 CSV (UTF-8 BOM, quoted cells, CRLF) named `edulingo-glossary.csv`. The note template
persists six fields and resets to empty.

**Practice.** Quizzes require an answer for every question before checking; scoring, per-question
explanations, retry, and best-score persistence per quiz. Translation exercises keep drafts per
exercise in `localStorage`, reveal one suggested rendering at a time, and never claim to grade
open-ended text.

**Language.** VI/EN switch updates navigation, buttons, headings, and status copy; bilingual
educational content stays bilingual. Persisted in `edulingo:v1:settings`; `<html lang>` follows.

**Accessibility.** Semantic landmarks, one `h1` per page, skip link, visible focus rings, Radix
focus trapping in the search palette and mobile drawer, Escape-to-close, `aria-pressed` on toggles,
`aria-live` result counts, labelled form controls, and `prefers-reduced-motion` support.

---

## 9. How to edit educational content

Content is plain TypeScript with types in `src/types/content.ts`:

| What | File |
|---|---|
| Glossary term | `src/content/glossary/partStudents.ts`, `partCooperation.ts`, `partResearch.ts` |
| Glossary category | `src/content/glossaryCategories.ts` |
| Phrase | `src/content/phrases.ts` |
| Chapter | `src/content/lessons/part1|2|3.ts` |
| Scenario | `src/content/scenarios.ts` |
| Common mistake | `src/content/tips.ts` |
| Quiz / exercise | `src/content/practice.ts` |
| Toolkit items and references | `src/content/toolkit.ts` |
| UI wording | `src/content/translations.ts` |

Rules to keep the app consistent:

1. Slugs are kebab-case English and globally unique — they are the route and the bookmark key.
2. `related` must reference existing glossary slugs (`npm test` asserts this).
3. Keep `number` on lessons and tips sequential; navigation uses it.
4. Quiz `answerId` must match one of the question's option ids (also asserted).
5. Bilingual fields (`{ en, vi }`) are required everywhere except quiz options, which carry both
   in flat fields.

The tests in `src/tests/content.test.ts` fail loudly on count drift, duplicate ids, dangling
cross-references, or invalid quiz answers.

---

## 10. localStorage behaviour

All keys are namespaced and versioned (`edulingo:v1:`). Nothing leaves the browser.

| Key | Contents |
|---|---|
| `edulingo:v1:settings` | `{ uiLang: 'vi' \| 'en', showTranslations: boolean }` |
| `edulingo:v1:bookmarks` | `{ glossary: string[], phrases: string[], lessons: string[], scenarios: string[] }` |
| `edulingo:v1:checklists:prep` | `Record<itemId, boolean>` |
| `edulingo:v1:checklists:quality` | `Record<criterionId, boolean>` |
| `edulingo:v1:glossary-template` | `Array<{ id, en, vi, context }>` |
| `edulingo:v1:note-template` | Six note fields |
| `edulingo:v1:note-template:drafts` | `Record<exerciseId, string>` translation drafts |
| `edulingo:v1:quiz-scores` | `Record<quizId, { best, total, attempts }>` |

Reads and writes are wrapped in `try/catch`: private-mode or quota failures degrade to in-memory
state rather than breaking the UI. Missing keys fall back to documented defaults, so an upgrade
never strands a user.

---

## 11. Frontend-only limitations

- No accounts, no cloud sync — bookmarks and progress live on one device and one browser profile.
- Open-ended translations are **not** auto-graded; the app shows one suggested rendering and asks
  the learner to compare.
- No analytics, no telemetry, no personal data collection.
- Reference resources are external links; the app does not proxy or embed them.
- Illustrative institution names in practice material are generic and imply no affiliation.

---

## 12. Design decisions

**Direction — Academic Editorial Field Guide.** The design borrows from a university press
publication rather than a dashboard: hairline rules instead of shadowed cards, a serif display face
against a sans body, and information hierarchy carried by type and space.

**Signature element — the Bilingual Reading Workspace.** Source and translation share a two-column
grid with a hairline divider so the eye compares them line by line; on mobile the same relationship
becomes a stacked pair separated by a dashed rule. The chapter rail on the left doubles as both
navigation and progress indicator. Nothing else in the interface competes with this component.

**Palette.** The four given brand colours (ink, accent teal, canvas, highlight ochre) are expressed
as Tailwind `@theme` tokens; every surface, border, and state colour derives from them. The ochre
is reserved for translation notes, which is the only place the interface asks the reader to slow
down.

**Typography.** Noto Serif for headings and bilingual quotations, Be Vietnam Pro for everything
else. Both cover Vietnamese diacritics fully. Reading columns cap at ~70 characters; body line
height is 1.78 in long-form prose.

**Motion.** Three short, purposeful animations only: hero entry, dialog entry, and overlay fade.
All collapse under `prefers-reduced-motion`.

**Restraint.** No gradients as decoration, no icon-per-heading, no numbered markers where content
is not sequential, no card grid for its own sake. The one bold moment is the hero document — a
tilted bilingual page preview with a key-term strip.

**Deliberate simplifications** (marked `ponytail:` where they appear in code, or noted here):

- Search is an in-memory linear scan with token scoring. Correct and instant at 96+48+8+6 items;
  add an index if the corpus grows past a few thousand entries.
- Chapter in-page navigation uses `IntersectionObserver` to highlight the active section rather than
  a scroll-position router.
- No virtualised lists: no list exceeds 96 rows.

---

## 13. Skill installation and usage status

Six skills were installed from the requested sources with `npx skills add` and then mirrored into
the OMP-native project path so discovery works:

```text
.omp/skills/                      <- OMP native discovery (one level: <name>/SKILL.md)
├── frontend-design/              anthropics/skills
├── shadcn/                       shadcn-ui/ui
├── vercel-react-best-practices/  vercel-labs/agent-skills
├── vercel-composition-patterns/  vercel-labs/agent-skills
├── web-design-guidelines/        vercel-labs/agent-skills
└── webapp-testing/               anthropics/skills

.agents/skills/                   <- original install location, kept for other agents
`.

The default installer writes to `.agents/skills/` (with a `.claude` symlink). OMP discovers
`<root>/skills/<name>/SKILL.md` non-recursively, so the skill bodies were copied to
`.omp/skills/<name>/` — reference files included. `SKILL.md` files were read directly from disk and
applied throughout:

| Skill | How it was used |
|---|---|
| `frontend-design` | Design plan before code: token system, typographic scale, layout wireframes, and an explicit check against generic AI patterns (no cream+terracotta, no identical rounded-card kit, no eyebrow-above-every-heading). |
| `vercel-react-best-practices` | Direct imports (no barrels), lazy route splitting, `useDeferredValue` for glossary search, memoised derived lists, functional `setState`, no inline component definitions, primitives in effect deps. |
| `vercel-composition-patterns` | State/presentation split (`GlossaryBrowser` vs `GlossaryResultRow`), focused props (`BookmarkButton` takes `kind` + `id`), no god components; the largest page is composed of six data-driven sub-components. |
| `web-design-guidelines` | Focus trap and Escape on overlays, visible focus, semantic landmarks, labelled inputs, single `h1`, `aria-live` counts. |
| `shadcn/ui` | UI primitives follow the shadcn convention (`cva` variants, `cn` merge, Radix under the hood) and are hand-scaffolded rather than dragged in wholesale, so no unused dependency ships. |
| `webapp-testing` | Playwright-driven browser verification with real user flows and screenshots (see §14). |

---

## 14. Testing results

**Typecheck** — `npx tsc --noEmit` clean (strict, `noUnusedLocals`, `noUnusedParameters`).

**Unit + component tests** — `npx vitest run`: **31 passed**, 2 files.

Coverage of behaviour that can regress:

- Normalisation strips Vietnamese diacritics and `đ`; token scoring prefers prefix hits.
- Glossary: exactly 96 terms, exactly 12 per category, unique slugs and English terms, all
  `related` references resolve, every term has non-empty bilingual definition and example.
- Documented search examples (`mou`, `hoc bong`, `student exchange`, `admission`,
  `keynote speaker`) all return hits, and accent-free Vietnamese queries match.
- Phrases: 48 total, 8 per category, unique ids.
- Lessons: 8, numbered sequentially, each with ≥5 sections and ≥3 takeaways.
- Scenarios: 6, each with exactly 8 turns and ≥5 terms.
- Practice: 2 quizzes × 5 questions × exactly 4 options with valid `answerId`; 10 exercises with
  5 in each direction.
- CSV: quoting, escaping, CRLF, Vietnamese round-trip.
- Global search: empty query returns nothing; all four content types are reachable; result hrefs
  are real routes.
- Component: glossary filtering by diacritic-free query and by abbreviation, empty state, category
  narrowing, bookmark persistence and restore, UI-language persistence.

**Production build** — `npm run build` succeeds. Pages are code-split: the home page loads ~24 kB,
the largest page (practice) ~35 kB, with content tables shared across chunks.

**Browser tests** — Playwright, two projects (1440×900 desktop, 390×844 mobile): **115 passed, 3 skipped** (the skips are deliberate viewport guards: desktop-only dropdown checks and the sub-640px language-switch check).

- All 13 content routes render their `h1` and footer with no horizontal overflow; unknown route
  renders the 404 page.
- Header dropdown navigation, browser back, breadcrumb navigation.
- ⌘K palette opens, searches accent-free, Enter navigates; Escape closes.
- Glossary search narrows results and the live count changes from 96.
- Bookmark survives reload and appears on `/saved`; clipboard contains the Vietnamese term.
- Phrase bank hide-all/show-all restores the source text; category filter narrows to 8.
- Toolkit: checklist progress persists at 10%, reset returns to 0%; CSV download produces
  `edulingo-glossary.csv` with the expected header and row; note template saves and resets.
- Practice: quiz scores 5/5 on a known answer set, best score appears, retry resets; exercise
  reveal/hide works and the typed draft survives navigation between exercises.
- Mobile drawer: opens, locks body scroll, navigates and closes on route change, closes on Escape.
- Language switch changes navigation labels and persists across reload.
- Skip link is the first tab stop; one `h1` per page.

Screenshots captured during the visual pass are in `screenshots/` — 26 files, `desktop-*` and
`mobile-*` for each of 12 pages plus `mobile-drawer.png` and `desktop-search.png`.

---

## 15. Known issues

- The largest initial chunk still bundles React, Router, and Radix (~180 kB gzipped). Route-level
  splitting is in place; further splitting would fragment shared primitives without measurable
  benefit at this size.
- Mobile navigation is a drawer rather than a bottom bar; this matches the brief's "hamburger →
  drawer" requirement but means the language switch sits at the bottom of the drawer on small
  screens.
- Advice items in common-mistake entries are display-only; they are not individually checkable.
- Bookmarks for common-mistake entries are stored in `lessons` under a `tip:` prefix and are listed
  on `/saved` only as chapters, not as a separate group.

---

## 16. Recommended next steps

1. Add an audio practice mode (record → compare waveform) for shadowing; requires no backend.
2. Add spaced-repetition review over glossary bookmarks.
3. Add print stylesheets for chapter pages so a page can be carried into a booth.
4. Extract the glossary/scenarios data to JSON with a schema validator if non-developers will edit
   content.
5. Optional: an offline service worker (already fully client-side, so caching would be trivial).

---

## 17. Image credits and licensing

All photographs are local WebP copies in `public/images/` (1.4 MB total), sourced from Wikimedia
Commons under free licences. CC BY / CC BY-SA require attribution, so each image carries a credit
line in the UI and the full list is rendered on `/about`.

| File | Author | Licence |
|---|---|---|
| cat-study-abroad.webp | Biswarup Ganguly | CC BY 3.0 |
| cat-scholarships.webp | USAID Pakistan | Public domain |
| cat-cooperation.webp | Press Information Department (Bangladesh) | Public domain |
| cat-conferences.webp | Chris McKenna | CC BY-SA 4.0 |
| cat-administration.webp | Kenneth C. Zirkel | CC BY-SA 4.0 |
| cat-exchange.webp | Tulane Public Relations | CC BY 2.0 |
| cat-research.webp | Rhoda Baer | Public domain |
| cat-events.webp | Bijay Chaurasia | CC BY-SA 4.0 |
| sc-partnership.webp | Ambassador Nicholas Burns | Public domain |
| sc-consultation.webp | Indonesian Ministry of Foreign Affairs | Public domain |
| sc-seminar.webp | Jorge Jaramillo | CC BY-SA 4.0 |
| sc-exchange.webp | USAID Pakistan | Public domain |
| sc-scholarship.webp | Biswarup Ganguly | CC BY 3.0 |
| sc-signing.webp | Banking Academy of Vietnam | CC BY-SA 4.0 |
| hero-band.webp | Hugo Sundström | CC BY 4.0 |
| about-venue.webp | Tungsten | Public domain |

Machine-readable records, including Commons file titles and source URLs, live in
`src/content/imageCredits.ts`. Adding an image means adding a matching record there — the About
page renders that array directly.

## 19. Deployment

Live site: **https://le-minh-nhut.github.io/Khoi_Nguyen/**

Publishing uses a static branch (`gh-pages`) because this repository's Pages source is set to
"Deploy from a branch". Redeploy with:

```bash
npm run deploy
```

The script builds with the repo-derived base path, then writes the app shell into
`<route>/index.html` for every known route: 11 section pages, 96 glossary terms, 8 chapters, and
6 scenarios — 119 files in total, all returning **200**. `404.html` remains as the shell fallback
for genuinely unknown paths, and `.nojekyll` stops Jekyll from touching hashed asset names.

Direct URLs need a trailing slash (`/glossary/`, `/guide/types-of-interpreting/`); without one
GitHub issues a 301 redirect to the slashed form, which browsers follow transparently.

Note: `package.json` is named `edulingo-guide`, but the Pages base path must match the **repository**
name (`Khoi_Nguyen`), which is why the deploy script derives it from the git remote.

Code lives on `main` (default) and `feat/edulingo-guide`.

---

*Independent educational project. Not affiliated with, endorsed by, or sponsored by any university,
ministry, or professional body. Terminology and legal notes describe general usage and are not
legal advice.*
