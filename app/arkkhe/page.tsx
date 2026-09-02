import type { Metadata } from "next";
import ArkkheLanding from "./ArkkheLanding";
import "./single.css";

export const metadata: Metadata = { title: "Arkkhe — Presencia digital hecha para crecer", description: "Sitios web, tiendas online, contenido y crecimiento digital para negocios." };

export default function ArkkhePage() { return <ArkkheLanding />; }
