#!/usr/bin/env node
/**
 * Release-train guard.
 *
 * Every package published from this repo versions as `YY.M.PATCH`, where `YY.M`
 * names the release train. `main` carries the upcoming train; a release branch
 * `vYY.MM` keeps publishing its own train forever. Because the trains differ, the
 * per-branch patch counters can never collide — but only as long as nobody
 * publishes a package whose version belongs to a different train than the branch
 * it is dispatched from. That is what this script refuses to let happen.
 *
 * Usage: node scripts/check-release-train.mjs [package-dir]
 *   package-dir defaults to the repo root (the @webitel/ui-sdk package itself).
 *
 * The expected train comes from the branch name (`v26.06` -> `26.6`), falling back
 * to the root package.json for `main` and for detached/unknown refs.
 */

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Packages excluded from lockstep: versioned as semver for external consumers. */
const SEMVER_EXCEPTIONS = new Set([
	'@webitel/chat-web-sdk',
]);

const readPackage = (dir) =>
	JSON.parse(readFileSync(resolve(dir, 'package.json'), 'utf8'));

/** `26.8.71` -> `26.8`. Returns null for anything that is not a plain x.y.z. */
const trainOf = (version) => {
	const match = /^(\d+)\.(\d+)\.\d+/.exec(version ?? '');
	return match ? `${match[1]}.${match[2]}` : null;
};

const currentBranch = () => {
	// GitHub Actions checks out a detached HEAD, so `git branch` is useless there.
	if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME;
	try {
		return execSync('git rev-parse --abbrev-ref HEAD', {
			cwd: REPO_ROOT,
			encoding: 'utf8',
		}).trim();
	} catch {
		return '';
	}
};

/**
 * Release branches are named after the product release (`v26.06`), while npm
 * normalises the version away from the zero padding (`26.6.x`). Map one to the
 * other rather than fighting npm over the leading zero.
 */
const trainFromBranch = (branch) => {
	const match = /^v(\d{2})\.(\d{1,2})$/.exec(branch);
	return match ? `${match[1]}.${Number(match[2])}` : null;
};

const packageDir = resolve(process.cwd(), process.argv[2] ?? REPO_ROOT);
const pkg = readPackage(packageDir);
const branch = currentBranch();
const expected =
	trainFromBranch(branch) ?? trainOf(readPackage(REPO_ROOT).version);

if (!expected) {
	console.error(
		`check-release-train: cannot determine the expected train (branch "${branch}", root version "${readPackage(REPO_ROOT).version}")`,
	);
	process.exit(1);
}

const errors = [];

const actual = trainOf(pkg.version);
if (actual !== expected) {
	errors.push(
		`${pkg.name} is at ${pkg.version} (train ${actual ?? '?'}), but branch "${branch}" publishes train ${expected}.x`,
	);
}

// A package pinned to a peer from another train ships a lie in its metadata, and
// npm will happily resolve the consumer onto that other train.
for (const field of [
	'dependencies',
	'peerDependencies',
	'devDependencies',
]) {
	for (const [name, range] of Object.entries(pkg[field] ?? {})) {
		if (!name.startsWith('@webitel/') || SEMVER_EXCEPTIONS.has(name)) continue;
		if (range === `~${expected}`) continue;
		errors.push(
			`${pkg.name} ${field}.${name} is "${range}", expected "~${expected}"`,
		);
	}
}

if (errors.length) {
	console.error(`check-release-train: expected train ${expected}\n`);
	for (const error of errors) console.error(`  ✗ ${error}`);
	console.error(
		'\nFix the versions/ranges, or dispatch the publish workflow from the branch that owns this train.',
	);
	process.exit(1);
}

console.log(
	`check-release-train: ${pkg.name}@${pkg.version} matches train ${expected} (branch "${branch}")`,
);
