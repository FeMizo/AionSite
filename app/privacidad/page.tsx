import type { Metadata } from "next";
import { LegalPage } from "@/src/components/legal/LegalPage";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/privacidad/", {
  title: "Aviso de privacidad | AionSite",
  description: "Aviso de privacidad de AionSite y tratamiento general de datos personales.",
  openGraph: {
    title: "Aviso de privacidad | AionSite",
    description: "Aviso de privacidad de AionSite y tratamiento general de datos personales.",
    url: "/privacidad/",
    siteName: "AionSite",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary",
    title: "Aviso de privacidad | AionSite",
    description: "Aviso de privacidad de AionSite y tratamiento general de datos personales.",
  },
});

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Aviso de privacidad"
      subtitle="Aqui se explica como recopilamos, usamos y protegemos los datos personales que nos compartes."
      updatedAt="28 de julio de 2026"
      sections={[
        {
          title: "Datos que podemos recopilar",
          content: (
            <p>
              Podemos recibir nombre, correo, telefono, empresa, mensaje y datos tecnicos basicos
              derivados de formularios, analitica y navegacion.
            </p>
          ),
        },
        {
          title: "Finalidades",
          content: (
            <p>
              Usamos la informacion para responder solicitudes, enviar propuestas, dar seguimiento a
              proyectos, mejorar el sitio y cumplir obligaciones legales o contractuales.
            </p>
          ),
        },
        {
          title: "Derechos y contacto",
          content: (
            <p>
              Si deseas acceder, rectificar, cancelar u oponerte al uso de tus datos, escribenos al
              correo publicado en el sitio y atenderemos tu solicitud conforme a la ley aplicable.
            </p>
          ),
        },
      ]}
    />
  );
}
