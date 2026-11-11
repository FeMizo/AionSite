import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/src/components/ui/SiteLink";
import { initialCmsContent } from "@/src/cms/site-content";
import { withCanonical } from "@/src/lib/metadata";
import { Reveal } from "./_home/Reveal";
import { ContactPicker, LocalTime, StripControls } from "./_home/client";
import { MobileNav, PlanInfo } from "./_home/client-nav";
import "./_home/home3.css";
import "./_home/home3-sections.css";
import "./_home/home3-nav.css";

const aboutText =
  "Soy Jose Miss. Estudié diseño gráfico y llevo años programando frontend para equipos en Estados Unidos y Latinoamérica. Con AionSite trabajas directamente conmigo, desde la primera llamada hasta después del lanzamiento.";

export const metadata: Metadata = withCanonical("/", {
  title: "AionSite | Diseño web premium y SEO para negocios",
  description:
    "Diseño y programo sitios web, tiendas en línea y SEO técnico para negocios en México. Trato directo, sin plantillas.",
});

const featured = ["Search Atlas", "Rand Mc Nally", "Molotes", "LinkGraph", "Lobby PM", "JS Fly", "AtMedica"];

const typeLabel: Record<string, string> = {
  "Nuxt/Next": "Nuxt y Next.js",
  CMS: "CMS",
  "Custom code": "Código a medida",
};

const services = [
  {
    name: "Sitio web a medida",
    text: "Diseño y código propios para tu negocio. Rápido, claro en móvil y fácil de actualizar después.",
  },
  {
    name: "Tienda en línea",
    text: "Catálogo, pagos e inventario con solo los módulos que vas a usar. Crece cuando tu negocio crezca.",
  },
  {
    name: "SEO técnico",
    text: "Estructura, metadatos y schema para que Google entienda tu sitio y te muestre cuando alguien busca lo que vendes.",
  },
  {
    name: "Mantenimiento",
    text: "Actualizaciones, respaldos, seguridad y mejoras cada mes. Tu sitio no se queda viejo después del lanzamiento.",
  },
  {
    name: "Automatización e IA",
    text: "Asistentes que responden a tus clientes y flujos que conectan tus herramientas para que dejes de copiar datos a mano.",
  },
];

const packages = [
  {
    name: "Sitio básico",
    price: "2,000",
    fit: "Para darte a conocer con una presencia seria.",
    includes: ["2 páginas", "Diseño adaptado a móvil", "Botón directo a WhatsApp"],
    pages: ["Inicio: quién eres y qué ofreces", "Contacto: WhatsApp, mapa y horario"],
    notes: ["Página extra: $500", "Ideal si hoy solo tienes redes sociales"],
  },
  {
    name: "Sitio completo",
    price: "4,000",
    fit: "Para explicar tus servicios y recibir clientes.",
    includes: ["4 páginas", "Diseño adaptado a móvil", "Formulario y WhatsApp"],
    pages: ["Inicio", "Servicios: qué haces y para quién", "Nosotros: tu historia y tu equipo", "Contacto con formulario"],
    notes: ["Página extra: $500; después de 4 extras, $350 cada una"],
  },
  {
    name: "Tienda en línea",
    price: "6,000",
    fit: "Para vender tus productos por internet.",
    includes: ["8 páginas", "Hasta 50 productos", "Catálogo y pagos"],
    pages: [
      "Inicio",
      "Tienda o catálogo",
      "Ficha de producto",
      "Carrito y pago",
      "Mi cuenta",
      "Nosotros",
      "Contacto",
      "Políticas de envío y devolución",
    ],
    notes: ["Hasta 50 productos cargados; cada 50 extra, $500", "Página extra: $500"],
  },
];

const faqs = [
  {
    q: "¿En cuánto tiempo entregas un sitio?",
    a: "Depende del alcance. Una página de conversión puede estar lista en 3 a 5 días hábiles; un sitio completo suele tomar de 2 a 4 semanas.",
  },
  {
    q: "¿Cómo se paga?",
    a: "Con un anticipo para empezar y pagos por etapas según avanza el proyecto. Así ves el progreso y controlas el presupuesto.",
  },
  {
    q: "¿Te encargas del dominio y el hosting?",
    a: "Sí. Puedo configurar dominio, hosting y correo profesional, o trabajar con los proveedores que ya usas.",
  },
  {
    q: "¿Podré cambiar textos e imágenes yo mismo?",
    a: "Sí. Te entrego el sitio con una estructura editable para que actualices contenido sin depender de mí para cambios básicos.",
  },
  {
    q: "¿Qué pasa después del lanzamiento?",
    a: "Hay planes de mantenimiento mensual con soporte técnico, mejoras continuas, optimización de velocidad y seguimiento SEO.",
  },
];

const steps = [
  { name: "Diagnóstico", text: "Hablamos de tu negocio, tus clientes y tu competencia." },
  { name: "Propuesta", text: "Recibes alcance, tiempos y precio cerrado." },
  { name: "Diseño", text: "Ves el sitio antes de programarlo y lo ajustamos juntos." },
  { name: "Desarrollo", text: "Lo construyo con código limpio, rápido y medible." },
  { name: "Lanzamiento", text: "Dominio, analítica y Search Console listos desde el día uno." },
  { name: "Soporte", text: "Sigo contigo después: mejoras, dudas y cambios." },
];

export default function Home() {
  const { base, sections } = initialCmsContent;
  const projects = featured
    .map((title) => sections.portfolio.data.find((p) => p.title === title))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const whatsapp = sections.finalCTA.data.whatsappLink;

  return (
    <div className="h3">
      <header className="h3-header">
        <Link href="/" className="h3-logo" aria-label="AionSite, inicio">
          <Image src={base.logoLight ?? "/logo-aionsite.webp"} alt="" width={590} height={119} priority />
        </Link>
        <nav aria-label="Principal" className="h3-nav">
          <a href="#proyectos">Proyectos</a>
          <a href="#servicios">Servicios</a>
          <a href="#proceso">Proceso</a>
          <a href="#paquetes">Precios</a>
          <Link href="/conoceme">Conóceme</Link>
        </nav>
        <div className="h3-header__end">
          <Link href="/cotizar-proyecto/" className="h3-btn h3-btn--small">
            Cotizar
          </Link>
          <MobileNav
            links={[
              { name: "Proyectos", href: "#proyectos" },
              { name: "Servicios", href: "#servicios" },
              { name: "Proceso", href: "#proceso" },
              { name: "Precios", href: "#paquetes" },
              { name: "Preguntas", href: "#faq" },
              { name: "Conóceme", href: "/conoceme" },
            ]}
            quoteHref="/cotizar-proyecto/"
            whatsapp={whatsapp}
          />
        </div>
      </header>

      <main>
        <section className="h3-hero" aria-labelledby="h3-title">
          <h1 id="h3-title" className="h3-hero__title">
            Diseño y programo el sitio web de tu negocio.
          </h1>
          <div className="h3-hero__side">
            <LocalTime />
            <p>
              Sin plantillas ni intermediarios: hablas directo con quien lo construye. He hecho sitios para
              Search Atlas, LinkGraph y Rand McNally, y para negocios como Molotes y Lobby PM. El tuyo recibe
              el mismo cuidado.
            </p>
            <div className="h3-actions">
              <Link href="/cotizar-proyecto/" className="h3-btn">
                Cotizar mi sitio
              </Link>
              <a href={whatsapp} className="h3-btn h3-btn--ghost" target="_blank" rel="noopener noreferrer">
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section id="proyectos" className="h3-work" aria-label="Proyectos recientes">
          <ul className="h3-strip" id="h3-strip">
            {projects.map((p, i) => (
              <li key={p.title} className="h3-shot" style={{ ["--i" as string]: i }}>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  <span className="h3-shot__frame">
                    <Image
                      src={p.image}
                      alt={`Página de inicio de ${p.title}`}
                      width={1440}
                      height={795}
                      sizes="(max-width: 700px) 85vw, 40vw"
                      priority={i < 2}
                    />
                  </span>
                  <span className="h3-shot__caption">
                    <strong>{p.title}</strong>
                    <span>{typeLabel[p.type] ?? p.type}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="h3-work__footer">
            <StripControls targetId="h3-strip" total={projects.length} />
            <Link href="/proyectos/" className="h3-textlink">
              Ver todos los proyectos
            </Link>
          </div>
        </section>

        <section id="servicios" className="h3-section h3-services" aria-labelledby="h3-services-title">
          <h2 id="h3-services-title" className="h3-h2" data-reveal="rise">
            Lo que puedo hacer por tu negocio
          </h2>
          <dl className="h3-services__list">
            {services.map((s, i) => (
              <div
                key={s.name}
                className="h3-services__row"
                data-reveal="row"
                style={{ ["--d" as string]: `${i * 70}ms` }}
              >
                <dt>{s.name}</dt>
                <dd>{s.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="h3-section h3-about" aria-labelledby="h3-about-title">
          <h2 id="h3-about-title" className="h3-visually-hidden">
            Quién hace tu sitio
          </h2>
          <figure className="h3-about__photo" data-reveal="photo">
            <Image
              src="/media/jose-miss.webp"
              alt="Ilustración de Jose Miss en su escritorio, con saco azul y lentes"
              width={1122}
              height={1402}
              sizes="(max-width: 899px) 70vw, 30vw"
            />
          </figure>
          <div className="h3-about__copy">
            <p className="h3-about__lead" data-reveal="words" aria-label={aboutText}>
              {aboutText.split(" ").map((word, i) => (
                <span key={i} aria-hidden="true" style={{ ["--w" as string]: i }}>
                  {word}{" "}
                </span>
              ))}
            </p>
            <Link href="/conoceme" className="h3-textlink" data-reveal="rise" style={{ ["--d" as string]: "500ms" }}>
              Conocer mi trayectoria
            </Link>
          </div>
        </section>

        <section id="proceso" className="h3-section h3-process" aria-labelledby="h3-process-title">
          <h2 id="h3-process-title" className="h3-h2" data-reveal="rise">
            Cómo trabajamos
          </h2>
          <ol className="h3-steps" id="h3-steps" data-reveal="steps" aria-label="Pasos del proceso">
            {steps.map((s, i) => (
              <li key={s.name} style={{ ["--d" as string]: `${i * 110}ms`, ["--i" as string]: i }}>
                <span className="h3-steps__n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <StripControls targetId="h3-steps" total={steps.length} label="pasos" className="h3-steps-controls" />
        </section>

        <section id="paquetes" className="h3-section h3-pricing" aria-labelledby="h3-pricing-title">
          {/* Older menus across the site still link to /#calculator-section */}
          <span id="calculator-section" className="h3-anchor" aria-hidden="true" />
          <div className="h3-pricing__head">
            <h2 id="h3-pricing-title" className="h3-h2" data-reveal="rise">
              Precios claros desde el inicio
            </h2>
            <p data-reveal="rise" style={{ ["--d" as string]: "100ms" }}>
              Precios base en pesos mexicanos. Cada página extra cuesta $500. Si tu proyecto no encaja aquí,
              lo cotizo a medida.
            </p>
          </div>
          <ul className="h3-plans" data-reveal="plans">
            {packages.map((p, i) => (
              <li key={p.name} className="h3-plan" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <div className="h3-plan__head">
                  <h3>{p.name}</h3>
                  <PlanInfo name={p.name} pages={p.pages} notes={p.notes} />
                </div>
                <p className="h3-plan__price">
                  <span className="h3-plan__from">Desde</span>
                  <span>${p.price}</span>
                  <span className="h3-plan__cur">MXN</span>
                </p>
                <p className="h3-plan__fit">{p.fit}</p>
                <ul className="h3-plan__list">
                  {p.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Link href="/cotizar-proyecto/" className="h3-btn h3-btn--ink" data-reveal="rise">
            Calcular el precio de mi proyecto
          </Link>
        </section>

        <section id="faq" className="h3-section h3-faq" aria-labelledby="h3-faq-title">
          <h2 id="h3-faq-title" className="h3-h2" data-reveal="rise">
            Preguntas frecuentes
          </h2>
          <div className="h3-faq__list">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className="h3-faq__item"
                data-reveal="row"
                style={{ ["--d" as string]: `${i * 60}ms` }}
                name="h3-faq"
              >
                <summary>
                  <span>{f.q}</span>
                  <span className="h3-faq__icon" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contacto" className="h3-close" aria-labelledby="h3-close-title">
          <h2 id="h3-close-title" className="h3-close__title" data-reveal="rise">
            Cuéntame qué necesita tu negocio.
          </h2>
          <p data-reveal="rise" style={{ ["--d" as string]: "120ms" }}>
            Te respondo en menos de 24 horas con una propuesta concreta.
          </p>
          <div data-reveal="chips">
            <ContactPicker email={base.email} />
          </div>
        </section>
      </main>

      <footer className="h3-footer">
        <p>AionSite, Ciudad del Carmen, Campeche. © {new Date().getFullYear()}</p>
        <nav aria-label="Pie de página">
          <Link href="/proyectos/">Proyectos</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/conoceme">Conóceme</Link>
          <Link href="/privacidad">Privacidad</Link>
        </nav>
      </footer>
      <Reveal />
    </div>
  );
}
