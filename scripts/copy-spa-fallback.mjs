// GitHub Pages has no SPA rewrite. Serving the shell as 404.html lets deep
// links and reloads boot React Router instead of showing a GitHub 404.
import { copyFile, writeFile } from 'node:fs/promises';

await copyFile('dist/index.html', 'dist/404.html');
await writeFile('dist/.nojekyll', '');
console.log('GitHub Pages fallback written: dist/404.html, dist/.nojekyll');
