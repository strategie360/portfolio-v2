import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

export const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--volt-sans", preload: false });
export const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--volt-mono", preload: false });

export const fontVars = `${grotesk.variable} ${mono.variable}`;
