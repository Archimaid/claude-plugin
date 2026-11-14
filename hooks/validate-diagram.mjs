#!/usr/bin/env node
// PostToolUse hook: validates an edited file that contains an archimate-beta diagram.
// Exit 2 feeds validation errors back to Claude; exit 0 lets the edit pass silently.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';

const DIAGRAM_EXTENSIONS = new Set(['.mmd', '.mermaid', '.md', '.markdown']);
const VALIDATION_FAILED = 1;

function readHookInput() {
  return JSON.parse(readFileSync(0, 'utf8'));
}

function findLocalCli(startDir) {
  for (let dir = startDir; ; dir = dirname(dir)) {
    const cli = join(dir, 'node_modules', 'archimaid', 'dist', 'cli.js');
    if (existsSync(cli)) return cli;
    if (dirname(dir) === dir) return undefined;
  }
}

function runValidator(filePath) {
  const localCli = findLocalCli(dirname(filePath));
  if (localCli) {
    return spawnSync(process.execPath, [localCli, 'validate', filePath], { encoding: 'utf8' });
  }
  return spawnSync('npx', ['--yes', 'archimaid@0', 'validate', filePath], {
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });
}

const input = readHookInput();
const rawPath = input.tool_input?.file_path;
if (typeof rawPath !== 'string') process.exit(0);

const filePath = resolve(input.cwd ?? process.cwd(), rawPath);
if (!DIAGRAM_EXTENSIONS.has(extname(filePath).toLowerCase()) || !existsSync(filePath)) process.exit(0);
if (!readFileSync(filePath, 'utf8').includes('archimate-beta')) process.exit(0);

const result = runValidator(filePath);
if (result.error) {
  process.stderr.write(`archimaid hook: could not run the validator: ${result.error.message}\n`);
  process.exit(1);
}
if (result.status === VALIDATION_FAILED) {
  process.stderr.write(`archimaid validate found errors in ${rawPath}. Fix them:\n${result.stdout}${result.stderr}`);
  process.exit(2);
}
if (result.status !== 0) {
  process.stderr.write(`archimaid hook: validator exited with status ${result.status}\n${result.stderr}`);
  process.exit(1);
}
