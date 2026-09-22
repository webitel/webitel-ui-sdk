import type {
	FigmaColorValue,
	TokenLeaf,
	TokenNode,
	TokenTree,
	TokenType,
	TokenValue,
} from '../types';
import { getNodeByPath, parseRef } from './token-refs';

/** Round a float to a sane precision and format as a px string. */
export function toPx(value: number): string {
	const rounded = Math.round(value * 1000) / 1000;
	return `${rounded}px`;
}

/** Convert a Figma color object ({colorSpace, components, alpha, hex}) to a hex/hex-alpha string. */
export function colorToHex(value: TokenValue): string {
	if (typeof value === 'string') return value;
	if (
		value &&
		typeof value === 'object' &&
		typeof (value as FigmaColorValue).hex === 'string'
	) {
		const colorValue = value as FigmaColorValue;
		const hex = colorValue.hex;
		const alpha = typeof colorValue.alpha === 'number' ? colorValue.alpha : 1;
		if (alpha >= 1) return hex;
		const alphaHex = Math.round(alpha * 255)
			.toString(16)
			.padStart(2, '0');
		return `${hex}${alphaHex}`;
	}
	throw new Error(`Нерозпізнане значення кольору: ${JSON.stringify(value)}`);
}

export interface ResolvedValue {
	type: TokenType;
	value: TokenValue;
}

/** Resolve a token's final value, following alias chains, and return { type, value }. */
export function resolveValue(
	root: TokenTree,
	node: TokenNode,
	seenRefs: string[] = [],
): ResolvedValue {
	const leaf = node as TokenLeaf;
	const rawValue = leaf.$value;
	if (typeof rawValue === 'string') {
		const refPath = parseRef(rawValue);
		if (refPath) {
			const refKey = refPath.join('.');
			if (seenRefs.includes(refKey)) {
				throw new Error(
					`Виявлено циклічне посилання: ${seenRefs.concat(refKey).join(' -> ')}`,
				);
			}
			const target = getNodeByPath(root, refPath);
			if (!target || typeof target !== 'object' || !('$value' in target)) {
				throw new Error(
					`Неможливо розв'язати посилання "${rawValue}" (шлях: ${refPath.join('.')})`,
				);
			}
			return resolveValue(root, target, seenRefs.concat(refKey));
		}
	}
	return {
		type: leaf.$type as TokenType,
		value: rawValue,
	};
}

/** Some designers include a trailing ";" directly in a string token's value (e.g. a
 * hand-written "linear-gradient(...);"). Strip it so buildCssFile()'s own ";" doesn't
 * end up doubled in the generated CSS declaration. */
function stripTrailingSemicolon(value: string): string {
	return value.trim().replace(/;+\s*$/, '');
}

/** Format a resolved value according to its $type. */
export function formatValue(type: TokenType, value: TokenValue): string {
	switch (type) {
		case 'color':
			return colorToHex(value);
		case 'number':
			return toPx(value as number);
		case 'string':
			return stripTrailingSemicolon(String(value));
		default:
			throw new Error(`Непідтримуваний $type токена: ${type}`);
	}
}
