#!/usr/bin/env node
/**
 * Move every package in this repo onto a new release train, in lockstep.
 *
 * Used by the next-release-cycle workflow after it cuts the release branch: the
 * branch keeps the old train's numbers, `main` moves to the upcoming one. Every
 * package shares the `YY.M` prefix; only the patch counters drift apart, since
 * each package publishes on its own dispatch.
 *
 * Usage: node scripts/bump-release-train.mjs 26.10
 *   Accepts the zero-padded product form too (`26.08`); npm normalises it away,
 *   so the branch is `v26.08` while the version is `26.8.0`.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Packages excluded from lockstep: versioned as semver for external consumers. */
const SEMVER_EXCEPTIONS = [
	'@webitel/chat-web-sdk',
];

const MANIFESTS = [
	'package.json',
	'packages/api-services/package.json',
	'packages/styleguide/package.json',
	'packages/ui-chats/package.json',
	'packages/ui-datalist/package.json',
];

const input = process.argv[2];
const parsed = /^v?(\d{2})\.(\d{1,2})$/.exec(input ?? '');

if (!parsed) {
	console.error(
		`bump-release-train: expected a train like "26.10" or "26.08", got "${input ?? ''}"`,
	);
	process.exit(1);
}

const train = `${parsed[1]}.${Number(parsed[2])}`;
const lockstepped = MANIFESTS.map(
	(path) => JSON.parse(readFileSync(resolve(REPO_ROOT, path), 'utf8')).name,
).filter((name) => !SEMVER_EXCEPTIONS.includes(name));

// Edit the text rather than round-tripping through JSON.stringify: these manifests
// are tab-indented and npm rewrites them on every `npm version`, so a formatting
// churn here would show up as noise in every release commit.
const setValue = (source, key, value) =>
	source.replace(
		new RegExp(`("${key.replace('/', '\\/')}":\\s*")[^"]+(")`),
		`$1${value}$2`,
	);

for (const path of MANIFESTS) {
	const absolute = resolve(REPO_ROOT, path);
	const before = readFileSync(absolute, 'utf8');

	let after = setValue(before, 'version', `${train}.0`);
	for (const name of lockstepped) {
		// The `"name": "@webitel/…"` line is safe: its key is `name`, not the package.
		after = after.replace(
			new RegExp(`("${name.replace('/', '\\/')}":\\s*")[^"]+(")`, 'g'),
			`$1~${train}$2`,
		);
	}

	if (after === before) {
		console.log(`  = ${relative(REPO_ROOT, absolute)} (already on ${train})`);
		continue;
	}

	writeFileSync(absolute, after);
	console.log(`  → ${relative(REPO_ROOT, absolute)} bumped to ${train}.0`);
}

console.log(`bump-release-train: all packages on train ${train}`);
