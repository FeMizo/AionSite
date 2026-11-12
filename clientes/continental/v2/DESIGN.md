# Continental 2.0 — dirección vigente

Rehecha el 12 de noviembre de 2026 a partir de las capturas aportadas de Morelos Lizardi y Olinca. Sustituye las composiciones anteriores de la versión 2.0.

## Composición

Encabezado con navegación izquierda, logo central y visita derecha. Apertura sobre arena con titular y collage superpuesto de las dos fotografías originales; sin fotografía repetida ni contenido prestado. Presentación marina a todo el ancho, cuatro etapas conectadas en guinda con detalle de etapa sobre arena, visita guinda con solicitud blanca y contacto abierto. No añadir logos de convenios, testimonios, estadísticas o programas de las referencias.

## Sistema

Arena #F4F2EC; alternos #ECE8DF; blanco #FFFFFF; carbón #3A3A3C; marino #182234; guinda #77183D; amarillo pálido #F1EDAF; azul #294E80 para foco; rojo #E02028 solo para agendar. Archivo para titulares y Atkinson Hyperlegible Next para texto. Párrafos móviles de 18px. Sin degradados ni sombras; fotos en placas blancas. Radios de controles hasta 4px.

## Interacción

Etapas como pestañas con panel, flechas izquierda/derecha, Home/End y foco visible. La elección pasa al mensaje de visita. WhatsApp sigue pendiente de número validado; no se simula envío. Enlaces de teléfono y correo reflejan content.json. Error de JSON recuperable, con etapas básicas de respaldo.

## Movimiento

Una bienvenida coordinada de título, texto y collage; repetible mediante control de revisión. Cambio de detalle por opacidad 220ms; visita 280ms; menú móvil 220ms. Sin deslizamiento de pestañas. Movimiento reducido cancela efectos y desactiva repetición. Sin haptics ni implementación nativa Expo.

## Verificación y límites

Revisión visual a 1440px y 375px, sin desbordamiento; texto ampliado al 200% sin desbordamiento; fotos cargadas; teclado, selección, menú y movimiento reducido verificados. Sin errores de ejecución. Permisos de publicación, dirección y horario permanecen pendientes. Versión 1.0 y content.json conservados. Se omite la marca de agua ornamental para que las fotografías y la identidad lleven la portada.

## Movimiento en toda la página

Entradas únicas al llegar a presentación, etapas, visita, contacto y pie. Secuencias diferentes por composición: desplazamiento lateral, entrada vertical, asentamiento de la solicitud y opacidad del pie, 520ms con desfases hasta 260ms. IntersectionObserver, transform/opacity y estilos visibles por defecto. El control Repetir animación reinicia el recorrido completo. Movimiento reducido desconecta observadores y cancela animaciones. La 1.0 no cambia.

## Animación v2, revisión7
Entradas suaves repetibles al volver a cada sección, cambio de etapa de420ms también con teclado, escala reversible0.8–1 en presentación y visita. Se conserva composición y contenido. Preferencia de movimiento reducido cancela animaciones y mantiene escala1. Verificado escritorio1250px y móvil375px: ocho animaciones activas durante entrada, panel animado, cero animaciones con movimiento reducido, sin errores ni desbordamiento. Capturas en .impeccable/review/version-2-motion-*.png.

## Entradas propias v2, revisión8
Sustituye la escala y las entradas compartidas con v3 por una dirección editorial: apertura del título desde su línea base; fotografías reveladas en ejes opuestos; presentación como doble cortina; etapas mediante barrido horizontal y apertura vertical del detalle; solicitud revelada desde la derecha; contacto por renglones y pie desde la base. Entradas de750–1000ms, contenido visible por defecto, repetición manual. Movimiento reducido cancela efectos. Verificado a1250px y375px, sin errores ni desbordamiento; sección sin escala, panel y preferencias funcionales.

## Entradas sin destello, revisión9
Cada entrada queda preparada y pausada en su primer fotograma antes de llegar a pantalla. El observador inicia la animación ya preparada; el retraso conserva ese estado. Al finalizar se libera el efecto. La portada inicia al preparar el documento, sin esperar la carga de imágenes. Movimiento reducido y foco de teclado liberan los recortes. Verificado1250px/375px: recorte100% pausado antes de entrar, reproducción al entrar, recorte eliminado al terminar; cero errores y cero animaciones con movimiento reducido.

## Coordinación elegante, revisión10
Revisión independiente detecta seis efectos simultáneos en portada y recortes padre/hijo en etapas. Sustituidos por cola global de una animación activa: portada texto y collage secuenciales, sin giro de fotografía; regiones con recortes propios380–650ms; cambio de panel como unidad240ms. Entradas abandonadas se liberan al salir de pantalla, interacción toma prioridad, formulario enfocado no vuelve a ocultarse. Se conserva preparación invisible previa. Verificado con muestreo por fotograma1250px/375px: máximo1, cero desbordamiento o errores; reducido0 y foco visible. Informe .impeccable/critique/ y evidencia v2-motion-calm-evidence.json.
