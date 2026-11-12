# Versiones de Continental

1.0: versión conservada en v1/index.html. También permanece en la raíz, sin cambios a los archivos de la home.
2.0: propuesta independiente en v2/index.html, con contenido y recursos propios copiados de 1.0.

Vista 1.0: http://127.0.0.1:8794/v1/index.html
Vista 2.0: http://127.0.0.1:8794/v2/index.html

Cada versión carga su propio content.json. Cambiarlo no afecta a la otra.
2.0 aplica apple-design y los principios de feedback/movimiento reducido de animate-expo a la plataforma web. No es una aplicación Expo ni usa React Native, haptics nativos o Reanimated. Se implementa con CSS y Web Animations API.

3.0: http://127.0.0.1:8794/v3/index.html — formas circulares y curvas sobre la estructura de 2.0, con animación de todas las secciones y recursos independientes.

Nota (publicación): la raíz de /clientes/continental/ ahora solo redirige a v3/. Las imágenes viven una sola vez en public/clientes/continental/assets/ y las versiones las cargan desde ../assets/. Las notas privadas comparten un único PRODUCT.md en esta carpeta.
