import fs from 'node:fs';
import path from 'node:path';
import { yellow } from './console-colors';
import type { ThemeConfig, TokenSource } from './types';

/** Whether `dir` contains at least one of the theme input files. */
function hasAnyThemeFile(dir: string, themes: ThemeConfig[]): boolean {
	return themes.some((theme) => fs.existsSync(path.join(dir, theme.file)));
}

/**
 * Discover every token source under the token-generation root: each app directory
 * under apps/, plus the shared lib/ directory. Each source is independent - it gets
 * its own colocated dist/ output directory and is validated/generated on its own.
 *
 * A source directory without any theme input file is skipped (logged, not an error) -
 * this keeps e.g. an empty lib/ (no shared tokens exported yet) from failing the run.
 */
export function discoverSources(
	tokenGenerationRoot: string,
	themes: ThemeConfig[],
): TokenSource[] {
	const sources: TokenSource[] = [];

	const appsDir = path.join(tokenGenerationRoot, 'apps');
	if (fs.existsSync(appsDir)) {
		const appNames = fs
			.readdirSync(appsDir, {
				withFileTypes: true,
			})
			.filter((entry) => entry.isDirectory())
			.map((entry) => entry.name)
			.sort();

		for (const appName of appNames) {
			const inputDir = path.join(appsDir, appName);
			if (!hasAnyThemeFile(inputDir, themes)) {
				console.warn(
					yellow(`[apps/${appName}] пропущено: не знайдено файлів токенів`),
				);
				continue;
			}
			sources.push({
				label: `apps/${appName}`,
				inputDir,
				outputDir: path.join(inputDir, 'dist'),
				kind: 'app',
				appName,
			});
		}
	}

	const libDir = path.join(tokenGenerationRoot, 'lib');
	if (fs.existsSync(libDir)) {
		if (hasAnyThemeFile(libDir, themes)) {
			sources.push({
				label: 'lib',
				inputDir: libDir,
				outputDir: path.join(libDir, 'dist'),
				kind: 'lib',
			});
		} else {
			console.warn(yellow('[lib] пропущено: не знайдено файлів токенів'));
		}
	}

	return sources;
}
