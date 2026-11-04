# Portfolio — Tom Bartuzel

Portfolio haut de gamme qui présente des **sous-sites complets** (« inspirations »), chacun avec sa propre direction artistique, pour montrer aux clients ce qu'il est possible de réaliser pour eux.

**Stack :** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Three.js (React Three Fiber)

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production (toutes les pages sont statiques)
npm run lint
```

## Structure

```
src/
├── app/
│   ├── layout.tsx                 # Socle : <html>, polices du portfolio, styles globaux
│   ├── globals.css                # Tokens du portfolio (couleurs, polices, animations)
│   ├── (portfolio)/               # Groupe de routes du site vitrine (n'apparaît pas dans l'URL)
│   │   ├── layout.tsx             # Header + footer du portfolio
│   │   └── page.tsx               # Accueil : hero, inspirations, savoir-faire, méthode, contact
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
│   ├── demo-shell/                # Chrome commun aux démos (DemoBar)
│   └── ui/                        # Primitives partagées (Reveal, RevealLines)
│
├── config/site.ts                 # Identité, e-mail, réseaux, navigation
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

## Personnaliser

- **Identité & contact** : `src/config/site.ts` (pensez à remplacer `contact@votre-domaine.fr`).
- **Visuels** : les « photos » des démos sont générées en CSS pour rester légères et libres de droits. Pour utiliser de vraies images, déposez-les dans `public/demos/<slug>/` et remplacez les composants `Photo` / blocs colorés par `next/image`.
