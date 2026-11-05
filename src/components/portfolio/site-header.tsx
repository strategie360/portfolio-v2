"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Lien de la page courante (les liens avec ancre ne comptent pas). */
  const isCurrent = (href: string) => !href.includes("#") && href === pathname;

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

        {/* Menu complet à partir de 1024 px ; en dessous, bouton « Menu » */}
        <nav aria-label="Menu principal" className="hidden items-center gap-8 text-[15px] text-ivory/75 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className="py-2 transition hover:text-ivory aria-[current=page]:text-ivory aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:underline-offset-8"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden min-h-11 items-center gap-2 rounded-full bg-ivory px-5 text-[15px] font-medium text-ink transition hover:bg-accent lg:inline-flex"
        >
          Démarrer un projet
        </Link>

        <button
          type="button"
          className="-mr-3 min-h-12 px-3 text-base lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Menu principal" className="flex flex-col gap-1 border-t border-line px-5 py-4 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className="py-2 font-display text-3xl aria-[current=page]:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
