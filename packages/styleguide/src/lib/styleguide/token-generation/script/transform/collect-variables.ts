import type { Folder, TokenNode, TokenTree, Variable } from '../types';
import { formatValue, resolveValue } from './format-value';
import { slugify, toCssVarName } from './slugify';

/**
 * Walk the token tree, collecting leaf variables into `out`.
 * Each top-level group is walked as part of the same tree - callers group the flat
 * result by folder afterwards (see groupByFolder).
 */
export function collectVariables(
	root: TokenTree,
	node: TokenNode,
	pathSegments: string[],
	out: Variable[],
): void {
	if (node && typeof node === 'object' && '$type' in node) {
		let resolved: ReturnType<typeof resolveValue>;
		let cssValue: string;
		try {
			resolved = resolveValue(root, node);
			cssValue = formatValue(resolved.type, resolved.value);
		} catch (err) {
			throw new Error(
				`Не вдалося розв'язати токен "${pathSegments.join('.')}": ${(err as Error).message}`,
			);
		}
		out.push({
			pathSegments: pathSegments.slice(),
			cssVarName: toCssVarName(pathSegments),
			type: resolved.type,
			cssValue,
		});
		return;
	}
	if (node && typeof node === 'object') {
		for (const [key, child] of Object.entries(
			node as Record<string, TokenNode>,
		)) {
			if (key.startsWith('$')) continue;
			collectVariables(root, child, pathSegments.concat(key), out);
		}
	}
}

/** Whether a folder is theme-aware: itself or any ancestor is literally named "Colors". */
export function isColorsFolder(folderSegments: string[]): boolean {
	return folderSegments.some((segment) => segment.toLowerCase() === 'colors');
}

/** Group a flat variable list (single theme) by folder (all path segments except the last). */
export function groupByFolder(variables: Variable[]): Map<string, Folder> {
	const folders = new Map<string, Folder>();
	for (const variable of variables) {
		const folderSegments = variable.pathSegments.slice(0, -1);
		const folderKey = folderSegments.map(slugify).join('/');
		if (!folders.has(folderKey)) {
			folders.set(folderKey, {
				folderSegments,
				variables: [],
			});
		}
		folders.get(folderKey)?.variables.push(variable);
	}
	return folders;
}
