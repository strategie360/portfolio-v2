"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { demoHref, getDemo, getSiblings, type DemoSlug } from "@/demos/registry";
import { site } from "@/config/site";
import { pad } from "@/lib/utils";

/**
 * Barre flottante affichée sur chaque sous-site.
 * Elle rappelle au client qu'il s'agit d'une démo du portfolio
 * et permet de naviguer entre les univers sans revenir à l'accueil.
 */
export function DemoBar() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2] as DemoSlug | undefined;
  const demo = slug ? getDemo(slug) : undefined;
  const [open, setOpen] = useState(false);

  if (!demo) return null;
  const { prev, next, index } = getSiblings(demo.slug);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4 font-[family-name:var(--font-geist-sans)]">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0d]/85 text-[#f1ede6] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-white/10"
            >
              <div className="space-y-3 p-4 text-sm">
                <p className="text-white/60">{demo.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {demo.highlights.map((h) => (
                    <span key={h} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/80">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>{demo.fonts.join(" · ")}</span>
                  <span className="flex gap-1">
                    {demo.palette.map((c) => (
                      <span key={c} className="size-3.5 rounded-full ring-1 ring-white/20" style={{ background: c }} />
                    ))}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1 p-1.5 text-sm">
          <Link
            href="/#inspirations"
            className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-white/10"
            aria-label="Retour au portfolio"
          >
            <span aria-hidden>←</span>
            <span className="font-[family-name:var(--font-instrument)] text-base italic">{site.shortName}</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-white/10"
          >
            <span className="font-mono text-xs text-white/40">{pad(index + 1)}</span>
            <span className="truncate">
              {demo.name}
              <span className="hidden text-white/40 sm:inline"> — {demo.sector}</span>
            </span>
            <span className={`ml-auto text-xs text-white/40 transition ${open ? "rotate-180" : ""}`} aria-hidden>
              ▲
            </span>
          </button>

          <Link
            href={demoHref(prev.slug)}
            className="rounded-xl px-3 py-2 transition hover:bg-white/10"
            aria-label={`Démo précédente : ${prev.name}`}
          >
            ‹
          </Link>
          <Link
            href={demoHref(next.slug)}
            className="rounded-xl px-3 py-2 transition hover:bg-white/10"
            aria-label={`Démo suivante : ${next.name}`}
          >
            ›
          </Link>
          <Link
            href="/#contact"
            className="hidden shrink-0 rounded-xl bg-[#f1ede6] px-3.5 py-2 font-medium text-[#0c0c0d] transition hover:bg-white sm:block"
          >
            Le mien
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
