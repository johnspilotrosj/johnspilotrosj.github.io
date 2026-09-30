import { useEffect, useState } from 'react';

/** Matches a media query and follows it as it changes. */
export function useMedia(query: string): boolean {
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const set = () => setOn(m.matches);
    set();
    m.addEventListener('change', set);
    return () => m.removeEventListener('change', set);
  }, [query]);
  return on;
}

export const useReducedMotionPref = () => useMedia('(prefers-reduced-motion: reduce)');

const TZ = 'America/Boise';

/** WMO weather codes to a word or two. */
function sky(code: number): string {
  if (code === 0) return 'clear';
  if (code <= 2) return 'partly cloudy';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'showers';
  if (code === 85 || code === 86) return 'snow showers';
  if (code >= 95) return 'thunderstorms';
  return '';
}

export type BoiseNow = { date: string; time: string; weather: string | null };

/** Boise date and time (ticks every 15s) and current weather from Open-Meteo (every 15 min). */
export function useBoiseNow(): BoiseNow {
  const read = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString('en-US', { timeZone: TZ, weekday: 'short', month: 'short', day: 'numeric' }).replace(/,/g, ''),
      time: now.toLocaleTimeString('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' }),
    };
  };
  const [clock, setClock] = useState(read);
  const [weather, setWeather] = useState<string | null>(null);

  useEffect(() => {
    const t = window.setInterval(() => setClock(read()), 15000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch('https://api.open-meteo.com/v1/forecast?latitude=43.615&longitude=-116.2023&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FBoise')
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((j) => {
          const c = j && j.current;
          if (!alive || !c || typeof c.temperature_2m !== 'number') return;
          const w = sky(c.weather_code);
          setWeather(`${Math.round(c.temperature_2m)}°F${w ? ' ' + w : ''}`);
        })
        .catch(() => { /* the clock alone is fine */ });
    load();
    const t = window.setInterval(load, 15 * 60 * 1000);
    return () => { alive = false; window.clearInterval(t); };
  }, []);

  return { ...clock, weather };
}
