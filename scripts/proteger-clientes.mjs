// Protege con contraseña cada carpeta de public/clientes/<cliente>/.
// Usuario y contraseña = nombre de la carpeta en minúsculas (clientes/ColegioMexico -> colegiomexico).
// Usa mod_rewrite (sin .htpasswd ni rutas absolutas), compatible con Apache y LiteSpeed (Hostinger).
// Uso: node scripts/proteger-clientes.mjs   (es idempotente: reemplaza su propio bloque)
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const base = join(process.cwd(), "public", "clientes");
const INI = "# >>> acceso-cliente (generado por scripts/proteger-clientes.mjs)";
const FIN = "# <<< acceso-cliente";
const BS = String.fromCharCode(92); // barra invertida

for (const nombre of readdirSync(base)) {
  const dir = join(base, nombre);
  if (!statSync(dir).isDirectory()) continue;
  const clave = nombre.toLowerCase().replace(/[^a-z0-9]/g, "");
  const token = Buffer.from(clave + ":" + clave).toString("base64").split("=").join(BS + "=");
  const bloque = [
    INI,
    "Options -Indexes",
    "<IfModule mod_rewrite.c>",
    "  RewriteEngine On",
    "  RewriteCond %{HTTP:Authorization} !^Basic" + BS + " " + token + "$",
    "  RewriteRule ^ - [R=401,L]",
    "</IfModule>",
    "<IfModule mod_headers.c>",
    '  Header always set WWW-Authenticate "Basic realm=' + BS + '"Propuesta ' + nombre + BS + '""' + ' "expr=%{REQUEST_STATUS} == 401"',
    '  Header always set X-Robots-Tag "noindex, nofollow"',
    "</IfModule>",
    '<FilesMatch "' + BS + ".(md|bak)$" + '">',
    "  Require all denied",
    "</FilesMatch>",
    FIN,
    "",
  ].join("\n");

  const ruta = join(dir, ".htaccess");
  let actual = existsSync(ruta) ? readFileSync(ruta, "utf8") : "";
  // Quita bloques anteriores propios y la regla antigua de .md
  let i = actual.indexOf(INI);
  while (i !== -1) {
    const j = actual.indexOf(FIN, i);
    if (j === -1) break;
    actual = actual.slice(0, i) + actual.slice(j + FIN.length).replace(/^\n/, "");
    i = actual.indexOf(INI);
  }
  actual = actual.split("\n").filter((l, k, a) => !(l.startsWith("# Documentos internos"))).join("\n");
  actual = actual.replace(/<FilesMatch "[^"]*\(md\)\$">\s*Require all denied\s*<\/FilesMatch>\n?/, "");
  writeFileSync(ruta, (actual.trim() ? actual.trimEnd() + "\n\n" : "") + bloque);
  console.log(nombre + ': usuario y contraseña "' + clave + '"');
}
