import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useBookmarks, useSettings } from '@/app/SettingsProvider';
import { translate, type UiKey } from '@/content/translations';
import { copyText } from '@/lib/storage';
import type { BookmarkKind } from '@/types/storage';

/** Access the UI dictionary for the active language. */
export function useI18n() {
  const { uiLang } = useSettings();
  return useCallback((key: UiKey) => translate(key, uiLang), [uiLang]);
}

/**
 * Clipboard write with a short-lived success flag for button feedback.
 * `copy` returns whether the write succeeded.
 */
export function useCopy(resetMs = 1800) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(
    async (text: string) => {
      const ok = await copyText(text);
      setStatus(ok ? 'copied' : 'error');
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setStatus('idle'), resetMs);
      return ok;
    },
    [resetMs],
  );

  return [status, copy] as const;
}

/** Bookmark controls for one item. */
export function useBookmark(kind: BookmarkKind, id: string) {
  const { isSaved, toggle } = useBookmarks();
  const saved = isSaved(kind, id);
  const onToggle = useCallback(() => toggle(kind, id), [toggle, kind, id]);
  return { saved, toggle: onToggle };
}

/** Debounce a fast-changing value (search inputs). */
export function useDebouncedValue<T>(value: T, delay = 180): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

/** Ctrl/⌘+K global handler. */
export function useSearchHotkey(onOpen: () => void) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'k' || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      onOpen();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onOpen]);
}

/** Lock body scroll while an overlay is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [locked]);
}

/** Track the topmost visible section while reading a long article. */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const key = useMemo(() => ids.join('|'), [ids]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const elements = key
      .split('|')
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: [0, 1] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
