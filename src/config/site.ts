/**
 * Informations globales du portfolio.
 * Modifiez ce fichier pour personnaliser l'identité, les liens et le contact.
 */
export const site = {
  name: "Tom Bartuzel",
  shortName: "TB",
  role: "Design & développement web",
  tagline: "Des sites sur-mesure qui ressemblent à votre ambition.",
  description:
    "Studio indépendant de design et développement web. Explorez des univers complets — luxe, tech, gastronomie, architecture — pour imaginer le vôtre.",
  // Adresse provisoire : à remplacer par la vôtre.
  email: "contact@votre-domaine.fr",
  phone: "[À COMPLÉTER : téléphone]",
  location: "France — à distance partout",
  availability: "Disponible pour nouveaux projets",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
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
