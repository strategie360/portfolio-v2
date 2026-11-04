export const content = {
  nav: ["Produit", "Solutions", "Tarifs", "Docs"],
  logos: ["Northwind", "Helios", "Kinetic", "Arcadia", "Lumen", "Vertex"],
  metrics: [
    { value: "−31%", label: "de facture énergétique en moyenne" },
    { value: "4 200+", label: "sites industriels connectés" },
    { value: "98,2%", label: "précision des prévisions à 72 h" },
    { value: "< 15 min", label: "pour connecter un premier compteur" },
  ],
  plans: [
    {
      name: "Starter",
      monthly: 49,
      text: "Pour un site unique qui veut y voir clair.",
      features: ["1 site", "Tableau de bord temps réel", "Alertes e-mail", "Historique 12 mois"],
    },
    {
      name: "Scale",
      monthly: 189,
      featured: true,
      text: "Pour les équipes qui pilotent plusieurs bâtiments.",
      features: ["Jusqu'à 10 sites", "Optimisation par IA", "API & webhooks", "Support prioritaire"],
    },
    {
      name: "Enterprise",
      monthly: null,
      text: "Pour les réseaux industriels et collectivités.",
      features: ["Sites illimités", "SSO & audit", "Déploiement on-premise", "Customer success dédié"],
    },
  ],
} as const;
