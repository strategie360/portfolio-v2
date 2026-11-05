import { Reveal, RevealLines } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { content } from "./content";
import { fontVars } from "./fonts";
import { Menu } from "./menu";

const serif = "font-[family-name:var(--terroir-serif)] [font-variation-settings:'SOFT'_100,'WONK'_1]";

function Nav() {
  return (
    <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <a href="#" className={cn(serif, "text-3xl font-bold")}>
        Terroir<span className="text-[#C4623A]">.</span>
      </a>
      <nav className="hidden gap-8 font-medium md:flex">
        {content.nav.map((n) => (
          <a key={n} href="#" className="underline-offset-4 hover:underline">
            {n}
          </a>
        ))}
      </nav>
      <a href="#reserver" className="rounded-full bg-[#C4623A] px-5 py-2.5 font-medium text-[#F6EBDC] transition hover:bg-[#2E2219]">
        Réserver
      </a>
    </header>
  );
}

/** Badge circulaire en rotation. */
function SpinBadge() {
  return (
    <a href="#reserver" className="group absolute right-[6%] bottom-[8%] z-10 hidden size-36 place-items-center lg:grid lg:size-40" aria-label="Réserver une table">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-[spin_14s_linear_infinite]">
        <defs>
          <path id="circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-[#2E2219] text-[10.5px] font-semibold tracking-[0.2em] uppercase">
          <textPath href="#circle">Réservez votre table · Réservez votre table ·</textPath>
        </text>
      </svg>
      <span className="grid size-14 place-items-center rounded-full bg-[#2E2219] text-xl text-[#F6EBDC] transition group-hover:scale-110 group-hover:bg-[#C4623A]">↓</span>
    </a>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-28 md:pt-16 md:pb-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute top-[5%] right-[-10%] size-[46vw] max-w-[620px] animate-float rounded-[42%_58%_63%_37%/41%_44%_56%_59%] bg-[#C4623A]" />
        <div className="absolute right-[24%] bottom-[10%] size-[18vw] max-w-[240px] rounded-[63%_37%_54%_46%/55%_48%_52%_45%] bg-[#5E6B3A]" />
        <div className="absolute top-[18%] right-[30%] size-[8vw] max-w-[110px] rounded-full bg-[#E3B55B]" />
      </div>
      <div className="relative z-10">
        <Reveal y={10}>
          <p className="mb-6 inline-block rounded-full border-2 border-[#2E2219] px-4 py-1 text-sm font-medium">Bistrot de saison · Lyon 2e</p>
        </Reveal>
        <h1 className={cn(serif, "text-[clamp(3.6rem,12vw,10.5rem)] leading-[0.85] font-semibold tracking-[-0.03em]")}>
          <RevealLines lines={["Cuisine", <em key="a" className="font-normal">de saison,</em>, "cœur de Lyon."]} />
        </h1>
        <Reveal delay={0.5}>
          <p className="mt-10 max-w-md text-lg leading-relaxed">
            Une carte courte qui change chaque semaine, des producteurs à moins de 80 km et une cave nature qui ne se prend pas au sérieux.
          </p>
        </Reveal>
      </div>
      <SpinBadge />
    </section>
  );
}

function ProduceBand() {
  const row = [...content.produce, ...content.produce];
  return (
    <div className="-rotate-2 overflow-hidden bg-[#5E6B3A] py-5 text-[#F6EBDC]" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((p, i) => (
          <span key={i} className={cn(serif, "flex items-center gap-10 text-3xl italic")}>
            {p} <span className="not-italic text-[#E3B55B]">✿</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-32 md:grid-cols-2">
      <Reveal className="relative aspect-square">
        <div className="grain absolute inset-[8%] rounded-[50%_50%_46%_54%/60%_40%_60%_40%] bg-[radial-gradient(circle_at_35%_30%,#f0c38c,#c4623a_45%,#6b2f18)]" />
        <div className="grain absolute right-0 bottom-0 size-[42%] rounded-full border-8 border-[#F6EBDC] bg-[radial-gradient(circle_at_40%_35%,#b7c27a,#5e6b3a_60%,#2f3a1a)]" />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-sm font-semibold tracking-widest text-[#C4623A] uppercase">Notre histoire</p>
        <h2 className={cn(serif, "mt-4 text-5xl leading-[0.95] font-semibold md:text-6xl")}>
          Ici, c&apos;est le <em className="font-normal">marché</em> qui écrit la carte.
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-[#2E2219]/80">
          Camille et Julien ont ouvert Terroir en 2019 avec une idée simple : cuisiner ce que la saison offre, rien d&apos;autre. Chaque mardi, ils
          partent à la rencontre de leurs producteurs et reviennent avec la carte de la semaine.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-3 border-t-2 sm:gap-6 border-[#2E2219] pt-6">
          {[
            ["12", "producteurs"],
            ["80 km", "rayon max."],
            ["52", "cartes / an"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className={cn(serif, "text-3xl font-semibold text-[#C4623A] sm:text-4xl")}>{v}</p>
              <p className="text-xs sm:text-sm">{l}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function MenuSection() {
  return (
    <section className="bg-[#EFDDC6]">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-32 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="text-sm font-semibold tracking-widest text-[#C4623A] uppercase">Semaine 45</p>
          <h2 className={cn(serif, "mt-4 text-6xl leading-[0.9] font-semibold md:text-7xl")}>
            La carte <em className="font-normal">du moment</em>
          </h2>
          <p className="mt-6 max-w-xs text-[#2E2219]/70">Menu déjeuner entrée + plat ou plat + dessert : 24 €. Le soir, à la carte.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Menu />
        </Reveal>
      </div>
    </section>
  );
}

function Reservation() {
  return (
    <section id="reserver" className="mx-auto max-w-7xl px-6 pt-32 pb-40">
      <div className="grid overflow-hidden rounded-[2.5rem] bg-[#2E2219] text-[#F6EBDC] md:grid-cols-2">
        <div className="p-10 md:p-16">
          <h2 className={cn(serif, "text-5xl leading-[0.95] font-semibold md:text-6xl")}>
            On vous garde <em className="font-normal text-[#E3B55B]">une table ?</em>
          </h2>
          <p className="mt-6 max-w-sm text-[#F6EBDC]/70">24 couverts seulement. Réservation conseillée, surtout le week-end.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#" className="rounded-full bg-[#C4623A] px-6 py-3 font-medium transition hover:bg-[#E3B55B] hover:text-[#2E2219]">
              Réserver en ligne
            </a>
            <a href="#" className="rounded-full border-2 border-[#F6EBDC]/30 px-6 py-3 font-medium transition hover:border-[#F6EBDC]">
              04 78 00 00 00
            </a>
          </div>
        </div>
        <div className="border-t border-[#F6EBDC]/15 p-10 md:border-t-0 md:border-l md:p-16">
          <p className="text-sm font-semibold tracking-widest text-[#E3B55B] uppercase">Horaires</p>
          <ul className="mt-6 space-y-4">
            {content.hours.map((h) => (
              <li key={h.d} className="flex justify-between gap-4 border-b border-dashed border-[#F6EBDC]/20 pb-4">
                <span>{h.d}</span>
                <span className="text-[#F6EBDC]/70">{h.h}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[#F6EBDC]/70">14 rue des Marronniers, 69002 Lyon</p>
        </div>
      </div>
    </section>
  );
}

export function TerroirSite() {
  return (
    <div className={cn(fontVars, "min-h-dvh overflow-x-hidden bg-[#F6EBDC] font-[family-name:var(--terroir-sans)] text-[#2E2219] selection:bg-[#C4623A] selection:text-[#F6EBDC]")}>
      <Nav />
      <main>
        <Hero />
        <ProduceBand />
        <About />
        <MenuSection />
        <Reservation />
      </main>
    </div>
  );
}
