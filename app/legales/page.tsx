import type { Metadata } from "next";
import { LegalPage } from "@/src/components/legal/LegalPage";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/legales/", {
  title: "Aviso legal | AionSite",
  description: "Aviso legal con informacion corporativa, propiedad intelectual y limitaciones.",
  openGraph: {
    title: "Aviso legal | AionSite",
    description: "Aviso legal con informacion corporativa, propiedad intelectual y limitaciones.",
    url: "/legales/",
    siteName: "AionSite",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary",
    title: "Aviso legal | AionSite",
    description: "Aviso legal con informacion corporativa, propiedad intelectual y limitaciones.",
  },
});

export default function LegalesPage() {
  return (
    <LegalPage
      title="Aviso legal"
      subtitle="Informacion corporativa y condiciones generales sobre el uso de los contenidos de AionSite."
      updatedAt="28 de julio de 2026"
      sections={[
        {
          title: "Titular del sitio",
          content: (
            <p>
              Este sitio es operado por AionSite. Los datos de contacto publicados en el sitio
              forman parte de la informacion oficial para solicitudes comerciales y de soporte.
            </p>
          ),
        },
        {
          title: "Propiedad intelectual",
          content: (
            <p>
              Los textos, disenos, imagenes, marcas y materiales del sitio estan protegidos por las
              normas aplicables de propiedad intelectual y no pueden reproducirse sin autorizacion.
            </p>
          ),
        },
        {
          title: "Enlaces externos",
          content: (
            <p>
              Cuando el sitio incluya enlaces a terceros, AionSite no controla sus politicas ni su
              contenido. Revisa sus propios terminos antes de usar esos servicios.
            </p>
          ),
        },
      ]}
    />
  );
}
