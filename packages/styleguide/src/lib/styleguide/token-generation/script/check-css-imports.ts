import fs from 'node:fs';
import path from 'node:path';
import { red } from './console-colors';

const IMPORT_RE = /@import\s+["']([^"']+)["']/g;

interface BrokenImport {
	fromFile: string;
	importPath: string;
	resolvedPath: string;
}

/**
 * Recursively finds every @import in every .css file under `root`, and reports the ones
 * whose target file doesn't exist. This catches CSS import chains left dangling by hand
 * edits or a partial/failed token generation - e.g. apps/index.css importing a
 * dist/index.css that was never written because that app's tokens failed validation.
 */
export function findBrokenCssImports(root: string): BrokenImport[] {
	const broken: BrokenImport[] = [];

	for (const cssFile of findCssFiles(root)) {
		const content = fs.readFileSync(cssFile, 'utf8');
		for (const match of content.matchAll(IMPORT_RE)) {
			const importPath = match[1];
			if (/^(https?:)?\/\//.test(importPath)) continue; // external URL, not a local file
			const resolvedPath = path.resolve(path.dirname(cssFile), importPath);
			if (!fs.existsSync(resolvedPath)) {
				broken.push({
					fromFile: cssFile,
					importPath,
					resolvedPath,
				});
			}
		}
	}

	return broken;
}

function findCssFiles(dir: string): string[] {
	const entries = fs.readdirSync(dir, {
		withFileTypes: true,
	});
	const files: string[] = [];
	for (const entry of entries) {
		const entryPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...findCssFiles(entryPath));
		} else if (entry.isFile() && entry.name.endsWith('.css')) {
			files.push(entryPath);
		}
	}
	return files;
}

/** Verify every @import under `root` resolves to a real file. Reports and returns false
 * on the first source of broken imports found, rather than throwing, so the caller can
 * decide how to fail (e.g. stop the whole generation run). */
export function checkCssImports(root: string): boolean {
	const broken = findBrokenCssImports(root);
	if (broken.length === 0) return true;

	console.error(
		red(
			`\nЗнайдено непрацюючі @import у CSS (token-generation): ${broken.length}:\n`,
		),
	);
	for (const item of broken) {
		console.error(
			red(
				`  "${item.importPath}" у ${path.relative(root, item.fromFile)} -> файл не знайдено: ${path.relative(root, item.resolvedPath)}`,
			),
		);
	}
	console.error('');

	return false;
}
