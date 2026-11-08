import { parseResultInput } from "@/lib/results/grid.mjs";
import { getStore, hashKey } from "@/lib/results/store.mjs";

const fail = (error: string, status: number) => Response.json({ error }, { status });

/**
 * Enregistre un résultat envoyé par le serveur du site d'un client.
 * La clé du client ne doit jamais apparaître dans le navigateur : sinon
 * n'importe qui pourrait gonfler ses résultats.
 */
export async function POST(request: Request) {
  const key = request.headers.get("authorization")?.match(/^Bearer (\S+)$/)?.[1];
  if (!key) return fail("Clé manquante.", 401);

  try {
    const store = getStore();
    const client = await store.findClientByKeyHash(hashKey(key));
    if (!client) return fail("Clé invalide.", 401);

    const body: unknown = await request.json().catch(() => null);
    const parsed = parseResultInput(body);
    if (!parsed.value) return fail(parsed.error ?? "Requête invalide.", 400);

    const created = await store.insertEvent({ ...parsed.value, clientSlug: client.slug, occurredAt: new Date().toISOString() });
    return Response.json({ created }, { status: created ? 201 : 200 });
  } catch (error) {
    console.error("Compteur de résultats :", error);
    return fail("Compteur indisponible.", 503);
  }
}
