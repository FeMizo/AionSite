# Prompt: página Claymorphism — Calma

Recrea una landing page responsive en Next.js/React con estética claymorphism suave, táctil y cálida. No construyas un dashboard. Debe sentirse como una marca de bienestar editorial, tranquila y humana.

## Dirección visual

- Fondo crema: `#f4eee3`.
- Tinta verde profunda: `#35433a`.
- Sage principal: `#b9cbb7`.
- Coral de acento: `#ef997b`.
- Amarillo cálido: `#f3ce7d`.
- Usa sombras grandes, redondeadas y suaves; añade sombras internas claras y oscuras para que las superficies parezcan objetos de arcilla.
- Tipografía display: Bricolage Grotesque. Texto: Epilogue.
- Evita gradientes morados, tarjetas genéricas y apariencia de plantilla SaaS.

## Header y footer

Usa el mismo header y footer compartido por las páginas de estilos. El logo debe reutilizar exactamente el asset del home mediante el CMS (`initialCmsContent.base.logoLight`), no una letra ni un logo inventado. Header con navegación Servicios, Proyectos y Contacto, CTA Hablemos y menú móvil funcional. Footer con el mismo logo, enlaces y copyright de AionSite.

## Copy y estructura

1. Hero: eyebrow “Bienestar para días reales”; título “Haz espacio / para estar.”; texto “Una biblioteca suave de rituales para bajar el ritmo, escuchar tu cuerpo y encontrar tu propia forma de calma.”; CTA “Explorar rituales”. Añade prueba social “Personas creando / mejores pausas”.
2. Ilustración abstracta clay: blob sage, blob amarillo, flor coral con volumen, etiquetas “tu momento 01:24” y “sin prisa”. No uses imagen externa; crea la ilustración con CSS.
3. Sección “Tres caminos de entrada” y título “Empieza / despacio.”. Tres tarjetas: “Pausa solar”, “Respira lento”, “Vuelve a ti”, con textos breves y enlaces “Ver práctica”.
4. Manifiesto centrado: “No necesitas / arreglarte. / Solo escucharte.”.
5. CTA: “Hoy puede / sentirse distinto.” con panel “Respiración de llegada”, “Un audio de tres minutos para aterrizar donde ya estás.” y botón “Comenzar ahora”.

## Motion y comportamiento

- Al cargar: hero copy entra desde abajo y la ilustración aparece con una escala suave.
- Durante el scroll: rituales, manifiesto y CTA se revelan al entrar al viewport con translateY, opacidad y una ligera rotación orgánica.
- Los blobs flotan lentamente, la flor respira y las etiquetas derivan suavemente.
- Hover de tarjetas: elevación, leve rotación y sombra de arcilla.
- Usa IntersectionObserver o una utilidad ScrollMotion; nunca dejes secciones ocultas si JavaScript falla.
- Respeta `prefers-reduced-motion`.

## Implementación

- Ruta sugerida: `/claymorphism`.
- Metadatos: title “Calma | Bienestar digital y rituales para bajar el ritmo”; description específica y bien escrita.
- Estilos en `app/claymorphism/claymorphism.css`, no saturar `globals.css`.
- Todos los enlaces internos deben apuntar a IDs existentes y el menú móvil debe abrir/cerrar correctamente.
- Verifica responsive móvil, TypeScript y `npm run build`.
