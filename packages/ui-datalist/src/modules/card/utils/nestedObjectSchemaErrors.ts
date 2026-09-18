import type { z } from 'zod/v4';

/**
 * Regle treats any object value as a nested field (`$fields`). Object-level
 * Zod issues (path `['calendar']` on `calendar: {}`) must then live under
 * `$self`. Without that, Regle misfiles them as `{ 0: [] }`, leaves `$error`
 * false, and the Save button looks enabled.
 *
 * [WTEL-10408](https://webitel.atlassian.net/browse/WTEL-10408)
 */
export const nestedObjectSelfErrorsFromZod = (
	schema: z.ZodType,
	draft: unknown,
): Record<
	string,
	{
		$self: string[];
	}
> => {
	const result = schema.safeParse(draft);
	if (result.success || draft == null || typeof draft !== 'object') return {};

	const next: Record<
		string,
		{
			$self: string[];
		}
	> = {};
	const record = draft as Record<string, unknown>;

	for (const issue of result.error.issues) {
		if (issue.path.length !== 1) continue;
		const key = String(issue.path[0]);
		const value = record[key];
		if (value === null || typeof value !== 'object' || Array.isArray(value)) {
			continue;
		}

		next[key] = {
			$self: [
				...(next[key]?.$self ?? []),
				issue.message,
			],
		};
	}

	return next;
};
