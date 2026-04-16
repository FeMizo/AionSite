const schema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "AionSite",
  url: "https://aionsite.com.mx",
  logo: "https://aionsite.com.mx/logo-aionsite.png",
  email: "contacto@aionsite.com.mx",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "Spanish",
  },
  areaServed: "MX",
  serviceType: "Diseño y Desarrollo Web",
};

export function SchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
