import { Reveal, RevealLines } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { content } from "./content";
import { fontVars } from "./fonts";
import { Pricing } from "./pricing";

const mono = "font-[family-name:var(--volt-mono)]";

function Glow({ className }: { className?: string }) {
  return <div aria-hidden className={cn("pointer-events-none absolute rounded-full blur-[120px]", className)} />;
}

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#07080C]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span className="grid size-7 place-items-center rounded-lg bg-[linear-gradient(135deg,#7C5CFF,#3DF2C1)] text-sm text-[#07080C]">⚡</span>
          Volt
        </a>
        <nav className="hidden gap-8 text-sm text-white/60 md:flex">
          {content.nav.map((n) => (
            <a key={n} href="#" className="transition hover:text-white">
              {n}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <a href="#" className="hidden text-white/60 hover:text-white sm:block">
            Connexion
          </a>
          <a href="#tarifs" className="rounded-full bg-white px-4 py-2 font-medium text-[#07080C] transition hover:bg-[#3DF2C1]">
            Essai gratuit
          </a>
        </div>
      </div>
    </header>
  );
}

/** Mini-dashboard dessiné en CSS/SVG. */
function Dashboard() {
  const bars = [38, 52, 44, 61, 58, 72, 49, 66, 80, 74, 88, 69, 92, 84];
  return (
    <div className="relative rounded-3xl border border-white/10 bg-[#0D0F17]/80 p-2 shadow-[0_0_120px_-20px_rgba(124,92,255,.5)] backdrop-blur">
      <div className="rounded-2xl border border-white/5 bg-[#0A0C12]">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="size-2.5 rounded-full" style={{ background: c }} />
          ))}
          <span className={cn(mono, "ml-4 text-xs text-white/40")}>app.volt.energy/sites/lyon-nord</span>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-[1fr_220px]">
          <div className="rounded-xl border border-white/5 bg-white/[.02] p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-white/50">Consommation — 14 jours</p>
              <p className={cn(mono, "text-xs text-[#3DF2C1]")}>▼ 31,4 %</p>
            </div>
            <div className="mt-6 flex h-40 items-end gap-1.5">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#7C5CFF]/30 to-[#7C5CFF]" style={{ height: `${h}%`, opacity: 0.45 + i / 28 }} />
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {[
              { k: "Puissance", v: "412 kW", c: "#7C5CFF" },
              { k: "CO₂ évité", v: "18,6 t", c: "#3DF2C1" },
              { k: "Économies", v: "24 380 €", c: "#ffffff" },
            ].map((m) => (
              <div key={m.k} className="rounded-xl border border-white/5 bg-white/[.02] p-4">
                <p className="text-xs text-white/40">{m.k}</p>
                <p className={cn(mono, "mt-1 text-xl")} style={{ color: m.c }}>
                  {m.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-20 md:pt-32">
      <Glow className="top-[-200px] left-1/2 size-[700px] -translate-x-1/2 bg-[#7C5CFF]/40" />
      <Glow className="top-[100px] right-[-200px] size-[400px] bg-[#3DF2C1]/20" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl text-center">
        <Reveal y={10}>
          <a href="#" className={cn(mono, "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/30")}>
            <span className="size-1.5 rounded-full bg-[#3DF2C1]" /> Volt 2.0 — l&apos;IA prédictive est là <span aria-hidden>→</span>
          </a>
        </Reveal>
        <h1 className="mx-auto mt-8 max-w-4xl text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
          <RevealLines
            lines={[
              "Votre énergie,",
              <span key="b" className="bg-[linear-gradient(90deg,#fff,#a594ff_40%,#3DF2C1)] bg-clip-text text-transparent">
                en pilote automatique.
              </span>,
            ]}
          />
        </h1>
        <Reveal delay={0.4}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-white/60">
            Volt connecte vos compteurs, anticipe les pics de consommation et ajuste vos équipements en temps réel.
            Sans travaux, sans changer vos habitudes.
          </p>
        </Reveal>
        <Reveal delay={0.5} className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#tarifs" className="rounded-full bg-white px-6 py-3 font-medium text-[#07080C] transition hover:bg-[#3DF2C1]">
            Commencer gratuitement
          </a>
          <a href="#" className="rounded-full border border-white/15 px-6 py-3 transition hover:bg-white/10">
            Voir la démo ▸
          </a>
        </Reveal>
        <Reveal delay={0.6} className="mt-20" y={60}>
          <Dashboard />
        </Reveal>
      </div>
    </section>
  );
}

function Logos() {
  return (
    <section className="border-y border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-14 gap-y-6 text-lg font-semibold tracking-tight text-white/30">
        <span className={cn(mono, "w-full text-center text-xs font-normal tracking-widest uppercase md:w-auto")}>Ils nous font confiance</span>
        {content.logos.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </section>
  );
}

function Bento() {
  const card = "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.02] p-8";
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <Reveal className="max-w-2xl">
        <p className={cn(mono, "text-xs tracking-widest text-[#3DF2C1] uppercase")}>Plateforme</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Tout ce qu&apos;il faut pour consommer moins. Rien de plus.</h2>
      </Reveal>
      <div className="mt-14 grid auto-rows-[260px] gap-4 md:grid-cols-6">
        <Reveal className={cn(card, "md:col-span-4 md:row-span-2")}>
          <Glow className="right-[-100px] bottom-[-100px] size-[400px] bg-[#7C5CFF]/30" />
          <h3 className="text-xl font-medium">Prévisions à 72 h</h3>
          <p className="mt-2 max-w-sm text-white/50">Météo, planning de production, tarifs spot : notre modèle croise tout pour anticiper chaque pic.</p>
          <svg viewBox="0 0 400 140" className="absolute inset-x-8 bottom-8 w-[calc(100%-4rem)]" fill="none">
            <path d="M0 110 C40 100 60 60 100 70 S160 120 200 80 260 20 300 40 360 90 400 30" stroke="#7C5CFF" strokeWidth="2.5" />
            <path d="M0 110 C40 100 60 60 100 70 S160 120 200 80 260 20 300 40 360 90 400 30 V140 H0Z" fill="url(#vg)" />
            <path d="M260 20 C280 30 300 40 300 40 S360 90 400 30" stroke="#3DF2C1" strokeWidth="2.5" strokeDasharray="5 6" />
            <defs>
              <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#7C5CFF" stopOpacity=".35" />
                <stop offset="1" stopColor="#7C5CFF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </Reveal>
        <Reveal className={cn(card, "md:col-span-2")} delay={0.1}>
          <h3 className="text-xl font-medium">Alertes intelligentes</h3>
          <div className={cn(mono, "mt-6 space-y-2 text-xs")}>
            <p className="rounded-lg bg-[#3DF2C1]/10 px-3 py-2 text-[#3DF2C1]">✓ Pic évité — Atelier B</p>
            <p className="rounded-lg bg-white/5 px-3 py-2 text-white/60">⚠ Compresseur 3 : dérive +8%</p>
          </div>
        </Reveal>
        <Reveal className={cn(card, "md:col-span-2")} delay={0.15}>
          <h3 className="text-xl font-medium">API ouverte</h3>
          <pre className={cn(mono, "mt-5 text-xs leading-relaxed text-white/50")}>
            {`GET /v2/sites/:id/forecast\n→ 200 OK  ·  38 ms`}
          </pre>
        </Reveal>
        <Reveal className={cn(card, "md:col-span-3")}>
          <h3 className="text-xl font-medium">Connexion en 15 minutes</h3>
          <p className="mt-2 text-white/50">Compatible avec 300+ compteurs et automates du marché.</p>
        </Reveal>
        <Reveal className={cn(card, "md:col-span-3")} delay={0.1}>
          <h3 className="text-xl font-medium">Conforme décret tertiaire</h3>
          <p className="mt-2 text-white/50">Rapports OPERAT générés automatiquement, prêts à déposer.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Metrics() {
  return (
    <section className="border-y border-white/5 bg-white/[.015]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 md:grid-cols-4">
        {content.metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.08} className="py-14 pr-6">
            <p className="text-4xl font-semibold tracking-tight md:text-5xl">{m.value}</p>
            <p className="mt-2 text-sm text-white/50">{m.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-40 text-center">
      <Glow className="bottom-[-300px] left-1/2 size-[700px] -translate-x-1/2 bg-[#3DF2C1]/25" />
      <Reveal className="relative">
        <h2 className="mx-auto max-w-3xl text-5xl font-semibold tracking-[-0.03em] md:text-7xl">Le kilowatt le moins cher est celui qu&apos;on ne consomme pas.</h2>
        <a href="#" className="mt-10 inline-block rounded-full bg-white px-7 py-3.5 font-medium text-[#07080C] transition hover:bg-[#3DF2C1]">
          Réserver une démo
        </a>
      </Reveal>
    </section>
  );
}

export function VoltSite() {
  return (
    <div className={cn(fontVars, "min-h-dvh bg-[#07080C] font-[family-name:var(--volt-sans)] text-white selection:bg-[#7C5CFF]")}>
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Bento />
        <Metrics />
        <section id="tarifs" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
          <Reveal className="mb-12 text-center">
            <p className={cn(mono, "text-xs tracking-widest text-[#3DF2C1] uppercase")}>Tarifs</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Rentabilisé dès le premier mois.</h2>
          </Reveal>
          <Pricing />
        </section>
        <Cta />
      </main>
    </div>
  );
}
