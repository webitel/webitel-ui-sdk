/**
 * Applies a series of transformers to a target object
 * @param target - The object to transform
 * @param transformers - Array of transformer functions to apply
 * @param options - Configuration options
 * @param options.debug - Whether to log debug information
 * @param options.withContext - Context to pass to transformers
 * @returns The transformed object
 */
export declare const applyTransform: (
	target: any,
	transformers: any,
	{
		debug,
		withContext,
	}?: {
		debug?: boolean;
		withContext?: any;
	},
) => any;
