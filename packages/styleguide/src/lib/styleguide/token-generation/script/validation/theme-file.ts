import type { TokenTree } from '../types';
import { ValidationErrorCollector } from './errors';
import { validateReferences } from './references';
import { validateTree } from './tree';

/** Validate one theme file's full token tree (structure + leaves + references). */
export function validateThemeFile(
	root: TokenTree,
	fileLabel: string,
): ValidationErrorCollector {
	const collector = new ValidationErrorCollector(fileLabel);
	validateTree(root, [], collector);
	validateReferences(root, root, [], collector);
	return collector;
}
