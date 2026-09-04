# Prompt: página de maquillaje — Makeup Editorial

Crea una landing page responsive en Next.js/React inspirada en la referencia visual adjunta. Usa la referencia únicamente como dirección estética; no copies logotipos, textos ni imágenes protegidas. La página debe presentar una colección de maquillaje premium con una experiencia editorial, cálida y aspiracional.

## Dirección visual

- Fondo papel cálido: `#fffaf5`.
- Crema para bloques: `#f7ece2`.
- Tinta principal: `#191716`.
- Terracota principal: `#c97854`.
- Terracota oscuro para texto y estados hover: `#9d4e35`.
- Líneas suaves: `#e5cdbd`.
- Texto secundario: `#6f625b`.
- Usa Cormorant Garamond para titulares editoriales y Epilogue para el cuerpo.
- Composición asimétrica, mucho espacio negativo, tarjetas limpias, bordes redondeados y sombras suaves.
- Mantén una textura de grano sutil y una estética de revista de belleza premium.

## Header

- Logo de marca discreto con monograma terracota.
- Navegación: Maquillaje, Consejos, Colección y Contacto.
- En escritorio muestra el enlace “Contactar”; en móvil muestra un menú accesible.
- El logo debe enlazar a `#top` y Contactar a `#contacto`.

## Copy y estructura

1. Hero: eyebrow “MAKEUP / BELLEZA & EXPRESIÓN”; titular “Maquillaje que / realza tu / belleza cada / día.”; descripción “Descubre maquillaje pensado para resaltar tus facciones, crear looks memorables y acompañarte desde el primer café hasta la última salida.”; CTA “Descubrir la colección” a `#contacto`.
2. Mockup editorial de producto: “EVERYDAY BEAUTY ESSENTIALS”, “Tu belleza, tus reglas.”, “Color, textura y confianza para crear tu propio look.” y enlace “Explorar” a `#coleccion`.
3. Promesa: “Color con intención. Belleza que se siente.” con tres pilares: Ingredientes conscientes, Texturas que enamoran y Belleza sin reglas.
4. Colección: “Un look para cada momento” con Piel luminosa, Mirada protagonista y Labios irresistibles.
5. CTA final: “No solo es maquillaje. Es la forma más divertida de volver a ti.”, botón “Crear algo extraordinario” a `/`.

## Comportamiento y QA

- Todos los botones deben ser enlaces visibles, con fondo contrastante, texto legible y estados hover/focus.
- Verifica que `--ref-terracottaDark` esté definido con fallback `#9d4e35`.
- Verifica que los tokens se apliquen realmente con `getComputedStyle`, no solo estén declarados.
- Comprueba que cada ancla (`#top`, `#consejos`, `#coleccion`, `#contacto`) tenga un destino existente.
- Respeta `prefers-reduced-motion`; el contenido debe permanecer visible sin JavaScript.
- Valida TypeScript, consola del navegador y `npm run build`.
