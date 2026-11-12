import { execFileSync } from "node:child_process";
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const VARIANTS = ["v1", "v2", "v3"];

function rejectSymlinks(directory) {
  for (const name of readdirSync(directory)) {
    const filename = path.join(directory, name);
    const info = lstatSync(filename);
    if (info.isSymbolicLink()) throw new Error("La exportación no debe contener enlaces simbólicos.");
    if (info.isDirectory()) rejectSymlinks(filename);
  }
}

function redirectPage(name) {
  return `<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${name} | Propuesta de sitio web</title>
  <meta name="description" content="Propuesta de sitio web para ${name}. Se abre la versión 1.">
  <meta name="robots" content="noindex, nofollow">
  <meta http-equiv="refresh" content="0; url=v1/">
</head>
<body>
  <p>Abriendo la propuesta. Si no se abre, <a href="v1/">entra a la versión 1</a>. También puedes ver la <a href="v2/">2</a> y la <a href="v3/">3</a>.</p>
</body>
</html>
`;
}

// Copia una versión verificada (v1, v2 o v3) a public/clientes/<cliente>/<versión>/.
// La raíz del cliente siempre redirige a v1. La contraseña la genera scripts/proteger-clientes.mjs.
export function stageClient(runDirectory, publicDirectory, variant, dryRun = false) {
  if (!VARIANTS.includes(variant)) throw new Error("La versión debe ser v1, v2 o v3.");
  const run = realpathSync(runDirectory);
  const manifest = JSON.parse(readFileSync(path.join(run, "manifest.json"), "utf8"));
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.slug || "")) throw new Error("Nombre de cliente inválido.");
  const checks = JSON.parse(readFileSync(path.join(run, "checks/verification.json"), "utf8"));
  const verified = checks.versions?.[variant] ?? checks;
  if (verified.build !== "passed" || verified.browser !== "passed") throw new Error("Faltan comprobaciones de compilación y navegador aprobadas.");
  const siteDir = path.join(run, "site", variant, "out");
  if (!existsSync(siteDir)) throw new Error(`Falta la exportación estática de ${variant}.`);
  const source = realpathSync(siteDir);
  const relative = path.relative(run, source);
  if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("La exportación está fuera de la propuesta.");
  if (!existsSync(path.join(source, "index.html"))) throw new Error("Falta la exportación estática del sitio.");
  rejectSymlinks(source);
  const html = readFileSync(path.join(source, "index.html"), "utf8");
  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) throw new Error("La propuesta debe conservar noindex.");
  if (!html.includes(`/clientes/${manifest.slug}/${variant}/_next/`)) throw new Error("La exportación no utiliza el prefijo esperado.");
  const clientDir = path.resolve(publicDirectory, "clientes", manifest.slug);
  const target = path.join(clientDir, variant);
  if (existsSync(target)) throw new Error("La versión ya existe; no se sobrescribe. Usa otro nombre de cliente o una nueva ejecución.");
  if (!dryRun) {
    mkdirSync(clientDir, { recursive: true });
    if (realpathSync(clientDir).toLowerCase() !== clientDir.toLowerCase()) throw new Error("El destino no debe ser un enlace simbólico.");
    cpSync(source, target, { recursive: true, force: false, errorOnExist: true });
    const root = path.join(clientDir, "index.html");
    if (!existsSync(root)) writeFileSync(root, redirectPage(manifest.name || manifest.slug));
    const guard = path.join(path.dirname(fileURLToPath(import.meta.url)), "proteger-clientes.mjs");
    execFileSync(process.execPath, [guard], { cwd: path.dirname(path.resolve(publicDirectory)), stdio: "pipe" });
  }
  return { target, url: `https://aionsite.com.mx/clientes/${manifest.slug}/${variant}/`, staged: !dryRun, protected: !dryRun, deployed: false };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const run = process.argv.indexOf("--run");
    const variant = process.argv.indexOf("--variant");
    if (run < 0 || !process.argv[run + 1] || variant < 0 || !process.argv[variant + 1]) {
      throw new Error("Uso: npm run client:stage -- --run RUTA_PROPUESTA --variant v1|v2|v3 [--dry-run]");
    }
    const dry = process.argv.includes("--dry-run");
    console.log(JSON.stringify(stageClient(process.argv[run + 1], path.resolve("public"), process.argv[variant + 1], dry), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
