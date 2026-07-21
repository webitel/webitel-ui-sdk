type EmptyValue =
	| undefined
	| null
	| ''
	| 0
	| false
	| never[]
	| Record<PropertyKey, never>;

// checks if value is Falsy,
// including empty arrays or objects
const isEmpty = <T>(value: T): value is Extract<T, EmptyValue> => {
	if (Array.isArray(value)) return !value.length;
	if (typeof value === 'object') return !value || !Object.keys(value).length;
	return !value;
};

export default isEmpty;
