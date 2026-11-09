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
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,#2a1b12 0%,#1f140e 55%,#120c08 100%)"></div>
      <div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 3px,transparent 3px 64px);opacity:.6"></div>
      <div style="position:absolute;inset:0;background:
        radial-gradient(14% 10% at 18% 20%,rgba(255,196,120,.95),rgba(255,150,70,.35) 45%,transparent 72%),
        radial-gradient(13% 9% at 50% 15%,rgba(255,200,130,.9),rgba(255,150,70,.3) 45%,transparent 72%),
        radial-gradient(14% 10% at 82% 21%,rgba(255,190,115,.92),rgba(255,140,60,.32) 45%,transparent 72%),
        radial-gradient(50% 20% at 50% 82%,rgba(255,160,80,.28),transparent 70%),
        radial-gradient(10% 5% at 30% 78%,rgba(255,200,140,.5),transparent 70%),
        radial-gradient(9% 5% at 70% 80%,rgba(255,200,140,.45),transparent 70%)"></div>
      <div style="position:absolute;left:0;right:0;top:70%;height:6%;background:linear-gradient(180deg,rgba(90,52,30,.9),rgba(40,24,14,.95));box-shadow:0 -2px 0 rgba(255,180,110,.25)"></div>`,
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
          </div>${handle()}`;
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
      case "stop":
      case "pick": {
        el.classList.add("interior");
        const picks = c.slides.filter((x) => x.type === "pick");
        const metaRow = s.type === "pick"
          ? `<div class="meta"><span class="when">Friday night · ${String(picks.indexOf(s) + 1).padStart(2, "0")} of ${String(picks.length).padStart(2, "0")}</span><span class="where">${md(s.where)}</span></div>`
          : meta(s);
        html = `${metaRow}
          <h2 class="headline ${s.headlineSize || ""}">${md(s.headline)}</h2>
          ${s.type === "pick" ? `<div class="reason">${md(s.when)}</div>` : ""}
          <div class="body">
            <div class="block lead"><div class="label">${s.type === "pick" ? "Why pick it" : "Why go"}</div><p>${md(s.lead)}</p></div>
            <div class="block detail"><div class="label">${s.type === "pick" ? "Book it" : "Good to know"}</div><p>${md(s.detail)}</p></div>
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
