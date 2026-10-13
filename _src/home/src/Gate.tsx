import Fade from './Fade';

/**
 * What every visitor sees: the whole screen, two choices, nothing of
 * spilo.xyz behind it. "enter site" goes to spilotrosrealty.com; the owner
 * link lets the rest of the page mount and opens the sign in.
 */
export default function Gate({ still, onOwner }: { still: boolean; onOwner: () => void }) {
  return (
    <main className="fixed inset-0 z-10 grid place-items-center px-5">
      <Fade still={still} delay={0.1} className="flex flex-col items-center gap-5">
        <a
          href="https://spilotrosrealty.com/"
          className="group inline-flex min-h-12 items-center gap-3 border border-ash px-7 text-[14px] text-chalk transition-colors duration-500 hover:border-chalk hover:bg-chalk hover:text-ink"
        >
          enter site
          <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
        </a>
        <button
          type="button"
          onClick={onOwner}
          className="hairline inline-flex min-h-11 items-center px-1 text-[12px] text-ash transition-colors duration-500 hover:text-chalk"
        >
          owner? click here
        </button>
      </Fade>
    </main>
  );
}
