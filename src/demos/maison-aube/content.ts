export const content = {
  nav: ["Suites", "Expériences", "Table", "Spa"],
  hero: {
    kicker: "Hôtel particulier — Biarritz",
    title: ["Le temps,", "retrouvé."],
    text: "Quatorze suites face à l'Atlantique, dans une villa de 1904 restaurée pierre par pierre.",
  },
  intro:
    "Il y a des lieux qui ne se visitent pas : ils se vivent. Maison Aube a été pensée comme une parenthèse — des matières brutes, une lumière qui change d'heure en heure, et le bruit des vagues pour seule horloge. Ici, rien ne presse.",
  suites: [
    { name: "Suite Océane", size: "48 m²", price: "à partir de 640 €", tone: "ocean" },
    { name: "Suite des Pins", size: "36 m²", price: "à partir de 480 €", tone: "pine" },
    { name: "L'Atelier", size: "72 m²", price: "à partir de 920 €", tone: "sand" },
  ],
  experiences: [
    { title: "Le bain d'aube", text: "Session de surf privée au lever du soleil, suivie d'un petit-déjeuner sur la plage." },
    { title: "Table d'hôte", text: "Le chef compose chaque soir un menu unique autour des produits du marché de Biarritz." },
    { title: "Rituel iodé", text: "Soins aux algues et pierres chaudes dans notre spa creusé à même la roche." },
  ],
  quote: {
    text: "Un des rares endroits où l'élégance ne s'impose jamais : elle se murmure.",
    source: "Condé Nast Traveller",
  },
} as const;
