// Generate carousels/SPEC.md (exact on-slide copy, photo direction, layout notes,
// captions, items to confirm, sources) from carousels/content.js.
// Usage (from repo root): node _src/carousels/spec.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../carousels");
const w = {};
new Function("window", fs.readFileSync(path.join(root, "content.js"), "utf8"))(w);
const D = w.CAROUSEL_DATA;

const txt = (s) => String(s ?? "").replace(/\n/g, " / ");
const html = (s) => String(s ?? "").replace(/<span class="big-italic">/g, " / ").replace(/<em>(.*?)<\/em>/g, "*$1*").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const q = (label, v) => (v ? `- **${label}:** ${txt(v)}\n` : "");

function copy(c, s, i) {
  switch (s.type) {
    case "cover":
      return q("Callout", s.callout) + q("Kicker", s.kicker) + q("Title", html(s.titleHtml)) + q("Sub-line", s.sub) + q("Footer", D.handle);
    case "money":
      return q("Top stack", "WHAT") + q("Figure", "$700K (K in italic)") + q("Bottom stack", "ACTUALLY BUYS / AROUND BOISE") + q("Ruled line", "BOISE · MERIDIAN · EAGLE") + q("Footer", D.handle);
    case "stop":
      return q("Meta row", `${s.when}  |  ${s.where}`) + q("Headline", s.headline) + q("Why go", s.lead) + q("Good to know", s.detail) + q("Aside", s.aside) + q("Footer", `${D.handle} + swipe arrow`);
    case "pick": {
      const picks = c.slides.filter((x) => x.type === "pick");
      const n = String(picks.indexOf(s) + 1).padStart(2, "0");
      return q("Meta row", `FRIDAY NIGHT · ${n} OF ${String(picks.length).padStart(2, "0")}  |  ${s.where}`) + q("Occasion (serif italic)", s.when) + q("Headline", s.headline) + q("Why", s.lead) + q("Order", s.order) + q("Book it", s.detail) + q("Find it", s.find) + q("Footer", `${D.handle} + swipe arrow`);
    }
    case "method":
      return q("Meta row", `${s.when}  |  ${s.where}`) + q("Headline", s.headline) + q("Formula", s.eq) + s.rows.map((r) => `- **Row:** ${r[0].toUpperCase()} · ${r[1]}/sq ft · ${r[2]}\n`).join("") + q("Note", s.note) + q("Footer", `${D.handle} + swipe arrow`);
    case "city":
      return q("Meta row", `AT $700K  |  ${s.city.toUpperCase()} · ADA COUNTY`) + q("City", s.city.toUpperCase()) + q("Headline", s.headline) + s.stats.map((x) => `- **Stat:** ${x[0]} — ${txt(x[1])}\n`).join("") + q("Example line", html(s.exampleHtml)) + q("The trade-off", s.tradeoff) + q("Footer", `${D.handle} + swipe arrow`);
    case "recap":
      return q("Meta row", `${s.when}  |  ${s.where}`) + q("Headline", s.headline) + `- **Table:**\n\n  | | ${s.cols.join(" | ")} |\n  |---|${s.cols.map(() => "---").join("|")}|\n` + s.rows.map((r) => `  | ${r[0]} | ${r[1].map(txt).join(" | ")} |\n`).join("") + "\n" + q("Footer", `${D.handle} + swipe arrow`);
    case "decision":
      return q("Meta row", `BEFORE YOU LIST  |  DECISION ${s.num} OF 05`) + q("Headline", s.headline) + q("Number", s.num) + q("Label", s.badge.toUpperCase()) + q("Buyers notice", s.notice) + q("The fix", s.fix) + q("Leave it when", s.leave) + q("Footer", `${D.handle} + swipe arrow`);
    case "list":
      return q("Meta row", `${s.when}  |  ${s.where}`) + q("Headline", s.headline) + q("Label", "USUALLY SKIP") + s.items.map((it) => `- **×** ${it[0]}. ${it[1]}\n`).join("") + q("Footer", `${D.handle} + swipe arrow`);
    case "checklist":
      return q("Headline", s.headline) + s.items.map((it) => `- ☐ ${it[0].toUpperCase()} — ${it[1]}\n`).join("") + q("Footer line", s.footer) + q("Footer", `${D.handle} · SAVE · ${String(i + 1).padStart(2, "0")}/${String(c.slides.length).padStart(2, "0")}`);
    case "step":
      return q("Meta row", `AFTER ACCEPTANCE  |  ${s.stepno.toUpperCase()} OF 06`) + q("Step label (burgundy)", s.stepno.toUpperCase()) + q("Headline", s.headline) + q("Timing chip", s.timing.toUpperCase()) + q("What happens", s.happens) + q("Watch for", s.watch) + q("Footer", `${D.handle} + swipe arrow`);
    case "close":
      return q("Headline", s.headline) + q("Small line", s.small) + q("Callout", s.callout) + q("Signature", `${D.name} · ${D.brokerage} / ${D.handle}`);
    case "deckCover":
      return q("Kicker", s.kicker) + q("Title", html(s.titleHtml)) + q("Sub-line", s.sub) + q("Previews", s.previews.map((p) => D.carousels.find((x) => x.id === p).title + " cover").join(" + ")) + q("Footer", D.handle);
    case "deckIdea":
      return q("Number", s.no) + q("Headline", s.headline) + q("Mock cover", D.carousels.find((x) => x.id === s.ref).title + " (slide 1)") + q("Explanation", s.explain) + q("The post", s.facts) + q("Footer", "long arrow across the bottom");
  }
  return "";
}

let out = `# Treasure Valley carousels: spec\n\n`;
out += `Generated from \`carousels/content.js\` by \`node _src/carousels/spec.mjs\`. Don't edit by hand.\n`;
out += `Research date: ${D.researched}. Rendered slides: \`carousels/export/<id>/NN.jpg\` (1080 × 1440). Viewer: \`/carousels/\`.\n\n`;
out += `**Handle:** ${D.handle} (${D.handleConfirm})\n\n`;
out += `**Brokerage line:** every closing slide and caption carries "${D.name} · ${D.brokerage}". Idaho Code 54-2053 requires the broker's licensed business name on advertising of listed property.\n\n`;
out += `**Photos:** covers currently show placeholder scenes. Drop a real photo at the path listed for each cover (in \`carousels/photos/\`) and re-run the export. Use your own photos or licensed ones, and never another brokerage's listing photos.\n\n`;
out += `## Design system\n\n- Canvas 1080 × 1440 portrait. Side margins 96 px.\n- Serif: Bodoni Moda (high contrast, optical size pinned at 30–40 so hairlines survive on a phone). One italic word or phrase per headline.\n- Sans: Archivo, bold and tracked uppercase for places, labels and meta, regular for supporting copy (32–44 px).\n- Colors: paper #F4EFE6, ink #1B1815, muted #5F574E, ivory on photos #F5EEE2, burgundy #7A2E34 (carousel 5 only).\n- Interior slides: meta row over a 2 px rule, big serif headline, ruled supporting blocks, a thin 520 px swipe arrow bottom-right, and the handle bottom-left in 22 px tracked caps.\n- Covers: full-bleed photo with a soft dark overlay (about 35% to 70% top to bottom) and oversized ivory serif type.\n- Closing slides: centered typography, short CTA, name, brokerage and handle at the bottom.\n\n`;

const sets = [...D.carousels, D.deck];
sets.forEach((c, n) => {
  out += `---\n\n## ${c.id === "deck" ? "Concept deck (7 slides)" : `${n + 1}. ${c.title} (${c.slides.length} slides)`}\n\n`;
  if (c.question) out += `**Search question:** ${c.question}  \n**For:** ${c.audience}\n\n`;
  c.slides.forEach((s, i) => {
    out += `### Slide ${i + 1}: ${s.type}\n\n${copy(c, s, i)}`;
    if (s.photo) out += q("Photo file", `carousels/${s.photo}`);
    if (s.photoDirection) out += q("Photo direction", s.photoDirection);
    if (s.layout) out += q("Layout", s.layout);
    if (s.confirm && s.confirm.length) out += `- **⚠ Confirm before posting:**\n${s.confirm.map((x) => `  - ${x}\n`).join("")}`;
    out += `\n`;
  });
  if (c.caption) out += `### Caption\n\n\`\`\`\n${c.caption}\n\n${c.hashtags}\n\`\`\`\n\n`;
});

out += `---\n\n## Everything to confirm, in one list\n\n- ${D.handleConfirm}\n`;
D.carousels.forEach((c) => c.slides.forEach((s, i) => (s.confirm || []).forEach((x) => { out += `- **${c.title}, slide ${i + 1}:** ${x}\n`; })));
out += `- **Every cover:** replace the placeholder scene with a real photo you own or have licensed.\n`;
out += `\n## Sources (checked ${D.researched})\n\n${D.sources.map((s) => `- [${s[0]}](${s[1]})`).join("\n")}\n`;
fs.writeFileSync(path.join(root, "SPEC.md"), out);
console.log("wrote carousels/SPEC.md", out.length, "chars");
