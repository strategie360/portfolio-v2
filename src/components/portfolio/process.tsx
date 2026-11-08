import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";

const steps = [
  { title: "On discute", text: "Vous me parlez de votre commerce et de ce que vous voulez, par téléphone ou par message." },
  { title: "Vous m'envoyez vos contenus", text: "Vos photos et vos textes suffisent pour démarrer." },
  { title: "Je crée votre site", text: "Vous le voyez avant tout le monde et vous me dites ce qu'il faut changer." },
  { title: "Il est en ligne", text: "Vos clients peuvent vous trouver et vous joindre." },
];

export function Process() {
  return (
    <section id="methode" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-28 md:px-10 md:py-40">
      <SectionHeading
        eyebrow="(03) Méthode"
        title={
          <>
            Simple, <em className="text-accent">du début à la fin.</em>
          </>
        }
        aside={
          <p className="text-base leading-relaxed">
            Pour un site vitrine : 1 semaine, une fois vos photos et vos textes reçus.
          </p>
        }
      />
      <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.08} className="flex flex-col bg-ink p-8 lg:min-h-[360px]">
            <span className="font-display text-7xl text-accent/90 italic">{i + 1}</span>
            <h3 className="mt-auto pt-12 text-xl font-medium">{s.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-mute">{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
