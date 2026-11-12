# Colegio México — Home (propuesta) · Documento de diseño

Fecha: 2026-11-11 · Cliente de AionSite · Estado: borrador para aprobación

## 1. Intención y porqué
El Colegio México (Ciudad del Carmen, Campeche) **no tiene sitio web**; solo Facebook.
Ya pidieron ver una prueba. Este home es la **propuesta para engancharlos**, pero se
construye con calidad de sitio final para que, si aceptan, se publique tal cual.

Quien lo visita: **mamás y papás de Ciudad del Carmen buscando escuela** para
Preescolar o Primaria, mayormente **desde el celular**.

En los primeros segundos deben sentir:
1. **Confianza** (escuela seria, real, con instalaciones y maestros reales).
2. **Logros de alumnos** (pruebas concretas, no promesas).
3. **Un botón para agendar visita**, siempre a la mano.

## 2. Objetivos / No-objetivos / Anti-objetivos
**Objetivos**
- Home único, completo, responsive (móvil primero).
- Secciones: información, niveles, agendar visita, programas, logros, fotos de eventos, footer.
- Todo el contenido editable vive en `content.json` (preparado para un admin futuro).
- Lighthouse alto, WCAG 2.2 AA como mínimo en todo (meta del usuario: "WCAG 100%").

**No-objetivos (por ahora)**
- Panel `/admin` (fase posterior, cuando el colegio acepte).
- Páginas internas (niveles, inscripciones, etc.).
- Formulario o calendario de citas (se usa WhatsApp).
- Inglés / bilingüe.

**Anti-objetivos (sería un fracaso aunque funcione)**
- Que se vea **igual a Colegio Morelos Lizardi** (competencia directa en la misma ciudad).
- Que se vea "hecho por IA" o de plantilla genérica.
- Fotos de stock: solo fotos reales del colegio.
- Texto inventado presentado como real (todo dato no confirmado va marcado como placeholder).

## 3. Datos del cliente (confirmados por el usuario)
- Nombre: **Colegio México** — Ciudad del Carmen
- Dirección: Calle 46 no. 46, col. Tila, Ciudad del Carmen, México, 24170
- Teléfono / WhatsApp: **938 382 0874**
- Correo: colegiomexico.carmen@gmail.com
- Facebook: https://www.facebook.com/colegiomexico.carmen/
- Horario de atención: **Lunes a viernes de 7:30 AM a 2:00 PM**
- Niveles: **Preescolar y Primaria**
- Idioma: español

## 4. Decisiones del usuario sobre el "cómo"
- **Referencia de diseño preferida:** colegiomoreloslizardi.edu.mx — tomar su
  *claridad y estructura*, no su identidad.
- **Agendar visita:** botón que abre WhatsApp a `529383820874` con mensaje prellenado
  ("Hola, me gustaría agendar una visita al Colegio México.").
- **Certificado:** placeholder con C.C.T. por nivel (Preescolar / Primaria), a confirmar.
- **Tecnología:** HTML + CSS + JS estático (con contenido en JSON). Después se podrá
  migrar a PHP + JSON con admin, WordPress (custom fields) o Next.js (admin aparte).
- **Fase actual:** solo el home. Admin después.
- **Ubicación:** `public/clientes/ColegioMexico/`.
- **Tipografía:** recta y legible (sans), como en la referencia.
- **Colores:** de logo y uniforme; el usuario confirmará los exactos después.

## 5. Contenido del home (orden propuesto)
1. **Header fijo**: logo · Inicio · Niveles · Programas · Logros · Contacto · botón "Agendar visita".
2. **Hero**: titular corto y fuerte + frase de apoyo + "Agendar visita" (WhatsApp) +
   collage de fotos reales (Alondra con medalla, feria inclusiva, comunidad).
3. **Franja de confianza**: datos rápidos (niveles, horario, ubicación) — cifras como
   años de trayectoria o alumnos van como placeholder.
4. **Logros** (protagonista): tarjetas
   - Alondra Vera Matías — 1er lugar, Olimpiada del Conocimiento Infantil 2026, etapa estatal.
   - Andrés Mateo Moreno Tatum — 1er lugar Oratoria nivel sector; XXIV Legislatura Infantil 2026.
   - Feria inclusiva "Diversidad entre páginas" (lengua maya, señas, braille).
5. **Niveles**: Preescolar y Primaria (tarjetas; texto descriptivo = placeholder).
6. **Programas escolares**: 3–4 tarjetas placeholder (p. ej. inglés, valores e inclusión,
   olimpiadas y concursos, arte/deporte) — marcados como "por confirmar".
7. **Galería de eventos**: fotos reales de Facebook.
8. **CTA final**: "Ven a conocernos" + WhatsApp + mapa/dirección.
9. **Footer**: dirección, teléfono, correo, horario, C.C.T. (placeholder), Facebook,
   aviso de privacidad (placeholder), crédito AionSite.

## 6. Activos disponibles (`assets/`)
- `marca/logo-colegio-mexico.jpg` (fondo blanco; se vectoriza/recorta para el header).
- `fotos/olimpiada-alondra.jpg` — foto real, ideal para hero.
- `fotos/fb-06.jpg`, `fb-07.jpg` — Alondra en la feria inclusiva / con su maestro.
- `fotos/fb-05.jpg` — foto grupal en la cancha techada (instalaciones/comunidad).
- `fotos/fb-01..04.jpg` — flyers con texto (Andrés, Alondra); usar recortados o como
  imagen de tarjeta de logro, no como hero.

**Consentimiento:** aparecen menores con nombre completo. El colegio ya los publica,
pero se debe confirmar con el colegio el uso en el sitio antes de publicarlo.

## 7. Restricciones técnicas
- `<title>` ≤ 60 caracteres y `<meta name="description">` ≤ 160 (regla del repo).
- Sin dependencias de build; librerías solo por CDN con versión fija o locales.
- Imágenes optimizadas (WebP + tamaños responsivos, `loading="lazy"` fuera del hero).
- Animaciones con `prefers-reduced-motion` respetado; solo transform/opacity.
- Funcionar en conexiones lentas (Ciudad del Carmen, datos móviles).
- Carpeta `docs/` no debe servirse públicamente (`.htaccess` deny).

## 8. Lo que queda a criterio del constructor
- Paleta exacta (derivada del logo: verde ~#47B04B, rojo ~#D7262B, gris carbón ~#3A3A3C;
  uniforme: beige, cuadro verde olivo/marrón, ribete guinda), ajustada para contraste AA.
- Par tipográfico concreto (sans recta, Google Fonts).
- Copys del hero y textos de secciones (marcar los inventados como placeholder).
- Estilo de animación (lineamientos Apple: suaves, físicas, interrumpibles).

## 9. Llamadas mías (no confirmadas por el usuario)
- HTML estático leyendo `content.json` en vez de PHP para la propuesta.
- Orden exacto de las secciones del home.
- Programas escolares propuestos (todos placeholder).
- Mensaje prellenado de WhatsApp.
- Facebook como única red social hasta que se confirmen otras.
