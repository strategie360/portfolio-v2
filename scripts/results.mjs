#!/usr/bin/env node
/**
 * Gère le compteur de résultats et produit les rapports mensuels.
 *
 *   npm run results -- add-client --slug boulangerie --name "Boulangerie X" --start 2026-12-01
 *   npm run results -- reject --client boulangerie --ref commande-42
 *   npm run results -- restore --client boulangerie --ref commande-42
 *   npm run results -- report --client boulangerie [--month 2026-11]
 */
import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "../src/config/site.ts";
import { buildMonthlyReport, monthBounds, monthKey, previousMonth, renderReportHtml } from "../src/lib/results/report.mjs";
import { getStore, hashKey } from "../src/lib/results/store.mjs";

const [command, ...args] = process.argv.slice(2);

function opt(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
}

function required(name) {
  const value = opt(name);
  if (!value) throw new Error(`Option manquante : --${name}`);
  return value;
}

async function requireClient(store) {
  const slug = required("client");
  const client = await store.getClient(slug);
  if (!client) throw new Error(`Client inconnu : ${slug}`);
  return client;
}

const commands = {
  async "add-client"(store) {
    const slug = required("slug");
    if (!/^[a-z0-9-]+$/.test(slug)) throw new Error("Le slug ne peut contenir que des minuscules, des chiffres et des tirets.");
    const startsOn = required("start");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startsOn)) throw new Error("La date de début doit être au format AAAA-MM-JJ.");
    const key = randomBytes(32).toString("hex");
    await store.addClient({ slug, name: required("name"), startsOn, keyHash: hashKey(key) });
    console.log(`Client ajouté. Clé à mettre dans RESULTS_API_KEY sur son site (elle ne sera plus affichée) :\n${key}`);
  },
  async reject(store) {
    await setStatus(store, "ecarte");
  },
  async restore(store) {
    await setStatus(store, "compte");
  },
  async report(store) {
    const client = await requireClient(store);
    const month = opt("month") ?? previousMonth(monthKey(new Date()));
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw new Error("Le mois doit être au format AAAA-MM.");
    const events = await store.listEvents(client.slug, monthBounds(month));
    const report = buildMonthlyReport({ client, events, month });
    mkdirSync(".reports", { recursive: true });
    const path = join(".reports", `${client.slug}-${month}.html`);
    writeFileSync(path, renderReportHtml(report, site));
    console.log(`Rapport créé : ${path}`);
  },
};

async function setStatus(store, status) {
  const client = await requireClient(store);
  const ref = required("ref");
  if (!(await store.setEventStatus(client.slug, ref, status))) throw new Error(`Résultat introuvable : ${ref}`);
  console.log(status === "ecarte" ? `Écarté : ${ref}` : `Compté de nouveau : ${ref}`);
}

try {
  if (!Object.hasOwn(commands, command)) throw new Error(`Commandes : ${Object.keys(commands).join(", ")}`);
  await commands[command](getStore());
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
