import fs from 'node:fs/promises';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
});
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const markup = renderToString(React.createElement(App));
  const file = new URL('../dist/index.html', import.meta.url);
  let html = await fs.readFile(file, 'utf8');
  // Demonstrations retain their own client-rendered entry instead of briefly showing the homepage.
  await fs.writeFile(new URL('../dist/demo.html', import.meta.url), html);
  // Inline the small shared styles so the first paint needs no stylesheet round trip.
  const stylesheet = html.match(
    /<link\b[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/,
  );
  if (!stylesheet) throw new Error('Production HTML is missing its bundled stylesheet.');
  const css = await fs.readFile(new URL('../dist' + stylesheet[1], import.meta.url), 'utf8');
  const fonts = (
    await fs.readFile(new URL('../public/fonts.css', import.meta.url), 'utf8')
  ).replaceAll('url(fonts/', 'url(/fonts/');
  html = html
    .replace(stylesheet[0], `<style>${css}</style>`)
    .replace(
      /<link\b[^>]*rel="stylesheet"[^>]*href="\/fonts\.css"[^>]*>/,
      `<style>${fonts}</style>`,
    );
  const root = '<div id="root"></div>';
  if (!html.includes(root)) throw new Error('Production HTML is missing the root placeholder.');
  await fs.writeFile(
    file,
    html.replace(root, `<div id="root" data-prerendered="true">${markup}</div>`),
  );
  console.log('Prerendered homepage: visible content is available before JavaScript.');
} finally {
  await server.close();
}
