import type { Metadata } from "next";
import { StylePlayground } from "@/src/components/StylePlayground";

export const metadata: Metadata = { title: "Calma — Rituales para días reales", description: "Una biblioteca suave de rituales para bajar el ritmo y encontrar tu propia forma de calma." };
export default function Layout({ children }: { children: React.ReactNode }) { return <><StylePlayground rootSelector=".clay-page" accent="#ef997b" secondary="#b9cbb7" background="#f4eee3" surface="#f3ce7d" text="#35433a" muted="#66766c" radius={27} borderWidth={0} shadow={12} spacing={24} />{children}</>; }
