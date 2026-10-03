import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { autoCommitPlugin } from './scripts/git-sync.mjs';
import { productionCsp, productionHeaders, developmentHeaders } from './security.config.js';

function siteMetadata(value) {
  if (!value) return [];
  const url = new URL(value);
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    ['localhost', '127.0.0.1'].includes(url.hostname)
  ) {
    throw new Error(
      'VITE_SITE_URL deve ser uma URL pública HTTPS sem credenciais, parâmetros ou fragmentos.',
    );
  }
  const canonical = url.href;
  return [
    { tag: 'link', attrs: { rel: 'canonical', href: canonical }, injectTo: 'head' },
    { tag: 'meta', attrs: { property: 'og:url', content: canonical }, injectTo: 'head' },
    {
      tag: 'meta',
      attrs: { property: 'og:image', content: new URL('assets/amplium-logo.png', canonical).href },
      injectTo: 'head',
    },
    {
      tag: 'meta',
      attrs: { name: 'twitter:image', content: new URL('assets/amplium-logo.png', canonical).href },
      injectTo: 'head',
    },
  ];
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_SITE_URL');
  return {
    plugins: [
      react(),
      autoCommitPlugin(),
      {
        name: 'site-security',
        configurePreviewServer(server) {
          server.middlewares.use((request, _response, next) => {
            if (request.url?.split('?')[0].startsWith('/demonstracoes/')) {
              request.url = '/demo.html';
            }
            next();
          });
        },
        transformIndexHtml() {
          return [
            ...siteMetadata(env.VITE_SITE_URL),
            ...(command === 'build'
              ? [
                  {
                    tag: 'meta',
                    attrs: { 'http-equiv': 'Content-Security-Policy', content: productionCsp },
                    injectTo: 'head-prepend',
                  },
                ]
              : []),
          ];
        },
        generateBundle() {
          const headers = Object.entries(productionHeaders)
            .map(([name, value]) => `  ${name}: ${value}`)
            .join('\n');
          this.emitFile({ type: 'asset', fileName: '_headers', source: `/*\n${headers}\n` });
        },
      },
    ],
    base: '/',
    build: { sourcemap: false },
    server: { host: '127.0.0.1', port: 4173, strictPort: true, headers: developmentHeaders },
    preview: { host: '127.0.0.1', port: 4173, strictPort: true, headers: productionHeaders },
  };
});
