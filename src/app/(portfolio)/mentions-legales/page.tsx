import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Qui édite ce site, qui l'héberge et comment vos informations sont utilisées.",
};

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
      <div className="mt-5 space-y-3 text-lg leading-relaxed text-ivory/80">{children}</div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-36 pb-20 md:px-10 md:pt-44 md:pb-28">
      <h1 className="mb-14 font-display text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95]">Mentions légales</h1>

      <Block title="Qui édite ce site">
        <p>{site.name}, entrepreneur individuel (EI)</p>
        {/* À remplacer par le numéro dès qu'il est attribué. */}
        <p>SIREN : en cours d&apos;attribution</p>
        <p>Adresse : 18 rue des Peupliers, 34830 Clapiers</p>
        <p>
          Téléphone : <a className="underline underline-offset-4" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
        </p>
        <p>
          E-mail : <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>Responsable de la publication : {site.name}</p>
      </Block>

      <Block title="Qui héberge ce site">
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
        <p>Téléphone : +1 559 288 7060</p>
      </Block>

      <Block title="Vos informations">
        <p>
          Ce site ne dépose aucun cookie de suivi. Il utilise Vercel Web Analytics pour mesurer sa fréquentation de façon globale : pages
          vues, site d&apos;origine, pays, type d&apos;appareil et navigateur. Ces statistiques ne servent pas à vous identifier.
        </p>
        <p>L&apos;hébergeur peut conserver des informations techniques nécessaires au fonctionnement du site.</p>
        <p>
          Si vous m&apos;écrivez ou m&apos;appelez, vos coordonnées servent uniquement à vous répondre et à suivre notre échange. Vous pouvez
          demander à les consulter, les corriger ou les supprimer en écrivant à {site.email}. Vous pouvez aussi vous adresser à la CNIL.
        </p>
      </Block>

      <Block title="Les exemples présentés">
        <p>
          Les sites de la partie « Inspirations » sont des exemples imaginés. Les marques, les lieux, les prix et les chiffres qu&apos;ils
          affichent sont fictifs.
        </p>
      </Block>
    </div>
  );
}
