import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Bouton-lien accessible : au moins 48 px de haut (cible tactile confortable),
 * texte de 18 px, contraste élevé.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-center text-lg font-medium transition",
        variant === "primary" && "bg-ivory text-ink hover:bg-accent",
        variant === "secondary" && "border border-ivory/40 text-ivory hover:border-ivory hover:bg-white/5",
        variant === "dark" && "bg-ink text-ivory hover:bg-ink-3",
        className,
      )}
    >
      {children}
    </Link>
  );
}
