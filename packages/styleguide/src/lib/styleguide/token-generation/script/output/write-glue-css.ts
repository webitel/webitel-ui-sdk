import fs from 'node:fs';
import path from 'node:path';
import type { GenerateResult } from '../types';

/**
 * (Re)writes the top-level "glue" CSS files that wire generated token output into the
 * rest of the styleguide build - these are NOT hand-maintained: every run rewrites them
 * from scratch based on which sources actually produced output, so they can never drift
 * from what's on disk (e.g. importing a dist/index.css that doesn't exist because that
 * app's tokens failed validation or were removed).
 *
 * Writes, relative to tokenGenerationRoot:
 *   apps/index.css              - @import for each app that wrote output
 *   lib/index.css               - @import for lib/dist/index.css, if lib wrote output
 *   index.css                   - @import for apps/index.css and/or lib/index.css,
 *                                  whichever actually have content
 */
export function writeGlueCss(
	tokenGenerationRoot: string,
	results: GenerateResult[],
): void {
	const appResults = results.filter(
		(r) => r.source.kind === 'app' && r.wroteOutput,
	);
	const libResult = results.find(
		(r) => r.source.kind === 'lib' && r.wroteOutput,
	);

	const appsIndexPath = path.join(tokenGenerationRoot, 'apps', 'index.css');
	const libIndexPath = path.join(tokenGenerationRoot, 'lib', 'index.css');
	const rootIndexPath = path.join(tokenGenerationRoot, 'index.css');

	const rootImports: string[] = [];

	if (appResults.length > 0) {
		const appImportLines = appResults
			.map((r) => `@import "./${r.source.appName}/dist/index.css";`)
			.join('\n');
		writeGlueFile(appsIndexPath, appImportLines);
		rootImports.push('@import "./apps/index.css";');
	} else {
		removeGlueFile(appsIndexPath);
	}

	if (libResult) {
		writeGlueFile(libIndexPath, '@import "./dist/index.css";');
		rootImports.push('@import "./lib/index.css";');
	} else {
		removeGlueFile(libIndexPath);
	}

	if (rootImports.length > 0) {
		writeGlueFile(rootIndexPath, rootImports.join('\n'));
	} else {
		removeGlueFile(rootIndexPath);
	}
}

function writeGlueFile(filePath: string, content: string): void {
	fs.mkdirSync(path.dirname(filePath), {
		recursive: true,
	});
	fs.writeFileSync(filePath, `${content}\n`, 'utf8');
}

function removeGlueFile(filePath: string): void {
	fs.rmSync(filePath, {
		force: true,
	});
}
