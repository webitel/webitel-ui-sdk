import z from 'zod';

/*
  copy-pasted and renamed
  from https://github.com/colinhacks/zod/discussions/2134#discussioncomment-5194111
 */

// get zod object keys recursively
export const getFieldsToSendFromZodSchema = <T extends z.ZodTypeAny>(
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
