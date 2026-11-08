import { Reveal } from "@/components/ui/reveal";
import { pad } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const capabilities = [
  {
    title: "Un site à votre image",
    text: "Vos couleurs, vos photos, votre façon de parler. Votre site vous ressemble.",
    items: ["Vos couleurs", "Vos photos", "Votre style"],
  },
  {
    title: "Facile pour vos clients",
    text: "Vos horaires, votre adresse et votre offre se trouvent tout de suite, sur téléphone comme sur ordinateur.",
    items: ["Téléphone", "Ordinateur", "Facile à lire"],
  },
  {
    title: "Vous joindre en un geste",
    text: "Un bouton pour vous appeler, un formulaire pour vous écrire ou la réservation en ligne.",
    items: ["Appel", "Formulaire", "Réservation"],
  },
  {
    title: "Rapide et prêt pour Google",
    text: "Votre site s'ouvre vite et il est préparé pour que Google le comprenne bien.",
    items: ["Rapide", "Préparé pour Google"],
  },
];

export function Capabilities() {
  return (
    <section id="savoir-faire" className="scroll-mt-20 border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <SectionHeading
          eyebrow="(02) Ce que vous obtenez"
          title={
            <>
              Un site <em className="text-accent">simple et utile.</em>
            </>
          }
        />
        <ul className="border-t border-line">
          {capabilities.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.05}>
              <div className="group grid gap-4 border-b border-line py-10 transition-colors hover:bg-white/[0.015] lg:grid-cols-12 lg:items-baseline">
                <span className="font-mono text-xs text-mute lg:col-span-1">{pad(i + 1)}</span>
                <h3 className="font-display text-4xl transition group-hover:translate-x-2 group-hover:text-accent lg:col-span-4 lg:text-5xl">
                  {c.title}
                </h3>
                <p className="max-w-md leading-relaxed text-mute lg:col-span-4">{c.text}</p>
                <ul className="flex flex-wrap gap-2 lg:col-span-3 lg:justify-end">
                  {c.items.map((item) => (
                    <li key={item} className="rounded-full border border-line px-3 py-1 text-sm text-mute">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
