# AionSite

Sitio comercial para presentar servicios de diseño y desarrollo web, mantenimiento, tiendas en línea y SEO, mostrar proyectos y convertir visitas en solicitudes de cotización.

Revisión del código local: 5 de noviembre de 2026. El inventario contrasta páginas, componentes, endpoints, almacenamiento, scripts y pruebas. Describe implementación; no certifica que el alojamiento tenga la misma versión ni que las integraciones externas estén operativas. No incluye nombres ni valores de variables de configuración, credenciales o identificadores de cuentas.

## Funciones públicas

| Función | Para qué sirve y cómo está implementada | Configuración necesaria y límites |
| --- | --- | --- |
| Inicio `/` | Presenta servicios, proceso, proyectos, precios y contacto mediante componentes específicos en `app/page.tsx`. Utiliza contenido inicial del CMS. | Contenido comercial, imágenes, enlaces y datos de contacto revisados. Su composición está fijada en código: no adopta automáticamente el orden o la visibilidad del renderizador dinámico del CMS. |
| Precios y estimación | `PricingHome2` calcula opciones de web, redes o ambos, paquetes, páginas, productos y plazos en el navegador. | Precios y reglas se mantienen en el componente; no son una pasarela de pago ni una orden de compra. |
| Contacto del inicio | `ContactHome2` permite seleccionar servicios y prepara un enlace de WhatsApp; la acción aparece después de seleccionar al menos uno. | Número y enlaces comerciales correctos. El usuario realiza el envío en WhatsApp. |
| Cotización `/cotizar-proyecto/` | Página comercial de servicios y propuesta mediante `PublicProductsPage`. | Textos, recursos y llamadas a la acción mantenidos en código. No procesa pagos ni crea una tienda. |
| Solicitud `/solicitar-sitio/` | `SiteRequestForm` recoge negocio, servicio, plataforma, objetivo y referencias; valida y prepara un resumen para WhatsApp. | Destino de WhatsApp correcto. No guarda solicitudes en CRM, servidor o navegador automáticamente. Abrir WhatsApp no confirma envío. |
| WhatsApp flotante | `SitePageChrome` y `WhatsAppFloatingButton` ofrecen contacto compartido en páginas públicas. Se oculta bajo administración. | Contenido y visibilidad del CMS. Las demos HTML independientes no heredan este componente. |
| Conóceme `/conoceme/` | `PublicAboutPage` presenta perfil y experiencia, con selección español/inglés y preferencia de idioma conservada en el navegador, desde el modelo de `src/about/`. | Contenido e imágenes en `src/data/about-content.json`; cambios mediante el editor o archivos. No es un perfil conectado a una red profesional. |
| Proyectos `/proyectos/` | `PublicProjectsPage` permite búsqueda, filtros por categoría y tipo, tamaño de página y paginación; `PortfolioGrid` ofrece detalle modal y enlaces externos. | Proyectos, capturas, etiquetas y destinos reales en el contenido del CMS. No sincroniza repositorios ni verifica por sí mismo resultados comerciales. |
| Blog `/blog/` | `BlogListPage` permite búsqueda por texto, etiquetas y palabras clave, selección del número de artículos y paginación sobre artículos locales. | Artículos en `src/data/blog-posts.ts`; imágenes disponibles y recompilación cuando corresponda. No hay editor administrativo de artículos conectado. |
| Artículo `/blog/[id]/` | Páginas generadas por artículo con contenido, metadatos y seguimiento de lectura. Incluyen formulario de contacto. | Identificadores válidos, contenido e imágenes. El formulario del artículo llama a la API Node; no incorpora el respaldo PHP del formulario compartido. |
| Formularios de correo | `ContactForm` envía a `/api/contact` y, ante 404, intenta `/api/contact.php`. El endpoint Node valida campos, limita intentos en memoria, envía correo y después registra el contacto en el almacén de WhatsApp. | Servidor Node con correo saliente y disco escribible, o PHP con su configuración privada de correo. La versión PHP envía correo pero no replica el registro local de WhatsApp. |
| Páginas de SEO local | Diseño web, tiendas en línea y SEO en Ciudad del Carmen, más SEO México, utilizan `LocalLandingPage` y sus configuraciones. | Textos, oferta local, enlaces, datos estructurados y dirección canónica coherentes. Son páginas comerciales, no una herramienta que ejecute SEO externo. |
| Ubicación aproximada | Los componentes de hero consultan `/api/location`; el servidor obtiene ciudad por IP con un proveedor externo y utiliza Ciudad del Carmen como respaldo. | Servidor Node, acceso al proveedor y cabeceras de IP correctas. No pide ubicación GPS. Sin API disponible permanece el respaldo. |
| Avisos legales | `/legales/`, `/privacidad/` y `/terminos/` muestran contenido con `LegalPage`. | Textos mantenidos conforme a la operación real. La existencia de las páginas no acredita revisión legal. |
| Consentimiento | `GdprConsent` conserva aceptación o rechazo en una cookie y avisa a los componentes de medición. | Política y comportamiento de medición coherentes. El aviso se monta globalmente, también en administración. |
| Medición pública | Google Tag Manager y Meta Pixel se cargan tras aceptar consentimiento; `PublicAnalytics` los excluye de administración. Artículos registran interacciones; enlaces de WhatsApp y formularios generan eventos de contacto. | Cuentas de medición y contenedores correctos, actualmente referenciados en componentes. No se comprobó recepción externa de eventos. |
| Conversiones del servidor | El navegador envía eventos a `/api/meta-capi.php`, que los prepara para Meta. | PHP, configuración privada del servicio y conectividad saliente. No existe un endpoint Node equivalente en `app/api/`; servir únicamente Next.js no ejecuta ese archivo. |
| Ventana de newsletter | `DashboardPopup`, conectado al renderizador de `/home1/`, pide correo y llama directamente al endpoint PHP. Recuerda el cierre mediante cookie. | PHP y correo configurados. No se monta en el inicio actual. Conserva referencias a un lanzamiento antiguo que requieren revisión. |
| Newsletter del pie alternativo | `NewsletterSignup`, utilizado por `Footer`, muestra un estado de éxito después de una espera simulada. | Pendiente conectar un servicio real; actualmente no registra ni envía la suscripción. No debe presentarse como una lista activa con confirmación por correo. |

## Páginas alternativas y redirecciones

- `/home1/`: versión con `PublicSite`, registro de secciones, orden y visibilidad del CMS, más ventana de newsletter.
- `/home2/`: reutiliza el inicio actual. `/future/`: composición visual animada. `/home-b/`: redirige a `/future`, no es otra portada activa.
- `/estilos/` y `/estilos/botones/`: galería y exploración de controles; `/luma/`, `/arkkhe/`, `/specialui/`, `/spatial-ui/`, `/claymorphism/` y `/skeuomorphism/`: propuestas visuales. Aunque la galería se describe como privada, estas rutas no tienen la protección administrativa del middleware.
- `/about/` redirige a Conóceme; `/contact/` al contacto del inicio; `/productos/` a cotización.
- `src/data/site-pages.json` registra las rutas administrables. No todas las rutas experimentales se convierten automáticamente en páginas gestionadas por ese registro.

## SEO, navegación y recuperación de errores

- Los metadatos compartidos generan direcciones canónicas, títulos, descripciones y vistas previas sociales; componentes específicos añaden esquemas de negocio, artículos y migas de pan. Revisar también los valores fijados en cada variante.
- `/sitemap.xml` combina páginas y artículos. `/sitemap_pages.xml` y `/sitemap_blogs.xml` separan ambos inventarios; `/sitemap_index.xml` los agrupa. Las listas de páginas son explícitas, no un descubrimiento automático de todas las rutas.
- `robots.txt` referencia el sitemap combinado y excluye administración y APIs del rastreo. No sustituye autenticación ni restringe acceso.
- `SiteLink` adapta enlaces compartidos a las rutas registradas. En servidor, el middleware reescribe o redirige; en estático, el script de rutas genera archivos HTML de traslado con enlace canónico y redirección en el navegador. Estos archivos no equivalen a respuestas HTTP 308 del servidor.
- Las rutas inexistentes tienen pantalla 404 con regreso al inicio y metadatos para no indexar.

Hay diferencias pendientes entre inventarios: Solicitar sitio aparece en el sitemap de páginas pero falta en el combinado anunciado por robots; SEO local Ciudad del Carmen tiene página implementada y falta en ambas listas. La redirección `/contact/` utiliza un fragmento que no coincide con el identificador del componente de contacto del inicio actual. Estos comportamientos se documentan como pendientes, sin corregir código fuera del alcance del README.

## Administración

El acceso administrativo utiliza un secreto del servidor y una cookie de ocho horas, no accesible desde JavaScript; los endpoints protegidos también aceptan autorización de servidor. Si no se ha configurado el acceso, el middleware bloquea las funciones protegidas. El inicio de sesión limita intentos por IP en memoria y permite cerrar sesión. No hay gestión de múltiples usuarios, permisos por rol o recuperación de contraseña implementada; el límite de intentos no se comparte entre procesos.

| Módulo | Implementación y propósito | Requisitos y alcance real |
| --- | --- | --- |
| Resumen `/admin/` | Muestra secciones registradas, visibles y ocultas del CMS. | Es un resumen del contenido, no un cuadro de ventas o analítica de visitas. |
| Contenido `/admin/content/` | `ContentDashboard` edita Inicio y Conóceme con modelos y normalización separados. | APIs autenticadas, permisos de escritura y respaldo local del navegador. Los textos fijados directamente en componentes no quedan editables por existir este panel. |
| Secciones `/admin/sections/` | Administra orden, visibilidad y datos del registro de secciones. | El renderizador `PublicSite` respeta el registro; el inicio actual tiene composición propia. No asumir que ocultar o mover una sección modifica todas las variantes. |
| Imágenes | `SectionEditor` y `/api/uploads/image` permiten guardar imágenes en `public/uploads/`. El endpoint limita tamaño a 5 MB, comprueba formatos y aplica limpieza a SVG. | Autenticación, servidor Node y disco persistente escribible. No es un almacenamiento remoto ni una biblioteca de medios con eliminación y versionado completos. |
| Páginas `/admin/paginas/` | `PagesDashboard` cambia nombre interno, etiqueta, título y ruta; valida conflictos, conserva direcciones anteriores y permite exportar configuración. | Guardado autenticado sobre archivos. En desarrollo las rutas se resuelven mediante middleware; la exportación estática aplica rutas y redirecciones al compilar. No crea por sí sola una página de contenido nuevo. |
| Demos `/admin/demos/` | Convierte solicitudes recibidas manualmente en instrucciones estructuradas para trabajar en Codex. | El operador pega el mensaje y copia o descarga el brief. La generación requiere el entorno y la habilidad de demos del operador; el sitio no ejecuta Codex. |
| Configuración `/admin/settings/` | Presenta instrucciones para ampliar el CMS. | Es una guía; no contiene un formulario para configurar correo, cuentas, credenciales o integraciones. |
| Empleos | Existen `JobsDashboard`, modelos, normalización, almacenamiento en archivos y navegador, y API administrativa. Incluyen herramientas de seguimiento y preparación de datos. | No hay `page.tsx` en `/admin/jobs/` ni entrada en la navegación actual. Es un módulo sin pantalla de ruta activa; no acredita búsqueda o envío automático de candidaturas. |
| Prospectos | Existen `ProspectsDashboard`, edición y filtros de registros, modelos, respaldo en navegador y API administrativa. | No hay `page.tsx` en `/admin/prospectos/` ni entrada en la navegación actual. No equivale a un CRM conectado ni a prospección o mensajería automática. |

Las APIs de contenido de Inicio, Conóceme, empleos y prospectos requieren autenticación incluso para leer. Las páginas públicas parten de contenido importado; el intento de recarga mediante API del CMS puede no estar disponible para un visitante sin sesión. No se garantiza actualización pública inmediata sin recompilar. Un respaldo del navegador tampoco equivale a guardar en el servidor o publicar.

## Operación local de Codex

`/admin/codex/` y sus módulos en `src/lib/codex-ops/` implementan:

- Calendario semanal de lunes a domingo, navegación entre semanas, identidad de tareas e historial de vigencia de horarios.
- Lecturas de cuotas y automatizaciones desde la instalación local, con fecha y cobertura de cada lectura.
- Recuperación paginada de actividad, identificación individual cuando existe evidencia compatible y conservación de estados e historial.
- Filtros por trabajo y estado, duración por ejecución y resúmenes por automatización.
- Aviso de fallos dentro del panel; solicitudes pendientes de cambios de horario.
- Persistencia privada fuera del repositorio por defecto y recolector separado para consultar sin dejar abierto el panel.

Necesita desarrollo local, acceso administrativo, instalación compatible de Codex con sesión disponible, almacenamiento privado escribible y servidor activo. El recolector separado utiliza autorización propia. Se puede desactivar mediante configuración privada. Sus APIs no están habilitadas para producción; la página devuelve contenido vacío durante la exportación estática.

No inicia tareas de IA, no modifica horarios reales automáticamente y no envía alertas externas. La estimación depende de muestras comparables; sin ellas no debe interpretarse como previsión fiable. Una actividad completada no confirma que se publicara contenido, se enviara un mensaje o se lograra un resultado comercial. Sin servidor o recolección no hay vigilancia en vivo; la recuperación posterior depende del historial disponible.

Detalle de arquitectura y operación: [Panel Codex](docs/codex-ops/README.md). Esa guía contiene referencias técnicas de configuración; este README mantiene únicamente los requisitos funcionales.

## Integraciones y herramientas de desarrollo

| Herramienta | Implementación | Configuración y límites |
| --- | --- | --- |
| WhatsApp Business MCP | `mcp/whatsapp-server.ts`, clientes de Meta y almacén local. Lista, consulta y busca conversaciones; envía mensajes o plantillas y permite marcar mensajes como leídos. El webhook verifica solicitudes y procesa eventos. | Cuenta Business, número habilitado, credenciales privadas, webhook accesible y almacenamiento persistente. Los envíos requieren aprobación por defecto. Es independiente de los enlaces públicos que abren WhatsApp; no controla una cuenta personal. |
| Generación de blog | `scripts/blog-automation.mjs` selecciona temas, genera texto e imagen y escribe archivos de apoyo y el registro de artículos. | Acceso privado al proveedor de IA y revisión editorial. El comando modifica `src/data/blog-posts.ts`; los resultados no quedan aislados únicamente como borradores. Generar no publica, pero una compilación posterior puede incorporarlos. |
| Validación de blog | Scripts de validación de borradores y artículos. | Archivos locales coherentes; no comprueban por sí solos posicionamiento, calidad editorial o publicación real. |
| Preparación de demos | `scripts/stage-demo.mjs` exige evidencia de compilación y revisión en navegador; copia la salida aprobada a `public/demos/`, con modo de revisión previa. | Propuesta preparada por separado y archivos de verificación. No sobrescribe demos existentes ni despliega. El brief y los archivos internos no se copian como contenido público. |
| Recursos sociales | Scripts de composición de imágenes y reels; herramienta de carga de archivos mediante transferencia al alojamiento. | Dependencias y recursos de cada script; para cargar, acceso privado al servidor y destino público correcto. No hay un planificador de redes conectado por estos scripts. |
| Extensión de empleos | Proyecto auxiliar en `extensions/job-autofill/`. | Extensión de Chrome: necesita URL base y acceso autenticado a la API de empleos para sincronizar el perfil; rellena campos visibles compatibles, sin enviar formularios ni superar captchas. No es una función pública del sitio. |
| Órbita | Proyecto independiente en `duelo-orbita/`, con motor, salas multijugador, pruebas y funciones de alojamiento propias. | Dependencias y despliegue separados. No se compila ni publica mediante los comandos de AionSite. Consultar su README para el flujo del juego. |

## Configuración necesaria, sin datos privados

1. Para visualizar y desarrollar: Node.js, npm, dependencias del proyecto y recursos públicos disponibles. No hace falta una clave de IA para iniciar el sitio.
2. Para administración: configurar en privado el acceso del servidor y habilitar lectura y escritura persistentes de contenido e imágenes.
3. Para publicar: definir el dominio base correcto, decidir entre servidor Node o exportación estática con servicios PHP, y configurar rutas, HTTPS y encabezados en el alojamiento.
4. Para correo: configurar cuenta remitente, servidor, puerto, cifrado y autenticación. Node y PHP tienen configuraciones separadas; configurar una no configura la otra.
5. Para medición: revisar las cuentas y destinos de los componentes; habilitar la configuración privada de conversiones si se usa PHP. Comprobar consentimiento y recepción real antes de afirmar que se miden conversiones.
6. Para WhatsApp Business: configurar la cuenta, número, acceso privado, validación de webhook y almacenamiento del servicio. Los enlaces comerciales solo necesitan el destino de contacto correcto.
7. Para IA, cargas sociales y Codex local: configurar cada herramienta por separado, con secretos fuera del contenido público y del repositorio.

La plantilla histórica de entorno conserva indicaciones de AI Studio y no es una guía completa de la implementación actual. Este documento no reproduce sus variables ni valores. No se inspeccionaron archivos privados de credenciales para esta revisión.

## Desarrollo e implementación

El sitio utiliza Next.js 15, React 19, TypeScript, Tailwind CSS, componentes compartidos y animaciones con Framer Motion y GSAP. Las versiones exactas y los comandos disponibles están en `package.json` y `package-lock.json`.

```sh
npm ci
npm run dev
```

El desarrollo abre el puerto 2666 y escucha en todas las interfaces de red. Para uso limitado al equipo local:

```sh
node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 2666
```

### Dónde desarrollar cada función

| Área | Fuentes principales |
| --- | --- |
| Rutas y composición | `app/`, `src/components/sections/` |
| Modelo del CMS | `src/cms/types.ts`, `default-content.ts`, `normalize.ts`, `registry.tsx` |
| Contenido de Inicio y portafolio | `src/data/cms/site-content.json` |
| Presentación personal | `src/about/`, `src/data/about-content.json` |
| Páginas y navegación | `src/lib/site-pages.ts`, `site-pages-storage.ts`, `src/data/site-pages.json`, `SiteLink`, middleware y script de rutas |
| Blog | `src/data/blog-posts.ts`, `src/components/blog/`, rutas y scripts del blog |
| Solicitudes y demos | `src/lib/demo-request.ts`, `SiteRequestForm`, `DemoRequestDashboard`, script de preparación |
| SEO y analítica | `src/lib/metadata.ts`, componentes de esquemas y analítica, sitemaps y robots |
| Administración | `src/components/admin/`, `app/admin/`, APIs de contenido y autenticación |
| Correo y conversiones | Endpoints de `app/api/` y archivos PHP de `public/api/` |
| Empleos y prospectos | `src/jobs/`, `src/prospects/`, componentes y APIs administrativas correspondientes |
| Codex local | `src/lib/codex-ops/`, `scripts/codex-ops/`, panel y endpoints locales |

Para añadir una sección al renderizador del CMS: definir su contrato, valores iniciales y normalización; registrarla; crear su componente y conectar los campos del editor. Si debe aparecer en el inicio actual, también hay que integrarla en `app/page.tsx`. No basta registrarla para que se inserte en una composición fijada en código.

## Compilación, alojamiento y publicación

```sh
npm run build
npm run build:static
```

Son alternativas de compilación: la primera prepara el sitio con servidor; la segunda exporta a `out/` y aplica rutas gestionadas y redirecciones. La exportación retira temporalmente la carpeta de APIs Node y la restaura al terminar; no ejecutarla al mismo tiempo que se edita esa carpeta.

| Modalidad | Funciones disponibles y requisitos |
| --- | --- |
| Servidor Node | Renderizado y APIs Node; persistencia administrativa requiere disco escribible duradero. Los PHP necesitan un servidor PHP adicional o configuración específica del alojamiento. |
| Archivos estáticos sin backend | Páginas compiladas, navegación, calculadoras y enlaces de WhatsApp. Sin APIs Node, correo PHP, conversiones PHP ni guardado administrativo en servidor. |
| Exportación con PHP | Puede añadir correo y conversiones mediante los PHP incluidos, si el alojamiento los ejecuta y se configura privadamente. No restaura las APIs Node ni el panel local de Codex. |

Los encabezados de seguridad de Next.js no se aplican automáticamente a archivos estáticos; el alojamiento debe configurarlos. Las reglas incluidas para caché dependen de compatibilidad con Apache/LiteSpeed. El middleware tampoco protege páginas administrativas exportadas: la publicación estática debe excluirlas o protegerlas en el alojamiento según el alcance elegido; nunca publicar datos privados dentro de archivos generados.

Compilar, copiar una demo o cargar un recurso no acredita despliegue completo. La publicación requiere verificar páginas, rutas y funciones en la URL final.

## Comandos de comprobación y mantenimiento

| Comando | Alcance |
| --- | --- |
| `npm run lint` | Revisión de código. |
| `npm run typecheck` | Comprobación de tipos. |
| `npm run test:pages` | Registro de páginas, rutas y conflictos. |
| `npm run test:demos` | Solicitudes y preparación de demos. |
| `npm run test:whatsapp` | Lógica de WhatsApp. |
| `npm run blog:generate` | Generación y modificación local de artículos. |
| `npm run blog:drafts:validate` | Validación de borradores generados. |
| `npm run blog:validate` | Validación de artículos. |
| `npm run demo:stage -- --run "ruta-de-la-propuesta" --dry-run` | Revisar una demo sin copiarla. |
| `npm run demo:stage -- --run "ruta-de-la-propuesta"` | Preparar una demo local para publicación posterior. |
| `npm run upload:social -- "ruta-del-archivo"` | Transferir un recurso al alojamiento configurado. |
| `npm run mcp:whatsapp` | Iniciar el servicio MCP de WhatsApp Business. |

Las pruebas de calendario, actividad, atribución y duración de Codex están en `tests/codex-*.test.ts`. No hay un comando único de pruebas definido en el manifiesto. Pasar pruebas locales no verifica entregas de correo, eventos de analítica o mensajes externos.

## Pendientes identificados al contrastar el código

- Conectar o retirar el newsletter simulado y revisar las referencias al lanzamiento del 18 de mayo de 2026 en las implementaciones Node/PHP y sus textos asociados.
- Unificar el comportamiento de contacto entre el formulario compartido y el formulario de artículos: el respaldo PHP no existe en ambos recorridos.
- Decidir si el inicio debe respetar orden y visibilidad del CMS; actualmente el renderizador alternativo y la portada siguen composiciones distintas.
- Resolver cómo se actualiza el contenido público después de editarlo, considerando que las lecturas de las APIs CMS requieren autenticación y la exportación necesita recompilar.
- Activar mediante rutas los módulos de empleos y prospectos si siguen formando parte del producto, o mantenerlos documentados como módulos sin pantalla activa.
- Revisar la accesibilidad pública de la galería descrita como privada y la protección de administración en el alojamiento estático.
- Unificar los inventarios de sitemaps y corregir el fragmento de la redirección de contacto para que alcance la sección actual.
- Actualizar la plantilla histórica de configuración y contrastar dominio, enlaces y datos estructurados de las variantes antiguas antes de publicarlas.
- Verificar por separado la operación real de correo, PHP, analítica, webhooks y persistencia en el alojamiento. Esta revisión no envió mensajes, ejecutó generación de IA, modificó automatizaciones ni desplegó.

## Alcance de esta revisión

Se contrastaron las rutas públicas y administrativas, importaciones de componentes, endpoints Node y PHP, modelos y mecanismos de persistencia, scripts del manifiesto, pruebas disponibles y proyectos auxiliares. Se corrigieron descripciones de rutas alternativas y se ampliaron las funciones de portafolio, idiomas, acceso administrativo, WhatsApp y SEO.

La comprobación documental verifica referencias locales, comandos del manifiesto y ausencia de nombres de variables o datos privados en este README. No se ejecutaron compilaciones, pruebas de aplicación ni integraciones externas para esta actualización de documentación. Los pendientes descritos proceden del código inspeccionado; no son correcciones ya implementadas.

## Guías relacionadas

- [Páginas y URLs](docs/paginas-y-urls.md).
- [Solicitud, preparación y publicación de demos](docs/demos-comerciales.md).
- [Operación local de Codex](docs/codex-ops/README.md).
- [WhatsApp Business MCP](mcp/README.md).
- [Extensión de empleos](extensions/job-autofill/README.md).
- [Juego Órbita](duelo-orbita/README.md).
- [Seguimiento orgánico semanal](docs/organic-weekly-scorecard.md).
