const schema = {
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
    "https://www.instagram.com/aionsite.mx",
    "https://www.facebook.com/aionsite.mx",
  ],
};

export function SchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
