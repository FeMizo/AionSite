# DESIGN — Colegio México (home) · propuesta B

Arena y blanco, campos planos de verde, fotos reales. Sin sombras, sin degradados, esquinas de 4 px.

## Color (`css/tokens.css`)
- Arena `#F4F2EC` (fondo) y `#ECE8DF` (bloques alternos); blanco `#FFFFFF` solo en fotos y placas.
- Carbón `#3A3A3C` para el texto. Verde `#1F7A35` y verde profundo `#14532A` como campos y títulos.
- Rojo `#E02028` solo en el botón "Agendar visita" (texto blanco, 4.77:1) y en el trazo de la M del logo.
- El cuadro del uniforme aparece una sola vez, como franja de 12 px en el pie.

## Tipografía
- Archivo para títulos (minúsculas normales; la jerarquía la marcan peso y ancho: h1 800/ancho 112, h2 700/108, h3 600) y Atkinson Hyperlegible Next a 18 px, 66 caracteres por línea.

## Estructura (cada sección con su forma)
- Hero: titular a la izquierda, foto en placa blanca con pie, la M del logo dibujándose en su esquina. Franja verde con dato.
- Logros: "1er lugar estatal" como titular a todo el ancho; Oratoria sobre campo verde con foto; Congreso con la tribuna y una placa blanca encima.
- Inclusión: campo verde con foto recortada sobre el mural. Niveles: dos bardas (verde y arena 2) con la misma estructura.
- Galería: foto de grupo en placa blanca. Visita: campo verde con botón rojo y contacto. Pie: arena 2.

## Movimiento
- Un solo momento animado: el trazo de la M al cargar. `prefers-reduced-motion` lo desactiva. Pulsación de botones 100 ms.

## Accesibilidad
- Enlace de salto, foco visible de 3 px (blanco sobre campos verdes), menú con `aria-expanded`/Esc, `lang="es-MX"`, sin desbordes de 320 a 1440 px, contraste y objetivos táctiles verificados automáticamente.

## Contenido
- Textos editables en `content.json` (atributos `data-cms`); los avisos "por confirmar" son visibles a propósito.
- Pendiente del colegio: colores exactos del uniforme, logo en vector, C.C.T., descripción de programas, cifras, permiso de fotos de menores, aviso de privacidad, otras redes.

## No publicar
`.impeccable/`, `docs/`, `DESIGN.md`, `PRODUCT.md` y los `*.bak` no deben servirse públicamente al desplegar.
