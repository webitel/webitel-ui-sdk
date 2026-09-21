import fs from 'node:fs';
import path from 'node:path';
import type { Variable } from '../types';

export function buildCssFile(selector: string, variables: Variable[]): string {
	const lines = variables.map((v) => `  ${v.cssVarName}: ${v.cssValue};`);
	return `${selector} {\n${lines.join('\n')}\n}\n`;
}

export function writeFile(filePath: string, content: string): void {
	fs.mkdirSync(path.dirname(filePath), {
		recursive: true,
	});
	fs.writeFileSync(filePath, content, 'utf8');
}

/**
 * Recursively builds/extends an index.css in every directory under dirPath so it
 * imports each subdirectory's index.css. A directory may already have its own
 * index.css with :root rules (written directly for sizes/light/dark leaf
 * folders) - in that case, @import lines for its subfolders are prepended before the
 * existing rules (CSS requires @import to precede other rules to be valid), so a
 * folder can have both its own variables and nested subfolders (e.g. a "sizes"
 * bucket for theme-invariant vars that also happens to contain a real "Sizes"
 * token subgroup).
 * Returns true if this directory ends up with an index.css.
 */
export function buildIndex(dirPath: string): boolean {
	const entries = fs.readdirSync(dirPath, {
		withFileTypes: true,
	});
	const subdirs = entries
		.filter((e) => e.isDirectory())
		.map((e) => e.name)
		.sort();
	const ownIndexPath = path.join(dirPath, 'index.css');
	const ownIndexEntry = entries.find(
		(e) => e.isFile() && e.name === 'index.css',
	);

	const childDirsWithIndex = subdirs.filter((name) =>
		buildIndex(path.join(dirPath, name)),
	);

	const importLines = childDirsWithIndex.map(
		(name) => `@import "./${name}/index.css";`,
	);

	if (ownIndexEntry) {
		if (importLines.length > 0) {
			const existing = fs.readFileSync(ownIndexPath, 'utf8');
			fs.writeFileSync(
				ownIndexPath,
				`${importLines.join('\n')}\n${existing.trimStart()}`,
				'utf8',
			);
		}
		return true;
	}

	if (importLines.length === 0) return false;

	fs.writeFileSync(ownIndexPath, `${importLines.join('\n')}\n`, 'utf8');
	return true;
}
