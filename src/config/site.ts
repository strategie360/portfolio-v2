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
  email: "contact@votre-domaine.fr",
  location: "France — à distance partout",
  availability: "Disponible pour nouveaux projets",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
} as const;

export const nav = [
  { label: "Inspirations", href: "/#inspirations" },
  { label: "Savoir-faire", href: "/#savoir-faire" },
  { label: "Méthode", href: "/#methode" },
  { label: "Contact", href: "/#contact" },
] as const;
