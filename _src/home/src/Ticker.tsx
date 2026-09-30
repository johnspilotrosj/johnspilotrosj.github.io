const VENTURES = [
  { n: '01', name: 'Spilotros Realty', kind: 'real estate, treasure valley', href: 'https://spilotrosrealty.com/', external: true },
  { n: '02', name: "Benny's Treats", kind: 'small-batch ice cream', href: '/bennys-treats/' },
  { n: '03', name: 'Dry Creek Services', kind: 'home services, eagle', href: 'https://drycreekservices.xyz/', external: true },
  { n: '04', name: 'Web dev', kind: 'websites', href: '/web-dev/' },
];

function Items({ copy }: { copy?: boolean }) {
  return (
    <ul className="flex shrink-0 items-stretch" {...(copy ? { 'aria-hidden': true } : {})}>
      {VENTURES.map((v) => (
        <li key={v.n} className="flex items-stretch">
          <a
            href={v.href}
            {...(v.external ? { target: '_blank', rel: 'noopener' } : {})}
            {...(copy ? { tabIndex: -1 } : {})}
            className="group inline-flex items-center gap-3 whitespace-nowrap px-5 text-[12px] text-ash transition-colors duration-500 hover:text-chalk focus-visible:-outline-offset-4 md:px-7"
          >
            <span className="text-[11px] text-ash-2">{v.n}</span>
            <span className="text-chalk">{v.name}</span>
            <span>{v.kind}</span>
            <span aria-hidden="true" className="transition-transform duration-500 ease-(--ease-quiet) group-hover:translate-x-0.5">{v.external ? '↗' : '→'}</span>
            {v.external && !copy && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
          <span aria-hidden="true" className="self-center text-ash-2">/</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The four ventures as a slow ticker across the very top.
 * Pauses on hover and while a link has focus; with reduced motion it
 * stands still and scrolls sideways instead.
 */
export default function Ticker({ still }: { still: boolean }) {
  return (
    <nav aria-label="Ventures" className="ticker relative z-20 border-b border-rule">
      <div className="ticker-view flex h-11 overflow-hidden">
        <div className={`ticker-track flex items-stretch ${still ? '' : 'is-moving'}`}>
          <Items />
          {!still && <Items copy />}
        </div>
      </div>
    </nav>
  );
}
