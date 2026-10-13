import { useState, type MouseEvent } from 'react';

const REALTY = 'https://spilotrosrealty.com/';
/* The first clip spilotrosrealty.com's hero plays, so the hand-off is the same picture. */
const VIDEO = 'https://videos.pexels.com/video-files/4761059/4761059-hd_1920_1080_30fps.mp4';

/**
 * What every visitor sees: spilotrosrealty.com's hero video over the whole
 * screen, "enter site", and nothing of spilo.xyz. Entering fades the
 * buttons and keeps the video running while the realty site loads. The
 * owner link lets the rest of the page mount and opens the sign in.
 */
export default function Gate({ still, onOwner }: { still: boolean; onOwner: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [leaving, setLeaving] = useState(false);

  function enter(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setLeaving(true);
    window.setTimeout(() => { window.location.href = REALTY; }, still ? 0 : 450);
  }

  return (
    <main className="gate fixed inset-0 z-10 overflow-hidden">
      {!still && (
        <video
          src={VIDEO}
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          className={`gate-video absolute inset-0 h-full w-full object-cover ${playing ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <div aria-hidden="true" className="gate-scrim absolute inset-0" />
      <div className={`relative grid h-full place-items-center px-5 transition-opacity duration-500 ${leaving ? 'opacity-0' : 'opacity-100'}`}>
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
