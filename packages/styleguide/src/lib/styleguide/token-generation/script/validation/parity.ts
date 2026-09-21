import type { TokenNode, TokenTree } from '../types';
import { ValidationErrorCollector } from './errors';

function collectLeafTypes(
	node: TokenNode,
	pathSegments: string[],
	out: Map<string, string>,
): void {
	if (node && typeof node === 'object' && '$type' in node) {
		out.set(
			pathSegments.join('.'),
			(
				node as {
					$type: string;
				}
			).$type,
		);
		return;
	}
	if (node && typeof node === 'object') {
		for (const [key, child] of Object.entries(
			node as Record<string, TokenNode>,
		)) {
			if (key.startsWith('$')) continue;
			collectLeafTypes(child, pathSegments.concat(key), out);
		}
	}
}

/** Validate structural parity between themes: same leaf token paths, same $type per path. */
export function validateThemeParity(
	rootsByTheme: Record<string, TokenTree>,
): ValidationErrorCollector {
	const collector = new ValidationErrorCollector('узгодженість між темами');
	const themeNames = Object.keys(rootsByTheme);

	const leavesByTheme: Record<string, Map<string, string>> = {};
	for (const themeName of themeNames) {
		const leaves = new Map<string, string>();
		collectLeafTypes(rootsByTheme[themeName], [], leaves);
		leavesByTheme[themeName] = leaves;
	}

	const allPaths = new Set<string>();
	for (const leaves of Object.values(leavesByTheme)) {
		for (const p of leaves.keys()) allPaths.add(p);
	}

	for (const p of allPaths) {
		const presentIn = themeNames.filter((t) => leavesByTheme[t].has(p));
		const missingFrom = themeNames.filter((t) => !leavesByTheme[t].has(p));
		if (missingFrom.length > 0) {
			collector.add(
				`Токен "${p}" відсутній у темі(-ах): ${missingFrom.join(', ')}`,
				[
					`Присутній у: ${presentIn.join(', ')}`,
				],
			);
			continue;
		}
		const types = new Set(themeNames.map((t) => leavesByTheme[t].get(p)));
		if (types.size > 1) {
			const detail = themeNames
				.map((t) => `${t}=${leavesByTheme[t].get(p)}`)
				.join(', ');
			collector.add(`Токен "${p}" має різний $type у різних темах`, [
				detail,
			]);
		}
	}

	return collector;
}
