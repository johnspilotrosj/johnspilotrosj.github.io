import { useEffect, useState } from 'react';

/**
 * Paper tooth over the whole page.
 * Adapted from React Bits' <Noise> (reactbits.dev, MIT + Commons Clause):
 * the same per-pixel random grain, but drawn once into a small tile instead
 * of redrawn every frame, so it reads as texture rather than static.
 */
export default function Grain({ alpha = 12, size = 160 }: { alpha?: number; size?: number }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const img = ctx.createImageData(size, size);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = alpha;
    }
    ctx.putImageData(img, 0, 0);
    setUrl(c.toDataURL('image/png'));
  }, [alpha, size]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={url ? { backgroundImage: `url(${url})` } : undefined}
    />
  );
}
