# spilo.xyz homepage

React + TypeScript + Tailwind CSS (v4), built with Vite into the site root
(`/index.html` and `/assets/home/*`). Everything else on spilo.xyz is plain
HTML and is not touched by this build.

Design rule: everything small and quiet. One face (IBM Plex Mono 400),
11-13px text, one 16-19px phrase, lots of empty space.

- Motion (`motion/react`): slow fades (`src/Fade.tsx`, after React Bits'
  FadeContent) and the admin panel.
- anime.js: the world map only (dot strips fade in outward from Boise, then
  the marker and its slow pulse).
- Grain: `src/Grain.tsx`, adapted from React Bits' Noise, drawn once.
- Map: Natural Earth 110m land (public domain) via world-atlas, in
  `src/mapData.ts`, sampled into sparse dots at runtime.

Rebuild after editing:

    cd _src/home
    npm install
    rm -rf ../../assets/home && npm run build
