import { Reveal, RevealLines } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { content } from "./content";
import { fontVars } from "./fonts";

/* ── Tokens locaux ─────────────────────────────────────────── */
const serif = "font-[family-name:var(--aube-serif)]";
const sans = "font-[family-name:var(--aube-sans)]";

/** « Photographie » générée en CSS : remplaçable par <Image> avec vos visuels. */
const tones = {
  dusk: "bg-[linear-gradient(180deg,#3b2e27_0%,#7a5442_30%,#c98b62_55%,#f2c595_70%,#f7dcb6_72.5%,#9a7a63_73%,#5c4a3e_85%,#2f2620_100%)]",
  ocean: "bg-[linear-gradient(180deg,#e9e1d3_0%,#c8c6bd_35%,#7f8f92_60%,#3f4d52_100%)]",
  pine: "bg-[linear-gradient(160deg,#d8cfbf_0%,#9e9a7f_40%,#59604a_75%,#2d3227_100%)]",
  sand: "bg-[linear-gradient(200deg,#f1e6d5_0%,#dcc4a2_40%,#b08965_75%,#6b4f3a_100%)]",
} as const;

function Photo({ tone, className }: { tone: keyof typeof tones; className?: string }) {
  return (
    <div className={cn("grain overflow-hidden", tones[tone], className)}>
      <div className="absolute inset-0 bg-[radial-gradient(50%_30%_at_50%_75%,rgba(255,240,220,.45),transparent)]" />
    </div>
  );
}

function Nav() {
  return (
    <header className={cn(sans, "absolute inset-x-0 top-0 z-20 text-[#F4EEE4]")}>
      <div className="mx-auto grid max-w-[1500px] grid-cols-3 items-center px-6 py-6 text-[0.7rem] tracking-[0.3em] uppercase md:px-12">
        <nav className="hidden gap-8 md:flex">
          {content.nav.map((n) => (
            <a key={n} href="#" className="transition hover:opacity-60">
              {n}
            </a>
          ))}
        </nav>
        <p className={cn(serif, "col-start-2 text-center text-2xl tracking-[0.15em] normal-case italic md:text-3xl")}>
          Maison Aube
        </p>
        <a href="#reserver" className="justify-self-end border border-current px-5 py-2.5 transition hover:bg-[#F4EEE4] hover:text-[#2B241D]">
          Réserver
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#2B241D]">
      <Photo tone="dusk" className="absolute inset-0" />
      {/* Soleil couchant sur l'horizon */}
      <div className="absolute top-[72.5%] left-1/2 size-[38vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fff3df_0%,rgba(255,226,180,.6)_30%,transparent_70%)] [clip-path:inset(0_0_50%_0)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-[12vh] text-center text-[#F4EEE4]">
        <Reveal y={10}>
          <p className={cn(sans, "mb-8 text-[0.7rem] tracking-[0.5em] uppercase")}>{content.hero.kicker}</p>
        </Reveal>
        <h1 className={cn(serif, "text-[clamp(3.5rem,12vw,11rem)] leading-[0.85] font-light italic")}>
          <RevealLines lines={[...content.hero.title]} delay={0.2} />
        </h1>
        <Reveal delay={0.6}>
          <p className={cn(sans, "mt-10 max-w-sm text-sm leading-relaxed font-light opacity-90")}>{content.hero.text}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="mx-auto max-w-[1500px] px-6 py-32 md:px-12 md:py-48">
      <div className="grid gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className={cn(sans, "text-[0.7rem] tracking-[0.4em] uppercase opacity-60")}>N° 01 — La maison</p>
        </Reveal>
        <Reveal className="md:col-span-7" delay={0.1}>
          <p
            className={cn(
              serif,
              "text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.25] font-light first-letter:float-left first-letter:mr-3 first-letter:text-[5.5em] first-letter:leading-[0.8] first-letter:italic",
            )}
          >
            {content.intro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Suites() {
  return (
    <section className="border-t border-[#2B241D]/15 bg-[#EDE5D8]">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-12 md:py-40">
        <div className="mb-16 flex items-end justify-between">
          <h2 className={cn(serif, "text-[clamp(2.8rem,6vw,5.5rem)] leading-none font-light")}>
            Les <em>suites</em>
          </h2>
          <a href="#" className={cn(sans, "hidden border-b border-current pb-1 text-[0.7rem] tracking-[0.3em] uppercase md:block")}>
            Toutes les chambres
          </a>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {content.suites.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.12} className={i === 1 ? "md:mt-24" : ""}>
              <a href="#" className="group block">
                <div className="overflow-hidden">
                  <Photo tone={s.tone} className="aspect-[3/4] transition duration-[1.4s] ease-out group-hover:scale-105" />
                </div>
                <div className="mt-6 flex items-baseline justify-between">
                  <h3 className={cn(serif, "text-3xl italic")}>{s.name}</h3>
                  <span className={cn(sans, "text-xs opacity-60")}>{s.size}</span>
                </div>
                <p className={cn(sans, "mt-2 text-xs tracking-[0.2em] uppercase opacity-70")}>{s.price}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experiences() {
  return (
    <section className="mx-auto grid max-w-[1500px] gap-16 px-6 py-28 md:grid-cols-2 md:px-12 md:py-40">
      <Reveal>
        <Photo tone="ocean" className="aspect-[4/5] md:sticky md:top-12" />
      </Reveal>
      <div className="md:py-12">
        <p className={cn(sans, "text-[0.7rem] tracking-[0.4em] uppercase opacity-60")}>N° 02 — Expériences</p>
        <h2 className={cn(serif, "mt-6 text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] font-light")}>
          L&apos;art de <em>ne rien faire</em>, parfaitement.
        </h2>
        <ul className="mt-16 divide-y divide-[#2B241D]/15 border-y border-[#2B241D]/15">
          {content.experiences.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 0.08} className="grid grid-cols-[3rem_1fr] gap-4 py-8">
              <span className={cn(serif, "text-xl italic opacity-50")}>{["i.", "ii.", "iii."][i]}</span>
              <div>
                <h3 className={cn(serif, "text-2xl")}>{e.title}</h3>
                <p className={cn(sans, "mt-2 text-sm leading-relaxed font-light opacity-75")}>{e.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="bg-[#2B241D] px-6 py-32 text-center text-[#F4EEE4] md:py-44">
      <Reveal>
        <blockquote className={cn(serif, "mx-auto max-w-4xl text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.1] font-light italic")}>
          « {content.quote.text} »
        </blockquote>
        <p className={cn(sans, "mt-10 text-[0.7rem] tracking-[0.4em] uppercase opacity-60")}>— {content.quote.source}</p>
      </Reveal>
    </section>
  );
}

function Booking() {
  const field = cn(sans, "flex flex-col gap-2 border-b border-[#2B241D]/30 pb-3 text-[0.65rem] tracking-[0.3em] uppercase");
  const input = "bg-transparent text-base tracking-normal normal-case outline-none";
  return (
    <section id="reserver" className="mx-auto max-w-[1500px] px-6 py-28 md:px-12 md:py-36">
      <h2 className={cn(serif, "text-center text-[clamp(2.4rem,5vw,4rem)] font-light")}>
        Votre <em>séjour</em>
      </h2>
      <form className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-4 md:items-end">
        <label className={field}>
          Arrivée
          <input type="date" className={input} />
        </label>
        <label className={field}>
          Départ
          <input type="date" className={input} />
        </label>
        <label className={field}>
          Voyageurs
          <select className={input} defaultValue="2">
            {[1, 2, 3, 4].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={cn(sans, "bg-[#2B241D] px-6 py-4 text-[0.7rem] tracking-[0.3em] text-[#F4EEE4] uppercase transition hover:bg-[#8A6F52]")}
        >
          Disponibilités
        </button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className={cn(sans, "border-t border-[#2B241D]/15 px-6 pt-20 pb-32 md:px-12")}>
      <div className="mx-auto flex max-w-[1500px] flex-col items-center gap-6 text-center">
        <p className={cn(serif, "text-5xl italic")}>Maison Aube</p>
        <p className="text-xs leading-relaxed tracking-[0.2em] uppercase opacity-60">
          12 avenue de l&apos;Impératrice — 64200 Biarritz
          <br />
          +33 5 59 00 00 00
        </p>
      </div>
    </footer>
  );
}

export function MaisonAubeSite() {
  return (
    <div className={cn(fontVars, sans, "min-h-dvh bg-[#F4EEE4] text-[#2B241D] selection:bg-[#8A6F52] selection:text-[#F4EEE4]")}>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Suites />
        <Experiences />
        <Quote />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
