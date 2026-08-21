import type { InferRegleSchemaStatusType } from '@regle/schemas';

/**
 * Validation statuses of a card entity, as handed to the form tabs.
 *
 * Mirrors what regle actually builds: an array field resolves to a collection
 * status (`$each`), a nested object to a status with `$fields`. Typing every
 * field as a plain field status hides both.
 */
export type CardValidationFields<T> = {
	[K in keyof T]: InferRegleSchemaStatusType<T[K]>;
};
