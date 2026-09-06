import type { Metadata } from "next";
import { StylePlayground } from "@/src/components/StylePlayground";

export const metadata: Metadata = { title: "NODO — Interfaces con intención", description: "Diseñamos sistemas digitales que convierten complejidad en movimiento claro." };
export default function Layout({ children }: { children: React.ReactNode }) { return <><StylePlayground rootSelector=".special-page" accent="#d9ff5f" secondary="#9a9a91" background="#11120f" surface="#eee9df" text="#eee9df" muted="#9a9a91" />{children}</>; }
