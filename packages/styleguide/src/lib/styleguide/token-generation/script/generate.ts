import fs from 'node:fs';
import path from 'node:path';
import { red } from './console-colors';
import {
	buildCssFile,
	buildIndex,
	cleanOutputDir,
	writeFile,
} from './output/write-css';
import {
	collectVariables,
	groupByFolder,
	isColorsFolder,
} from './transform/collect-variables';
import { slugify } from './transform/slugify';
import type {
	Folder,
	GenerateResult,
	ThemeConfig,
	TokenSource,
	TokenTree,
	Variable,
} from './types';
import { validateCssVarNames } from './validation/css-var-names';
import { validateThemeParity } from './validation/parity';
import { validateThemeFile } from './validation/theme-file';

/** Read and JSON-parse a theme's input file, with a clear error if it's missing/invalid. */
function readThemeRoot(inputDir: string, theme: ThemeConfig): TokenTree | null {
	const inputPath = path.join(inputDir, theme.file);
	if (!fs.existsSync(inputPath)) return null;

	let raw: string;
	try {
		raw = fs.readFileSync(inputPath, 'utf8');
	} catch (err) {
		throw new Error(
			`Не вдалося прочитати вхідний файл "${inputPath}": ${(err as Error).message}`,
		);
	}
	try {
		return JSON.parse(raw) as TokenTree;
	} catch (err) {
		throw new Error(
			`Вхідний файл "${inputPath}" містить некоректний JSON: ${(err as Error).message}`,
		);
	}
}

/** Generate the CSS output tree for a single token source (an app or lib/). Reports
 * validation errors to the console and returns wroteOutput=false if validation failed
 * or the source produced no variables - the caller decides whether that should stop
 * the whole run, and uses wroteOutput to know which sources to wire up in the glue
 * CSS files that import each source's dist/index.css. */
export function generate(
	source: TokenSource,
	themes: ThemeConfig[],
): GenerateResult {
	const fail = (): GenerateResult => ({
		source,
		succeeded: false,
		wroteOutput: false,
	});

	const rootsByTheme: Record<string, TokenTree> = {};
	for (const theme of themes) {
		const root = readThemeRoot(source.inputDir, theme);
		if (root) rootsByTheme[theme.name] = root;
	}

	const missingThemes = themes.filter((theme) => !(theme.name in rootsByTheme));
	if (missingThemes.length > 0) {
		console.error(
			red(
				`[${source.label}] Зупинено: відсутні файли тем: ${missingThemes.map((t) => t.file).join(', ')}.`,
			),
		);
		return fail();
	}

	// Validate each theme file's structure/leaves/references, then cross-theme parity.
	// Collect every failure across all checks before reporting, so a single run surfaces
	// everything wrong instead of stopping at the first error.
	const collectors = themes.map((theme) =>
		validateThemeFile(
			rootsByTheme[theme.name],
			`${source.label}/${theme.file}`,
		),
	);
	collectors.push(validateThemeParity(rootsByTheme));

	const failedCollectors = collectors.filter((c) => c.hasErrors);
	if (failedCollectors.length > 0) {
		for (const collector of failedCollectors) collector.report();
		const totalErrors = failedCollectors.reduce(
			(sum, c) => sum + c.errors.length,
			0,
		);
		console.error(
			red(
				`[${source.label}] Зупинено: знайдено помилок перевірки - ${totalErrors}. Жодного файлу не було записано.`,
			),
		);
		return fail();
	}

	// theme.name -> Map<folderKey, Folder>
	const foldersByTheme = new Map<string, Map<string, Folder>>();

	for (const theme of themes) {
		const root = rootsByTheme[theme.name];
		const variables: Variable[] = [];
		collectVariables(root, root, [], variables);

		const varNameCollector = validateCssVarNames(
			variables,
			`${source.label}/${theme.file}`,
		);
		if (varNameCollector.hasErrors) {
			varNameCollector.report();
			console.error(
				red(
					`[${source.label}] Зупинено: перевірку назв CSS-змінних не пройдено. Жодного файлу не було записано.`,
				),
			);
			return fail();
		}

		foldersByTheme.set(theme.name, groupByFolder(variables));
		console.log(
			`[${source.label}:${theme.name}] оброблено змінних: ${variables.length}`,
		);
	}

	const allFolderKeys = new Set<string>();
	for (const folders of foldersByTheme.values()) {
		for (const key of folders.keys()) allFolderKeys.add(key);
	}

	// All validation passed - safe to wipe the previous output now, so tokens removed
	// from Figma since the last generation don't linger as stale CSS variables.
	cleanOutputDir(source.outputDir);

	let flatFileCount = 0;
	let themeFileCount = 0;

	for (const folderKey of allFolderKeys) {
		const folderSegments = themes
			.map(
				(theme) =>
					foldersByTheme.get(theme.name)?.get(folderKey)?.folderSegments,
			)
			.find((segments): segments is string[] => segments != null);
		if (!folderSegments) continue;
		const dirPath = path.join(source.outputDir, ...folderSegments.map(slugify));

		if (isColorsFolder(folderSegments)) {
			// "Colors" folder: theme-aware, one file per theme.
			for (const theme of themes) {
				const folderVariables =
					foldersByTheme.get(theme.name)?.get(folderKey)?.variables ?? [];
				if (folderVariables.length === 0) continue;
				const filePath = path.join(dirPath, theme.name, 'index.css');
				writeFile(filePath, buildCssFile(theme.selector, folderVariables));
				themeFileCount += 1;
			}
		} else {
			// Any other folder: theme-invariant, take values from the first theme's export
			// (arbitrary choice - values are expected to be identical across themes here).
			const [primaryTheme] = themes;
			const primaryVariables =
				foldersByTheme.get(primaryTheme.name)?.get(folderKey)?.variables ?? [];
			if (primaryVariables.length > 0) {
				const filePath = path.join(dirPath, 'index.css');
				writeFile(filePath, buildCssFile(':root', primaryVariables));
				flatFileCount += 1;
			}
		}
	}

	console.log(
		`[${source.label}] Записано звичайних файлів index.css: ${flatFileCount}, темозалежних файлів: ${themeFileCount}`,
	);

	let wroteOutput = false;
	if (fs.existsSync(source.outputDir)) {
		wroteOutput = buildIndex(source.outputDir);
		if (wroteOutput) {
			console.log(
				`[${source.label}] Записано dist/index.css (кореневу точку входу)`,
			);
		}
	}

	return {
		source,
		succeeded: true,
		wroteOutput,
	};
}
