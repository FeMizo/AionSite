const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://aionsite.com.mx/#organization",
  name: "AionSite",
  url: "https://aionsite.com.mx",
  logo: "https://aionsite.com.mx/logo-aionsite.png",
  email: "contacto@aionsite.com.mx",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: "Spanish",
    email: "contacto@aionsite.com.mx",
  },
  areaServed: "MX",
  serviceType: "Diseño y Desarrollo Web",
  sameAs: [
    "https://www.facebook.com/aionsite",
    "https://www.instagram.com/aionsite.webs/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://aionsite.com.mx/#website",
  name: "AionSite",
  url: "https://aionsite.com.mx",
  publisher: { "@id": "https://aionsite.com.mx/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://aionsite.com.mx/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export function SchemaMarkup() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
