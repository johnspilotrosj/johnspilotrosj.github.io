/* ============================================================
   Treasure Valley carousels — content (single source of truth)

   Every word that appears on a slide lives here. The viewer
   (index.html), the single-slide renderer (render.html), the JPG
   export and SPEC.md are all generated from this file.

   Markup inside strings:  *word* = italic serif,  \n = line break.
   `confirm` lists anything that must be re-checked before posting.
   `photo` is a path under carousels/photos/. If the file is missing,
   a placeholder scene is drawn instead (and tagged in proofs).
   Research date for every claim below: November 8, 2026.
   ============================================================ */

window.CAROUSEL_DATA = {
  handle: "@johnspilotros",
  handleConfirm: "Confirm the Instagram handle. It is set once, here, and used on every slide.",
  name: "John Spilotros",
  brokerage: "Keller Williams Realty Boise",
  researched: "November 8, 2026",

  carousels: [
    /* ======================================================
       1 — WEEKEND GUIDE
       ====================================================== */
    {
      id: "weekend",
      title: "A weekend guide to Boise",
      question: "What should I do on a weekend in Boise?",
      audience: "Visitors, newcomers, people relocating, locals who are out of ideas.",
      slides: [
        {
          type: "cover", variant: "weekend",
          photo: "photos/weekend-cover.jpg", scene: "dusk",
          sceneLabel: "Boise Greenbelt or 8th Street at dusk",
          kicker: "A weekend you can actually follow",
          titleHtml: "Weekend Guide<span class=\"big-italic\"><em>Boise</em></span>",
          sub: "Coffee, a Saturday market, a river loop, Basque dinner and a slow Sunday",
          photoDirection: "The Boise River Greenbelt at dusk: the path curving beside the river under cottonwoods, warm sky, no faces. Alternate: 8th Street downtown at blue hour with string lights and lit storefronts. Shoot vertical with the horizon low so the top 40% is calm sky or dark trees for the type. Warm grade, slightly lifted shadows.",
          layout: "Full-bleed photo with a soft dark overlay (about 35% at top to 70% at the bottom). Centered type block: small sans kicker, \"Weekend Guide\" in roman serif, then \"Boise\" in oversized italic serif on its own line. One short sans sub-line. Handle small, bottom-left."
        },
        {
          type: "stop",
          when: "Saturday · 8:00 AM", where: "Hyde Park · North End",
          headline: "Start at *Hyde Perk*",
          lead: "A neighborhood coffee house on 13th Street with high ceilings and an old-school feel. It's the North End's front porch.",
          detail: "1507 N 13th St. Parking on 13th fills fast, so park a block over and walk.",
          aside: "After: wander the shops along 13th Street.",
          photoDirection: "Interior slides are typographic on off-white, no photo.",
          layout: "Meta row (day and time left, neighborhood right) over a hairline rule. Big serif headline with the venue name in italic. Lead line in medium sans, then a ruled \"good to know\" detail. Thin swipe arrow bottom-right, handle bottom-left.",
          confirm: ["Hyde Perk's current Saturday opening time (none of the sources I found listed hours)."]
        },
        {
          type: "stop",
          when: "Saturday · 9:30 AM", where: "Downtown · The Grove Plaza",
          headline: "Walk the *Capital City* Public Market",
          headlineSize: "md",
          lead: "Growers, bakers and makers fill the Grove Plaza and the blocks around it every Saturday.",
          detail: "2026 season: Saturdays through Dec. 19, 9:30\u00a0a.m.–1:30\u00a0p.m. Late-season hours can shift, so check before you go.",
          aside: "Two blocks away: Freak Alley Gallery. It's free and open 24/7, in the alley between 8th and 9th off Bannock.",
          layout: "Same interior layout. The headline runs to three lines at medium size. The Freak Alley detour sits as a muted aside so the slide stays on one stop.",
          confirm: [
            "Market hours for November–December 2026. In 2025 the market moved to 10 a.m.–2 p.m. in late October. I found no 2026 notice either way.",
            "The Dec. 19, 2026 end date, which comes from CBS2 / Idaho News coverage of the season opening."
          ]
        },
        {
          type: "stop",
          when: "Saturday · 1:00 PM", where: "River Street · Boise Greenbelt",
          headline: "Take the river *the long way*",
          lead: "Loop Ann Morrison and Kathryn Albertson parks on the Greenbelt. It's flat, about 2.9 miles, with herons and quiet ponds.",
          detail: "Kathryn Albertson Park is walk-only: no bikes or e-scooters. Leashed dogs are welcome.",
          layout: "Same interior layout."
        },
        {
          type: "stop",
          when: "Saturday · 7:00 PM", where: "Downtown · Basque Block",
          headline: "Dinner at *Bar Gernika*",
          lead: "A Basque Block institution. Order the croquetas and the solomo: pork loin marinated in sweet red pepper.",
          detail: "202 S Capitol Blvd. Open until 10 p.m. Friday and Saturday. Closed Sunday and Monday.",
          layout: "Same interior layout.",
          confirm: ["Bar Gernika's current hours. The only listing I found (Casago) is undated: Tue–Thu 11:30–9, Fri–Sat 11:30–10, closed Sun–Mon."]
        },
        {
          type: "stop",
          when: "Sunday · 8:00 AM", where: "Downtown · Capitol Blvd",
          headline: "Get on the *Goldy's* list early",
          lead: "The downtown breakfast locals send visitors to, a block up Capitol from last night's dinner.",
          detail: "108 S Capitol Blvd. No reservations, so add your name to the waitlist. Weekends from 7:30 a.m.",
          layout: "Same interior layout.",
          confirm: ["Goldy's weekend opening time. Downtown Boise and Casago both list 7:30 a.m. on weekends, but their weekday hours disagree."]
        },
        {
          type: "stop",
          when: "Sunday · Afternoon", where: "East End · Boise Foothills",
          headline: "End the weekend *above* the city",
          lead: "Table Rock is Boise's classic view hike, with the whole valley spread out below the mesa.",
          detail: "Start behind the Old Idaho Penitentiary, 2421 Old Penitentiary Rd. Roughly 3.4 miles round trip with about 900 ft of climbing. The mesa closes at sunset.",
          layout: "Same interior layout.",
          confirm: ["Distance and climb differ by route and by source (3.1–4.1 mi, 750–1,000 ft). The slide uses Visit Boise's figure. The sunset closure is from the City of Boise Ridge to Rivers page."]
        },
        {
          type: "close",
          headline: "Save this for your next *Boise* weekend.",
          small: "In season: Winter Garden aGlow at the Idaho Botanical Garden, Nov. 27–Dec. 30.",
          layout: "Off-white, centered typography: a short rule, serif CTA, one muted sans line, then name, brokerage and handle at the bottom. No arrow.",
          confirm: ["Winter Garden aGlow 2026 dates. The garden's event page shows Nov. 27–Dec. 30, but it doesn't state the year. Drop the line if it isn't confirmed by posting day."]
        }
      ],
      caption: "A Boise weekend you can actually follow ☕️🌲\n\nSaturday: coffee in Hyde Park, the Capital City Public Market, a Greenbelt loop through Ann Morrison and Kathryn Albertson parks, then Basque dinner at Bar Gernika.\nSunday: Goldy's (get on the list early) and Table Rock before sunset.\n\nSave this for when friends visit, and tell me what you'd swap in. Hours shift with the seasons, so check before you go.\n\nJohn Spilotros · Keller Williams Realty Boise",
      hashtags: "#Boise #BoiseIdaho #ThingsToDoInBoise #BoiseWeekend #TreasureValley #BoiseGreenbelt #BasqueBlock #MovingToBoise #BoiseRealEstate"
    },

    /* ======================================================
       2 — FRIDAY NIGHT
       ====================================================== */
    {
      id: "friday",
      title: "The perfect Friday night in Boise",
      question: "Where should we eat on Friday night in Boise?",
      audience: "Couples, friend groups, anyone picking dinner downtown.",
      slides: [
        {
          type: "cover", variant: "friday",
          photo: "photos/friday-cover.jpg", scene: "lamps",
          sceneLabel: "Low-lit restaurant: warm lamps, dark wood",
          kicker: "Boise dinner guide",
          titleHtml: "The perfect <em>Friday night</em> in Boise",
          sub: "Five spots, five reasons to go out",
          photoDirection: "A low-lit downtown dining room or bar: warm pendant lamps, dark wood, a lit back bar, a candle and a glass of wine in the foreground, nobody identifiable. The cover currently uses an illustrated, out-of-focus version of this scene. To swap in a photo, shoot it at one of the five featured spots with their permission, and keep the center of the frame simple and dark so white type sits on it cleanly.",
          layout: "Full-bleed image with a soft dark overlay. White serif title centered in the middle of the frame, with \"Friday night\" in italic. Small tracked kicker above, short sans line below. Handle bottom-left, thin ivory swipe arrow bottom-right."
        },
        {
          type: "pick",
          when: "For date night", where: "Downtown · 8th & Idaho",
          headline: "*Alavita*",
          lead: "House-made pasta and local ingredients, in a room that's dressed up without being stiff.",
          order: "Whatever fresh pasta is on tonight.",
          detail: "Reservations suggested. Book on OpenTable.",
          find: "807 W Idaho St",
          layout: "Off-white. Meta row with the count and the neighborhood. The occasion in muted italic serif, then the venue name as an extra-large italic serif headline. One \"why\" sentence in medium sans, then three ruled rows: Order · Book it · Find it. Swipe arrow."
        },
        {
          type: "pick",
          when: "For a big occasion", where: "Downtown · Hotel 43",
          headline: "*Chandlers*",
          lead: "Prime steaks, fine seafood and live jazz every night of the week.",
          order: "A martini at the bar first, then a prime steak.",
          detail: "Reservations recommended: OpenTable or 208-383-4300.",
          find: "981 W Grove St, inside Hotel 43",
          layout: "Same as the Alavita slide."
        },
        {
          type: "pick",
          when: "For dinner with friends", where: "Linen District",
          headline: "*Txikiteo*",
          lead: "Basque small plates and a long Basque-and-French wine list. Made for sharing.",
          order: "Pintxos for the table, and keep them coming.",
          detail: "No reservations. Walk in and order at the counter, so go early with a group.",
          find: "14th & Idaho",
          layout: "Same as the Alavita slide.",
          confirm: [
            "Txikiteo's walk-in-only, counter-service policy (per OpenTable).",
            "Street number: listings give both 175 N 14th St and 1401 W Idaho St, so the slide says \"14th & Idaho\", which fits both."
          ]
        },
        {
          type: "pick",
          when: "Before a show", where: "Downtown · 8th & Idaho",
          headline: "*Fork*",
          lead: "Locally sourced Northwest cooking, two blocks from the Egyptian Theatre.",
          order: "Start with the asparagus fries.",
          detail: "Book an early table on OpenTable so you make the curtain.",
          find: "199 N 8th St",
          layout: "Same as the Alavita slide.",
          confirm: ["Asparagus fries are still on Fork's menu (a long-running local favorite; I couldn't open the current menu)."]
        },
        {
          type: "pick",
          when: "For the nightcap", where: "Downtown · 14th floor",
          headline: "*Ampersand*",
          lead: "A speakeasy hidden on the 14th floor. One last drink, made just for you.",
          order: "There's no menu. Tell the bartender what you like.",
          detail: "Book online for up to four, then check in at Art Haus downstairs.",
          find: "999 Main St",
          layout: "Same as the Alavita slide."
        },
        {
          type: "close",
          headline: "Send this to whoever's *picking dinner.*",
          small: "Menus, hours and reservation policies change. Confirm before you go.",
          ask: "Which spot did I miss? Tell me in the comments.",
          layout: "Off-white, centered typography. Serif CTA, one muted line, then a bolder line asking for a comment. Name, brokerage and handle at the bottom. No arrow."
        }
      ],
      caption: "Friday night in Boise, sorted. 🍝🎷\n\nSave this for the next \"where do you want to eat?\" standoff:\n\nDate night → Alavita\nBig occasion → Chandlers\nDinner with friends → Txikiteo\nBefore a show → Fork\nNightcap → Ampersand\n\nSend this to whoever's picking dinner. Which spot did I miss? Tell me in the comments.\n\nMenus, hours and reservation policies change, so confirm before you go.\n\nJohn Spilotros · Keller Williams Realty Boise",
      hashtags: "#BoiseEats #BoiseFood #DowntownBoise #BoiseDateNight #BoiseIdaho #BoiseRestaurants #ThingsToDoInBoise #TreasureValley"
    },

    /* ======================================================
       3 — WHAT $700K BUYS
       ====================================================== */
    {
      id: "700k",
      title: "What $700K buys around Boise",
      question: "How much house does $700K get you in Boise, Meridian or Eagle?",
      audience: "Move-up buyers, relocating buyers comparing cities.",
      slides: [
        {
          type: "money",
          photo: "photos/700k-cover.jpg", scene: "kitchen",
          sceneLabel: "Darkened kitchen or living room",
          hook: "Same budget.\nThree very different houses.",
          photoDirection: "A darkened kitchen at dusk, shot slightly out of focus: pendant lights glowing over an island, a window with the last blue light, mostly shadow. It should read as \"a nice house\", not a specific listing. The cover currently uses an illustrated version of this scene. To swap in a photo, use your own or a licensed one, never another brokerage's listing photo, and keep the middle third dark for the $700K.",
          layout: "Full-bleed image with a soft dark overlay. Compact uppercase sans stacked above (\"What\") and below (\"actually buys around Boise\") a huge ivory serif $700K that runs nearly edge to edge. A ruled line lists the three cities, then the hook in italic serif. Handle bottom-left, thin ivory swipe arrow bottom-right."
        },
        {
          type: "method",
          when: "The short answer", where: "Sept. 2026 sales",
          headline: "Here's the *math*",
          eq: "$700,000 ÷ price per sq ft = square feet",
          rows: [
            ["Boise", "$317", "~2,200 sq ft"],
            ["Meridian", "$280", "~2,500 sq ft"],
            ["Eagle", "$322–345", "~2,100 sq ft"]
          ],
          note: "Median sale price per sq ft, around Sept. 2026. Sources: Boise Regional REALTORS data via Build Idaho; Redfin. Neighborhood, age and lot size move these a lot.",
          layout: "Off-white. Gives the answer on the first swipe: serif headline, the one-line formula over a rule, then a three-row table of city, $/sq ft and what $700K buys in big serif numerals. Source note at the bottom in muted sans. Swipe arrow.",
          confirm: [
            "Boise $316.88/sq ft (Sept. 2026, Build Idaho citing Boise Regional REALTORS; a second report says about $320).",
            "Meridian about $280/sq ft (Redfin, three months ending Sept. 2026; other sources $273–$282).",
            "Eagle: $322 (Redfin) to $344.52 (Build Idaho, Sept. 2026), shown as a range.",
            "BRR's October 2026 report wasn't published when this was built. If it's out, update the three numbers and the date."
          ]
        },
        {
          type: "city",
          city: "Boise",
          headline: "Location over *square footage*",
          stats: [["~2,200", "Sq ft at\n$700K"], ["$317", "Median\nper sq ft"], ["1985", "Median\nyear built"]],
          exampleHtml: "<b>$700K vs. the median:</b> well above it. Boise's median sale price is in the low-to-mid $500Ks.",
          tradeoff: "You're paying for a short drive to downtown, the Greenbelt and the foothills. Expect an older home and less interior space than the same budget buys in Meridian.",
          layout: "Off-white. City name in bold tracked sans, then a serif trade-off headline. A three-cell stat bar in big serif numerals (sq ft at $700K, median $/sq ft, median year built). One line placing $700K against the city's median, then the trade-off in a tinted panel. Swipe arrow.",
          confirm: [
            "Boise median sale price: sources give $519K–$541K for Sept. 2026, so the slide says \"low-to-mid $500Ks\".",
            "Median year built 1985 (2023 ACS via City-Stats)."
          ]
        },
        {
          type: "city",
          city: "Meridian",
          headline: "More house, *newer* house",
          stats: [["~2,500", "Sq ft at\n$700K"], ["$280", "Median\nper sq ft"], ["2006", "Median\nyear built"]],
          exampleHtml: "<b>$700K vs. the median:</b> above it. Meridian's median sale price is in the mid $500Ks.",
          tradeoff: "Same budget, about 300 more square feet than Boise, and usually a newer subdivision with an HOA. The trade-off is a longer drive to downtown Boise.",
          layout: "Same as the Boise slide.",
          confirm: [
            "Meridian median sale price: sources give $525K–$572K, so the slide says \"mid $500Ks\".",
            "Median year built 2006 (2023 ACS via City-Stats; another site says 2007)."
          ]
        },
        {
          type: "city",
          city: "Eagle",
          headline: "The address, with a *tighter* fit",
          stats: [["~2,100", "Sq ft at\n$700K"], ["$322", "Per sq ft\n(up to $345)"], ["2007", "Median\nyear built"]],
          exampleHtml: "<b>$700K vs. the median:</b> below it. Eagle's median sale price is about $800K or more.",
          tradeoff: "Here $700K is an entry point, not a move-up budget. Expect a smaller home or lot, or a newer subdivision farther from downtown Eagle.",
          layout: "Same as the Boise slide.",
          confirm: [
            "Eagle median sale price: sources range from about $800K (Redfin) to $847K (Build Idaho, Sept. 2026) and higher.",
            "Median year built 2007 (2020–2024 ACS 5-year via Neilsberg)."
          ]
        },
        {
          type: "recap",
          when: "Side by side", where: "Same $700K",
          headline: "Three cities, *one* budget",
          cols: ["Boise", "Meridian", "Eagle"],
          rows: [
            ["Sq ft", ["~2,200", "~2,500", "~2,100"], true],
            ["Typical age", ["Built\n~1985", "Built\n~2006", "Built\n~2007"]],
            ["Vs. median", ["Above", "Above", "Below"]],
            ["You get", ["Location", "Space", "The address"]],
            ["You give up", ["Square footage", "Commute time", "Size or lot"]]
          ],
          ask: "Which one would you pick?",
          layout: "Off-white. Serif headline, then a four-column table: row labels in small tracked sans, city columns with the square footage in big serif numerals. The question sits under the table in italic serif to prompt comments.",
          confirm: ["The recap repeats the figures from slides 2–5. Update it whenever those change."]
        },
        {
          type: "close",
          headline: "DM me *\u201C700K\u201D* for current options.",
          small: "I'll send what's actually for sale in Boise, Meridian and Eagle this week, with the trade-offs.",
          ask: "Or comment the city you'd pick.",
          layout: "Off-white, centered typography. The CTA keyword is in italic serif with curly quotes. A second, smaller line asks for a comment. Name, brokerage and handle at the bottom."
        }
      ],
      caption: "Same $700K. Three very different houses. 🏡\n\nHere's what that budget buys around Boise right now:\n\n📍 Boise: about 2,200 sq ft. You're paying for location.\n📍 Meridian: about 2,500 sq ft, usually newer. You give up commute time.\n📍 Eagle: about 2,100 sq ft. $700K is under the typical sale price there.\n\nWhich would you pick? Tell me in the comments.\n\nDM me \"700K\" and I'll send what's actually for sale in all three this week.\n\nNumbers are median sale prices per square foot, around September 2026 (Boise Regional REALTORS data via Build Idaho; Redfin). Every street is different.\n\nJohn Spilotros · Keller Williams Realty Boise",
      hashtags: "#BoiseRealEstate #MovingToBoise #BoiseIdaho #MeridianIdaho #EagleIdaho #TreasureValley #BoiseHomes #IdahoRealEstate"
    },

    /* ======================================================
       4 — SELLER PREP
       ====================================================== */
    {
      id: "seller",
      title: "What I'd fix before listing a Boise home",
      question: "What should I fix before I sell my house in Boise?",
      audience: "Homeowners planning to list in the next 3–12 months.",
      slides: [
        {
          type: "cover", variant: "seller",
          photo: "photos/seller-cover.jpg", scene: "neutral",
          sceneLabel: "Slightly overhead living room, muted neutrals",
          kicker: "Five decisions, in the order I'd make them",
          titleHtml: "What I'd <em>fix</em> before listing a Boise home",
          sub: "And what you can usually leave alone",
          photoDirection: "A living room shot from slightly above, around 6–7 ft (a stepladder or a high handheld): sofa, rug and coffee table in muted neutrals (oatmeal, warm grey, linen, light oak), soft daylight, nothing personal in frame. It should feel calm and \"ready to list\". Use your own photo or a licensed one.",
          layout: "Full-bleed photo with a soft overlay. White serif title in the center, with \"fix\" in italic. Kicker above, short sans line below."
        },
        {
          type: "decision", num: "01", badge: "Fix first", badgeStyle: "fill",
          headline: "Visible *maintenance*",
          notice: "Drips, stains, sticky doors, cracked caulk, a dead outlet. Small things make buyers wonder what they can't see.",
          fix: "Walk the house with a notepad and clear the punch list: leaks, caulk, burned-out bulbs, loose handles. Service the furnace.",
          leave: "Older systems that still work. Disclose their age and price for it instead of replacing them.",
          layout: "Off-white. Italic serif number top-right, serif headline, then a \"Fix first / If needed\" badge. Three ruled rows: Buyers notice · The fix · Leave it when."
        },
        {
          type: "decision", num: "02", badge: "Fix first", badgeStyle: "fill",
          headline: "How rooms *read* in photos",
          notice: "Most buyers meet your home online first. Each room needs to say what it's for at a glance.",
          fix: "Clear the counters, take out about a third of the furniture, give each room one job, make beds with light bedding, and keep pets and family photos out of frame.",
          leave: "Full staging in a home that's already well furnished. Edit what you have first.",
          layout: "Same decision layout."
        },
        {
          type: "decision", num: "03", badge: "Fix first", badgeStyle: "fill",
          headline: "Lighting",
          notice: "Dim rooms feel smaller in person and in photos, and mismatched bulbs make rooms look patchy.",
          fix: "Put the same warm-white bulb (2700–3000K) everywhere, replace every dead bulb, open the blinds, and swap the one fixture that dates the room.",
          leave: "Plain fixtures that work. Clean them and move on.",
          layout: "Same decision layout."
        },
        {
          type: "decision", num: "04", badge: "If needed", badgeStyle: "line",
          headline: "Paint *touch-ups*",
          notice: "Scuffed trim, patched holes that show, one very loud accent wall.",
          fix: "Patch and touch up trim and doors. Repaint only the rooms that are scuffed or bold, in a warm neutral.",
          leave: "Walls that are already neutral and clean. A whole-house repaint isn't required.",
          layout: "Same decision layout with the outlined \"If needed\" badge."
        },
        {
          type: "decision", num: "05", badge: "If needed", badgeStyle: "line",
          headline: "Curb *appeal*",
          notice: "Buyers judge the house from the car, and the first listing photo is usually the front.",
          fix: "Mow and edge, fresh bark in the beds, a clean front door and hardware, a new mat, and house numbers you can read.",
          leave: "Big landscaping projects, especially in winter. Neat and tidy beats new plantings that won't show yet.",
          layout: "Same decision layout."
        },
        {
          type: "list",
          when: "Usually skip", where: "Before listing",
          headline: "Spend *less* here",
          items: [
            ["Full kitchen or bath remodels", "Buyers want to choose their own finishes."],
            ["New flooring throughout", "Unless it's damaged. Clean or repair what you have."],
            ["Replacing working systems", "Disclose their age and price for it."],
            ["Major landscaping", "Tidy beats new."],
            ["Trendy finishes", "What you like may not match what the next buyer wants."]
          ],
          layout: "Off-white. Serif headline with an italic \"less\", then a ruled list. Each item has a bold sans line and a muted reason after it, with an italic serif × as the marker.",
          confirm: []
        },
        {
          type: "checklist",
          headline: "Your listing *checklist*",
          items: [
            ["Maintenance", "Fix leaks, drips and dead outlets"],
            ["Maintenance", "Re-caulk tubs, sinks and showers"],
            ["Maintenance", "Service the furnace and AC"],
            ["Photos", "Clear counters, edit furniture by a third"],
            ["Photos", "Make beds, hide cords, pets out of frame"],
            ["Lighting", "Match every bulb (2700–3000K)"],
            ["Paint", "Patch holes, touch up trim and doors"],
            ["Curb", "Mow, edge, bark, clean the front door"],
            ["Paperwork", "Gather receipts, warranties, HOA docs"]
          ],
          footer: "Save this. Then DM me “LIST” for a walkthrough.",
          layout: "Off-white, built to be screenshotted. Serif headline, then nine rows, each with an empty checkbox, a small category tag and the task. A short CTA and the handle at the bottom. This is the last slide, so there's no arrow."
        }
      ],
      caption: "What I'd fix before listing a Boise home, in order 🛠️\n\n1 · Visible maintenance: fix first\n2 · How rooms read in photos: fix first\n3 · Lighting: fix first\n4 · Paint touch-ups: if needed\n5 · Curb appeal: if needed\n\nWhat I'd usually skip: full remodels, new flooring throughout, and replacing systems that still work.\n\nThe last slide is a checklist, so save it. Planning to list this year? DM me \"LIST\" and I'll walk through your home with you.\n\nJohn Spilotros · Keller Williams Realty Boise",
      hashtags: "#SellingYourHome #BoiseRealEstate #HomeSellerTips #ListingPrep #BoiseHomes #TreasureValley #MeridianIdaho #EagleIdaho"
    },

    /* ======================================================
       5 — AFTER YOUR OFFER IS ACCEPTED
       ====================================================== */
    {
      id: "offer",
      title: "What happens after your offer is accepted",
      question: "What happens after my offer is accepted in Idaho?",
      audience: "First-time buyers under contract or about to be.",
      slides: [
        {
          type: "cover", variant: "offer",
          photo: "photos/offer-cover.jpg", scene: "sofa",
          sceneLabel: "Candid buyer reviewing paperwork on a sofa",
          callout: "A first-time buyer's timeline",
          titleHtml: "What happens <em>after</em> your offer is accepted",
          sub: "From earnest money to keys, in plain English",
          photoDirection: "Candid and unposed: a buyer on a sofa or at a kitchen table with paperwork or a laptop, in natural window light and warm neutrals. Faces can be turned away or cropped. Hands, papers and a coffee mug work well. Use a client only with a signed release, or a licensed photo. Leave the top half soft for the title.",
          layout: "Full-bleed photo with a soft overlay. A small muted-burgundy callout chip sits above the ivory serif title, with \"after\" in italic. Short sans line below."
        },
        {
          type: "step", stepno: "Step 01", timing: "Starts at acceptance",
          headline: "Earnest money, and the *clock* starts",
          happens: "Your earnest money goes to the brokerage or title company named in your contract. Every deadline counts from the day both sides sign.",
          watch: "In Idaho's standard contract, the deposit is due within 5 business days if that blank is left empty. Put every deadline on your calendar today.",
          layout: "Off-white. Burgundy step number, serif headline, then two ruled blocks: What happens · Watch for. A burgundy outlined timing chip. Swipe arrow.",
          confirm: ["The 5-business-day default for earnest money comes from search excerpts of the RE-21 (March 2026 edition), not the full form. Check it against the current RE-21 before posting."]
        },
        {
          type: "step", stepno: "Step 02", timing: "Inspection period",
          headline: "Inspect, then *decide*",
          happens: "You hire the inspectors: a general home inspection, plus sewer scope, radon or others if the house calls for them.",
          watch: "If something big turns up, you can ask for repairs or a credit, or walk away before your deadline. The seller then gets a few business days to respond.",
          layout: "Same step layout.",
          confirm: ["RE-21 default response window for the seller: 3 business days if left blank (from 2026 edition excerpts). The slide stays general on purpose, saying \"a few business days\"."]
        },
        {
          type: "step", stepno: "Step 03", timing: "If you're financing",
          headline: "Does the price *hold up*?",
          happens: "Your lender orders an appraisal to confirm the home is worth what you agreed to pay.",
          watch: "If it comes in low, you can renegotiate, cover the gap in cash, or use an appraisal contingency if your contract has one. Paying cash? This step may be optional.",
          layout: "Same step layout."
        },
        {
          type: "step", stepno: "Step 04", timing: "Through closing",
          headline: "Underwriting, *quietly*",
          happens: "Your lender verifies your income, assets and the property, then gives final loan approval.",
          watch: "Don't open new credit, change jobs or move large sums without asking your lender first. Your Closing Disclosure arrives at least 3 business days before closing, so compare it to your Loan Estimate.",
          layout: "Same step layout."
        },
        {
          type: "step", stepno: "Step 05", timing: "Just before closing",
          headline: "One last *look*",
          happens: "You walk through the home to confirm it's in the agreed condition and any promised repairs are done.",
          watch: "Run the faucets, appliances, heat and AC, and check that anything included in the sale is still there. Your contract sets when the walkthrough happens.",
          layout: "Same step layout."
        },
        {
          type: "step", stepno: "Step 06", timing: "Closing day",
          headline: "Sign, fund, *record*, keys",
          happens: "In Idaho you'll usually sign at a title company. Once your funds and loan arrive, the deed is recorded with the county.",
          watch: "Before you wire money, call the title company at a number you already trust to confirm the instructions. Keys and possession follow the date and time in your contract.",
          layout: "Same step layout."
        },
        {
          type: "close",
          headline: "Save this for when your offer gets *accepted.*",
          callout: "Every timeline depends on your contract",
          layout: "Off-white, centered typography. Serif CTA with the burgundy callout chip under it. Name, brokerage and handle at the bottom."
        }
      ],
      caption: "Your offer was accepted 🎉 So what happens now?\n\n1 · Earnest money is due and the deadline clock starts\n2 · Inspections, then repairs, a credit, or walking away\n3 · Appraisal, if you're financing\n4 · Underwriting (don't open new credit!)\n5 · Final walkthrough\n6 · Closing at the title company, then the keys\n\nEvery deadline comes from your contract, so read it with your agent. Save this for when it's your turn.\n\nNot legal or lending advice. Your contract and lender set the details.\nJohn Spilotros · Keller Williams Realty Boise",
      hashtags: "#FirstTimeHomeBuyer #BoiseRealEstate #IdahoHomes #HomeBuyingTips #UnderContract #TreasureValley #MeridianIdaho #NampaIdaho"
    }
  ],

  /* ======================================================
     CONCEPT DECK — the five ideas, presented together
     ====================================================== */
  deck: {
    id: "deck",
    title: "Concept deck",
    slides: [
      {
        type: "deckCover",
        photo: "photos/deck-cover.jpg", scene: "arches",
        sceneLabel: "Moody interior: arched windows, long curtains",
        kicker: "John Spilotros · Instagram series",
        titleHtml: "Five posts worth <em>saving</em>",
        sub: "Boise · Meridian · Eagle · Nampa",
        previews: ["weekend", "700k"],
        photoDirection: "A moody interior with tall arched windows, long linen curtains and late-day light throwing long shadows across a wood floor. Deep shadows, warm highlights.",
        layout: "Full-bleed photo with a soft dark overlay. Oversized ivory serif title centered, with two small tilted post previews (the Weekend and $700K covers) tucked behind it, top-left and bottom-right."
      },
      { type: "deckIdea", no: "01 / 05", ref: "weekend", headline: "How do I spend a weekend in *Boise*?",
        explain: "An itinerary someone can follow, from Saturday coffee to a Sunday view. Every stop gets a neighborhood, a reason to go and one practical detail.",
        facts: "8 slides · Save + share\nFor visitors, newcomers, locals",
        layout: "Off-white. Large headline across the top, the portrait mock cover on the left, a short explanation on the right, and a long arrow along the bottom." },
      { type: "deckIdea", no: "02 / 05", ref: "friday", headline: "Where should we go on *Friday night*?",
        explain: "Five dinner spots, one reason each: date night, a big occasion, friends, before a show and the nightcap. Each comes with a reservation or menu detail.",
        facts: "7 slides · Send to a friend\nFor couples and groups", layout: "Same." },
      { type: "deckIdea", no: "03 / 05", ref: "700k", headline: "What does *$700K* buy around here?",
        explain: "Boise, Meridian and Eagle at the same budget: square footage, price per square foot, home age and the main trade-off in each, then a side-by-side recap.",
        facts: "7 slides · DM “700K”\nFor move-up and relocating buyers", layout: "Same." },
      { type: "deckIdea", no: "04 / 05", ref: "seller", headline: "What should I fix *before* I list?",
        explain: "Five seller decisions in priority order, each with what buyers notice, a practical fix, and when to leave it alone. Ends with a checklist.",
        facts: "8 slides · Save the checklist\nFor homeowners listing this year", layout: "Same." },
      { type: "deckIdea", no: "05 / 05", ref: "offer", headline: "What happens *after* my offer is accepted?",
        explain: "A plain-English timeline from earnest money to keys, with what to watch for at each step and notes on where the contract sets the timing.",
        facts: "8 slides · Save for later\nFor first-time buyers", layout: "Same." },
      { type: "close", headline: "One question per post. *Saved*, not scrolled.",
        small: "Five standalone carousels for buyers, sellers and neighbors across the Treasure Valley.",
        layout: "Off-white, centered typography with a short CTA." }
    ]
  },

  sources: [
    ["Capital City Public Market 2026 season (Apr. 11–Dec. 19, Sat 9:30–1:30, Grove Plaza)", "https://www.idahonews.com/news/idaho-photo-galleries/capital-city-public-market-opens-2026-season"],
    ["Freak Alley Gallery: free, open 24/7, between 8th & 9th, Bannock–Idaho", "https://downtownboise.org/go/freak-alley-gallery"],
    ["Kathryn Albertson Park rules (no bikes or e-scooters; leashed dogs allowed)", "https://www.cityofboise.org/departments/parks-and-recreation/parks/kathryn-albertson-park/"],
    ["Ann Morrison + Kathryn Albertson loop, about 2.9 mi", "https://blog.komoot.fr/smarttour/e1325189855/boise-river-greenbelt-ann-morrison-kathryn-albertson-loop"],
    ["Hyde Perk Coffee House, 1507 N 13th St", "https://www.mapquest.com/us/idaho/hyde-perk-coffee-house-367174560"],
    ["Bar Gernika, 202 S Capitol Blvd, hours", "https://casago.com/boise-treasure-valley/restaurants/bar-gernika/"],
    ["Bar Gernika menu (croquetas, solomo)", "https://visitboise.com/boise-basque-restaurants/"],
    ["Goldy's Breakfast Bistro, 108 S Capitol Blvd, waitlist, hours", "https://downtownboise.org/go/goldys"],
    ["Table Rock: distance and gain", "https://visitboise.com/play/outdoor/hiking/"],
    ["Table Rock mesa closes at sunset", "https://ridgetorivers.cityofboise.org/trails/trail-areas/table-rock-area/"],
    ["Winter Garden aGlow", "https://www.idahobotanicalgarden.org/event/winter-garden-aglow/"],
    ["Alavita: OpenTable, hours, 807 W Idaho St", "https://www.opentable.com/r/alavita-boise"],
    ["Chandlers: live jazz nightly, Hotel 43", "https://www.hotel43.com/dining"],
    ["Chandlers: reservations recommended, 208-383-4300", "https://forbestravelguide.com/restaurants/boise-idaho/chandlers-prime-steaks-fine-seafood"],
    ["Txikiteo: walk-in, counter service", "https://visitboise.com/business/txikiteo/"],
    ["Fork, 199 N 8th St, OpenTable", "https://www.opentable.com/r/fork-reservations-boise"],
    ["Egyptian Theatre, 700 W Main St", "https://downtownboise.org/go/egyptian-theatre"],
    ["Ampersand: 14th floor, 999 Main St, check in at Art Haus, book for up to 4", "https://kinboise.squarespace.com/ampersand-speakeasy"],
    ["Boise Sept. 2026: median $519K, $316.88/sq ft", "https://www.buildidaho.com/idaho-real-estate-reports/"],
    ["Meridian: Redfin median sale price and $/sq ft", "https://www.redfin.com/city/13444/ID/Meridian/housing-market"],
    ["Eagle: Redfin median sale price and $/sq ft", "https://www.redfin.com/city/6040/ID/Eagle/housing-market"],
    ["Ada County Aug. 2026 (BRR official)", "https://www.boirealtors.com/wp-content/uploads/2026/09/Market-Report-August-2026-Ada-County.pdf"],
    ["Boise median year built (2023 ACS)", "https://city-stats.com/idaho/boise-city/housing"],
    ["Eagle median year built (2020–24 ACS)", "https://www.neilsberg.com/insights/topic/eagle-id/"],
    ["Meridian median year built (2023 ACS)", "https://city-stats.com/idaho/meridian/housing"],
        ["RE-21 March 2026 edition (earnest money, inspection defaults)", "https://adc-tenbox-prod.imgix.net/resi/propertyDocuments/1439359/PURCHASE_AGREEMENT/8A93ECF3CB3A484D9EE2FA184CB1ACA0.v1.pdf"],
    ["Idaho REALTORS legal hotline: earnest money", "https://idahorealtors.com/ir-legal-hotline/earnest-money/"],
    ["Idaho Code 54-2053: advertising must show the broker's licensed business name", "https://legislature.idaho.gov/statutesrules/idstat/Title54/T54CH20/SECT54-2053"],
    ["NAR Code of Ethics, Article 12: advertising other brokers' listings", "https://www.nar.realtor/about-nar/governing-documents/code-of-ethics/code-comprehension-article-12-display-of-competitors-listings-on-social-media-websites"]
  ]
};
