import { ButtonLink } from "@/components/ui/button-link";
import { Fill } from "@/components/ui/fill";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

type Offer = {
  id: string;
  name: string;
  price: string;
  flatPrice: string;
  pitch: string;
  includes: string[];
  notes: string[];
  delay: string;
  cta: { label: string; href: string };
};

const offers: Offer[] = [
  {
    id: "vitrine",
    name: "Site vitrine",
    price: "200 €",
    flatPrice: "800 €",
    pitch: "Un site qui donne envie de venir chez vous, ou de vous contacter.",
    includes: [
      "Un site de 3 pages, créé pour vous",
      "Votre offre, avec vos photos et vos textes",
      "Vos horaires et comment venir",
      "Les avis de vos clients",
      "Un bouton pour vous appeler en un geste",
      "Un formulaire de contact ou la réservation en ligne",
    ],
    notes: ["Votre charte graphique est reprise et incluse.", "Une demande particulière ? C'est possible, on en discute."],
    delay: "Délai : 1 semaine, une fois vos photos et vos textes reçus",
    cta: { label: "Parler de mon site", href: "#contact" },
  },
  {
    id: "sur-mesure-offre",
    name: "Sur mesure",
    price: "500 €",
    flatPrice: "2\u00a0000\u00a0€",
    pitch: "Pas un site : un outil fait pour votre commerce, qui vous fait gagner du temps.",
    includes: ["Suivi de stock", "Commandes et réservations au même endroit", "Tableau de bord de votre semaine"],
    notes: ["Le prix dépend de votre demande."],
    delay: "Délai : selon votre demande",
    cta: { label: "Voir ce que je peux créer", href: "#sur-mesure" },
  },
];

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article aria-labelledby={`offre-${offer.id}`} className="flex h-full flex-col rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8 md:p-10">
      <h3 id={`offre-${offer.id}`} className="font-display text-4xl md:text-5xl">
        {offer.name}
      </h3>
      <p className="mt-4 flex flex-wrap items-baseline gap-x-2 text-ivory">
        <span className="text-lg text-ivory/80">à partir de</span>
        <span className="font-display text-5xl text-accent md:text-6xl">{offer.price}</span>
      </p>
      <p className="mt-2 text-lg text-ivory/80">
        puis selon les résultats, ou à partir de <span className="font-medium text-ivory">{offer.flatPrice}</span> en une seule fois
      </p>
      <p className="mt-6 text-lg leading-relaxed text-ivory/90 md:text-xl">{offer.pitch}</p>

      <ul className="mt-8 space-y-3 border-t border-line pt-8">
        {offer.includes.map((item) => (
          <li key={item} className="flex gap-3 text-lg leading-snug">
            <span aria-hidden className="mt-0.5 text-accent">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-2 text-base leading-relaxed text-ivory/80 md:text-lg">
        {offer.notes.map((n) => (
          <p key={n}>{n}</p>
        ))}
        <p>
          <Fill>{offer.delay}</Fill>
        </p>
      </div>

      <div className="mt-auto pt-10">
        <ButtonLink href={offer.cta.href} className="w-full sm:w-auto">
          {offer.cta.label} <span aria-hidden>→</span>
        </ButtonLink>
      </div>
    </article>
  );
}

export function Offers() {
  return (
    <section id="offres" aria-labelledby="offres-titre" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-20 md:px-10 md:py-28">
      <SectionHeading
        eyebrow="(01) Deux offres"
        title={
          <span id="offres-titre">
            Un site pour vous faire connaître, <em className="text-accent">un outil</em> pour vous aider.
          </span>
        }
      />
      <Reveal className="mb-6 rounded-[1.25rem] border border-accent/50 p-6 sm:p-8">
        <p className="font-display text-3xl leading-tight md:text-4xl">
          Pour mes 5 premiers clients : <em className="text-accent">6 mois d&apos;hébergement offerts.</em>
        </p>
        <p className="mt-3 text-lg leading-relaxed text-ivory/80">En échange, vous me laissez montrer votre site en exemple et vous me donnez votre avis.</p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {offers.map((offer, i) => (
          <Reveal key={offer.id} delay={i * 0.1} className="h-full">
            <OfferCard offer={offer} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <aside aria-label="Nom de domaine et hébergement" className="mt-6 flex gap-4 rounded-[1.25rem] border border-dashed border-ivory/25 p-6 sm:p-8">
          <span aria-hidden className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-ivory/30 font-display text-lg italic">
            i
          </span>
          <div className="space-y-2 text-lg leading-relaxed">
            <p className="font-medium text-ivory">Le nom de domaine et l&apos;hébergement sont facturés à part, à un coût modéré.</p>
            <p className="text-ivory/80">
              Le nom de domaine, c&apos;est l&apos;adresse de votre site (par exemple « votre-commerce.fr »). L&apos;hébergement, c&apos;est ce qui
              le garde en ligne jour et nuit. Les deux forment la maintenance de votre site.
            </p>
            <ul className="space-y-2 text-ivory">
              <li>Hébergement : 20 € par mois pour un site vitrine.</li>
              <li>Hébergement avec base de données : 40 € par mois, quand le site doit garder des informations, comme des commandes ou un stock.</li>
              <li>Nom de domaine : à votre charge. Son prix dépend du nom choisi.</li>
            </ul>
            <p className="text-ivory/80">Cela suffit pour un commerce. Si votre site a un jour besoin de plus, je vous préviens avant, et on décide ensemble.</p>
          </div>
        </aside>
      </Reveal>
    </section>
  );
}
