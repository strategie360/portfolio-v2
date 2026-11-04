import { MaisonAubeSite } from "@/demos/maison-aube";
import { demoMetadata } from "@/lib/metadata";

export const metadata = demoMetadata("maison-aube");

export default function Page() {
  return <MaisonAubeSite />;
}
