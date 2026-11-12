# Colegio México — Guía de marca (web)

Versión 0.1 · 2026-11-11 · Fuente de verdad para el sitio. Colores del uniforme **pendientes de confirmar** con el colegio.

## 1. Esencia
- **Quiénes son:** colegio particular de Preescolar y Primaria en la col. Tila, Ciudad del Carmen.
- **Promesa:** "Aquí tu hijo destaca y es acompañado." Alumnos reales que ganan
  olimpiadas, oratoria y llegan al Congreso Infantil, en un ambiente incluyente.
- **Pilares de mensaje**
  1. **Logros reales:** resultados comprobables (1er lugar estatal, oratoria, legislatura infantil).
  2. **Cercanía:** maestros que acompañan; escuela de barrio, trato personal.
  3. **Inclusión y raíces:** feria inclusiva con lengua maya, lengua de señas y braille.
  4. **Identidad mexicana:** el nombre, los colores verde y rojo, orgullo campechano.

## 2. Voz y tono
| Es | No es |
|---|---|
| Cálida y cercana ("tu hijo", "ven a conocernos") | Corporativa o fría |
| Orgullosa con pruebas ("1er lugar estatal") | Presumida sin datos ("la mejor escuela") |
| Clara, frases cortas | Rebuscada, jerga pedagógica |
| Respetuosa con las familias | Vendedora agresiva |

- Tutear a las familias ("Agenda tu visita"), con tono respetuoso.
- Verbos de acción en botones: **Agendar visita**, **Ver logros**, **Escríbenos**.
- Nombres de alumnos completos solo con autorización del colegio.
- Evitar mayúsculas sostenidas en párrafos; reservarlas para titulares cortos.

### Mensajes clave (borradores, AionSite)
- Titular hero: **"Aquí se forman campeones del conocimiento."** (alterna: "Pequeños hoy, orgullo de México mañana.")
- Apoyo: "Preescolar y Primaria en Ciudad del Carmen, con maestros que acompañan y alumnos que destacan."
- CTA: "Agendar visita por WhatsApp"

## 3. Logo
- Archivo: `assets/marca/logo-colegio-mexico.jpg` (raster, fondo blanco).
- **Pendiente:** pedir versión vectorial (SVG/AI/PDF) al colegio.
- Usar sobre fondos claros; espacio libre mínimo = altura del muñequito central.
- No deformar, no recolorear, no poner sobre fotos sin una placa blanca.
- Tamaño mínimo en pantalla: 40 px de alto (header móvil).

## 4. Color
Medidos del logo con muestreo de píxeles. Los del uniforme son aproximados.

| Token | Hex | Origen | Uso | Contraste sobre blanco |
|---|---|---|---|---|
| `verde-mx` | `#48B048` | logo | Acentos grandes, ilustración, íconos ≥24px | 2.8 : 1, **no para texto** |
| `verde-texto` | `#1F7A35` | derivado | Texto/links verdes, botones verdes | 5.4 : 1 ✔ AA (sobre arena 4.8 ✔) |
| `verde-profundo` | `#14532A` | derivado | Fondos de sección oscuros | 9.1 : 1 ✔ |
| `rojo-mx` | `#E02028` | logo | CTA principal (Agendar visita), énfasis | 4.8 : 1 ✔ (solo sobre blanco; sobre arena 4.2 ✘ texto chico) |
| `rojo-hover` | `#B5161D` | derivado | Hover/active del CTA | 6.8 : 1 ✔ |
| `carbon` | `#3A3A3C` | logo (texto) | Texto principal, titulares | 11.3 : 1 ✔ |
| `beige-uniforme` | `#D9C9A3` | camisa (aprox.) | Fondos cálidos, tarjetas | n/a, fondo |
| `arena` | `#F6F1E6` | derivado del beige | Fondo general de secciones | n/a, fondo |
| `olivo-cuadro` | `#4A4A32` | falda (aprox.) | Detalles, patrón de cuadros | 9.1 : 1 ✔ |
| `guinda-ribete` | `#7A1F2B` | ribete (aprox.) | Acento secundario, logros | 10.2 : 1 ✔ |
| `oro-logro` | `#C9962B` | medallas | Solo decorativo (medallas, estrellas) | 2.7 : 1, **no para texto** |

Proporción sugerida: 60 % claros (blanco/arena) · 25 % carbón y verde profundo · 10 % rojo (CTA) · 5 % oro/guinda.
Regla: **el rojo es la acción**. Solo los botones de "Agendar visita" y pocos énfasis lo usan.

## 5. Tipografía (rectas y legibles)
- **Titulares:** *Archivo* (Google Fonts), 700–800, ligeramente condensada en display. Es recta, firme y escolar sin ser infantil.
- **Texto:** *Atkinson Hyperlegible Next* (Google Fonts), 400/700. Está diseñada para máxima legibilidad, lo cual va con el pilar de inclusión.
- Escala base 18 px en móvil para párrafos. Titulares con `clamp()`.
- Español: usar comillas « » o " ", acentos correctos (México, Matías, Olimpiada).

## 6. Fotografía
- Solo fotos reales del colegio: alumnos con uniforme, maestros, eventos, instalaciones.
- Preferir fotos sin texto encima. Los flyers de Facebook se usan recortados o como miniatura.
- Tratamiento: esquinas redondeadas generosas, sin filtros fuertes, colores naturales.
- El cuadro de la falda puede usarse como **patrón gráfico sutil** (identidad propia,
  distinto de la marca de agua de la competencia).

## 7. Diferenciación vs. competencia (Morelos Lizardi)
| Morelos Lizardi | Colegio México |
|---|---|
| Azul marino + naranja | Verde + rojo de México, arena/beige |
| Serif mayúsculas | Sans recta (Archivo) |
| Marca de agua del escudo | Patrón de cuadros del uniforme + trazo "M" del logo |
| Enfoque "excelencia y genialidad" | Enfoque "logros reales + cercanía + inclusión" |

## 8. Pendientes del colegio
- [ ] Colores exactos del uniforme
- [ ] Logo vectorial
- [ ] C.C.T. Preescolar y Primaria
- [ ] Años de trayectoria / número de alumnos
- [ ] Autorización de uso de fotos y nombres de alumnos
