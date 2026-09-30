// Supabase Edge Function: cma-comps
//
// Finds comparable properties for an address through RentCast's value
// estimate endpoint, so the RentCast API key never reaches the browser.
// Only a signed-in spilo.xyz session can call it.
//
// Secrets (Supabase dashboard > Edge Functions > Secrets):
//   RENTCAST_API_KEY   your key from app.rentcast.io/app/api
// SUPABASE_URL is provided by Supabase automatically.
//
// Deploy with "Verify JWT" off: this function checks the caller's sign-in
// itself below, and the built-in check does not understand Supabase's newer
// publishable keys.

const ALLOWED_ORIGINS = ['https://spilo.xyz'];

function cors(origin: string) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, origin: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(origin), 'Content-Type': 'application/json' },
  });
}

function bounded(v: unknown, min: number, max: number, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin') ?? '';
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405, origin);

  // Only a signed-in user (public sign-up is off, so that means you).
  const auth = req.headers.get('authorization') ?? '';
  const who = await fetch(`${Deno.env.get('SUPABASE_URL')}/auth/v1/user`, {
    headers: { authorization: auth, apikey: req.headers.get('apikey') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? '' },
  });
  if (!auth || !who.ok) return json({ error: 'sign in first' }, 401, origin);

  const key = Deno.env.get('RENTCAST_API_KEY');
  if (!key) return json({ error: 'RENTCAST_API_KEY is not set on this function' }, 500, origin);

  const body = await req.json().catch(() => ({}));
  const address = String(body.address ?? '').trim().slice(0, 200);
  if (address.length < 6) return json({ error: 'enter a full street address' }, 400, origin);

  const q = new URLSearchParams({
    address,
    compCount: String(Math.round(bounded(body.compCount, 5, 25, 20))),
    maxRadius: String(bounded(body.maxRadius, 0.25, 5, 1)),
    daysOld: String(Math.round(bounded(body.daysOld, 30, 730, 270))),
  });
  for (const k of ['propertyType', 'bedrooms', 'bathrooms', 'squareFootage']) {
    if (body[k] !== undefined && body[k] !== '') q.set(k, String(body[k]));
  }

  const r = await fetch(`https://api.rentcast.io/v1/avm/value?${q}`, {
    headers: { 'X-Api-Key': key, Accept: 'application/json' },
  });
  const data = await r.json().catch(() => null);
  if (!r.ok) {
    const msg = (data && (data.message || data.error)) || `RentCast returned ${r.status}`;
    // 422, not 404, so the dashboard can tell "no such property" from
    // "this function has not been deployed yet".
    return json({ error: msg }, r.status === 404 ? 422 : 502, origin);
  }
  return json(data, 200, origin);
});
