import type { Metadata } from "next";
import { StylePlayground } from "@/src/components/StylePlayground";

export const metadata: Metadata = { title: "Daybook — Interfaces digitales con tacto", description: "Una experiencia front-end cálida, clara y humana, inspirada en objetos familiares." };
export default function Layout({ children }: { children: React.ReactNode }) { return <><StylePlayground rootSelector=".skeu-page" accent="#789a79" secondary="#bb7658" background="#cbc9c0" surface="#e3e0d8" text="#343735" muted="#8b8d84" />{children}</>; }
