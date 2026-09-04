import type { Metadata } from "next";
import { StylePlayground } from "@/src/components/StylePlayground";

export const metadata: Metadata = { title: "Orbital — Espacio digital para equipos", description: "Un canvas espacial para equipos que piensan en dimensiones, conexiones y dirección." };
export default function Layout({ children }: { children: React.ReactNode }) { return <><StylePlayground rootSelector=".spatial-page" accent="#8b5cf6" background="#111827" text="#dbeafe" />{children}</>; }
