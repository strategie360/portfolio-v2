"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { content, type MenuSection } from "./content";

const sections = Object.keys(content.menu) as MenuSection[];

/** Carte à onglets, animée. */
export function Menu() {
  const [active, setActive] = useState<MenuSection>(sections[1]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist">
        {sections.map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={active === s}
            onClick={() => setActive(s)}
            className={cn(
              "rounded-full border-2 border-[#2E2219] px-5 py-2 text-sm font-medium transition",
              active === s ? "bg-[#2E2219] text-[#F6EBDC]" : "hover:bg-[#2E2219]/5",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="mt-10 divide-y-2 divide-dashed divide-[#2E2219]/20"
        >
          {content.menu[active].map((dish) => (
            <li key={dish.name} className="flex items-baseline gap-4 py-6">
              <div className="flex-1">
                <h3 className="font-[family-name:var(--terroir-serif)] text-2xl font-semibold md:text-3xl">{dish.name}</h3>
                <p className="mt-1 text-[#2E2219]/70">{dish.desc}</p>
              </div>
              <span className="font-[family-name:var(--terroir-serif)] text-2xl text-[#C4623A] italic">{dish.price} €</span>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
