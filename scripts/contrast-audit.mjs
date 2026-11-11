/**
 * Standalone contrast audit. Renders each route in Chromium, resolves every
 * text colour with a canvas (Tailwind v4 emits oklab/color-mix for alpha
 * colours), and reports anything below its WCAG 2.2 AA threshold.
 *
 * Usage: node scripts/contrast-audit.mjs [baseUrl]
 */
import { chromium } from '@playwright/test';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4173';
const ROUTES = ['/', '/about', '/glossary/', '/glossary/tuition-fee/', '/phrase-bank', '/guide/', '/guide/types-of-interpreting', '/scenarios/', '/scenarios/university-partnership-meeting', '/toolkit', '/tips', '/practice', '/saved'];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let total = 0;

for (const route of ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
  const failures = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const toRgb = (css) => {
      if (!css || css === 'transparent') return [0, 0, 0, 0];
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#000';
      ctx.fillStyle = css;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b, a / 255];
    };
    const lin = (c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    const bg = (el) => {
      const layers = [];
      let node = el;
      while (node) {
        const rgba = toRgb(getComputedStyle(node).backgroundColor);
        if (rgba[3] > 0) layers.push(rgba);
        node = node.parentElement;
      }
      let out = [255, 255, 255];
      for (let i = layers.length - 1; i >= 0; i -= 1) {
        const [r, g, b, a] = layers[i];
        out = out.map((v, k) => [r, g, b][k] * a + v * (1 - a));
      }
      return out;
    };
    const ratio = (a, b) => {
      const l1 = lum(a);
      const l2 = lum(b);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    };
    const found = [];
    for (const el of document.querySelectorAll('p, span, dt, dd, a, li, button, th, td, label, h1, h2, h3, h4, figcaption, caption')) {
      const text = (el.textContent ?? '').trim();
      if (!text || el.children.length > 0) continue;
      const style = getComputedStyle(el);
      if (style.visibility === 'hidden' || style.display === 'none') continue;
      const [r, g, b, a] = toRgb(style.color);
      if (a === 0) continue;
      const fg = [r, g, b].map((v) => v * a + 255 * (1 - a));
      const size = parseFloat(style.fontSize);
      const weight = parseInt(style.fontWeight, 10) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const need = large ? 3 : 4.5;
      const value = ratio(fg, bg(el));
      if (value < need) {
        found.push({ text: text.slice(0, 45), ratio: Number(value.toFixed(2)), need, size, color: style.color });
      }
    }
    return found;
  });
  total += failures.length;
  console.log(`${failures.length === 0 ? 'PASS' : 'FAIL'} ${route} — ${failures.length} below AA`);
  for (const f of failures.slice(0, 8)) console.log('   ', JSON.stringify(f));
}

await browser.close();
console.log(`\ntotal failures: ${total}`);
process.exit(total === 0 ? 0 : 1);
