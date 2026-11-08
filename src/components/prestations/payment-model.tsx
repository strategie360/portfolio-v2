import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { MONTHLY_CAP_CENTS, RESULT_KINDS, formatEuros, formatRate } from "@/lib/results/grid.mjs";

const cap = formatEuros(MONTHLY_CAP_CENTS);

const formulas = [
  {
    name: "Selon les résultats",
    pitch: "Moins à payer au départ. Ensuite, vous payez seulement quand le site vous apporte quelque chose.",
    prices: ["Site vitrine : à partir de 200 €", "Outil sur mesure : à partir de 500 €"],
    note: `Puis, pendant 12 mois, selon la grille ci-dessous. Jamais plus de ${cap} par mois.`,
  },
  {
    name: "En une seule fois",
    pitch: "Vous préférez un prix fixe ? Vous payez la création une fois, et c'est terminé.",
    prices: ["Site vitrine : à partir de 800 €", "Outil sur mesure : à partir de 2\u00a0000\u00a0€"],
    note: "Pas de grille ni de rapport mensuel.",
  },
];

const steps = [
  { title: "Vous payez la création", text: "Le forfait de départ, une seule fois." },
  {
    title: "On choisit ce qu'on compte",
    text: "Avant de démarrer, on choisit ensemble ce qui compte pour vous : réservations, rendez-vous, demandes de devis ou ventes en ligne. Tout est écrit noir sur blanc.",
  },
  { title: "Un rapport chaque mois", text: "Chaque mois, vous recevez un rapport simple. Il montre ce que le site vous a apporté." },
  { title: "12 mois, puis c'est terminé", text: "Pendant 12 mois, vous payez selon la grille. Ensuite, ce paiement s'arrête." },
];

const rates = Object.entries(RESULT_KINDS).map(([kind, def]) => ({ result: def.rowLabel, amount: formatRate(kind as keyof typeof RESULT_KINDS) }));

const answers = [
  {
    question: "Et si le site ne m'apporte rien ?",
    answer: "Selon les résultats, vous ne payez rien de plus que le forfait de création et la maintenance (nom de domaine et hébergement).",
  },
  {
    question: "Qu'est-ce qui compte comme résultat ?",
    answer: "Seulement une vraie demande, enregistrée par le site, qui concerne votre métier. Un message indésirable ne compte pas.",
  },
  {
    question: "Et après les 12 mois ?",
    answer: "Le paiement selon les résultats s'arrête. Le site reste à vous tant que l'hébergement est payé.",
  },
  {
    question: "Et pour un outil sur mesure ?",
    answer: "Le même principe s'applique quand c'est possible. On décide ensemble ce qu'on compte.",
  },
];

export function PaymentModel() {
  return (
    <section id="paiement" aria-labelledby="paiement-titre" className="scroll-mt-20 border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="(02) Paiement"
          title={
            <span id="paiement-titre">
              Deux façons de payer, <em className="text-accent">à vous de choisir.</em>
            </span>
          }
        />

        <div className="grid gap-4 md:grid-cols-2">
          {formulas.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.08} className="rounded-[1.25rem] border border-line bg-ink p-6 sm:p-8">
              <h3 className="font-display text-3xl md:text-4xl">{f.name}</h3>
              <p className="mt-3 text-lg leading-relaxed text-ivory/80">{f.pitch}</p>
              <ul className="mt-6 space-y-2 text-lg font-medium">
                {f.prices.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="mt-4 text-lg leading-relaxed text-ivory/80">{f.note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mt-16 font-display text-3xl md:text-4xl">Selon les résultats : comment ça marche</h3>
        </Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="flex flex-col rounded-[1.25rem] border border-line bg-ink p-6 sm:p-8">
              <span aria-hidden className="font-display text-5xl text-accent italic">
                {i + 1}
              </span>
              <h4 className="mt-6 text-xl font-medium">
                <span className="sr-only">Étape {i + 1} : </span>
                {s.title}
              </h4>
              <p className="mt-3 text-lg leading-relaxed text-ivory/80">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Reveal className="rounded-[1.25rem] border border-line bg-ink p-6 sm:p-8">
            <table className="w-full text-left text-lg">
              <caption className="pb-4 text-left font-display text-3xl">La grille</caption>
              <thead>
                <tr className="text-base text-ivory/80">
                  <th scope="col" className="pb-2 pr-4 font-normal">
                    Ce que le site vous apporte
                  </th>
                  <th scope="col" className="pb-2 text-right font-normal">
                    Vous payez
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line border-y border-line">
                {rates.map((r) => (
                  <tr key={r.result}>
                    <th scope="row" className="py-3 pr-4 font-normal text-ivory/80">
                      {r.result}
                    </th>
                    <td className="py-3 text-right font-medium">{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-lg leading-relaxed text-ivory/80">Jamais plus de {cap} par mois. Aucun résultat : 0 €.</p>
          </Reveal>

          <Reveal delay={0.08} className="rounded-[1.25rem] border border-dashed border-ivory/25 p-6 sm:p-8">
            <h4 className="font-display text-3xl">Un exemple pour comprendre</h4>
            <ul className="mt-4 space-y-3 text-lg leading-relaxed text-ivory/80">
              <li>Un restaurant reçoit 30 réservations par son site dans le mois : il paie 30 × 4 €, soit 120 €.</li>
              <li>Un mois sans réservation : il ne paie rien.</li>
              <li>Un très bon mois, avec 60 réservations : il paie {cap}, pas plus.</li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <dl className="mt-4 grid gap-4 md:grid-cols-2">
            {answers.map((a) => (
              <div key={a.question} className="rounded-[1.25rem] border border-line bg-ink p-6 sm:p-8">
                <dt className="text-xl font-medium">{a.question}</dt>
                <dd className="mt-3 text-lg leading-relaxed text-ivory/80">{a.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ivory/80">
            Ces chiffres servent à comprendre le calcul. Je ne promets pas de résultat : chaque commerce est différent.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
