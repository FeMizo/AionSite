import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/src/components/ui/BreadcrumbSchema";
import { LocalLandingPage } from "@/src/components/local/LocalLandingPage";
import { ecommerceConfig } from "@/src/components/local/configs";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/tiendas-online-ciudad-del-carmen/", {
  title: "Tiendas Online en Ciudad del Carmen | AionSite",
  description: "Tiendas online para negocios de Ciudad del Carmen: catálogo, pedidos, WhatsApp, pagos y una experiencia de compra clara.",
  keywords: ["tienda online Ciudad del Carmen", "ecommerce Ciudad del Carmen", "vender por internet Campeche"],
});

export default function EcommerceLocalPage() {
  return <><BreadcrumbSchema items={[{ name: "Tiendas online en Ciudad del Carmen", path: "/tiendas-online-ciudad-del-carmen/" }]} /><LocalLandingPage config={ecommerceConfig} /></>;
}
