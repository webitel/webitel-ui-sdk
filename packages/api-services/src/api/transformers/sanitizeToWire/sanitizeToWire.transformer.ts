import sanitize from '../sanitize/sanitize.transformer';
import toWireParams from '../toWireParams/toWireParams.transformer';

/**
 * sanitize() against a src/gen-wire field list: renames first, so the camelised
 * spellings callers use are not dropped as unknown.
 *
 * Goes where sanitize() sat, i.e. before camelToSnake(), which still converts
 * the remaining values (`fields: ['viewName']`).
 */
const sanitizeToWireTransformer =
	(wireFields: string[]) => (params: Record<string, unknown>) =>
		sanitize(wireFields)(toWireParams(wireFields)(params));

export default sanitizeToWireTransformer;
