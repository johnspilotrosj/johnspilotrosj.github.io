import { useEffect, useRef, useState, type MouseEvent } from 'react';

const REALTY = 'https://spilotrosrealty.com/';
/* The first clip spilotrosrealty.com's hero plays, so the hand-off is the same picture. */
const VIDEO = 'https://videos.pexels.com/video-files/4761059/4761059-hd_1920_1080_30fps.mp4';

/**
 * What every visitor sees: spilotrosrealty.com's hero video over the whole
 * screen, "enter site", and nothing of spilo.xyz. The owner link opens the
 * password sign in; nothing else of the site renders until it succeeds.
 *
 * Entering dips to the realty hero's own first frame (its charcoal under
 * the same scrim): the buttons fade, then the video, and only then does
 * the browser leave. The realty page opens on that same frame and brings
 * its video up, so the hand-off reads as one fade instead of a cut.
 */
const BUTTONS_OUT = 350;
const VIDEO_OUT = 800;
export default function Gate({ still, hideButtons = false, onOwner }: { still: boolean; hideButtons?: boolean; onOwner: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  /* Back from the realty site restores this page from the back/forward
     cache mid-fade; bring the buttons and the video back. */
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      setLeaving(false);
      video.current?.play().catch(() => {});
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  function enter(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (leaving) return;
    if (still) { window.location.href = REALTY; return; }
    setLeaving(true);
    window.setTimeout(() => { window.location.href = REALTY; }, VIDEO_OUT);
  }

  return (
    <main className={`gate fixed inset-0 z-10 overflow-hidden ${leaving ? 'is-leaving' : ''}`}>
      {!still && (
        <video
          ref={video}
          src={VIDEO}
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          className={`gate-video absolute inset-0 h-full w-full object-cover ${playing ? 'is-on' : ''}`}
        />
      )}
      <div aria-hidden="true" className="gate-scrim absolute inset-0" />
      <div
        style={{ transitionDuration: `${BUTTONS_OUT}ms` }}
        className={`relative grid h-full place-items-center px-5 transition-opacity ease-out ${leaving || hideButtons ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      >
        <div className="flex flex-col items-center gap-5">
          <a href={REALTY} onClick={enter} className="gate-btn">
            Enter site <span aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            onClick={onOwner}
            className="gate-owner inline-flex min-h-11 items-center px-2 text-[12px] text-white/70 transition-colors duration-300 hover:text-white"
          >
            owner? click here
          </button>
        </div>
      </div>
    </main>
  );
}
