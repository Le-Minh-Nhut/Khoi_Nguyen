import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from './App';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const GlossaryPage = lazy(() => import('@/pages/GlossaryPage'));
const GlossaryDetailPage = lazy(() => import('@/pages/GlossaryDetailPage'));
const PhraseBankPage = lazy(() => import('@/pages/PhraseBankPage'));
const GuidePage = lazy(() => import('@/pages/GuidePage'));
const GuideLessonPage = lazy(() => import('@/pages/GuideLessonPage'));
const ScenariosPage = lazy(() => import('@/pages/ScenariosPage'));
const ScenarioDetailPage = lazy(() => import('@/pages/ScenarioDetailPage'));
const ToolkitPage = lazy(() => import('@/pages/ToolkitPage'));
const TipsPage = lazy(() => import('@/pages/TipsPage'));
const PracticePage = lazy(() => import('@/pages/PracticePage'));
const SavedPage = lazy(() => import('@/pages/SavedPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function PageFallback() {
  return (
    <div className="container-page py-20" role="status" aria-live="polite">
      <span className="sr-only">Đang tải nội dung</span>
      <div className="h-7 w-48 animate-pulse rounded bg-divider" />
      <div className="mt-4 h-3.5 w-full max-w-xl animate-pulse rounded bg-divider/70" />
      <div className="mt-2 h-3.5 w-full max-w-md animate-pulse rounded bg-divider/60" />
      <div className="mt-10 h-64 animate-pulse rounded-card bg-divider/40" />
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="glossary" element={<GlossaryPage />} />
          <Route path="glossary/:slug" element={<GlossaryDetailPage />} />
          <Route path="phrase-bank" element={<PhraseBankPage />} />
          <Route path="guide" element={<GuidePage />} />
          <Route path="guide/:slug" element={<GuideLessonPage />} />
          <Route path="scenarios" element={<ScenariosPage />} />
          <Route path="scenarios/:slug" element={<ScenarioDetailPage />} />
          <Route path="toolkit" element={<ToolkitPage />} />
          <Route path="tips" element={<TipsPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
