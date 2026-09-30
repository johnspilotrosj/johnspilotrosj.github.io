import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Ventures from './Ventures';
import AdminPanel from './AdminPanel';
import { useBoiseNow, useReducedMotionPref } from './hooks';

export default function App() {
  const still = useReducedMotionPref();
  const now = useBoiseNow();
  const [admin, setAdmin] = useState(false);
  const typed = useRef('');
  const taps = useRef<number[]>([]);

  /* "admin" typed outside a text field opens the panel; Esc closes it. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setAdmin(false); return; }
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      typed.current = (typed.current + e.key.toLowerCase()).slice(-5);
      if (typed.current === 'admin') { typed.current = ''; setAdmin(true); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* Phones: five quick taps on the headline. */
  const onTitleTap = useCallback(() => {
    const t = Date.now();
    taps.current = taps.current.filter((x) => t - x < 2000).concat(t);
    if (taps.current.length >= 5) { taps.current = []; setAdmin(true); }
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[80] focus:bg-chalk focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-asphalt">Skip to content</a>
      <Header still={still} />
      <main id="main">
        <Hero still={still} now={now} onTitleTap={onTitleTap} />
        <Ventures />
      </main>
      <AdminPanel open={admin} onClose={() => setAdmin(false)} still={still} />
    </>
  );
}
