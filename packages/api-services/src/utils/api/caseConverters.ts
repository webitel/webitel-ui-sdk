export const snakeToCamel = (str: string) =>
	str.replace(/([a-z])([_])([a-z])/g, (_group, p1: string, _p2, p3: string) =>
		[
			p1,
			p3.toUpperCase(),
		].join(''),
	);

export const camelToSnake = (str: string) =>
	str.replace(/([a-z])([A-Z])/g, (_group, p1: string, p2: string) =>
		[
			p1,
			'_',
			p2.toLowerCase(),
		].join(''),
	);

export const kebabToCamel = (str: string) =>
	str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', ''));

export const camelToKebab = (str: string) =>
	str.replace(/([A-Z])/g, (group) => group.toLowerCase().replace('', '-'));

export const kebabToSnake = (str: string) =>
	str.replace(/([-_][a-z])/g, (group) => group.replace('-', '_'));

export const snakeToKebab = (str: string) =>
	str.replace(/([-_][a-z])/g, (group) => group.replace('_', '-'));

/**
 * TODO(types): the converters walk arbitrary API payloads and rename keys, so
 * input and output shapes are unrelated at the type level. Expressing the
 * rename as a mapped type is a separate refactor.
 */
// biome-ignore lint/suspicious/noExplicitAny: renames keys of arbitrary payloads, see TODO above
type ConvertibleValue = any;

const convertObject =
	({
		self,
		converter,
	}: {
		self: (obj: ConvertibleValue, skipKeys: string[]) => ConvertibleValue;
		converter: (str: string) => string;
	}) =>
	(obj: ConvertibleValue, skipKeys: string[]): ConvertibleValue => {
		if (!obj) return obj;
		const newObj: Record<string, ConvertibleValue> = {};
		if (Array.isArray(obj)) {
			return obj.map((value) => {
				if (typeof value === 'object') {
					return self(value, skipKeys);
				}
				if (typeof value === 'string') return converter(value);
				return value; // number
			});
		}
		Object.keys(obj).forEach((oldKey) => {
			if (skipKeys.includes(oldKey)) {
				newObj[oldKey] = obj[oldKey];
			} else {
				const newKey = converter(oldKey);
				let value = obj[oldKey];
				if (
					Array.isArray(value) ||
					(value !== null &&
						value !== undefined &&
						value.constructor === Object)
				) {
					value = self(value, skipKeys);
				}
				newObj[newKey] = value;
			}
		});

		return newObj;
	};

export const objSnakeToCamel = (
	obj: ConvertibleValue,
	skipKeys: string[] = [],
) => {
	return convertObject({
		self: objSnakeToCamel,
		converter: snakeToCamel,
	})(obj, skipKeys);
};

export const objCamelToSnake = (
	obj: ConvertibleValue,
	skipKeys: string[] = [],
) => {
	return convertObject({
		self: objCamelToSnake,
		converter: camelToSnake,
	})(obj, skipKeys);
};

export const objCamelToKebab = (
	obj: ConvertibleValue,
	skipKeys: string[] = [],
) => {
	return convertObject({
		self: objCamelToKebab,
		converter: camelToKebab,
	})(obj, skipKeys);
};
