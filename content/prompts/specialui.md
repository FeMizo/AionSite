# Prompt: página SpecialUI — NODO

Recrea una landing page responsive en Next.js/React con estética SpecialUI: editorial, oscura, técnica y orientada a señales. No construyas un dashboard ni una pantalla de administración; debe ser una página de presentación de un sistema digital.

## Dirección visual

- Fondo casi negro: `#11120f`.
- Verde lima eléctrico: `#d9ff5f`.
- Papel cálido: `#eee9df`.
- Gris muted: `#9a9a91`.
- Líneas y paneles discretos: `#30312c`, `#373831`.
- Usa tipografía Bricolage Grotesque para display y Epilogue para cuerpo; labels en monospace.
- Composición asimétrica, líneas finas, gráfica SVG, mucho espacio negativo y acentos lima precisos.

## Header y footer

Usa el mismo header y footer compartido por las páginas de estilos. Reutiliza exactamente el logo del home con `initialCmsContent.base.logoLight`. Header con Servicios, Proyectos, Contacto, CTA Hablemos y menú móvil real. Footer con logo AionSite, enlaces y copyright consistente. No cambies la identidad del header por una marca NODO.

## Copy y estructura

1. Hero con status “sistema en vivo”, título “Interfaces / con intención.” y texto “Diseñamos sistemas digitales que convierten complejidad en movimiento claro.”. CTA “Ver el sistema” y enlace “Ver manifiesto”.
2. Panel de señal LIVE SIGNAL / 001 con porcentaje `+34.7%`, ejes 100/75/50/25/0, meses JAN–JUN y gráfica SVG ascendente lima.
3. Marquee: STRATEGY, DESIGN, ENGINEERING, STRATEGY, separados por puntos.
4. Método NODO: “Lo especial / está en el flujo.”. Texto: “Una mirada conectada para que cada decisión de producto tenga una razón, un ritmo y una señal que puedas medir.”. Enlace “Conocer el método”.
5. Métricas: 24.8k visitas activas, 8.6% conversión, 4.9/5 satisfacción; cada una con tendencia positiva.
6. Dos feature cards: “De la intuición / a la señal.” y “Menos decks. / Más avance.”.
7. CTA final: “Hagamos algo / especial.” con botón “Abrir conversación” a `mailto:hola@aionsite.com`.

## Motion y comportamiento

- Hero copy entra escalonado, con status y CTA en secuencia.
- La gráfica dibuja su línea al cargar y un scanline recorre el panel.
- El marquee tiene un desplazamiento lento y sutil.
- Durante el scroll: método, cards y CTA aparecen con reveal editorial desde abajo y ligero skew.
- Las tarjetas se elevan con hover; los botones y enlaces deben ser clicables.
- El botón “Ver manifiesto” debe ser enlace funcional, no botón decorativo sin acción.
- Respeta `prefers-reduced-motion` y deja el contenido visible como fallback.

## Implementación

- Ruta sugerida: `/specialui`.
- Metadatos: title “NODO | Interfaces digitales con intención” y description específica.
- Estilos en `app/specialui/specialui.css`.
- Corrige siempre acentos y codificación UTF-8; nunca producir `intenciÃ³n`, `decisiÃ³n` o secuencias similares.
- Verifica anclas, menú móvil, TypeScript y `npm run build`.
