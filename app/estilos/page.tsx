import type { Metadata } from "next";
import "./estilos.css";
import StyleLab from "./StyleLab";

export const metadata: Metadata = {
  title: "Style Lab | AionSite",
  description: "Galería privada de estilos visuales y exploraciones de interfaz de AionSite.",
};

export default function EstilosPage() {
  return <StyleLab />;
}
