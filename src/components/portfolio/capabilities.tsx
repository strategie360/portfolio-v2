import { Reveal } from "@/components/ui/reveal";
import { pad } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const capabilities = [
  {
    title: "Direction artistique",
    text: "Une identité visuelle cohérente : typographies, palette, rythme et ton. Votre site ne ressemble à aucun autre.",
    items: ["Moodboard", "Système typographique", "Charte web"],
  },
  {
    title: "Design d'interface",
    text: "Des parcours clairs qui convertissent, du premier écran au formulaire de contact ou au panier.",
    items: ["Maquettes Figma", "Responsive", "Accessibilité"],
  },
  {
    title: "Développement",
    text: "Un code moderne, rapide et maintenable. Vous êtes autonome pour faire évoluer vos contenus.",
    items: ["Next.js & React", "CMS headless", "E-commerce"],
  },
  {
    title: "Performance & SEO",
    text: "Des pages qui chargent en un éclair et remontent dans Google. La beauté ne se fait pas au détriment de la vitesse.",
    items: ["Core Web Vitals", "SEO technique", "Analytics"],
  },
];

export function Capabilities() {
  return (
    <section id="savoir-faire" className="scroll-mt-20 border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <SectionHeading
          eyebrow="(02) Savoir-faire"
          title={
            <>
              De l&apos;idée <em className="text-accent">au site en ligne.</em>
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
                    <li key={item} className="rounded-full border border-line px-3 py-1 text-xs text-mute">
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
