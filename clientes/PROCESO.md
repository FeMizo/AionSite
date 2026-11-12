# Cómo se construye la propuesta de un cliente

Este es el proceso que se siguió con Colegio México y Colegio Continental 2000. Para publicar el resultado, ver `PUBLICAR.md`.

## Reglas del proceso

1. **Se mandan 3 propuestas** por cliente (`v1`, `v2`, `v3`). Así el cliente compara y elige.
2. **Las tres tienen estilos distintos.** No son variaciones menores: cada una tiene su propia idea de portada, ritmo y forma de las secciones.
3. **Los colores no cambian.** La paleta sale de la marca del cliente (logo, uniforme) y se comparte entre las tres. Lo que cambia es el layout y la tipografía de acento.
4. **Se critica el responsivo** de cada versión antes de entregar, a 375 px y a 1280 px.
5. **La animación depende del proyecto.** Una escuela primaria pide movimiento tranquilo y legible; no se anima por animar, y siempre se respeta `prefers-reduced-motion`.

La raíz del cliente siempre abre `v1`. Las versiones se llaman `v1`, `v2`, `v3`, sin `.0`.

## Pasos

1. **Contexto y marca.** Reunir lo que ya existe del cliente: logo, colores, uniforme, fotos, redes. Escribir `PRODUCT.md` (quién es, a quién le habla) y `DESIGN.md` (paleta, tipografía, reglas) en `clientes/<Cliente>/`. Los datos que no se conocen se dejan como "por confirmar", nunca se inventan.
2. **Tokens.** Un solo `tokens.css` con la paleta y las tipografías de la marca. Las tres versiones lo usan; así los colores se mantienen.
3. **v1: la base.** La versión más sobria e institucional. Define el contenido y la estructura que las otras reutilizan.
4. **v2 y v3: otros estilos.** Misma paleta, otro layout. En Colegio México, v2 fue la versión "premium" y v3 replicó la estructura de una referencia de otro colegio con técnicas de `apple-design`.
5. **Crítica de responsivo.** Revisar cada versión en celular y escritorio: desbordes horizontales, botones de al menos 44 px, contraste, imágenes que no carguen. Corregir lo que salga.
6. **Animación.** Elegir qué se anima según el cliente (ver abajo), medir su costo en celulares modestos y dejar la alternativa para movimiento reducido.
7. **Pulido.** Una pasada final por versión: textos, enlaces, foco de teclado, detalles de espaciado.
8. **Publicar.** Seguir `PUBLICAR.md`: carpeta pública, contraseña por cliente, limpieza, commit y push.

## Skills que se usaron

| Skill | Para qué |
|---|---|
| `superpowers:brainstorming` | Aclarar qué quiere el cliente antes de diseñar. |
| `brand` | Voz y reglas de marca del cliente. |
| `design-system` | Tokens (colores, tipografías, espaciado) compartidos entre versiones. |
| `frontend-design` | Punto de vista visual propio, para que no parezca plantilla. |
| `ui-ux-pro-max` | Lista de UX: contraste, tamaños táctiles, CLS, guía de animación. |
| `impeccable` | Crítica (`critique`) de v1 y v2, y pulido (`polish`). Las críticas quedan en `clientes/<Cliente>/.impeccable/critique/`. |
| `apple-design` | Movimiento y materiales: encabezado translúcido, retroalimentación al presionar, carrusel con inercia. Se usó en la v3 de Colegio México. |
| `animation-performance` | Revisar el costo de las animaciones en celulares de gama baja. |

## Animar según el proyecto

- **Escuela de primaria y preescolar:** movimiento suave y corto. Trazo del arco del logo, entrada de la portada, encabezado translúcido, botón flotante. Nada que distraiga ni que mueva el texto mientras se lee.
- **Siempre:** animar solo `transform` y `opacity`; respetar `prefers-reduced-motion`, `prefers-reduced-transparency` y `prefers-contrast`; probar en celular real o emulado.
- **Otro tipo de cliente** (restaurante, despacho, tienda): decidir de nuevo qué movimiento tiene sentido; no copiar el de la escuela.

## Qué se entrega

- 3 URLs (`v1`, `v2`, `v3`) y la contraseña, mandadas por separado.
- Lo pendiente del cliente, dicho claro: claves, aviso de privacidad, descripciones, y permiso para mostrar nombres y fotos de menores.
- Las notas, críticas y capturas se quedan en `clientes/<Cliente>/`, que es privado.
