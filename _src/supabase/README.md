# cma-comps (Supabase Edge Function)

Powers "Find comps" in the RE Dashboard's CMA tab.

1. Get a RentCast API key: https://app.rentcast.io/app/api
2. Supabase dashboard > Edge Functions > Secrets: add `RENTCAST_API_KEY`.
3. Supabase dashboard > Edge Functions > Deploy a new function > Via editor.
   Name it `cma-comps`, paste `functions/cma-comps/index.ts`, deploy.
4. In the function's Details, turn "Verify JWT" off. The function checks your
   sign-in itself; the built-in check rejects Supabase's newer publishable keys.

RentCast's free plan includes 50 lookups a month; each "Find comps" is one.

Idaho does not disclose sale prices publicly, so comps outside the MLS carry
list prices. Confirm sold prices in Paragon before quoting a number.
