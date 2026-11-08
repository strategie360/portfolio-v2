import type { Metadata } from "next";
import { Contact } from "@/components/portfolio/contact";
import { CustomTools } from "@/components/prestations/custom-tools";
import { Offers } from "@/components/prestations/offers";
import { PaymentModel } from "@/components/prestations/payment-model";
import { PrestationsHero } from "@/components/prestations/prestations-hero";

export const metadata: Metadata = {
  title: "Prestations",
  description:
    "Site vitrine à partir de 200 €, outils sur mesure à partir de 500 €. Payez selon ce que le site vous apporte, ou en une seule fois.",
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
        text="Un message ou un appel suffit. Je vous réponds sous 48 h, simplement et sans jargon."
        showPhone
      />
    </>
  );
}
