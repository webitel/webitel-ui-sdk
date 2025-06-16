import type { z } from 'zod/v4';

export * from './gen';

/**
 * @author @dlohvinov
 * @description
 * Get default value for schema. Could be anything: object with default fields values, or primitive.
 */
export const getDefaultsFromZodSchema = (schema: z.ZodType, value?: unknown): unknown => {
    return schema
        /* zod validates passed value and throws err before returning defaults,
        so we should skip error throwing and return value instead */
        .catch(({ value: validatedValue }) => validatedValue)
        .parse(value);
};