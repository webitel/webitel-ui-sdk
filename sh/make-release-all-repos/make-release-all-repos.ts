#!/usr/bin/env bun
// [Claude] Triggers "Make Release" workflow in all frontend repos at once and watches the runs.
// [Claude] Runs on bun (`bun sh/make-release-all-repos/make-release-all-repos.ts`) or node >= 23.6 (`node sh/make-release-all-repos/make-release-all-repos.ts`), no deps.
//
// [Claude] Usage:
//   GITHUB_TOKEN=... bun sh/make-release-all-repos/make-release-all-repos.ts --version 26.10 --next 26.12
//   bun sh/make-release-all-repos/make-release-all-repos.ts --version 26.10 --next 26.12 --repos client,crm --dry-run
//   bun sh/make-release-all-repos/make-release-all-repos.ts --version 26.10 --next 26.12 --repos webitel-ui-sdk --dry-run
//
// [Claude] Options:
//   --version <x.y>   release version (major.minor), required
//   --next <x.y>      next version for main (major.minor), required for new-style workflows
//   --repos <a,b>     only these repos (default: DEFAULT_REPOS)
//   --owner <name>    GitHub org/user that owns the repos (default: webitel), e.g. a personal test account
//   --ref <branch>    branch to run workflow from (default: repo default branch)
//   --dry-run         show what would be dispatched, dispatch nothing
//   --no-watch        dispatch and exit, do not wait for runs
//   --yes             skip confirmation prompt

import { execSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';

let OWNER = 'webitel';
const DEFAULT_WORKFLOW = 'make-release.yml';
// [Claude] Repos whose release workflow file is not the shared make-release.yml.
const WORKFLOWS: Record<string, string> = {
	'webitel-ui-sdk': 'ui-sdk.next-release-cycle.yml',
};
const workflowOf = (repo: string) => WORKFLOWS[repo] ?? DEFAULT_WORKFLOW;
const POLL_MS = 10_000;

const DEFAULT_REPOS = [
	'client',
	'crm',
	'cc-supervisor',
	'cc-workspaces',
	'cc-history',
	'cc-quality-auditor',
	'web-client-auth',
	'web-meeting',
	'webitel-flow-diagram',
	'omnichannel-widget',
];

type Args = {
	version: string;
	next?: string;
	repos: string[];
	owner: string;
	ref?: string;
	dryRun: boolean;
	watch: boolean;
	yes: boolean;
};

type Target = {
	repo: string;
	ref: string;
	workflow: string;
	input: string;
};

type Run = {
	id: number;
	status: string;
	conclusion: string | null;
	html_url: string;
	created_at: string;
};

const VERSION_RE = /^\d+\.\d+$/;

function fail(msg: string): never {
	console.error(`✖ ${msg}`);
	process.exit(1);
}

function parseArgs(argv: string[]): Args {
	const get = (name: string) => {
		const i = argv.indexOf(name);
		return i === -1 ? undefined : argv[i + 1];
	};
	const has = (name: string) => argv.includes(name);

	const version = get('--version');
	const next = get('--next');
	if (!version || !VERSION_RE.test(version))
		fail('--version is required, format "26.10"');
	if (next && !VERSION_RE.test(next)) fail('--next format must be "26.12"');

	return {
		version,
		next,
		repos:
			get('--repos')
				?.split(',')
				.map((r) => r.trim())
				.filter(Boolean) ?? DEFAULT_REPOS,
		owner: get('--owner') ?? OWNER,
		ref: get('--ref'),
		dryRun: has('--dry-run'),
		watch: !has('--no-watch'),
		yes: has('--yes'),
	};
}

function getToken(): string {
	const env = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
	if (env) return env;
	try {
		return execSync('gh auth token', {
			encoding: 'utf8',
			stdio: [
				'ignore',
				'pipe',
				'ignore',
			],
		}).trim();
	} catch {
		fail(
			'No token. Set GITHUB_TOKEN (needs "actions: write" on the repos) or log in with `gh auth login`.',
		);
	}
}

let token = '';

async function gh<T>(path: string, init: RequestInit = {}): Promise<T> {
	const res = await fetch(`https://api.github.com${path}`, {
		...init,
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${token}`,
			'X-GitHub-Api-Version': '2022-11-28',
			...init.headers,
		},
	});
	if (!res.ok)
		throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`);
	return (res.status === 204 ? undefined : await res.json()) as T;
}

// [Claude] Old workflows take only "version", new ones take "version, next_version" — detect by file content.
async function resolveTarget(repo: string, args: Args): Promise<Target> {
	const { default_branch } = await gh<{
		default_branch: string;
	}>(`/repos/${OWNER}/${repo}`);
	const ref = args.ref ?? default_branch;
	const workflow = workflowOf(repo);
	const file = await gh<{
		content: string;
	}>(
		`/repos/${OWNER}/${repo}/contents/.github/workflows/${workflow}?ref=${ref}`,
	);
	const yml = Buffer.from(file.content, 'base64').toString('utf8');
	const takesNext = yml.includes('NEXT_VERSION');

	if (takesNext && !args.next) throw new Error('workflow needs --next');
	return {
		repo,
		ref,
		workflow,
		input: takesNext ? `${args.version}, ${args.next}` : args.version,
	};
}

async function dispatch(t: Target): Promise<void> {
	await gh(
		`/repos/${OWNER}/${t.repo}/actions/workflows/${t.workflow}/dispatches`,
		{
			method: 'POST',
			body: JSON.stringify({
				ref: t.ref,
				inputs: {
					version: t.input,
				},
			}),
		},
	);
}

// [Claude] Dispatch API returns no run id, so pick the newest workflow_dispatch run created after dispatch.
async function findRun(t: Target, since: number): Promise<Run | undefined> {
	const { workflow_runs } = await gh<{
		workflow_runs: Run[];
	}>(
		`/repos/${OWNER}/${t.repo}/actions/workflows/${t.workflow}/runs?event=workflow_dispatch&per_page=5`,
	);
	return workflow_runs.find((r) => Date.parse(r.created_at) >= since - 5_000);
}

function icon(run?: Run): string {
	if (!run) return '…';
	if (run.status !== 'completed') return '⏳';
	return run.conclusion === 'success' ? '✔' : '✖';
}

async function confirm(question: string): Promise<boolean> {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	const answer = await rl.question(question);
	rl.close();
	return answer.trim().toLowerCase() === 'y';
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
	const args = parseArgs(process.argv.slice(2));
	token = getToken();
	OWNER = args.owner;

	console.log(`Resolving ${args.repos.length} repos in ${OWNER}…`);
	const resolved = await Promise.allSettled(
		args.repos.map((repo) => resolveTarget(repo, args)),
	);

	const targets: Target[] = [];
	resolved.forEach((r, i) => {
		const repo = args.repos[i];
		if (r.status === 'fulfilled') {
			targets.push(r.value);
			console.log(
				`  ${repo.padEnd(24)} ref=${r.value.ref.padEnd(8)} version="${r.value.input}"${r.value.workflow === DEFAULT_WORKFLOW ? '' : `  workflow=${r.value.workflow}`}`,
			);
		} else {
			console.log(`  ${repo.padEnd(24)} ✖ skipped: ${r.reason.message}`);
		}
	});

	if (!targets.length) fail('Nothing to release.');
	if (args.dryRun) return console.log('\nDry run, nothing dispatched.');
	if (
		!args.yes &&
		!(await confirm(
			`\nRelease ${targets.length} repos? This pushes branches and tags. [y/N] `,
		))
	) {
		return console.log('Cancelled.');
	}

	const since = Date.now();
	const dispatched = await Promise.allSettled(targets.map(dispatch));
	const started = targets.filter((t, i) => {
		const d = dispatched[i];
		if (d.status === 'rejected')
			console.log(
				`  ${t.repo.padEnd(24)} ✖ dispatch failed: ${d.reason.message}`,
			);
		return d.status === 'fulfilled';
	});
	console.log(`\nDispatched ${started.length}/${targets.length}.`);
	if (!args.watch || !started.length) return;

	const runs = new Map<string, Run | undefined>();
	const finished = () =>
		started.every((t) => runs.get(t.repo)?.status === 'completed');

	while (!finished()) {
		await sleep(POLL_MS);
		await Promise.all(
			started.map(async (t) => {
				const prev = runs.get(t.repo);
				if (prev?.status === 'completed') return;
				try {
					const run = prev
						? await gh<Run>(`/repos/${OWNER}/${t.repo}/actions/runs/${prev.id}`)
						: await findRun(t, since);
					runs.set(t.repo, run);
				} catch (e) {
					console.log(`  ${t.repo}: poll error ${(e as Error).message}`);
				}
			}),
		);
		console.log(`\n[${new Date().toLocaleTimeString()}]`);
		for (const t of started) {
			const run = runs.get(t.repo);
			console.log(
				`  ${icon(run)} ${t.repo.padEnd(24)} ${run?.conclusion ?? run?.status ?? 'waiting for run'}  ${run?.html_url ?? ''}`,
			);
		}
	}

	const failed = started.filter(
		(t) => runs.get(t.repo)?.conclusion !== 'success',
	);
	if (failed.length) fail(`Failed: ${failed.map((t) => t.repo).join(', ')}`);
	console.log('\nAll releases done ✔');
}

main().catch((e) => fail(e.message));
