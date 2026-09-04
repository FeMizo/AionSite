import type { Metadata } from "next";
import { StylePlayground } from "@/src/components/StylePlayground";

export const metadata: Metadata = { title: "Daybook — Interfaces digitales con tacto", description: "Una experiencia front-end cálida, clara y humana, inspirada en objetos familiares." };
export default function Layout({ children }: { children: React.ReactNode }) { return <><StylePlayground rootSelector=".skeu-page" accent="#b9f227" background="#121212" text="#f1f1ed" />{children}</>; }
