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

# Versión 3.0

Derivada de la 2.0 y guardada por separado. El encargo suaviza las formas manteniendo seriedad: retrato circular, foto de grupo en arco, campo circular amarillo, botones de contorno continuo, conjunto de etapas con esquinas amplias y transiciones curvas entre campos institucionales. No se modifica información, paleta ni archivos originales de imagen.
Se conserva movimiento en toda la página: hero, presentación, etapas, visita, contacto y footer. Entradas por sección mediante IntersectionObserver, feedback y cambios de etapa. Movimiento reducido cancela efectos; contenido visible por defecto. Versiones 1.0 y 2.0 intactas.

## Ajustes de revisión del slider
- Fondo arena detrás de la esquina redondeada de bienvenida.
- Navegación persistente al desplazarse, con compensación de altura en enlaces internos.
- Carrusel con controles, teclado y deslizamiento; etapa visible ampliada con información lateral en escritorio y debajo en móvil.
- Geometría estable al entrar y salir de pantalla; detalles inactivos fuera de la navegación accesible.
- Verificado en 1250 px y 375 px, sin errores de página ni desbordamiento horizontal; comprobado movimiento reducido.
- Capturas en `.impeccable/review/version-3/slider/`.

## Carrusel centrado y escala por desplazamiento
- El desplazamiento vertical natural recorre las cuatro etapas en una zona fija; conserva botones y teclado.
- Tarjeta central ampliada con detalle; vecinas compactas muestran únicamente el nombre.
- Colegio y visita pasan de escala 0.75 a 1 al entrar en vista y vuelven a reducirse al salir. Movimiento reducido mantiene escala 1.
- Comprobados cambio mediante rueda, botones, vista de 375 px, escala de entrada/salida y ausencia de errores de página.

## Correcciones tras crítica: etapas suaves
- Se conserva geometría fija del texto; transición de posición y recorte de650ms, detalle revelado después. Sin animar anchura, altura ni cambiar columnas entre estados.
- Umbral con margen y pausa entre etapas para evitar temblores y cambios encadenados rápidos.
- Controles desplazan suavemente; explorar no modifica la selección de visita. Solo la acción explícita prepara el mensaje.
- Se elimina frase duplicada y etiqueta de consulta en la etapa activa.
- Altura móvil ajustada al espacio útil; pantallas cortas y movimiento reducido ofrecen navegación directa sin recorrido fijo largo. Deslizamiento táctil horizontal y teclado conservados.
- Verificado en1250x695,375x812 y375x667: sin errores de página ni scroll horizontal; tarjeta móvil en viewport812 termina en800px. Teclado End llega a4de4; preferencia reducida cambia a navegación directa.
- Capturas: .impeccable/review/version-3/slider/soft-*.png.

## V3 animate + layout: composición ajustada
Aplicado exclusivamente a v3. Identidad, fotos, contenidoJSON, curvas y campos institucionales preservados.

Tesis espacial: portada y acción de visita lideran; etapas forman una única lectura central con vecinas compactas. Ritmo con sección56–96px y agrupaciones24–36px. Tablet761–1050px apila nombre sobre detalle en el panel central para evitar columnas estrechas. Las etiquetas laterales usan la anchura real del contenedor, no la ventana; no quedan cortadas. En pantallas altas el conjunto se centra en el espacio útil. Móvil adapta altura al toolbar y cabecera medidos, y alinea detalle desde arriba. Pantallas cortas conservan lectura en flujo normal.

Tesis de movimiento: portada de texto y apertura circular del collage; slider como continuidad principal; escalas0.75–1 de presentación y visita conservadas. Los hijos de campos escalados permanecen quietos. Contacto usa apertura de máscara redondeada; pie entrada breve. Entradas preparadas antes de aparecer, cola de una animación de entrada activa y pausa de entradas durante el desplazamiento entre etapas. Sin efectos sobre el ancestro sticky. Foco revela contenido y mantiene visita a escala1. Reducción de movimiento mantiene estado y controles sin desplazamientos decorativos.

Verificación:1440x1000,820x1180,375x812,375x667 y reflujo720x500. Sin scroll horizontal ni errores. Tablet detalle pasa de270px a474px de ancho útil con nombre en fila superior; sin scroll interno en datos reales. Móvil812px tarjeta termina796px. Rueda cambia2→3; End llega4de4; CTA prepara Preparatoria, enfoca stage y conserva escala1. Reducción de movimiento produce0 animaciones. Capturasv3-composed-* y JSON de evidencia en .impeccable/review/.

Escáner layout antes/después: cinco avisos cramped-padding de envoltorios utility,hero-ground,welcome-surround,welcome,visit-section. Falsos positivos revisados: espaciado corresponde a contenedores .wrap interiores; no se añaden márgenes duplicados. Revisiones independientes de distribución y mecánica previas a cambios. No se modifica v2.
