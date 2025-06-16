import type { z } from 'zod/v4';
export * from './gen';
/**
 * @author @dlohvinov
 * @description
 * Get default value for schema. Could be anything: object with default fields values, or primitive.
 */
export declare const getDefaultsFromZodSchema: (schema: z.ZodType, value?: unknown) => unknown;
