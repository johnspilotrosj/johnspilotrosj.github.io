import { useEffect, useRef, useState, type MouseEvent } from 'react';

const REALTY = 'https://spilotrosrealty.com/';
/* The first clip spilotrosrealty.com's hero plays, so the hand-off is the same picture. */
const VIDEO = 'https://videos.pexels.com/video-files/4761059/4761059-hd_1920_1080_30fps.mp4';
/* The realty hero plays its clips slowed down; match it so both pages move alike. */
const RATE = 0.55;

/**
 * What every visitor sees: spilotrosrealty.com's hero video over the whole
 * screen, "enter site", and nothing of spilo.xyz. The owner link opens the
 * password sign in; nothing else of the site renders until it succeeds.
 *
 * Behind the gate, spilotrosrealty.com itself loads in a hidden frame, so
 * by the time anyone clicks it is already rendered with its hero playing.
 * Entering fades the buttons and crossfades into that live page, and only
 * then does the browser leave for the real address. If the frame has not
 * loaded yet, entering falls back to dipping into the realty hero's
 * charcoal first frame instead.
 */
const BUTTONS_OUT = 350;
const VIDEO_OUT = 800;
const CROSSFADE = 700;
/* Give the gate's own video a head start before the frame competes for bandwidth. */
const PRELOAD_AFTER = 1500;
export default function Gate({ still, hideButtons = false, onOwner }: { still: boolean; hideButtons?: boolean; onOwner: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [leaving, setLeaving] = useState<false | 'dip' | 'crossfade'>(false);
  const [preload, setPreload] = useState(false);
  const [ready, setReady] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  /* Start the hidden frame once the gate's video plays, or after a short wait.
     Skipped on data saver and with reduced motion, where entering is a plain jump. */
  useEffect(() => {
    if (still || preload) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    if (playing) { setPreload(true); return; }
    const t = window.setTimeout(() => setPreload(true), PRELOAD_AFTER);
    return () => window.clearTimeout(t);
  }, [still, playing, preload]);

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

  function slow() {
    if (video.current) video.current.playbackRate = RATE;
  }

  function enter(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (leaving) return;
    if (still) { window.location.href = REALTY; return; }
    const mode = ready ? 'crossfade' : 'dip';
    setLeaving(mode);
    window.setTimeout(() => { window.location.href = REALTY; }, mode === 'crossfade' ? CROSSFADE + 50 : VIDEO_OUT);
  }

  return (
    <main className={`gate fixed inset-0 z-10 overflow-hidden ${leaving === 'dip' ? 'is-leaving' : ''}`}>
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
          onLoadedMetadata={slow}
          onPlaying={() => { slow(); setPlaying(true); }}
          className={`gate-video absolute inset-0 h-full w-full object-cover ${playing ? 'is-on' : ''}`}
        />
      )}
      <div aria-hidden="true" className="gate-scrim absolute inset-0" />
      {preload && (
        <iframe
          src={REALTY}
          title="spilotrosrealty.com"
          aria-hidden="true"
          tabIndex={-1}
          inert
          onLoad={() => setReady(true)}
          style={{ transitionDuration: `${CROSSFADE}ms` }}
          className={`gate-frame absolute inset-0 h-full w-full border-0 ${leaving === 'crossfade' ? 'is-on' : ''}`}
        />
      )}
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
