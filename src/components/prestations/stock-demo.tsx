"use client";

import { useState } from "react";

type Product = { name: string; quantity: number; minimum: number };

const startingStock: Product[] = [
  { name: "Baguettes", quantity: 14, minimum: 5 },
  { name: "Croissants", quantity: 6, minimum: 5 },
  { name: "Sacs de farine", quantity: 2, minimum: 3 },
];

const stepButton =
  "grid size-12 place-items-center rounded-full border border-ivory/30 text-2xl transition hover:border-ivory disabled:opacity-40 disabled:hover:border-ivory/30";

/** Petit outil de démonstration : les données sont imaginées et ne sont pas enregistrées. */
export function StockDemo() {
  const [stock, setStock] = useState(startingStock);
  const toOrder = stock.filter((p) => p.quantity < p.minimum).length;

  function change(name: string, delta: number) {
    setStock((current) => current.map((p) => (p.name === name ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p)));
  }

  return (
    <div>
      <span className="inline-block rounded-full border border-line px-3 py-1 text-sm text-ivory">Exemple imaginé</span>
      <h3 className="mt-4 font-display text-3xl md:text-4xl">Essayez un suivi de stock</h3>
      <p className="mt-3 text-lg leading-relaxed text-ivory/80">Une boulangerie imaginée. Appuyez sur + ou − pour voir l&apos;outil réagir.</p>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {stock.map((p) => {
          const low = p.quantity < p.minimum;
          return (
            <li key={p.name} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4">
              <div>
                <p className="text-lg font-medium">{p.name}</p>
                <p className={low ? "text-base text-accent" : "text-base text-ivory/80"}>{low ? "À recommander" : "Stock correct"}</p>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" className={stepButton} aria-label={`Retirer : ${p.name}`} disabled={p.quantity === 0} onClick={() => change(p.name, -1)}>
                  <span aria-hidden>−</span>
                </button>
                <span className="w-8 text-center text-xl tabular-nums">{p.quantity}</span>
                <button type="button" className={stepButton} aria-label={`Ajouter : ${p.name}`} onClick={() => change(p.name, 1)}>
                  <span aria-hidden>+</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <p aria-live="polite" className="mt-4 text-lg">
        {toOrder === 0 ? "Rien à recommander pour l'instant." : toOrder === 1 ? "1 produit à recommander." : `${toOrder} produits à recommander.`}
      </p>
    </div>
  );
}
