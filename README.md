# Portfolio — Tom Bartuzel

Portfolio haut de gamme qui présente des **sous-sites complets** (« inspirations »), chacun avec sa propre direction artistique, pour montrer aux clients ce qu'il est possible de réaliser pour eux.

**Stack :** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Three.js (React Three Fiber)

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production (toutes les pages sont statiques)
npm run lint
npm run check   # tous les tests (voir « Tester le site »)
```

## Structure

```
src/
├── app/
│   ├── layout.tsx                 # Socle : <html>, polices du portfolio, styles globaux
│   ├── globals.css                # Tokens du portfolio (couleurs, polices, animations)
│   ├── (portfolio)/               # Groupe de routes du site vitrine (n'apparaît pas dans l'URL)
│   │   ├── layout.tsx             # Header + footer du portfolio
│   │   ├── page.tsx               # Accueil : hero, inspirations, renvoi prestations, savoir-faire, méthode, contact
│   │   ├── prestations/page.tsx   # /prestations : offres, paiement, « Sur mesure » (#sur-mesure), contact
│   │   └── mentions-legales/page.tsx  # Éditeur, hébergeur, données personnelles
│   └── demos/
│       ├── layout.tsx             # Ajoute la barre flottante (DemoBar) à chaque sous-site
│       ├── page.tsx               # /demos → redirige vers /#inspirations
│       └── <slug>/page.tsx        # Route mince : métadonnées + composant du sous-site
│
├── demos/                         # ⭐ Le code des sous-sites
│   ├── registry.ts                # Source unique : nom, secteur, palette, polices…
│   ├── covers.tsx                 # Aperçus « affiche » affichés sur l'accueil
│   └── <slug>/
│       ├── index.ts               # Point d'entrée public du sous-site
│       ├── site.tsx               # Mise en page et sections
│       ├── content.ts             # Textes et données (séparés de la présentation)
│       ├── fonts.ts               # Polices propres à l'univers
│       └── *.tsx                  # Composants interactifs spécifiques ("use client")
│
├── components/
│   ├── portfolio/                 # Sections du site vitrine
│   ├── prestations/               # Sections de la page Prestations
│   ├── demo-shell/                # Chrome commun aux démos (DemoBar)
│   └── ui/                        # Primitives partagées (Reveal, RevealLines)
│
├── config/site.ts                 # Identité, e-mail, téléphone, navigation
└── lib/                           # Utilitaires (cn, pad, demoMetadata)
```

### Principes

- **Isolation des sous-sites** : chaque démo a ses polices (`fonts.ts`) et ses couleurs en local. Aucune démo ne dépend des tokens du portfolio, on peut donc en modifier une sans risque pour les autres.
- **Registre unique** : `src/demos/registry.ts` alimente l'accueil, la barre de navigation des démos et le SEO. Rien n'est dupliqué.
- **Contenu ≠ présentation** : les textes sont dans `content.ts`, ce qui permet de décliner une démo pour un prospect en quelques minutes.
- **Serveur par défaut** : seuls les composants interactifs (tarifs, carte, index de projets, animations) sont des Client Components.

## Les sous-sites

| Slug | Marque | Secteur | Direction | Interaction phare |
| --- | --- | --- | --- | --- |
| `maison-aube` | Maison Aube | Hôtellerie de luxe | Éditorial, serif, silence | Module de réservation |
| `volt` | Volt | SaaS & Tech | Sombre, halos, bento | Tarifs mensuel / annuel |
| `terroir` | Terroir | Restaurant | Organique, chaleureux | Carte à onglets animée |
| `atelier-nord` | Atelier Nord | Architecture | Grille suisse, radical | Index avec aperçu au curseur |
| `orbe` | Orbe | E-commerce / produit | Immersif, sculptural | Configurateur 3D temps réel |

### La démo 3D (Orbe)

- `scene.tsx` : scène WebGL (React Three Fiber + drei). La lampe est modélisée avec des primitives ; pour un vrai produit, exportez un `.glb` depuis Blender dans `public/demos/orbe/` et chargez-le avec `useGLTF`.
- `configurator.tsx` : état du configurateur, partagé entre l'interface et la 3D. La scène est chargée avec `next/dynamic` (`ssr: false`) : le reste de la page s'affiche immédiatement et le bundle Three.js ne pèse que sur cette route.
- L'éclairage utilise des `Lightformer` locaux : aucun fichier HDR téléchargé depuis un CDN.

## Tester le site

Les tests ouvrent le site dans un vrai Chrome (headless), sur le build de production. Toutes les pages du portfolio et toutes les démos du registre sont incluses automatiquement.

```bash
npm run check              # tout : lint + build + parcours + accessibilité + responsive
npm run check:navigation   # parcours et contenu
npm run check:a11y         # accessibilité
npm run check:responsive   # mise en page à 7 largeurs (320 → 1920 px)
npm run check:cls          # texte « qui bouge » : décalages au chargement sur réseau lent
```

| Script | Ce qu'il vérifie |
| --- | --- |
| `check-navigation.mjs` | Menu ordinateur et mobile, page courante signalée, ancres et boutons, liens internes, focus clavier visible. **Garde-fou contenu** : sur Prestations, seuls les prix validés (création, prix unique, hébergement, grille des résultats), aucune promesse. |
| `check-a11y.mjs` | Règles WCAG 2.2 AA (axe-core), contrastes mesurés à l'écran quand axe ne peut pas les calculer (dégradés, grain), paragraphes ≥ 16 px, liens et boutons ≥ 14 px, cibles tactiles ≥ 24 px (44 px recommandés sur Prestations). Strict sur le portfolio, informatif sur les démos. |
| `check-responsive.mjs` | Défilement horizontal, textes qui se chevauchent, sortent de l'écran ou débordent, CLS. |

- Rapports et captures dans `.checks/` (ignoré par git). Code de sortie `1` en cas de problème : utilisable tel quel en CI.
- Options communes : `--url http://localhost:3000` (serveur déjà lancé), `--pages /prestations`, `--widths 375,1440`.
- Nécessite Google Chrome installé (ou la variable `CHROME_PATH`). Dépendances de développement uniquement : `playwright-core`, `axe-core`.

## Emplacements à compléter

Les informations encore inconnues sont marquées `[À COMPLÉTER : …]` et apparaissent **surlignées en pointillé** sur le site. Pour les lister :

```bash
grep -rn "À COMPLÉTER" src
```

L'adresse e-mail et le téléphone se règlent dans `src/config/site.ts`.

## Compteur de résultats et rapport mensuel

Pour les clients en formule « selon les résultats ». Le compteur ne garde aucune donnée personnelle. La grille se règle dans `src/lib/results/grid.mjs` (la page Prestations la reprend).

**Mise en place, une seule fois :** créez un projet Supabase, exécutez `supabase/resultats.sql`, puis renseignez `SUPABASE_URL` et `SUPABASE_SECRET_KEY` (clé `sb_secret_…`) dans `.env.local` et sur Vercel. La clé secrète reste côté serveur : jamais de préfixe `NEXT_PUBLIC_`.

```bash
npm run results -- add-client --slug boulangerie --name "Boulangerie X" --start 2026-12-01
npm run results -- reject --client boulangerie --ref commande-42   # écarte un spam
npm run results -- report --client boulangerie --month 2026-11     # crée .reports/boulangerie-2026-11.html
```

**Sur le site du client**, depuis le serveur uniquement, quand une demande réelle arrive :

```ts
await fetch("https://votre-domaine/api/resultats", {
  method: "POST",
  headers: { Authorization: `Bearer ${process.env.RESULTS_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ kind: "devis", ref: demande.id }), // reservation | rendez-vous | devis | vente (+ amountCents)
});
```

`ref` doit être unique pour chaque demande : un doublon n'est compté qu'une fois. Le mois où le contrat commence compte comme le mois 1.

## Ajouter un sous-site

1. **Créer le dossier** `src/demos/mon-slug/` avec `fonts.ts`, `content.ts`, `site.tsx` et `index.ts` (copier une démo existante est le plus rapide).
2. **Déclarer la démo** dans `src/demos/registry.ts` : ajouter le slug au type `DemoSlug`, puis une entrée dans `demos`.
3. **Ajouter sa couverture** dans `src/demos/covers.tsx` (TypeScript signale l'oubli).
4. **Créer la route** `src/app/demos/mon-slug/page.tsx` :

   ```tsx
   import { MonSite } from "@/demos/mon-slug";
   import { demoMetadata } from "@/lib/metadata";

   export const metadata = demoMetadata("mon-slug");

   export default function Page() {
     return <MonSite />;
   }
   ```

La carte apparaît automatiquement sur l'accueil et dans la navigation entre démos.

5. **Vérifier** avec `npm run check` : la nouvelle démo est testée automatiquement.

## Personnaliser

- **Identité & contact** : `src/config/site.ts`.
- **Visuels** : les « photos » des démos sont générées en CSS pour rester légères et libres de droits. Pour utiliser de vraies images, déposez-les dans `public/demos/<slug>/` et remplacez les composants `Photo` / blocs colorés par `next/image`.
