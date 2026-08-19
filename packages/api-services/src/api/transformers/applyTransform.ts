/** TODO(types): each step may reshape the payload, so the chain stays untyped. */
// biome-ignore lint/suspicious/noExplicitAny: dynamically typed pipeline
export type Transformer<In = any, Out = any> = (
	target: In,
	context?: unknown,
) => Out;

export interface ApplyTransformOptions {
	debug?: boolean;
	withContext?: unknown;
}

/**
 * Applies a series of transformers to a target object
 * @param target - The object to transform
 * @param transformers - Array of transformer functions to apply
 * @param options - Configuration options
 * @param options.debug - Whether to log debug information
 * @param options.withContext - Context to pass to transformers
 * @returns The transformed object
 */
// biome-ignore lint/suspicious/noExplicitAny: see Transformer
export const applyTransform = <T = any>(
	target: unknown,
	transformers: Transformer[],
	{ debug = false, withContext = null }: ApplyTransformOptions = {},
): T => {
	// biome-ignore lint/suspicious/noExplicitAny: see Transformer
	return transformers.reduce<any>((result, transformer, index) => {
		if (debug) console.info(`applyTransform debug on step ${index}`, result);

		if (withContext) {
			return transformer(result, withContext);
		}

		return transformer(result);
	}, target);
};
