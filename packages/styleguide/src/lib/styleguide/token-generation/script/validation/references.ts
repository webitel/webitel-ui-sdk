import { getNodeByPath, parseRef } from '../transform/token-refs';
import type { TokenNode, TokenTree } from '../types';
import type { ValidationErrorCollector } from './errors';

/** Validate every alias reference in the tree resolves to a real leaf token, and that
 * following the chain terminates (no circular references). */
export function validateReferences(
	root: TokenTree,
	node: TokenNode,
	pathSegments: string[],
	collector: ValidationErrorCollector,
): void {
	if (node == null || typeof node !== 'object') return;

	if ('$value' in node) {
		const value = (
			node as {
				$value: unknown;
			}
		).$value;
		if (typeof value === 'string') {
			const refPath = parseRef(value);
			if (refPath) {
				checkReferenceChain(
					root,
					refPath,
					[
						pathSegments.join('.'),
					],
					pathSegments,
					collector,
				);
			}
		}
		return;
	}

	for (const [key, child] of Object.entries(
		node as Record<string, TokenNode>,
	)) {
		if (key.startsWith('$')) continue;
		validateReferences(root, child, pathSegments.concat(key), collector);
	}
}

function checkReferenceChain(
	root: TokenTree,
	refPath: string[],
	chainLabels: string[],
	originPathSegments: string[],
	collector: ValidationErrorCollector,
): void {
	const refLabel = refPath.join('.');
	if (chainLabels.includes(refLabel)) {
		collector.add(
			`Циклічне посилання за шляхом "${originPathSegments.join('.')}"`,
			[
				`Ланцюжок посилань: ${chainLabels.concat(refLabel).join(' -> ')}`,
			],
		);
		return;
	}

	const target = getNodeByPath(root, refPath);
	if (!target || typeof target !== 'object' || !('$value' in target)) {
		collector.add(
			`Неможливо розв'язати посилання за шляхом "${originPathSegments.join('.')}"`,
			[
				`Посилання "{${refLabel}}" не вказує на дійсний токен.`,
				chainLabels.length > 1
					? `Ланцюжок посилань до цього моменту: ${chainLabels.join(' -> ')}`
					: undefined,
			].filter((line): line is string => Boolean(line)),
		);
		return;
	}

	const targetValue = (
		target as {
			$value: unknown;
		}
	).$value;
	if (typeof targetValue === 'string') {
		const nextRefPath = parseRef(targetValue);
		if (nextRefPath) {
			checkReferenceChain(
				root,
				nextRefPath,
				chainLabels.concat(refLabel),
				originPathSegments,
				collector,
			);
		}
	}
}
