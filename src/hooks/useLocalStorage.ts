import { useCallback, useEffect, useRef, useState } from 'react';
import { readStorage, writeStorage } from '@/lib/storage';

/**
 * localStorage-backed state shared by every mounted instance of the same key.
 *
 * Two quiz cards on one page both own `edulingo:v1:quiz-scores`; without a
 * shared source of truth each kept its own copy and the second write wiped the
 * first quiz's score. The module-level cache below is the single source of
 * truth for the current tab, and the native `storage` event keeps other tabs in
 * step.
 */
const cache = new Map<string, unknown>();
const subscribers = new Map<string, Set<(value: unknown) => void>>();

function broadcast(key: string, value: unknown): void {
  cache.set(key, value);
  for (const notify of subscribers.get(key) ?? []) notify(value);
}

function current<T>(key: string, initial: T, normalize?: (value: unknown) => T): T {
  if (cache.has(key)) return cache.get(key) as T;
  const stored = readStorage<unknown>(key, undefined);
  const resolved = normalize ? normalize(stored === undefined ? initial : stored) : (stored as T);
  cache.set(key, resolved);
  return resolved;
}

/**
 * @param key versioned storage key
 * @param initialValue value used when nothing (valid) is stored
 * @param normalize validates persisted data; without it a malformed value would
 *   reach the component and throw during render.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  normalize?: (value: unknown) => T,
) {
  const normalizer = useRef(normalize);
  normalizer.current = normalize;

  const [value, setValue] = useState<T>(() => current(key, initialValue, normalize));

  // Keep this instance in the loop for same-tab writer + cross-tab storage events.
  useEffect(() => {
    const notify = (next: unknown) => {
      const fn = normalizer.current;
      setValue(fn ? fn(next) : (next as T));
    };
    const set = subscribers.get(key) ?? new Set();
    set.add(notify);
    subscribers.set(key, set);

    // Another tab wrote: adopt it unless it is unreadable.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      const next = event.newValue === null ? initialValue : readStorage<unknown>(key, initialValue);
      broadcast(key, normalizer.current ? normalizer.current(next) : (next as T));
    };
    window.addEventListener('storage', onStorage);

    // A value may have changed between render and effect; adopt the cache.
    if (cache.has(key)) notify(cache.get(key));

    return () => {
      set.delete(notify);
      if (set.size === 0) subscribers.delete(key);
      window.removeEventListener('storage', onStorage);
    };
    // `initialValue` is intentionally not a dependency: it is a literal at every
    // call site and re-subscribing on identity change would churn listeners.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((currentValue: T) => T)) => {
      // Read from the cache, never from a possibly stale render closure, so two
      // writers on the same page compose instead of overwriting each other.
      const previous = current(key, initialValue, normalizer.current);
      const resolved = typeof next === 'function' ? (next as (c: T) => T)(previous) : next;
      writeStorage(key, resolved);
      broadcast(key, resolved);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [key],
  );

  return [value, update] as const;
}

/** Test seam: forget cached values so a fresh read hits localStorage again. */
export function resetLocalStorageCache(): void {
  cache.clear();
}
