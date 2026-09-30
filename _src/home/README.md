# spilo.xyz homepage

React + TypeScript + Tailwind CSS (v4), built with Vite into the site root
(`/index.html` and `/assets/home/*`). Everything else on spilo.xyz is plain
HTML and is not touched by this build.

Design rule: everything small and quiet. IBM Plex Mono 400 for text, Courier
Prime 700 for the one phrase,
11-13px text, one 16-19px phrase, lots of empty space.

- Motion (`motion/react`): slow fades (`src/Fade.tsx`, after React Bits'
  FadeContent) and the admin panel.
- anime.js: the world map only (dot strips fade in outward from Boise, then
  the marker and its slow pulse).
- Grain: `src/Grain.tsx`, adapted from React Bits' Noise, drawn once.
- Map: Natural Earth 110m land (public domain) via world-atlas, in
  `src/mapData.ts`, drawn as hairline coastlines with engraved hatching and grain over a 15°
  graticule. Interactive:
  hover spotlight and crosshair, click/tap/Enter drops a pin with the
  great-circle route and distance from Boise, arrow keys move.
- Ventures: `src/Ticker.tsx`, a slow CSS ticker across the top that pauses
  on hover and focus and stands still with reduced motion.

Rebuild after editing:

    cd _src/home
    npm install
    rm -rf ../../assets/home && npm run build
