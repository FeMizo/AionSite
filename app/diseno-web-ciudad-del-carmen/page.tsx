import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/src/components/ui/BreadcrumbSchema";
import { LocalLandingPage } from "@/src/components/local/LocalLandingPage";
import { webDesignConfig } from "@/src/components/local/configs";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/diseno-web-ciudad-del-carmen/", {
  title: "Diseño Web en Ciudad del Carmen | AionSite",
  description: "Diseño y desarrollo web para negocios de Ciudad del Carmen. Sitios rápidos, claros y enfocados en conseguir más contactos.",
  keywords: ["diseño web Ciudad del Carmen", "página web Ciudad del Carmen", "desarrollo web Campeche"],
});

export default function WebDesignLocalPage() {
  return <><BreadcrumbSchema items={[{ name: "Diseño web en Ciudad del Carmen", path: "/diseno-web-ciudad-del-carmen/" }]} /><LocalLandingPage config={webDesignConfig} /></>;
}
