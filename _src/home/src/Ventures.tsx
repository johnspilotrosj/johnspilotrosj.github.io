const VENTURES = [
  { n: '01', name: 'Spilotros Realty', kind: 'Real estate · Boise & the Treasure Valley', href: 'https://spilotrosrealty.com/', external: true },
  { n: '02', name: "Benny's Treats", kind: 'Small-batch ice cream', href: '/bennys-treats/' },
  { n: '03', name: 'Dry Creek Services', kind: 'Home services · Eagle, Idaho', href: 'https://drycreekservices.xyz/', external: true },
  { n: '04', name: 'Web dev', kind: 'Websites', href: '/web-dev/' },
];

export default function Ventures() {
  return (
    <section id="ventures" aria-labelledby="ventures-title" className="scroll-mt-4 border-t border-rule">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
          <span className="text-rust-2">02</span>
          <span aria-hidden="true" className="h-px w-10 bg-rule" />
          <h2 id="ventures-title">Ventures</h2>
        </div>
        <ul className="mt-10 border-t border-rule">
          {VENTURES.map((v) => (
            <li key={v.name} className="border-b border-rule">
              <a
                href={v.href}
                {...(v.external ? { target: '_blank', rel: 'noopener' } : {})}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 md:grid-cols-[4rem_1fr_1fr_auto] md:py-8"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-dim">{v.n}</span>
                <span className="font-display text-[clamp(2rem,6vw,4.25rem)] leading-none tracking-[0.005em] text-chalk uppercase transition-colors duration-300 group-hover:text-rust-2">
                  {v.name}
                </span>
                <span className="col-start-2 mt-2 font-mono text-[11px] tracking-[0.16em] text-dim uppercase md:col-start-3 md:mt-0">{v.kind}</span>
                <span aria-hidden="true" className="col-start-3 row-start-1 font-mono text-lg text-dim transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-rust-2 md:col-start-4">
                  {v.external ? '↗' : '→'}
                </span>
                {v.external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 font-mono text-[10px] tracking-[0.2em] text-dim uppercase">spilo.xyz · Boise, Idaho · © {new Date().getFullYear()} John Spilotros</p>
      </div>
    </section>
  );
}
