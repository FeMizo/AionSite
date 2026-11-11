import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { build } from 'esbuild';

// Run the real handler with isolated mail/storage replacements; no network or data writes.
const effects = { mail: [], leads: [] };
const compiled = await build({
  entryPoints: ['app/api/contact/route.ts'], bundle: true, write: false,
  platform: 'node', format: 'cjs', packages: 'external',
  plugins: [{ name: 'isolate-contact-effects', setup(builder) {
    builder.onResolve({ filter: /^(nodemailer|@\/src\/lib\/whatsapp\/store)$/ }, args => ({ path: args.path, namespace: 'contact-test' }));
    builder.onLoad({ filter: /.*/, namespace: 'contact-test' }, args => ({ contents: args.path === 'nodemailer'
      ? 'export default {createTransport:()=>({sendMail:async mail=>effects.mail.push(mail)})};'
      : 'export const recordContactFormLead=async lead=>effects.leads.push(lead);', loader: 'js' }));
  } }],
});
const compiledModule = { exports: {} };
new Function('require', 'module', 'exports', 'effects', compiled.outputFiles[0].text)(createRequire(import.meta.url), compiledModule, compiledModule.exports, effects);
const { POST } = compiledModule.exports;
let requestId = 0;
const valid = { name: 'Cliente local', email: 'cliente@example.invalid', message: 'Consulta local' };
const submit = body => POST(new Request('http://localhost/api/contact', {
  method: 'POST', headers: { 'Content-Type': 'application/json', 'x-real-ip': `local-test-${++requestId}` },
  body: JSON.stringify(body),
}));

test('rejects blank names/messages before mail or storage', async () => {
  for (const field of ['name', 'message']) {
    for (const value of ['', '   ', '\t\r\n', '\u00a0']) {
      assert.equal((await submit({ ...valid, [field]: value })).status, 400, `${field}: ${JSON.stringify(value)}`);
    }
  }
  assert.equal(effects.mail.length, 0);
  assert.equal(effects.leads.length, 0);
});

test('preserves valid form submission and HTML escaping', async () => {
  effects.mail.length = effects.leads.length = 0;
  const body = { ...valid, name: '<Cliente>', message: 'Sitio & SEO\nSegunda linea' };
  assert.equal((await submit(body)).status, 200);
  assert.equal(effects.mail.length, 1);
  assert.equal(effects.leads.length, 1);
  assert.match(effects.mail[0].html, /&lt;Cliente&gt;/);
  assert.match(effects.mail[0].html, /Sitio &amp; SEO/);
  assert.deepEqual(effects.leads[0], body);
});

test('retains type, email and size validation without side effects', async () => {
  effects.mail.length = effects.leads.length = 0;
  for (const body of [
    { ...valid, name: 42 }, { ...valid, message: {} },
    { ...valid, email: 'invalid' }, { ...valid, name: 'x'.repeat(101) },
    { ...valid, message: 'x'.repeat(5001) },
  ]) assert.equal((await submit(body)).status, 400);
  assert.equal(effects.mail.length, 0);
  assert.equal(effects.leads.length, 0);
});
