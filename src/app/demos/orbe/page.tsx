import { OrbeSite } from "@/demos/orbe";
import { demoMetadata } from "@/lib/metadata";

export const metadata = demoMetadata("orbe");

export default function Page() {
  return <OrbeSite />;
}
