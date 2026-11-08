#!/usr/bin/env node
/** Vérifie le calcul du rapport, le compteur et ses protections. Sur le build de production. */
import assert from "node:assert/strict";
import { rmSync } from "node:fs";
import { join } from "node:path";
import { startServer } from "./lib.mjs";
import { parseResultInput } from "../src/lib/results/grid.mjs";
import { buildMonthlyReport, monthBounds, renderReportHtml } from "../src/lib/results/report.mjs";
import { createSupabaseStore, getStore, hashKey } from "../src/lib/results/store.mjs";

const client = { slug: "test", name: "Test & <Fils>", startsOn: "2026-01-15" };
const issuer = { name: "Tom", phone: "07", email: "a@b.c" };
const at = "2026-03-10T12:00:00.000Z";
const many = (kind, n, extra = {}) => Array.from({ length: n }, () => ({ kind, status: "compte", occurredAt: at, amountCents: null, ...extra }));
const report = (events, month = "2026-03") => buildMonthlyReport({ client, events, month });

let failed = 0;
async function test(name, fn) {
  try {
    await fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    failed++;
    console.log(`✗ ${name}\n    ${error.message}`);
  }
}

await test("Calcul : la grille s'applique à chaque type de résultat", () => {
  const r = report([...many("reservation", 3), ...many("rendez-vous", 2), ...many("devis", 1), ...many("vente", 1, { amountCents: 10000 })]);
  assert.equal(r.subtotalCents, 1200 + 500 + 1300 + 800);
  assert.equal(r.dueCents, 3800);
  assert.equal(r.contractMonth, 3);
});
await test("Calcul : le plafond de 150 € s'applique", () => {
  const r = report(many("reservation", 60));
  assert.equal(r.subtotalCents, 24000);
  assert.equal(r.dueCents, 15000);
  assert.ok(r.capped);
});
await test("Calcul : un mois sans résultat coûte 0 €", () => assert.equal(report([]).dueCents, 0));
await test("Calcul : un résultat écarté n'est pas facturé", () => {
  const r = report([...many("devis", 1), ...many("devis", 1, { status: "ecarte" })]);
  assert.equal(r.dueCents, 1300);
  assert.equal(r.rejectedCount, 1);
});
await test("Calcul : 8 % d'une vente arrondi au centime", () => assert.equal(report(many("vente", 1, { amountCents: 199 })).dueCents, 16));
await test("Calcul : le mois suit l'heure française", () => {
  const event = many("devis", 1, { occurredAt: "2026-03-31T22:30:00.000Z" });
  assert.equal(report(event, "2026-03").dueCents, 0);
  assert.equal(report(event, "2026-04").dueCents, 1300);
});
await test("Calcul : la période de 12 mois est respectée", () => {
  const event = (occurredAt) => many("devis", 1, { occurredAt });
  assert.equal(report(event("2026-12-10T12:00:00.000Z"), "2026-12").dueCents, 1300);
  const after = report(event("2027-01-10T12:00:00.000Z"), "2027-01");
  assert.equal(after.dueCents, 0);
  assert.equal(after.inContract, false);
  assert.equal(report(event("2025-12-10T12:00:00.000Z"), "2025-12").dueCents, 0);
});
await test("Rapport : le texte est lisible et le nom du client échappé", () => {
  const html = renderReportHtml(report(many("reservation", 30)), issuer);
  assert.match(html, /120 €/);
  assert.match(html, /mars 2026/);
  assert.match(html, /Test &amp; &lt;Fils&gt;/);
});
await test("Saisie : aucune donnée personnelle n'est conservée", () => {
  const { value } = parseResultInput({ kind: "devis", ref: "a1", name: "Jean", phone: "06" });
  assert.deepEqual(Object.keys(value).sort(), ["amountCents", "kind", "ref"]);
});
await test("Stockage : sans configuration, le compteur refuse de démarrer", () => assert.throws(() => getStore({})));
await test("Supabase : un doublon est ignoré et les colonnes sont traduites", async () => {
  const calls = [];
  const responses = [[], [{ client_slug: "x", ref: "r", kind: "devis", amount_cents: null, status: "compte", occurred_at: at }]];
  const store = createSupabaseStore("https://exemple", "cle", async (url, init) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(responses.shift()), { status: 200 });
  });
  assert.equal(await store.insertEvent({ clientSlug: "x", ref: "r", kind: "devis", amountCents: null, occurredAt: at }), false);
  assert.match(calls[0].init.headers.Prefer, /ignore-duplicates/);
  assert.equal(calls[0].init.headers.apikey, "cle");
  assert.equal(calls[0].init.headers.Authorization, undefined, "une clé sb_ ne va que dans apikey");
  assert.deepEqual(await store.listEvents("x", monthBounds("2026-03")), [{ clientSlug: "x", ref: "r", kind: "devis", amountCents: null, status: "compte", occurredAt: at }]);
});

// ── Compteur sur le serveur de production ─────────────────────────────
const file = join(process.cwd(), ".checks", "results-test.json");
rmSync(file, { force: true });
process.env.RESULTS_STORE = "file";
process.env.RESULTS_FILE = file;
const store = getStore();
const key = "cle-de-test";
await store.addClient({ ...client, keyHash: hashKey(key) });

const { baseUrl, stop } = await startServer(3101);
const post = (body, token = key) =>
  fetch(`${baseUrl}/api/resultats`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
const all = () => store.listEvents("test", { from: "2000", to: "3000" });

try {
  await test("Compteur : sans clé ou avec une mauvaise clé, rien n'est enregistré", async () => {
    assert.equal((await post({ kind: "devis", ref: "a" }, null)).status, 401);
    assert.equal((await post({ kind: "devis", ref: "a" }, "fausse")).status, 401);
    assert.equal((await all()).length, 0);
  });
  await test("Compteur : les données invalides sont refusées", async () => {
    assert.equal((await post({ kind: "inconnu", ref: "a" })).status, 400);
    assert.equal((await post({ kind: "constructor", ref: "a" })).status, 400);
    assert.equal((await post({ kind: "vente", ref: "a" })).status, 400);
    assert.equal((await post({ kind: "vente", ref: "a", amountCents: -5 })).status, 400);
    assert.equal((await post("pas du json")).status, 400);
    assert.equal((await all()).length, 0);
  });
  await test("Compteur : un résultat est enregistré une seule fois", async () => {
    assert.equal((await post({ kind: "devis", ref: "demande-1", name: "Jean Dupont" })).status, 201);
    const again = await post({ kind: "devis", ref: "demande-1" });
    assert.equal(again.status, 200);
    assert.deepEqual(await again.json(), { created: false });
    const events = await all();
    assert.equal(events.length, 1);
    assert.ok(!JSON.stringify(events).includes("Jean"));
  });
  await test("Compteur : la date vient du serveur, pas de l'envoyeur", async () => {
    await post({ kind: "devis", ref: "demande-2", occurredAt: "2001-01-01T00:00:00.000Z" });
    const event = (await all()).find((e) => e.ref === "demande-2");
    assert.ok(Date.now() - new Date(event.occurredAt).getTime() < 60_000);
  });
  await test("Compteur : on ne peut pas lire les résultats par l'adresse publique", async () => {
    assert.equal((await fetch(`${baseUrl}/api/resultats`)).status, 405);
  });
} finally {
  await stop();
  rmSync(file, { force: true });
}

console.log(failed ? `\n✗ ${failed} test(s) en échec` : "\n✓ Compteur et rapport vérifiés");
process.exit(failed ? 1 : 0);
