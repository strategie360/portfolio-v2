export const content = {
  nav: ["La carte", "Le lieu", "Producteurs", "Infos"],
  produce: ["Courge butternut", "Cèpes de l'Ardèche", "Saint-Marcellin", "Poire Williams", "Truite de Savoie", "Châtaignes", "Lentilles vertes du Puy"],
  menu: {
    "Pour commencer": [
      { name: "Velouté de butternut", desc: "noisettes torréfiées, huile de sauge", price: 11 },
      { name: "Œuf parfait", desc: "crème de cèpes, pain grillé au levain", price: 13 },
      { name: "Terrine du moment", desc: "pickles maison, moutarde à l'ancienne", price: 12 },
    ],
    "Au cœur du repas": [
      { name: "Truite de Savoie", desc: "beurre noisette, lentilles vertes, céleri", price: 26 },
      { name: "Joue de bœuf confite", desc: "12 heures au vin de Brouilly, purée fumée", price: 28 },
      { name: "Risotto d'épeautre", desc: "courge rôtie, Saint-Marcellin, sauge", price: 22 },
    ],
    "Pour finir": [
      { name: "Poire pochée", desc: "crème crue, crumble au sarrasin", price: 10 },
      { name: "Tarte aux pralines", desc: "la recette de la grand-mère du chef", price: 9 },
      { name: "Fromages affinés", desc: "sélection de la Mère Richard", price: 12 },
    ],
  },
  hours: [
    { d: "Mardi — Vendredi", h: "12h–14h · 19h30–22h" },
    { d: "Samedi", h: "19h–22h30" },
    { d: "Dimanche — Lundi", h: "Fermé" },
  ],
} as const;

export type MenuSection = keyof typeof content.menu;
