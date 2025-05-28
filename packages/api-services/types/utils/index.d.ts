import z from 'zod';
export declare const getFieldsToSendFromZodSchema: <T extends z.ZodTypeAny>(schema: T) => string[];
