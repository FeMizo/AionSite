# Cómo se construye la propuesta de un cliente

Proceso destilado de dos proyectos reales: Colegio México y Colegio Continental 2000. Para publicar el resultado, ver `PUBLICAR.md`.

El flujo ejecutable por fases (con puertas de aprobación, hasta "finalizar": debug, critique y security) vive en la skill `/aionsite-demo`; este documento es su resumen para el repo. Fases: 0 arranque (desde cero o renovar un sitio existente), 1 datos, 2 colores, 3 diseño y referencias, 4 construir y cambios, 5 pruebas y segundos cambios, 6 finalizar.

Este documento se corrige con cada proyecto. Al cerrar uno, añade lo aprendido en "Bitácora de aprendizajes" (al final) y, si es una regla general, súbela a "Reglas".

## Reglas

1. **Se mandan 3 propuestas** por cliente (`v1`, `v2`, `v3`) para que compare y elija.
2. **Las tres son distintas de verdad.** Cada una tiene su propia idea de portada, distribución, ritmo y forma de las secciones. Una versión que solo cambia detalles de otra no cuenta como versión: se rehace.
3. **Los colores salen de la marca del cliente y son los mismos en las tres.** Cambian el layout, la forma (rectas, curvas, círculos) y la tipografía de acento, no la paleta. Si la paleta se ajusta (por ejemplo al color real del uniforme), se ajusta una vez y para las tres.
4. **Cada cliente se trabaja aislado.** Nunca se copian al sitio de un cliente su logo, uniforme, alumnos ni elementos de identidad de otro. De una referencia se toma la estructura y el movimiento, con ejecución propia.
5. **Se critica el responsivo** de cada versión antes de entregar: escritorio (1440 px), tablet (1024 px) y móvil (680 px).
6. **La animación depende del proyecto.** Se decide qué se anima y por qué; no se anima por animar.
7. **Lo que no se sabe es un placeholder visible, marcado "por confirmar", que reserva el espacio definido**; nunca se inventa y el layout no se colapsa.

## Pasos

0. **Arranque.** Acordar con el cliente el alcance mínimo. Por defecto: solo el inicio, en HTML directo, con el contenido en un `content.json` editable y sin panel de administración. Definir la acción principal (aquí: pedir informes o agendar visita por WhatsApp). Pedir logo, fotos, colores del uniforme, teléfono y correo. El contenido provisional se deja identificado hasta tener el definitivo.
1. **Contexto y marca.** Escribir `PRODUCT.md` (quién es y a quién le habla) y `DESIGN.md` (paleta, tipografía, reglas) en `clientes/<Cliente>/`.
2. **Referencias.** Pedir 2 o 3 sitios de referencia y decidir qué se toma de cada uno (estructura, animación). Se conservan siempre la información, las fotos y los colores del cliente.
3. **Tokens.** Un solo `tokens.css` con la paleta y las tipografías, compartido por las tres versiones.
4. **v1: la base.** La versión sobria e institucional. Define el contenido que las otras reutilizan.
5. **v2 y v3: otros estilos.** Misma paleta, otro layout y otra forma. Ejemplos:

   | | Colegio México | Continental |
   |---|---|---|
   | v1 | institucional | base sobria |
   | v2 | premium | recortes y barridos; mezcla de dos referencias |
   | v3 | estructura de una referencia más técnicas de `apple-design` | círculos, arcos y esquinas suaves, conservando la seriedad |

6. **Crítica de responsivo.** Desbordes horizontales, botones de al menos 44 px, contraste, imágenes que no carguen, encabezado que se mantiene visible, fondos que asoman detrás de esquinas curvas. Corregir antes de seguir.
7. **Animación.** Ver "Animar según el proyecto". Medir el costo en celulares modestos.
8. **Pulido.** Textos, enlaces, foco de teclado, espaciado.
9. **Limpieza antes de guardar.** Quitar capturas y evidencias de revisión antes del commit, no después. Notas y críticas se quedan en `clientes/<Cliente>/` (privado).
10. **Publicar.** Seguir `PUBLICAR.md`.

## Skills que se usaron

| Skill | Para qué |
|---|---|
| `superpowers:brainstorming` | Aclarar qué quiere el cliente antes de diseñar. |
| `brand` | Voz y reglas de marca del cliente. |
| `design-system` | Tokens compartidos entre versiones. |
| `frontend-design` | Punto de vista visual propio, para que no parezca plantilla. |
| `ui-ux-pro-max` | Lista de UX: contraste, tamaños táctiles, CLS, guía de animación. |
| `impeccable` | Crítica (`critique`) y pulido (`polish`). Las críticas quedan en `clientes/<Cliente>/.impeccable/critique/`. |
| `apple-design` | Movimiento y materiales: encabezado translúcido, retroalimentación al presionar, carrusel con inercia. |
| `animation-performance` | Costo de las animaciones en celulares de gama baja. |
| `animate-expo` | Solo aporta principios de movimiento; el resultado sigue siendo HTML, no una app Expo. |

## Animar según el proyecto

- **Qué se anima:** el sitio completo, no solo la portada. Cada versión con entradas distintas, no la misma animación repetida.
- **Cómo:** una sola animación de entrada activa a la vez, coordinadas entre sí. Ningún texto visible antes de que empiece su animación, sin destellos previos y sin giros en las fotos. Los sliders se mueven suave, sin saltos.
- **Con qué:** preferir `transform` y `opacity`. Recortes (`clip-path`) y barridos son válidos si se miden en celular.
- **Accesibilidad:** respetar `prefers-reduced-motion`, `prefers-reduced-transparency` y `prefers-contrast`. En un slider, con movimiento reducido o pantalla corta, usar navegación directa.
- **Escuela de primaria o preescolar:** movimiento tranquilo y legible. Otro tipo de cliente (restaurante, despacho, tienda) se decide de nuevo.

## Qué se entrega

- 3 URLs (`v1`, `v2`, `v3`) y la contraseña por separado.
- Lo pendiente del cliente: número de WhatsApp habilitado, dirección, horarios, contenido institucional, claves, aviso de privacidad y permiso para mostrar nombres y fotos de menores.

## Bitácora de aprendizajes

Una línea por hallazgo, con el cliente y la fecha. Si se repite en dos proyectos, pasa a "Reglas".

- **Continental, nov 2026:** la v2 salió casi igual a la v1 y se rehízo; la v3 nació cerca de la v2 y hubo que separarla con otras formas. Definir desde el inicio qué hace distinta a cada versión.
- **Continental, nov 2026:** se rechazaron animaciones solo en el hero, entradas iguales entre versiones y texto visible antes de animarse.
- **Continental, nov 2026:** se commitearon capturas de revisión y hubo que limpiarlas en un commit aparte.
- **Colegio México, nov 2026:** se copiaron elementos de Colegio México a Continental por error; cada cliente va aislado.
- **Ambos, nov 2026:** las versiones se nombran `v1`, `v2`, `v3` y la raíz redirige a `v1`.
