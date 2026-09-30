import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { GRATICULE } from './mapData';
import ArchitectureArt from './ArchitectureArt';
import WorldMap from './WorldMap';
import Decrypt from './Decrypt';
import { useMedia, type BoiseNow } from './hooks';

const EASE = [0.22, 1, 0.36, 1] as const;

function fmt(c: { lat: number; lon: number }) {
  return `${Math.abs(c.lat).toFixed(2)}°${c.lat >= 0 ? 'N' : 'S'} ${Math.abs(c.lon).toFixed(2)}°${c.lon >= 0 ? 'E' : 'W'}`;
}

type Props = { still: boolean; now: BoiseNow; onTitleTap: () => void };

export default function Hero({ still, now, onTitleTap }: Props) {
  const desktop = useMedia('(min-width: 1024px)');
  const parallax = desktop && !still;
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, -70]);
  const mapY = useTransform(scrollY, [0, 800], [0, 36]);
  const [cursor, setCursor] = useState<{ lat: number; lon: number } | null>(null);

  /* Desktop: the map carries on through the image as a dark print, registered
     to the background map (measured from layout offsets, so parallax transforms
     don't skew it). */
  const mapRef = useRef<HTMLDivElement>(null);
  const figRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [print, setPrint] = useState<{ left: number; top: number; width: number } | null>(null);
  useLayoutEffect(() => {
    if (!desktop) { setPrint(null); return; }
    const measure = () => {
      const m = mapRef.current, f = figRef.current;
      if (!m || !f) return;
      const fr = frameRef.current;
      /* Sub-pixel layout: measure boxes, then take the frame's border off. */
      const mr = m.getBoundingClientRect(), frr = (fr || f).getBoundingClientRect();
      const shift = { x: (fr?.clientLeft || 0), y: (fr?.clientTop || 0) };
      const dy = (parseFloat(getComputedStyle(m).transform.split(',')[5] || '0') || 0) - (parseFloat(getComputedStyle(f).transform.split(',')[5] || '0') || 0);
      setPrint({ left: mr.left - frr.left - shift.x, top: mr.top - frr.top - shift.y - dy, width: mr.width });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (mapRef.current?.parentElement) ro.observe(mapRef.current.parentElement);
    return () => ro.disconnect();
  }, [desktop]);

  const line = (i: number) =>
    still ? {} : { initial: { y: '108%' }, animate: { y: '0%' }, transition: { duration: 0.8, delay: 0.1 + i * 0.09, ease: EASE } };
  const label = (i: number) =>
    still ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: 0.55 + i * 0.07, ease: EASE } };

  return (
    <section aria-labelledby="hero-title" className="tex-slab relative isolate overflow-hidden lg:min-h-[calc(100svh-3.5rem)]">
      {/* Background texture: grain everywhere, halftone drifting in from the right */}
      <div aria-hidden="true" className="tex-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" />
      <div aria-hidden="true" className="tex-halftone pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(55%_60%_at_78%_45%,black,transparent)]" />

      {/* Editorial grid rules */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 mx-auto hidden max-w-[1600px] grid-cols-12 gap-x-6 px-10 lg:grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-l border-chalk/[0.035] last:border-r" />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-[1600px] flex-col px-5 pb-16 pt-10 md:px-10 lg:grid lg:min-h-[calc(100svh-3.5rem)] lg:grid-cols-12 lg:gap-x-6 lg:pb-24 lg:pt-[9vh]">
        {/* Map: behind the copy on desktop, its own band on mobile. Motion owns the wrapper's parallax; anime.js owns the map inside. */}
        <motion.div
          ref={mapRef}
          style={parallax ? { y: mapY } : undefined}
          className="relative z-0 order-3 mt-12 lg:absolute lg:left-[29%] lg:top-[36%] lg:mt-0 lg:w-[76%]"
        >
          <WorldMap still={still} now={now} onPointer={setCursor} />
        </motion.div>

        {/* Copy */}
        <div className="pointer-events-none relative order-1 lg:col-span-8 lg:col-start-1 lg:row-start-1">
          <motion.p {...label(0)} className="pointer-events-auto relative z-20 flex w-fit items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
            <span className="text-rust-2">01</span>
            <span aria-hidden="true" className="h-px w-10 bg-rule" />
            <Decrypt text="Home base — Boise, Idaho" delay={still ? 0 : 450} still={still} />
          </motion.p>

          <h1
            id="hero-title"
            onClick={onTitleTap}
            className="pointer-events-auto relative z-20 mt-6 w-fit font-display text-[clamp(2.6rem,14.6vw,6rem)] leading-[0.86] tracking-[-0.005em] whitespace-nowrap text-chalk uppercase [text-shadow:0_2px_24px_rgb(20_19_17/0.45)] sm:text-[clamp(4.5rem,12.5vw,7rem)] lg:text-[clamp(6rem,10.2vw,10.2rem)]"
          >
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span className="block" {...line(0)}>Four ventures.</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span className="block" {...line(1)}>One home base.</motion.span>
            </span>
          </h1>

          <motion.p {...label(1)} className="pointer-events-auto relative z-20 mt-7 max-w-[34ch] text-[1.05rem] leading-relaxed text-chalk/80 md:text-lg">
            Real estate, home services, small-batch ice cream and websites, built and run by John Spilotros out of Boise, Idaho.
          </motion.p>

          <motion.div {...label(2)} className="pointer-events-auto relative z-20 mt-9 w-fit">
            <motion.a
              href="#ventures"
              whileTap={still ? undefined : { scale: 0.97 }}
              className="group relative inline-flex items-center gap-4 overflow-hidden border border-chalk bg-chalk px-6 py-4 font-mono text-xs font-medium tracking-[0.18em] text-asphalt uppercase"
            >
              <span aria-hidden="true" className="absolute inset-0 -z-0 origin-left scale-x-0 bg-rust transition-transform duration-500 ease-(--ease-arch) group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              <span className="relative transition-colors duration-500 group-hover:text-chalk group-focus-visible:text-chalk">Explore the ventures</span>
              <span aria-hidden="true" className="relative inline-block transition-[transform,color] duration-500 ease-(--ease-arch) group-hover:translate-x-1.5 group-hover:text-chalk group-focus-visible:text-chalk">→</span>
            </motion.a>
          </motion.div>
        </div>

        {/* The architectural "photograph": framed, crossing the grid's right edge */}
        <motion.figure
          ref={figRef}
          style={parallax ? { y: imgY } : undefined}
          className="relative z-10 order-4 mt-10 lg:absolute lg:left-[58%] lg:top-[5%] lg:mt-0 lg:w-[min(42%,calc((100svh-12.5rem)*0.8))]"
        >
          <motion.div
            ref={frameRef}
            initial={still ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.05, delay: 0.2, ease: EASE }}
            className="relative aspect-[4/5] max-h-[78svh] w-full overflow-hidden border border-rule lg:max-h-none"
          >
            <ArchitectureArt wallPrint={!print} />
            {print && (
              <svg
                aria-hidden="true"
                viewBox="0 20 1000 400"
                className="pointer-events-none absolute opacity-70 mix-blend-multiply"
                style={{ left: print.left, top: print.top, width: print.width, height: print.width * 0.4, color: '#1b1a17' }}
              >
                <path d={GRATICULE} fill="none" stroke="#1b1a17" strokeOpacity="0.28" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
                <use href="#land-stroke" />
              </svg>
            )}
            {/* Where the headline crosses into the frame, the image falls into shadow */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-[34%] bg-gradient-to-r from-asphalt/90 via-asphalt/55 to-transparent lg:block" />
            <div aria-hidden="true" className="tex-copy pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply" />
            <div aria-hidden="true" className="tex-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />
          </motion.div>
          {/* Corner ticks */}
          <span aria-hidden="true" className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-chalk/60" />
          <span aria-hidden="true" className="absolute -right-2 bottom-5 h-4 w-4 border-b border-r border-chalk/60 lg:right-2" />
          <motion.figcaption {...label(3)} className="mt-3 flex justify-between gap-4 font-mono text-[10px] tracking-[0.18em] text-dim uppercase lg:pr-8">
            <span>Fig. 01 — House study, exposed concrete</span>
            <span aria-hidden="true" className="hidden sm:inline">43.6° N</span>
          </motion.figcaption>
        </motion.figure>

        {/* Details: Boise time and weather, the cursor on the map, scroll cue */}
        <motion.div
          {...label(4)}
          className="relative z-20 order-5 mt-10 flex flex-wrap items-end justify-between gap-6 lg:absolute lg:bottom-8 lg:left-10 lg:right-[50vw] lg:mt-0"
        >
          <p className="font-mono text-[11px] leading-relaxed tracking-[0.16em] text-dim uppercase">
            <span className="text-chalk/90">{now.date}</span> · Boise · <span className="text-chalk/90">{now.time}</span>
            {now.weather && <> · {now.weather}</>}
            <span className="block text-dim/80" aria-hidden="true">{cursor ? `cursor ${fmt(cursor)}` : '43.62°N 116.20°W'}</span>
          </p>
          <a href="#ventures" className="group hidden items-center gap-3 font-mono text-[10px] tracking-[0.22em] text-dim uppercase hover:text-chalk lg:flex">
            <span>01 / 02 — Scroll</span>
            <span aria-hidden="true" className="relative block h-9 w-px overflow-hidden bg-rule">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-chalk/70 transition-transform duration-500 ease-(--ease-arch) group-hover:translate-y-full" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
