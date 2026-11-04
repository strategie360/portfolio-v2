"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { BASE_PRICE, finishes, shades, sizes } from "./content";

/** La scène WebGL n'est chargée que dans le navigateur, après le premier rendu. */
const OrbeScene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <div className="size-40 animate-pulse rounded-full bg-[radial-gradient(circle,#ffd9a0_0%,rgba(201,161,91,.25)_45%,transparent_70%)]" />
    </div>
  ),
});

const eur = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

function Swatches<T extends { id: string; label: string }>({
  title,
  items,
  value,
  onChange,
  swatch,
}: {
  title: string;
  items: readonly T[];
  value: T;
  onChange: (v: T) => void;
  swatch?: (item: T) => string;
}) {
  return (
    <fieldset>
      <legend className="flex w-full justify-between text-xs tracking-[0.2em] uppercase opacity-60">
        <span>{title}</span>
        <span className="tracking-normal normal-case">{value.label}</span>
      </legend>
      <div className="mt-3 flex gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item)}
            aria-pressed={item.id === value.id}
            aria-label={item.label}
            className={cn(
              "grid place-items-center rounded-full border transition",
              swatch ? "size-10" : "h-10 px-4 text-sm",
              item.id === value.id ? "border-[#EDE6DA]" : "border-[#EDE6DA]/15 hover:border-[#EDE6DA]/50",
            )}
          >
            {swatch ? <span className="size-7 rounded-full shadow-inner" style={{ background: swatch(item) }} /> : item.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function Configurator() {
  const [finish, setFinish] = useState<(typeof finishes)[number]>(finishes[0]);
  const [shade, setShade] = useState<(typeof shades)[number]>(shades[0]);
  const [size, setSize] = useState<(typeof sizes)[number]>(sizes[1]);
  const [lit, setLit] = useState(true);
  const reduce = useReducedMotion();

  const price = BASE_PRICE + finish.price + shade.price + size.price;

  return (
    <div className="relative grid min-h-[100svh] lg:grid-cols-[1fr_400px]">
      {/* Halo d'ambiance qui suit l'état allumé / éteint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: lit ? 1 : 0,
          background: `radial-gradient(50% 45% at 40% 42%, ${shade.glow}33, transparent 70%)`,
        }}
      />

      <div className="relative h-[68svh] lg:h-auto">
        <OrbeScene finish={finish} shade={shade} size={size} lit={lit} autoRotate={!reduce} />
        <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] uppercase opacity-50">
          ⟲ Glissez pour tourner
        </p>
      </div>

      <aside className="relative flex flex-col justify-center gap-8 border-t border-[#EDE6DA]/10 px-6 py-10 lg:border-t-0 lg:border-l lg:px-10">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase opacity-60">Configurer</p>
          <h2 className="mt-2 font-[family-name:var(--orbe-serif)] text-4xl italic">Orbe Table</h2>
        </div>

        <Swatches title="Finition" items={finishes} value={finish} onChange={setFinish} swatch={(f) => f.color} />
        <Swatches title="Verre" items={shades} value={shade} onChange={setShade} swatch={(s) => `radial-gradient(circle at 35% 30%, ${s.glow}, ${s.color})`} />
        <Swatches title="Taille" items={sizes} value={size} onChange={setSize} />

        <button
          type="button"
          onClick={() => setLit((v) => !v)}
          aria-pressed={lit}
          className="flex items-center justify-between rounded-full border border-[#EDE6DA]/15 py-2 pr-2 pl-5 text-sm transition hover:border-[#EDE6DA]/50"
        >
          {lit ? "Allumée" : "Éteinte"}
          <span className={cn("relative h-7 w-12 rounded-full transition-colors", lit ? "bg-[#C9A15B]" : "bg-[#EDE6DA]/15")}>
            <span className={cn("absolute top-1 size-5 rounded-full bg-[#EDE6DA] transition-all", lit ? "left-6" : "left-1")} />
          </span>
        </button>

        <div className="flex items-end justify-between border-t border-[#EDE6DA]/10 pt-6">
          <div>
            <p className="text-xs opacity-60">Prix TTC</p>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={price}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                className="font-[family-name:var(--orbe-serif)] text-3xl"
              >
                {eur.format(price)}
              </motion.p>
            </AnimatePresence>
          </div>
          <button type="button" className="rounded-full bg-[#EDE6DA] px-6 py-3 text-sm font-semibold text-[#121110] transition hover:bg-[#C9A15B]">
            Ajouter au panier
          </button>
        </div>
      </aside>
    </div>
  );
}
