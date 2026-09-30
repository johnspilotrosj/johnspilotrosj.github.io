import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const SB_URL = 'https://zwsjdcrjwqkzsxollwnc.supabase.co';
const SB_KEY = 'sb_publishable_FBnSV2WoIc_7MXSAXM0Xww_uEElzvkk';
/* Same store as the RE Dashboard, so one sign in covers both. */
const STORE = 'spilo_leads_session';
const TOOLS = [
  { label: 'RE Dashboard', href: '/dashboard/' },
  { label: 'Security', href: '/security/' },
];

type Session = { access_token: string; refresh_token?: string; expires_at?: number; expires_in?: number };

function save(s: Session) {
  if (!s.expires_at) s.expires_at = Math.floor(Date.now() / 1000) + (s.expires_in || 3600);
  try { localStorage.setItem(STORE, JSON.stringify(s)); } catch { /* private mode */ }
}
function load(): Session | null {
  try { return JSON.parse(localStorage.getItem(STORE) || 'null'); } catch { return null; }
}
function clear() { try { localStorage.removeItem(STORE); } catch { /* ignore */ } }

async function token(grant: 'password' | 'refresh_token', body: object): Promise<Session> {
  const r = await fetch(`${SB_URL}/auth/v1/token?grant_type=${grant}`, {
    method: 'POST',
    headers: { apikey: SB_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error_description || j.msg || j.error || 'sign in failed');
  save(j);
  return j;
}

/**
 * Hidden sign in. Type "admin" anywhere outside a text field (or tap the
 * headline five times) to bring it up; Esc puts it away. It sits on the top
 * layer, over the headline and the ventures.
 */
export default function AdminPanel({ open, onClose, still }: { open: boolean; onClose: () => void; still: boolean }) {
  const [signedIn, setSignedIn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const email = useRef<HTMLInputElement>(null);
  const firstTool = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const s = load();
    const now = Math.floor(Date.now() / 1000);
    if (!s) return;
    if (s.expires_at && s.expires_at - 60 > now) setSignedIn(true);
    else if (s.refresh_token) token('refresh_token', { refresh_token: s.refresh_token }).then(() => setSignedIn(true), () => clear());
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => (signedIn ? firstTool.current : email.current)?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [open, signedIn]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setErr('');
    try {
      await token('password', { email: String(f.get('email') || '').trim(), password: String(f.get('password') || '') });
      setSignedIn(true);
    } catch (x) {
      const msg = String(x instanceof Error ? x.message : x);
      setErr(/failed to fetch|networkerror|load failed/i.test(msg) ? 'cannot reach the database right now' : msg.toLowerCase());
    } finally {
      setBusy(false);
    }
  }

  function signOut() {
    const s = load();
    if (s?.access_token) {
      fetch(`${SB_URL}/auth/v1/logout`, { method: 'POST', headers: { apikey: SB_KEY, Authorization: `Bearer ${s.access_token}` } }).catch(() => {});
    }
    clear();
    setSignedIn(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="admin"
          id="admin-panel"
          aria-label="Sign in"
          initial={still ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={still ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-5 right-5 top-[4.25rem] z-[70] border border-rule border-t-rust bg-asphalt/95 p-5 shadow-[8px_8px_0_rgb(0_0_0/0.45)] backdrop-blur-sm sm:right-auto sm:w-[19rem] md:left-10"
        >
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
            <span><span className="text-rust-2">00</span> — Admin</span>
            <button type="button" onClick={onClose} className="text-dim hover:text-chalk" aria-label="Close">esc ×</button>
          </div>

          {signedIn ? (
            <nav aria-label="Tools" className="mt-4">
              <ul className="space-y-2">
                {TOOLS.map((t, i) => (
                  <li key={t.href}>
                    <a ref={i === 0 ? firstTool : undefined} href={t.href} className="group flex items-baseline justify-between font-display text-2xl tracking-[0.01em] text-chalk uppercase hover:text-rust-2">
                      {t.label}<span aria-hidden="true" className="font-mono text-sm text-dim transition-transform group-hover:translate-x-1 group-hover:text-rust-2">→</span>
                    </a>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={signOut} className="mt-5 font-mono text-[10px] tracking-[0.2em] text-dim uppercase hover:text-chalk">Sign out</button>
            </nav>
          ) : (
            <form onSubmit={submit} className="mt-4 space-y-3" autoComplete="on">
              <label className="block">
                <span className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">Email</span>
                <input ref={email} name="email" type="email" required autoComplete="username" className="mt-1 block w-full border-0 border-b border-rule bg-transparent py-1.5 font-mono text-base text-chalk outline-none focus:border-rust-2" />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">Password</span>
                <input name="password" type="password" required autoComplete="current-password" className="mt-1 block w-full border-0 border-b border-rule bg-transparent py-1.5 font-mono text-base text-chalk outline-none focus:border-rust-2" />
              </label>
              <button type="submit" disabled={busy} className="mt-2 w-full border border-chalk/70 py-2.5 font-mono text-[11px] tracking-[0.18em] text-chalk uppercase transition-colors hover:border-rust hover:bg-rust disabled:opacity-50">
                {busy ? 'Signing in…' : 'Sign in'}
              </button>
              <p role="alert" className="min-h-[1.2em] font-mono text-[11px] text-rust-2">{err}</p>
            </form>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
