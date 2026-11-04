/** Options du configurateur : chaque option pilote à la fois la 3D et le prix. */
export const finishes = [
  { id: "laiton", label: "Laiton brossé", color: "#C9A15B", metalness: 1, roughness: 0.32, price: 0 },
  { id: "noir", label: "Noir mat", color: "#1c1b1a", metalness: 0.6, roughness: 0.65, price: 0 },
  { id: "chrome", label: "Chrome poli", color: "#e8e8e8", metalness: 1, roughness: 0.08, price: 60 },
  { id: "cuivre", label: "Cuivre", color: "#B8673F", metalness: 1, roughness: 0.28, price: 90 },
] as const;

export const shades = [
  { id: "opale", label: "Verre opale", color: "#f5efe6", glow: "#FFD9A0", opacity: 1, price: 0 },
  { id: "fume", label: "Verre fumé", color: "#5a524b", glow: "#ffb46b", opacity: 1, price: 40 },
  { id: "ambre", label: "Verre ambré", color: "#d98a3a", glow: "#ff9a3c", opacity: 1, price: 40 },
] as const;

export const sizes = [
  { id: "s", label: "Ø 30", scale: 0.85, price: 0 },
  { id: "m", label: "Ø 40", scale: 1, price: 180 },
] as const;

export const BASE_PRICE = 690;

export type Finish = (typeof finishes)[number];
export type Shade = (typeof shades)[number];
export type Size = (typeof sizes)[number];

export const content = {
  nav: ["Collection", "Configurer", "Atelier", "Revendeurs"],
  craft: [
    { n: "01", t: "Soufflé à la bouche", d: "Chaque globe est soufflé à la canne par un maître verrier de Murano. Aucun n'est identique." },
    { n: "02", t: "Tourné à Lyon", d: "Socles et tiges sont tournés dans la masse, puis brossés et vernis à la main dans notre atelier." },
    { n: "03", t: "Garanti à vie", d: "Pièces détachées disponibles pour toujours. Une lampe Orbe se transmet, elle ne se jette pas." },
  ],
  collection: [
    { name: "Orbe Table", price: "dès 690 €", bg: "radial-gradient(circle at 50% 40%,#ffe3b8 0%,#e9b878 18%,#2a2320 50%)" },
    { name: "Orbe Suspension", price: "dès 840 €", bg: "radial-gradient(circle at 50% 55%,#fff1da 0%,#d9a46a 16%,#1f1a17 48%)" },
    { name: "Orbe Applique", price: "dès 520 €", bg: "radial-gradient(circle at 45% 50%,#ffd1a0 0%,#c47c48 18%,#221c19 52%)" },
  ],
  specs: [
    ["Source", "LED 2700 K, 9 W — gradable"],
    ["Matériaux", "Verre soufflé, laiton massif"],
    ["Hauteur", "52 cm (Ø 40) · 44 cm (Ø 30)"],
    ["Fabrication", "Murano & Lyon"],
    ["Délai", "3 à 4 semaines"],
  ],
} as const;
