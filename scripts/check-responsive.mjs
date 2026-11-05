#!/usr/bin/env node
/**
 * Vérification responsive automatique de toutes les pages du portfolio.
 *
 * Ouvre chaque page dans Chrome (headless) à plusieurs largeurs et signale :
 *   - le défilement horizontal de la page ;
 *   - les textes qui se chevauchent ;
 *   - les textes qui sortent de l'écran ou débordent de leur bloc ;
 *   - les décalages de mise en page au chargement (CLS).
 *
 * Mode --cls : mesure uniquement le CLS sur réseau lent, sans cache
 * (pour repérer le texte « qui bouge » pendant le chargement).
 *
 * Usage :
 *   npm run check:responsive                 # build + serveur lancé automatiquement
 *   npm run check:cls
 *   node scripts/check-responsive.mjs --url http://localhost:3000   # serveur déjà lancé
 *   node scripts/check-responsive.mjs --pages /demos/volt --widths 375,1440
 *
 * Variables : CHROME_PATH pour forcer l'exécutable Chrome.
 * Sortie : captures + rapport JSON dans .checks/ ; code de sortie 1 si problème.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

// ── Options ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const CLS_MODE = args.includes("--cls");
const PORT = 3100;
const externalUrl = opt("url");
const baseUrl = externalUrl ?? `http://localhost:${PORT}`;
const widths = opt("widths", CLS_MODE ? "375,1440" : "320,375,768,1024,1280,1440,1920").split(",").map(Number);
const outDir = path.resolve(".checks");

/** Pages : l'accueil + chaque démo déclarée dans le registre (ajout automatique). */
function discoverPages() {
  const registry = fs.readFileSync("src/demos/registry.ts", "utf8");
  const slugs = [...registry.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  return ["/", ...slugs.map((s) => `/demos/${s}`)];
}
const pages = opt("pages")?.split(",") ?? discoverPages();

// Seuils
const CLS_LIMIT = 0.1; // « bon » selon les Core Web Vitals
const CLS_WARN = 0.05;

// ── Serveur ────────────────────────────────────────────────────────────────
async function waitFor(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Serveur injoignable : ${url}`);
}

let server;
if (!externalUrl) {
  if (!fs.existsSync(".next/BUILD_ID")) {
    console.error("Aucun build trouvé. Lancez `npm run build` (ou `npm run check:responsive`, qui le fait).");
    process.exit(1);
  }
  server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });
  process.on("exit", () => server?.kill());
}
await waitFor(baseUrl);

// ── Navigateur ─────────────────────────────────────────────────────────────
const launchOpts = { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] };
const browser = await chromium
  .launch(process.env.CHROME_PATH ? { ...launchOpts, executablePath: process.env.CHROME_PATH } : { ...launchOpts, channel: "chrome" })
  .catch((e) => {
    console.error("Impossible de lancer Chrome. Installez Google Chrome ou définissez CHROME_PATH.\n" + e.message);
    server?.kill();
    process.exit(1);
  });

/** Collecte les layout shifts dès le début du chargement. */
const observeShifts = () => {
  window.__shifts = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      if (e.hadRecentInput) continue;
      window.__shifts.push({
        value: e.value,
        sources: (e.sources || []).map((s) => {
          const n = s.node;
          return n && n.nodeType === 1 ? `${n.tagName.toLowerCase()}.${String(n.className).slice(0, 50)}` : n ? `#text «${(n.textContent || "").slice(0, 25)}»` : "?";
        }),
      });
    }
  }).observe({ type: "layout-shift", buffered: true });
};

/** Analyse de la page, exécutée dans le navigateur. */
function inspectLayout() {
  const vw = innerWidth;
  const out = { scrollWidth: document.documentElement.scrollWidth, overlaps: [], offscreen: [], overflowing: [] };
  const visible = (el) => {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity < 0.05) return false;
      if (cs.position === "fixed") return false; // barre flottante / header fixe : superposition voulue
    }
    return true;
  };
  const decorative = (el) => !!el.closest('[class*="animate-marquee"],[class*="animate-[spin"]');
  const label = (el) => `${el.tagName.toLowerCase()} «${el.textContent.trim().replace(/\s+/g, " ").slice(0, 40)}»`;

  // Blocs de texte : éléments contenant directement du texte visible.
  const byEl = new Map();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (!el || ["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "OPTION"].includes(el.tagName) || !visible(el)) continue;
    const range = document.createRange();
    range.selectNodeContents(n);
    const rects = [...range.getClientRects()].filter((r) => r.width > 1 && r.height > 1);
    if (!rects.length) continue;
    if (!byEl.has(el)) byEl.set(el, []);
    byEl.get(el).push(...rects);
  }
  const items = [...byEl].map(([el, rects]) => ({ el, rects }));

  for (const { el, rects } of items) {
    if (decorative(el)) continue;
    const out1 = rects.find((r) => r.right > vw + 1 || r.left < -1);
    if (out1) out.offscreen.push({ el: label(el), left: Math.round(out1.left), right: Math.round(out1.right) });
    const cs = getComputedStyle(el);
    if (cs.display !== "inline" && cs.overflowX === "visible" && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2) {
      out.overflowing.push({ el: label(el), width: el.clientWidth, content: el.scrollWidth });
    }
  }

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const A = items[i], B = items[j];
      if (A.el.contains(B.el) || B.el.contains(A.el)) continue;
      if (decorative(A.el) && decorative(B.el)) continue;
      // Les lignes d'un même titre ont un interligne serré volontaire.
      const hA = A.el.closest("h1,h2,h3");
      if (hA && hA === B.el.closest("h1,h2,h3")) continue;
      let hit = null;
      for (const a of A.rects)
        for (const b of B.rects) {
          const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
          const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          // > 30 % de la hauteur de ligne : les boîtes se mordent vraiment.
          if (w > 2 && h > 3 && h > Math.min(a.height, b.height) * 0.3) hit = { w: Math.round(w), h: Math.round(h), y: Math.round(a.top + scrollY) };
        }
      if (hit) out.overlaps.push({ a: label(A.el), b: label(B.el), ...hit });
    }
  }
  return out;
}

async function checkLayout(pagePath, width) {
  const height = width < 768 ? 812 : width < 1280 ? 1024 : 900;
  const mobile = width < 768;
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, hasTouch: mobile, isMobile: mobile });
  const page = await ctx.newPage();
  await page.addInitScript(observeShifts);
  await page.goto(baseUrl + pagePath, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const shifts = await page.evaluate(() => window.__shifts);

  // Défilement complet pour déclencher les animations d'apparition.
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.6) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  await page.waitForTimeout(1600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const layout = await page.evaluate(inspectLayout);
  const name = `${pagePath === "/" ? "accueil" : pagePath.split("/").pop()}-${width}`;
  await page.screenshot({ path: path.join(outDir, `${name}.png`) });
  await ctx.close();
  return { path: pagePath, width, ...layout, cls: +shifts.reduce((s, x) => s + x.value, 0).toFixed(4), shifts };
}

async function checkSlowCls(pagePath, width) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 812 : 900 } });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  // ≈ « Fast 3G » : 150 ms de latence, 1,6 Mb/s
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 200_000, uploadThroughput: 90_000 });
  await page.addInitScript(observeShifts);
  await page.goto(baseUrl + pagePath, { waitUntil: "load", timeout: 120_000 });
  await page.waitForTimeout(3000);
  const shifts = await page.evaluate(() => window.__shifts);
  await ctx.close();
  return { path: pagePath, width, cls: +shifts.reduce((s, x) => s + x.value, 0).toFixed(4), shifts };
}

// ── Exécution ──────────────────────────────────────────────────────────────
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const jobs = pages.flatMap((p) => widths.map((w) => [p, w]));
const results = [];
let next = 0;
const worker = async () => {
  while (next < jobs.length) {
    const [p, w] = jobs[next++];
    try {
      results.push(await (CLS_MODE ? checkSlowCls(p, w) : checkLayout(p, w)));
    } catch (e) {
      results.push({ path: p, width: w, error: e.message.split("\n")[0] });
    }
  }
};
console.log(`${CLS_MODE ? "CLS réseau lent" : "Responsive"} — ${pages.length} pages × ${widths.length} largeurs sur ${baseUrl}\n`);
await Promise.all(Array.from({ length: CLS_MODE ? 2 : 3 }, worker));
await browser.close();
server?.kill();

results.sort((a, b) => a.path.localeCompare(b.path) || a.width - b.width);
fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(results, null, 2));

// ── Rapport ────────────────────────────────────────────────────────────────
let failures = 0;
for (const r of results) {
  const problems = [];
  const warnings = [];
  if (r.error) problems.push(`erreur : ${r.error}`);
  if (r.scrollWidth > r.width) problems.push(`défilement horizontal (${r.scrollWidth}px)`);
  for (const o of r.overlaps ?? []) problems.push(`chevauchement ${o.a} × ${o.b}`);
  for (const o of r.offscreen ?? []) problems.push(`hors écran ${o.el}`);
  for (const o of r.overflowing ?? []) problems.push(`déborde ${o.el} (${o.content}px > ${o.width}px)`);
  if (r.cls > CLS_LIMIT) problems.push(`CLS ${r.cls} — ${[...new Set(r.shifts.flatMap((s) => s.sources))].slice(0, 3).join(", ")}`);
  else if (r.cls > CLS_WARN) warnings.push(`CLS ${r.cls}`);

  const tag = problems.length ? "✗" : warnings.length ? "!" : "✓";
  console.log(`${tag} ${r.path.padEnd(24)} ${String(r.width).padStart(4)}px${CLS_MODE ? `  CLS ${r.cls}` : ""}`);
  for (const p of [...problems, ...warnings]) console.log(`    ${p}`);
  if (problems.length) failures++;
}

console.log(`\n${failures ? `✗ ${failures} combinaison(s) en échec` : "✓ Tout est bon"} — captures et rapport : .checks/`);
process.exit(failures ? 1 : 0);
