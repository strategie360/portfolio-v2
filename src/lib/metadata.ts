import type { Metadata } from "next";
import { site } from "@/config/site";
import { getDemo, type DemoSlug } from "@/demos/registry";

/** Métadonnées standardisées pour chaque sous-site. */
export function demoMetadata(slug: DemoSlug): Metadata {
  const demo = getDemo(slug);
  if (!demo) return {};
  return {
    title: `${demo.name} — ${demo.sector}`,
    description: `${demo.summary} Une démo conçue par ${site.name}.`,
    robots: { index: true, follow: true },
  };
}
