import sanitize from '../sanitize/sanitize.transformer';
import toWireParams from '../toWireParams/toWireParams.transformer';

/**
 * sanitize() against a src/gen-wire field list.
 *
 * The generated wire names are what the gateway matches, but callers speak the
 * camelised spellings from src/gen, so a plain sanitize() would drop every one
 * of them. This renames first, then whitelists — both from the same list.
 *
 * Place it where sanitize() used to sit, i.e. before camelToSnake(), which
 * still converts the remaining values (`fields: ['viewName']`).
 */
const sanitizeToWireTransformer =
	(wireFields: string[]) => (params: Record<string, unknown>) =>
		sanitize(wireFields)(toWireParams(wireFields)(params));

export default sanitizeToWireTransformer;
