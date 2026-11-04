import { TerroirSite } from "@/demos/terroir";
import { demoMetadata } from "@/lib/metadata";

export const metadata = demoMetadata("terroir");

export default function Page() {
  return <TerroirSite />;
}
