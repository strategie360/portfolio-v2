"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { content } from "./content";

/** Grille tarifaire avec bascule mensuel / annuel (−20 %). */
export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <div>
      <div className="mx-auto mb-12 flex w-fit rounded-full border border-white/10 bg-white/[.03] p-1 text-sm">
        {[
          { label: "Mensuel", value: false },
          { label: "Annuel · −20%", value: true },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => setYearly(opt.value)}
            className="relative rounded-full px-5 py-2"
            aria-pressed={yearly === opt.value}
          >
            {yearly === opt.value && (
              <motion.span layoutId="volt-toggle" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
            )}
            <span className={cn("relative transition", yearly === opt.value ? "text-[#07080C]" : "text-white/60")}>{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {content.plans.map((plan) => {
          const featured = "featured" in plan && plan.featured;
          const price = plan.monthly === null ? null : Math.round(plan.monthly * (yearly ? 0.8 : 1));
          return (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8",
                featured ? "border-[#7C5CFF]/60 bg-[linear-gradient(180deg,rgba(124,92,255,.18),rgba(124,92,255,.02))]" : "border-white/10 bg-white/[.02]",
              )}
            >
              {featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-[#7C5CFF] px-3 py-1 font-[family-name:var(--volt-mono)] text-[0.65rem] uppercase">
                  Le plus choisi
                </span>
              )}
              <h3 className="text-lg font-medium">{plan.name}</h3>
              <p className="mt-1 text-sm text-white/50">{plan.text}</p>
              <p className="mt-8 flex items-baseline gap-1">
                {price === null ? (
                  <span className="text-5xl font-semibold tracking-tight">Sur devis</span>
                ) : (
                  <>
                    <motion.span key={price} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-semibold tracking-tight">
                      {price} €
                    </motion.span>
                    <span className="text-white/40">/mois</span>
                  </>
                )}
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/70">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="text-[#3DF2C1]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={cn(
                  "mt-10 rounded-full py-3 text-center text-sm font-medium transition",
                  featured ? "bg-white text-[#07080C] hover:bg-[#3DF2C1]" : "border border-white/15 hover:bg-white/10",
                )}
              >
                {price === null ? "Parler à l'équipe" : "Démarrer l'essai"}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
