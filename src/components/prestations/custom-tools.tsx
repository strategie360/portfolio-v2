import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { StockDemo } from "./stock-demo";

const examples = [
  {
    icon: "▤",
    title: "Suivi de stock",
    text: "Savoir ce qu'il vous reste, et être prévenu avant la rupture.",
  },
  {
    icon: "☰",
    title: "Commandes et réservations au même endroit",
    text: "Fini les carnets, les messages et les appels éparpillés. Tout est sur un seul écran.",
  },
  {
    icon: "◔",
    title: "Le tableau de bord de la semaine",
    text: "D'un coup d'œil, ce qui s'est passé et ce qui vous attend.",
  },
  {
    icon: "✎",
    title: "Tout ce qui vous prend du temps",
    text: "Une tâche répétitive, un tableau à remplir à la main ? On regarde ensemble si un outil peut s'en charger.",
  },
];

/** Espace « Sur mesure : vous faciliter la vie ». */
export function CustomTools() {
  return (
    <section id="sur-mesure" aria-labelledby="sur-mesure-titre" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-20 md:px-10 md:py-28">
      <SectionHeading
        eyebrow="(03) Sur mesure"
        title={
          <span id="sur-mesure-titre">
            Vous faciliter <em className="text-accent">la vie.</em>
          </span>
        }
      />

      <Reveal>
        <p className="max-w-3xl text-xl leading-relaxed text-ivory md:text-2xl">
          Votre site vous amène des clients. Et le reste de votre journée ? Je peux aussi créer des outils simples, faits pour votre
          commerce.
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {examples.map((e, i) => (
          <Reveal as="li" key={e.title} delay={(i % 2) * 0.08} className="flex gap-5 rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8">
            <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full border border-accent/40 text-xl text-accent">
              {e.icon}
            </span>
            <div>
              <h3 className="text-xl font-medium">{e.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-ivory/80">{e.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-[1.25rem] border border-line p-6 sm:p-8">
          <h3 className="font-display text-3xl md:text-4xl">
            Comment on s&apos;y prend
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-ivory/80">
            On part de ce qui vous fait perdre du temps. Et on commence petit : un premier outil utile tout de suite, que l&apos;on fait
            grandir ensuite si vous en avez besoin.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8">
          <StockDemo />
        </Reveal>
      </div>

      <Reveal className="mt-12 flex flex-col items-start gap-6 rounded-[1.25rem] bg-ivory p-6 text-ink sm:p-10 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-3xl leading-tight md:text-4xl">Parlons de ce qui vous pèse dans la semaine.</p>
        <ButtonLink href="#contact" variant="dark" className="w-full shrink-0 md:w-auto">
          Me contacter <span aria-hidden>→</span>
        </ButtonLink>
      </Reveal>
    </section>
  );
}
