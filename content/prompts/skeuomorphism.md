# Prompt: página Skeuomorphism — interfaces con tacto

Recrea una landing page responsive en Next.js/React con estética skeuomorphism clásica y refinada. Debe ser una página front/marketing, nunca un dashboard, panel de productividad o aplicación administrativa.

## Dirección visual

- Base de papel gris cálido: `#e3e0d8` y `#cbc9c0`.
- Tinta: `#343735`.
- Sage de acción: `#789a79`.
- Acento cobre: `#bb7658`.
- Usa bevels, gradientes metálicos, texturas discretas, sombras físicas, controles con relieve y superficies que parezcan objetos reales.
- Tipografía Bricolage Grotesque para títulos y Epilogue para párrafos.

## Header y footer

Usa el mismo header y footer compartido por todas las páginas de estilos. El logo tiene que ser exactamente el logo del home usando `initialCmsContent.base.logoLight`; nunca uses “daybook” como marca principal. Incluye navegación Servicios, Proyectos, Contacto, CTA Hablemos y menú móvil funcional. El footer debe conservar el mismo logo, enlaces y copyright AionSite.

## Copy y estructura

1. Hero: eyebrow “Diseño digital con tacto”; título “Lo familiar / se siente mejor.”; texto “Diseñamos interfaces que toman lo mejor del mundo físico: claridad, textura y una respuesta que puedes sentir.”; CTA “Explorar el enfoque”; prueba “Diseñado para personas, no para métricas”.
2. Objeto principal skeuomorphic creado con CSS: placa inclinada de metal/papel, pantalla verde oscura, tres luces de control, texto “Make room / for good work.”, línea de estado, knob físico y etiqueta “SIMPLE TOOLS / BEAUTIFUL DAYS”. No uses un dashboard.
3. Sección “El detalle importa” y título “Digital, / pero humano.”. Tres tarjetas: “Interfaces con memoria”, “Feedback tangible”, “Confianza en cada detalle”.
4. Cita: “Una interfaz bien hecha no te pide atención. / Te devuelve la tuya.”.
5. CTA final: “Hagámosla / inolvidable.” con botón “Comenzar conversación” a `mailto:hola@aionsite.com`.

## Motion y comportamiento

- Hero entra desde abajo con easing físico.
- La placa principal flota unos píxeles; la pantalla tiene un glow muy sutil; el knob gira lentamente.
- Durante el scroll: detalle, cita y CTA aparecen con elevación, escala ligera y opacidad.
- Las tarjetas se levantan en hover y sus iconos rotan levemente.
- Los botones deben tener estado active que simule presión física.
- Usa IntersectionObserver o ScrollMotion con fallback visible si JavaScript no está disponible.
- Respeta `prefers-reduced-motion`.

## Implementación

- Ruta sugerida: `/skeuomorphism`.
- Metadatos: title “Skeuomorphism | Interfaces digitales con tacto” y description específica.
- Estilos en `app/skeuomorphism/skeuomorphism.css`.
- Mantén la página frontal; elimina cualquier sidebar, contador de sesiones, reproductor o formulario de dashboard.
- Verifica responsive, enlaces, UTF-8, TypeScript y `npm run build`.
