/**
 * Outils communs aux scripts de vérification (scripts/check-*.mjs) :
 * options en ligne de commande, découverte des pages, serveur, navigateur.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);

/** Lit `--nom valeur` ; renvoie `fallback` si absent. */
export function opt(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
}
export const flag = (name) => args.includes(`--${name}`);

/**
 * Toutes les pages du site : celles du portfolio (src/app/(portfolio)/…/page.tsx)
 * et chaque démo du registre. Une nouvelle page ou démo est donc testée d'office.
 */
export function discoverPages() {
  const root = "src/app/(portfolio)";
  const portfolio = fs
    .readdirSync(root, { recursive: true })
    .filter((f) => path.basename(f) === "page.tsx")
    .map((f) => "/" + path.dirname(f).split(path.sep).filter((s) => s !== "." && !s.startsWith("(")).join("/"))
    .map((p) => (p === "/" ? "/" : p.replace(/\/$/, "")))
    .sort();
  const registry = fs.readFileSync("src/demos/registry.ts", "utf8");
  const demos = [...registry.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => `/demos/${m[1]}`);
  return [...portfolio, ...demos];
}

export function selectedPages() {
  return opt("pages")?.split(",") ?? discoverPages();
}

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

/**
 * Utilise le serveur passé en `--url`, sinon lance `next start` sur le build existant.
 * Renvoie { baseUrl, stop }.
 */
export async function startServer(port = 3100) {
  const external = opt("url");
  if (external) {
    await waitFor(external);
    return { baseUrl: external.replace(/\/$/, ""), stop: () => {} };
  }
  if (!fs.existsSync(".next/BUILD_ID")) {
    console.error("Aucun build trouvé. Lancez d'abord `npm run build`.");
    process.exit(1);
  }
  const server = spawn("npx", ["next", "start", "-p", String(port)], { stdio: "ignore" });
  const stop = () => server.kill();
  process.on("exit", stop);
  const baseUrl = `http://localhost:${port}`;
  await waitFor(baseUrl);
  return { baseUrl, stop };
}

/** Lance Chrome installé (ou CHROME_PATH) en headless, avec WebGL logiciel pour la 3D. */
export async function launchBrowser() {
  const base = { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] };
  try {
    return await chromium.launch(process.env.CHROME_PATH ? { ...base, executablePath: process.env.CHROME_PATH } : { ...base, channel: "chrome" });
  } catch (e) {
    console.error("Impossible de lancer Chrome. Installez Google Chrome ou définissez CHROME_PATH.\n" + e.message);
    process.exit(1);
  }
}

/** Exécute des tâches avec une concurrence limitée. */
export async function runPool(jobs, concurrency, fn) {
  const results = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (next < jobs.length) {
        const job = jobs[next++];
        try {
          results.push(await fn(job));
        } catch (e) {
          results.push({ job, error: e.message.split("\n")[0] });
        }
      }
    }),
  );
  return results;
}

/** Fait défiler toute la page pour déclencher les animations d'apparition. */
export async function revealAll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.6) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  // Attendre que toutes les apparitions animées soient terminées (opacité finale).
  await page
    .waitForFunction(
      () => [...document.querySelectorAll("[style*=opacity]")].every((el) => +getComputedStyle(el).opacity >= 0.99 || el.closest("[aria-hidden=true]") || getComputedStyle(el).position === "fixed"),
      null,
      { timeout: 8000, polling: 200 },
    )
    .catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

export function prepareOutDir(name) {
  const dir = path.resolve(".checks", name);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export const pageSlug = (p) => (p === "/" ? "accueil" : p.split("/").filter(Boolean).join("-"));
