import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";

/** Chrome du portfolio (header + footer), absent des sous-sites. */
export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-ink text-ivory selection:bg-accent selection:text-ink">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
