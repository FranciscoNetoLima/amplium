import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const storage = new Map();
globalThis.localStorage = {
  getItem: (key) => storage.get(key),
  setItem: (key, value) => storage.set(key, value),
};
globalThis.document = { documentElement: {}, querySelector: () => null, title: '' };
globalThis.window = { dispatchEvent: () => {} };
globalThis.requestAnimationFrame = (fn) => {
  fn();
  return 1;
};
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const locale = await server.ssrLoadModule('/src/i18n.js');
  const pt = renderToStaticMarkup(React.createElement(App));
  assert(pt.includes('Atendimento nacional e internacional'));
  assert(
    pt.includes(
      'Transformamos sua presença digital em oportunidades de negócio. Criamos sites, campanhas e automações que ajudam você a atrair os clientes certos, vender mais e simplificar a gestão da sua empresa.',
    ),
  );
  const footer = pt.slice(pt.indexOf('<footer'), pt.indexOf('</footer>'));
  assert(!footer.includes('href="#captacao"'));
  locale.setLanguage('en');
  const en = renderToStaticMarkup(React.createElement(App));
  assert(en.includes('Solutions to move your business forward.'));
  assert(en.includes('We turn your digital presence into business opportunities.'));
  assert(en.includes('Serving Brazil and international clients'));
  assert(en.includes('I already have Instagram. Why invest in a website?'));
  assert(en.includes('What would you like to improve?'));
  assert(!en.includes('Soluções para seu negócio avançar.'));
  assert(!en.includes('Captação de oportunidades'));
  assert(en.includes('Step 1 of 3'));
  assert.equal(document.documentElement.lang, 'en');
  assert.equal(storage.get('amplium-language'), 'en');
  const url = locale.localizedWhatsApp(
    'https://wa.me/5588992431477?text=' +
      encodeURIComponent(
        'Olá! Tenho interesse na solução de captação de oportunidades da Amplium.',
      ),
  );
  assert(new URL(url).searchParams.get('text').startsWith('Hi!'));
  const combined =
    'Seu cliente chega, mas não entende seu diferencial? Organizamos a apresentação da empresa, os argumentos e as respostas às dúvidas em um site com um caminho direto para o atendimento.';
  const translated = locale.t(combined);
  assert(translated.startsWith('Do visitors'));
  locale.setLanguage('pt');
  assert.equal(locale.t(translated), combined);
  const again = renderToStaticMarkup(React.createElement(App));
  assert(again.includes('Soluções para seu negócio avançar.'));
  assert.equal(document.documentElement.lang, 'pt-BR');
  const dictionary = JSON.parse(fs.readFileSync('src/translations.json', 'utf8'));
  locale.setLanguage('en');
  for (const [ptText, enText] of Object.entries(dictionary)) assert.equal(locale.t(ptText), enText);
  console.log(
    'PASS: PT/EN rendering, ' +
      Object.keys(dictionary).length +
      ' translations, metadata, persistence, footer, questionnaire, WhatsApp and modal round trip.',
  );
} finally {
  await server.close();
}
