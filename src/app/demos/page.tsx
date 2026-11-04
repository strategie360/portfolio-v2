import { redirect } from "next/navigation";

/** /demos n'a pas de page propre : on renvoie vers la vitrine. */
export default function DemosIndex() {
  redirect("/#inspirations");
}
