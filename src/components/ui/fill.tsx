import { Fragment } from "react";

/** Repère les emplacements « [À COMPLÉTER : …] » dans un texte. */
const PLACEHOLDER = /(\[À COMPLÉTER[^\]]*\])/;

export function isPlaceholder(value: string) {
  return PLACEHOLDER.test(value);
}

/**
 * Affiche un texte en surlignant les emplacements à compléter,
 * pour qu'ils sautent aux yeux tant qu'ils ne sont pas remplacés.
 * Rechercher « À COMPLÉTER » dans le projet liste tous ceux qui restent.
 */
export function Fill({ children }: { children: string }) {
  const parts = children.split(PLACEHOLDER);
  return (
    <>
      {parts.map((part, i) =>
        PLACEHOLDER.test(part) ? (
          <mark
            key={i}
            className="rounded-sm border border-dashed border-accent/70 bg-accent/10 px-1 font-mono text-[0.85em] tracking-normal text-accent normal-case"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
