import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { animate, stagger, type JSAnimation } from 'animejs';
import { BOISE, LAND, toXY } from './mapData';

/* Equirectangular, cropped to 82.8°N .. 61.2°S. */
const VIEW_Y = 20;
const VIEW_H = 400;
const STEP = 11;     // dot pitch in map units (the map is 1000 wide)
const BANDS = 14;    // vertical strips, revealed one after another
const home = toXY(BOISE.lon, BOISE.lat);
const homeBand = Math.floor(home.x / (1000 / BANDS));

export type LatLon = { lat: number; lon: number };

const clampLat = (v: number) => Math.max(-61, Math.min(82.5, v));
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

/** Sample the Natural Earth land outline on a regular grid: sparse, accurate dots. */
function landDots(): string[] {
  const bands = Array.from({ length: BANDS }, () => '');
  const ctx = typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;
  if (!ctx) return bands;
  const land = new Path2D(LAND);
  for (let y = VIEW_Y + STEP / 2; y < VIEW_Y + VIEW_H; y += STEP) {
    for (let x = STEP / 2; x < 1000; x += STEP) {
      if (ctx.isPointInPath(land, x, y)) bands[Math.min(BANDS - 1, Math.floor(x / (1000 / BANDS)))] += `M${x.toFixed(1)} ${y.toFixed(1)}h0`;
    }
  }
  return bands;
}

type Props = {
  still: boolean;
  cursor: LatLon | null;
  pin: LatLon | null;
  onCursor: (c: LatLon | null) => void;
  onPin: (c: LatLon | null) => void;
};

/**
 * A small dot-matrix world map you can use.
 * Hover: a soft spotlight and hairline crosshair follow the pointer.
 * Click or tap: drop a pin and see the great-circle route and distance from Boise.
 * Keyboard: focus the map, arrows move (shift for 10°), Enter pins, Esc clears.
 * anime.js owns the entrance: strips fade in outward from Boise, then the marker.
 */
export default function WorldMap({ still, cursor, pin, onCursor, onPin }: Props) {
  const uid = useId().replace(/:/g, '');
  const bands = useMemo(landDots, []);
  const allDots = useMemo(() => bands.join(''), [bands]);
  const svgRef = useRef<SVGSVGElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const [keyMode, setKeyMode] = useState(false);

  useEffect(() => {
    const strips = svgRef.current?.querySelectorAll('[data-band]');
    if (still || !strips || !markRef.current || !ringRef.current) return;
    let pulse: JSAnimation | null = null;
    const ring = ringRef.current;
    const reveal = animate(strips, { opacity: [0, 1], duration: 1400, delay: stagger(90, { from: homeBand, start: 400 }), ease: 'outQuad' });
    const mark = animate(markRef.current, {
      opacity: [0, 1], duration: 900, delay: 1500, ease: 'outQuad',
      onComplete: () => { pulse = animate(ring, { scale: [1, 2.6], opacity: [0.45, 0], duration: 2600, ease: 'outSine', loop: true, loopDelay: 2400 }); },
    });
    return () => { reveal.revert(); mark.revert(); pulse?.revert(); };
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
      className="relative aspect-[5/2] w-full cursor-crosshair touch-manipulation outline-offset-8"
      onPointerMove={(e) => { if (e.pointerType === 'mouse') { setKeyMode(false); onCursor(toMap(e)); } }}
      onPointerLeave={() => { if (!keyMode) onCursor(null); }}
      onClick={(e) => onPin(toMap(e))}
      onKeyDown={onKey}
      onBlur={() => { setKeyMode(false); onCursor(null); }}
    >
      <svg ref={svgRef} viewBox={`0 ${VIEW_Y} 1000 ${VIEW_H}`} className="absolute inset-0 h-full w-full overflow-visible text-ash" aria-hidden="true">
        <defs>
          <radialGradient id={`${uid}-g`}>
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${uid}-m`} maskUnits="userSpaceOnUse" x="0" y={VIEW_Y} width="1000" height={VIEW_H}>
            {c && <circle cx={c.x} cy={c.y} r="80" fill={`url(#${uid}-g)`} />}
          </mask>
        </defs>

        <line x1="0" x2="1000" y1="250" y2="250" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" />
        {bands.map((d, i) => (
          <path key={i} data-band={i} d={d} stroke="currentColor" strokeOpacity="0.55" strokeWidth="3.4" strokeLinecap="round" style={hidden} />
        ))}

        {/* Spotlight: the dots near the pointer come up to chalk */}
        {c && <path d={allDots} stroke="#e2ddd3" strokeWidth="3.8" strokeLinecap="round" mask={`url(#${uid}-m)`} />}

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
