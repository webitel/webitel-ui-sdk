/**
 * @description
 * Vuelidate's `required` semantics, preserved so migrated forms keep behaving
 * the same: `{}` and `[]` count as empty, but `0` and `false` are filled.
 *
 * Getting this wrong is silent — a queue's `priority: 0` or `enabled: false`
 * would start failing a required check that never fired before.
 */
export const isFilled = (value: unknown): boolean => {
	if (value === null || value === undefined) return false;
	if (Array.isArray(value)) return value.length > 0;
	if (value instanceof Date) return !Number.isNaN(value.getTime());
	if (typeof value === 'object') return Object.keys(value).length > 0;
	return String(value).length > 0;
};
