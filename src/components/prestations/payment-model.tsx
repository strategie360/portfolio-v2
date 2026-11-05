import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

const steps = [
  {
    title: "Un forfait de départ",
    text: "Vous payez un petit forfait pour la création du site. C'est tout pour commencer.",
  },
  {
    title: "Des règles fixées ensemble",
    text: "Avant de démarrer, on choisit ensemble ce qui compte pour vous : réservations, appels, demandes de devis ou ventes en ligne. Tout est écrit noir sur blanc.",
  },
  {
    title: "Un rapport chaque mois",
    text: "Chaque mois, vous recevez un rapport simple. Il montre ce que le site vous a apporté. Rien de compliqué à lire.",
  },
  {
    title: "Sur 12 mois",
    text: "La suite est payée selon ce que le site vous apporte vraiment, pendant 12 mois.",
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
              Vous payez selon ce que le site <em className="text-accent">vous apporte.</em>
            </span>
          }
          aside={<p className="text-base leading-relaxed text-ivory/80">Un site n&apos;a de valeur que s&apos;il vous amène du monde. Mon tarif suit cette logique.</p>}
        />

        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="flex flex-col rounded-[1.25rem] border border-line bg-ink p-6 sm:p-8">
              <span aria-hidden className="font-display text-5xl text-accent italic">
                {i + 1}
              </span>
              <h3 className="mt-6 text-xl font-medium">
                <span className="sr-only">Étape {i + 1} : </span>
                {s.title}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-ivory/80">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ivory/80">
            Je ne promets pas de chiffres : chaque commerce est différent. Le rapport mensuel montre simplement ce qui s&apos;est passé, et
            vous gardez toujours la main.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
