import Link from "next/link";
import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-10 text-base text-mute md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © {site.name} — {site.location}
        </p>
        <Link href="/mentions-legales" className="inline-flex min-h-11 items-center underline-offset-4 transition hover:text-ivory hover:underline">
          Mentions légales
        </Link>
      </div>
    </footer>
  );
}
