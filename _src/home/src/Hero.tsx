import { useState } from 'react';
import Fade from './Fade';
import WorldMap from './WorldMap';
import type { BoiseNow } from './hooks';

function fmt(c: { lat: number; lon: number }) {
  return `${Math.abs(c.lat).toFixed(3)}° ${c.lat >= 0 ? 'n' : 's'}, ${Math.abs(c.lon).toFixed(3)}° ${c.lon >= 0 ? 'e' : 'w'}`;
}
const HOME = '43.615° n, 116.202° w';

type Props = { still: boolean; now: BoiseNow; onTitleTap: () => void };

export default function Hero({ still, now, onTitleTap }: Props) {
  const [cursor, setCursor] = useState<{ lat: number; lon: number } | null>(null);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-[1440px] grid-cols-12 grid-rows-[auto_1fr_auto] px-5 md:px-10"
    >
      {/* Boise, right now: small, top right */}
      <Fade still={still} delay={0.15} className="col-span-12 justify-self-end pt-5 text-right text-[12px] leading-5 text-ash tabular-nums">
        <p>
          <time>{now.time.toLowerCase()}</time>
          {now.weather && <span> · {now.weather}</span>}
        </p>
        <p>{now.date.toLowerCase()}</p>
        <p>{HOME}</p>
      </Fade>

      {/* The phrase and the one call to action */}
      <div className="col-span-12 self-center py-16 md:col-span-6 md:col-start-2 md:py-0 lg:col-span-5 lg:col-start-2">
        <Fade still={still} delay={0.3} as="p" className="text-[12px] text-ash">
          (01)&ensp;john spilotros, boise
        </Fade>
        <Fade still={still} delay={0.45}>
          <h1 id="hero-title" onClick={onTitleTap} className="mt-4 text-[clamp(16px,1.3vw,19px)] leading-snug font-normal text-chalk">
            Four ventures, one home base.
          </h1>
        </Fade>
        <Fade still={still} delay={0.6}>
          <a
            href="mailto:johnspilotros@kw.com?subject=Hello%20from%20spilo.xyz"
            className="hairline group mt-3 -ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-[13px] text-ash transition-colors duration-500 hover:text-chalk"
          >
            get in touch
            <span aria-hidden="true" className="transition-transform duration-500 ease-(--ease-quiet) group-hover:translate-x-0.5">→</span>
          </a>
        </Fade>
      </div>

      {/* The map: a small figure, low and to the right */}
      <Fade
        still={still}
        delay={0.2}
        className="col-span-12 w-full max-w-[380px] self-end justify-self-end pb-10 md:col-span-5 md:col-start-8 md:pb-16 lg:col-span-4 lg:col-start-8"
      >
        <figure>
          <div className="relative">
            {/* crop marks */}
            <span aria-hidden="true" className="absolute -left-3 -top-3 h-2 w-2 border-l border-t border-ash-2" />
            <span aria-hidden="true" className="absolute -right-3 -top-3 h-2 w-2 border-r border-t border-ash-2" />
            <span aria-hidden="true" className="absolute -bottom-3 -left-3 h-2 w-2 border-b border-l border-ash-2" />
            <span aria-hidden="true" className="absolute -bottom-3 -right-3 h-2 w-2 border-b border-r border-ash-2" />
            <WorldMap still={still} onPointer={setCursor} />
          </div>
          <figcaption className="mt-6 flex justify-between gap-4 border-t border-rule pt-2 text-[11px] text-ash tabular-nums">
            <span>fig. 01&ensp;home base</span>
            <span aria-live="off">{cursor ? fmt(cursor) : 'boise, idaho'}</span>
          </figcaption>
        </figure>
      </Fade>
    </section>
  );
}
