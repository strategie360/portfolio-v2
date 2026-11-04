import { DM_Sans, Fraunces } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--terroir-serif",
  preload: false,
});
export const dmSans = DM_Sans({ subsets: ["latin"], variable: "--terroir-sans", preload: false });

export const fontVars = `${fraunces.variable} ${dmSans.variable}`;
