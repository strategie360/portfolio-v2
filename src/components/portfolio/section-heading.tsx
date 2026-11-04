import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12">
      <Reveal className="md:col-span-3">
        <p className="font-mono text-xs tracking-widest text-mute uppercase">{eyebrow}</p>
      </Reveal>
      <Reveal className="md:col-span-6" delay={0.05}>
        <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.95] tracking-[-0.01em]">{title}</h2>
      </Reveal>
      {aside && (
        <Reveal className="self-end text-mute md:col-span-3" delay={0.1}>
          {aside}
        </Reveal>
      )}
    </div>
  );
}
