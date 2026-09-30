import { motion } from 'motion/react';

const LINKS = [
  { label: 'Ventures', href: '#ventures' },
  { label: 'Realty', href: 'https://spilotrosrealty.com/', external: true },
  { label: 'Web dev', href: '/web-dev/' },
];

export default function Header({ still }: { still: boolean }) {
  return (
    <motion.header
      initial={still ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-40 border-b border-rule"
    >
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-[1600px] items-center gap-6 px-5 md:px-10">
        <a href="/" className="font-display text-[1.35rem] leading-none tracking-[0.04em] text-chalk uppercase">
          spilo<span className="text-rust">.</span>xyz
        </a>
        <span className="hidden font-mono text-[10px] tracking-[0.2em] text-dim uppercase lg:inline">John Spilotros · Boise, Idaho</span>
        <ul className="ml-auto hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
                className="nav-link font-mono text-[11px] tracking-[0.16em] text-chalk/85 uppercase hover:text-chalk"
              >
                {l.label}
                {l.external && <span aria-hidden="true"> ↗</span>}
                {l.external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:johnspilotros@kw.com?subject=Hello%20from%20spilo.xyz"
          className="ml-auto border border-chalk/70 px-3.5 py-2 font-mono text-[11px] tracking-[0.16em] text-chalk uppercase transition-colors duration-300 hover:border-rust hover:bg-rust md:ml-0"
        >
          Get in touch
        </a>
      </nav>
    </motion.header>
  );
}
