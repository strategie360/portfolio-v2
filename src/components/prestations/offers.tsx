import { ButtonLink } from "@/components/ui/button-link";
import { Fill } from "@/components/ui/fill";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

type Offer = {
  id: string;
  name: string;
  price: string;
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
    pitch: "Un site qui donne envie de venir chez vous, ou de vous contacter.",
    includes: [
      "Vos horaires et comment venir",
      "Votre offre et vos photos",
      "Les avis de vos clients",
      "Un bouton pour vous appeler en un geste",
      "Un formulaire de contact ou la réservation en ligne",
    ],
    notes: ["Votre charte graphique est reprise et incluse.", "Une demande particulière ? C'est possible, on en discute."],
    delay: "Délai : [À COMPLÉTER : délai]",
    cta: { label: "Parler de mon site", href: "#contact" },
  },
  {
    id: "sur-mesure-offre",
    name: "Sur mesure",
    price: "500 €",
    pitch: "Un outil fait pour votre commerce, qui vous fait gagner du temps.",
    includes: ["Suivi de stock", "Commandes et réservations au même endroit", "Tableau de bord de votre semaine"],
    notes: ["Le prix dépend de votre demande."],
    delay: "Délai : [À COMPLÉTER : délai]",
    cta: { label: "Voir des exemples", href: "#sur-mesure" },
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
            Simple au départ, <em className="text-accent">sur mesure</em> si besoin.
          </span>
        }
      />
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
              le garde en ligne jour et nuit. <Fill>Coût : [À COMPLÉTER : coût du domaine et de l&apos;hébergement]</Fill>
            </p>
          </div>
        </aside>
      </Reveal>
    </section>
  );
}
