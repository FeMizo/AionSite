import type { Metadata } from "next";
import { PublicSite } from "@/src/components/cms/PublicSite";
import { initialCmsContent } from "@/src/cms/site-content";
import { withCanonical } from "@/src/lib/metadata";

export const metadata: Metadata = withCanonical("/");

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: initialCmsContent.sections.faq.data.map(
      (item: { question: string; answer: string }) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      }),
    ),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: initialCmsContent.base.name,
    description: initialCmsContent.base.description,
    url: "https://aionsite.com.mx",
    telephone: "+52 938 157 3988",
    email: initialCmsContent.base.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
      addressLocality: "Carmen", // Default city
      addressRegion: "Campeche", // Default state
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.1619,
      longitude: -86.8515,
    },
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      "https://wa.me/5219381573988",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <PublicSite initialContent={initialCmsContent} />
    </>
  );
}
