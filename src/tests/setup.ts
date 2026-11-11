import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { resetLocalStorageCache } from '@/hooks/useLocalStorage';

afterEach(() => {
  cleanup();
  localStorage.clear();
  // useLocalStorage keeps a module-level cache shared by all instances of a key;
  // without this, state leaks from one test into the next.
  resetLocalStorageCache();
});
