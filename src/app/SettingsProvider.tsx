import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { storageKeys } from '@/lib/storage';
import type { AppSettings, BookmarkKind, BookmarkState } from '@/types/storage';

const DEFAULT_SETTINGS: AppSettings = { uiLang: 'vi', showTranslations: true };

interface SettingsContextValue {
  uiLang: 'vi' | 'en';
  setUiLang: (lang: 'vi' | 'en') => void;
  toggleUiLang: () => void;
  showTranslations: boolean;
  setShowTranslations: (show: boolean) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<AppSettings>(storageKeys.settings, DEFAULT_SETTINGS);

  // Missing/legacy keys merge onto defaults instead of breaking the UI.
  const uiLang = settings.uiLang === 'en' ? 'en' : 'vi';
  const showTranslations = settings.showTranslations !== false;

  const setUiLang = useCallback(
    (lang: 'vi' | 'en') => setSettings((current) => ({ ...current, uiLang: lang })),
    [setSettings],
  );

  const toggleUiLang = useCallback(
    () => setSettings((current) => ({ ...current, uiLang: current.uiLang === 'en' ? 'vi' : 'en' })),
    [setSettings],
  );

  const setShowTranslations = useCallback(
    (show: boolean) => setSettings((current) => ({ ...current, showTranslations: show })),
    [setSettings],
  );

  const value = useMemo<SettingsContextValue>(
    () => ({ uiLang, setUiLang, toggleUiLang, showTranslations, setShowTranslations }),
    [uiLang, setUiLang, toggleUiLang, showTranslations, setShowTranslations],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}

/* --------------------------------- Bookmarks -------------------------------- */

const EMPTY_BOOKMARKS: BookmarkState = { glossary: [], phrases: [], lessons: [], scenarios: [] };

interface BookmarksContextValue {
  bookmarks: BookmarkState;
  isSaved: (kind: BookmarkKind, id: string) => boolean;
  toggle: (kind: BookmarkKind, id: string) => boolean;
  remove: (kind: BookmarkKind, id: string) => void;
  count: number;
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

function normalizeBookmarks(raw: BookmarkState): BookmarkState {
  return {
    glossary: Array.isArray(raw?.glossary) ? raw.glossary : [],
    phrases: Array.isArray(raw?.phrases) ? raw.phrases : [],
    lessons: Array.isArray(raw?.lessons) ? raw.lessons : [],
    scenarios: Array.isArray(raw?.scenarios) ? raw.scenarios : [],
  };
}

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useLocalStorage<BookmarkState>(storageKeys.bookmarks, EMPTY_BOOKMARKS);
  const bookmarks = useMemo(() => normalizeBookmarks(stored), [stored]);

  const isSaved = useCallback(
    (kind: BookmarkKind, id: string) => bookmarks[kind].includes(id),
    [bookmarks],
  );

  const toggle = useCallback(
    (kind: BookmarkKind, id: string) => {
      const willSave = !bookmarks[kind].includes(id);
      setStored((current) => {
        const safe = normalizeBookmarks(current);
        const list = safe[kind];
        return {
          ...safe,
          [kind]: willSave ? [...list, id] : list.filter((value) => value !== id),
        };
      });
      return willSave;
    },
    [bookmarks, setStored],
  );

  const remove = useCallback(
    (kind: BookmarkKind, id: string) => {
      setStored((current) => {
        const safe = normalizeBookmarks(current);
        return { ...safe, [kind]: safe[kind].filter((value) => value !== id) };
      });
    },
    [setStored],
  );

  const count =
    bookmarks.glossary.length +
    bookmarks.phrases.length +
    bookmarks.lessons.length +
    bookmarks.scenarios.length;

  const value = useMemo<BookmarksContextValue>(
    () => ({ bookmarks, isSaved, toggle, remove, count }),
    [bookmarks, isSaved, toggle, remove, count],
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks(): BookmarksContextValue {
  const context = useContext(BookmarksContext);
  if (!context) throw new Error('useBookmarks must be used within BookmarksProvider');
  return context;
}
