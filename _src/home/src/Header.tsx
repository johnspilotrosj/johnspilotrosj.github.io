import Fade from './Fade';

const LINKS = [
  { label: 'realty', href: 'https://spilotrosrealty.com/', external: true },
  { label: 'web dev', href: '/web-dev/' },
];

/* Visually small, but every link keeps a 44px tall hit area. */
export default function Header({ still }: { still: boolean }) {
  return (
    <Fade still={still} className="relative z-20">
      <header className="mx-auto max-w-[1440px] px-5 md:px-10">
        <nav aria-label="Main" className="flex h-14 items-center justify-between border-b border-rule">
          <a href="/" className="hairline -ml-1 inline-flex min-h-11 items-center px-1 text-[13px] text-chalk">
            spilo.xyz
          </a>
          <ul className="flex items-center gap-4 sm:gap-7">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
                  className="hairline inline-flex min-h-11 items-center px-1 text-[13px] text-ash transition-colors duration-500 hover:text-chalk"
                >
                  {l.label}
                  {l.external && <span aria-hidden="true">&nbsp;↗</span>}
                  {l.external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </Fade>
  );
}
