/**
 * Audit helper: measures Vietnamese typography, font loading, and text integrity
 * in a real browser, then reports what it actually found.
 *
 * Usage: node scripts/typography-check.mjs [baseUrl] [outPath]
 */
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4173';
const OUT = process.argv[3] ?? 'artifacts/typography.json';

/** Strings the audit brief requires to render intact. */
const REQUIRED = [
  'Hợp tác quốc tế',
  'Đi tiếp từ đâu',
  'Chưa biết bắt đầu từ đâu?',
  'Thuật ngữ giáo dục',
  'Chúng tôi mong muốn tiếp tục thắt chặt quan hệ hợp tác học thuật.',
  'Diễn đàn Giáo dục Quốc tế',
];

const ROUTES = ['/', '/glossary/', '/phrase-bank', '/guide/', '/scenarios/', '/toolkit', '/tips', '/practice', '/about'];
const WIDTHS = [320, 360, 390, 768, 1024, 1440, 1920];

const browser = await chromium.launch();
const report = { base: BASE, fonts: null, routes: [], requiredStrings: [], unicode: [], wordBreak: [] };

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const measured = await page.evaluate(() => {
      const pick = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const style = getComputedStyle(element);
        return {
          selector,
          fontFamily: style.fontFamily,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing,
          lineHeight: style.lineHeight,
          wordBreak: style.wordBreak,
          overflowWrap: style.overflowWrap,
          textRendering: style.textRendering,
          fontFeatureSettings: style.fontFeatureSettings,
          fontVariantLigatures: style.fontVariantLigatures,
          width: Math.round(element.getBoundingClientRect().width),
          scrollWidth: element.scrollWidth,
        };
      };
      const problems = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const text = node.textContent ?? '';
        if (!text.trim()) continue;
        if (text !== text.normalize('NFC')) {
          problems.push({ kind: 'nfd', text: text.slice(0, 80), tag: node.parentElement?.tagName });
        }
        if (/[\uFFFD\u200B-\u200D\u00AD]/.test(text)) {
          problems.push({ kind: 'suspicious-codepoint', text: text.slice(0, 80), tag: node.parentElement?.tagName });
        }
        // A visible space immediately before a combining mark is the classic
        // "detached diacritic" artifact.
        if (/\s[\u0300-\u036f]/.test(text)) {
          problems.push({ kind: 'detached-mark', text: text.slice(0, 80), tag: node.parentElement?.tagName });
        }
      }
      // Any element whose text is wider than its box with visible overflow.
      const clipped = [];
      for (const element of document.querySelectorAll('h1, h2, h3, p, li, td, th')) {
        const style = getComputedStyle(element);
        // `sr-only` text is clipped to 1px on purpose; skip visually hidden nodes.
        if (element.clientWidth <= 1 || style.clipPath !== 'none' || style.visibility === 'hidden') continue;
        if (element.scrollWidth > element.clientWidth + 2 && style.overflow !== 'visible') {
          clipped.push({
            text: (element.textContent ?? '').trim().slice(0, 60),
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
          });
        }
      }
      return {
        body: pick('body'),
        heading: pick('h1'),
        prose: pick('.prose-guide'),
        bilingual: pick('.bilingual-line'),
        documentLang: document.documentElement.lang,
        langElements: [...document.querySelectorAll('[lang]')].length,
        problems,
        clipped,
      };
    });

    report.routes.push({ width, route, ...measured });
    if (width === 1440) {
      report.fonts = await page.evaluate(() => ({
        status: document.fonts.status,
        faces: [...document.fonts].map((face) => ({
          family: face.family,
          weight: face.weight,
          style: face.style,
          status: face.status,
          unicodeRange: face.unicodeRange,
        })),
        checks: {
          beVietnamPro400: document.fonts.check('400 16px "Be Vietnam Pro"'),
          beVietnamPro600: document.fonts.check('600 16px "Be Vietnam Pro"'),
          notoSerif400: document.fonts.check('400 16px "Noto Serif"'),
        },
        // Glyphs the brand requires: Vietnamese precomposed + đ/Đ.
        glyphProbe: (() => {
          const probe = document.createElement('span');
          probe.style.position = 'absolute';
          probe.style.visibility = 'hidden';
          probe.textContent = 'ăâêôơưđĂÂÊÔƠƯĐáàảãạắằẳẵặếềểễệốồổỗộớờởỡợứừửữựýỳỷỹỵ';
          probe.style.fontFamily = '"Be Vietnam Pro", sans-serif';
          probe.style.fontSize = '32px';
          document.body.appendChild(probe);
          const width = probe.getBoundingClientRect().width;
          probe.style.fontFamily = 'sans-serif';
          const fallbackWidth = probe.getBoundingClientRect().width;
          probe.remove();
          return { width: Math.round(width), fallbackWidth: Math.round(fallbackWidth) };
        })(),
      }));
    }

    // The audit's required Vietnamese strings must be present verbatim somewhere.
    if (width === 390) {
      for (const needle of REQUIRED) {
        const found = await page.evaluate(
          (value) => document.body.innerText.includes(value),
          needle,
        );
        if (found) report.requiredStrings.push({ route, string: needle });
      }
    }
    if (width === 360) {
      report.wordBreak.push({ route, wordBreak: measured.body?.wordBreak, overflowWrap: measured.body?.overflowWrap });
    }
  }
  await page.close();
}

await browser.close();
writeFileSync(OUT, JSON.stringify(report, null, 2));
console.log(`wrote ${OUT}`);

const problems = report.routes.flatMap((entry) =>
  entry.problems.map((problem) => ({ route: entry.route, width: entry.width, ...problem })),
);
const clipped = report.routes.flatMap((entry) =>
  entry.clipped.map((item) => ({ route: entry.route, width: entry.width, ...item })),
);
console.log('unicode problems:', problems.length);
if (problems.length) console.log(JSON.stringify(problems.slice(0, 10), null, 2));
console.log('clipped text nodes:', clipped.length);
if (clipped.length) console.log(JSON.stringify(clipped.slice(0, 10), null, 2));
console.log('required strings found:', report.requiredStrings.length);
console.log('fonts:', report.fonts?.status, JSON.stringify(report.fonts?.checks));
