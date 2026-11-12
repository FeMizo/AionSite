# Cómo publicar la propuesta de un cliente en aionsite.com.mx

Cada cliente se ve en `https://aionsite.com.mx/clientes/<Cliente>/<version>/`, protegido con contraseña y sin indexar.
Ejemplos vivos: `ColegioMexico` (raíz, v1.0, v2.0, v3.0) y `continental` (raíz, v1, v2, v3).

Esta carpeta (`clientes/` en la raíz del repo) es **privada**: no se publica.
Lo que se publica vive en `public/clientes/<Cliente>/`.

## Qué va en cada lado

| Va en `public/clientes/<Cliente>/` (se publica) | Va en `clientes/<Cliente>/` (privado) |
|---|---|
| `index.html`, `styles.css` / `css/`, `js/` o `app.js`, `content.json` | `DESIGN.md`, `PRODUCT.md`, `README.md`, `VERSIONES.md` |
| `assets/` con **solo** las imágenes que usa el HTML | críticas, briefs, `docs/` |
| una carpeta por versión (`v1/`, `v2/`…) con sus propios archivos | scripts de vista previa (`preview.mjs`) |
| `.htaccess` (lo genera el script, ver paso 4) | respaldos, `.bak`, logs, capturas de pantalla |

Regla de oro: **nunca** subir capturas de pantalla, respaldos, notas internas ni fotos que la propuesta no use.

## Pasos

1. **Carpeta.** Crea `public/clientes/<Cliente>/`. El nombre de la carpeta decide la URL y la contraseña, así que elige uno corto, sin espacios ni acentos (`ColegioMexico`, `continental`).
2. **Rutas relativas.** Dentro de cada versión usa rutas relativas (`styles.css`, `assets/foto.jpg`, `../assets/...`), nunca `/algo` con barra inicial: la página vive en un subdirectorio. Cada versión puede llevar su propia copia de `assets/` y `content.json`, o apuntar a `../assets/`.
3. **Limpieza.** Deja en `public/` solo lo que el HTML usa. Comprueba que ninguna imagen sea una captura de pantalla y que no queden `.bak`, `.md` ni logs.
4. **Contraseña.** Desde la raíz del repo:
   ```bash
   node scripts/proteger-clientes.mjs
   ```
   Escribe un `.htaccess` en cada carpeta de `public/clientes/`. Usuario y contraseña son el nombre de la carpeta en minúsculas y sin símbolos: `clientes/ColegioMexico` → `colegiomexico`; `clientes/continental` → `continental`. El script se puede repetir sin problema.
5. **Robots.** `app/robots.ts` ya tiene `disallow: ["/clientes/"]` para todos los clientes. No hay que tocarlo.
6. **Revisar en local** abriendo el `index.html` de cada versión con un servidor estático (la contraseña solo actúa en el servidor real). Prueba a 375 px y a 1280 px, y que no haya enlaces rotos ni imágenes faltantes.
7. **Subir.** Haz commit de `public/clientes/<Cliente>/` (y de los cambios en `clientes/<Cliente>/` si los hay) y push a `main`. El push dispara GitHub Actions, que construye el sitio y lo sube por FTP a Hostinger. Se publica **todo** lo que esté en `main`, así que revisa `git status` antes.
8. **Verificar.** Cuando termine el deploy, abre la URL en una ventana privada. Debe pedir usuario y contraseña. Si entra sin pedirlos, el servidor no está pasando el encabezado de autorización y hay que cambiar el método. Comprueba también que `/clientes/<Cliente>/.htaccess` y los `.md` den error (403 o 404).
9. **Entregar.** Manda al cliente la URL de la versión y la contraseña por separado.

## Antes de publicar, confirma con el cliente

- Permiso para mostrar nombres y fotos de menores de edad.
- Datos reales: teléfonos, correos, claves y cifras. Lo no confirmado se deja visible como "por confirmar", no se inventa.
