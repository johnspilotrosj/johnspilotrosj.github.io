import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Builds straight into the site root: index.html plus assets/home/*.
// emptyOutDir stays off so nothing else in the repo is touched.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    outDir: '../../',
    emptyOutDir: false,
    assetsDir: 'assets/home',
    sourcemap: false,
  },
});
