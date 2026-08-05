/**
 * Renames camelCase caller params to the wire names the gateway matches.
 *
 * Both spellings come from the same OpenAPI document — src/gen carries the
 * camelised pass apps consume, src/gen-wire the raw one — so the two differ
 * only in separators and letter case. Matching on that (strip non-alphanumeric,
 * lowercase) pairs them exactly: `uploadedAtFrom` -> `uploaded_at.from`,
 * `viaId` -> `via.id`, `groupString` -> `group[string]`, `sha256Sum` ->
 * `sha256sum`.
 *
 * Deriving the camel spelling instead — by hand or via change-case — is close
 * but not exact: both get `tls.PEM` and `input.userID.id` wrong, and
 * change-case additionally misses `sha256sum` and `@type`. Those keys would be
 * dropped by the sanitize() that follows. Verified against the two generated
 * specs: 7289 param/property pairs, no mismatches and no two names in one list
 * normalising alike.
 *
 * Pass the generated field list (getShallowFieldsToSendFromZodSchema on a
 * src/gen-wire zod schema) and run this before sanitize(), which then drops
 * whatever did not map.
 */
const normalize = (key: string) =>
	key.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

const toWireParamsTransformer =
	(wireFields: string[]) => (params: Record<string, unknown>) => {
		if (!params) return params;

		const wireKeyByNormalized = new Map(
			wireFields.map((field) => [
				normalize(field),
				field,
			]),
		);

		return Object.entries(params).reduce<Record<string, unknown>>(
			(wireParams, [key, value]) => {
				wireParams[wireKeyByNormalized.get(normalize(key)) ?? key] = value;
				return wireParams;
			},
			{},
		);
	};

export default toWireParamsTransformer;
