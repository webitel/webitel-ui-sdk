export const snakeToCamel = (str) =>
	str.replace(/([a-z])([_])([a-z])/g, (_group, p1, _p2, p3) =>
		[p1, p3.toUpperCase()].join(''),
	);

export const camelToSnake = (str) =>
	str.replace(/([a-z])([A-Z])/g, (_group, p1, p2) =>
		[p1, '_', p2.toLowerCase()].join(''),
	);

export const kebabToCamel = (str) =>
	str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', ''));

export const camelToKebab = (str) =>
	str.replace(/([A-Z])/g, (group) => group.toLowerCase().replace('', '-'));

export const kebabToSnake = (str) =>
	str.replace(/([-_][a-z])/g, (group) => group.replace('-', '_'));

export const snakeToKebab = (str) =>
	str.replace(/([-_][a-z])/g, (group) => group.replace('_', '-'));

const convertObject =
	({ self, converter }) =>
	(obj, skipKeys) => {
		if (!obj) return obj;
		const newObj = {};
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

export const objSnakeToCamel = (obj, skipKeys = []) => {
	return convertObject({
		self: objSnakeToCamel,
		converter: snakeToCamel,
	})(obj, skipKeys);
};

export const objCamelToSnake = (obj, skipKeys = []) => {
	return convertObject({
		self: objCamelToSnake,
		converter: camelToSnake,
	})(obj, skipKeys);
};

export const objCamelToKebab = (obj, skipKeys = []) => {
	return convertObject({
		self: objCamelToKebab,
		converter: camelToKebab,
	})(obj, skipKeys);
};
