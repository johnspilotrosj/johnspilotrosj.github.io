import type { ReactNode } from 'react';
import { motion } from 'motion/react';

/**
 * A barely-there entrance: a slow fade with a 4px settle.
 * The idea of React Bits' <FadeContent>, rebuilt on Motion (no GSAP).
 */
export default function Fade({
  children, delay = 0, still, inView = false, className, as = 'div',
}: { children: ReactNode; delay?: number; still: boolean; inView?: boolean; className?: string; as?: 'div' | 'li' | 'p' }) {
  const M = motion[as];
  if (still) return <M className={className}>{children}</M>;
  const to = { opacity: 1, y: 0 };
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 4 }}
      {...(inView ? { whileInView: to, viewport: { once: true, margin: '-10% 0px' } } : { animate: to })}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
