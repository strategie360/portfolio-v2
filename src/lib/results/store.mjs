import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export const hashKey = (key) => createHash("sha256").update(key).digest("hex");

/** Stockage dans un fichier : développement et tests uniquement. */
function fileStore(path) {
  async function load() {
    try {
      return JSON.parse(await readFile(path, "utf8"));
    } catch (error) {
      if (error.code === "ENOENT") return { clients: [], events: [] };
      throw error;
    }
  }
  async function save(data) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, JSON.stringify(data, null, 2));
  }
  return {
    async addClient(client) {
      const data = await load();
      if (data.clients.some((c) => c.slug === client.slug)) throw new Error(`Le client « ${client.slug} » existe déjà.`);
      data.clients.push(client);
      await save(data);
    },
    async getClient(slug) {
      return (await load()).clients.find((c) => c.slug === slug) ?? null;
    },
    async findClientByKeyHash(keyHash) {
      return (await load()).clients.find((c) => c.keyHash === keyHash) ?? null;
    },
    async insertEvent(event) {
      const data = await load();
      if (data.events.some((e) => e.clientSlug === event.clientSlug && e.ref === event.ref)) return false;
      data.events.push({ ...event, status: "compte" });
      await save(data);
      return true;
    },
    async listEvents(clientSlug, { from, to }) {
      return (await load()).events.filter((e) => e.clientSlug === clientSlug && e.occurredAt >= from && e.occurredAt < to);
    },
    async setEventStatus(clientSlug, ref, status) {
      const data = await load();
      const event = data.events.find((e) => e.clientSlug === clientSlug && e.ref === ref);
      if (!event) return false;
      event.status = status;
      await save(data);
      return true;
    },
  };
}

const PAGE_SIZE = 1000;

/** Stockage Supabase par son API REST, sans dépendance. Clé secrète (sb_secret_…) : côté serveur uniquement, dans `apikey`. */
function supabaseStore(url, secretKey, fetchImpl = fetch) {
  async function request(path, init = {}) {
    const response = await fetchImpl(`${url}/rest/v1/${path}`, {
      ...init,
      headers: { apikey: secretKey, "Content-Type": "application/json", ...init.headers },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Supabase a répondu ${response.status} : ${await response.text()}`);
    return response.status === 204 ? [] : response.json();
  }
  const toClient = (row) => row && { slug: row.slug, name: row.name, startsOn: row.starts_on, keyHash: row.key_hash };
  const toEvent = (row) => ({
    clientSlug: row.client_slug,
    ref: row.ref,
    kind: row.kind,
    amountCents: row.amount_cents,
    status: row.status,
    occurredAt: row.occurred_at,
  });
  const q = encodeURIComponent;
  return {
    async addClient({ slug, name, startsOn, keyHash }) {
      await request("result_clients", { method: "POST", body: JSON.stringify({ slug, name, starts_on: startsOn, key_hash: keyHash }) });
    },
    async getClient(slug) {
      return toClient((await request(`result_clients?slug=eq.${q(slug)}&limit=1`))[0]) ?? null;
    },
    async findClientByKeyHash(keyHash) {
      return toClient((await request(`result_clients?key_hash=eq.${q(keyHash)}&limit=1`))[0]) ?? null;
    },
    async insertEvent({ clientSlug, ref, kind, amountCents, occurredAt }) {
      const rows = await request("result_events?on_conflict=client_slug,ref", {
        method: "POST",
        headers: { Prefer: "resolution=ignore-duplicates,return=representation" },
        body: JSON.stringify({ client_slug: clientSlug, ref, kind, amount_cents: amountCents, occurred_at: occurredAt }),
      });
      return rows.length > 0;
    },
    async listEvents(clientSlug, { from, to }) {
      const events = [];
      for (let offset = 0; ; offset += PAGE_SIZE) {
        const page = await request(
          `result_events?client_slug=eq.${q(clientSlug)}&occurred_at=gte.${q(from)}&occurred_at=lt.${q(to)}&order=id&limit=${PAGE_SIZE}&offset=${offset}`,
        );
        events.push(...page.map(toEvent));
        if (page.length < PAGE_SIZE) return events;
      }
    },
    async setEventStatus(clientSlug, ref, status) {
      const rows = await request(`result_events?client_slug=eq.${q(clientSlug)}&ref=eq.${q(ref)}`, {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({ status }),
      });
      return rows.length > 0;
    },
  };
}

export const createSupabaseStore = supabaseStore;

/** Choisit le stockage selon l'environnement. Sans configuration, le compteur refuse de démarrer. */
export function getStore(env = process.env) {
  if (env.RESULTS_STORE === "file" && env.RESULTS_FILE) return fileStore(env.RESULTS_FILE);
  if (env.SUPABASE_URL && env.SUPABASE_SECRET_KEY) return supabaseStore(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
  throw new Error("Compteur non configuré : renseignez SUPABASE_URL et SUPABASE_SECRET_KEY.");
}
