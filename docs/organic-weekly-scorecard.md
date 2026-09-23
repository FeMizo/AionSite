# Marcador semanal de alcance orgánico

## Objetivo

Conseguir de 10 a 30 usuarios por semana que lleguen mediante el canal **Organic Search** y tengan al menos una interacción de contenido: abrir o leer un artículo.

## Configuración única en Google Tag Manager

1. Crear un activador de **Evento personalizado** llamado `content_interaction`.
2. Crear una etiqueta de evento de Google Analytics con el nombre `content_interaction` y ese activador.
3. Añadir como parámetros de evento: `content_action`, `content_type`, `article_id`, `article_title`, `reading_time_seconds` y `max_scroll_percent`.
4. Publicar el contenedor y comprobar en GA4 DebugView que aparece un evento después de aceptar cookies, abrir un artículo y permanecer 30 segundos con al menos 50 % de desplazamiento.

## Revisión semanal en GA4

En Exploraciones, crear un segmento de sesión con `Session default channel group = Organic Search`. Usar estas dimensiones y métricas:

- Dimensión: `content_action`.
- Métrica: `Total users`.
- Filtro: `event_name = content_interaction` y `content_action` es `click` o `read`.

El resultado es el marcador semanal. La semana cumple cuando el total de usuarios está entre 10 y 30. Registrar además las tres URLs con más lecturas para decidir qué tema interno enlazar y cuál actualizar o distribuir.
