import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";

/** Bandeau court sur l'accueil qui renvoie vers la page Prestations. */
export function OffersTeaser() {
  return (
    <section aria-labelledby="teaser-titre" className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10 md:pb-40">
      <Reveal className="flex flex-col gap-8 rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="teaser-titre" className="font-display text-3xl leading-tight md:text-4xl">
            Et pour <em className="text-accent">votre</em> commerce ?
          </h2>
          {/* Une offre par ligne sur mobile, côte à côte ensuite */}
          <p className="mt-4 flex flex-col gap-1 text-lg text-ivory/80 sm:flex-row sm:gap-3">
            <span>Site vitrine à partir de 200 €</span>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <span>Sur mesure à partir de 500 €</span>
          </p>
          <p className="mt-2 text-lg text-accent">Pour mes 5 premiers clients : 6 mois d&apos;hébergement offerts.</p>
        </div>
        <ButtonLink href="/prestations" className="w-full shrink-0 sm:w-auto">
          Voir les prestations <span aria-hidden>→</span>
        </ButtonLink>
      </Reveal>
    </section>
  );
}
