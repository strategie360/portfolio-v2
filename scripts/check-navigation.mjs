#!/usr/bin/env node
/**
 * Tests de parcours et de contenu (navigateur réel).
 *
 * - Menu ordinateur et mobile, page courante signalée, ancres, boutons.
 * - Tous les liens internes répondent et leurs ancres existent.
 * - Garde-fou contenu : sur la page Prestations, aucun prix autre que
 *   « à partir de 200 € » / « à partir de 500 € » le prix unique, l'hébergement et la grille des résultats validés.
 * - Focus clavier visible.
 *
 * Usage : npm run check:navigation   (option : --url)
 */
import assert from "node:assert/strict";
import { launchBrowser, startServer } from "./lib.mjs";

const { baseUrl, stop } = await startServer();
const browser = await launchBrowser();

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

async function withPage(width, fn) {
  const mobile = width < 768;
  const ctx = await browser.newContext({ viewport: { width, height: mobile ? 812 : 900 }, hasTouch: mobile, isMobile: mobile });
  const page = await ctx.newPage();
  try {
    await fn(page);
  } finally {
    await ctx.close();
  }
}

/** Attend (jusqu'à 4 s) que le défilement doux amène la section en haut de l'écran. */
async function expectInView(page, selector) {
  const inView = () => page.locator(selector).evaluate((el) => el.getBoundingClientRect().top);
  try {
    await page.waitForFunction((sel) => {
      const top = document.querySelector(sel)?.getBoundingClientRect().top ?? 9999;
      return top >= -5 && top < 220;
    }, selector, { timeout: 4000, polling: 100 });
  } catch {
    assert.fail(`${selector} devrait être en haut de l'écran (top = ${Math.round(await inView())}px)`);
  }
}

const text = (page) => page.evaluate(() => document.querySelector("main").innerText.replace(/\s+/g, " "));
const desktopNav = (page) => page.getByRole("navigation", { name: "Menu principal" }).first();

// ── Menu ordinateur ──────────────────────────────────────────────────────
test("Ordinateur : le menu contient les 4 liens attendus", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/");
    const links = await desktopNav(page).getByRole("link").evaluateAll((els) => els.map((a) => [a.textContent.trim(), a.getAttribute("href")]));
    assert.deepEqual(links, [
      ["Inspirations", "/#inspirations"],
      ["Prestations", "/prestations"],
      ["Sur mesure", "/prestations#sur-mesure"],
      ["Contact", "/#contact"],
    ]);
  }));

test("Ordinateur : « Prestations » ouvre la page et la signale comme page courante", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/");
    await desktopNav(page).getByRole("link", { name: "Prestations" }).click();
    await page.waitForURL("**/prestations");
    await assert.doesNotReject(page.getByRole("heading", { level: 1, name: /amène des clients/ }).waitFor());
    assert.equal(await desktopNav(page).getByRole("link", { name: "Prestations" }).getAttribute("aria-current"), "page");
    assert.equal(await page.title(), "Prestations · Tom Bartuzel");
  }));

test("Ordinateur : « Sur mesure » amène à la section « Vous faciliter la vie »", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/prestations");
    await desktopNav(page).getByRole("link", { name: "Sur mesure" }).click();
    await page.waitForURL("**/prestations#sur-mesure");
    await expectInView(page, "#sur-mesure");
    assert.ok(await page.getByRole("heading", { name: /Vous faciliter la vie/ }).isVisible());
  }));

test("Ordinateur : « Sur mesure » depuis l'accueil change de page et descend à la section", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/");
    await desktopNav(page).getByRole("link", { name: "Sur mesure" }).click();
    await page.waitForURL("**/prestations#sur-mesure");
    await expectInView(page, "#sur-mesure");
  }));

// ── Boutons de la page Prestations ───────────────────────────────────────
test("Prestations : « Voir les offres » descend aux deux offres", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/prestations");
    await page.getByRole("link", { name: "Voir les offres" }).click();
    await expectInView(page, "#offres");
  }));

test("Prestations : la carte Sur mesure mène aux exemples", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/prestations");
    await page.getByRole("link", { name: /Voir ce que je peux créer/ }).click();
    await expectInView(page, "#sur-mesure");
  }));

test("Prestations : tous les appels à l'action mènent au contact", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/prestations");
    for (const name of [/Parler de mon site/, /^Me contacter/]) {
      const links = page.getByRole("link", { name });
      const n = await links.count();
      assert.ok(n > 0, `aucun lien ${name}`);
      for (let i = 0; i < n; i++) assert.equal(await links.nth(i).getAttribute("href"), "#contact");
    }
    const mail = page.locator('#contact a[href^="mailto:"]');
    assert.equal(await mail.count(), 1, "le contact doit proposer un lien e-mail");
  }));

test("Accueil : le bandeau mène à la page Prestations", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/");
    await page.getByRole("link", { name: /Voir les prestations/ }).click();
    await page.waitForURL("**/prestations");
  }));

// ── Contenu ─────────────────────────────────────────────────────────────
test("Contenu : seuls les prix de création et d'hébergement validés apparaissent", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/prestations");
    const t = await text(page);
    const prices = [...t.matchAll(/\d[\d\s.,]*\s?€/g)].map((m) => m[0].replace(/\s/g, " ").trim());
    assert.ok(prices.length > 0, "aucun prix trouvé");
    for (const p of prices) assert.ok(["200 €", "500 €", "800 €", "2 000 €", "20 €", "40 €", "4 €", "2,50 €", "13 €", "150 €", "120 €", "0 €"].includes(p), `prix inattendu : « ${p} »`);
    assert.match(t, /à partir de 200 €/);
    assert.match(t, /à partir de 500 €/);
    assert.match(t, /20 € par mois/);
    assert.match(t, /40 € par mois/);
    assert.match(t, /6 mois d'hébergement offerts/);
    assert.deepEqual([...t.matchAll(/[\d,]+\s?%/g)].map((m) => m[0].replace(/\s/g, " ")), ["8 %"], "seul le taux de 8 % doit apparaître");
    assert.doesNotMatch(t, /garanti|promis/i, "aucune promesse de résultat");
  }));

test("Contenu : le modèle de paiement, le domaine et les emplacements à compléter sont présents", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/prestations");
    const t = await text(page);
    for (const s of ["facturés à part", "12 mois", "rapport", "réservations, rendez-vous, demandes de devis ou ventes en ligne", "Votre charte graphique est reprise et incluse", "Le prix dépend de votre demande", "Parlons de ce qui vous pèse dans la semaine.", "Exemple imaginé"]) {
      assert.ok(t.includes(s), `texte manquant : « ${s} »`);
    }
    const marks = await page.locator("main mark").count();
    const placeholders = t.match(/\[À COMPLÉTER/g)?.length ?? 0;
    assert.equal(marks, placeholders, "chaque emplacement à compléter doit être surligné");
    assert.equal(await page.locator('main a[href="tel:0775766329"]').count(), 1, "le téléphone doit être cliquable");
  }));

test("Contenu : l'accueil n'affiche plus de délai chiffré", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/");
    const t = await text(page);
    assert.doesNotMatch(t, /Semaines? \d|sous 24 h|5 à 8 pages/);
  }));

test("Contenu : l'accueil parle simplement aux commerçants", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/");
    const t = await text(page);
    assert.doesNotMatch(t, /moodboard|headless|Core Web Vitals|Next\.js|haute fidélité|arborescence|sur-mesure/i);
    assert.match(t, /exemples imaginés/);
    assert.match(t, /sous 48 h/);
    assert.equal(await page.locator('main a[href="tel:0775766329"]').count(), 1, "le téléphone doit être cliquable");
    assert.equal(await page.locator("main mark").count(), 0, "plus aucun emplacement à compléter sur l'accueil");
  }));

test("Pied de page : mentions légales présentes, aucun réseau social", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/");
    await page.locator("footer").getByRole("link", { name: "Mentions légales" }).click();
    await page.waitForURL("**/mentions-legales");
    assert.match(await text(page), /Vercel Inc\./);
    assert.equal(await page.locator('footer a[href*="linkedin"], footer a[href*="instagram"], footer a[href*="github"]').count(), 0);
  }));

test("Sur mesure : l'exemple de suivi de stock réagit", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/prestations#sur-mesure");
    const summary = page.locator("#sur-mesure [aria-live]");
    assert.equal(await summary.textContent(), "1 produit à recommander.");
    const remove = page.getByRole("button", { name: "Retirer : Croissants" });
    await remove.click();
    await remove.click();
    assert.equal(await summary.textContent(), "2 produits à recommander.");
  }));

// ── Mobile ──────────────────────────────────────────────────────────────
test("Mobile : le bouton « Menu » ouvre et ferme le menu", () =>
  withPage(375, async (page) => {
    await page.goto(baseUrl + "/prestations");
    const button = page.getByRole("button", { name: "Menu" });
    const box = await button.boundingBox();
    assert.ok(box.height >= 44, `bouton Menu trop petit (${Math.round(box.height)}px)`);
    assert.equal(await button.getAttribute("aria-expanded"), "false");
    await button.tap();
    const menu = page.locator("#mobile-nav");
    await menu.waitFor();
    assert.equal(await page.getByRole("button", { name: "Fermer" }).getAttribute("aria-expanded"), "true");
    assert.equal(await menu.getByRole("link").count(), 4);
    assert.equal(await menu.getByRole("link", { name: "Prestations" }).getAttribute("aria-current"), "page");
    await menu.getByRole("link", { name: "Sur mesure" }).tap();
    await page.waitForURL("**/prestations#sur-mesure");
    await menu.waitFor({ state: "detached" });
    await expectInView(page, "#sur-mesure");
  }));

test("Mobile : les deux offres sont empilées et leurs boutons prennent toute la largeur", () =>
  withPage(375, async (page) => {
    await page.goto(baseUrl + "/prestations");
    const cards = page.locator("#offres article");
    assert.equal(await cards.count(), 2);
    const [a, b] = [await cards.nth(0).boundingBox(), await cards.nth(1).boundingBox()];
    assert.ok(b.y > a.y + a.height - 1, "les offres doivent être l'une sous l'autre");
    // Le bouton occupe toute la largeur utile de la carte (moins ses marges intérieures).
    const inner = await cards.nth(0).evaluate((el) => {
      const cs = getComputedStyle(el);
      return el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    });
    const btn = await page.getByRole("link", { name: /Parler de mon site/ }).boundingBox();
    assert.ok(Math.abs(btn.width - inner) < 2 && btn.height >= 48, `bouton ${Math.round(btn.width)}×${Math.round(btn.height)} pour ${Math.round(inner)}px utiles`);
  }));

test("Ordinateur : les deux offres sont côte à côte", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/prestations");
    const cards = page.locator("#offres article");
    const [a, b] = [await cards.nth(0).boundingBox(), await cards.nth(1).boundingBox()];
    assert.ok(Math.abs(a.y - b.y) < 2 && b.x > a.x + a.width - 1, "les offres doivent être côte à côte");
    assert.ok(Math.abs(a.height - b.height) < 2, "les deux cartes doivent avoir la même hauteur");
  }));

// ── Clavier ─────────────────────────────────────────────────────────────
test("Clavier : le focus est visible sur les liens", () =>
  withPage(1280, async (page) => {
    await page.goto(baseUrl + "/prestations");
    await page.keyboard.press("Tab");
    const first = await page.evaluate(() => {
      const el = document.activeElement;
      const cs = getComputedStyle(el);
      return { tag: el.tagName, href: el.getAttribute("href"), outline: cs.outlineStyle, width: cs.outlineWidth };
    });
    assert.equal(first.href, "/", "le premier élément focalisable doit être le logo");
    assert.notEqual(first.outline, "none", "le contour de focus doit être visible");
  }));

// ── Liens internes ──────────────────────────────────────────────────────
test("Liens : tous les liens internes répondent et leurs ancres existent", () =>
  withPage(1280, async (page) => {
    const pagesToScan = ["/", "/prestations"];
    const links = new Set();
    for (const p of pagesToScan) {
      await page.goto(baseUrl + p);
      const hrefs = await page.locator("a[href]").evaluateAll((els) => els.map((a) => a.getAttribute("href")));
      for (const h of hrefs) {
        if (h.startsWith("#")) links.add(p + h);
        else if (h.startsWith("/")) links.add(h);
      }
    }
    for (const link of links) {
      const [route, hash] = link.split("#");
      // Le HTML suffit pour vérifier le statut et la présence de l'ancre (rendu serveur).
      const res = await page.goto(baseUrl + (route || "/"), { waitUntil: "domcontentloaded", timeout: 60000 });
      assert.equal(res.status(), 200, `${route} → ${res.status()}`);
      if (hash) assert.equal(await page.locator(`#${hash}`).count(), 1, `ancre introuvable : ${link}`);
    }
  }));

// ── Exécution ───────────────────────────────────────────────────────────
console.log(`Parcours et contenu — ${tests.length} tests sur ${baseUrl}\n`);
let failed = 0;
for (const t of tests) {
  try {
    await t.fn();
    console.log(`✓ ${t.name}`);
  } catch (e) {
    failed++;
    console.log(`✗ ${t.name}\n    ${e.message.split("\n").slice(0, 3).join("\n    ")}`);
  }
}
await browser.close();
stop();
console.log(`\n${failed ? `✗ ${failed} test(s) en échec sur ${tests.length}` : `✓ ${tests.length} tests réussis`}`);
process.exit(failed ? 1 : 0);
