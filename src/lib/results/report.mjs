import { DURATION_MONTHS, MONTHLY_CAP_CENTS, RESULT_KINDS, eventCents, formatEuros, formatRate } from "./grid.mjs";

const parisMonth = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit" });

/** Mois « AAAA-MM » d'une date, à l'heure française. */
export function monthKey(date) {
  const parts = parisMonth.formatToParts(new Date(date));
  return `${parts.find((p) => p.type === "year").value}-${parts.find((p) => p.type === "month").value}`;
}

export function previousMonth(month) {
  const [year, m] = month.split("-").map(Number);
  return m === 1 ? `${year - 1}-12` : `${year}-${String(m - 1).padStart(2, "0")}`;
}

/** Bornes larges (un jour de marge) pour interroger la base avant de filtrer à l'heure française. */
export function monthBounds(month) {
  const [year, m] = month.split("-").map(Number);
  return { from: new Date(Date.UTC(year, m - 1, 0)).toISOString(), to: new Date(Date.UTC(year, m, 2)).toISOString() };
}

const index = (month) => {
  const [year, m] = month.split("-").map(Number);
  return year * 12 + m;
};

function monthLabel(month) {
  const [year, m] = month.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, m - 1, 15)));
}

/** Calcule le rapport d'un mois. Le mois du début du contrat compte comme le mois 1. */
export function buildMonthlyReport({ client, events, month }) {
  const contractMonth = index(month) - index(client.startsOn.slice(0, 7)) + 1;
  const inContract = contractMonth >= 1 && contractMonth <= DURATION_MONTHS;
  const ofMonth = events.filter((e) => monthKey(e.occurredAt) === month);
  const counted = ofMonth.filter((e) => e.status === "compte");
  const lines = Object.entries(RESULT_KINDS).map(([kind, def]) => {
    const items = counted.filter((e) => e.kind === kind);
    return { kind, label: def.label, rate: formatRate(kind), count: items.length, amountCents: items.reduce((sum, e) => sum + eventCents(e), 0) };
  });
  const subtotalCents = lines.reduce((sum, l) => sum + l.amountCents, 0);
  const dueCents = inContract ? Math.min(subtotalCents, MONTHLY_CAP_CENTS) : 0;
  return {
    client,
    month,
    monthLabel: monthLabel(month),
    contractMonth,
    inContract,
    lines,
    rejectedCount: ofMonth.length - counted.length,
    subtotalCents,
    dueCents,
    capped: inContract && subtotalCents > MONTHLY_CAP_CENTS,
  };
}

const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function summary(report) {
  if (!report.inContract) return report.contractMonth < 1 ? "Le paiement selon les résultats n'a pas encore commencé." : "Le paiement selon les résultats est terminé. Il n'y a rien à payer.";
  if (report.subtotalCents === 0) return "Aucun résultat ce mois-ci : il n'y a rien à payer.";
  if (report.capped) return `Le calcul donne ${formatEuros(report.subtotalCents)}. Vous ne payez jamais plus de ${formatEuros(MONTHLY_CAP_CENTS)} par mois.`;
  return "Ce montant correspond aux résultats apportés par votre site ce mois-ci.";
}

/** Rapport en une page, lisible et imprimable, à envoyer au client. */
export function renderReportHtml(report, issuer) {
  const rows = report.lines
    .filter((l) => l.count > 0)
    .map((l) => `<tr><th scope="row">${escapeHtml(l.label)}</th><td>${l.count}</td><td>${l.rate}</td><td>${formatEuros(l.amountCents)}</td></tr>`)
    .join("");
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rapport de ${escapeHtml(report.monthLabel)} — ${escapeHtml(report.client.name)}</title>
<style>
  body { margin: 0; background: #fff; color: #1c1b1a; font: 18px/1.5 system-ui, sans-serif; }
  main { max-width: 680px; margin: 0 auto; padding: 48px 24px; }
  h1 { margin: 0; font-size: 34px; line-height: 1.15; }
  .muted { color: #5c5954; }
  .total { margin: 32px 0; padding: 24px; border: 2px solid #1c1b1a; border-radius: 12px; }
  .total strong { display: block; font-size: 44px; line-height: 1.2; }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 12px 8px 12px 0; border-bottom: 1px solid #d8d4cd; text-align: left; font-weight: 400; }
  thead th { color: #5c5954; font-size: 16px; }
  td:last-child, thead th:last-child { padding-right: 0; text-align: right; font-weight: 600; }
  footer { margin-top: 40px; font-size: 16px; }
</style>
</head>
<body>
<main>
  <p class="muted">${escapeHtml(report.client.name)}${report.inContract ? ` · Mois ${report.contractMonth} sur ${DURATION_MONTHS}` : ""}</p>
  <h1>Votre rapport de ${escapeHtml(report.monthLabel)}</h1>
  <div class="total">
    À payer ce mois-ci
    <strong>${formatEuros(report.dueCents)}</strong>
    ${escapeHtml(summary(report))}
  </div>
  ${
    rows
      ? `<table><caption hidden>Détail des résultats</caption><thead><tr><th scope="col">Ce que le site a apporté</th><th scope="col">Nombre</th><th scope="col">Tarif</th><th scope="col">Total</th></tr></thead><tbody>${rows}</tbody></table>`
      : ""
  }
  ${report.rejectedCount > 0 ? `<p class="muted">${report.rejectedCount === 1 ? "1 demande non valable a été écartée : elle n'est pas comptée." : `${report.rejectedCount} demandes non valables ont été écartées : elles ne sont pas comptées.`}</p>` : ""}
  <footer class="muted">
    <p>L'hébergement et le nom de domaine sont facturés à part. Ce rapport n'est pas une facture.</p>
    <p>Une question ? ${escapeHtml(issuer.name)} · ${escapeHtml(issuer.phone)} · ${escapeHtml(issuer.email)}</p>
  </footer>
</main>
</body>
</html>
`;
}
