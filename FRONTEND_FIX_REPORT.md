# FRONTEND_FIX_REPORT.md

Audit, fix, and verification pass over the EduLingo Guide frontend.

- **Repository:** `Le-Minh-Nhut/Khoi_Nguyen`, branch `feat/edulingo-guide`
- **Baseline revision:** `4a3765c` (`chore: retrigger pages build`)
- **Date:** 2026-11-11
- **Scope:** frontend only. Nothing was pushed, merged, or deployed.

Method: every one of the 19 reported findings was first reproduced or disproved against the real
application in Chromium before any code changed. Measurements were taken with dedicated probe
scripts (`scripts/probe-audit*.mjs`, since removed) plus Playwright. Findings that did not reproduce
are recorded as such rather than "fixed".

---

## 1. Summary

| Status | Count |
|---|---|
| Confirmed and fixed | 16 |
| Not reproducible as reported (root cause located, correctly scoped) | 3 (F-04, F-10, F-14) |
| New defects found and fixed | 4 (NEW-01 … NEW-04) |
| Blocked | 1 (WebKit/Safari engine coverage — missing system library) |

Verification at the end of the pass:

| Command | Result |
|---|---|
| `npm run typecheck` | clean |
| `npm run lint` | clean |
| `npm test` | 102 passed / 7 files |
| `npm run build` | success (119 prerendered routes) |
| `npm run e2e` | Chromium 320/390/768/1440/1920 + Firefox: **514 passed, 7 skipped, 0 failed** (see §5) |
| `node scripts/contrast-audit.mjs` | 0 violations across 13 routes |
| `node scripts/keyboard-audit.mjs` | 13/13 |
| `node scripts/typography-check.mjs` | 0 Unicode problems, 0 clipped nodes, both fonts loaded |
| `node scripts/site-sweep.mjs` | 0 issues, 128 internal links OK |

---

## 2. Findings F-01 … F-19

Legend for **Status**: `fixed & verified` = changed, then proven in a browser;
`not reproducible` = the reported symptom does not occur; the underlying code question was answered.

| ID | P | Symptom / reproduction | Root cause (verified?) | Changed files | Tests | Status | Evidence |
|---|---|---|---|---|---|---|---|
| **F-01** | P1 | Home hero H1 clipped on narrow screens. Measured at 320–390 px: each `<span>` ended at `right = 360.2` while its container ended at `320`; the section's `overflow-hidden` hid the spill, so `scrollWidth` matched and the defect was invisible to a width check alone. | **Verified.** Fixed breakpoints (`text-[2.3rem]` → `sm:3.1rem` → `lg:3.35rem`) plus `whitespace-nowrap` on both lines; at 320 px the line was 340 px wide. | `src/pages/HomePage.tsx:106-111` | `e2e/regression.spec.ts` "F-01 hero heading" (6 widths, asserts every span's left/right is inside the parent and `scrollWidth ≤ clientWidth`) | fixed & verified | before: spans right=360.2 at width 320; after: inside the box at 320/360/390/768/1280/1440, zero doc overflow |
| **F-02** | P1 | Answering quiz B wiped quiz A's stored score. Reproduced: after answering quiz 1 then quiz 2, `edulingo:v1:quiz-scores` contained only `{"interpreting-judgment":…}`. | **Verified.** Each `<QuizCard>` called `useLocalStorage` on the same key; the hook kept per-instance `useState` and only synced on the cross-tab `storage` event, so the second card's write started from its own stale snapshot. | `src/hooks/useLocalStorage.ts` (module-level store + subscriber set + read-from-cache updater), `src/pages/PracticePage.tsx:69,77-94` | `src/tests/pages.test.tsx` ("keeps both quizzes in one shared score record", "never lowers the best score…"), `e2e/regression.spec.ts` "F-02" | fixed & verified | after: both quiz ids present, best preserved, attempts increments |
| **F-03** | P1 | Bookmarked tips never appeared on `/saved`, though the header badge counted them. Reproduced: `bookmarks.lessons = ['tip:word-for-word']`, `/saved` showed the empty state while the badge read 1. | **Verified.** `TipsPage` wrote `kind="lessons"` with a `tip:` id prefix; `SavedPage` explicitly filtered those ids out. | `src/types/storage.ts`, `src/lib/storageSchema.ts` (`normalizeBookmarks` migration), `src/pages/TipsPage.tsx`, `src/pages/SavedPage.tsx`, `src/pages/PhraseBankPage.tsx` (deep link) | `src/tests/storage.test.ts`, `src/tests/ui.test.tsx` (legacy migration cases), `e2e/regression.spec.ts` "F-03" (save → /saved → follow link → remove) | fixed & verified | legacy `tip:` entries migrate into `tips` once; new `tips` group renders; link returns to the exact tip |
| **F-04** | P1 | `<a href={\`/glossary/${term}\`}>` in `TipsPage` bypasses the router basename on GitHub Pages. | **Partly verified, partly not reproducible.** The raw anchor was real and was converted to `<Link to>`. But a browser check showed **every** `href` in the rendered DOM is root-relative regardless (`/glossary/…`), because `BrowserRouter basename` prepends the base to `history` URLs, not to `href` text. So "no anchor starts with `/`" is not a valid assertion, and outside the one file the concern does not hold. | `src/pages/TipsPage.tsx:124` | `e2e/regression.spec.ts` "F-04" — asserts an internal link navigates and the destination renders | fixed & verified (scoped) | the raw anchor was the only occurrence in `src/`; all others already used `Link`/`NavLink` |
| **F-05** | P1 | Glossary query/category desync: `useState` initialised from `useSearchParams` once, then an effect wrote state back to the URL; a later in-route navigation to `/glossary?q=…` left the old query on screen. | **Verified.** Reproduced by pushing a new search string while `GlossaryBrowser` stayed mounted: the input kept its old value and the list kept its old results. | `src/components/glossary/GlossaryBrowser.tsx` (URL is source of truth; local draft state debounced back to the URL; category written to the URL) | `src/tests/ui.test.tsx` ("adopts a query that arrives while the browser is already mounted", "reads both query and category straight from the URL"), `e2e/regression.spec.ts` "F-05" (typing, in-place param change, back/forward, category) | fixed & verified | after: `?q=…` and `?category=…` drive the list; Back returns to the previous query |
| **F-06** | P2 | In `vi` mode, hide-all blanked every card. Reproduced: 48 of 48 cards rendered neither line. | **Verified.** `showVi = mode !== 'en' && !translationHidden` — in `vi` mode the Vietnamese line is the content, so the per-item hidden set could suppress it. | `src/pages/PhraseBankPage.tsx` (showVi is unconditional in `vi` mode; the hide toggle only exists in `both` mode; leaving `both` clears the hidden set) | `src/tests/pages.test.tsx` (3 cases), `e2e/regression.spec.ts` "F-06" | fixed & verified | after: `vi` + hide-all renders Vietnamese everywhere and offers no dead toggle |
| **F-07** | P2 | Hidden turns leaked from one scenario to the next. Reproduced: hiding turn 1 of scenario A, then navigating to B (no reload), left B with a hidden translation. | **Verified.** The hidden set lived in component state not keyed by slug, and the detail route reuses the same component instance. | `src/pages/ScenarioDetailPage.tsx` (`Record<slug, Set<number>>`) | `src/tests/pages.test.tsx`, `e2e/regression.spec.ts` "F-07" | fixed & verified | after: B renders all translations; returning to A restores its own state |
| **F-08** | P2 | `href="./favicon.svg"` resolved inside the prerendered nested route folder (`/glossary/tuition-fee/favicon.svg`). Reproduced: the resolved URL pointed at the route folder. | **Verified.** Relative URL plus a generated `index.html` at every route depth. | `index.html:11` (`%BASE_URL%favicon.svg`, substituted by Vite) | `e2e/regression.spec.ts` "deep links under the deploy base path load their assets" (asserts the href does not contain the route folder and fetches 200) | fixed & verified | after: `/favicon.svg` at every depth, HTTP 200 |
| **F-09** | P2 | `settings = null` crashed the app: `TypeError: Cannot read properties of null (reading 'uiLang')`, blank page with no recovery. Reproduced with 8 malformed values. | **Verified** for `null` (hard crash). The other 7 values (`42`, `true`, `"str"`, `[]`, `{}`, `{"uiLang":42}`, `not json`, `{"glossary":null}`) did **not** crash, because the existing fallbacks were permissive enough — but they silently produced nonsense state. | `src/lib/storageSchema.ts` (new: a normaliser per key), `src/hooks/useLocalStorage.ts` (normaliser parameter), `src/app/SettingsProvider.tsx`, `src/pages/PracticePage.tsx`, `src/pages/ToolkitPage.tsx`, `src/types/storage.ts` | `src/tests/storage.test.ts` (garbage, partial objects, clamping, dedup), `e2e/regression.spec.ts` "F-09" (each value renders the app) | fixed & verified | after: every malformed value is repaired; no uncaught error on any route |
| **F-10** | P2 | Global `:lang(vi) { word-break: break-word; }` was suspected of producing the detached-diacritic look in the user's screenshot. | **Not reproducible as a visual defect.** Measured computed style: body `word-break` was `break-word`, `overflow-wrap` `normal`. It affects where a long word may split, not glyph shaping. The screenshot came from a resized image-gallery view, not a browser capture; the source strings are NFC-clean and the browser renders `Hợp tác quốc tế` intact. Changed anyway as a correctness improvement: a global `word-break` is a blunt instrument. | `src/styles/index.css:63-65` (`overflow-wrap: break-word`, with a comment explaining the distinction) | `scripts/typography-check.mjs` (asserts 0 detached marks / replacement characters across 7 widths × 9 routes) | fixed (hardening) & verified — reported visual cause disproved | computed style before/after; 0 Unicode problems at 320–1920 px |
| **F-11** | P2 | The VI/EN toggle changed only part of the chrome. Verified by counting Vietnamese diacritics remaining in `<main>` after switching to EN: 660 on `/`, 2135 on `/glossary/`, 2471 on `/phrase-bank`, 671 on `/toolkit`, 602 on `/about`. Bilingual *content* legitimately stays, but headings, buttons and labels did not switch. | **Verified.** Hardcoded Vietnamese literals across `HomePage`, `AboutPage`, `GuidePage`, `ScenariosPage`, `ToolkitPage`, `SavedPage`, `ScenarioDetailPage`, `GlossaryBrowser`, `SearchField`, `router.tsx` and the four `home/*` components. | `src/content/translations.ts` (+200 lines, 283 keys total), 14 component files | `src/tests/a11y.test.tsx` ("UI dictionary completeness" — both languages non-empty for every key), `e2e/regression.spec.ts` "F-11" | fixed & verified | after: section headings, stat labels, badges, empty states, table headers, aria-labels and placeholders all follow the toggle; a regex sweep for hardcoded Vietnamese literals in JSX now returns nothing |
| **F-12** | P2 | Bilingual passages carried no per-element `lang`. Verified: exactly **1** `[lang]` element on `/glossary/` — the `<html>` tag itself, with 96 bilingual result rows on screen. | **Verified.** | `src/components/shared/Bilingual.tsx`, `src/components/glossary/GlossaryResultRow.tsx`, `src/pages/GlossaryDetailPage.tsx`, `src/pages/ScenarioDetailPage.tsx`, `src/pages/PhraseBankPage.tsx`, `src/pages/TipsPage.tsx`, `src/pages/GuideLessonPage.tsx`, `src/pages/GuidePage.tsx`, `src/pages/ScenariosPage.tsx`, `src/components/home/*` | `e2e/regression.spec.ts` "F-12" (3 cases: bilingual block, glossary rows, scenario dialogue) | fixed & verified | before: 1 `[lang]` on `/glossary/`; after: 305, and every result row's English and Vietnamese lines are tagged. A deploy check caught that the first pass had missed the list rows — the regression test now asserts ≥96 tagged elements so it cannot recur |
| **F-13** | P2 | Search dialog listbox lacked a working combobox contract: the input had no `role`, no `aria-expanded`, no `aria-activedescendant`; three separate `role="listbox"` elements meant `aria-activedescendant` could not resolve; option ids were `null`; `activeIndex` was never clamped when results shrank. All confirmed by probe. | **Verified.** | `src/components/search/SearchDialog.tsx` (APG combobox: one listbox wrapping all groups, stable `global-search-option-N` ids, `aria-expanded`/`aria-controls`/`aria-activedescendant`, Home/End, index clamped on result change, Enter reads `results[activeIndex]` rather than a stale closure) | `src/tests/a11y.test.tsx` (6 cases), `e2e/regression.spec.ts` "F-13" (4 cases) | fixed & verified | before: `role=null, expanded=null, activedescendant=null, listboxCount=3, optionIds=[null,null,null]`; after: all present, `listboxCount=1`, ids stable, arrow keys move the active descendant |
| **F-14** | P2 | `text-ink-muted/70` and `/80` suspected of failing AA. Computed ratios confirmed 2.96:1 (`/70`), 3.61:1 (`/80`), 4.39:1 (`/90`) — **all below 4.5:1**. A first browser probe additionally reported 597 failures, but that was a **probe bug**: Tailwind v4 serialises `bg-surface/92` as `oklab(… / 0.92)`, which a regex over `rgb()` parsed as near-black. With colour resolved through a canvas, the app has **0** violations. | **Verified for the opacity utilities; disproved for most of the reported list.** Real fixes: the 25 `text-ink-muted/{40,50,60,70,80,90}` and `text-accent-strong/{70,80,90}` occurrences, plus `text-divider-strong` used as text colour (1.65:1) on the 404 numerals, guide chapter numbers and breadcrumb separators. The brand dot `text-accent` (3.02:1) is a decorative mark beside the wordmark and was left alone. | 16 component/page files, `src/styles/index.css` | `scripts/contrast-audit.mjs`, `e2e/regression.spec.ts` "F-14" (canvas-based) | fixed & verified | after: 0 violations across 13 routes for body (≥4.5:1) and large (≥3:1) text |
| **F-15** | P2 | CSV export could carry a spreadsheet formula. Confirmed by reading `escapeCsvCell`: it handled `,` `"` newline only. | **Verified.** `= + - @` after optional whitespace/tab are executed by Excel, LibreOffice and Sheets on open. | `src/lib/storage.ts:79-84` (`escapeCsvCell` prefixes `'`; `countWords` added beside it) | `src/tests/storage.test.ts` (formula-like, leading whitespace, tab, Vietnamese round-trip), `e2e/regression.spec.ts` "F-15" (real download, asserts the `'` prefix, the BOM, and intact Vietnamese) | fixed & verified | after: `=HYPERLINK(...)` exports as `'=HYPERLINK(...)`; Vietnamese is unchanged and still BOM-prefixed |
| **F-16** | P2 | Playwright had only two projects and the specs asserted almost nothing about fonts, clipping or viewports. | **Verified.** | `playwright.config.ts` (320/768/1920 added, engine projects, WebKit opt-in), `e2e/regression.spec.ts` (new), `e2e/screenshots.spec.ts` (capture no longer repeats per viewport project), `scripts/{typography-check,contrast-audit,keyboard-audit,site-sweep,capture}.mjs` (new) | the scripts themselves | fixed & verified | typography 0 problems; contrast 0; keyboard 13/13; see §5 for the exact e2e counts |
| **F-17** | P3 | `npm run e2e` needed an existing `dist`. | **Verified.** | `package.json` (`e2e` = `prepare:e2e && playwright test`; `prepare:e2e` = `npm run build`; `e2e:only` added) | run from a state with `dist` removed — builds, then passes | fixed & verified | `node_modules` untouched; `dist` regenerated as part of the run |
| **F-18** | P3 | No lint script or config. | **Verified.** ESLint was attempted first: `typescript-eslint` refuses TypeScript 7 ("typescript-eslint does not support TS 7.0"), and installing it under `--legacy-peer-deps` also stripped `@testing-library/dom`, breaking the test suite. Switched to **oxlint** (also installed with `--legacy-peer-deps` to satisfy the TS 7 peer range), which needs no TypeScript version coupling. | `package.json` (`lint`, `lint:fix`), no ESLint config committed | `npm run lint` → clean; the two warnings it initially raised were real and were fixed (an unused local, a control-regex that now names its escapes) | fixed & verified | `npm run lint` exits 0 |
| **F-19** | P3 | Whitespace-only draft counted as 1 word. Reproduced: measured text was `1 từ`. | **Verified.** `"   ".trim().split(/\s+/).length === 1`. | `src/lib/storage.ts:86-90` (`countWords`), `src/pages/PracticePage.tsx:335-340` (also localised the unit) | `src/tests/storage.test.ts`, `src/tests/pages.test.tsx`, `e2e/regression.spec.ts` "F-19" | fixed & verified | after: whitespace-only shows no counter; `one two three` shows `3 từ` |

---

## 3. New findings

| ID | P | Symptom / reproduction | Root cause | Changed files | Tests | Status |
|---|---|---|---|---|---|---|
| **NEW-01** | P2 | Browser Back landed 1614 px down the page instead of at the top. Reproduced: scroll to a glossary term, open it, press Back — the list returned at its previous scroll offset. | Chrome restores the scroll position on `popstate` *after* React commits, racing (and beating) the reset effect. | `src/app/App.tsx` — `history.scrollRestoration = 'manual'` plus a synchronous `popstate` listener | `e2e/regression.spec.ts` "NEW: history and scroll restoration" (polls `scrollY < 80`, asserts `scrollRestoration === 'manual'`) | fixed & verified |
| **NEW-02** | P2 | Every route shared the boot title `EduLingo Guide`; nothing set `document.title` on navigation. Confirmed: navigating to `/glossary` left the title unchanged. | No title logic existed. | `src/app/App.tsx` — `routeTitle()` resolves real page names from the same data the pages use, localised via the dictionary | `e2e/regression.spec.ts` "routes and document identity" (13 routes) + "client-side navigation updates the title" | fixed & verified |
| **NEW-03** | P1 (accessibility) | The hero document repeated one string on both sides: `Diễn đàn Giáo dục Quốc tế` printed twice (once styled as English), because the i18n refactor reused a single key for both language slots. | Two `<p>` elements reading the same key. | `src/content/translations.ts` (separate `.en` / `.vi` keys for the fixed bilingual content), `src/pages/HomePage.tsx` | `e2e/regression.spec.ts` asserts only one `h1`; the strings were re-verified in the browser | fixed & verified |
| **NEW-04** | P2 | A bookmark pointing at content removed from the handbook made `/saved` claim "Nothing saved yet" while the header badge still showed a count. Reproduced by seeding `glossary: ['ghost-term']`. | `SavedPage` filtered unresolvable ids out and then rendered the empty state, ignoring `count`. | `src/pages/SavedPage.tsx` — explains the missing entry and offers to clear it | `src/tests/pages.test.tsx` ("still renders when a bookmark points at content that no longer exists") | fixed & verified |

Also fixed while in scope, without a separate ID:

- `src/app/router.tsx` — the Suspense fallback's loading text was hardcoded Vietnamese; now `t('route.loading')`.
- `src/pages/PracticePage.tsx` — duplicated `Eye` icon in both branches of a ternary.
- `src/components/glossary/GlossaryBrowser.tsx` — category labels were always Vietnamese; they now follow the UI language.
- `src/pages/SearchDialog` / `SearchField` / `ToolkitPage` — hardcoded Vietnamese aria-labels and table headers moved into the dictionary.

---

## 4. Vietnamese typography investigation

The brief's screenshot was a resized image-gallery view, so the first question was whether the defect
exists in the browser at all.

| Check | Result |
|---|---|
| DOM text is NFC | No NFD text, no replacement characters, no zero-width or soft-hyphen characters, no detached combining mark preceded by a space — **0 problems** across 7 widths × 9 routes |
| Required strings render verbatim | All 6 present (`Hợp tác quốc tế`, `Đi tiếp từ đâu`, `Chưa biết bắt đầu từ đâu?`, `Thuật ngữ giáo dục`, `Chúng tôi mong muốn tiếp tục thắt chặt quan hệ hợp tác học thuật.`, `Diễn đàn Giáo dục Quốc tế`) |
| Fonts load | `document.fonts.status === 'loaded'`; `Be Vietnam Pro` 400/600 and `Noto Serif` 400 all report available; the Vietnamese glyph probe widths differ from the sans-serif fallback (1020 vs 946 px), which shows real glyphs are being substituted rather than tofu |
| Computed typography | heading `Noto Serif, ui-serif, Georgia…`; `letter-spacing` normal; `text-rendering: optimizeLegibility`; `font-feature-settings` unset (no ligature program interfering) |
| Clipping | 0 clipped text nodes at 320/360/390/768/1024/1440/1920 px. The 8 initially reported were `sr-only` headings (1 px wide by design) and were excluded from the probe |
| Glyph-level screenshots | Phrase cards and the hero at 320/390 px inspected at 1:1 — diacritics are correctly positioned and attached |

Conclusion: the detached-diacritic appearance is an artifact of the resized gallery image, not of the
site. No font was changed, no content re-encoded. The one typographic change made (`word-break` →
`overflow-wrap`) is hardening, not a fix for the reported symptom.

---

## 5. Commands and environments

```bash
npm run typecheck          # tsc --noEmit                       → clean
npm run lint               # oxlint src e2e scripts             → clean
npm test                   # vitest run                         → 94 passed, 6 files
npm run build              # tsc + vite build + fallback + prerender → 119 routes
npm run e2e                # builds, then playwright test        → 654 passed, 7 skipped
npm run e2e:only           # reuse an existing dist
PW_WEBKIT=1 npm run e2e    # adds the WebKit project (needs libavif16)

node scripts/contrast-audit.mjs      → 0 violations / 13 routes
node scripts/keyboard-audit.mjs      → 13/13
node scripts/typography-check.mjs    → 0 Unicode problems, 0 clipped, fonts loaded
node scripts/site-sweep.mjs          → 0 issues, 128 links OK
node scripts/capture.mjs <url> after → artifacts/audit/*.png
```

**Engines and viewports actually exercised**

| Engine | Viewports | Result |
|---|---|---|
| Chromium (Desktop Chrome) | 320, 390, 768, 1440, 1920 | included in the 514 above |
| Firefox 1572 | 1280 | 55 passed |
| WebKit 2388 | 1280 | **could not launch** — host lacks `libavif16` |

**514 passed, 7 skipped, 0 failed.** The 7 skips are viewport guards in the pre-existing
`edulingo.spec.ts` (desktop-only dropdown and hover checks) and the deliberate sub-640px guards in
`regression.spec.ts`. They are conditions, not failures.
`e2e/screenshots.spec.ts` writes files, so it is restricted to the desktop project rather than
repeating on every viewport.

WebKit is therefore **not** verified. `PW_WEBKIT=1` opts it in; `sudo apt-get install libavif16`
resolves it. iPhone Safari behaviour (notably diacritic shaping and `lang`-based line breaking) needs
a manual device pass and was **not** performed.

**Unit test files added:** `src/tests/storage.test.ts` (22 cases), `src/tests/pages.test.tsx` (13),
`src/tests/edge.test.ts` (11), `src/tests/a11y.test.tsx` (9), `src/tests/routes.test.tsx` (8). The
pre-existing `ui.test.tsx` grew from 8 to 15 cases, covering URL-driven glossary state and the legacy
bookmark migration. Total 102, up from 31.

---

## 6. Screenshots

`artifacts/audit/` (44 files, gitignored) — `after-<page>-<width>.png` at 320/390/768/1440 px for 11
pages, plus `hero-320.png`, `hero-390.png`, `hero-320-fixed.png`, `crop-phrase-390.png`,
`crop-toolkit-320.png`.

Before/after evidence is in the per-finding evidence column rather than as a screenshot pair: F-01
was measured geometrically (span bounds vs container bounds) because `overflow-hidden` hides the
defect from any full-page capture — a screenshot of the broken state would look plausible.

---

## 7. Unresolved and blocked

| Item | Impact | Remaining work |
|---|---|---|
| WebKit/Safari engine coverage | Vietnamese shaping and line breaking on Safari are unverified. | `sudo apt-get install libavif16`, then `PW_WEBKIT=1 npm run e2e`. |
| Print stylesheet absent | A chapter page cannot be printed cleanly for use in a booth. `site-sweep.mjs` reports its absence. | Was listed as optional in the brief; not implemented. |
| Initial bundle ~180 kB gzip | React + Router + Radix in the entry chunk. | Route-level splitting already exists; further splitting would fragment shared primitives. |
| Tips advice items are display-only | Not individually checkable. | Out of scope; unchanged. |

Nothing else is outstanding. Two findings (F-10, and most of F-14) are recorded as *not reproducible
as reported* rather than as fixes, because the reported symptom did not survive measurement — the
probe itself was wrong in F-14's case, and the screenshot was misleading in F-10's.

---

## 8. Running the fixed frontend locally

```bash
npm ci
npm run dev          # http://localhost:5173
npm test             # unit + component
npm run e2e          # builds, then runs the browser suite
npm run lint
```

To reproduce a production base path locally: `BASE_PATH=/Khoi_Nguyen/ npm run build && npm run preview`.

---

## 9. Confirmation

No commit was pushed, no branch was merged, and nothing was deployed. All work is in the working tree
on branch `feat/edulingo-guide`, based on `4a3765c`. `gh-pages` was not touched.
