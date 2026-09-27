# Amplium

Landing page institucional com React e Vite, em português e inglês. Inclui navegação responsiva, animações por rolagem, faixas contínuas, soluções guiadas pela rolagem, FAQ e questionário para preparar uma conversa no WhatsApp.

## Desenvolvimento

Use `npm ci` e `npm run dev`. A prévia local fica em `http://127.0.0.1:4173`. Desenvolvimento e prévia de produção usam a mesma porta; execute somente um servidor por vez.

- `npm run check`: sintaxe e build de produção.
- `npm run check:languages`: conteúdo, metadados e links em português e inglês.
- `npm run check:security`: políticas, inputs, links, assets e bundle.
- `npm run format`: formatação do código próprio.
- `npm run format:check`: verifica a formatação.
- `npm run build`: gera `dist/`.
- `npm run preview`: serve o build localmente.

## Estrutura

`src/components/` contém as seções. `src/interactions.js` controla movimentos, navegação e observadores; `src/i18n.js` controla o idioma; `src/contact-utils.js` normaliza texto e gera links de contato. `public/` contém assets, fontes e suas licenças. Os arquivos CSS são importados por `src/main.jsx` em ordem definida.

O questionário mantém os dados apenas em memória. Não há backend, analytics ou envio automático. Nome e contato são usados para preparar uma mensagem que o visitante revisa antes de abrir o WhatsApp. Apenas a preferência de idioma é salva em localStorage.

## Publicação e segurança

Publique somente `dist/`, nunca a pasta de desenvolvimento ou `node_modules/`. O build inclui CSP em meta e um arquivo `_headers` para plataformas compatíveis. `vercel.json` configura os cabeçalhos HTTP na Vercel; em outra hospedagem, aplique os valores de `security.config.js` no servidor/CDN. A política de desenvolvimento permite o script de atualização do Vite e WebSocket local; a de produção não permite scripts inline nem conexões de API.

Copie `.env.example` para `.env.local` e preencha `VITE_SITE_URL` com a URL HTTPS definitiva da Amplium para gerar canonical, og:url e imagens sociais absolutas. Sem essa configuração, os campos que dependem de domínio são omitidos. Variáveis `VITE_*` são públicas: nunca use credenciais nelas.

A CSP mantém estilos inline por causa das variáveis de animação e estilos dinâmicos do React. Não habilite scripts inline em produção. HTTPS e HSTS dependem do servidor de publicação; habilite HSTS somente depois de confirmar HTTPS em todo o domínio e nos subdomínios envolvidos.

Não remova os avisos de licença das fontes, das dependências ou de outros assets que os exijam. Os nomes das tecnologias no carrossel representam os produtos exibidos.

## Git automático

O repositório remoto é o origin configurado no Git. Enquanto `npm run dev` estiver aberto na branch `main`, as alterações são agrupadas após 60 segundos sem edições, validadas com `npm run check`, commitadas e enviadas ao GitHub. O processo preserva o histórico, não usa force push e recusa arquivos já preparados manualmente ou possíveis credenciais. Se o envio falhar, o commit local permanece disponível; os erros aparecem no terminal. Fora do servidor de desenvolvimento, siga o fluxo de commits definido em AGENTS.md. Para desativar o monitor em uma sessão, defina `AMPLIUM_AUTO_COMMIT=0`.
