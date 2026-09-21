import { parseRef } from '../transform/token-refs';
import type { TokenNode } from '../types';
import type { ValidationErrorCollector } from './errors';
import { findTypoLikeNames } from './typo-detection';

const SUPPORTED_TYPES = [
	'color',
	'number',
	'string',
];
const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

/** Validate the raw token tree structure of a single theme file: every node is either
 * a group (plain object of children) or a well-formed leaf ({$type, $value, ...}), and
 * flags sibling group names that look like typos of structural keywords ("Colors"/"Sizes"). */
export function validateTree(
	node: TokenNode,
	pathSegments: string[],
	collector: ValidationErrorCollector,
): void {
	if (node == null || typeof node !== 'object' || Array.isArray(node)) {
		collector.add(`Некоректний вузол за шляхом "${pathSegments.join('.')}"`, [
			`Очікувався об'єкт (група або токен), отримано: ${JSON.stringify(node)}`,
		]);
		return;
	}

	const record = node as Record<string, TokenNode>;
	const childKeys = Object.keys(record).filter((k) => !k.startsWith('$'));
	const isLeaf = '$type' in record || '$value' in record;

	if (isLeaf) {
		validateLeaf(record, pathSegments, collector);
		if (childKeys.length > 0) {
			collector.add(
				`Токен має неочікувані вкладені групи за шляхом "${pathSegments.join('.')}"`,
				[
					`Вузол із $type/$value має бути кінцевим токеном, але містить вкладені ключі: ${childKeys.join(', ')}`,
				],
			);
		}
		return;
	}

	if (childKeys.length === 0) {
		collector.add(
			`Порожня група за шляхом "${pathSegments.join('.') || '<корінь>'}"`,
			[
				'Група не містить жодних токенів або вкладених груп.',
			],
		);
		return;
	}

	// Only compare *group* child names against structural keywords - a leaf token
	// legitimately named "color" or "size" is not a typo of "Colors"/"Sizes".
	const groupChildKeys = childKeys.filter((key) => {
		const child = record[key];
		return (
			child &&
			typeof child === 'object' &&
			!('$type' in child) &&
			!('$value' in child)
		);
	});

	const typoFindings = findTypoLikeNames(groupChildKeys);
	for (const finding of typoFindings) {
		collector.add(
			`Підозріла назва групи "${finding.name}" за шляхом "${pathSegments.concat(finding.name).join('.')}"`,
			[
				`Схоже на помилку в написанні "${finding.keyword}" (відстань редагування: ${finding.distance}).`,
				`Сусідні групи тут: ${groupChildKeys.join(', ')}`,
				finding.keyword === 'Colors'
					? 'Папка з назвою "Colors" (без урахування регістру) вважається залежною від теми; помилка в назві призведе до того, що вона мовчки оброблятиметься як незалежна від теми.'
					: undefined,
			].filter((line): line is string => Boolean(line)),
		);
	}

	for (const key of childKeys) {
		validateTree(record[key], pathSegments.concat(key), collector);
	}
}

/** Validate a single leaf token's $type/$value shape. */
function validateLeaf(
	node: Record<string, TokenNode>,
	pathSegments: string[],
	collector: ValidationErrorCollector,
): void {
	const label = pathSegments.join('.');

	if (!('$value' in node)) {
		collector.add(`Відсутнє поле $value за шляхом "${label}"`, [
			`Вузол: ${JSON.stringify(node)}`,
		]);
		return;
	}
	if (!('$type' in node) || typeof node.$type !== 'string') {
		collector.add(`Відсутнє або некоректне поле $type за шляхом "${label}"`, [
			`Вузол: ${JSON.stringify(node)}`,
		]);
		return;
	}

	const type = node.$type as string;
	const value = node.$value as unknown;

	// Alias references are validated separately (after the whole tree is known), since
	// resolving them requires looking up other parts of the tree.
	if (typeof value === 'string' && parseRef(value)) {
		return;
	}

	if (!SUPPORTED_TYPES.includes(type)) {
		collector.add(`Непідтримуваний $type "${type}" за шляхом "${label}"`, [
			`Підтримувані типи: ${SUPPORTED_TYPES.join(', ')}`,
			`Значення: ${JSON.stringify(value)}`,
		]);
		return;
	}

	if (type === 'color') {
		validateColorValue(value, label, collector);
	} else if (type === 'number') {
		validateNumberValue(value, label, collector);
	} else if (type === 'string') {
		if (typeof value !== 'string') {
			collector.add(`Некоректне значення типу string за шляхом "${label}"`, [
				`Очікувався рядок, отримано: ${JSON.stringify(value)}`,
			]);
		}
	}
}

function validateColorValue(
	value: unknown,
	label: string,
	collector: ValidationErrorCollector,
): void {
	if (typeof value === 'string') {
		// A raw (non-alias) string color, e.g. "#RRGGBB" - allowed by colorToHex().
		if (!HEX_COLOR_RE.test(value)) {
			collector.add(`Некоректний рядок кольору за шляхом "${label}"`, [
				`Очікувався hex-рядок формату "#RRGGBB", отримано: ${JSON.stringify(value)}`,
			]);
		}
		return;
	}
	if (!value || typeof value !== 'object') {
		collector.add(`Некоректне значення кольору за шляхом "${label}"`, [
			`Очікувався об'єкт із полем "hex", отримано: ${JSON.stringify(value)}`,
		]);
		return;
	}
	const colorValue = value as {
		hex?: unknown;
		alpha?: unknown;
	};
	if (
		typeof colorValue.hex !== 'string' ||
		!HEX_COLOR_RE.test(colorValue.hex)
	) {
		collector.add(`Відсутнє або некоректне поле "hex" за шляхом "${label}"`, [
			`Очікувалося, що "hex" буде рядком формату "#RRGGBB", отримано: ${JSON.stringify(colorValue.hex)}`,
		]);
	}
	if ('alpha' in colorValue) {
		const alpha = colorValue.alpha;
		if (
			typeof alpha !== 'number' ||
			Number.isNaN(alpha) ||
			alpha < 0 ||
			alpha > 1
		) {
			collector.add(`Некоректне поле "alpha" за шляхом "${label}"`, [
				`Очікувалося число в діапазоні від 0 до 1, отримано: ${JSON.stringify(alpha)}`,
			]);
		}
	}
}

function validateNumberValue(
	value: unknown,
	label: string,
	collector: ValidationErrorCollector,
): void {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		collector.add(`Некоректне значення типу number за шляхом "${label}"`, [
			`Очікувалося скінченне число, отримано: ${JSON.stringify(value)}`,
		]);
	}
}
