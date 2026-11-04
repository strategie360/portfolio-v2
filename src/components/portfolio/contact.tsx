import { site } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";

export function Contact() {
  return (
    <section id="contact" className="grain relative scroll-mt-20 overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(232,195,158,0.14),transparent)]" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-32 text-center md:px-10 md:py-48">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-mute uppercase">(04) Contact</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-8 max-w-5xl font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.9]">
            Parlons de <em className="text-accent">votre</em> projet.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-lg text-mute">
            Dites-moi quelle inspiration vous a parlé — ou aucune. Réponse sous 24 h avec une première
            proposition de direction.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("Nouveau projet web")}`}
            className="group mt-12 inline-flex items-center gap-4 rounded-full bg-ivory py-2 pr-2 pl-8 text-lg font-medium text-ink transition hover:bg-accent"
          >
            {site.email}
            <span className="grid size-12 place-items-center rounded-full bg-ink text-ivory transition group-hover:rotate-45">
              ↗
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
