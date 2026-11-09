import type { ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BookmarksProvider, SettingsProvider } from './SettingsProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <BookmarksProvider>
        <TooltipProvider delayDuration={350} skipDelayDuration={200}>
          {children}
        </TooltipProvider>
      </BookmarksProvider>
    </SettingsProvider>
  );
}
