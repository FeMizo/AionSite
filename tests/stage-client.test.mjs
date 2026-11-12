import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { stageClient } from '../scripts/stage-client.mjs';

function fixture(variant = 'v1') {
  const root = mkdtempSync(path.join(os.tmpdir(), 'aionsite-stage-'));
  const run = path.join(root, 'run');
  mkdirSync(path.join(run, `site/${variant}/out`), { recursive: true });
  mkdirSync(path.join(run, 'checks'));
  writeFileSync(path.join(run, 'manifest.json'), JSON.stringify({ slug: 'cafe-ambar', name: 'Cafe Ambar' }));
  writeFileSync(path.join(run, 'checks/verification.json'), JSON.stringify({ build: 'passed', browser: 'passed' }));
  writeFileSync(path.join(run, `site/${variant}/out/index.html`), `<meta name="robots" content="noindex, nofollow"><script src="/clientes/cafe-ambar/${variant}/_next/test.js"></script>`);
  writeFileSync(path.join(run, 'brief.txt'), 'Información interna que no se debe publicar');
  return { root, run, publicDir: path.join(root, 'public') };
}

test('dry-run does not write; staging copies only the exported version, protects it and never overwrites', () => {
  const { run, publicDir } = fixture();
  const preview = stageClient(run, publicDir, 'v1', true);
  assert.equal(existsSync(publicDir), false);
  assert.equal(preview.deployed, false);
  const staged = stageClient(run, publicDir, 'v1');
  const before = readFileSync(path.join(staged.target, 'index.html'));
  assert.equal(existsSync(path.join(staged.target, 'brief.txt')), false);
  const clientDir = path.dirname(staged.target);
  assert.match(readFileSync(path.join(clientDir, 'index.html'), 'utf8'), /url=v1\//);
  assert.match(readFileSync(path.join(clientDir, '.htaccess'), 'utf8'), /Authorization/);
  assert.equal(staged.url, 'https://aionsite.com.mx/clientes/cafe-ambar/v1/');
  assert.throws(() => stageClient(run, publicDir, 'v1'), /no se sobrescribe/);
  assert.deepEqual(readFileSync(path.join(staged.target, 'index.html')), before);
});

test('only v1, v2 and v3 are accepted', () => {
  const { run, publicDir } = fixture();
  assert.throws(() => stageClient(run, publicDir, 'a'), /v1, v2 o v3/);
  assert.throws(() => stageClient(run, publicDir, 'v4'), /v1, v2 o v3/);
});

test('unverified or indexable proposals and traversal slugs cannot be staged', () => {
  const { run, publicDir } = fixture();
  writeFileSync(path.join(run, 'checks/verification.json'), JSON.stringify({ build: 'passed', browser: 'pending' }));
  assert.throws(() => stageClient(run, publicDir, 'v1'), /comprobaciones/);
  writeFileSync(path.join(run, 'checks/verification.json'), JSON.stringify({ build: 'passed', browser: 'passed' }));
  writeFileSync(path.join(run, 'site/v1/out/index.html'), '<h1>Sitio sin robots</h1>');
  assert.throws(() => stageClient(run, publicDir, 'v1'), /noindex/);
  writeFileSync(path.join(run, 'manifest.json'), JSON.stringify({ slug: '../../escape' }));
  assert.throws(() => stageClient(run, publicDir, 'v1'), /inválido/);
  assert.equal(existsSync(publicDir), false);
});
