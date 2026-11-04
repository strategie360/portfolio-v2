import { Cormorant_Garamond, Jost } from "next/font/google";

export const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--aube-serif",
  preload: false,
});

export const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--aube-sans", preload: false });

export const fontVars = `${serif.variable} ${sans.variable}`;
