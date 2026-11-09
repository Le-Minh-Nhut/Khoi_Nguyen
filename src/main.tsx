import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource-variable/noto-serif/index.css';
import './styles/index.css';
import { AppRoutes } from './app/router';
import { AppProviders } from './app/providers';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root is missing');

// Vite injects the deploy base ('/' locally, '/<repo>/' on GitHub Pages).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

createRoot(container).render(
  <BrowserRouter basename={basename}>
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  </BrowserRouter>,
);
