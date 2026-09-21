#!/usr/bin/env node

/**
 * Converts Figma variable export files (Light.tokens.json / Dark.tokens.json)
 * into a tree of CSS files mirroring the token folder structure.
 *
 * Usage:
 *   npm run generate:design-tokens
 *
 * Input files are discovered under this directory's siblings:
 *   ../apps/<app-name>/{Light,Dark}.tokens.json  - one source per app
 *   ../lib/{Light,Dark}.tokens.json               - shared/library tokens
 *
 * Each source is generated independently into its own colocated dist/ folder:
 *   ../apps/<app-name>/dist/...
 *   ../lib/dist/...
 *
 * A folder is theme-aware if it or any ancestor folder is literally named "Colors"
 * (case-insensitive) - its direct leaf variables are written to light/index.css and
 * dark/index.css. Every other folder is treated as theme-invariant: its direct leaf
 * variables are written to a single index.css with plain :root rules, resolved from
 * the light export (values are expected to be identical across themes there).
 *
 * Output per token folder (relative to a source's dist/):
 *   <Group>/<...path>/index.css              - folders outside any "Colors" ancestor
 *   <Group>/<...path>/light/index.css         - folders under a "Colors" ancestor, light theme
 *   <Group>/<...path>/dark/index.css          - "Colors" folders, dark theme
 */

import path from 'node:path';
import { red } from './console-colors';
import { discoverSources } from './discover-sources';
import { generate } from './generate';
import type { ThemeConfig } from './types';

const TOKEN_GENERATION_ROOT = path.join(__dirname, '..');

const THEMES: ThemeConfig[] = [
	{
		name: 'light',
		file: 'Light.tokens.json',
		selector: ':root',
	},
	{
		name: 'dark',
		file: 'Dark.tokens.json',
		selector: ':root.theme--dark',
	},
];

function run(): void {
	const sources = discoverSources(TOKEN_GENERATION_ROOT, THEMES);

	if (sources.length === 0) {
		console.error(
			red(
				'Зупинено: не знайдено жодного джерела токенів (apps/* або lib/ з файлами тем).',
			),
		);
		process.exit(1);
	}

	let allSucceeded = true;
	for (const source of sources) {
		const succeeded = generate(source, THEMES);
		allSucceeded = allSucceeded && succeeded;
	}

	if (!allSucceeded) {
		process.exit(1);
	}
}

run();
