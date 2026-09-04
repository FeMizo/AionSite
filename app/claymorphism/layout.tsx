import type { Metadata } from "next";
import { StylePlayground } from "@/src/components/StylePlayground";

export const metadata: Metadata = { title: "Calma — Rituales para días reales", description: "Una biblioteca suave de rituales para bajar el ritmo y encontrar tu propia forma de calma." };
export default function Layout({ children }: { children: React.ReactNode }) { return <><StylePlayground rootSelector=".clay-page" accent="#f4a261" background="#fff3e8" text="#264653" />{children}</>; }
