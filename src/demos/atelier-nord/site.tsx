import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { content } from "./content";
import { fontVars } from "./fonts";
import { ProjectIndex } from "./project-index";

const narrow = "font-[family-name:var(--nord-narrow)]";
const label = cn(narrow, "text-xs uppercase");

function TopBar() {
  return (
    <header className={cn(label, "grid grid-cols-2 gap-4 border-b border-[#111] px-4 py-3 md:grid-cols-12 md:px-6")}>
      <a href="#" className="font-bold md:col-span-3">
        Atelier Nord ®
      </a>
      <span className="hidden md:col-span-3 md:block">Architecture / Paysage / Objet</span>
      <span className="hidden md:col-span-2 md:block">59.91°N 10.75°E</span>
      <nav className="flex justify-end gap-4 md:col-span-4">
        <a href="#index" className="hover:text-[#FF3B1F]">
          Index
        </a>
        <a href="#studio" className="hover:text-[#FF3B1F]">
          Studio
        </a>
        <a href="#contact" className="hover:text-[#FF3B1F]">
          Contact
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="px-4 pt-6 md:px-6 xl:pt-16">
      <Reveal y={40}>
        <h1 className="text-[clamp(4rem,19.5vw,22rem)] leading-[0.78] font-black tracking-[-0.03em] uppercase [font-stretch:62%]">
          Atelier
          <br />
          Nord<span className="text-[#FF3B1F]">.</span>
        </h1>
      </Reveal>
      <div className="mt-10 grid gap-6 border-t border-[#111] pt-4 md:grid-cols-12">
        <p className={cn(label, "md:col-span-3")}>(Manifeste)</p>
        <Reveal className="md:col-span-6" delay={0.1}>
          <p className="text-2xl leading-[1.15] font-medium tracking-tight md:text-4xl">
            Nous concevons des bâtiments calmes pour des climats rudes. Une architecture de précision, ancrée dans son paysage, faite pour durer
            cent ans.
          </p>
        </Reveal>
        <div className={cn(label, "space-y-1 md:col-span-3 md:text-right")}>
          <p>Fondé en 2009</p>
          <p>14 architectes</p>
          <p>62 projets livrés</p>
        </div>
      </div>
    </section>
  );
}

function Feature() {
  return (
    <section className="mt-24 grid gap-px bg-[#111] lg:grid-cols-12">
      <div className="relative aspect-[4/3] bg-[#C9C6BE] lg:col-span-8 lg:aspect-auto lg:min-h-[70vh]">
        <div className="absolute inset-x-[15%] top-[30%] bottom-0 bg-[#111]/85 [clip-path:polygon(0_45%,38%_0,100%_30%,100%_100%,0_100%)]" />
        <div className="absolute top-[52%] left-[40%] h-[22%] w-[9%] bg-[#FF3B1F]" />
        <span className={cn(label, "absolute top-4 left-4")}>Fig. 014</span>
      </div>
      <div className="flex flex-col justify-between bg-[#F2F2F0] p-4 md:p-6 lg:col-span-4">
        <p className={label}>Projet en vedette</p>
        <div className="mt-16">
          <h2 className="text-6xl leading-[0.85] font-black tracking-[-0.02em] uppercase [font-stretch:70%] xl:text-7xl">Fjordhus</h2>
          <p className="mt-6 max-w-xs leading-snug">
            Une maison de 180 m² posée sur un socle de granit, ouverte sur le fjord par une unique baie de 14 mètres.
          </p>
          <dl className={cn(label, "mt-8 grid grid-cols-2 gap-y-2 border-t border-[#111] pt-3")}>
            <dt className="text-[#9A9A96]">Lieu</dt>
            <dd>Bergen, NO</dd>
            <dt className="text-[#9A9A96]">Surface</dt>
            <dd>180 m²</dd>
            <dt className="text-[#9A9A96]">Statut</dt>
            <dd>Livré 2025</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <section id="index" className="scroll-mt-4 px-4 py-28 md:px-6">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="text-5xl font-black tracking-[-0.02em] uppercase [font-stretch:70%] md:text-8xl">Index</h2>
        <p className={label}>(06 / 62)</p>
      </div>
      <ProjectIndex />
    </section>
  );
}

function Principles() {
  return (
    <section id="studio" className="bg-[#111] px-4 py-28 text-[#F2F2F0] md:px-6">
      <p className={cn(label, "mb-16")}>(Principes)</p>
      <div className="grid gap-px bg-[#F2F2F0]/20 md:grid-cols-3">
        {content.principles.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.1} className="bg-[#111] pt-6 pb-12 md:pr-10 md:pl-6">
            <span className="text-8xl font-black text-[#FF3B1F] [font-stretch:62%]">{p.n}</span>
            <h3 className="mt-8 text-2xl font-bold tracking-tight uppercase">{p.t}</h3>
            <p className="mt-3 max-w-xs text-[#F2F2F0]/60">{p.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="px-4 pt-20 pb-28 md:px-6">
      <div className={cn(label, "grid gap-6 border-t border-[#111] pt-4 md:grid-cols-12")}>
        <p className="md:col-span-3">(Contact)</p>
        <address className="not-italic md:col-span-3">
          Tollbugata 24
          <br />
          0157 Oslo, Norvège
        </address>
        <p className="md:col-span-3">
          studio@ateliernord.no
          <br />
          +47 22 00 00 00
        </p>
        <p className="md:col-span-3 md:text-right">Instagram / LinkedIn</p>
      </div>
      <a href="#" className="mt-16 block text-[clamp(3rem,13vw,14rem)] leading-[0.8] font-black tracking-[-0.03em] uppercase [font-stretch:62%] transition-colors hover:text-[#FF3B1F]">
        Écrivez-nous →
      </a>
    </footer>
  );
}

export function AtelierNordSite() {
  return (
    <div className={cn(fontVars, "min-h-dvh overflow-x-hidden bg-[#F2F2F0] font-[family-name:var(--nord-sans)] text-[#111] selection:bg-[#FF3B1F] selection:text-white")}>
      <TopBar />
      <main>
        <Hero />
        <Feature />
        <Index />
        <Principles />
      </main>
      <Footer />
    </div>
  );
}
