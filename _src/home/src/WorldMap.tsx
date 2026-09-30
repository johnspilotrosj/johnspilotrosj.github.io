import { useEffect, useMemo, useRef } from 'react';
import { animate, stagger, type JSAnimation } from 'animejs';
import { BOISE, LAND, toXY } from './mapData';

/* Equirectangular, cropped to 82.8°N .. 61.2°S. */
const VIEW_Y = 20;
const VIEW_H = 400;
const STEP = 11;     // dot pitch in map units (the map is 1000 wide)
const BANDS = 14;    // vertical strips, revealed one after another
const home = toXY(BOISE.lon, BOISE.lat);
const homeBand = Math.floor(home.x / (1000 / BANDS));

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

type Props = { still: boolean; onPointer?: (c: { lat: number; lon: number } | null) => void };

/**
 * A small dot-matrix world map. anime.js owns its motion: the strips fade in
 * outward from Boise, then the marker appears and breathes very slowly.
 */
export default function WorldMap({ still, onPointer }: Props) {
  const bands = useMemo(landDots, []);
  const svgRef = useRef<SVGSVGElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

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

  const hidden = still ? undefined : { opacity: 0 };

  return (
    <div
      className="relative aspect-[5/2] w-full"
      onPointerMove={(e) => {
        if (!onPointer || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 1000;
        const y = VIEW_Y + ((e.clientY - r.top) / r.height) * VIEW_H;
        onPointer({ lon: (x / 1000) * 360 - 180, lat: 90 - (y / 500) * 180 });
      }}
      onPointerLeave={() => onPointer?.(null)}
    >
      <svg ref={svgRef} viewBox={`0 ${VIEW_Y} 1000 ${VIEW_H}`} className="absolute inset-0 h-full w-full text-ash" aria-hidden="true">
        <line x1="0" x2="1000" y1="250" y2="250" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" />
        {bands.map((d, i) => (
          <path key={i} data-band={i} d={d} stroke="currentColor" strokeOpacity="0.55" strokeWidth="3.4" strokeLinecap="round" style={hidden} />
        ))}
      </svg>
      <span ref={markRef} className="pointer-events-none absolute" style={{ left: `${home.x / 10}%`, top: `${((home.y - VIEW_Y) / VIEW_H) * 100}%`, ...hidden }}>
        <span ref={ringRef} className="absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-full border border-rust" style={{ opacity: 0 }} />
        <span className="absolute -left-[2.5px] -top-[2.5px] h-[5px] w-[5px] rounded-full bg-rust" />
        <span className="absolute left-2 top-0 -translate-y-1/2 whitespace-nowrap text-[11px] leading-none text-chalk/80">boise</span>
      </span>
    </div>
  );
}
