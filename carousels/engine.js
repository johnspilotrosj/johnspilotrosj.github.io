/* ============================================================
   Treasure Valley carousels — slide renderer
   renderSlide(deckOrCarousel, slide, index, opts) -> HTMLElement
   (a 1080 x 1440 .slide). Used by index.html and render.html.
   ============================================================ */
(function () {
  const D = window.CAROUSEL_DATA;

  const esc = (s) => String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // *italic*  and  \n line breaks
  const md = (s) => esc(s || "")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");

  const arrow = (w = 520) => `
    <svg viewBox="0 0 ${w} 30" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="15" x2="${w - 2}" y2="15" stroke="currentColor" stroke-width="2"/>
      <polyline points="${w - 26},3 ${w - 2},15 ${w - 26},27" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`;

  /* ---------- placeholder scenes (used until a real photo is dropped in) ---------- */
  const SCENES = {
    dusk: `
      <div style="position:absolute;inset:0;background:
        linear-gradient(180deg,#1b2638 0%,#33405a 26%,#7b6a72 46%,#c98a5e 58%,#5a4234 66%,#1c1714 80%,#0f0d0b 100%)"></div>
      <div style="position:absolute;left:-10%;right:-10%;top:52%;height:16%;background:radial-gradient(50% 60% at 40% 50%,rgba(255,190,120,.75),transparent 70%);filter:blur(10px)"></div>
      <div style="position:absolute;left:0;right:0;top:64%;height:3px;background:linear-gradient(90deg,transparent,rgba(255,210,160,.7) 30%,rgba(255,210,160,.25) 70%,transparent);filter:blur(1px)"></div>
      <div style="position:absolute;left:0;right:0;top:67%;height:2px;background:linear-gradient(90deg,transparent 10%,rgba(255,200,150,.4) 45%,transparent 80%)"></div>
      <div style="position:absolute;inset:0;background:
        radial-gradient(30% 22% at 6% 50%,#16120f 60%,transparent 62%),
        radial-gradient(26% 20% at 18% 56%,#1a1511 60%,transparent 62%),
        radial-gradient(28% 26% at 92% 48%,#15110e 60%,transparent 62%),
        radial-gradient(22% 18% at 80% 56%,#1b1612 60%,transparent 62%);filter:blur(6px)"></div>
      <div style="position:absolute;left:0;right:0;bottom:0;height:30%;background:linear-gradient(180deg,transparent,#0e0c0a 70%)"></div>`,
    lamps: `
      <svg viewBox="0 0 1080 1440" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">
        <defs>
          <linearGradient id="rWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2c1a"/><stop offset=".45" stop-color="#2c1a10"/><stop offset="1" stop-color="#140c07"/></linearGradient>
          <radialGradient id="rLamp"><stop offset="0" stop-color="#fff1cf"/><stop offset=".4" stop-color="#ffc878"/><stop offset="1" stop-color="#ff9a45" stop-opacity="0"/></radialGradient>
          <radialGradient id="rHalo"><stop offset="0" stop-color="#ffab58" stop-opacity=".7"/><stop offset="1" stop-color="#ffab58" stop-opacity="0"/></radialGradient>
          <linearGradient id="rShelf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb866" stop-opacity=".55"/><stop offset="1" stop-color="#b8662a" stop-opacity=".2"/></linearGradient>
          <linearGradient id="rTable" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b4226"/><stop offset=".2" stop-color="#3a2416"/><stop offset="1" stop-color="#120b07"/></linearGradient>
          <filter id="rBlur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="14"/></filter>
          <filter id="rSoft"><feGaussianBlur stdDeviation="4"/></filter>
        </defs>
        <g filter="url(#rBlur)">
          <rect x="-60" y="-60" width="1200" height="1560" fill="url(#rWall)"/>
          <!-- wood panelling -->
          <g fill="#000" opacity=".22"><rect x="150" y="-20" width="10" height="1200"/><rect x="420" y="-20" width="10" height="1200"/><rect x="690" y="-20" width="10" height="1200"/><rect x="950" y="-20" width="10" height="1200"/></g>
          <!-- back bar: lit shelves and bottles -->
          <rect x="-40" y="330" width="1160" height="150" fill="url(#rShelf)"/>
          <rect x="-40" y="476" width="1160" height="14" fill="#1a0f08"/>
          <g fill="#1d120a"><rect x="60" y="372" width="34" height="106" rx="8"/><rect x="118" y="352" width="30" height="126" rx="8"/><rect x="176" y="384" width="38" height="94" rx="8"/><rect x="300" y="360" width="32" height="118" rx="8"/><rect x="356" y="380" width="36" height="98" rx="8"/><rect x="520" y="356" width="30" height="122" rx="8"/><rect x="574" y="378" width="38" height="100" rx="8"/><rect x="640" y="366" width="30" height="112" rx="8"/><rect x="790" y="350" width="34" height="128" rx="8"/><rect x="850" y="382" width="36" height="96" rx="8"/><rect x="960" y="362" width="32" height="116" rx="8"/></g>
          <g fill="#ffcf8a" opacity=".5"><rect x="238" y="384" width="26" height="94" rx="7"/><rect x="446" y="372" width="28" height="106" rx="7"/><rect x="716" y="388" width="26" height="90" rx="7"/><rect x="906" y="376" width="24" height="102" rx="7"/></g>
          <!-- pendant lamps -->
          <g stroke="#0e0805" stroke-width="5"><line x1="170" y1="-20" x2="170" y2="150"/><line x1="440" y1="-20" x2="440" y2="96"/><line x1="700" y1="-20" x2="700" y2="160"/><line x1="940" y1="-20" x2="940" y2="84"/></g>
          <circle cx="170" cy="214" r="220" fill="url(#rHalo)"/><circle cx="440" cy="158" r="240" fill="url(#rHalo)"/><circle cx="700" cy="224" r="220" fill="url(#rHalo)"/><circle cx="940" cy="146" r="230" fill="url(#rHalo)"/>
          <g fill="#150c07"><path d="M112 150h116l34 62H78z"/><path d="M382 96h116l34 62H348z"/><path d="M642 160h116l34 62H608z"/><path d="M882 84h116l34 62H848z"/></g>
          <ellipse cx="170" cy="226" rx="100" ry="40" fill="url(#rLamp)"/><ellipse cx="440" cy="172" rx="100" ry="40" fill="url(#rLamp)"/><ellipse cx="700" cy="236" rx="100" ry="40" fill="url(#rLamp)"/><ellipse cx="940" cy="160" rx="100" ry="40" fill="url(#rLamp)"/><g fill="#fff6e0"><ellipse cx="170" cy="222" rx="50" ry="14"/><ellipse cx="440" cy="168" rx="50" ry="14"/><ellipse cx="700" cy="232" rx="50" ry="14"/><ellipse cx="940" cy="156" rx="50" ry="14"/></g>
          <!-- table in the foreground -->
          <rect x="-60" y="1236" width="1200" height="300" fill="url(#rTable)"/>
          <ellipse cx="300" cy="1250" rx="230" ry="16" fill="#ffc27a" opacity=".5"/><ellipse cx="800" cy="1254" rx="210" ry="14" fill="#ffc27a" opacity=".4"/>
          <!-- candles -->
          <rect x="268" y="1170" width="64" height="74" rx="12" fill="#ffb25a" opacity=".85"/><circle cx="300" cy="1180" r="120" fill="url(#rHalo)"/><ellipse cx="300" cy="1162" rx="18" ry="34" fill="#fff6e0"/>
          <rect x="790" y="1182" width="56" height="66" rx="12" fill="#ffb25a" opacity=".75"/><circle cx="818" cy="1190" r="104" fill="url(#rHalo)"/><ellipse cx="818" cy="1174" rx="16" ry="30" fill="#fff6e0"/>
          <!-- wine glasses -->
          <g fill="none" stroke="#f1d5ac" stroke-width="5" opacity=".55"><path d="M508 1046c0 74 26 108 62 108s62-34 62-108z"/><line x1="570" y1="1154" x2="570" y2="1234"/><line x1="530" y1="1238" x2="610" y2="1238"/><path d="M936 1066c0 66 22 96 54 96s54-30 54-96z"/><line x1="990" y1="1162" x2="990" y2="1236"/></g>
          <path d="M514 1090c8 44 28 62 56 62s48-18 56-62z" fill="#6a1a24" opacity=".7"/>
        </g>
        <g filter="url(#rSoft)" fill="#ffc27a">
          <circle cx="92" cy="700" r="46" opacity=".1"/><circle cx="1000" cy="640" r="58" opacity=".09"/><circle cx="210" cy="960" r="36" opacity=".1"/>
          <circle cx="900" cy="930" r="44" opacity=".1"/><circle cx="640" cy="1010" r="30" opacity=".1"/><circle cx="60" cy="1100" r="52" opacity=".08"/>
        </g>
      </svg>`,
    kitchen: `
      <svg viewBox="0 0 1080 1440" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">
        <defs>
          <linearGradient id="kWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a372a"/><stop offset=".55" stop-color="#33261d"/><stop offset="1" stop-color="#1b140f"/></linearGradient>
          <linearGradient id="kSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c3d5e"/><stop offset=".5" stop-color="#6d6a8c"/><stop offset=".8" stop-color="#d79a78"/><stop offset="1" stop-color="#f3c592"/></linearGradient>
          <radialGradient id="kLamp"><stop offset="0" stop-color="#fff3d6"/><stop offset=".35" stop-color="#ffd08a"/><stop offset="1" stop-color="#ffb060" stop-opacity="0"/></radialGradient>
          <radialGradient id="kHalo"><stop offset="0" stop-color="#ffbf73" stop-opacity=".75"/><stop offset="1" stop-color="#ffbf73" stop-opacity="0"/></radialGradient>
          <linearGradient id="kTop" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8f7659"/><stop offset=".55" stop-color="#f0d9b4"/><stop offset="1" stop-color="#a88b68"/></linearGradient>
          <linearGradient id="kFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2b20"/><stop offset="1" stop-color="#140f0b"/></linearGradient>
          <filter id="kBlur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="15"/></filter>
          <filter id="kSoft"><feGaussianBlur stdDeviation="5"/></filter>
        </defs>
        <g filter="url(#kBlur)">
          <rect x="-60" y="-60" width="1200" height="1560" fill="url(#kWall)"/>
          <!-- window, dusk outside -->
          <rect x="70" y="70" width="360" height="560" fill="url(#kSky)"/>
          <rect x="242" y="70" width="14" height="560" fill="#241a13"/><rect x="70" y="330" width="360" height="12" fill="#241a13"/>
          <rect x="52" y="52" width="396" height="596" fill="none" stroke="#1f1610" stroke-width="30"/>
          <polygon points="70,650 430,650 640,1120 150,1120" fill="#f3c592" opacity=".1"/>
          <!-- back wall: shelf with under-light -->
          <rect x="540" y="470" width="600" height="250" fill="#2a1e16"/>
          <rect x="540" y="462" width="600" height="14" fill="#ffd9a0" opacity=".9"/>
          <rect x="540" y="476" width="600" height="120" fill="#ffc37a" opacity=".16"/>
          <rect x="610" y="380" width="46" height="84" rx="8" fill="#6b5340"/><rect x="676" y="404" width="34" height="60" rx="6" fill="#8a6c50"/><rect x="900" y="372" width="60" height="92" rx="10" fill="#5c4636"/>
          <!-- pendants -->
          <g stroke="#120d09" stroke-width="5"><line x1="590" y1="-20" x2="590" y2="232"/><line x1="790" y1="-20" x2="790" y2="196"/><line x1="985" y1="-20" x2="985" y2="250"/></g>
          <circle cx="590" cy="290" r="210" fill="url(#kHalo)"/><circle cx="790" cy="254" r="230" fill="url(#kHalo)"/><circle cx="985" cy="308" r="200" fill="url(#kHalo)"/>
          <circle cx="590" cy="290" r="62" fill="url(#kLamp)"/><circle cx="790" cy="254" r="68" fill="url(#kLamp)"/><circle cx="985" cy="308" r="58" fill="url(#kLamp)"/>
          <!-- island -->
          <rect x="-60" y="1196" width="1200" height="44" fill="url(#kTop)"/>
          <rect x="-60" y="1240" width="1200" height="300" fill="url(#kFront)"/>
          <ellipse cx="640" cy="1216" rx="150" ry="13" fill="#fff0cf" opacity=".85"/><ellipse cx="900" cy="1218" rx="110" ry="10" fill="#fff0cf" opacity=".6"/>
          <!-- things on the island -->
          <rect x="150" y="1106" width="60" height="92" rx="12" fill="#c9b08d"/><circle cx="180" cy="1078" r="46" fill="#55633f"/><circle cx="214" cy="1056" r="32" fill="#4a5837"/>
          <ellipse cx="420" cy="1186" rx="92" ry="18" fill="#e6d2b2"/>
        </g>
        <!-- foreground bokeh -->
        <g filter="url(#kSoft)" fill="#ffcf8f">
          <circle cx="508" cy="820" r="54" opacity=".1"/><circle cx="912" cy="700" r="72" opacity=".08"/><circle cx="330" cy="1240" r="64" opacity=".09"/>
          <circle cx="760" cy="1290" r="46" opacity=".1"/><circle cx="1010" cy="960" r="38" opacity=".12"/><circle cx="96" cy="860" r="44" opacity=".08"/>
        </g>
      </svg>`,
    neutral: `
      <div style="position:absolute;inset:0;background:linear-gradient(160deg,#cfc6b8 0%,#b8ae9f 45%,#9a9083 100%)"></div>
      <div style="position:absolute;left:14%;top:30%;width:72%;height:44%;background:#ddd5c8;transform:rotate(-3deg);box-shadow:0 0 0 18px rgba(0,0,0,.03)"></div>
      <div style="position:absolute;left:10%;top:14%;width:80%;height:15%;background:linear-gradient(180deg,#8f8576,#a1978a);border-radius:30px;transform:rotate(-3deg)"></div>
      <div style="position:absolute;left:36%;top:44%;width:30%;height:16%;background:#b59c7c;border-radius:12px;transform:rotate(-3deg);box-shadow:0 18px 40px rgba(0,0,0,.18)"></div>
      <div style="position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,250,240,.35) 0%,rgba(255,250,240,.0) 40%),linear-gradient(115deg,transparent 55%,rgba(255,250,240,.18) 62%,transparent 70%)"></div>`,
    sofa: `
      <div style="position:absolute;inset:0;background:linear-gradient(100deg,#4a3c31 0%,#6e5a49 50%,#b49a7e 82%,#e7d5bb 100%)"></div>
      <div style="position:absolute;right:-6%;top:6%;width:34%;height:58%;background:linear-gradient(90deg,rgba(255,240,215,0),rgba(255,240,215,.75));filter:blur(24px)"></div>
      <div style="position:absolute;left:-4%;right:20%;top:58%;height:26%;background:linear-gradient(180deg,#5b4a3d,#3b3029);border-radius:40px 40px 0 0;filter:blur(1px)"></div>
      <div style="position:absolute;left:30%;top:62%;width:22%;height:9%;background:#efe6d6;transform:rotate(-8deg);box-shadow:0 10px 26px rgba(0,0,0,.3)"></div>
      <div style="position:absolute;left:44%;top:60%;width:20%;height:9%;background:#f6eee1;transform:rotate(5deg);box-shadow:0 10px 26px rgba(0,0,0,.25)"></div>
      <div style="position:absolute;left:0;right:0;bottom:0;height:18%;background:linear-gradient(180deg,transparent,#1e1813)"></div>`,
    arches: `
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,#221b16 0%,#1a1411 60%,#120e0b 100%)"></div>
      ${[14, 39, 64].map((x) => `
        <div style="position:absolute;left:${x}%;top:9%;width:22%;height:50%;border-radius:999px 999px 0 0;background:
          linear-gradient(180deg,rgba(255,226,180,.85),rgba(240,190,130,.55) 55%,rgba(200,150,100,.35));box-shadow:0 0 120px 30px rgba(255,190,120,.18)"></div>
        <div style="position:absolute;left:${x + 10.6}%;top:9%;width:.8%;height:50%;background:rgba(40,30,22,.7)"></div>
        <div style="position:absolute;left:${x}%;top:33%;width:22%;height:.8%;background:rgba(40,30,22,.7)"></div>
        <div style="position:absolute;left:${x - 3}%;top:4%;width:5%;height:76%;background:linear-gradient(90deg,rgba(70,55,44,.95),rgba(120,98,80,.85),rgba(60,48,38,.95));filter:blur(1px)"></div>
        <div style="position:absolute;left:${x + 20}%;top:4%;width:5%;height:76%;background:linear-gradient(90deg,rgba(60,48,38,.95),rgba(120,98,80,.85),rgba(70,55,44,.95));filter:blur(1px)"></div>`).join("")}
      <div style="position:absolute;left:0;right:0;top:59%;bottom:0;background:linear-gradient(180deg,#2c221b,#15100c)"></div>
      ${[14, 39, 64].map((x) => `
        <div style="position:absolute;left:${x + 6}%;top:59%;width:26%;height:38%;background:linear-gradient(180deg,rgba(255,200,140,.32),rgba(255,200,140,0));transform:skewX(-34deg);transform-origin:top;filter:blur(8px)"></div>`).join("")}`
  };

  function photoLayer(slide, ready) {
    const wrap = document.createElement("div");
    wrap.className = "photo";
    wrap.innerHTML = `<div class="scene">${SCENES[slide.scene] || SCENES.dusk}</div><div class="grain"></div>`;
    const tag = document.createElement("div");
    tag.className = "photo-tag";
    tag.textContent = "Placeholder · " + (slide.sceneLabel || "photo");
    if (slide.photo) {
      const img = new Image();
      ready.push(new Promise((res) => {
        img.onload = () => { wrap.querySelector(".grain").before(img); tag.remove(); res(); };
        img.onerror = () => res();
      }));
      img.alt = "";
      img.src = slide.photo;
    }
    return [wrap, tag];
  }

  const handle = (cls = "") => `<div class="handle ${cls}">${esc(D.handle)}</div>`;
  const swipe = () => `<div class="swipe">${arrow()}</div>`;
  const meta = (s) => `<div class="meta"><span class="when">${md(s.when)}</span><span class="where">${md(s.where)}</span></div>`;

  function mini(ref, scale, extraStyle = "", ready = []) {
    const c = findCarousel(ref);
    const el = document.createElement("div");
    el.className = "mini";
    el.style.cssText = `width:${1080 * scale}px;height:${1440 * scale}px;${extraStyle}`;
    const s = renderSlide(c, c.slides[0], 0, { nested: true, ready });
    s.style.transform = `scale(${scale})`;
    el.appendChild(s);
    return el;
  }

  function findCarousel(id) {
    if (id === "deck") return D.deck;
    return D.carousels.find((c) => c.id === id);
  }

  function renderSlide(c, s, i, opts = {}) {
    const total = c.slides.length;
    const last = i === total - 1;
    const el = document.createElement("section");
    el.className = `slide t-${s.type}`;
    const extra = { deckCover: "deck-cover", deckIdea: "deck-idea", close: "close", city: "city", method: "method", recap: "recap", decision: "decision", list: "list", step: "step", stop: "stop", pick: "pick" }[s.type];
    if (extra) el.classList.add(extra);
    el.dataset.carousel = c.id;
    el.dataset.index = i + 1;
    const ready = opts.ready || [];
    let html = "";

    switch (s.type) {
      case "cover": {
        el.classList.add("cover", "on-photo", s.variant || "");
        html = `<div class="overlay"></div>
          <div class="inner">
            ${s.callout ? `<div class="callout">${md(s.callout)}</div>` : ""}
            ${s.kicker ? `<div class="kicker">${md(s.kicker)}</div>` : ""}
            <h1>${s.titleHtml}</h1>
            ${s.sub ? `<div class="sub">${md(s.sub)}</div>` : ""}
          </div>${handle()}<div class="swipe">${arrow()}</div>`;
        break;
      }
      case "money": {
        el.classList.add("cover", "money", "on-photo");
        html = `<div class="overlay" style="background:linear-gradient(180deg,rgba(14,10,7,.28) 0%,rgba(14,10,7,.48) 34%,rgba(14,10,7,.56) 66%,rgba(14,10,7,.7) 100%)"></div>
          <div class="inner">
            <div class="stack top">What</div>
            <div class="figure">$700<em>K</em></div>
            <div class="stack bottom"><span class="thin">actually</span> buys<br>around Boise</div>
            <div class="stack-row"><span>Boise</span><span>Meridian</span><span>Eagle</span></div>
            <div class="hook">${md(s.hook || "")}</div>
          </div>${handle()}<div class="swipe">${arrow()}</div>`;
        break;
      }
      case "pick": {
        el.classList.add("interior");
        const picks = c.slides.filter((x) => x.type === "pick");
        const n = String(picks.indexOf(s) + 1).padStart(2, "0");
        html = `<div class="meta"><span class="when">Friday night · ${n} of ${String(picks.length).padStart(2, "0")}</span><span class="where">${md(s.where)}</span></div>
          <div class="col">
            <div class="reason">${md(s.when)}</div>
            <h2 class="headline xl">${md(s.headline)}</h2>
            <p class="why">${md(s.lead)}</p>
            <div class="trio">
              <div class="row"><div class="k">Order</div><div class="v">${md(s.order)}</div></div>
              <div class="row"><div class="k">Book it</div><div class="v">${md(s.detail)}</div></div>
              <div class="row"><div class="k">Find it</div><div class="v">${md(s.find)}</div></div>
            </div>
          </div>${handle()}${swipe()}`;
        break;
      }
      case "stop": {
        el.classList.add("interior");
        html = `${meta(s)}
          <h2 class="headline ${s.headlineSize || ""}">${md(s.headline)}</h2>
          <div class="body">
            <div class="block lead"><div class="label">Why go</div><p>${md(s.lead)}</p></div>
            <div class="block detail"><div class="label">Good to know</div><p>${md(s.detail)}</p></div>
            ${s.aside ? `<div class="block aside"><p>${md(s.aside)}</p></div>` : ""}
          </div>${handle()}${last ? "" : swipe()}`;
        break;
      }
      case "method": {
        el.classList.add("interior");
        html = `${meta(s)}
          <div class="col">
            <h2 class="headline">${md(s.headline)}</h2>
            <div class="formula">
              <div class="eq">${md(s.eq)}</div>
              <table>${s.rows.map((r) => `<tr><td class="c">${esc(r[0])}</td><td class="m">${esc(r[1])}/sq ft</td><td class="r">${esc(r[2])}</td></tr>`).join("")}</table>
            </div>
            <div class="note">${md(s.note)}</div>
          </div>${handle()}${swipe()}`;
        break;
      }
      case "city": {
        el.classList.add("interior");
        html = `<div class="meta"><span class="when">At $700K</span><span class="where">${esc(s.city)} · Ada County</span></div>
          <div class="col">
            <div class="cityname">${esc(s.city)}</div>
            <h2 class="headline">${md(s.headline)}</h2>
            <div class="stats n${s.stats.length}">${s.stats.map((x) => `<div class="cell"><div class="n">${esc(x[0])}</div><div class="u">${md(x[1])}</div></div>`).join("")}</div>
            <div class="example">${s.exampleHtml || ""}</div>
            <div class="tradeoff"><div class="label">The trade-off</div><p>${md(s.tradeoff)}</p></div>
          </div>${handle()}${swipe()}`;
        break;
      }
      case "recap": {
        el.classList.add("interior");
        html = `${meta(s)}
          <div class="col">
            <h2 class="headline">${md(s.headline)}</h2>
            <table>
              <thead><tr><th></th>${s.cols.map((x) => `<th>${esc(x)}</th>`).join("")}</tr></thead>
              <tbody>${s.rows.map((r) => `<tr><td class="k">${esc(r[0])}</td>${r[1].map((v) => `<td>${r[2] ? `<span class="big">${esc(v)}</span>` : md(v)}</td>`).join("")}</tr>`).join("")}</tbody>
            </table>
            ${s.ask ? `<div class="ask">${md(s.ask)}</div>` : ""}
          </div>${handle()}${swipe()}`;
        break;
      }
      case "decision": {
        el.classList.add("interior");
        html = `<div class="meta"><span class="when">Before you list</span><span class="where">Decision ${esc(s.num)} of 05</span></div>
          <div class="col">
            <div class="top">
              <h2 class="headline">${md(s.headline)}</h2>
              <div class="num">${esc(s.num)}</div>
            </div>
            <div class="badge-row"><span class="badge ${s.badgeStyle === "fill" ? "fill" : ""}">${esc(s.badge)}</span></div>
            <div class="trio">
              <div class="row"><div class="k">Buyers notice</div><div class="v">${md(s.notice)}</div></div>
              <div class="row"><div class="k">The fix</div><div class="v">${md(s.fix)}</div></div>
              <div class="row"><div class="k">Leave it when</div><div class="v">${md(s.leave)}</div></div>
            </div>
          </div>${handle()}${swipe()}`;
        break;
      }
      case "list": {
        el.classList.add("interior");
        html = `<div class="meta"><span class="when">${md(s.when)}</span><span class="where">${md(s.where)}</span></div>
          <div class="col">
            <h2 class="headline">${md(s.headline)}</h2>
            <span class="badge soft list-badge">Usually skip</span>
            <ul class="listing">${s.items.map((it) => `<li><span class="x">×</span><span><b>${esc(it[0])}.</b> ${md(it[1])}</span></li>`).join("")}</ul>
          </div>${handle()}${swipe()}`;
        break;
      }
      case "checklist": {
        el.classList.add("interior", "check");
        html = `<div class="col">
            <h2 class="headline">${md(s.headline)}</h2>
            <ul class="checklist-items">${s.items.map((it) => `<li><span class="box"></span><span class="grp">${esc(it[0])}</span><span>${md(it[1])}</span></li>`).join("")}</ul>
            <div class="foot">${md(s.footer)}</div>
          </div>${handle()}<div class="folio">Save · ${String(i + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}</div>`;
        break;
      }
      case "step": {
        el.classList.add("interior");
        html = `<div class="meta"><span class="when">After acceptance</span><span class="where">${esc(s.stepno)} of 06</span></div>
          <div class="col">
            <div class="stepno">${esc(s.stepno)}</div>
            <h2 class="headline">${md(s.headline)}</h2>
            <div><span class="timing">${md(s.timing)}</span></div>
            <div class="body">
              <div class="block lead"><div class="label">What happens</div><p>${md(s.happens)}</p></div>
              <div class="block detail"><div class="label">Watch for</div><p>${md(s.watch)}</p></div>
            </div>
          </div>${handle()}${swipe()}`;
        break;
      }
      case "close": {
        html = `<div class="inner">
            <div class="mark"></div>
            <h2>${md(s.headline)}</h2>
            ${s.small ? `<div class="small">${md(s.small)}</div>` : ""}
            ${s.ask ? `<div class="ask">${md(s.ask)}</div>` : ""}
            ${s.callout ? `<div class="callout">${md(s.callout)}</div>` : ""}
          </div>
          <div class="sig"><b>${esc(D.name)}</b> · ${esc(D.brokerage)}<br>${esc(D.handle)}</div>`;
        break;
      }
      case "deckCover": {
        el.classList.add("on-photo");
        html = `<div class="overlay" style="background:linear-gradient(180deg,rgba(14,11,9,.25),rgba(14,11,9,.35) 50%,rgba(14,11,9,.62))"></div>
          <div class="title">
            <div class="kicker">${md(s.kicker)}</div>
            <h1>${s.titleHtml}</h1>
            <div class="sub">${md(s.sub)}</div>
          </div>${handle()}`;
        break;
      }
      case "deckIdea": {
        el.classList.add("interior");
        html = `<div class="no">${esc(s.no)}</div>
          <h2 class="headline">${md(s.headline)}</h2>
          <div class="explain">
            <p>${md(s.explain)}</p>
            <div class="label">The post</div>
            <div class="facts">${md(s.facts)}</div>
          </div>
          <div class="longarrow">${arrow(888)}</div>`;
        break;
      }
    }
    el.innerHTML = html;

    // photo + placeholder tag
    if (["cover", "money", "deckCover"].includes(s.type)) {
      const [p, tag] = photoLayer(s, ready);
      el.prepend(p);
      if (!opts.nested) el.appendChild(tag);
    }
    // embedded mock covers
    if (s.type === "deckIdea") {
      el.appendChild(mini(s.ref, 0.42, "", ready));
    }
    if (s.type === "deckCover") {
      const a = mini(s.previews[0], 0.22, "left:64px;top:44px;transform:rotate(-7deg);z-index:1", ready);
      const b = mini(s.previews[1], 0.22, "right:80px;bottom:110px;transform:rotate(6deg);z-index:1", ready);
      el.insertBefore(a, el.querySelector(".title"));
      el.insertBefore(b, el.querySelector(".title"));
    }
    el._ready = () => Promise.all(ready);
    return el;
  }

  window.Carousels = { renderSlide, findCarousel, md, esc };
})();
