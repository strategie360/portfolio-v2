#!/usr/bin/env node
/**
 * Vérification d'accessibilité.
 *
 * - axe-core (règles WCAG 2.0 / 2.1 / 2.2, niveaux A et AA) : contrastes,
 *   libellés, titres, attributs ARIA, langue…
 * - Contrastes qu'axe ne peut pas calculer (dégradés, grain) : mesurés sur
 *   les pixels réellement affichés.
 * - Contrôles maison pour un public peu à l'aise avec le numérique :
 *   paragraphes d'au moins 16 px (14 px pour liens, boutons, étiquettes) et
 *   cibles tactiles d'au moins 24 px (WCAG 2.5.8),
 *   44 px recommandés sur la page Prestations.
 *
 * Les pages du portfolio sont strictes (échec = code 1). Les démos ont des
 * partis pris graphiques volontaires : leurs remarques sont informatives.
 *
 * Usage : npm run check:a11y   (options : --url, --pages, --widths)
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { launchBrowser, opt, prepareOutDir, revealAll, runPool, selectedPages, startServer } from "./lib.mjs";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const widths = opt("widths", "375,1440").split(",").map(Number);
const pages = selectedPages();
const outDir = prepareOutDir("a11y");
const isDemo = (p) => p.startsWith("/demos/");

const { baseUrl, stop } = await startServer();
const browser = await launchBrowser();

/**
 * Pour chaque texte : capture de sa zone à l'écran, couleur de fond dominante
 * (hors pixels proches de la couleur du texte), puis ratio de contraste WCAG.
 */
async function measureContrast(page, selectors) {
  await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
  const results = { checked: 0, decorative: 0, unmeasured: [], failures: [] };
  for (const selector of selectors.slice(0, 80)) {
    const info = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      // Illustrations masquées (aria-hidden) : décoratives, non concernées.
      if (!el) return { skip: "absent" };
      if (el.closest("[aria-hidden=true]")) return { skip: "decorative" };
      el.scrollIntoView({ block: "center" });
      const cs = getComputedStyle(el);
      // Masque temporairement les parties d'une autre couleur (ex. surlignage)
      // pour ne mesurer que le texte de l'élément sur son vrai fond.
      for (const child of el.querySelectorAll("*")) {
        if (getComputedStyle(child).color !== cs.color) {
          child.dataset.contrastHidden = child.style.visibility || "-";
          child.style.visibility = "hidden";
        }
      }
      let opacity = 1;
      for (let e = el; e; e = e.parentElement) opacity *= +getComputedStyle(e).opacity;
      const r = el.getBoundingClientRect();
      return {
        color: cs.color,
        opacity,
        size: parseFloat(cs.fontSize),
        weight: +cs.fontWeight,
        text: el.textContent.trim().replace(/\s+/g, " ").slice(0, 40),
        rect: { x: Math.max(0, r.x), y: Math.max(0, r.y), width: Math.min(r.width, innerWidth - Math.max(0, r.x)), height: Math.min(r.height, innerHeight - Math.max(0, r.y)) },
      };
    }, selector);
    if (info.skip === "decorative") {
      results.decorative++;
      continue;
    }
    if (info.skip || info.rect.width < 2 || info.rect.height < 2) {
      results.unmeasured.push({ selector, reason: info.skip ?? "hors écran" });
      continue;
    }
    const png = (await page.screenshot({ clip: info.rect })).toString("base64");
    await page.evaluate(() => {
      for (const el of document.querySelectorAll("[data-contrast-hidden]")) {
        el.style.visibility = el.dataset.contrastHidden === "-" ? "" : el.dataset.contrastHidden;
        delete el.dataset.contrastHidden;
      }
    });
    const ratio = await page.evaluate(
      async ({ png, color, opacity }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + png;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width;
        c.height = img.height;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        const data = g.getImageData(0, 0, c.width, c.height).data;
        const m = color.match(/[\d.]+/g).map(Number);
        const fg = { r: m[0], g: m[1], b: m[2], a: (m[3] ?? 1) * opacity };
        // Couleur de fond dominante, en ignorant les pixels proches du texte.
        const counts = new Map();
        for (let i = 0; i < data.length; i += 4) {
          const [r, gg, b] = [data[i], data[i + 1], data[i + 2]];
          if (Math.abs(r - fg.r) + Math.abs(gg - fg.g) + Math.abs(b - fg.b) < 90) continue;
          const key = `${r >> 3},${gg >> 3},${b >> 3}`;
          const e = counts.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
          e.n++; e.r += r; e.g += gg; e.b += b;
          counts.set(key, e);
        }
        if (!counts.size) return null;
        const top = [...counts.values()].sort((x, y) => y.n - x.n)[0];
        const bg = { r: top.r / top.n, g: top.g / top.n, b: top.b / top.n };
        const blend = (k) => fg[k] * fg.a + bg[k] * (1 - fg.a);
        const lum = ({ r, g, b }) =>
          [r, g, b].map((v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
        const L1 = lum({ r: blend("r"), g: blend("g"), b: blend("b") });
        const L2 = lum(bg);
        return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      },
      { png, color: info.color, opacity: info.opacity },
    );
    if (ratio == null) {
      // Aucun pixel de fond distinct de la couleur du texte : à vérifier à l'œil.
      results.unmeasured.push({ selector, reason: "fond identique au texte", text: info.text });
      continue;
    }
    results.checked++;
    const large = info.size >= 24 || (info.size >= 18.66 && info.weight >= 700);
    const required = large ? 3 : 4.5;
    if (ratio < required) results.failures.push({ text: info.text, ratio: +ratio.toFixed(2), required, size: info.size });
  }
  return results;
}

async function audit([pagePath, width]) {
  const mobile = width < 768;
  const ctx = await browser.newContext({ viewport: { width, height: mobile ? 812 : 900 }, hasTouch: mobile, isMobile: mobile });
  const page = await ctx.newPage();
  await page.goto(baseUrl + pagePath, { waitUntil: "networkidle" });
  await revealAll(page);
  await page.addScriptTag({ path: axePath });

  const axe = await page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] } });
    const pick = (list) =>
      list.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 4).map((n) => ({ target: n.target.join(" "), summary: (n.failureSummary || "").split("\n").slice(0, 2).join(" ") })), count: v.nodes.length }));
    const incomplete = r.incomplete.filter((v) => v.id === "color-contrast").flatMap((v) => v.nodes.map((n) => n.target[0]));
    return { violations: pick(r.violations), incomplete: [...new Set(incomplete)] };
  });

  // Contrastes qu'axe ne sait pas calculer (texte sur dégradé, grain…) : mesure sur les pixels affichés.
  const contrast = await measureContrast(page, axe.incomplete);

  const strictTargets = pagePath === "/prestations";
  const custom = await page.evaluate((strict) => {
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return false;
      for (let e = el; e; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity < 0.05) return false;
      }
      return true;
    };
    const describe = (el) => `${el.tagName.toLowerCase()} «${(el.textContent || el.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 40)}»`;

    // Texte trop petit dans le contenu principal.
    // Les sur-titres décoratifs (police mono, ex. « (01) Inspirations ») sont exclus.
    const smallText = [];
    for (const el of document.querySelectorAll("main p, main li, main a, main button, main dd, main dt")) {
      // Exclus : sur-titres décoratifs en police mono, illustrations masquées (aria-hidden).
      if (!visible(el) || el.closest(".font-mono") || el.closest("[aria-hidden=true]") || !el.textContent.trim()) continue;
      // Paragraphes : 16 px minimum. Liens, boutons, étiquettes : 14 px minimum.
      const size = parseFloat(getComputedStyle(el).fontSize);
      const min = el.tagName === "P" ? 16 : 14;
      if (size < min) smallText.push({ el: describe(el), size, min });
    }

    // Cibles tactiles.
    const tooSmall = [];
    const notIdeal = [];
    for (const el of document.querySelectorAll("a[href], button, input, select, textarea, [role=button]")) {
      if (!visible(el) || el.closest("[aria-hidden=true]")) continue;
      // Lien au milieu d'une phrase : exempté par WCAG 2.5.8.
      const cs = getComputedStyle(el);
      if (cs.display === "inline" && el.parentElement && el.parentElement.textContent.trim() !== el.textContent.trim()) continue;
      const r = el.getBoundingClientRect();
      const box = { el: describe(el), w: Math.round(r.width), h: Math.round(r.height) };
      if (r.width < 24 || r.height < 24) tooSmall.push(box);
      else if (strict && el.closest("main") && (r.width < 44 || r.height < 44)) notIdeal.push(box);
    }
    return { smallText, tooSmall, notIdeal };
  }, strictTargets);

  await ctx.close();
  return { path: pagePath, width, axe, contrast, ...custom };
}

console.log(`Accessibilité — ${pages.length} pages × ${widths.length} largeurs sur ${baseUrl}\n`);
const results = (await runPool(pages.flatMap((p) => widths.map((w) => [p, w])), 3, audit)).map((r) =>
  r.job ? { path: r.job[0], width: r.job[1], error: r.error } : r,
);
await browser.close();
stop();
results.sort((a, b) => a.path.localeCompare(b.path) || a.width - b.width);
fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(results, null, 2));

let failures = 0;
for (const r of results) {
  const demo = isDemo(r.path);
  const issues = [];
  const warnings = [];
  if (r.error) issues.push(`erreur : ${r.error}`);
  for (const v of r.axe?.violations ?? []) {
    (demo ? warnings : issues).push(`[axe ${v.impact}] ${v.id} — ${v.help} (${v.count}×) : ${v.nodes.map((n) => n.target).join(" | ")}`);
  }
  for (const t of r.smallText ?? []) (demo ? warnings : issues).push(`texte ${t.size}px < ${t.min}px : ${t.el}`);
  for (const t of r.tooSmall ?? []) (demo ? warnings : issues).push(`cible ${t.w}×${t.h}px < 24px : ${t.el}`);
  for (const t of r.notIdeal ?? []) warnings.push(`cible ${t.w}×${t.h}px (44px recommandés) : ${t.el}`);
  for (const f of r.contrast?.failures ?? []) (demo ? warnings : issues).push(`contraste ${f.ratio}:1 < ${f.required}:1 (mesuré à l'écran) : «${f.text}»`);
  for (const u of r.contrast?.unmeasured ?? []) warnings.push(`contraste non mesuré (${u.reason}) : ${u.text ? `«${u.text}»` : u.selector}`);

  const tag = issues.length ? "✗" : warnings.length ? "!" : "✓";
  const measured = r.contrast?.checked ? `  · ${r.contrast.checked} contraste(s) mesuré(s) à l'écran${r.contrast.decorative ? `, ${r.contrast.decorative} décoratif(s) ignoré(s)` : ""}` : "";
  console.log(`${tag} ${r.path.padEnd(24)} ${String(r.width).padStart(4)}px${measured}${demo && warnings.length ? "  (démo : informatif)" : ""}`);
  for (const m of issues) console.log(`    ✗ ${m}`);
  for (const m of warnings.slice(0, demo ? 3 : 20)) console.log(`    ! ${m}`);
  if (demo && warnings.length > 3) console.log(`    … ${warnings.length - 3} autre(s) remarque(s) dans le rapport`);
  if (issues.length) failures++;
}
console.log(`\n${failures ? `✗ ${failures} combinaison(s) en échec` : "✓ Aucun problème bloquant"} — rapport : ${path.relative(process.cwd(), outDir)}/report.json`);
process.exit(failures ? 1 : 0);
