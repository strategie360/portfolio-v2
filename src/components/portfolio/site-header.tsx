"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-full border border-line font-display text-sm italic transition group-hover:border-accent group-hover:text-accent">
            {site.shortName}
          </span>
          <span className="text-sm tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-mute md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ivory">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden items-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-ink transition hover:bg-accent md:inline-flex"
        >
          Démarrer un projet
        </Link>

        <button
          type="button"
          className="text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="flex flex-col gap-1 border-t border-line px-5 py-4 md:hidden">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-2 font-display text-3xl">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
