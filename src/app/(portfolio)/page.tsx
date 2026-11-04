import { Hero } from "@/components/portfolio/hero";
import { Marquee } from "@/components/portfolio/marquee";
import { Showcase } from "@/components/portfolio/showcase";
import { Capabilities } from "@/components/portfolio/capabilities";
import { Process } from "@/components/portfolio/process";
import { Contact } from "@/components/portfolio/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Showcase />
      <Capabilities />
      <Process />
      <Contact />
    </>
  );
}
