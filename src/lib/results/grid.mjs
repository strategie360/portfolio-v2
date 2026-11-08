/**
 * Grille du paiement selon les résultats : source unique pour la page
 * Prestations, le compteur et le rapport mensuel.
 * En .mjs pour être partagée avec les scripts Node (npm run results).
 */

export const RESULT_KINDS = {
  reservation: { label: "Réservations", rowLabel: "Une réservation prise sur le site", cents: 400 },
  "rendez-vous": { label: "Rendez-vous", rowLabel: "Un rendez-vous pris sur le site", cents: 250 },
  devis: { label: "Demandes de devis", rowLabel: "Une demande de devis reçue", cents: 1300 },
  vente: { label: "Ventes en ligne", rowLabel: "Une vente en ligne", percent: 8 },
};

export const MONTHLY_CAP_CENTS = 15000;
export const DURATION_MONTHS = 12;

export function formatEuros(cents) {
  const euros = cents / 100;
  const digits = Number.isInteger(euros) ? 0 : 2;
  return `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(euros)} €`;
}

/** Tarif d'un type de résultat, tel qu'il s'affiche au client. */
export function formatRate(kind) {
  const def = RESULT_KINDS[kind];
  return def.percent ? `${def.percent} % de la vente` : formatEuros(def.cents);
}

/** Ce que coûte un résultat, en centimes. */
export function eventCents({ kind, amountCents }) {
  const def = RESULT_KINDS[kind];
  return def.percent ? Math.round((amountCents * def.percent) / 100) : def.cents;
}

/**
 * Vérifie ce qu'envoie le site d'un client. Seuls le type, une référence et le
 * montant d'une vente sont gardés : jamais de nom, de téléphone ou d'e-mail.
 */
export function parseResultInput(body) {
  if (typeof body !== "object" || body === null) return { error: "Corps de requête invalide." };
  const { kind, ref, amountCents } = body;
  if (!Object.hasOwn(RESULT_KINDS, kind)) return { error: "Type de résultat inconnu." };
  if (typeof ref !== "string" || !/^[\w.-]{1,100}$/.test(ref)) return { error: "Référence invalide." };
  if (kind !== "vente") return { value: { kind, ref, amountCents: null } };
  if (!Number.isInteger(amountCents) || amountCents <= 0 || amountCents > 100_000_000) return { error: "Montant de la vente invalide." };
  return { value: { kind, ref, amountCents } };
}
