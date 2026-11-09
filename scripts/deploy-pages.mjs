#!/usr/bin/env node
/**
 * Publish the production build to the `gh-pages` branch.
 *
 * The repo publishes Pages from that branch, so this is the deploy path:
 *   npm run deploy
 *
 * Builds with the project-site base path, commits the dist output on an
 * orphan-free temp clone, and force-pushes. Safe to re-run.
 */
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const REPO = process.env.PAGES_REPO ?? 'origin';
const BRANCH = 'gh-pages';

function sh(cmd, args, cwd = process.cwd()) {
  return execFileSync(cmd, args, { cwd, stdio: 'inherit' });
}

/** Repo name drives the Pages base path; read it from the remote, not package.json. */
function repoNameFromRemote() {
  const url = execFileSync('git', ['remote', 'get-url', 'origin'], { encoding: 'utf8' }).trim();
  const match = url.match(/[/:]([^/]+?)(\.git)?$/);
  if (!match?.[1]) throw new Error(`Cannot derive repo name from remote: ${url}`);
  return match[1];
}

const repoName = repoNameFromRemote();

process.env.BASE_PATH = `/${repoName}/`;
console.log(`> building with base ${process.env.BASE_PATH}`);
sh('npm', ['run', 'build'], process.cwd());

const work = await mkdtemp(join(tmpdir(), 'edulingo-deploy-'));
try {
  sh('git', ['init', '-q', '-b', BRANCH], work);
  // Copy the whole build so prerendered route folders ship too.
  await cp('dist', work, { recursive: true });
  sh('git', ['add', '-A'], work);
  const stamp = new Date().toISOString();
  sh('git', ['-c', 'user.name=EduLingo Deploy', '-c', 'user.email=deploy@local',
             'commit', '-q', '-m', `deploy: ${stamp}`], work);
  const remoteUrl = REPO === 'origin'
    ? execFileSync('git', ['remote', 'get-url', 'origin'], { encoding: 'utf8' }).trim()
    : REPO;
  sh('git', ['remote', 'add', 'origin', remoteUrl], work);
  sh('git', ['push', '-f', 'origin', `${BRANCH}:${BRANCH}`], work);
  console.log(`\nPublished to branch ${BRANCH}. Site base path: /${repoName}/`);
} finally {
  await rm(work, { recursive: true, force: true });
}
