# Colegio México — Sistema de diseño (v0.1)

Tokens: [`../css/tokens.css`](../css/tokens.css) · Marca: [brand-guidelines.md](brand-guidelines.md)

## Arquitectura
`primitivos (--c-*, --fs-*, --sp-*)` → `semánticos (--text, --action, --bg-warm…)` → `componentes (--btn-*, --card-*, --award-*)`.
Los componentes **solo** consumen semánticos/componentes. Cambiar un color del uniforme = editar 1 primitivo.

## Tipografía
| Rol | Fuente | Peso | Token |
|---|---|---|---|
| Hero | Archivo | 800, tracking -0.02em | `--fs-hero` |
| H2 sección | Archivo | 800 | `--fs-2xl` |
| H3 tarjeta | Archivo | 700 | `--fs-lg` |
| Párrafo | Atkinson Hyperlegible Next | 400 | `--fs-base` (18px) |
| Etiqueta / eyebrow | Archivo | 700, mayúsculas, +0.08em | `--fs-xs` |

Carga: Google Fonts con `display=swap` + `preconnect`. Solo los pesos usados.

## Color: reglas
- **Rojo = acción.** Solo CTA "Agendar visita" y estados de foco/alerta.
- Verde del logo (#48B048) y oro: **decorativos** (trazos, íconos grandes, medallas). Nunca texto.
- Texto verde → `--text-brand` (#1F7A35).
- Secciones alternan: blanco → arena → verde profundo (logros) → blanco.

## Componentes
### Botón primario
| Propiedad | Default | Hover | Active | Focus | Disabled |
|---|---|---|---|---|---|
| Fondo | `--btn-bg` | `--btn-bg-hover` | `--btn-bg-hover` + scale(.97) | igual default | `--border` |
| Texto | blanco | blanco | blanco | blanco | `--text-muted` |
| Sombra | `--sh-sm` | `--sh-md` + translateY(-1px) | ninguna | anillo `--focus` | ninguna |
Altura mínima 48 px. Ícono de WhatsApp a la izquierda (decorativo, `aria-hidden`).

### Botón secundario
Contorno carbón 2 px; hover invierte (fondo carbón, texto blanco).

### Tarjeta de nivel / programa
Fondo `--card-bg`, radio `--r-lg`, sombra `--sh-md`, imagen arriba con radio interno, eyebrow + H3 + texto + link "Conocer más →".

### Tarjeta de logro
Fondo `--award-bg` (verde profundo), texto blanco (9.1:1), detalle de medalla en `--award` (oro sobre verde 3.4:1 → solo texto ≥ 24 px o decorativo), foto del alumno recortada. Lugar destacado ("1er lugar") en Archivo 800.

### Header
Fijo, translúcido con blur, altura 72 px; se compacta al hacer scroll. En móvil: logo + botón "Agendar" + menú hamburguesa (panel a pantalla completa, foco atrapado, cierra con Esc).

### Botón flotante WhatsApp (móvil)
Píldora roja fija abajo, aparece tras pasar el hero; oculta cuando el CTA del hero es visible.

## Motivos gráficos propios
- **Trazo "M"**: curvas verde/roja del logo como líneas SVG que se dibujan al entrar en pantalla.
- **Cuadro del uniforme**: patrón CSS sutil (líneas olivo al 6 %) en fondos arena.

## Movimiento
- Entrada de secciones: fade + translateY(16px), `--dur-slow`, `--ease-out`, escalonado 60 ms.
- Botones: press scale(.97) con `--ease-spring`.
- Solo `transform` y `opacity`. Respetar `prefers-reduced-motion` (tokens a 0 ms).

## Accesibilidad (meta WCAG 2.2 AA+)
- Contrastes verificados en brand-guidelines §4.
- Foco visible siempre (`--focus`), objetivos táctiles ≥ 44 px.
- `lang="es-MX"`, skip-link "Saltar al contenido", alt descriptivo en todas las fotos.
