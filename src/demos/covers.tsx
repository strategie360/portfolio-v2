import type { ComponentType } from "react";
import type { DemoSlug } from "./registry";
import { fontVars as aubeFonts } from "./maison-aube/fonts";
import { fontVars as voltFonts } from "./volt/fonts";
import { fontVars as terroirFonts } from "./terroir/fonts";
import { fontVars as nordFonts } from "./atelier-nord/fonts";
import { fontVars as orbeFonts } from "./orbe/fonts";

/**
 * Aperçus « affiche » de chaque démo, affichés sur la page d'accueil.
 * Ils sont dessinés en CSS avec les vraies polices de chaque univers,
 * donc toujours fidèles et sans capture d'écran à maintenir.
 */

function MaisonAubeCover() {
  return (
    <div className={`${aubeFonts} grain absolute inset-0 bg-[#F4EEE4] text-[#2B241D]`}>
      <div className="absolute inset-x-[12%] top-[14%] bottom-[30%] rounded-t-full bg-[radial-gradient(120%_80%_at_50%_100%,#c9a77f_0%,#a9825e_35%,#6d5640_70%,#3a2f25_100%)]" />
      <div className="absolute inset-x-[12%] top-[14%] bottom-[30%] rounded-t-full bg-[radial-gradient(40%_25%_at_50%_70%,rgba(255,236,205,.85),transparent)]" />
      <div className="absolute inset-x-0 bottom-[9%] text-center">
        <p className="font-[family-name:var(--aube-sans)] text-[0.6rem] tracking-[0.5em] uppercase">Biarritz</p>
        <p className="mt-1 font-[family-name:var(--aube-serif)] text-[clamp(1.8rem,4vw,2.8rem)] leading-none font-light italic">
          Maison Aube
        </p>
      </div>
    </div>
  );
}

function VoltCover() {
  return (
    <div className={`${voltFonts} absolute inset-0 overflow-hidden bg-[#07080C] text-white`}>
      <div className="absolute -top-1/4 left-1/2 size-[90%] -translate-x-1/2 rounded-full bg-[#7C5CFF] opacity-50 blur-[70px]" />
      <div className="absolute top-[20%] right-[-10%] size-[50%] rounded-full bg-[#3DF2C1] opacity-30 blur-[60px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute inset-x-[10%] top-[16%] font-[family-name:var(--volt-sans)]">
        <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-[family-name:var(--volt-mono)] text-[0.55rem] text-[#3DF2C1]">
          ● v2.0 live
        </span>
        <p className="mt-3 text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[0.95] font-semibold tracking-tight">
          Energy,
          <br />
          <span className="text-white/50">on autopilot.</span>
        </p>
      </div>
      <div className="absolute inset-x-[10%] bottom-[10%] grid grid-cols-3 gap-2">
        {["98.2%", "−31%", "4.1k"].map((v) => (
          <div key={v} className="rounded-lg border border-white/10 bg-white/[.04] p-2 font-[family-name:var(--volt-mono)] text-[0.65rem]">
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}

function TerroirCover() {
  return (
    <div className={`${terroirFonts} grain absolute inset-0 overflow-hidden bg-[#F6EBDC] text-[#2E2219]`}>
      <div className="absolute -right-[18%] -bottom-[12%] size-[75%] rounded-full bg-[#C4623A]" />
      <div className="absolute right-[42%] bottom-[8%] size-[26%] rounded-full bg-[#5E6B3A]" />
      <div className="absolute top-[12%] left-[10%] size-[18%] rounded-[40%_60%_55%_45%] bg-[#E3B55B]" />
      <div className="absolute inset-x-[10%] top-[38%] z-10 font-[family-name:var(--terroir-serif)]">
        <p className="text-[clamp(2rem,4.6vw,3.2rem)] leading-[0.9] font-semibold [font-variation-settings:'SOFT'_100,'WONK'_1]">
          Terroir<span className="text-[#C4623A]">.</span>
        </p>
        <p className="mt-2 font-[family-name:var(--terroir-sans)] text-[0.65rem] tracking-wide">Bistrot de saison — Lyon 2e</p>
      </div>
    </div>
  );
}

function AtelierNordCover() {
  return (
    <div className={`${nordFonts} absolute inset-0 bg-[#F2F2F0] p-[8%] text-[#111]`}>
      <div className="grid h-full grid-cols-4 grid-rows-6 gap-px bg-[#111]/15">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={i === 9 ? "bg-[#FF3B1F]" : "bg-[#F2F2F0]"} />
        ))}
      </div>
      <p className="absolute bottom-[8%] left-[8%] font-[family-name:var(--nord-sans)] text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.8] font-black tracking-[-0.03em] uppercase [font-stretch:75%]">
        Atelier
        <br />
        Nord
      </p>
      <p className="absolute top-[8%] right-[8%] font-[family-name:var(--nord-narrow)] text-[0.6rem] uppercase">Oslo / 59.91°N</p>
    </div>
  );
}

function OrbeCover() {
  return (
    <div className={`${orbeFonts} absolute inset-0 overflow-hidden bg-[#121110] text-[#EDE6DA]`}>
      <div className="absolute top-[18%] left-1/2 size-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,217,160,.35),transparent_65%)]" />
      {/* Lampe stylisée */}
      <div className="absolute top-[26%] left-1/2 size-[34%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_40%_35%,#fff6e6,#ffd9a0_40%,#c98a4a_100%)] shadow-[0_0_80px_20px_rgba(255,200,130,.35)]" />
      <div className="absolute top-[59%] left-1/2 h-[3%] w-[7%] -translate-x-1/2 rounded-sm bg-[#C9A15B]" />
      <div className="absolute top-[62%] left-1/2 h-[18%] w-[1%] -translate-x-1/2 bg-[#C9A15B]" />
      <div className="absolute top-[80%] left-1/2 h-[2.5%] w-[30%] -translate-x-1/2 rounded-[50%] bg-[linear-gradient(90deg,#8a6b35,#e2c27f,#8a6b35)]" />
      <p className="absolute top-[8%] left-[8%] font-[family-name:var(--orbe-serif)] text-[clamp(1.6rem,3.5vw,2.4rem)] italic">Orbe</p>
      <p className="absolute top-[9.5%] right-[8%] font-[family-name:var(--orbe-sans)] text-[0.6rem] tracking-[0.25em] uppercase opacity-60">3D · Live</p>
    </div>
  );
}

export const covers: Record<DemoSlug, ComponentType> = {
  "maison-aube": MaisonAubeCover,
  volt: VoltCover,
  terroir: TerroirCover,
  "atelier-nord": AtelierNordCover,
  orbe: OrbeCover,
};
