import type { Metadata } from "next";
import { StylePlayground } from "@/src/components/StylePlayground";

export const metadata: Metadata = { title: "Orbital — Espacio digital para equipos", description: "Un canvas espacial para equipos que piensan en dimensiones, conexiones y dirección." };
export default function Layout({ children }: { children: React.ReactNode }) { return <><StylePlayground rootSelector=".spatial-page" accent="#8aa8ff" secondary="#f5a9cf" background="#0b1020" surface="#e5e8f0" text="#e5e8f0" muted="#8991a8" />{children}</>; }
