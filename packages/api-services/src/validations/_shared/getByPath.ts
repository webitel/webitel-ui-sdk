/**
 * @description
 * Reads a dot-path off an object, for rule tables that address nested fields
 * as `'payload.maxWaitTime'`.
 */
export const getByPath = (source: unknown, path: string): unknown =>
	path
		.split('.')
		.reduce<unknown>(
			(value, key) =>
				value == null ? undefined : (value as Record<string, unknown>)[key],
			source,
		);
