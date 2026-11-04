const words = [
  "Direction artistique",
  "Design d'interface",
  "Développement Next.js",
  "Motion design",
  "SEO & performance",
  "E-commerce",
  "Identité de marque",
];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-line py-6" aria-hidden>
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-4xl italic text-mute md:text-5xl">
            {w}
            <span className="text-accent not-italic text-2xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
