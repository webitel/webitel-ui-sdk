import { z } from 'zod/v4';

/**
 * @description
 * only depth=1 fields will be returned
 * */
export const getShallowFieldsToSendFromZodSchema = (
	schema: z.ZodObject,
): string[] => {
	return schema.keyof().options;
};

/*
  copy-pasted and renamed
  from https://github.com/colinhacks/zod/discussions/2134#discussioncomment-5194111
 */

// get zod object keys recursively
export const getFieldsToSendFromZodSchema = <T extends z.ZodObject>(
	schema: T,
): string[] => {
	// make sure schema is not null or undefined
	if (schema === null || schema === undefined) return [];
	// check if schema is nullable or optional
	if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional)
		return getFieldsToSendFromZodSchema(schema.unwrap());
	// check if schema is an array
	if (schema instanceof z.ZodArray)
		return getFieldsToSendFromZodSchema(schema.element);
	// check if schema is an object
	if (schema instanceof z.ZodObject) {
		// get key/value pairs from schema
		const entries = Object.entries(schema.shape);
		// loop through key/value pairs
		return entries.flatMap(([key, value]) => {
			// get nested keys
			const nested =
				value instanceof z.ZodType
					? getFieldsToSendFromZodSchema(value).map(
							(subKey) => `${key}.${subKey}`,
						)
					: [];
			// return nested keys
			return nested.length ? nested : key;
		});
	}
	// return empty array
	return [];
};

/**
 * @author @dlohvinov
 * @description
 * Get default value for schema. Could be anything: object with default fields values, or primitive.
 */
export const getDefaultsFromZodSchema = (
	schema: z.ZodType,
	value?: unknown,
): unknown => {
	return (
		schema
			/* zod validates passed value and throws err before returning defaults,
        so we should skip error throwing and return value instead */
			.catch(({ value: validatedValue }) => validatedValue)
			.parse(value)
	);
};
