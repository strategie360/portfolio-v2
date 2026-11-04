import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Numérotation à deux chiffres : 1 → "01". */
export function pad(n: number) {
  return String(n).padStart(2, "0");
}
