import { defineConfig, devices } from '@playwright/test';

/**
 * WebKit only runs when explicitly requested (`PW_WEBKIT=1 npm run e2e`): it needs
 * `libavif16`, which not every host has, and a suite that always fails locally is
 * a suite people learn to ignore.
 */
const includeWebKit = process.env.PW_WEBKIT === '1';

/**
 * The suite runs against the production build (`vite preview`), because the
 * base path, prerendered route folders, and asset URLs only exist there.
 * `npm run e2e` builds first; `npm run e2e:only` reuses an existing `dist`.
 */
export default defineConfig({
  testDir: './e2e',
  testIgnore: [],
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'off',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    // The extra viewports run the behaviour suites; `screenshots.spec.ts` writes
    // files at fixed sizes, so repeating it per viewport would only add skips.
    {
      name: 'small',
      use: { ...devices['Desktop Chrome'], viewport: { width: 320, height: 720 } },
      testMatch: /(edulingo|regression)\.spec\.ts/,
    },
    {
      name: 'tablet',
      use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
      testMatch: /(edulingo|regression)\.spec\.ts/,
    },
    {
      name: 'wide',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
      testMatch: /(edulingo|regression)\.spec\.ts/,
    },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
      testMatch: /(edulingo|regression)\.spec\.ts/,
    },
    // WebKit is the closest available proxy for Safari, where Vietnamese
    // diacritic shaping and `lang`-based line breaking differ most. Opt-in via
    // PW_WEBKIT=1; requires `libavif16` (see README §18).
    ...(includeWebKit
      ? [
          {
            name: 'webkit',
            use: { ...devices['Desktop Safari'], viewport: { width: 1280, height: 900 } },
            testMatch: /regression\.spec\.ts/,
          },
        ]
      : []),
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1280, height: 900 } },
      testMatch: /regression\.spec\.ts/,
    },
  ],
  webServer: {
    command: 'npx vite preview --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
