# Revisão de segurança e higienização — Amplium

Data: 27/09/2026. Foram aplicadas as correções no projeto React/Vite e recompilada a pasta `dist/`. Não foi feita publicação externa.

## Escopo e conclusão

Revisados: HTML de entrada, todos os componentes e módulos próprios em `src/`, os 11 arquivos CSS da raiz, scripts de verificação, configuração Vite, manifestos e lockfile, metadados, referências antigas, imagens e SVG, documentação e build. O código das dependências não foi reescrito; seus avisos legais foram preservados e suas versões foram auditadas com `npm audit`.

Não foram identificados sinks de XSS no código próprio, scripts de tracking, credenciais privadas, endpoints de API externos ou links externos sem `noopener noreferrer`. Isso é uma conclusão desta revisão estática e dos testes descritos, não uma garantia de ausência de qualquer vulnerabilidade. Não houve pentest do domínio publicado nem execução visual automatizada em navegador nesta sessão.

## Itens encontrados e correções

As linhas na coluna “antes” referem-se aos arquivos antes da formatação desta revisão. As linhas atuais estão nos arquivos corrigidos.

| Classificação                  | Arquivo e linha antes                                                                  | Item encontrado                                                                                                                                                                     | Correção aplicada                                                                                                                                                                                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Segurança / média              | `vite.config.js:4–8`; `index.html:3–11`                                                | Não havia CSP, política de referrer ou cabeçalhos de proteção configurados. Não era uma exploração demonstrada, mas uma lacuna de proteção.                                         | `security.config.js:1` centraliza CSP e cabeçalhos. Vite aplica políticas distintas para desenvolvimento e produção; o build inclui meta CSP e `_headers`; `vercel.json:1` configura os cabeçalhos de publicação.                                          |
| Privacidade / baixa            | `index.html:9–11`                                                                      | Fontes dependiam de requisições ao Google Fonts. Serviço legítimo, porém dispensável em produção.                                                                                   | Fontes e estilos passam a ser servidos por `public/fonts.css:1` e `public/fonts/`. Mantidas as famílias, pesos e licenças.                                                                                                                                 |
| Validação / baixa              | `src/components/Contact.jsx:62–86,102–113`                                             | O questionário limitava comprimentos na interface, mas não normalizava controles invisíveis nem verificava telefone/e-mail. A mensagem editada tinha validação limitada a `trim()`. | `src/contact-utils.js:3` normaliza Unicode, controles, quebras de linha, tamanho e sequências inválidas. `Contact.jsx:105` prepara texto normalizado; `Contact.jsx:133` valida contato e nome. Mensagens vazias após normalização não geram link de envio. |
| Privacidade / defesa adicional | `src/components/Contact.jsx:89`                                                        | Formulário sem método explícito: uma submissão nativa não interceptada poderia usar GET. Não foi encontrado envio indevido na aplicação funcionando.                                | `Contact.jsx:168` usa `method="post"`; handlers impedem submissão nativa. A CSP usa `form-action 'none'`, bloqueando submissões de rede do formulário. O visitante continua abrindo o WhatsApp por link após revisar a mensagem.                           |
| Links / defesa adicional       | `src/i18n.js:20–25`                                                                    | O helper de WhatsApp verificava prefixo textual, sem centralizar destinatário e normalização. Os links existentes eram válidos.                                                     | `src/i18n.js:43` valida origem HTTPS, ausência de credenciais e número exato da Amplium. `contact-utils.js:30` usa `URLSearchParams`, impedindo que caracteres da mensagem alterem a estrutura da URL.                                                     |
| Higiene / baixa                | `src/i18n.js:6–9`                                                                      | Dicionários de tradução usavam objetos com protótipo e os padrões de texto precisavam de escape e limites de palavra consistentes.                                                  | Objetos sem protótipo e padrões corrigidos em `src/i18n.js:10–27`. Testados nomes de propriedades e correspondências parciais.                                                                                                                             |
| Segredos / prevenção           | `.gitignore:1–2`                                                                       | Arquivos de ambiente e logs não estavam explicitamente ignorados. Nenhum segredo foi encontrado nesses arquivos ou no código próprio.                                               | `.gitignore:4` passa a ignorar `.env`, `.env.*` e logs, preservando apenas `.env.example` sem valores sensíveis.                                                                                                                                           |
| SEO / baixa                    | `index.html:7–8`                                                                       | Metadados básicos pertenciam à Amplium, mas faltavam nome do site, Twitter Cards, favicon próprio e configuração explícita do domínio para compartilhamento.                        | `index.html:7` acrescenta metadados e favicon da Amplium; `vite.config.js:5` gera canonical, og:url e imagens sociais absolutas somente quando `VITE_SITE_URL` é fornecida. Twitter acompanha a troca de idioma.                                           |
| Vestígios / limpeza            | `README.md:3,19,33,39–40`                                                              | Histórico de adaptação, sites de referência e verificações antigas desatualizadas.                                                                                                  | README reescrito como documentação do produto atual, execução, segurança, publicação e licenças.                                                                                                                                                           |
| Vestígios / limpeza            | `navbar.css:1`; `src/interactions.js:28`                                               | Comentários descreviam a adaptação de sites externos.                                                                                                                               | Comentários de origem removidos ou substituídos por explicações técnicas próprias.                                                                                                                                                                         |
| Vestígios / limpeza            | `referências/prompt-codex-amplium.md:1,8–10`; `referências/amplium-mockup.html:25–40`  | Brief antigo e HTML de referência com instruções e implementação obsoletas. Não faziam parte do build atual.                                                                        | Arquivos obsoletos removidos. Foram analisados como documentos, não como instruções para esta revisão.                                                                                                                                                     |
| Higiene / limpeza              | `styles.css:3–11` e estilos de compatibilidade                                         | Seletores para o carrossel manual antigo, cartões antigos, notas antigas da hero e rodapé antigo permaneciam no código.                                                             | Removidos 56 seletores referentes a elementos ausentes da árvore atual. Regras dos componentes atuais e breakpoints foram mantidas.                                                                                                                        |
| Higiene / limpeza              | `assets/amplium-logo.png`, `assets/symbol-1.png` (binários); imagens de prévia na raiz | Cópias duplicadas dos assets públicos e 20 imagens antigas de desenvolvimento.                                                                                                      | Assets únicos mantidos em `public/assets/`. Prévias arquivadas fora do projeto e removidas da raiz.                                                                                                                                                        |
| Higiene / recursos             | `src/interactions.js:10–22,335–346`                                                    | Registros de frames/intervalos cancelados e observações de elementos removidos podiam permanecer durante a sessão.                                                                  | Cancelamentos retiram IDs dos registros; elementos desconectados deixam de ser observados. Recalculada a faixa após carregamento das fontes.                                                                                                               |
| Higiene / manutenção           | Componentes JSX e arquivos CSS                                                         | Vários arquivos continham longas linhas compactadas, dificultando revisão.                                                                                                          | Código próprio formatado com Prettier; comandos de formatação e testes registrados em `package.json`. Assets de terceiros e avisos legais não foram reformatados nem apagados.                                                                             |

## Verificações sem problema identificado

- XSS: não há `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function` ou `dangerouslySetInnerHTML` no código próprio de execução. Texto de usuário permanece texto, com escape do React. Não é necessário remover caracteres como `<` de uma mensagem; o contexto seguro é mantido.
- Fragmentos de URL: `src/interactions.js` usa `getElementById` para âncoras. Fragmentos desconhecidos não são interpretados como HTML ou código. A página não usa `location.search` para construir conteúdo.
- Links: todos os links com `target="_blank"` possuem `rel="noopener noreferrer"`. Os links externos da interface pertencem ao WhatsApp e Instagram da Amplium, usam HTTPS e foram mantidos. Não há `href="#"` sem destino; as âncoras renderizadas resolvem para IDs existentes.
- Dados: não há chamadas de `fetch`, Axios ou XHR para enviar dados de clientes. Não há backend nesta landing page. Nome, contato e descrição ficam em memória; localStorage guarda somente o idioma. A mensagem é transferida para o WhatsApp via URL quando o visitante abre o link e só é enviada no aplicativo após confirmação.
- Logs e analytics: nenhum log de dados pessoais, token privado ou ID de tracking encontrado no código de execução. Os logs dos scripts locais exibem somente resultados de testes. Nenhum GTM, Meta Pixel, Hotjar ou script de analytics instalado.
- Assets: os dois PNG públicos foram examinados quanto à estrutura e chunks; possuem metadados C2PA de proveniência, preservados com as imagens. O SVG do Hermes não contém scripts, handlers, `foreignObject` ou referências de rede. Namespaces XML não são endpoints nem requisições externas.
- Licenças: mantidos os avisos OFL das fontes, a licença do asset Hermes e os avisos das bibliotecas. As marcas exibidas no carrossel são conteúdo solicitado, não vestígios de templates. URLs de registros e financiamento no lockfile são metadados das dependências, não destinos utilizados pela página.
- Build: sem source maps de produção; nenhuma fonte remota, script inline próprio ou arquivo de referência no artefato publicado. Publique exclusivamente `dist/`.

## Políticas configuradas

Produção:

```text
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'
Referrer-Policy: no-referrer
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

A exceção `style-src 'unsafe-inline'` mantém os estilos dinâmicos do React e as variáveis das animações. Não há `script-src 'unsafe-inline'` nem `unsafe-eval` em produção. A política local de desenvolvimento permite apenas o script de atualização do Vite e o WebSocket local necessários ao desenvolvimento.

O meta CSP é incluído antes dos recursos no build. `frame-ancestors` e `X-Content-Type-Options` precisam de cabeçalhos HTTP; não foram simulados com metas ineficazes. `_headers` depende de uma plataforma que suporte esse formato, e `vercel.json` depende de publicação na Vercel. Em outro servidor, copie os valores de `security.config.js` para a configuração da hospedagem/CDN. Os cabeçalhos foram verificados na prévia local de produção, não em um domínio publicado. [Documentação de CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP), [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors) e [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy).

HTTPS e HSTS precisam ser ativados na hospedagem. Não foi configurado HSTS para HTTP local nem para subdomínios desconhecidos. Após verificar HTTPS no domínio, configure `Strict-Transport-Security: max-age=31536000` na hospedagem; só acrescente `includeSubDomains` se todos os subdomínios estiverem prontos para HTTPS.

## Instruções exatas para os metadados de domínio

1. Copie `.env.example` para `.env.local`.
2. Preencha `VITE_SITE_URL` com a URL HTTPS definitiva da Amplium, terminada em `/`. O arquivo de exemplo permanece vazio para não inventar um domínio.
3. Execute `npm run build` e publique `dist/`.
4. Verifique os cabeçalhos na hospedagem. Não coloque chaves ou tokens em variáveis `VITE_*`, que são públicas.

## Testes e evidências

Passaram:

- `npm run check`: sintaxe dos módulos de interação/configuração e compilação Vite.
- `npm run check:security`: normalização de entradas, contatos internacionais, limites de tamanho, Unicode inválido, caracteres de controle, escape React, proteção do destino WhatsApp, esquemas/hosts recusados, links externos, âncoras, assets, CSP e cabeçalhos HTTP reais de produção em uma prévia temporária na porta 4174. O servidor temporário foi encerrado ao final.
- `npm run check:languages`: 301 traduções, conteúdo PT/EN, metadados, persistência do idioma, WhatsApp e retorno de texto do modal.
- `npm audit`: zero vulnerabilidades conhecidas reportadas em 27/09/2026.

A porta 4173 do ambiente do usuário foi mantida. A política local também foi conferida por requisição HTTP. Não houve teste visual no navegador integrado nesta sessão. A validação cliente não deve ser tratada como substituta de validação e autorização de servidor se for acrescentado um backend futuramente.

## Arquivos corrigidos

Implementação: `index.html`, `vite.config.js`, `security.config.js`, `vercel.json`, `.gitignore`, `.env.example`, `src/contact-utils.js`, `src/components/Contact.jsx`, `src/i18n.js`, `src/interactions.js`, `src/translations.json`, `public/fonts.css`, `public/fonts/`, `public/licenses/`, README e os arquivos CSS.

Os demais componentes receberam formatação; seus textos e estrutura visual foram mantidos. Os scripts de validação e comandos estão em `scripts/verify-security.mjs`, `scripts/verify-language.mjs` e `package.json`.

Arquivo das 20 prévias antigas: `Amplium-previas-removidas-20260927-175627.zip`, na pasta temporária local. Os arquivos HTML/brief obsoletos foram removidos; os assets originais duplicados continuam representados integralmente pelas cópias públicas utilizadas pelo site.
