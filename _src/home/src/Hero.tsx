import { useState } from 'react';
import Fade from './Fade';
import WorldMap, { elevationAt, milesFromBoise, type LatLon } from './WorldMap';
import type { BoiseNow } from './hooks';

function fmt(c: LatLon) {
  return `${Math.abs(c.lat).toFixed(3)}° ${c.lat >= 0 ? 'n' : 's'}, ${Math.abs(c.lon).toFixed(3)}° ${c.lon >= 0 ? 'e' : 'w'}`;
}
const HOME = '43.615° n, 116.202° w';
function elev(p: LatLon) {
  const m = elevationAt(p);
  if (m < 50) return 'near sea level';
  return `≈ ${(Math.round((m * 3.28084) / 100) * 100).toLocaleString('en-US')} ft`;
}
const BOISE_LL: LatLon = { lat: 43.615, lon: -116.2023 };

type Props = { still: boolean; now: BoiseNow; onTitleTap: () => void };

export default function Hero({ still, now, onTitleTap }: Props) {
  const [cursor, setCursor] = useState<LatLon | null>(null);
  const [pin, setPin] = useState<LatLon | null>(null);
  const miles = pin ? Math.round(milesFromBoise(pin)) : 0;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-auto grid min-h-[calc(100svh-6.25rem)] max-w-[1440px] grid-cols-12 content-start px-5 pb-12 md:px-10"
    >
      {/* Boise, right now: small, top right */}
      <Fade still={still} delay={0.15} className="col-span-12 justify-self-end pt-5 text-right text-[12px] leading-5 text-ash tabular-nums md:col-span-4 md:col-start-9 md:row-start-1 md:self-end">
        <p>
          <time>{now.time.toLowerCase()}</time>
          {now.weather && <span> · {now.weather}</span>}
        </p>
        <p>{now.date.toLowerCase()}</p>
        <p>{HOME}</p>
      </Fade>

      {/* The phrase */}
      <div className="col-span-12 pb-8 pt-14 md:col-span-7 md:col-start-2 md:row-start-1 md:self-end md:pb-0 md:pt-5">
        <Fade still={still} delay={0.45}>
          <h1 id="hero-title" onClick={onTitleTap} className="font-type text-[clamp(16px,1.3vw,19px)] leading-snug font-bold tracking-[0.01em] text-chalk">
            Four ventures, one home base.
          </h1>
        </Fade>
      </div>

      {/* The map: from the F of "Four" to the right edge, just under the coordinates */}
      <Fade
        still={still}
        delay={0.2}
        className="col-span-12 w-full md:col-span-11 md:col-start-2 md:row-start-2 md:mt-5"
      >
        <figure>
          <div className="relative">
            {/* crop marks */}
            <span aria-hidden="true" className="absolute -left-2 -top-2 h-2 w-2 border-l border-t border-ash-2" />
            <span aria-hidden="true" className="absolute -right-2 -top-2 h-2 w-2 border-r border-t border-ash-2" />
            <span aria-hidden="true" className="absolute -bottom-2 -left-2 h-2 w-2 border-b border-l border-ash-2" />
            <span aria-hidden="true" className="absolute -bottom-2 -right-2 h-2 w-2 border-b border-r border-ash-2" />
            <WorldMap still={still} cursor={cursor} pin={pin} onCursor={setCursor} onPin={setPin} />
          </div>
          <figcaption className="mt-4 border-t border-rule pt-2 text-[11px] text-ash tabular-nums">
            <div id="map-readout" className="flex h-8 items-center justify-between gap-4">
              {pin ? (
                <>
                  <span className="text-chalk">{miles < 1 ? 'right here' : `${miles.toLocaleString('en-US')} mi from boise`}</span>
                  <button type="button" onClick={() => setPin(null)} className="-mr-2 inline-flex h-8 items-center px-2 transition-colors duration-500 hover:text-chalk">
                    clear ×
                  </button>
                </>
              ) : (
                <>
                  <span>fig. 01&ensp;home base&ensp;<span className="text-ash-2">· contours 500, 1k, 2k, 3k, 4k m</span></span>
                  <span className="text-ash-2">tap or click to measure</span>
                </>
              )}
            </div>
            <div className="flex justify-between gap-4 text-ash-2">
              <span>{cursor ? 'pointer' : pin ? 'pin' : 'boise'} · {elev(cursor ?? pin ?? BOISE_LL)}</span>
              <span>{fmt(cursor ?? pin ?? BOISE_LL)}</span>
            </div>
          </figcaption>
        </figure>
      </Fade>
    </section>
  );
}
