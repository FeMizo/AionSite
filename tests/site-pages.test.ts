import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, mkdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { managedRoute, normalizePagePath, resolvePageHref, sitePages, validateSitePages } from '../src/lib/site-pages';
import { readSitePages, saveSitePages } from '../src/lib/site-pages-storage';
import { applyPageRoutes } from '../scripts/apply-page-routes';

test('old quote link redirects and renamed routes preserve children, search and hash',()=>{
  assert.equal(resolvePageHref('/productos/'),'/cotizar-proyecto/');
  assert.deepEqual(managedRoute('/productos'),{action:'redirect',path:'/cotizar-proyecto/'});
  const pages=sitePages.map(page=>page.id==='blog'?{...page,path:'/articulos/'}:page);
  assert.equal(resolvePageHref('/blog/mi-nota/?ref=uno#titulo',pages),'/articulos/mi-nota/?ref=uno#titulo');
  assert.deepEqual(managedRoute('/articulos/mi-nota',pages),{action:'rewrite',path:'/blog/mi-nota/'});
  assert.equal(managedRoute('/api/contact',pages),null);
  assert.equal(resolvePageHref('https://external.example/blog/'), 'https://external.example/blog/');
});

test('nested styles preserve child ownership, redirect old URLs and rewrite canonical URLs', () => {
  assert.equal(normalizePagePath('/estilos/mi-estilo'), '/estilos/mi-estilo/');
  for (const id of ['arkkhe','claymorphism','future','luma','skeuomorphism','spatial-ui','specialui']) {
    assert.equal(resolvePageHref(`/${id}/?ref=lab#inicio`), `/estilos/${id}/?ref=lab#inicio`);
    assert.deepEqual(managedRoute(`/${id}/`), { action: 'redirect', path: `/estilos/${id}/` });
    assert.deepEqual(managedRoute(`/estilos/${id}/`), { action: 'rewrite', path: `/${id}/` });
  }
  const renamed = sitePages.map((page) => page.id === 'arkkhe' ? { ...page, path: '/estilos/lujo/' } : page);
  assert.equal(resolvePageHref('/arkkhe/', renamed), '/estilos/lujo/');
  assert.equal(resolvePageHref('/estilos/arkkhe-extra/'), '/estilos/arkkhe-extra/');
  for (const bad of ['/estilos/../admin/', '/estilos//luma/', '/estilos/%2e%2e/', '/admin/ejemplos/']) assert.throws(() => normalizePagePath(bad));
});

test('invalid, reserved, duplicate, exchanged and missing page routes are rejected',()=>{
  const change=(url:string)=>sitePages.map(page=>page.id==='quote'?{...page,path:url}:page);
  for(const url of ['/admin/','/api/','/demos/','/proyectos/','https://example.com/','/../escape/','/bad?x=1']) assert.throws(()=>validateSitePages(change(url),sitePages));
  assert.throws(()=>validateSitePages(sitePages.slice(1),sitePages));
  assert.throws(()=>validateSitePages(sitePages.map(page=>page.id==='home'?{...page,path:'/inicio/'}:page),sitePages));
  const updated=validateSitePages(change('/presupuesto/'),sitePages);
  assert.deepEqual(managedRoute('/cotizar-proyecto/',updated),{action:'redirect',path:'/presupuesto/'});
  assert.ok(updated.find(page=>page.id==='quote')?.aliases.includes('/productos/'));
  assert.equal(updated.find(page=>page.id==='quote')?.sourcePath,'/cotizar-proyecto/');
});

test('page parents persist and reject missing parents, self parenting and cycles', () => {
  const change = (id: string, parentId: string | null) => sitePages.map(page => page.id === id ? {...page, parentId} : page);
  const updated = validateSitePages(change('blog', 'quote'), sitePages);
  assert.equal(updated.find(page => page.id === 'blog')?.parentId, 'quote');
  assert.equal(updated.find(page => page.id === 'blog')?.path, '/blog/');
  for (const parentId of ['missing', 'blog']) assert.throws(() => validateSitePages(change('blog', parentId), sitePages));
  assert.throws(() => validateSitePages(change('home', 'quote'), sitePages));
  const cycle = sitePages.map(page => page.id === 'blog' ? {...page, parentId: 'quote'} : page.id === 'quote' ? {...page, parentId: 'blog'} : page);
  assert.throws(() => validateSitePages(cycle, sitePages), /ciclo/);
});

test('saving persists only validated pages and prevents lost concurrent edits',async()=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'aion-pages-'));
  const filename=path.join(root,'pages.json');
  await writeFile(filename,JSON.stringify(sitePages));
  const initial=await readSitePages(filename);
  const edited=sitePages.map(page=>page.id==='quote'?{...page,path:'/presupuesto/',displayName:'Pedir propuesta',title:'Mi propuesta | AionSite'}:page);
  const results=await Promise.allSettled([saveSitePages(edited,initial.version,filename),saveSitePages(sitePages,initial.version,filename)]);
  assert.equal(results.filter(result=>result.status==='fulfilled').length,1);
  assert.equal(results.filter(result=>result.status==='rejected').length,1);
  const saved=await readSitePages(filename);
  assert.equal(saved.pages.find(page=>page.id==='quote')?.path,'/presupuesto/');
  assert.notEqual(saved.version,initial.version);
});

test('static export copies new URL and RSC payload and retains redirects for old URLs',async()=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'aion-page-export-'));
  const pages=[{id:'quote',name:'Cotizar',displayName:'Cotizar',title:'Cotizar & crear',sourcePath:'/quote/',path:'/presupuesto/',aliases:['/productos/']}];
  await mkdir(path.join(root,'quote'),{recursive:true});
  await writeFile(path.join(root,'quote/index.html'),'<html><head><title>Old</title></head><body>Contenido</body></html>');
  await writeFile(path.join(root,'quote.txt'),'RSC-payload');
  assert.equal(applyPageRoutes(root,pages),1);
  assert.match(await readFile(path.join(root,'presupuesto/index.html'),'utf8'), /Cotizar &amp; crear/);
  assert.equal(await readFile(path.join(root,'presupuesto.txt'),'utf8'),'RSC-payload');
  assert.match(await readFile(path.join(root,'productos/index.html'),'utf8'),/location.replace\("\/presupuesto\/"\+location.search\+location.hash\)/);
  assert.match(await readFile(path.join(root,'quote/index.html'),'utf8'),/Página trasladada/);
});
