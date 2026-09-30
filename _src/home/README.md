# spilo.xyz homepage

React + TypeScript + Tailwind CSS (v4), built with Vite into the site root
(`/index.html` and `/assets/home/*`). Everything else on spilo.xyz is plain
HTML and is not touched by this build.

- Motion (`motion/react`): headline mask reveal, image clip reveal, staggered
  labels, CTA press, admin panel, and desktop scroll parallax.
- anime.js: the world map only (coastline draw, land and marker fade-ins,
  marker pulse).
- Map: Natural Earth 110m land (public domain) via world-atlas, in
  `src/mapData.ts`. The hero illustration is hand-built SVG in
  `src/ArchitectureArt.tsx`.

Rebuild after editing:

    cd _src/home
    npm install
    rm -rf ../../assets/home && npm run build
