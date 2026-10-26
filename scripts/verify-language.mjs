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
  assert(
    pt.includes(
      'Sites, sistemas e automações sob medida para atrair clientes, apoiar suas vendas e simplificar sua operação.',
    ),
  );
  const footer = pt.slice(pt.indexOf('<footer'), pt.indexOf('</footer>'));
  assert(!footer.includes('href="#captacao"'));
  assert(!footer.includes('href="#servicos"'));
  assert(!footer.includes('href="#inicio"'));
  assert(footer.includes('href="https://www.instagram.com/amplium.pro/"'));
  assert(footer.includes('href="https://wa.me/5588992431477"'));
  assert(footer.includes('>WhatsApp</b>'));
  assert(footer.includes('>Instagram</b>'));
  assert(!footer.includes('footer-social-icon'));
  const services = pt.slice(pt.indexOf('id="services"'), pt.indexOf('id="portfolio"'));
  const portfolio = pt.slice(pt.indexOf('id="portfolio"'), pt.indexOf('id="contact"'));
  const contact = pt.slice(
    pt.indexOf('id="contact"'),
    pt.indexOf('</section>', pt.indexOf('id="contact"')),
  );
  assert(
    !services.includes(
      'aria-labelledby="services-heading"><div><div class="eyebrow">01 / Soluções</div><h2 id="services-heading">Soluções para seu negócio avançar.</h2><p>',
    ),
  );
  assert(
    !portfolio.includes(
      'aria-labelledby="portfolio-heading"><div><div class="eyebrow">02 / Portfólio</div><h2 id="portfolio-heading">Ideias colocadas em prática.</h2><p>',
    ),
  );
  assert(
    !contact.includes('Conte o que você precisa. Vamos encontrar uma solução para o seu negócio.'),
  );
  assert(pt.includes('Conte sua ideia. Vamos encontrar o melhor caminho juntos.'));
  assert(!pt.includes('O WhatsApp será aberto com sua mensagem pronta para enviar.'));
  assert(!pt.includes('<small>Opcional</small>'));
  assert(footer.includes('Todos os direitos reservados. Tecnologia, Amplified.'));
  locale.setLanguage('en');
  const en = renderToStaticMarkup(React.createElement(App));
  assert(en.includes('Solutions to move your business forward.'));
  assert(en.includes('Custom websites, systems, and automations to attract customers'));
  assert(!en.includes('id="faq"'));
  assert(en.includes('About your project'));
  assert(en.includes('All rights reserved. Technology, Amplified.'));
  assert(!en.includes('Soluções para seu negócio avançar.'));
  assert(!en.includes('Captação de oportunidades'));
  assert(!en.includes('compact-process'));
  assert(!en.includes('solutions-scroll'));
  assert(!en.includes('brief-wizard'));
  assert(!en.includes('tech-strip'));
  assert(!en.includes('class="band"'));
  assert(!en.includes('brief-direct'));
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
      ' translations, metadata, persistence, footer, contact form, WhatsApp and translation round trip.',
  );
} finally {
  await server.close();
}
