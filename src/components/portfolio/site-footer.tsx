import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-10 text-sm text-mute md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © {site.name} — {site.location}
        </p>
        <ul className="flex gap-6">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="transition hover:text-ivory">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
