import type { Locale } from '@/types/i18n';

const formatters = new Map<string, Intl.NumberFormat>();

function percentFormatter(locale: Locale): Intl.NumberFormat {
  const key = `${locale}:pct`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: 'percent',
      maximumFractionDigits: 0,
    });
    formatters.set(key, formatter);
  }
  return formatter;
}

export function formatPercent(value: number, locale: Locale): string {
  const safe = Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
  return percentFormatter(locale).format(safe);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function uid(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
