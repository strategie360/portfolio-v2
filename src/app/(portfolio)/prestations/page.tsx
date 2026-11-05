import type { Metadata } from "next";
import { Contact } from "@/components/portfolio/contact";
import { CustomTools } from "@/components/prestations/custom-tools";
import { Offers } from "@/components/prestations/offers";
import { PaymentModel } from "@/components/prestations/payment-model";
import { PrestationsHero } from "@/components/prestations/prestations-hero";

export const metadata: Metadata = {
  title: "Prestations",
  description:
    "Site vitrine à partir de 200 €, outils sur mesure à partir de 500 €. Un petit forfait de départ, puis vous payez selon ce que le site vous apporte vraiment.",
};

export default function PrestationsPage() {
  return (
    <>
      <PrestationsHero />
      <Offers />
      <PaymentModel />
      <CustomTools />
      <Contact
        eyebrow="(04) Contact"
        title={
          <>
            Parlons de <em className="text-accent">votre</em> commerce.
          </>
        }
        text="Un message ou un appel suffit. Je vous réponds simplement, sans jargon."
        showPhone
      />
    </>
  );
}
