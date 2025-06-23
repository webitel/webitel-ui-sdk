/**
 * Applies a series of transformers to a target object
 * @param target - The object to transform
 * @param transformers - Array of transformer functions to apply
 * @param options - Configuration options
 * @param options.debug - Whether to log debug information
 * @param options.withContext - Context to pass to transformers
 * @returns The transformed object
 */
export const applyTransform = (
	target,
	transformers,
	{ debug = false, withContext = null } = {},
) => {
	return transformers.reduce((result, transformer, index) => {
		if (debug) console.info(`applyTransform debug on step ${index}`, result);

		if (withContext) {
			return transformer(result, withContext);
		}

		return transformer(result);
	}, target);
};
