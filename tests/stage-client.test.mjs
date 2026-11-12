import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { stageDemo } from '../scripts/stage-demo.mjs';

function fixture() {
  const root = mkdtempSync(path.join(os.tmpdir(), 'aionsite-stage-'));
  const run = path.join(root, 'run');
  mkdirSync(path.join(run, 'site/out'), { recursive: true });
  mkdirSync(path.join(run, 'checks'));
  writeFileSync(path.join(run, 'manifest.json'), JSON.stringify({ slug: 'cafe-ambar', selected_variant: 'a' }));
  writeFileSync(path.join(run, 'checks/verification.json'), JSON.stringify({ build: 'passed', browser: 'passed' }));
  writeFileSync(path.join(run, 'site/out/index.html'), '<meta name="robots" content="noindex, nofollow"><script src="/demos/cafe-ambar/_next/test.js"></script>');
  writeFileSync(path.join(run, 'brief.txt'), 'Información interna que no se debe publicar');
  return { root, run, publicDir: path.join(root, 'public') };
}

test('dry-run does not write, staging copies only exported site and never overwrites', () => {
  const { run, publicDir } = fixture();
  const preview = stageDemo(run, publicDir, true);
  assert.equal(existsSync(publicDir), false);
  assert.equal(preview.deployed, false);
  const staged = stageDemo(run, publicDir);
  const before = readFileSync(path.join(staged.target, 'index.html'));
  assert.equal(existsSync(path.join(staged.target, 'brief.txt')), false);
  assert.throws(() => stageDemo(run, publicDir), /no se sobrescribe/);
  assert.deepEqual(readFileSync(path.join(staged.target, 'index.html')), before);
});

test('unverified or indexable proposals and traversal slugs cannot be staged', () => {
  const { run, publicDir } = fixture();
  writeFileSync(path.join(run, 'checks/verification.json'), JSON.stringify({ build: 'passed', browser: 'pending' }));
  assert.throws(() => stageDemo(run, publicDir), /comprobaciones/);
  writeFileSync(path.join(run, 'checks/verification.json'), JSON.stringify({ build: 'passed', browser: 'passed' }));
  writeFileSync(path.join(run, 'site/out/index.html'), '<h1>Sitio sin robots</h1>');
  assert.throws(() => stageDemo(run, publicDir), /noindex/);
  writeFileSync(path.join(run, 'manifest.json'), JSON.stringify({ slug: '../../escape', selected_variant: 'a' }));
  assert.throws(() => stageDemo(run, publicDir), /inválido/);
  assert.equal(existsSync(publicDir), false);
});
