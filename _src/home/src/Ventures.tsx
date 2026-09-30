import Fade from './Fade';

const VENTURES = [
  { n: '01', name: 'Spilotros Realty', kind: 'real estate, treasure valley', href: 'https://spilotrosrealty.com/', external: true },
  { n: '02', name: "Benny's Treats", kind: 'small-batch ice cream', href: '/bennys-treats/' },
  { n: '03', name: 'Dry Creek Services', kind: 'home services, eagle', href: 'https://drycreekservices.xyz/', external: true },
  { n: '04', name: 'Web dev', kind: 'websites', href: '/web-dev/' },
];

export default function Ventures({ still }: { still: boolean }) {
  return (
    <section id="ventures" aria-labelledby="ventures-title" className="mx-auto max-w-[1440px] scroll-mt-6 px-5 pb-24 pt-10 md:px-10 md:pb-36 md:pt-16">
      <div className="grid grid-cols-12 gap-y-4">
        <h2 id="ventures-title" className="col-span-12 text-[12px] font-normal text-ash md:col-span-3 md:col-start-2">
          (02)&ensp;ventures
        </h2>
        <ul className="col-span-12 border-t border-rule md:col-span-7 md:col-start-5 lg:col-span-6 lg:col-start-6">
          {VENTURES.map((v, i) => (
            <Fade key={v.name} as="li" still={still} inView delay={i * 0.08} className="border-b border-rule">
              <a
                href={v.href}
                {...(v.external ? { target: '_blank', rel: 'noopener' } : {})}
                className="group grid min-h-12 grid-cols-[2rem_1fr_auto] items-center gap-x-4 text-[13px] sm:grid-cols-[2.5rem_1fr_1fr_auto]"
              >
                <span className="text-[11px] text-ash-2 transition-colors duration-500 group-hover:text-ash">{v.n}</span>
                <span className="text-chalk">{v.name}</span>
                <span className="hidden text-ash sm:block">{v.kind}</span>
                <span aria-hidden="true" className="text-ash transition-[color,transform] duration-500 ease-(--ease-quiet) group-hover:translate-x-0.5 group-hover:text-chalk">
                  {v.external ? '↗' : '→'}
                </span>
                {v.external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </Fade>
          ))}
        </ul>
      </div>
    </section>
  );
}
