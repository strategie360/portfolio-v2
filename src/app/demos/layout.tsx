import { DemoBar } from "@/components/demo-shell/demo-bar";

/**
 * Coque commune à tous les sous-sites.
 * Chaque démo garde sa propre identité visuelle (polices, couleurs) ;
 * ce layout ajoute seulement la barre de navigation flottante.
 */
export default function DemosLayout({ children }: LayoutProps<"/demos">) {
  return (
    <>
      {children}
      <DemoBar />
    </>
  );
}
