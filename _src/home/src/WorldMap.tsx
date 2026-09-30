import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { animate, createDrawable, createTimeline, type JSAnimation } from 'animejs';
import { BOISE, LAND, toXY } from './mapData';

/* Equirectangular, cropped tight to the land: 82.8°N (Greenland) .. 56.9°S (Cape Horn). */
const VIEW_Y = 20;
const VIEW_H = 388;
const home = toXY(BOISE.lon, BOISE.lat);

export type LatLon = { lat: number; lon: number };

const clampLat = (v: number) => Math.max(-56, Math.min(82.5, v));
const wrapLon = (v: number) => ((((v + 180) % 360) + 360) % 360) - 180;
const fromXY = (x: number, y: number): LatLon => ({ lon: (x / 1000) * 360 - 180, lat: 90 - (y / 500) * 180 });

/** Great-circle distance from Boise, in miles. */
export function milesFromBoise(p: LatLon) {
  const r = Math.PI / 180;
  const dLat = (p.lat - BOISE.lat) * r, dLon = (p.lon - BOISE.lon) * r;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(BOISE.lat * r) * Math.cos(p.lat * r) * Math.sin(dLon / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
}

/** The shortest route from Boise to p, as it falls on this flat map (split at the date line). */
function routePath(p: LatLon) {
  const r = Math.PI / 180;
  const v = (q: LatLon) => [Math.cos(q.lat * r) * Math.cos(q.lon * r), Math.cos(q.lat * r) * Math.sin(q.lon * r), Math.sin(q.lat * r)];
  const a = v(BOISE), b = v(p);
  const w = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
  if (w < 1e-6) return '';
  let d = '', prevX: number | null = null;
  for (let i = 0; i <= 64; i++) {
    const t = i / 64, s1 = Math.sin((1 - t) * w) / Math.sin(w), s2 = Math.sin(t * w) / Math.sin(w);
    const x3 = s1 * a[0] + s2 * b[0], y3 = s1 * a[1] + s2 * b[1], z3 = s1 * a[2] + s2 * b[2];
    const pt = toXY(Math.atan2(y3, x3) / r, Math.atan2(z3, Math.hypot(x3, y3)) / r);
    d += `${prevX === null || Math.abs(pt.x - prevX) > 500 ? 'M' : 'L'}${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    prevX = pt.x;
  }
  return d;
}

/** A 15° grid of meridians and parallels. */
const GRID = (() => {
  let d = '';
  for (let lon = -165; lon < 180; lon += 15) { const x = toXY(lon, 0).x; d += `M${x} ${VIEW_Y}V${VIEW_Y + VIEW_H}`; }
  for (let lat = 75; lat > -60; lat -= 15) { const y = toXY(0, lat).y; d += `M0 ${y}H1000`; }
  return d;
})();

type Props = {
  still: boolean;
  cursor: LatLon | null;
  pin: LatLon | null;
  onCursor: (c: LatLon | null) => void;
  onPin: (c: LatLon | null) => void;
};

/**
 * A fine-line world map you can use: hairline coastlines, engraved hatching and grain, over a 15° grid.
 * Hover: a soft spotlight and hairline crosshair follow the pointer.
 * Click or tap: drop a pin and see the great-circle route and distance from Boise.
 * Keyboard: focus the map, arrows move (shift for 10°), Enter pins, Esc clears.
 * anime.js owns the entrance: the coastlines draw themselves, the land tone
 * fades up, then the marker appears.
 */
export default function WorldMap({ still, cursor, pin, onCursor, onPin }: Props) {
  const uid = useId().replace(/:/g, '');
  const coastRef = useRef<SVGPathElement>(null);
  const toneRef = useRef<SVGGElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const [keyMode, setKeyMode] = useState(false);

  useEffect(() => {
    if (still || !coastRef.current || !toneRef.current || !markRef.current || !ringRef.current) return;
    let pulse: JSAnimation | null = null;
    const ring = ringRef.current;
    const [line] = createDrawable(coastRef.current);
    const tl = createTimeline({
      defaults: { ease: 'inOutSine' },
      onComplete: () => { pulse = animate(ring, { scale: [1, 2.6], opacity: [0.45, 0], duration: 2600, ease: 'outSine', loop: true, loopDelay: 2400 }); },
    });
    tl.add(line, { draw: ['0 0', '0 1'], duration: 2600 }, 300)
      .add(toneRef.current, { opacity: [0, 1], duration: 1200, ease: 'outQuad' }, 1900)
      .add(markRef.current, { opacity: [0, 1], duration: 900, ease: 'outQuad' }, 2500);
    return () => { tl.revert(); pulse?.revert(); };
  }, [still]);

  const toMap = (e: { clientX: number; clientY: number; currentTarget: Element }) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 1000;
    const y = VIEW_Y + ((e.clientY - r.top) / r.height) * VIEW_H;
    return fromXY(Math.max(0, Math.min(1000, x)), Math.max(VIEW_Y, Math.min(VIEW_Y + VIEW_H, y)));
  };

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const big = e.shiftKey ? 10 : 2;
    const at = cursor ?? pin ?? BOISE;
    const move: Record<string, [number, number]> = { ArrowUp: [big, 0], ArrowDown: [-big, 0], ArrowLeft: [0, -big], ArrowRight: [0, big] };
    if (move[e.key]) {
      e.preventDefault();
      setKeyMode(true);
      onCursor({ lat: clampLat(at.lat + move[e.key][0]), lon: wrapLon(at.lon + move[e.key][1]) });
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPin(at);
    } else if (e.key === 'Escape' && pin) {
      e.stopPropagation();
      onPin(null);
    }
  }

  const hidden = still ? undefined : { opacity: 0 };
  const c = cursor ? toXY(cursor.lon, cursor.lat) : null;
  const p = pin ? toXY(pin.lon, pin.lat) : null;
  const route = useMemo(() => (pin ? routePath(pin) : ''), [pin]);

  return (
    <div
      role="application"
      tabIndex={0}
      aria-label="World map. Arrow keys move the crosshair, Enter drops a pin and measures the distance from Boise, Escape clears it."
      aria-describedby="map-readout"
      className="relative aspect-[1000/388] w-full cursor-crosshair touch-manipulation outline-offset-8"
      onPointerMove={(e) => { if (e.pointerType === 'mouse') { setKeyMode(false); onCursor(toMap(e)); } }}
      onPointerLeave={() => { if (!keyMode) onCursor(null); }}
      onClick={(e) => onPin(toMap(e))}
      onKeyDown={onKey}
      onBlur={() => { setKeyMode(false); onCursor(null); }}
    >
      <svg viewBox={`0 ${VIEW_Y} 1000 ${VIEW_H}`} className="absolute inset-0 h-full w-full overflow-hidden text-ash" aria-hidden="true">
        <defs>
          <radialGradient id={`${uid}-g`}>
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${uid}-m`} maskUnits="userSpaceOnUse" x="0" y={VIEW_Y} width="1000" height={VIEW_H}>
            {c && <circle cx={c.x} cy={c.y} r="90" fill={`url(#${uid}-g)`} />}
          </mask>
          {/* Engraved land: fine 45° hatching, brighter under the spotlight */}
          <pattern id={`${uid}-h`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#e2ddd3" strokeOpacity="0.17" strokeWidth="0.8" />
          </pattern>
          <pattern id={`${uid}-hb`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#e2ddd3" strokeOpacity="0.55" strokeWidth="0.8" />
          </pattern>
          {/* Printed grain: speckle that only lands inside the coastline */}
          <filter id={`${uid}-n`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" />
            <feColorMatrix values="0 0 0 0 0.89  0 0 0 0 0.87  0 0 0 0 0.83  0 0 0 1.4 -0.62" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>

        {/* Graticule, with the equator a touch firmer */}
        <path d={GRID} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="0" x2="1000" y1="250" y2="250" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 5" vectorEffect="non-scaling-stroke" />

        {/* Land: engraved hatching and grain, then a hairline coast */}
        <g ref={toneRef} style={hidden}>
          <path d={LAND} fill={`url(#${uid}-h)`} />
          <path d={LAND} fill="#fff" filter={`url(#${uid}-n)`} opacity="0.35" />
        </g>
        <path ref={coastRef} d={LAND} fill="none" stroke="currentColor" strokeOpacity="0.75" strokeWidth="0.8" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />

        {/* Spotlight: the coast near the pointer comes up to chalk */}
        {c && <path d={LAND} fill={`url(#${uid}-hb)`} stroke="#e2ddd3" strokeWidth="1.2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" mask={`url(#${uid}-m)`} />}

        {/* Crosshair */}
        {c && (
          <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <line x1={c.x} x2={c.x} y1={VIEW_Y} y2={VIEW_Y + VIEW_H} vectorEffect="non-scaling-stroke" />
            <line x1="0" x2="1000" y1={c.y} y2={c.y} vectorEffect="non-scaling-stroke" />
          </g>
        )}

        {/* Pin and the great-circle route to it */}
        {p && (
          <g className="text-chalk">
            <path d={route} fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
            <circle cx={p.x} cy={p.y} r="5" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <circle cx={p.x} cy={p.y} r="1.8" fill="currentColor" />
          </g>
        )}
      </svg>

      <span ref={markRef} className="pointer-events-none absolute" style={{ left: `${home.x / 10}%`, top: `${((home.y - VIEW_Y) / VIEW_H) * 100}%`, ...hidden }}>
        <span ref={ringRef} className="absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-full border border-rust" style={{ opacity: 0 }} />
        <span className="absolute -left-[2.5px] -top-[2.5px] h-[5px] w-[5px] rounded-full bg-rust" />
        <span className="absolute left-2 top-0 -translate-y-1/2 whitespace-nowrap text-[11px] leading-none text-chalk/80">boise</span>
      </span>
    </div>
  );
}
