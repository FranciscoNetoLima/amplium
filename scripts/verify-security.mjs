import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createServer, preview } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { normalizeText, isValidContact, buildWhatsAppUrl } from '../src/contact-utils.js';
import { productionCsp, productionHeaders } from '../security.config.js';

const malicious = '<img src=x onerror=alert(1)> & " \' # ?';
assert.equal(normalizeText('  João\u0000\u202E Silva  ', 100), 'João Silva');
assert.equal(normalizeText('a\r\nb', 100, true), 'a\nb');
assert.equal(normalizeText('a\r\nb', 100), 'a b');
assert.equal(normalizeText('a'.repeat(300), 100).length, 100);
assert.equal(normalizeText('\uD800', 10), '\uFFFD');
assert.equal(normalizeText(null, 10), '');
for (const contact of ['', 'hello@example.com', '+55 (88) 99243-1477', '+1 212 555 1234'])
  assert(isValidContact(contact));
for (const contact of ['not-an-email', 'a@b', '<script>', '123', '+1234567890123456'])
  assert(!isValidContact(contact));
assert.equal(buildWhatsAppUrl('   '), undefined);
const whatsapp = new URL(buildWhatsAppUrl(malicious));
assert.equal(whatsapp.origin, 'https://wa.me');
assert.equal(whatsapp.pathname, '/5588992431477');
assert.equal(whatsapp.searchParams.get('text'), malicious);
assert.equal(
  Array.from(new URL(buildWhatsAppUrl('x'.repeat(10000))).searchParams.get('text')).length,
  2400,
);
const rendered = renderToStaticMarkup(React.createElement('p', {}, malicious));
assert(rendered.includes('&lt;img'));
assert(!rendered.includes('<img'));

function files(root) {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory() ? files(path.join(root, entry.name)) : [path.join(root, entry.name)],
    );
}
const runtimeFiles = [
  ...files('src'),
  ...files('public'),
  'index.html',
  ...fs.readdirSync('.').filter((file) => file.endsWith('.css')),
];
let pngCount = 0;
for (const file of runtimeFiles) {
  const ext = path.extname(file);
  if (ext === '.png') {
    const buffer = fs.readFileSync(file);
    assert(buffer.subarray(1, 4).equals(Buffer.from('PNG')));
    let offset = 8;
    const chunks = [];
    while (offset + 12 <= buffer.length) {
      const length = buffer.readUInt32BE(offset);
      chunks.push(buffer.toString('ascii', offset + 4, offset + 8));
      offset += length + 12;
    }
    assert(chunks.includes('IHDR') && chunks.includes('IEND'));
    pngCount++;
    continue;
  }
  if (!['.js', '.jsx', '.json', '.css', '.svg', '.html'].includes(ext)) continue;
  const text = fs.readFileSync(file, 'utf8');
  assert(
    !/(?:innerHTML|outerHTML|insertAdjacentHTML|document\.write|dangerouslySetInnerHTML|\beval\s*\(|new Function\s*\()/u.test(
      text,
    ),
    'Unsafe sink: ' + file,
  );
  assert(
    !/GTM-[A-Z0-9]+|UA-\d+-\d+|\bfbq\s*\(|\bgtag\s*\(|hotjar/iu.test(text),
    'Unexpected tracker: ' + file,
  );
  assert(
    !/BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|\b(?:sk-proj-|AKIA)[A-Za-z0-9_-]{12,}/u.test(text),
    'Potential secret: ' + file,
  );
  if (ext === '.svg')
    assert(
      !/<script|<foreignObject|\son[a-z]+\s*=|(?:href|src)\s*=\s*["'](?:https?:|javascript:|data:)/iu.test(
        text,
      ),
      'Unsafe SVG: ' + file,
    );
  if (ext === '.css' || ext === '.html')
    assert(!/https?:\/\//u.test(text), 'Unexpected remote resource: ' + file);
}

globalThis.window = { dispatchEvent: () => {} };
globalThis.requestAnimationFrame = (callback) => {
  callback();
  return 1;
};
const site = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const locale = await site.ssrLoadModule('/src/i18n.js');
  for (const value of [
    'javascript:alert(1)',
    'https://wa.me.evil.test/5588992431477',
    'https://wa.me@evil.test/5588992431477',
    'http://wa.me/5588992431477',
    'https://wa.me/999',
    'not a url',
  ])
    assert.equal(locale.localizedWhatsApp(value), undefined);
  const { default: App } = await site.ssrLoadModule('/src/App.jsx');
  const html = renderToStaticMarkup(React.createElement(App));
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/<a\b[^>]*>/g)) {
    const anchor = match[0];
    if (/target="_blank"/.test(anchor)) assert(/rel="noopener noreferrer"/.test(anchor));
    const href = anchor.match(/href="([^"]+)"/)?.[1];
    if (href?.startsWith('#')) {
      assert.notEqual(href, '#');
      assert(ids.has(href.slice(1)), 'Broken anchor ' + href);
    }
    if (href?.startsWith('http'))
      assert(
        /^https:\/\/(?:wa\.me\/5588992431477(?:[/?#]|$)|www\.instagram\.com\/amplium\.pro\/?$)/.test(
          href,
        ),
      );
  }
  assert(html.includes('method="post"'));
  assert(!/action="https?:/u.test(html));
  for (const url of [...html.matchAll(/(?:src|href)="(assets\/[^"#?]+)"/g)].map(
    (match) => match[1],
  ))
    assert(fs.existsSync(path.join('public', url)), 'Missing asset ' + url);
  locale.setLanguage('en');
  assert.equal(locale.t('constructor'), 'constructor');
  assert.equal(locale.t('aTecnologiaz'), 'aTecnologiaz');
  assert.equal(locale.t('Antes do próximo passoX'), 'Antes do próximo passoX');
  locale.setLanguage('pt');
} finally {
  await site.close();
}

const html = fs.readFileSync('dist/index.html', 'utf8');
assert(html.includes(productionCsp.replace(/'/g, '&#39;')) || html.includes(productionCsp));
assert(
  !/fonts\.googleapis|fonts\.gstatic|sourceMappingURL|<script\b[^>]*>[\s\S]+?<\/script>/u.test(
    html,
  ),
);
assert(!files('dist').some((file) => file.endsWith('.map')));
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert.deepEqual(
  Object.fromEntries(vercel.headers[0].headers.map(({ key, value }) => [key, value])),
  productionHeaders,
);
const headers = fs.readFileSync('dist/_headers', 'utf8');
for (const [key, value] of Object.entries(productionHeaders))
  assert(headers.includes(`${key}: ${value}`));
const server = await preview({ preview: { host: '127.0.0.1', port: 4174, strictPort: true } });
try {
  const response = await fetch('http://127.0.0.1:4174/');
  assert.equal(response.status, 200);
  for (const [key, value] of Object.entries(productionHeaders))
    assert.equal(response.headers.get(key), value);
  const fontCss = await fetch('http://127.0.0.1:4174/fonts.css');
  assert.equal(fontCss.status, 200);
  for (const file of files('public/fonts')) {
    const response = await fetch(
      'http://127.0.0.1:4174/' + file.replace(/^public[\\/]/, '').replaceAll('\\', '/'),
    );
    assert.equal(response.status, 200);
  }
} finally {
  await new Promise((resolve) => server.httpServer.close(resolve));
}
console.log(
  `PASS: inputs, XSS escaping, URLs, links, anchors, ${pngCount} PNG assets, SVG, fonts, CSP and HTTP production headers. No browser execution was performed.`,
);
