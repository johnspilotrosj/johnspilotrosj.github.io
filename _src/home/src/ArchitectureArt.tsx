import { GRATICULE } from './mapData';

/**
 * The hero "photograph": a drawn study of a sculptural exposed-concrete house
 * pinned between city towers. Pure SVG so it stays sharp at any size and
 * weighs almost nothing. The world map is screen-printed across the tall
 * board-formed wall, reusing the land path the background map draws
 * (#land-stroke), so the two read as one surface.
 */
export default function ArchitectureArt({ wallPrint = true }: { wallPrint?: boolean }) {
  return (
    <svg
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      role="img"
      aria-label="Illustration: a sculptural exposed-concrete house with a cantilevered upper floor, deep shadows and black steel windows, wedged between dense city towers, with a world map printed across its tall concrete wall."
    >
      <defs>
        <linearGradient id="a-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6d0c5" />
          <stop offset="0.55" stopColor="#bdb6aa" />
          <stop offset="1" stopColor="#a39c90" />
        </linearGradient>
        <linearGradient id="a-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b2a27" />
          <stop offset="0.45" stopColor="#1a1917" />
          <stop offset="0.7" stopColor="#24231f" />
          <stop offset="1" stopColor="#121110" />
        </linearGradient>
        <linearGradient id="a-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1a17" />
          <stop offset="1" stopColor="#35322d" />
        </linearGradient>
        <linearGradient id="a-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141311" stopOpacity="0" />
          <stop offset="1" stopColor="#141311" stopOpacity="0.55" />
        </linearGradient>

        {/* Board-formed concrete: horizontal pour lines */}
        <pattern id="a-boards" width="40" height="15" patternUnits="userSpaceOnUse">
          <rect width="40" height="15" fill="none" />
          <line x1="0" y1="14.5" x2="40" y2="14.5" stroke="#1d1b18" strokeOpacity="0.16" strokeWidth="1" />
        </pattern>
        {/* Formwork tie holes */}
        <pattern id="a-ties" width="46" height="45" patternUnits="userSpaceOnUse">
          <circle cx="23" cy="22" r="1.7" fill="#2a2724" fillOpacity="0.45" />
        </pattern>
        {/* Tower windows */}
        <pattern id="a-win-far" width="14" height="18" patternUnits="userSpaceOnUse">
          <rect x="3" y="4" width="8" height="10" fill="#8f887c" fillOpacity="0.45" />
        </pattern>
        <pattern id="a-win-mid" width="18" height="22" patternUnits="userSpaceOnUse">
          <rect x="4" y="5" width="10" height="12" fill="#3d3934" fillOpacity="0.55" />
        </pattern>
        {/* Halftone dots for shadow areas */}
        <pattern id="a-dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.15" fill="#0e0d0c" fillOpacity="0.55" />
        </pattern>

        {/* Concrete grain, multiplied into whatever it is applied to */}
        <filter id="a-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.33  0 0 0 0 0.30  0 0 0 0.38 0" result="g" />
          <feComposite in="g" in2="SourceGraphic" operator="in" result="gi" />
          <feBlend in="gi" in2="SourceGraphic" mode="multiply" />
        </filter>
        {/* Larger-scale staining for weathered faces */}
        <filter id="a-stain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="3" seed="11" result="s" />
          <feColorMatrix in="s" type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.19  0 0 0 0 0.17  0 0 0 0.55 -0.12" result="st" />
          <feComposite in="st" in2="SourceGraphic" operator="in" result="sti" />
          <feBlend in="sti" in2="SourceGraphic" mode="multiply" />
        </filter>

        <clipPath id="a-wall">
          <rect x="138" y="352" width="226" height="506" />
        </clipPath>
      </defs>

      {/* Sky and far city */}
      <rect width="800" height="1000" fill="url(#a-sky)" />
      <g fill="#bab3a7">
        <rect x="-10" y="210" width="120" height="700" />
        <rect x="120" y="120" width="90" height="780" />
        <rect x="430" y="90" width="110" height="820" />
        <rect x="560" y="170" width="80" height="740" />
        <rect x="690" y="60" width="130" height="850" />
      </g>
      <g fill="url(#a-win-far)">
        <rect x="120" y="120" width="90" height="780" />
        <rect x="430" y="90" width="110" height="820" />
        <rect x="690" y="60" width="130" height="850" />
      </g>

      {/* Mid towers, closer and darker */}
      <g fill="#6c665c">
        <rect x="-20" y="330" width="150" height="600" />
        <rect x="360" y="250" width="120" height="660" />
        <rect x="620" y="300" width="200" height="620" />
      </g>
      <g fill="url(#a-win-mid)">
        <rect x="-20" y="330" width="150" height="600" />
        <rect x="360" y="250" width="120" height="660" />
        <rect x="620" y="300" width="200" height="620" />
      </g>

      {/* Near buildings framing the lot */}
      <g filter="url(#a-grain)">
        <rect x="-10" y="470" width="110" height="480" fill="#4b4741" />
        <rect x="740" y="410" width="80" height="540" fill="#45413b" />
      </g>
      <rect x="-10" y="470" width="110" height="480" fill="url(#a-win-mid)" opacity="0.6" />

      {/* ---------- The house ---------- */}
      <g filter="url(#a-stain)">
        {/* Plinth */}
        <rect x="92" y="838" width="640" height="68" fill="#9f988c" />
        {/* Tall board-formed wall */}
        <rect x="138" y="352" width="226" height="506" fill="#b7b0a4" />
        {/* Cantilevered upper volume, overhanging the plinth to the right */}
        <rect x="286" y="468" width="486" height="138" fill="#c2bbaf" />
        {/* Roof slab over the wall */}
        <rect x="120" y="336" width="300" height="18" fill="#cbc4b8" />
        {/* Fin wall */}
        <rect x="706" y="606" width="22" height="232" fill="#aca599" />
      </g>
      <g>
        <rect x="138" y="352" width="226" height="506" fill="url(#a-boards)" />
        <rect x="138" y="352" width="226" height="506" fill="url(#a-ties)" />
        <rect x="286" y="468" width="486" height="138" fill="url(#a-boards)" />
        <rect x="92" y="838" width="640" height="68" fill="url(#a-boards)" />
      </g>

      {/* The map, screen-printed on the wall */}
      {wallPrint && <g clipPath="url(#a-wall)" opacity="0.5">
        <g transform="translate(90 440) scale(0.62)" style={{ color: '#1f1d1a' }}>
          <path d={GRATICULE} fill="none" stroke="#1f1d1a" strokeOpacity="0.35" strokeWidth="1" />
          <use href="#land-stroke" />
        </g>
      </g>}

      {/* Sun from the upper right: lit tops, hard diagonal shadow on the wall */}
      <rect x="120" y="336" width="300" height="3" fill="#e2dccf" />
      <rect x="286" y="468" width="486" height="3" fill="#e2dccf" />
      <polygon points="138,520 286,606 286,858 138,858" fill="#161513" opacity="0.5" />
      <polygon points="138,352 160,352 160,858 138,858" fill="#161513" opacity="0.28" />

      {/* Deep shadows */}
      <rect x="286" y="606" width="486" height="26" fill="#1c1a17" />
      <rect x="120" y="354" width="300" height="14" fill="#2a2724" opacity="0.8" />
      <polygon points="364,606 704,606 704,838 364,838" fill="url(#a-shade)" />

      {/* Recessed glass wall under the cantilever, black steel mullions */}
      <rect x="384" y="632" width="310" height="206" fill="url(#a-glass)" />
      <rect x="470" y="720" width="130" height="118" fill="#e8e3d9" opacity="0.07" />
      <g stroke="#0b0b0a" strokeWidth="3">
        <line x1="384" y1="632" x2="384" y2="838" />
        <line x1="462" y1="632" x2="462" y2="838" />
        <line x1="540" y1="632" x2="540" y2="838" />
        <line x1="618" y1="632" x2="618" y2="838" />
        <line x1="694" y1="632" x2="694" y2="838" />
        <line x1="384" y1="700" x2="694" y2="700" strokeWidth="2" />
      </g>
      <polygon points="410,640 452,640 404,760 384,760 384,700" fill="#ffffff" opacity="0.05" />

      {/* Slot window in the tall wall */}
      <rect x="172" y="384" width="22" height="196" fill="#141311" />
      <line x1="183" y1="384" x2="183" y2="580" stroke="#0b0b0a" strokeWidth="2" />

      {/* Terrace railing on the cantilever: black steel */}
      <g stroke="#0e0e0d" strokeWidth="2.2" fill="none">
        <line x1="430" y1="432" x2="772" y2="432" />
        {[430, 470, 510, 550, 590, 630, 670, 710, 750, 772].map((x) => (
          <line key={x} x1={x} y1="432" x2={x} y2="468" />
        ))}
      </g>

      {/* A little greenery: terrace planters and a street tree */}
      <g fill="#5a654c">
        <circle cx="452" cy="458" r="12" />
        <circle cx="468" cy="452" r="14" />
        <circle cx="484" cy="460" r="10" />
        <circle cx="690" cy="456" r="11" />
        <circle cx="706" cy="450" r="13" />
      </g>
      <g fill="#48523d">
        <circle cx="462" cy="462" r="8" />
        <circle cx="698" cy="462" r="8" />
      </g>
      <rect x="84" y="760" width="5" height="90" fill="#2a2622" />
      <g fill="#4f5a43">
        <circle cx="86" cy="742" r="30" />
        <circle cx="64" cy="760" r="22" />
        <circle cx="108" cy="758" r="24" />
      </g>
      <g fill="url(#a-dots)">
        <circle cx="86" cy="742" r="30" />
        <circle cx="108" cy="758" r="24" />
      </g>

      {/* Halftone deepening the shadows */}
      <rect x="364" y="606" width="340" height="232" fill="url(#a-dots)" opacity="0.5" />
      <rect x="286" y="606" width="486" height="26" fill="url(#a-dots)" />

      {/* Cast shadow across the plinth, street */}
      <polygon points="92,906 732,906 820,1000 -20,1000" fill="#2a2825" />
      <polygon points="364,906 732,906 790,960 420,960" fill="#141311" opacity="0.45" />
      <line x1="-20" y1="972" x2="820" y2="972" stroke="#c9c2b6" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="40 30" />

      {/* Settle the whole study into the page */}
      <rect width="800" height="1000" fill="url(#a-fade)" />
    </svg>
  );
}
