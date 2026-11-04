import { Bodoni_Moda, Manrope } from "next/font/google";

export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--orbe-serif",
  preload: false,
});
export const manrope = Manrope({ subsets: ["latin"], variable: "--orbe-sans", preload: false });

export const fontVars = `${bodoni.variable} ${manrope.variable}`;
