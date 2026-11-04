import { site } from "@/config/site";
import { demos } from "@/demos/registry";
import { Reveal, RevealLines } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pt-32 pb-12 md:px-10 md:pb-16">
      {/* Halo d'ambiance */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] right-[-10%] size-[70vw] max-w-[1100px] rounded-full bg-[radial-gradient(circle,rgba(232,195,158,0.16),transparent_60%)] animate-float" />
        <div className="absolute bottom-[-30%] left-[-20%] size-[60vw] rounded-full bg-[radial-gradient(circle,rgba(120,110,255,0.08),transparent_60%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px]">
        <Reveal className="mb-10 flex items-center gap-3 text-sm text-mute" y={8}>
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          {site.availability}
        </Reveal>

        <h1 className="font-display text-[clamp(3.2rem,11vw,10.5rem)] leading-[0.88] tracking-[-0.02em]">
          <RevealLines
            lines={[
              "Des sites qui",
              <span key="b">
                ressemblent <em className="text-accent">à votre</em>
              </span>,
              <em key="a">ambition.</em>,
            ]}
          />
        </h1>

        <div className="mt-14 grid gap-10 border-t border-line pt-8 md:grid-cols-12">
          <Reveal className="md:col-span-5" delay={0.4}>
            <p className="max-w-md text-lg leading-relaxed text-mute">
              {site.role}. Plutôt qu&apos;un catalogue de captures d&apos;écran, ce portfolio vous ouvre{" "}
              <span className="text-ivory">{demos.length} univers complets</span>, navigables comme de vrais sites —
              pour imaginer concrètement le vôtre.
            </p>
          </Reveal>

          <Reveal className="flex items-end gap-4 md:col-span-4 md:col-start-9 md:justify-end" delay={0.5}>
            <a
              href="#inspirations"
              className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 text-sm transition hover:border-ivory"
            >
              Explorer les inspirations
              <span className="transition group-hover:translate-y-0.5" aria-hidden>
                ↓
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
