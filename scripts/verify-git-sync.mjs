import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { syncProject } from './git-sync.mjs';
const execute = promisify(execFile);
const temporaryRoot = path.resolve(os.tmpdir());
const fixture = await fs.mkdtemp(path.join(temporaryRoot, 'amplium-git-check-'));
const git = async (...args) =>
  (await execute('git', args, { cwd: fixture, windowsHide: true })).stdout.trim();
try {
  await git('init', '-b', 'main');
  await git('config', 'user.name', 'Local verification');
  await git('config', 'user.email', 'verification@example.invalid');
  await git('remote', 'add', 'origin', 'https://github.com/FranciscoNetoLima/amplium.git');
  await fs.writeFile(
    path.join(fixture, 'package.json'),
    JSON.stringify({ scripts: { check: 'node --check source.js' } }),
  );
  await fs.writeFile(path.join(fixture, 'source.js'), 'const value = 1;\n');
  await git('add', '--all');
  await git('commit', '-m', 'Initial fixture');
  await fs.writeFile(path.join(fixture, 'source.js'), 'const value = 2;\n');
  await syncProject(fixture, { push: false, message: 'Verify automatic commit' });
  assert.equal(await git('log', '-1', '--format=%s'), 'Verify automatic commit');
  assert.equal(await git('status', '--porcelain'), '');
  await fs.writeFile(path.join(fixture, 'source.js'), 'const value = ;\n');
  await assert.rejects(syncProject(fixture, { push: false }), /npm/);
  assert.equal(await git('diff', '--cached', '--name-only'), '');
  await fs.writeFile(
    path.join(fixture, 'source.js'),
    `const example = '${'sk-proj-' + 'A'.repeat(30)}';\n`,
  );
  await assert.rejects(syncProject(fixture, { push: false }), /credencial/);
  assert.equal(await git('diff', '--cached', '--name-only'), '');
  assert((await git('status', '--porcelain')).includes('source.js'));
  await fs.writeFile(path.join(fixture, 'source.js'), 'const value = 3;\n');
  await git('add', 'source.js');
  await assert.rejects(syncProject(fixture, { push: false }), /manualmente/);
  assert.equal(await git('diff', '--cached', '--name-only'), 'source.js');
  console.log(
    'PASS: automatic commit, failed build, secret rejection and preservation of manually staged changes. No fixture was pushed.',
  );
} finally {
  const absoluteFixture = await fs.realpath(fixture);
  assert.equal(path.dirname(absoluteFixture).toLowerCase(), temporaryRoot.toLowerCase());
  assert(path.basename(absoluteFixture).startsWith('amplium-git-check-'));
  await fs.rm(absoluteFixture, { recursive: true, force: true });
}
