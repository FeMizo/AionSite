import type { Metadata } from "next";
import { LegalPage } from "@/src/components/legal/LegalPage";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/terminos/", {
  title: "Terminos y condiciones | AionSite",
  description: "Terminos y condiciones de uso del sitio web y servicios de AionSite.",
  openGraph: {
    title: "Terminos y condiciones | AionSite",
    description: "Terminos y condiciones de uso del sitio web y servicios de AionSite.",
    url: "/terminos/",
    siteName: "AionSite",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary",
    title: "Terminos y condiciones | AionSite",
    description: "Terminos y condiciones de uso del sitio web y servicios de AionSite.",
  },
});

export default function TerminosPage() {
  return (
    <LegalPage
      title="Terminos y condiciones"
      subtitle="Al usar este sitio aceptas estas condiciones de uso y la forma en que AionSite presta sus servicios."
      updatedAt="28 de julio de 2026"
      sections={[
        {
          title: "Uso del sitio",
          content: (
            <p>
              El contenido de este sitio se ofrece para fines informativos y comerciales. No puedes
              usarlo para actividades ilegales, suplantacion de identidad o acciones que afecten la
              seguridad, disponibilidad o integridad del sitio.
            </p>
          ),
        },
        {
          title: "Servicios y cotizaciones",
          content: (
            <p>
              Las propuestas, alcances y tiempos de entrega se confirman por escrito antes de iniciar
              cualquier proyecto. AionSite puede ajustar precios, prioridades o disponibilidad segun
              el alcance acordado.
            </p>
          ),
        },
        {
          title: "Responsabilidad",
          content: (
            <p>
              AionSite no garantiza que el sitio permanezca libre de interrupciones, errores o
              cambios de terceros. El uso del sitio y de los enlaces externos corre por cuenta del
              visitante.
            </p>
          ),
        },
      ]}
    />
  );
}
