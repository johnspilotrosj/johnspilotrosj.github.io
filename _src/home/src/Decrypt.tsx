import { useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789°./—';

/**
 * Decrypting label: characters settle left to right from random glyphs.
 * Runs once. Screen readers get the real text from aria-label, never the noise.
 */
export default function Decrypt({ text, delay = 0, still = false, className = '' }: { text: string; delay?: number; still?: boolean; className?: string }) {
  const [shown, setShown] = useState(still ? text : text.replace(/[^\s]/g, ' '));
  const raf = useRef(0);

  useEffect(() => {
    if (still) { setShown(text); return; }
    const duration = 700;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const settled = Math.floor(p * text.length);
      setShown(
        text
          .split('')
          .map((c, i) => (c === ' ' || i < settled ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(''),
      );
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    const to = window.setTimeout(() => { raf.current = requestAnimationFrame(tick); }, delay);
    return () => { window.clearTimeout(to); cancelAnimationFrame(raf.current); };
  }, [text, delay, still]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
