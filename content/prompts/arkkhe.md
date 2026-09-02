# arkkhe

Usa la landing existente de AionSite en la ruta `/arkkhe` como plantilla visual y técnica.

## Objetivo

Crea una nueva landing con el mismo nivel de diseño, composición, jerarquía, responsive y microinteracciones. Cambia únicamente los valores indicados en la sección `CONFIGURACIÓN DE ESTA VERSIÓN`.

## Reglas obligatorias

- Mantén el header y footer globales de AionSite: `Header` y `SiteFooter`.
- No uses `StylePageHeader` ni `StylePageFooter`.
- Mantén las tipografías globales de AionSite: Epilogue para texto y Bricolage Grotesque para display.
- Mantén Tailwind CSS y Framer Motion ya configurados en el proyecto.
- Los estilos propios de esta landing deben vivir únicamente en `app/[ruta]/single.css`.
- No añadas estilos de esta landing a `app/globals.css`.
- Conserva el fondo digital, la profundidad, las capas, la entrada progresiva y el sistema responsive.
- No añadas cuadrículas, robots ni elementos decorativos genéricos salvo que se soliciten explícitamente.
- Usa imágenes locales desde `public/` o URLs aprobadas por el usuario.
- No cambies otras rutas, componentes globales ni contenido no relacionado.
- Verifica con `npx.cmd tsc --noEmit` al terminar.

## Configuración de esta versión

Reemplaza estos valores antes de implementar:

```yaml
marca_visible: "AionSite"
ruta: "/arkkhe"
titulo_seo: "AionSite — Sitios web y crecimiento digital"
descripcion_seo: "Sitios web, venta online, mantenimiento y redes sociales para negocios que quieren crecer."
headline: "Tu negocio merece más."
subheadline: "Creamos sitios web que presentan tu valor, venden tus servicios y trabajan por tu negocio todos los días."
servicios:
  - "Sitios web"
  - "Tiendas online"
  - "Mantenimiento"
  - "Redes sociales"
  - "SEO local"
  - "Contenido"
  - "Integraciones"
  - "Optimización"
fondo: "/media/aionsite-tech-background.gif"
imagenes:
  - ""
  - ""
  - ""
email: "hola@aionsite.com.mx"
cta: "Cotizar por WhatsApp"
```

## Entregable

Implementa la landing completa en la ruta indicada. Conserva la estructura de secciones y sustituye el texto, imágenes, colores y datos usando la configuración anterior. Reporta los archivos modificados y las validaciones ejecutadas.
