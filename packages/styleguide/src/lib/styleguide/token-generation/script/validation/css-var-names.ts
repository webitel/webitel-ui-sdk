import { slugify } from '../transform/slugify';
import type { Variable } from '../types';
import { ValidationErrorCollector } from './errors';

/** Validate that no two distinct token paths slugify to the same CSS variable name,
 * and that no path segment slugifies to an empty string. */
export function validateCssVarNames(
	variables: Variable[],
	fileLabel: string,
): ValidationErrorCollector {
	const collector = new ValidationErrorCollector(fileLabel);
	const byVarName = new Map<string, string[]>();

	for (const variable of variables) {
		variable.pathSegments.forEach((segment, i) => {
			if (slugify(segment) === '') {
				collector.add(
					`Сегмент шляху "${segment}" за шляхом "${variable.pathSegments.slice(0, i + 1).join('.')}" перетворюється на порожній рядок`,
					[
						`Повний шлях: ${variable.pathSegments.join('.')}`,
					],
				);
			}
		});
		if (!byVarName.has(variable.cssVarName)) {
			byVarName.set(variable.cssVarName, []);
		}
		byVarName.get(variable.cssVarName)?.push(variable.pathSegments.join('.'));
	}

	for (const [varName, paths] of byVarName) {
		if (paths.length > 1) {
			collector.add(`Колізія назви CSS-змінної: "${varName}"`, [
				`Створюється ${paths.length} різними шляхами токенів: ${paths.join(', ')}`,
			]);
		}
	}

	return collector;
}
