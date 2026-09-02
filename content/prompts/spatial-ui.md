# Prompt: página Spatial UI — ORBITAL

Recrea una landing page responsive en Next.js/React con estética Spatial UI: inmersiva, espacial, dimensional y elegante. No construyas un dashboard; debe presentar una forma de trabajar con ideas en un espacio visual.

## Dirección visual

- Fondo navy espacial: `#0b1020`.
- Texto claro: `#e5e8f0`.
- Muted azul: `#8991a8`.
- Azul luminoso: `#8aa8ff`.
- Rosa orbital: `#f5a9cf`.
- Usa radial gradients, anillos orbitales, capas con perspectiva, blur, glass panels y sombras profundas.
- Tipografía Bricolage Grotesque para display y Epilogue/monospace para texto de interfaz.
- Crear la escena con CSS y SVG; no depender de imágenes externas.

## Header y footer

Usa exactamente el mismo header y footer compartido de las otras páginas. El logo debe reutilizar el asset real del home (`initialCmsContent.base.logoLight`), no `/ ORBITAL` como logo principal. Header con Servicios, Proyectos, Contacto, CTA Hablemos y menú móvil funcional. Footer con el mismo logo AionSite, enlaces y copyright.

## Copy y estructura

1. Hero: eyebrow “SPATIAL WORKSPACE / 03”; título “Move ideas / into orbit.”; texto “A spatial canvas for teams who think in dimensions, not documents.”; CTA “Enter the room” y enlace funcional “Drag to explore” que vaya a Layers.
2. Escena espacial: dos anillos elípticos, orb central con “01”, tarjeta “LIVE NODE / Product direction / UP 42.8%”, tarjeta “FOCUS VECTOR / North star confirmed” y coordenadas “19.4326 N / 99.1332 W”.
3. Sección compartida “Everything / has a place.” con tres planos apilados: “See the whole field.”, “Connect the signals.” y “Work on what matters.”.
4. Misión: orb decorativo “ONE / CLEAR / MOVE”; título “Less friction. / More dimension.”; texto “Give every thought a surface, every surface a relationship, and every relationship a direction.”; enlace “Create your room” a email.

## Motion y comportamiento

- Hero entra desde un lateral con escala y profundidad.
- Anillos orbitan de forma lenta; el orb respira; las tarjetas flotantes se mueven en direcciones distintas.
- Los nodos tienen pulsos escalonados.
- Durante el scroll: Layers entra con perspectiva y sus tres planos aparecen en profundidad secuencial; Mission emerge desde abajo.
- Hover de planos: elevación hacia el usuario, translateZ y sombra más profunda.
- Todos los links deben funcionar; no dejes textos como controles falsos.
- Respeta `prefers-reduced-motion` y añade fallback visible si falla el observer.

## Implementación

- Ruta sugerida: `/spatial-ui`.
- Metadatos: title “Orbital | Spatial UI para equipos que piensan en dimensiones” y description específica.
- Estilos en `app/spatial-ui/spatial-ui.css`.
- Mantén los textos UTF-8 y corrige cualquier mojibake (`Ã`, `Â`, `â`).
- Verifica responsive móvil, anclas, menú, TypeScript y `npm run build`.
