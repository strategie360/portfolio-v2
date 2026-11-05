import { Reveal, RevealLines } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { Configurator } from "./configurator";
import { content } from "./content";
import { fontVars } from "./fonts";

const serif = "font-[family-name:var(--orbe-serif)]";
const label = "text-xs tracking-[0.25em] uppercase opacity-60";

function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 lg:px-10">
        <a href="#" className={cn(serif, "text-3xl italic")}>
          Orbe
        </a>
        <nav className="hidden gap-10 text-sm opacity-80 md:flex">
          {content.nav.map((n) => (
            <a key={n} href="#" className="transition hover:opacity-60">
              {n}
            </a>
          ))}
        </nav>
        <a href="#" className="text-sm">
          Panier (0)
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      <Configurator
        heading={
          <div className="max-w-xl">
            <Reveal y={8}>
              <p className={label}>Luminaires — Édition 2026</p>
            </Reveal>
            <h1 className={cn(serif, "mt-7 text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9]")}>
              <RevealLines lines={["La lumière,", <em key="a">sculptée.</em>]} delay={0.2} />
            </h1>
          </div>
        }
      />
    </section>
  );
}

function Craft() {
  return (
    <section className="mx-auto max-w-[1500px] px-6 py-32 lg:px-10 lg:py-44">
      <div className="grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className={label}>L&apos;atelier</p>
          <h2 className={cn(serif, "mt-6 text-5xl leading-[0.95] lg:text-7xl")}>
            Fait main, <em>pour durer.</em>
          </h2>
        </Reveal>
        <div className="grid gap-12 sm:grid-cols-3 lg:col-span-7">
          {content.craft.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.1}>
              <p className={cn(serif, "text-5xl italic text-[#C9A15B]")}>{c.n}</p>
              <h3 className="mt-6 text-lg font-semibold">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-70">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Collection() {
  return (
    <section className="border-t border-[#EDE6DA]/10">
      <div className="mx-auto max-w-[1500px] px-6 py-32 lg:px-10">
        <div className="mb-14 flex items-end justify-between">
          <h2 className={cn(serif, "text-5xl lg:text-6xl")}>
            La <em>collection</em>
          </h2>
          <p className={cn(label, "hidden sm:block")}>03 modèles</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {content.collection.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <a href="#" className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  <div className="size-full transition duration-[1.2s] group-hover:scale-105" style={{ background: p.bg }} />
                </div>
                <div className="mt-4 flex justify-between">
                  <h3 className={cn(serif, "text-2xl italic")}>{p.name}</h3>
                  <span className="text-sm opacity-60">{p.price}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specs() {
  return (
    <section className="mx-auto grid max-w-[1500px] gap-12 px-6 pt-16 pb-40 lg:grid-cols-12 lg:px-10">
      <p className={cn(label, "lg:col-span-4")}>Caractéristiques</p>
      <dl className="divide-y divide-[#EDE6DA]/10 border-y border-[#EDE6DA]/10 lg:col-span-8">
        {content.specs.map(([k, v]) => (
          <div key={k} className="grid grid-cols-2 py-5">
            <dt className="opacity-60">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function OrbeSite() {
  return (
    <div className={cn(fontVars, "min-h-dvh overflow-x-clip bg-[#121110] font-[family-name:var(--orbe-sans)] text-[#EDE6DA] selection:bg-[#C9A15B] selection:text-[#121110]")}>
      <Nav />
      <main>
        <Hero />
        <Craft />
        <Collection />
        <Specs />
      </main>
    </div>
  );
}
