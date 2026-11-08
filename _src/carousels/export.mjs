// Export every carousel slide to carousels/export/<id>/<nn>.jpg at 1080 x 1440.
// Usage (from repo root):  node _src/carousels/export.mjs [carouselId ...] [--png] [--proof]
//   --proof keeps the "Placeholder" photo tags on the covers.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../carousels");
const args = process.argv.slice(2);
const png = args.includes("--png");
const proof = args.includes("--proof");
const only = args.filter((a) => !a.startsWith("--"));

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

// Read slide counts from content.js
const ctx = { window: {} };
new Function("window", fs.readFileSync(path.join(root, "content.js"), "utf8"))(ctx.window);
const D = ctx.window.CAROUSEL_DATA;
const sets = [...D.carousels, D.deck].filter((c) => !only.length || only.includes(c.id));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1440 }, deviceScaleFactor: 1 });
for (const c of sets) {
  const dir = path.join(root, "export", c.id);
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 1; i <= c.slides.length; i++) {
    await page.goto(`${base}/render.html?c=${c.id}&s=${i}${proof ? "" : "&export=1"}`);
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 20000 });
    const file = path.join(dir, `${String(i).padStart(2, "0")}.${png ? "png" : "jpg"}`);
    await page.screenshot({ path: file, type: png ? "png" : "jpeg", quality: png ? undefined : 92, clip: { x: 0, y: 0, width: 1080, height: 1440 } });
    console.log(path.relative(root, file));
  }
}
await browser.close();
server.close();
