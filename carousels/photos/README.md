# Cover photos

Drop real photos here with these exact names, then re-export:

| File | Carousel | Shot |
|---|---|---|
| `weekend-cover.jpg` | Weekend guide | Boise Greenbelt or 8th Street at dusk |
| `friday-cover.jpg` | Friday night | Low-lit restaurant: warm lamps, dark wood |
| `700k-cover.jpg` | What $700K buys | Darkened kitchen or living room |
| `seller-cover.jpg` | Before listing | Living room from slightly above, muted neutrals |
| `offer-cover.jpg` | After the offer | Candid buyer with paperwork on a sofa |
| `deck-cover.jpg` | Concept deck | Arched windows, long curtains, late-day shadows |

Portrait (3:4) or larger, at least 1080 × 1440. Use photos you took or licensed. Never use another
brokerage's listing photos, and get a signed release for any client who appears.

    node _src/carousels/export.mjs          # clean JPGs into carousels/export/
    node _src/carousels/export.mjs --proof  # same, with placeholder tags
    node _src/carousels/spec.mjs            # regenerate SPEC.md
