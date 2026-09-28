import type { TokenNode, TokenTree } from '../types';

/** Parse a Figma alias reference string like "{Border radius.lg}" into its dot-separated path segments. */
export function parseRef(value: string): string[] | null {
	const match = /^\{(.+)\}$/.exec(value);
	if (!match) return null;
	return match[1].split('.');
}

/** Look up a token node by its top-level-group path (as produced by parseRef). */
export function getNodeByPath(
	root: TokenTree,
	segments: string[],
): TokenNode | undefined {
	let node: TokenNode | undefined = root;
	for (const segment of segments) {
		if (node == null || typeof node !== 'object') return undefined;
		node = (node as Record<string, TokenNode>)[segment];
	}
	return node;
}
