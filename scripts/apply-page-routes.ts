import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { validateSitePages, type SitePage } from "../src/lib/site-pages";

const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function inside(root: string, route: string) {
  const target=path.resolve(root, '.' + route);
  const relative=path.relative(root,target);
  if(relative.startsWith('..')||path.isAbsolute(relative))throw new Error('Ruta fuera de la exportación.');
  return target;
}

function htmlFiles(root: string): string[] {
  if(!existsSync(root))return [];
  return readdirSync(root,{withFileTypes:true}).flatMap((entry)=>entry.isDirectory()?htmlFiles(path.join(root,entry.name)):entry.name.endsWith('.html')?[path.join(root,entry.name)]:[]);
}

function redirectHtml(destination:string) {
  const encoded=escape(destination);
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><meta http-equiv="refresh" content="0;url=${encoded}"><link rel="canonical" href="https://aionsite.com.mx${encoded}"><title>Página trasladada</title></head><body><a href="${encoded}">Continuar a la página</a><script>location.replace(${JSON.stringify(destination)}+location.search+location.hash)</script></body></html>`;
}

export function applyPageRoutes(directory:string, input:SitePage[]) {
  const root=path.resolve(directory);
  const pages=validateSitePages(input,input);
  for(const page of pages) {
    const source=inside(root,page.sourcePath);
    if(!existsSync(path.join(source,'index.html')))throw new Error(`Falta exportar ${page.sourcePath}`);
    const target=inside(root,page.path);
    if(source!==target){
      if(existsSync(target))throw new Error(`La URL ${page.path} ya existe en la exportación.`);
      mkdirSync(path.dirname(target),{recursive:true});cpSync(source,target,{recursive:true});
      const sourcePayload=source+'.txt';
      if(existsSync(sourcePayload))cpSync(sourcePayload,target+'.txt');
    }
    const index=path.join(target,'index.html');
    if(page.title)writeFileSync(index,readFileSync(index,'utf8').replace(/<title>[\s\S]*?<\/title>/,`<title>${escape(page.title)}</title>`));
  }
  for(const page of pages) {
    const target=inside(root,page.path);
    const exported=htmlFiles(target);
    const previous=[...new Set([page.sourcePath,...page.aliases])].filter((route)=>route!==page.path);
    for(const alias of previous) {
      for(const filename of exported) {
        const suffix=path.relative(target,filename);
        const destination=page.path+suffix.replaceAll('\\','/').replace(/index\.html$/,'');
        const stub=path.join(inside(root,alias),suffix);
        mkdirSync(path.dirname(stub),{recursive:true});writeFileSync(stub,redirectHtml(destination));
      }
    }
  }
  return pages.length;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  const pages=JSON.parse(readFileSync('src/data/site-pages.json','utf8')) as SitePage[];
  console.log(`Rutas de ${applyPageRoutes('out',pages)} páginas preparadas.`);
}
