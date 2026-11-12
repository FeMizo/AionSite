import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function rejectSymlinks(directory) {
  for (const name of readdirSync(directory)) {
    const filename = path.join(directory, name);
    const info = lstatSync(filename);
    if (info.isSymbolicLink()) throw new Error("La exportación no debe contener enlaces simbólicos.");
    if (info.isDirectory()) rejectSymlinks(filename);
  }
}

export function stageDemo(runDirectory, publicDirectory, dryRun = false) {
  const run = realpathSync(runDirectory);
  const manifest = JSON.parse(readFileSync(path.join(run, "manifest.json"), "utf8"));
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.slug || "")) throw new Error("Nombre de demo inválido.");
  if (!['a', 'b'].includes(manifest.selected_variant)) throw new Error("Falta elegir una propuesta.");
  const checks = JSON.parse(readFileSync(path.join(run, "checks/verification.json"), "utf8"));
  if (checks.build !== "passed" || checks.browser !== "passed") throw new Error("Faltan comprobaciones de compilación y navegador aprobadas.");
  const source = realpathSync(path.join(run, "site/out"));
  const relative = path.relative(run, source);
  if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error("La exportación está fuera de la propuesta.");
  if (!existsSync(path.join(source, "index.html"))) throw new Error("Falta la exportación estática del sitio.");
  rejectSymlinks(source);
  const html = readFileSync(path.join(source, 'index.html'), 'utf8');
  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) throw new Error("La demo debe conservar noindex.");
  if (!html.includes(`/demos/${manifest.slug}/_next/`)) throw new Error("La exportación no utiliza el prefijo esperado.");
  const target = path.resolve(publicDirectory, "demos", manifest.slug);
  if (existsSync(target)) throw new Error("La demo ya existe; no se sobrescribe. Usa una nueva versión con otro nombre.");
  if (!dryRun) {
    mkdirSync(path.dirname(target), { recursive: true });
    if (realpathSync(path.dirname(target)).toLowerCase() !== path.dirname(target).toLowerCase()) throw new Error("El destino no debe ser un enlace simbólico.");
    cpSync(source, target, { recursive: true, force: false, errorOnExist: true });
  }
  return { target, url: `https://aionsite.com.mx/demos/${manifest.slug}/`, staged: !dryRun, deployed: false };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const index = process.argv.indexOf("--run");
    if (index < 0 || !process.argv[index + 1]) throw new Error("Uso: npm run demo:stage -- --run RUTA_PROPUESTA [--dry-run]");
    console.log(JSON.stringify(stageDemo(process.argv[index + 1], path.resolve("public"), process.argv.includes("--dry-run")), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
