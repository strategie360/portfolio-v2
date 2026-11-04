"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { content } from "./content";

/**
 * Index de projets : au survol, une vignette suit le curseur.
 * Remplacez le bloc coloré par une <Image> de vos réalisations.
 */
export function ProjectIndex() {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  const project = hovered === null ? null : content.projects[hovered];

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="grid grid-cols-12 border-b border-[#111] pb-2 font-[family-name:var(--nord-narrow)] text-xs uppercase">
        <span className="col-span-2 md:col-span-1">N°</span>
        <span className="col-span-6 md:col-span-5">Projet</span>
        <span className="hidden md:col-span-3 md:block">Typologie</span>
        <span className="col-span-2">Lieu</span>
        <span className="col-span-2 text-right md:col-span-1">Année</span>
      </div>

      <ul>
        {content.projects.map((p, i) => (
          <li
            key={p.id}
            onMouseEnter={() => setHovered(i)}
            className="group grid cursor-pointer grid-cols-12 items-baseline border-b border-[#111]/20 py-4 transition-colors hover:bg-[#111] hover:text-[#F2F2F0] md:py-5"
          >
            <span className="col-span-2 pl-1 font-[family-name:var(--nord-narrow)] text-sm md:col-span-1">{p.id}</span>
            <span className="col-span-6 text-2xl font-bold tracking-tight uppercase [font-stretch:80%] transition-transform group-hover:translate-x-2 md:col-span-5 md:text-4xl">
              {p.name}
            </span>
            <span className="hidden text-sm md:col-span-3 md:block">{p.type}</span>
            <span className="col-span-2 text-sm">{p.place}</span>
            <span className="col-span-2 pr-1 text-right text-sm md:col-span-1">{p.year}</span>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {project && (
          <motion.div
            key="preview"
            className="pointer-events-none absolute top-0 left-0 z-10 hidden md:block"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="-translate-x-1/2 -translate-y-[110%]">
              <motion.div
                key={project.id}
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-56 w-44 overflow-hidden"
                style={{ background: project.tone }}
              >
                <div className="absolute inset-x-4 top-1/3 bottom-0 bg-[#111]/15 [clip-path:polygon(0_40%,50%_0,100%_40%,100%_100%,0_100%)]" />
                <span className="absolute bottom-2 left-2 font-[family-name:var(--nord-narrow)] text-[0.65rem] text-[#111] uppercase">
                  {project.id} — {project.name}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
