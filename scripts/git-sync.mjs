import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const execute = promisify(execFile);

async function run(command, args, cwd) {
  try {
    const result = await execute(command, args, {
      cwd,
      windowsHide: true,
      shell: process.platform === 'win32' && command === 'npm.cmd',
      maxBuffer: 8 * 1024 * 1024,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' },
    });
    return result.stdout.trim();
  } catch {
    throw new Error(
      `Falha em ${command} ${args.slice(0, 2).join(' ')}. Nenhum histórico foi sobrescrito.`,
    );
  }
}

export async function syncProject(cwd, { message, push = true } = {}) {
  const git = (...args) => run('git', args, cwd);
  const branch = await git('branch', '--show-current');
  if (branch !== 'main')
    throw new Error('Sincronização automática disponível apenas na branch main.');
  const origin = await git('remote', 'get-url', 'origin');
  if (origin !== 'https://github.com/FranciscoNetoLima/amplium.git')
    throw new Error('O origin não corresponde ao repositório configurado.');
  await git('rev-parse', '--verify', 'HEAD');
  const dirty = await git('status', '--porcelain');
  if (dirty) {
    const staged = await git('diff', '--cached', '--name-only');
    if (staged)
      throw new Error(
        'Há arquivos preparados manualmente. Faça o commit manual antes da sincronização automática.',
      );
    await run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'check'], cwd);
    await git('add', '--all', '--', '.');
    try {
      const stagedFiles = await git('diff', '--cached', '--name-only', '-z', '--diff-filter=ACM');
      for (const file of stagedFiles.split('\0').filter(Boolean)) {
        if (/\.(?:png|woff2)$/i.test(file)) continue;
        const contents = await git('show', `:${file}`);
        if (
          /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|\b(?:sk-proj-|AKIA)[A-Za-z0-9_-]{12,}/u.test(
            contents,
          )
        ) {
          throw new Error(
            'Possível credencial detectada. Commit automático bloqueado; revise os arquivos alterados.',
          );
        }
      }
      const changes = await git('diff', '--cached', '--name-only');
      if (changes)
        await git(
          'commit',
          '-m',
          message || `chore: salvar alterações do site (${new Date().toISOString()})`,
        );
    } catch (error) {
      await git('restore', '--staged', '--', '.');
      throw error;
    }
  }
  if (push) {
    const ahead = await git('rev-list', '--count', 'origin/main..HEAD');
    if (Number(ahead) > 0) await git('push', 'origin', 'main');
  }
}

export function autoCommitPlugin() {
  return {
    name: 'amplium-git-sync',
    apply: 'serve',
    configureServer(server) {
      if (server.config.server.middlewareMode || process.env.AMPLIUM_AUTO_COMMIT === '0') return;
      let timer,
        retry,
        running = false,
        stopped = false,
        lastEdit = 0;
      const root = server.config.root;
      const ignored =
        /(?:^|[\\/])(?:\.git|node_modules|dist)(?:[\\/]|$)|(?:^|[\\/])\.env(?:\.|$)|\.log$/;
      const synchronize = async () => {
        if (running || stopped) return;
        running = true;
        try {
          await syncProject(root);
        } catch (error) {
          server.config.logger.warn(`[git automático] ${error.message}`);
        } finally {
          running = false;
        }
      };
      const schedule = (file) => {
        if (ignored.test(file)) return;
        lastEdit = Date.now();
        clearTimeout(timer);
        timer = setTimeout(() => {
          timer = undefined;
          synchronize();
        }, 60000);
      };
      const stop = () => {
        stopped = true;
        clearTimeout(timer);
        clearInterval(retry);
        server.watcher.off('add', schedule);
        server.watcher.off('change', schedule);
        server.watcher.off('unlink', schedule);
      };
      server.httpServer?.once('listening', () => {
        server.config.logger.info(
          '[git automático] Commit e envio para origin/main após 60 segundos sem edições.',
        );
        server.watcher.on('add', schedule);
        server.watcher.on('change', schedule);
        server.watcher.on('unlink', schedule);
        timer = setTimeout(() => {
          timer = undefined;
          synchronize();
        }, 60000);
        retry = setInterval(() => {
          if (!timer && !running && Date.now() - lastEdit >= 60000) synchronize();
        }, 60000);
      });
      server.httpServer?.once('close', stop);
    },
  };
}
