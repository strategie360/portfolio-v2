/**
 * Registre central des sous-sites (démos).
 *
 * Source de vérité unique : la page d'accueil, la barre de navigation des
 * démos et les métadonnées SEO lisent toutes ce fichier.
 *
 * Pour ajouter une démo : voir README.md → « Ajouter un sous-site ».
 */

export type DemoSlug = "maison-aube" | "volt" | "terroir" | "atelier-nord";

export type Demo = {
  slug: DemoSlug;
  /** Nom fictif de la marque présentée. */
  name: string;
  /** Secteur ciblé, affiché comme catégorie. */
  sector: string;
  /** Direction artistique en quelques mots. */
  style: string;
  /** Pitch court affiché sur la carte. */
  summary: string;
  /** Ce que la démo prouve au client. */
  highlights: string[];
  /** Couleurs clés (aperçu de la palette). */
  palette: string[];
  /** Typographies utilisées. */
  fonts: string[];
};

export const demos: Demo[] = [
  {
    slug: "maison-aube",
    name: "Maison Aube",
    sector: "Hôtellerie de luxe",
    style: "Éditorial · Raffiné · Silencieux",
    summary:
      "Un hôtel particulier fictif sur la côte basque. Grandes serifs, rythme de magazine et respiration généreuse.",
    highlights: ["Mise en page éditoriale", "Réservation élégante", "Storytelling de marque"],
    palette: ["#F4EEE4", "#D9CBB5", "#8A6F52", "#2B241D"],
    fonts: ["Cormorant Garamond", "Jost"],
  },
  {
    slug: "volt",
    name: "Volt",
    sector: "SaaS & Tech",
    style: "Sombre · Lumineux · Technique",
    summary:
      "Une plateforme d'énergie pilotée par l'IA. Grille bento, halos lumineux, chiffres clés et grille tarifaire.",
    highlights: ["Landing produit", "Bento & métriques", "Pricing clair"],
    palette: ["#07080C", "#151826", "#7C5CFF", "#3DF2C1"],
    fonts: ["Space Grotesk", "JetBrains Mono"],
  },
  {
    slug: "terroir",
    name: "Terroir",
    sector: "Restaurant & Artisanat",
    style: "Chaleureux · Organique · Généreux",
    summary:
      "Un bistrot de saison à Lyon. Formes douces, carte vivante, tons terre et invitation à réserver.",
    highlights: ["Carte du moment", "Identité gourmande", "Parcours réservation"],
    palette: ["#F6EBDC", "#C4623A", "#5E6B3A", "#2E2219"],
    fonts: ["Fraunces", "DM Sans"],
  },
  {
    slug: "atelier-nord",
    name: "Atelier Nord",
    sector: "Architecture & Design",
    style: "Suisse · Rigoureux · Radical",
    summary:
      "Un studio d'architecture à Oslo. Grille stricte, typographie massive, index de projets interactif.",
    highlights: ["Grille typographique", "Index de projets", "Minimalisme assumé"],
    palette: ["#F2F2F0", "#111111", "#FF3B1F", "#9A9A96"],
    fonts: ["Archivo", "Archivo Narrow"],
  },
];

export function getDemo(slug: string): Demo | undefined {
  return demos.find((d) => d.slug === slug);
}

export function demoHref(slug: DemoSlug) {
  return `/demos/${slug}`;
}

/** Démo précédente / suivante (navigation circulaire). */
export function getSiblings(slug: DemoSlug) {
  const i = demos.findIndex((d) => d.slug === slug);
  const prev = demos[(i - 1 + demos.length) % demos.length];
  const next = demos[(i + 1) % demos.length];
  return { prev, next, index: i };
}
