import type { z } from 'zod';

/**
 * Maps every key of T to a ZodType, suitable for use as a `z.object<ZodShape<T>>()` generic.
 * Ensures the schema covers all fields of T without importing from generated code.
 */
export type ZodShape<T> = {
	[K in keyof Required<T>]: z.ZodType;
};
