import { useCallback, useEffect, useRef, useState } from 'react';
import { readStorage, writeStorage } from '@/lib/storage';

/**
 * localStorage-backed state that stays in sync across tabs and across
 * component instances (via the native `storage` event for other tabs).
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, initialValue));
  const initialRef = useRef(initialValue);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      if (event.newValue === null) {
        setValue(initialRef.current);
        return;
      }
      try {
        setValue(JSON.parse(event.newValue) as T);
      } catch {
        /* ignore malformed external writes */
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  const update = useCallback(
    (next: T | ((current: T) => T)) => {
      setValue((current) => {
        const resolved =
          typeof next === 'function' ? (next as (c: T) => T)(current) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, update] as const;
}
