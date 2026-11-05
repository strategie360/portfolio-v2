import Link from "next/link";
import { demoHref, demos, type Demo } from "@/demos/registry";
import { covers } from "@/demos/covers";
import { Reveal } from "@/components/ui/reveal";
import { pad } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

function DemoCard({ demo, index }: { demo: Demo; index: number }) {
  const Cover = covers[demo.slug];
  return (
    <Link href={demoHref(demo.slug)} className="group block" aria-label={`Ouvrir la démo ${demo.name}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-ink-3 md:aspect-[5/6]">
        <div aria-hidden className="absolute inset-0 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]">
          <Cover />
        </div>
        <div className="absolute inset-0 bg-ink/0 transition duration-500 group-hover:bg-ink/25" />
        <span className="absolute right-4 bottom-4 z-10 flex translate-y-3 items-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-ink opacity-0 transition duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          Visiter le site <span aria-hidden>↗</span>
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-mute">{pad(index + 1)}</span>
            <h3 className="font-display text-3xl">{demo.name}</h3>
          </div>
          <p className="mt-1 text-base text-mute">
            {demo.sector} — <span className="text-ivory/80">{demo.style}</span>
          </p>
        </div>
        <div className="mt-2 flex shrink-0 -space-x-1.5">
          {demo.palette.map((c) => (
            <span key={c} className="size-4 rounded-full ring-2 ring-ink" style={{ background: c }} />
          ))}
        </div>
      </div>
      <p className="mt-3 max-w-md text-base leading-relaxed text-mute">{demo.summary}</p>
    </Link>
  );
}

export function Showcase() {
  return (
    <section id="inspirations" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-28 md:px-10 md:py-40">
      <SectionHeading
        eyebrow="(01) Inspirations"
        title={
          <>
            {demos.length} univers, <em className="text-accent">un seul</em> artisan.
          </>
        }
        aside={
          <p className="text-base leading-relaxed">
            Chaque démo est un vrai site, pensé pour un secteur précis. Cliquez, naviguez, comparez — puis
            dites-moi lequel vous parle.
          </p>
        }
      />

      <div className="grid gap-x-8 gap-y-20 md:grid-cols-2">
        {demos.map((demo, i) => (
          <Reveal key={demo.slug} delay={(i % 2) * 0.12} className={i % 2 === 1 ? "md:mt-32" : ""}>
            <DemoCard demo={demo} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
