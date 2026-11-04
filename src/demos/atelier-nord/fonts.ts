import { Archivo, Archivo_Narrow } from "next/font/google";

export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--nord-sans", preload: false });
export const narrow = Archivo_Narrow({ subsets: ["latin"], variable: "--nord-narrow", preload: false });

export const fontVars = `${archivo.variable} ${narrow.variable}`;
