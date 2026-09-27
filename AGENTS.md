# Fluxo de Git da Amplium

O usuário autorizou conectar este projeto ao repositório `https://github.com/FranciscoNetoLima/amplium.git` e realizar commits automáticos das alterações.

- Depois de cada alteração solicitada, execute as verificações pertinentes e crie um commit descritivo das mudanças realizadas.
- Envie os commits para `origin/main`, sem force push e sem reescrever histórico remoto.
- Nunca inclua arquivos de ambiente com valores, credenciais, logs, node_modules ou dist.
- Preserve alterações de terceiros. Se houver arquivos já preparados manualmente no index, não os incorpore silenciosamente em um commit automático.
- O servidor Vite tem sincronização automática após 60 segundos sem edições. Antes de terminar uma tarefa, verifique o status para evitar commits duplicados e confirme se o envio terminou.
- Se o build, a detecção de credenciais ou o push falhar, informe o motivo. Não declare uma sincronização bem-sucedida sem conferir o remoto.
