import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";

const steps = [
  { title: "Écoute", duration: "Semaine 1", text: "Atelier de découverte : vos objectifs, votre cible, vos concurrents. On choisit ensemble une direction parmi les inspirations." },
  { title: "Conception", duration: "Semaines 2–3", text: "Moodboard, arborescence puis maquettes haute fidélité. Vous validez chaque écran avant la moindre ligne de code." },
  { title: "Réalisation", duration: "Semaines 4–6", text: "Développement, animations, intégration des contenus. Un lien de prévisualisation vous permet de suivre l'avancement en direct." },
  { title: "Lancement", duration: "Semaine 7", text: "Mise en ligne, référencement, formation à l'administration. Je reste disponible pour faire grandir le site avec vous." },
];

export function Process() {
  return (
    <section id="methode" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-28 md:px-10 md:py-40">
      <SectionHeading
        eyebrow="(03) Méthode"
        title={
          <>
            Un processus <em className="text-accent">clair</em>, sans surprise.
          </>
        }
        aside={<p className="text-sm leading-relaxed">Délai indicatif pour un site vitrine sur-mesure de 5 à 8 pages.</p>}
      />
      <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line md:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.08} className="flex flex-col bg-ink p-8 md:min-h-[360px]">
            <span className="font-display text-7xl text-accent/90 italic">{i + 1}</span>
            <h3 className="mt-auto pt-12 text-xl font-medium">{s.title}</h3>
            <p className="mt-1 font-mono text-xs text-mute uppercase">{s.duration}</p>
            <p className="mt-4 text-sm leading-relaxed text-mute">{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
