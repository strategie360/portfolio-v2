import type { ReactNode } from "react";
import { site } from "@/config/site";
import { Fill, isPlaceholder } from "@/components/ui/fill";
import { Reveal } from "@/components/ui/reveal";

type ContactProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  text?: string;
  /** Affiche aussi le numéro de téléphone (utile pour les commerçants). */
  showPhone?: boolean;
};

export function Contact({
  id = "contact",
  eyebrow = "(04) Contact",
  title = (
    <>
      Parlons de <em className="text-accent">votre</em> projet.
    </>
  ),
  text = "Dites-moi quelle inspiration vous a parlé — ou aucune. Réponse sous [À COMPLÉTER : délai de réponse] avec une première proposition de direction.",
  showPhone = false,
}: ContactProps) {
  const phoneMissing = isPlaceholder(site.phone);
  return (
    <section id={id} className="grain relative scroll-mt-20 overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(232,195,158,0.14),transparent)]" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-32 text-center md:px-10 md:py-48">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-mute uppercase">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-8 max-w-5xl font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.9]">{title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-lg text-mute">
            <Fill>{text}</Fill>
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-12 flex flex-col items-center gap-4">
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("Nouveau projet web")}`}
            className="group inline-flex max-w-full items-center gap-4 rounded-full bg-ivory py-2 pr-2 pl-6 text-base font-medium break-all text-ink transition hover:bg-accent sm:pl-8 sm:text-lg"
          >
            {site.email}
            <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-ivory transition group-hover:rotate-45">
              ↗
            </span>
          </a>
          {showPhone &&
            (phoneMissing ? (
              <p className="text-lg text-ivory/80">
                Ou par téléphone : <Fill>{site.phone}</Fill>
              </p>
            ) : (
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="inline-flex min-h-12 items-center gap-3 rounded-full border border-ivory/30 px-6 text-lg transition hover:border-ivory"
              >
                <span aria-hidden>☎</span> Appeler le {site.phone}
              </a>
            ))}
        </Reveal>
      </div>
    </section>
  );
}
