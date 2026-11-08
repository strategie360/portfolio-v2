/**
 * Informations globales du portfolio.
 * Modifiez ce fichier pour personnaliser l'identité, les liens et le contact.
 */
export const site = {
  name: "Tom Bartuzel",
  shortName: "TB",
  role: "Création de sites pour les commerces",
  tagline: "Des sites qui donnent envie de venir chez vous.",
  description:
    "Je crée des sites pour les commerces : restaurants, artisans, boutiques. Site vitrine à partir de 200 €, outils sur mesure à partir de 500 €.",
  email: "tom@bartuzel.me",
  phone: "07 75 76 63 29",
  location: "France — à distance partout",
  availability: "Disponible pour nouveaux projets",
} as const;

/**
 * Menu principal. Savoir-faire et Méthode restent sur l'accueil
 * (accessibles en faisant défiler) pour garder un menu court et simple.
 */
export const nav = [
  { label: "Inspirations", href: "/#inspirations" },
  { label: "Prestations", href: "/prestations" },
  { label: "Sur mesure", href: "/prestations#sur-mesure" },
  { label: "Contact", href: "/#contact" },
] as const;
