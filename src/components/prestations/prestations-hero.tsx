import { Reveal, RevealLines } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";

export function PrestationsHero() {
  return (
    <section className="grain relative overflow-hidden px-5 pt-36 pb-20 md:px-10 md:pt-44 md:pb-28">
      <div aria-hidden className="pointer-events-none absolute top-[-30%] right-[-20%] size-[70vw] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgba(232,195,158,0.14),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal y={8}>
          <p className="font-mono text-xs tracking-widest text-mute uppercase">(Prestations)</p>
        </Reveal>
        <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.95]">
          <RevealLines lines={["Un site qui vous", <em key="a" className="text-accent">amène des clients.</em>]} />
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ivory/80 md:text-xl">
            Je crée des sites pour les commerces : restaurants, artisans, boutiques. Vous démarrez avec un petit forfait. Ensuite, vous
            payez selon ce que le site vous apporte vraiment.
          </p>
        </Reveal>
        <Reveal delay={0.4} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#offres">Voir les offres</ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            Me contacter
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
