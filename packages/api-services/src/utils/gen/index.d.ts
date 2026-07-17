import { z } from 'zod/v4';
/**
 * @description
 * only depth=1 fields will be returned
 * */
export declare const getShallowFieldsToSendFromZodSchema: (schema: z.ZodObject) => string[];
export declare const getFieldsToSendFromZodSchema: (schema: z.core.$ZodType) => string[];
/**
 * @author @dlohvinov
 * @description
 * Get default value for schema. Could be anything: object with default fields values, or primitive.
 */
export declare const getDefaultsFromZodSchema: (schema: z.ZodType, value?: unknown) => unknown;
