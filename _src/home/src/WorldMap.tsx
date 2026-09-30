import { useEffect, useRef, useState } from 'react';
import { animate, createDrawable, createTimeline, type JSAnimation } from 'animejs';
import { BOISE, GRATICULE, LAND, toXY } from './mapData';
import type { BoiseNow } from './hooks';

/* The map is cropped to 82.8°N .. 61.2°S so the land fills the frame. */
const VIEW_Y = 20;
const VIEW_H = 400;
const home = toXY(BOISE.lon, BOISE.lat);
const homeLeft = `${(home.x / 1000) * 100}%`;
const homeTop = `${((home.y - VIEW_Y) / VIEW_H) * 100}%`;

type Props = {
  still: boolean;
  now: BoiseNow;
  onPointer?: (c: { lat: number; lon: number } | null) => void;
  className?: string;
};

/**
 * Etched world map. anime.js owns every animated part of it (the coastline
 * draw, the land and marker fade-ins, the marker pulse); React only renders.
 */
export default function WorldMap({ still, now, onPointer, className = '' }: Props) {
  const strokeRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (still || !strokeRef.current) return;
    let pulse: JSAnimation | null = null;
    const [line] = createDrawable(strokeRef.current);
    const tl = createTimeline({
      defaults: { ease: 'inOutSine' },
      onComplete: () => {
        if (!ringRef.current) return;
        pulse = animate(ringRef.current, { scale: [1, 3.4], opacity: [0.75, 0], duration: 1800, ease: 'outQuad', loop: true, loopDelay: 1400 });
      },
    });
    tl.add(line, { draw: ['0 0', '0 1'], duration: 1900 }, 0)
      .add(fillRef.current!, { opacity: [0, 1], duration: 800, ease: 'outQuad' }, 1300)
      .add(dotRef.current!, { scale: [0, 1], opacity: [0, 1], duration: 450, ease: 'outBack' }, 1700)
      .add(labelRef.current!, { opacity: [0, 1], translateX: [-6, 0], duration: 400, ease: 'outQuad' }, 1850);
    return () => { tl.revert(); pulse?.revert(); };
  }, [still]);

  const hidden = still ? undefined : { opacity: 0 };

  return (
    <div
      className={`relative aspect-[5/2] w-full ${className}`}
      onPointerMove={(e) => {
        if (!onPointer || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 1000;
        const y = VIEW_Y + ((e.clientY - r.top) / r.height) * VIEW_H;
        onPointer({ lon: (x / 1000) * 360 - 180, lat: 90 - (y / 500) * 180 });
      }}
      onPointerLeave={() => onPointer?.(null)}
    >
      <svg viewBox={`0 ${VIEW_Y} 1000 ${VIEW_H}`} className="absolute inset-0 h-full w-full text-chalk" aria-hidden="true">
        <defs>
          <pattern id="m-halftone" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="0.95" fill="#c9c2b6" />
          </pattern>
        </defs>
        <path d={GRATICULE} fill="none" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <path ref={fillRef} d={LAND} fill="url(#m-halftone)" fillOpacity="0.28" style={hidden} />
        <path
          ref={strokeRef}
          id="land-stroke"
          d={LAND}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.62"
          strokeWidth="0.8"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Home base marker: hover, focus or tap for the detail */}
      <div className="absolute z-10" style={{ left: homeLeft, top: homeTop }}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="home-base-detail"
          aria-label="Home base: Boise, Idaho. Show location details"
          onClick={() => setOpen((o) => !o)}
          onBlur={() => setOpen(false)}
          className="group relative -ml-3 -mt-3 grid h-6 w-6 place-items-center rounded-none"
        >
          <span ref={ringRef} className="pointer-events-none absolute h-2.5 w-2.5 rounded-full border border-rust-2" style={{ opacity: 0 }} />
          <span ref={dotRef} className="h-2.5 w-2.5 rounded-full bg-rust shadow-[0_0_0_3px_rgb(20_19_17)]" style={hidden} />
          <span
            id="home-base-detail"
            role="status"
            className={`pointer-events-none absolute left-5 top-1/2 w-56 -translate-y-1/2 border border-rule bg-asphalt/95 p-3 text-left font-mono text-[11px] leading-relaxed tracking-wide text-dim uppercase shadow-[6px_6px_0_rgb(0_0_0/0.35)] transition-[opacity,transform] duration-300 ease-(--ease-arch) group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${open ? 'visible translate-x-0 opacity-100' : 'invisible translate-x-1 opacity-0'}`}
          >
            <span className="block text-rust-2">Home base</span>
            <span className="block text-chalk">Boise, Idaho</span>
            <span className="block">43.615° N · 116.202° W</span>
            <span className="block">{now.time.toLowerCase()} local{now.weather ? ` · ${now.weather}` : ''}</span>
          </span>
        </button>
        <span ref={labelRef} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.18em] text-chalk uppercase" style={hidden}>
          Boise, ID
        </span>
      </div>
    </div>
  );
}
